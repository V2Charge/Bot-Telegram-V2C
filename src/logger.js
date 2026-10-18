// Logger mínimo con niveles. Se configura con LOG_LEVEL (error, warn, info, debug).
const LEVELS = { error: 0, warn: 1, info: 2, debug: 3 };
const current = LEVELS[(process.env.LOG_LEVEL || 'info').toLowerCase()] ?? LEVELS.info;

function log(level, args) {
  if (LEVELS[level] > current) return;
  const out = level === 'error' || level === 'warn' ? console.error : console.log;
  out(new Date().toISOString(), level.toUpperCase(), ...args);
}

module.exports = {
  error: (...args) => log('error', args),
  warn: (...args) => log('warn', args),
  info: (...args) => log('info', args),
  debug: (...args) => log('debug', args),
};
