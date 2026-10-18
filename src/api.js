const axios = require('axios');
const logger = require('./logger');

const TIMEOUT = 10000;

// API pública de V2C Cloud (https://api.v2charge.com)
const cloud = axios.create({ baseURL: 'https://v2c.cloud/kong/v2c_service', timeout: TIMEOUT });
// Servicio de V2C que guarda la relación chat de Telegram <-> token y dispositivo
const telegram = axios.create({ baseURL: 'https://v2c.cloud/v2cservice/telegram', timeout: TIMEOUT });

// Hace la petición y devuelve { ok, data }. Nunca lanza excepciones.
// En los logs solo aparecen método, ruta, estado y duración: ni cabeceras,
// ni parámetros, ni cuerpos, para no dejar claves ni datos personales.
async function request(client, config) {
  const method = (config.method || 'get').toUpperCase();
  const started = Date.now();
  try {
    const resp = await client.request(config);
    const remaining = resp.headers && resp.headers['ratelimit-remaining'];
    logger.debug(`${method} ${config.url} -> ${resp.status} (${Date.now() - started} ms)` + (remaining ? ` remaining=${remaining}` : ''));
    return { ok: true, data: resp.data };
  } catch (err) {
    const status = err.response ? err.response.status : err.code;
    if (status === 429) {
      logger.warn(`${method} ${config.url} -> 429: límite diario de llamadas de la API alcanzado`);
    } else {
      logger.warn(`${method} ${config.url} -> ${status} (${Date.now() - started} ms)`);
    }
    return { ok: false, data: null };
  }
}

const withKey = (apikey) => ({ apikey });

// Cada comando y cada botón necesita el token y el cargador elegido del
// chat. Se guardan unos minutos en memoria para no consultar el servicio en
// cada pulsación; se invalidan al guardar otro token o elegir otro cargador.
const CACHE_TTL = 10 * 60 * 1000;
const tokens = new Map();
const userInfos = new Map();

function cached(map, key) {
  const entry = map.get(key);
  if (entry && Date.now() - entry.at < CACHE_TTL) return entry.value;
  map.delete(key);
  return undefined;
}

function remember(map, key, value) {
  if (value) map.set(key, { value, at: Date.now() });
  return value;
}

async function data(client, config) {
  const result = await request(client, config);
  return result.ok ? result.data : null;
}

async function ok(client, config) {
  return (await request(client, config)).ok;
}

module.exports = {

  // --- Datos del usuario de Telegram ---

  async getToken(chatid) {
    const hit = cached(tokens, chatid);
    if (hit !== undefined) return hit;
    return remember(tokens, chatid, await data(telegram, { method: 'get', url: '/token', params: { chatbotId: chatid } }));
  },

  async addToken(chatid, tokenkey) {
    tokens.delete(chatid);
    userInfos.delete(chatid);
    return ok(telegram, { method: 'post', url: '/token', params: { chatbotId: chatid }, headers: withKey(tokenkey) });
  },

  async getUserInfo(chatid, tokenkey) {
    const hit = cached(userInfos, chatid);
    if (hit !== undefined) return hit;
    const info = await data(telegram, { method: 'get', url: '/info', params: { chatbotId: chatid }, headers: withKey(tokenkey) });
    // Solo se guarda si ya hay un cargador elegido
    return info && info.deviceId ? remember(userInfos, chatid, info) : info;
  },

  async updateUserData(chatid, tokenkey, deviceId, tag) {
    userInfos.delete(chatid);
    return ok(telegram, {
      method: 'post',
      url: '/update',
      params: { chatbotId: chatid },
      data: { deviceId: deviceId, name: tag },
      headers: withKey(tokenkey),
    });
  },

  // --- Cargadores ---

  getPairings(token) {
    return data(cloud, { method: 'get', url: '/pairings/me', headers: withKey(token) });
  },

  lockCharger(token, deviceId) {
    return ok(cloud, { method: 'post', url: '/device/locked', params: { deviceId, value: '1' }, headers: withKey(token) });
  },

  unlockCharger(token, deviceId) {
    return ok(cloud, { method: 'post', url: '/device/locked', params: { deviceId, value: '0' }, headers: withKey(token) });
  },

  pauseCharger(token, deviceId) {
    return ok(cloud, { method: 'post', url: '/device/pausecharge', params: { deviceId }, headers: withKey(token) });
  },

  resumeCharger(token, deviceId) {
    return ok(cloud, { method: 'post', url: '/device/startcharge', params: { deviceId }, headers: withKey(token) });
  },

  setIntensity(token, deviceId, amps) {
    return ok(cloud, { method: 'post', url: '/device/intensity', params: { deviceId, value: String(amps) }, headers: withKey(token) });
  },

  // 0 = FV + mínima potencia, 1 = solo FV, 2 = máxima potencia
  setFvMode(token, deviceId, mode) {
    return ok(cloud, { method: 'post', url: '/device/chargefvmode', params: { deviceId, value: String(mode) }, headers: withKey(token) });
  },

  setDynamic(token, deviceId, enabled) {
    return ok(cloud, { method: 'post', url: '/device/dynamic', params: { deviceId, value: enabled ? '1' : '0' }, headers: withKey(token) });
  },

  reported(token, deviceId) {
    return data(cloud, { method: 'get', url: '/device/reported', params: { deviceId }, headers: withKey(token) });
  },

  currentstatecharge(token, deviceId) {
    return data(cloud, { method: 'post', url: '/device/currentstatecharge', params: { deviceId }, headers: withKey(token) });
  },

  stadistics(token, deviceId) {
    return data(cloud, { method: 'get', url: '/stadistic/device', params: { deviceId }, headers: withKey(token) });
  },
};

// Solo para tests: permite sustituir el adaptador HTTP de axios y vaciar la caché
module.exports._clients = { cloud, telegram };
module.exports._clearCache = () => { tokens.clear(); userInfos.clear(); };
