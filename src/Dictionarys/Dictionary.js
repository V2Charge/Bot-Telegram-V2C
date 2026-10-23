const { AsyncLocalStorage } = require('async_hooks');
const ES = require('./ES');
const FR = require('./FR');
const EN = require('./EN');
const PT = require('./PT');
const IT = require('./IT');
const DE = require('./DE');

const LANGUAGES = { es: ES, fr: FR, en: EN, pt: PT, it: IT, de: DE };
// Idiomas sin traducción propia que se atienden mejor en otro idioma
const FALLBACKS = { ca: ES, gl: ES, eu: ES };

// Cada mensaje se procesa con su propio idioma. El idioma vive en el
// contexto asíncrono de la petición, así dos usuarios que escriben a la vez
// no se pisan el idioma entre sí.
const storage = new AsyncLocalStorage();

function getLanguage(msg) {
  const code = ((msg && msg.from && msg.from.language_code) || '').slice(0, 2).toLowerCase();
  return LANGUAGES[code] || FALLBACKS[code] || EN;
}

function runWithLanguage(msg, fn) {
  return storage.run(getLanguage(msg), fn);
}

// El código existente usa la variable global languageCode: se resuelve en
// cada acceso al idioma de la petición en curso.
Object.defineProperty(global, 'languageCode', {
  get: () => storage.getStore() || EN,
  configurable: true,
});

module.exports = getLanguage
module.exports.runWithLanguage = runWithLanguage
module.exports.LANGUAGES = LANGUAGES
