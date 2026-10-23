const test = require('node:test');
const assert = require('node:assert');

const api = require('../src/api');

// Servicio de Telegram simulado: cuenta las peticiones
let requests = [];
let responses = {};
api._clients.telegram.defaults.adapter = async (config) => {
  requests.push(`${config.method.toUpperCase()} ${config.url}`);
  const data = responses[config.url];
  return { data: typeof data === 'function' ? data() : data, status: 200, statusText: 'OK', headers: {}, config };
};

test.beforeEach(() => {
  requests = [];
  responses = { '/token': 'clave', '/info': { deviceId: 'ABC' }, '/update': {} };
  api._clearCache();
});

test('token y cargador se piden una sola vez seguida', async () => {
  for (let i = 0; i < 5; i++) {
    assert.strictEqual(await api.getToken(1), 'clave');
    assert.deepStrictEqual(await api.getUserInfo(1, 'clave'), { deviceId: 'ABC' });
  }
  assert.deepStrictEqual(requests, ['GET /token', 'GET /info']);
});

test('la caché es por chat', async () => {
  await api.getToken(1);
  await api.getToken(2);
  assert.deepStrictEqual(requests, ['GET /token', 'GET /token']);
});

test('guardar un token nuevo o elegir cargador invalida la caché', async () => {
  await api.getToken(1);
  await api.getUserInfo(1, 'clave');
  await api.updateUserData(1, 'clave', 'XYZ', 'Garaje');
  await api.getUserInfo(1, 'clave');
  await api.addToken(1, 'otra');
  await api.getToken(1);
  assert.deepStrictEqual(requests, ['GET /token', 'GET /info', 'POST /update', 'GET /info', 'POST /token', 'GET /token']);
});

test('no se guarda la ausencia de token ni de cargador', async () => {
  responses['/token'] = '';
  responses['/info'] = { deviceId: '' };
  await api.getToken(1);
  await api.getToken(1);
  await api.getUserInfo(1, 'clave');
  await api.getUserInfo(1, 'clave');
  assert.deepStrictEqual(requests, ['GET /token', 'GET /token', 'GET /info', 'GET /info']);
});
