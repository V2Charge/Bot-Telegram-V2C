const test = require('node:test');
const assert = require('node:assert');

const LANGUAGES = ['ES', 'EN', 'FR', 'DE', 'IT', 'PT'];
const dictionaries = Object.fromEntries(
  LANGUAGES.map((lang) => [lang, require(`../src/Dictionarys/${lang}`)])
);
const reference = Object.keys(dictionaries.ES).sort();

for (const lang of LANGUAGES) {
  test(`${lang} tiene las mismas claves que ES`, () => {
    assert.deepStrictEqual(Object.keys(dictionaries[lang]).sort(), reference);
  });

  test(`${lang} no tiene textos vacíos`, () => {
    for (const [key, value] of Object.entries(dictionaries[lang])) {
      assert.ok(typeof value === 'string' && value.trim() !== '', `${lang}.${key} está vacío`);
    }
  });
}
