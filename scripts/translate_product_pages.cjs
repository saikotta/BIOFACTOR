const fs = require('fs');
const path = require('path');
const https = require('https');

// 1. Read .env
const envPath = path.resolve(__dirname, '../.env');
const envContent = fs.readFileSync(envPath, 'utf8');
const env = {};
envContent.split(/\r?\n/).forEach(line => {
  const match = line.match(/^\s*([\w.-]+)\s*=\s*(.*)?\s*$/);
  if (match) {
    let value = (match[2] || '').trim();
    if (value.startsWith('"') && value.endsWith('"')) value = value.slice(1, -1);
    if (value.startsWith("'") && value.endsWith("'")) value = value.slice(1, -1);
    env[match[1]] = value;
  }
});

const apiKey = env.AZURE_OPENAI_API_KEY;
const endpoint = (env.AZURE_OPENAI_ENDPOINT || '').replace(/\/+$/, '');
const deployment = env.AZURE_OPENAI_DEPLOYMENT_NAME || 'gpt-4.1';
const apiVersion = env.AZURE_OPENAI_API_VERSION || '2024-12-01-preview';
const apiUrl = `${endpoint}/openai/deployments/${deployment}/chat/completions?api-version=${apiVersion}`;

// 2. Load missing keys dictionary
const dictPath = 'C:/Users/tamma/.gemini/antigravity/brain/66143f7f-1afd-49df-83da-0d8bb4592f26/scratch/all_missing_keys.json';
const newKeys = JSON.parse(fs.readFileSync(dictPath, 'utf8'));

async function callAzureOpenAI(prompt) {
  const urlObj = new URL(apiUrl);
  const postData = JSON.stringify({
    messages: [
      {
        role: "system",
        content: "You are an expert bilingual biological science, agricultural, and biotechnology translator. Translate the JSON key-value pairs accurately and naturally. Maintain proper formal and scientific tone. Keep company/brand names like 'Biofactor', 'Bharat' intact. Keep chemical formulas, element symbols, and acronyms (like FCR, pH, NH₃, NO₂⁻, H₂S, Cr(VI), Cr(III), Ca, Mg, K, Zn, Fe, B. subtilis, Clostridium perfringens, etc.) appropriate. Return strictly a raw JSON object with identical keys and translated string values."
      },
      {
        role: "user",
        content: prompt
      }
    ],
    temperature: 0.1,
    response_format: { type: "json_object" }
  });

  return new Promise((resolve, reject) => {
    const req = https.request({
      hostname: urlObj.hostname,
      port: 443,
      path: urlObj.pathname + urlObj.search,
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'api-key': apiKey,
        'Content-Length': Buffer.byteLength(postData)
      }
    }, (res) => {
      let body = '';
      res.on('data', chunk => body += chunk);
      res.on('end', () => {
        try {
          const json = JSON.parse(body);
          if (json.choices && json.choices[0] && json.choices[0].message) {
            const parsed = JSON.parse(json.choices[0].message.content);
            resolve(parsed);
          } else {
            reject(new Error("API returned: " + body));
          }
        } catch (err) {
          reject(err);
        }
      });
    });

    req.on('error', reject);
    req.write(postData);
    req.end();
  });
}

// Split object into chunks of size N
function chunkObject(obj, chunkSize = 50) {
  const keys = Object.keys(obj);
  const chunks = [];
  for (let i = 0; i < keys.length; i += chunkSize) {
    const chunkKeys = keys.slice(i, i + chunkSize);
    const chunkObj = {};
    chunkKeys.forEach(k => { chunkObj[k] = obj[k]; });
    chunks.push(chunkObj);
  }
  return chunks;
}

async function run() {
  const enPath = path.resolve(__dirname, '../app/i18n/locales/en.json');
  const tePath = path.resolve(__dirname, '../app/i18n/locales/te.json');
  const hiPath = path.resolve(__dirname, '../app/i18n/locales/hi.json');

  const en = JSON.parse(fs.readFileSync(enPath, 'utf8'));
  const te = JSON.parse(fs.readFileSync(tePath, 'utf8'));
  const hi = JSON.parse(fs.readFileSync(hiPath, 'utf8'));

  // Merge into English
  Object.assign(en, newKeys);
  fs.writeFileSync(enPath, JSON.stringify(en, null, 2), 'utf8');
  console.log(`en.json updated with ${Object.keys(newKeys).length} keys. Total en keys: ${Object.keys(en).length}`);

  // Split into chunks of 45 for high reliability
  const chunks = chunkObject(newKeys, 45);
  console.log(`Translating in ${chunks.length} batches...`);

  // Translate to Telugu
  console.log('--- TRANSLATING TO TELUGU ---');
  for (let i = 0; i < chunks.length; i++) {
    console.log(`Telugu batch ${i + 1}/${chunks.length}...`);
    const prompt = `Translate this JSON object into natural, professional Telugu (తెలుగు) for an elite biotechnology website. Return only valid JSON:\n${JSON.stringify(chunks[i], null, 2)}`;
    const translated = await callAzureOpenAI(prompt);
    Object.assign(te, translated);
    console.log(`Telugu batch ${i + 1} completed (${Object.keys(translated).length} keys).`);
  }
  fs.writeFileSync(tePath, JSON.stringify(te, null, 2), 'utf8');
  console.log(`te.json updated. Total te keys: ${Object.keys(te).length}`);

  // Translate to Hindi
  console.log('--- TRANSLATING TO HINDI ---');
  for (let i = 0; i < chunks.length; i++) {
    console.log(`Hindi batch ${i + 1}/${chunks.length}...`);
    const prompt = `Translate this JSON object into natural, professional Hindi (हिंदी) for an elite biotechnology website. Return only valid JSON:\n${JSON.stringify(chunks[i], null, 2)}`;
    const translated = await callAzureOpenAI(prompt);
    Object.assign(hi, translated);
    console.log(`Hindi batch ${i + 1} completed (${Object.keys(translated).length} keys).`);
  }
  fs.writeFileSync(hiPath, JSON.stringify(hi, null, 2), 'utf8');
  console.log(`hi.json updated. Total hi keys: ${Object.keys(hi).length}`);

  console.log('ALL TRANSLATIONS COMPLETE AND STORED STATICALLY!');
}

run().catch(err => {
  console.error("Translation run failed:", err);
  process.exit(1);
});
