const fs = require('fs');
const path = require('path');

// Parse .env manually without extra deps
const envPath = path.resolve(__dirname, '../.env');
if (!fs.existsSync(envPath)) {
  console.error('.env file not found!');
  process.exit(1);
}

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
const deployment = env.AZURE_OPENAI_DEPLOYMENT_NAME;
const apiVersion = env.AZURE_OPENAI_API_VERSION || '2024-08-01-preview';

console.log('Testing Azure endpoint:', endpoint);
console.log('Deployment:', deployment);
console.log('API Version:', apiVersion);
console.log('API Key length:', apiKey ? apiKey.length : 0);

if (!apiKey || !endpoint || !deployment) {
  console.error('Missing Azure credentials in .env');
  process.exit(1);
}

const url = `${endpoint}/openai/deployments/${deployment}/chat/completions?api-version=${apiVersion}`;

async function test() {
  try {
    const res = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'api-key': apiKey
      },
      body: JSON.stringify({
        messages: [
          { role: 'system', content: 'You are a professional translator.' },
          { role: 'user', content: 'Translate "Welcome to Biofactor" into Telugu and Hindi as JSON: {"te": "...", "hi": "..."}' }
        ],
        max_tokens: 150,
        temperature: 0.3
      })
    });

    console.log('HTTP Status:', res.status, res.statusText);
    const data = await res.json();
    console.log('Response content:', JSON.stringify(data, null, 2).slice(0, 500));
  } catch (err) {
    console.error('Test error:', err);
  }
}

test();
