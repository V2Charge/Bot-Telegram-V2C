const test = require('node:test');
const assert = require('node:assert');

const f = require('../src/format');
const api = require('../src/api');
const { runWithLanguage } = require('../src/Dictionarys/Dictionary');
const statusCallback = require('../src/callbacks/status');
const ES = require('../src/Dictionarys/ES');

test('números y duraciones', () => {
  assert.strictEqual(f.num('3.500000', 2), '3.5');
  assert.strictEqual(f.num('0.000000', 2), '0');
  assert.strictEqual(f.num(25.783), '25.8');
  assert.strictEqual(f.num('32', 0), '32');
  assert.strictEqual(f.duration(4830), '1 h 21 min');
  assert.strictEqual(f.duration('93'), '2 min');
  assert.strictEqual(f.duration(0), '0 min');
  assert.strictEqual(f.localDate('2026-08-19T07:56:02'), '19/08/2026 07:56');
});

const reported = (over) => ({ connected: '1', locked: '0', pause: '0', charge_state: '0', programed: '0', ...over });

test('línea de estado según la prioridad de la API', () => {
  assert.strictEqual(f.stateLine(ES, reported({ connected: '0', locked: '1' })), ES.Disconnected);
  assert.strictEqual(f.stateLine(ES, reported({ locked: '1', pause: '1' })), ES.Locked);
  assert.strictEqual(f.stateLine(ES, reported({ pause: '1', charge_state: '2' })), ES.Paused);
  assert.strictEqual(f.stateLine(ES, reported({ charge_state: '1' })), ES.Waiting);
  assert.strictEqual(f.stateLine(ES, reported({ charge_state: '2' })), ES.Charging);
  assert.strictEqual(f.stateLine(ES, { connected: '1' }), null);
  assert.ok(f.statusText(ES, 'BAT', { connected: '1' }, null).includes(ES.StateUnavailable));
  assert.strictEqual(f.isCharging(reported({ charge_state: '2' })), true);
  assert.strictEqual(f.isCharging(reported({ charge_state: '2', pause: '1' })), false);
});

test('estado cargando en un único mensaje', () => {
  const current = { power: '7.360000', energy: '12.500000', seconds: '4830', intensity: '32', house_power: '9.100000', photovoltaic_on: '1', sun_power: '1.500000' };
  const text = f.statusText(ES, 'ABC123', reported({ charge_state: '2', programed: '1' }), current, new Date('2026-10-18T19:05:00Z'));
  assert.strictEqual(text, [
    '🔌 ABC123',
    ES.Charging,
    ES.Programed,
    '',
    '⚡ Potencia: 7.36 kW',
    '🔋 Energía: 12.5 kWh',
    '⏱️ Tiempo: 1 h 21 min',
    '🎚️ Intensidad: 32 A',
    '🏠 Consumo de la casa: 9.1 kW',
    '☀️ Producción solar: 1.5 kW',
    '',
    '🕒 Actualizado: 21:05',
  ].join('\n'));
});

test('sin datos solares ni consumo no se muestran esas líneas', () => {
  const current = { power: '1', energy: '1', photovoltaic_on: '0', sun_power: '2', house_power: '0.000000' };
  const text = f.statusText(ES, 'X', reported({ charge_state: '2' }), current);
  assert.ok(!text.includes('☀️'));
  assert.ok(!text.includes('🏠'));
});

test('estadísticas: un mensaje con total', () => {
  const sessions = [
    { startChargeDate: '2026-08-19T07:56:02', endChargeDate: '2026-08-19T11:46:33', energy: 25.783, cost: 2.5776, coCost: 7.99056 },
    { startChargeDate: '2026-04-30T13:59:01', endChargeDate: '2026-04-30T17:54:05', energy: 27.413, cost: 2.7406, coCost: 8.49586 },
  ];
  assert.strictEqual(f.statisticsText(ES, sessions), [
    ES.LastSessions,
    '',
    '▶️ 19/08/2026 07:56 · 🏁 3 h 51 min',
    '🔋 25.8 kWh · 💰 2.58 € · 🌿 7.99 kg CO₂',
    '',
    '▶️ 30/04/2026 13:59 · 🏁 3 h 55 min',
    '🔋 27.4 kWh · 💰 2.74 € · 🌿 8.5 kg CO₂',
    '',
    'Σ Total: 53.2 kWh · 5.32 €',
  ].join('\n'));
  assert.strictEqual(f.statisticsText(ES, []), ES.NoSessions);
});

test('"Actualizar" edita el mensaje y solo pide el detalle si está cargando', async () => {
  const calls = [];
  api.reported = async () => { calls.push('reported'); return reported({ charge_state: '0' }); };
  api.currentstatecharge = async () => { calls.push('current'); return {}; };
  const bot = {
    sent: [], edited: [],
    answerCallbackQuery: async () => true,
    sendMessage: async function (chatId, text, opts) { this.sent.push(opts.reply_markup.inline_keyboard[0][0].callback_data); },
    editMessageText: async function (text, opts) { this.edited.push(opts.message_id); },
  };
  const msg = { chat: { id: 1 }, message_id: 55, from: { language_code: 'es' } };
  await runWithLanguage(msg, async () => {
    await statusCallback(bot, 'q', msg, 'token', 'ABC', false);
    await statusCallback(bot, 'q', msg, 'token', 'ABC', true);
  });
  assert.deepStrictEqual(calls, ['reported', 'reported']);
  assert.deepStrictEqual(bot.sent, ['StatusRefresh']);
  assert.deepStrictEqual(bot.edited, [55]);
});
