// translate.js
import fs from 'fs';
import fetch from 'node-fetch';

const deeplApiKey = '44f03750-63b4-4526-bebe-09653bc24dd3:fx';
const sourceFile = './messages/fr.json';
const targets = ['en', 'es'];

// Aplatir l'objet (HomePage.title => "Hello world!")
function flatten(obj, prefix = '', res = {}) {
  for (const key in obj) {
    const val = obj[key];
    const newKey = prefix ? `${prefix}.${key}` : key;
    if (typeof val === 'object') {
      flatten(val, newKey, res);
    } else {
      res[newKey] = val;
    }
  }
  return res;
}

// Réassembler l'objet plat en structure imbriquée
function unflatten(data) {
  const result = {};
  for (const key in data) {
    const parts = key.split('.');
    parts.reduce((acc, part, index) => {
      if (index === parts.length - 1) {
        acc[part] = data[key];
      } else {
        acc[part] = acc[part] || {};
      }
      return acc[part];
    }, result);
  }
  return result;
}

async function translateText(text, targetLang) {
  const res = await fetch('https://api-free.deepl.com/v2/translate', {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body: new URLSearchParams({
      auth_key: deeplApiKey,
      text: text,
      target_lang: targetLang.toUpperCase(),
    }),
  });

  const data = await res.json();
  if (!data.translations) {
    throw new Error(`Traduction échouée : ${JSON.stringify(data)}`);
  }

  return data.translations[0].text;
}

async function translateFile() {
  const frMessages = JSON.parse(fs.readFileSync(sourceFile, 'utf-8'));
  const flatMessages = flatten(frMessages);

  for (const lang of targets) {
    const translatedFlat = {};

    for (const key in flatMessages) {
      const text = flatMessages[key];
      console.log(`[${lang}] Traduction de : ${text}`);
      translatedFlat[key] = await translateText(text, lang);
    }

    const translatedNested = unflatten(translatedFlat);

    fs.writeFileSync(
      `./messages/${lang}.json`,
      JSON.stringify(translatedNested, null, 2),
      'utf-8'
    );

    console.log(`✅ Traduction terminée : ${lang}.json`);
  }
}

translateFile();
