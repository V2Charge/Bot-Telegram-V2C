// Funciones puras para dar formato a los datos de la API (que llegan como
// texto, p. ej. "3.500000") y componer los mensajes de estado y estadísticas.

const TIMEZONE = process.env.BOT_TIMEZONE || 'Europe/Madrid';

// "3.500000" -> "3.5", "0.000000" -> "0", "25.783" -> "25.8"
function num(value, decimals = 1) {
  const n = Number(value);
  if (!Number.isFinite(n)) return String(value);
  return String(Number(n.toFixed(decimals)));
}

function positive(value) {
  return Number(value) > 0;
}

// 4830 -> "1 h 20 min", 300 -> "5 min"
function duration(seconds) {
  const total = Math.max(0, Math.round(Number(seconds) / 60) || 0);
  const h = Math.floor(total / 60);
  const m = total % 60;
  return h > 0 ? `${h} h ${m} min` : `${m} min`;
}

function time(date = new Date()) {
  return new Intl.DateTimeFormat('es-ES', { hour: '2-digit', minute: '2-digit', timeZone: TIMEZONE }).format(date);
}

// "2026-08-19T07:56:02" -> "19/08/2026 07:56" (la API ya la da en hora local)
function localDate(value) {
  const [d, t = ''] = String(value).split('T');
  const [y, mo, da] = d.split('-');
  return `${da}/${mo}/${y} ${t.slice(0, 5)}`.trim();
}

function stateLine(t, reported) {
  if (String(reported.connected) === '0') return t.Disconnected;
  if (String(reported.locked) === '1') return t.Locked;
  if (String(reported.pause) === '1') return t.Paused;
  switch (String(reported.charge_state)) {
    case '0': return t.StandBy;
    case '1': return t.Waiting;
    case '2': return t.Charging;
    default: return null;
  }
}

function isCharging(reported) {
  return String(reported.connected) !== '0' && String(reported.locked) !== '1'
    && String(reported.pause) !== '1' && String(reported.charge_state) === '2';
}

// Mensaje único con el estado del cargador. `current` (currentstatecharge)
// solo se pide a la API cuando está cargando.
function statusText(t, deviceId, reported, current, now = new Date()) {
  const lines = [`🔌 ${deviceId}`];
  const state = stateLine(t, reported);
  lines.push(state || t.StateUnavailable);
  if (String(reported.connected) !== '0' && String(reported.programed) === '1') lines.push(t.Programed);

  if (current) {
    lines.push('');
    lines.push(`⚡ ${t.PowerLabel}: ${num(current.power, 2)} kW`);
    lines.push(`🔋 ${t.EnergyLabel}: ${num(current.energy, 2)} kWh`);
    if (current.seconds !== undefined) lines.push(`⏱️ ${t.TimeLabel}: ${duration(current.seconds)}`);
    if (current.intensity !== undefined) lines.push(`🎚️ ${t.IntensityLabel}: ${num(current.intensity, 0)} A`);
    if (positive(current.house_power)) lines.push(`🏠 ${t.HousePowerLabel}: ${num(current.house_power, 2)} kW`);
    if (String(current.photovoltaic_on) === '1' && positive(current.sun_power)) {
      lines.push(`☀️ ${t.SolarLabel}: ${num(current.sun_power, 2)} kW`);
    }
  }
  lines.push('', `🕒 ${t.UpdatedLabel}: ${time(now)}`);
  return lines.join('\n');
}

// Mensaje único con las últimas cargas y el total
function statisticsText(t, sessions) {
  if (!sessions || sessions.length === 0) return t.NoSessions;
  const lines = [t.LastSessions];
  let energy = 0;
  let cost = 0;
  for (const s of sessions) {
    const seconds = (new Date(s.endChargeDate) - new Date(s.startChargeDate)) / 1000;
    energy += Number(s.energy) || 0;
    cost += Number(s.cost) || 0;
    lines.push('');
    lines.push(`▶️ ${localDate(s.startChargeDate)} · 🏁 ${duration(seconds)}`);
    lines.push(`🔋 ${num(s.energy)} kWh · 💰 ${num(s.cost, 2)} € · 🌿 ${num(s.coCost, 2)} kg CO₂`);
  }
  lines.push('', `Σ ${t.Total}: ${num(energy)} kWh · ${num(cost, 2)} €`);
  return lines.join('\n');
}

module.exports = { num, duration, time, localDate, stateLine, isCharging, statusText, statisticsText };
