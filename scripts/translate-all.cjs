const fs = require('fs');
const path = require('path');

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

// 2. Comprehensive English Base Dictionary for Biofactor
const baseEnglish = {
  // Navigation
  "nav_home": "Home",
  "nav_about": "About",
  "nav_products": "Products",
  "nav_one_health": "One Health",
  "nav_science_tech": "Science & Technology",
  "nav_resources": "Resources",
  "nav_careers": "Careers",
  "nav_contact": "Contact",
  "nav_language": "Language",
  "nav_menu": "Menu",
  
  // Product Sub-items
  "prod_agriculture": "Agriculture",
  "prod_aquaculture": "Aquaculture",
  "prod_bioremediation": "Bioremediation",
  "prod_poultry": "Poultry",
  "prod_ruminants": "Ruminants",

  // Footer
  "footer_tagline": "Turning microbial functions into measurable biological impact across every production stage.",
  "footer_quick_links": "Quick Links",
  "footer_verticals": "Verticals",
  "footer_company": "Company",
  "footer_contact": "Contact",
  "footer_rights_reserved": "All rights reserved.",
  "footer_address_title": "Headquarters",
  "footer_address_text": "Biofactor Biologicals Pvt Ltd, Hyderabad, Telangana, India",
  "footer_privacy": "Privacy Policy",
  "footer_terms": "Terms of Service",

  // Home - Hero
  "hero_tagline_top": "The Next Big Thing",
  "hero_tagline_sub": "Is Really Small.",
  "hero_subtitle": "A new frontier exists beyond the naked eye.",
  "hero_explore_solutions": "Explore Solutions",
  
  // Home - Primordial Section
  "primordial_title": "Biotechnology begins here.",
  "primordial_card1_title": "Not just observing life.",
  "primordial_card1_desc": "Harnessing biological intelligence to solve real-world agricultural challenges.",
  "primordial_card2_title": "Not just supplying inputs.",
  "primordial_card2_desc": "Designing microbial ecosystems that build resilient soil and robust livestock.",
  "primordial_card3_title": "Not just protecting crops.",
  "primordial_card3_desc": "Restoring planetary vitality from the ground up.",

  // Home - Chemistry / Microorganism Section
  "chem_headline_part1": "A microorganism is more",
  "chem_headline_part2": "than a cell.",
  "chem_grid_makes_title": "Makes",
  "chem_grid_makes_sub": "ENZYMES · METABOLITES",
  "chem_grid_transforms_title": "Transforms",
  "chem_grid_transforms_sub": "NUTRIENTS · MATTER",
  "chem_grid_responds_title": "Responds",
  "chem_grid_responds_sub": "SIGNALS · ENVIRONMENT",
  "chem_grid_adapts_title": "Adapts",
  "chem_grid_adapts_sub": "SOIL · WATER · HOST",

  // Home - Statistics & Numbers
  "stat_patents": "Patents Granted",
  "stat_strains": "Proprietary & Deposited Strains",
  "stat_strain_bank": "Microbial Strain Bank",
  "stat_products": "Products Across Six Verticals",
  "stat_team": "Team Members",
  "stat_dealers": "Dealers' Network",
  "stat_countries": "Countries Beyond Bharat",
  "stat_states": "Indian States",
  "stat_founded": "Founded in Hyderabad",
  "stat_farmers": "Happy Farmers",

  // Home - How We Think
  "how_we_think_eyebrow": "THE NEXT GENERATION OF TECHNOLOGY",
  "how_we_think_quote_1": "won't be defined by what we build from scratch.",
  "how_we_think_quote_2": "It will be defined by what we unlock in biology.",
  "how_we_think_desc": "Nature has spent billions of years optimizing biochemical pathways. At Biofactor, we don't reinvent those systems — we isolate, stabilize, and scale them to restore biological equilibrium.",

  // About Page
  "about_hero_title": "Pioneering Sustainable Biological Intelligence",
  "about_hero_subtitle": "Advancing biological inputs for agriculture, livestock, and ecological restoration.",
  "about_mission_title": "Our Mission",
  "about_mission_desc": "Empowering sustainable farming, aquaculture, and animal husbandry through research-backed microbial solutions that enhance productivity without ecological harm.",
  "about_vision_title": "Our Vision",
  "about_vision_desc": "To be the global benchmark in biosolutions, unlocking the latent power of microorganisms for a healthier planet and food security.",
  "about_leadership_title": "Scientific Leadership",
  "about_leadership_desc": "Led by visionary microbiologists, agronomists, and industry veterans committed to nature-first biotechnology.",

  // Agriculture / Nutrients
  "agri_hero_title": "Advanced Crop Nutrition & Soil Regeneration",
  "agri_hero_subtitle": "Biofertilizers, biostimulants, and mycorrhizal solutions engineered for maximum nutrient uptake and root vitality.",
  "agri_benefit_soil": "Enhances Soil Microbiome",
  "agri_benefit_yield": "Boosts Crop Yield & Quality",
  "agri_benefit_roots": "Stimulates Root Architecture",
  "agri_benefit_eco": "Reduces Chemical Dependency",

  // Aquaculture
  "aqua_hero_title": "Precision Probiotics for Aquaculture",
  "aqua_hero_subtitle": "Water and pond-bottom probiotics, gut conditioners, and immune stimulators for high-yield shrimp and fish farming.",
  "aqua_water_quality": "Optimizes Water Quality & Ammonia Control",
  "aqua_gut_health": "Enhances Gut Microflora & Digestibility",
  "aqua_disease_resistance": "Strengthens Disease Resistance",

  // Bioremediation
  "bio_hero_title": "Ecological Restoration & Waste Bioremediation",
  "bio_hero_subtitle": "Targeted microbial consortia for industrial effluent degradation, municipal waste digestion, and hydrocarbon cleanup.",
  "bio_effluent": "Effluent & Wastewater Treatment",
  "bio_sludge": "Rapid Sludge & Odor Reduction",
  "bio_organic": "Organic Solid Waste Decontamination",

  // Poultry
  "poultry_hero_title": "Next-Generation Poultry Biologicals",
  "poultry_hero_subtitle": "Probiotics, prebiotic blends, and gut acidifiers engineered to optimize Feed Conversion Ratio (FCR) and flock immunity.",
  "poultry_fcr": "Improves Feed Conversion Ratio (FCR)",
  "poultry_gut": "Maintains Optimal Gut Integrity",
  "poultry_mortality": "Reduces Flock Mortality Naturally",

  // Ruminants
  "ruminants_hero_title": "Ruminant Nutrition & Rumen Ecology",
  "ruminants_hero_subtitle": "Live yeast cultures, rumen buffers, and trace mineral complexes that drive milk yield, butterfat, and digestive efficiency.",
  "ruminants_milk": "Increases Milk Production & Fat Content",
  "ruminants_rumen": "Stabilizes Rumen pH & Microbial Fermentation",
  "ruminants_immunity": "Enhances Overall Livestock Health",

  // One Health
  "one_health_hero_title": "One Health: Soil, Animal, Human, Planet",
  "one_health_hero_subtitle": "Recognizing that human health is inextricably linked to the health of our soils, waters, and animals.",
  "one_health_desc": "Healthy soil produces nutritious food. Healthy animals require fewer antibiotics. Clean water sustains communities. Our biological consortia connect these pillars into a unified restorative cycle.",

  // Science & Technology
  "science_hero_title": "Deep Science. Proven Biological Impact.",
  "science_hero_subtitle": "From microbial isolation and genetic sequencing to industrial-scale solid-state and liquid fermentation.",
  "science_fermentation": "Precision Fermentation Technology",
  "science_strain_selection": "Rigorous Strain Selection & Validation",
  "science_patents": "Proprietary Formulations & Patents",

  // Careers & Contact
  "careers_hero_title": "Shape the Future of Biotechnology",
  "careers_hero_subtitle": "Join our dynamic team of scientists, agronomists, and business leaders building a greener tomorrow.",
  "careers_view_openings": "View Job Openings",
  "contact_hero_title": "Get in Touch With Biofactor",
  "contact_hero_subtitle": "Have inquiries regarding our products, partnerships, or dealer network? We would love to hear from you.",
  "contact_name": "Full Name",
  "contact_email": "Email Address",
  "contact_phone": "Phone Number",
  "contact_message": "Your Message",
  "contact_send": "Send Message",
  "contact_sending": "Sending...",
  "contact_success": "Thank you! Your message has been sent successfully.",

  // Common UI Buttons & Labels
  "common_read_more": "Read More",
  "common_learn_more": "Learn More",
  "common_view_details": "View Details",
  "common_back": "Back",
  "common_close": "Close",
  "common_select_language": "Select Language"
};

// 3. Batch translation helper using Azure OpenAI
async function translateBatch(items, targetLang, langName) {
  const systemPrompt = `You are an expert biological science and agricultural translator.
Translate the JSON values from English to ${langName} (${targetLang}).
Rules:
1. Return ONLY valid JSON format with the identical keys.
2. Keep brand names like "Biofactor", "Biofactor Biologicals", and "Bharat" intact.
3. Keep scientific names and acronyms like "FCR", "pH", "ENZYMES", "METABOLITES" in clear acceptable form.
4. Use natural, grammatically flawless, professional and respectful tone in ${langName} script.
5. Do not include markdown code block formatting like \`\`\`json. Output raw JSON only.`;

  const userPrompt = JSON.stringify(items, null, 2);

  const res = await fetch(apiUrl, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'api-key': apiKey
    },
    body: JSON.stringify({
      messages: [
        { role: 'system', content: systemPrompt },
        { role: 'user', content: userPrompt }
      ],
      temperature: 0.2
    })
  });

  if (!res.ok) {
    const errorText = await res.text();
    throw new Error(`Azure OpenAI translation failed (${res.status} ${res.statusText}): ${errorText}`);
  }

  const data = await res.json();
  const rawContent = data.choices[0].message.content.trim();
  // Strip code fences if model included them
  const cleaned = rawContent.replace(/^```json\s*/i, '').replace(/```$/i, '').trim();
  return JSON.parse(cleaned);
}

// Split object into chunks to prevent token limits
function chunkObject(obj, chunkSize) {
  const keys = Object.keys(obj);
  const chunks = [];
  for (let i = 0; i < keys.length; i += chunkSize) {
    const chunkKeys = keys.slice(i, i + chunkSize);
    const chunk = {};
    chunkKeys.forEach(k => chunk[k] = obj[k]);
    chunks.push(chunk);
  }
  return chunks;
}

async function main() {
  console.log('🚀 Starting translation of Biofactor content via Azure OpenAI...');
  console.log(`Total keys to translate: ${Object.keys(baseEnglish).length}`);

  const outputDir = path.resolve(__dirname, '../app/i18n/locales');
  fs.mkdirSync(outputDir, { recursive: true });

  // 1. Write English directly
  fs.writeFileSync(path.join(outputDir, 'en.json'), JSON.stringify(baseEnglish, null, 2), 'utf8');
  console.log('✅ en.json written successfully.');

  const chunks = chunkObject(baseEnglish, 25);

  // 2. Translate Telugu
  console.log('\n--- Translating to Telugu (తెలుగు) ---');
  let teTranslations = {};
  for (let i = 0; i < chunks.length; i++) {
    console.log(`Translating batch ${i + 1}/${chunks.length} into Telugu...`);
    const translatedChunk = await translateBatch(chunks[i], 'te', 'Telugu');
    teTranslations = { ...teTranslations, ...translatedChunk };
  }
  fs.writeFileSync(path.join(outputDir, 'te.json'), JSON.stringify(teTranslations, null, 2), 'utf8');
  console.log('✅ te.json written successfully.');

  // 3. Translate Hindi
  console.log('\n--- Translating to Hindi (हिन्दी) ---');
  let hiTranslations = {};
  for (let i = 0; i < chunks.length; i++) {
    console.log(`Translating batch ${i + 1}/${chunks.length} into Hindi...`);
    const translatedChunk = await translateBatch(chunks[i], 'hi', 'Hindi');
    hiTranslations = { ...hiTranslations, ...translatedChunk };
  }
  fs.writeFileSync(path.join(outputDir, 'hi.json'), JSON.stringify(hiTranslations, null, 2), 'utf8');
  console.log('✅ hi.json written successfully.');

  console.log('\n🎉 Translation complete! All dictionary files created in app/i18n/locales/');
}

main().catch(err => {
  console.error('❌ Translation process failed:', err);
  process.exit(1);
});
