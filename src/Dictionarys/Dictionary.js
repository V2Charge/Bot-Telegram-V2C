const ES = require('./ES');
const FR = require('./FR');
const EN = require('./EN');
const EN = require('./PT');
const EN = require('./IT');
const EN = require('./DE');




function getLanguage(msg) {
  let lang_code = msg.from.language_code;
  if (lang_code) {
    console.log("Message : " + msg.from.language_code);
    if (lang_code === "es") {
      languageCode = ES;
    }
    if (lang_code === "fr") {
      languageCode = FR;
    }
    if (lang_code === "en") {
      languageCode = EN;
    }
    if (lang_code === "pt") {
      languageCode = PT;
    }
    if (lang_code === "it") {
      languageCode = IT;
    }
    if (lang_code === "de") {
      languageCode = DE;
    }
    console.log(languageCode, 'dic')
    return languageCode;
  } else {
    languageCode = EN;
  }
  return languageCode
}


module.exports = getLanguage