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

async function data(client, config) {
  const result = await request(client, config);
  return result.ok ? result.data : null;
}

async function ok(client, config) {
  return (await request(client, config)).ok;
}

module.exports = {

  // --- Datos del usuario de Telegram ---

  getToken(chatid) {
    return data(telegram, { method: 'get', url: '/token', params: { chatbotId: chatid } });
  },

  addToken(chatid, tokenkey) {
    return ok(telegram, { method: 'post', url: '/token', params: { chatbotId: chatid }, headers: withKey(tokenkey) });
  },

  getUserInfo(chatid, tokenkey) {
    return data(telegram, { method: 'get', url: '/info', params: { chatbotId: chatid }, headers: withKey(tokenkey) });
  },

  updateUserData(chatid, tokenkey, deviceId, tag) {
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
