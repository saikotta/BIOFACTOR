const fs = require('fs');
const path = require('path');
const https = require('https');

// 1. Parse .env
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
const deployment = env.AZURE_OPENAI_DEPLOYMENT_NAME || 'gpt-4.1';
const apiVersion = env.AZURE_OPENAI_API_VERSION || '2024-12-01-preview';

if (!apiKey || !endpoint) {
  console.error('Missing Azure OpenAI credentials in .env');
  process.exit(1);
}

const apiUrl = `${endpoint}/openai/deployments/${deployment}/chat/completions?api-version=${apiVersion}`;

// 2. Define the new remaining keys
const remainingKeys = {
  // Careers Benefits & Process
  "careers_benefit_1_title": "Sustainable Mission",
  "careers_benefit_1_desc": "Make a real impact on sustainable agriculture and environmental conservation",
  "careers_benefit_2_title": "Career Growth",
  "careers_benefit_2_desc": "Clear growth paths with regular promotions and skill development programs",
  "careers_benefit_3_title": "Collaborative Culture",
  "careers_benefit_3_desc": "Work alongside passionate experts in agriculture and biotechnology",
  "careers_benefit_4_title": "Work-Life Balance",
  "careers_benefit_4_desc": "Flexible hours, remote options, and generous leave policies",
  "careers_benefit_5_title": "Learning Opportunities",
  "careers_benefit_5_desc": "Sponsored training, workshops, and global conference participation",
  "careers_benefit_6_title": "Comprehensive Benefits",
  "careers_benefit_6_desc": "Health insurance, retirement plans, bonuses, and wellness programs",
  "careers_step_1_title": "Submit Application",
  "careers_step_1_desc": "Send your resume and personalized cover letter highlighting your passion for sustainable agriculture",
  "careers_step_2_title": "Screening Call",
  "careers_step_2_desc": "Initial phone conversation with our HR team to discuss mutual expectations",
  "careers_step_3_title": "Technical Interview",
  "careers_step_3_desc": "In-depth discussion with our technical team about your expertise and approach",
  "careers_step_4_title": "Final Interview",
  "careers_step_4_desc": "Meeting with leadership to discuss vision alignment and career aspirations",
  "careers_step_5_title": "Offer & Onboarding",
  "careers_step_5_desc": "Welcome package and comprehensive onboarding to integrate you smoothly",
  "careers_loading_positions": "Loading open positions...",
  "careers_demo_opening": "DEMO OPENING",
  "careers_what_you_will_do": "What You'll Do:",
  "careers_key_skills": "Key Skills:",
  "careers_expected_salary": "Expected Salary",
  "careers_full_time": "Full Time",

  // Contact Frames
  "contact_f2_call_desc": "Visiting hours: 9:30 AM – 6:30 PM, Monday to Saturday.",
  "contact_f2_email_desc": "General inquiries. Our specialists reply within 24 hours.",
  "contact_f2_visit_head_office": "Head Office",
  "contact_f2_visit_address": "4 & 5 Floors, Sai Medha Infra, Arca Satya Residency, Kousalya Colony, Bachupally, Hyderabad, Telangana 500090.",
  "contact_f3_tag": "03 / 05 · SEND MESSAGE",
  "contact_f3_heading": "Tell us what your farm needs",
  "contact_f3_expertise_label": "OUR AREAS OF EXPERTISE",
  "contact_f3_hint": "Hover a topic to explore it. Click to use it as your subject.",
  "contact_name": "Full Name",
  "contact_name_placeholder": "Enter your name",
  "contact_email": "Email Address",
  "contact_email_placeholder": "Enter your email",
  "contact_phone": "Phone Number",
  "contact_phone_placeholder": "Enter phone number",
  "contact_area": "Area (State & District)",
  "contact_area_placeholder": "e.g., Telangana, Hyderabad",
  "contact_subject": "Subject",
  "contact_subject_select": "Select a subject",
  "contact_message": "Your Message",
  "contact_message_placeholder": "Tell us about your agricultural needs, farm size, crops grown...",
  "contact_send": "Send Message",
  "contact_sending": "Sending...",
  "contact_thanks_title": "Thank you for sending!",
  "contact_thanks_desc": "We received your message and will get back to you soon.",
  "contact_returning_form": "Returning to the form...",
  "contact_f4_mon_sat": "Monday – Saturday",
  "contact_f4_hours": "9:30 AM to 6:30 PM",
  "contact_f4_sunday": "Sunday: closed. Call or message us and we'll get back on Monday.",
  "contact_f5_tag": "05 / 05 · WHY CHOOSE US",
  "contact_f5_heading": "Why Choose Our Agricultural Solutions",
  "contact_f5_trusted_title": "Trusted Solutions",
  "contact_f5_trusted_desc": "FCO Supported agricultural products",
  "contact_f5_award_title": "Award Winning",
  "contact_f5_award_desc": "Recognized for innovation in agri-tech",
  "contact_f5_team_title": "Expert Team",
  "contact_f5_team_desc": "100+ agricultural specialists",
  "contact_f5_results_title": "Proven Results",
  "contact_f5_results_desc": "Increased yields for 10,000+ farmers",

  // Resources
  "resources_search_placeholder": "Search research papers...",
  "resources_explore_catalog": "Explore Catalog",
  "resources_section_heading": "Research Papers",
  "resources_section_sub": "Peer-reviewed studies • Click any paper to view live preview in right window",
  "resources_active_preview": "ACTIVE PREVIEW",
  "resources_live_previewing": "LIVE PREVIEWING PAPER",
  "resources_abstract": "Abstract",
  "resources_key_findings": "Key Findings:",
  "resources_quant_table": "Quantitative Assay Table",
  "resources_verified": "VERIFIED",
  "resources_open_pdf": "Open PDF",
  "resources_no_papers": "No research papers found",
  "resources_adjust_search": "Try adjusting your search terms.",
  "resources_view_all": "View All Research Papers",

  // Science & Technology
  "science_hero_eyebrow": "Biological Intelligence",
  "science_hero_h1_line1": "The Technology Behind",
  "science_hero_h1_line2": '"Complete, Not Replace"',
  "science_hero_lede": "Biological Intelligence isn't one product or one patent. It's six technologies working together — each one solving a different part of the same problem: how do you make biology reliable enough to trust in a system built on chemistry?",
  "science_hero_hint": "Tap a node, or scroll ↓",
  "tech_tile_1": "MICROBIAL BIOTECHNOLOGY",
  "tech_tile_2": "METABYAUM",
  "tech_tile_3": "E=m² (MICROBES + MINERAL)",
  "tech_tile_4": "DELIVERY TECH",
  "tech_01_label": "01 — Microbial Biotechnology",
  "tech_01_title": "Where Every Product Starts",
  "tech_01_body": "Every Biofactor product begins with a strain — isolated, characterized, and tested before it ever reaches a formulation. Our microbial biotechnology work maintains a bank of 60+ deposited and elite strains, the raw material every other technology on this page builds on.",
  "tech_02_label": "02 — METABYAUM",
  "tech_02_title": "Microbes & Metabolites, Working as One",
  "tech_02_body": "MetaByaum brings diverse microbial communities and their metabolites together activating biological performance from day one and sustaining it as the microbes establish.",
  "tech_02_chain_1": "Engineered synergy.",
  "tech_02_chain_2": "Built for real-world performance.",
  "tech_03_label": "03 — E=m² (Microbes + Mineral)",
  "tech_03_title": "Where Biology Meets Chemistry",
  "tech_03_body": "Life itself emerged through chemistry, and it never stopped needing it. Our E=m² (Microbes + Mineral) approach is what happens when a product is engineered against microbiology, mineral science, and delivery technology from the start.",
  "tech_04_label": "04 — Mineral Technology",
  "tech_04_title": "Biology, Designed to Work With Minerals",
  "tech_04_body": "Biological systems operate within mineral environments in soil, water and the gut. Our mineral technology is designed to optimize the interaction between biological components and the mineral chemistry of each system, enabling greater compatibility, stability and biological performance.",
  "tech_05_label": "05 — Delivery Technologies",
  "tech_05_title": "Keeping Biology Alive Long Enough to Work",
  "tech_05_body": "Microbes are only valuable if they survive long enough to reach the system they are designed to influence. Bioencapsulation protects microbial viability through manufacturing, storage and field application, helping biological activity remain intact until the product reaches its destination.",
  "tech_05_chain_1": "Protect the biology.",
  "tech_05_chain_2": "Preserve its potential.",
  "tech_05_chain_3": "Enable performance.",
  "science_evidence_eyebrow": "The Evidence",
  "science_evidence_title": "Six technologies. 11 patented. Huge microbial strain bank",
  "science_evidence_stat_1": "Patents granted"
};

async function callAzureOpenAI(prompt) {
  const urlObj = new URL(apiUrl);
  const postData = JSON.stringify({
    messages: [
      {
        role: "system",
        content: "You are an expert bilingual scientific, agricultural, and biotechnology translator. Translate the JSON keys values accurately and naturally. Maintain proper formal tone. Return strictly a raw JSON object with identical keys and translated string values."
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

async function run() {
  const enPath = path.resolve(__dirname, '../app/i18n/locales/en.json');
  const tePath = path.resolve(__dirname, '../app/i18n/locales/te.json');
  const hiPath = path.resolve(__dirname, '../app/i18n/locales/hi.json');

  const enCurrent = JSON.parse(fs.readFileSync(enPath, 'utf8'));
  const teCurrent = JSON.parse(fs.readFileSync(tePath, 'utf8'));
  const hiCurrent = JSON.parse(fs.readFileSync(hiPath, 'utf8'));

  // Find missing keys for te and hi
  const teMissing = {};
  const hiMissing = {};

  for (const [k, v] of Object.entries(remainingKeys)) {
    if (!teCurrent[k]) teMissing[k] = v;
    if (!hiCurrent[k]) hiMissing[k] = v;
    enCurrent[k] = v; // Update or add to en
  }

  console.log(`Missing for Telugu: ${Object.keys(teMissing).length}`);
  console.log(`Missing for Hindi: ${Object.keys(hiMissing).length}`);

  if (Object.keys(teMissing).length > 0) {
    console.log('Translating to Telugu with Azure OpenAI...');
    const tePrompt = `Translate the values of this JSON object into natural, professional Telugu (తెలుగు) suitable for an elite biotechnology website. Keep technical and brand terms (like Biofactor, MetaByaum, E=m², etc.) accurate. Input JSON:\n${JSON.stringify(teMissing, null, 2)}`;
    const teTranslated = await callAzureOpenAI(tePrompt);
    for (const [k, v] of Object.entries(teTranslated)) {
      teCurrent[k] = v;
    }
    console.log('Telugu translation complete!');
  }

  if (Object.keys(hiMissing).length > 0) {
    console.log('Translating to Hindi with Azure OpenAI...');
    const hiPrompt = `Translate the values of this JSON object into natural, professional Hindi (हिंदी) suitable for an elite biotechnology website. Keep technical and brand terms (like Biofactor, MetaByaum, E=m², etc.) accurate. Input JSON:\n${JSON.stringify(hiMissing, null, 2)}`;
    const hiTranslated = await callAzureOpenAI(hiPrompt);
    for (const [k, v] of Object.entries(hiTranslated)) {
      hiCurrent[k] = v;
    }
    console.log('Hindi translation complete!');
  }

  fs.writeFileSync(enPath, JSON.stringify(enCurrent, null, 2), 'utf8');
  fs.writeFileSync(tePath, JSON.stringify(teCurrent, null, 2), 'utf8');
  fs.writeFileSync(hiPath, JSON.stringify(hiCurrent, null, 2), 'utf8');

  console.log(`Updated all 3 files successfully! Key counts:`);
  console.log(`en: ${Object.keys(enCurrent).length}`);
  console.log(`te: ${Object.keys(teCurrent).length}`);
  console.log(`hi: ${Object.keys(hiCurrent).length}`);
}

run().catch(err => {
  console.error("Error:", err);
  process.exit(1);
});
