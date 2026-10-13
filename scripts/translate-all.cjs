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
  "stat_dsir_heading": "DSIR-recognised in-house research facilities",
  "stat_conviction_copy": "Biology that transforms yields and safeguards ecological resilience.",

  // Home - How We Think
  "how_we_think_eyebrow": "THE NEXT GENERATION OF TECHNOLOGY",
  "how_we_think_quote_1": "won't be defined by what we build from scratch.",
  "how_we_think_quote_2": "It will be defined by what we unlock in biology.",
  "how_we_think_larger": "larger.",
  "how_we_think_desc": "Nature has spent billions of years optimizing biochemical pathways. At Biofactor, we don't reinvent those systems — we isolate, stabilize, and scale them to restore biological equilibrium.",
  "how_we_think_systems_tag": "SYSTEMS FIRST",
  "how_we_think_systems_desc": "Soil, animal, and plant biology work in continuous cycles, not isolation.",
  "how_we_think_signal_tag": "SIGNAL NOT NOISE",
  "how_we_think_signal_desc": "Targeted enzymes and microbial strains that trigger natural biochemical pathways.",
  "how_we_think_scale_tag": "SCALE READY",
  "how_we_think_scale_desc": "Industrial fermentation engineered to deliver consistent field performance.",

  // About Page
  "about_hero_title": "Pioneering Sustainable Biological Intelligence",
  "about_hero_subtitle": "Advancing biological inputs for agriculture, livestock, and ecological restoration.",
  "about_hero_line1": "WE ARE",
  "about_hero_line2": "BIOFACTOR",
  "about_hero_founding": "A biological sciences company founded on a single conviction: the answers to agricultural sustainability already exist in nature.",
  "about_bio_intel_para1": "At Biofactor, we study biological intelligence — the intricate biochemical pathways and microbial consortia evolved over billions of years.",
  "about_bio_intel_para2": "We isolate, stabilise, and scale elite microbial strains to solve foundational agricultural, livestock, and ecological challenges.",
  "about_bio_intel_quote_1": "Complete,",
  "about_bio_intel_quote_2": "not replace.",
  "about_bio_intel_quote_3": "Restore,",
  "about_bio_intel_quote_4": "not deplete.",
  "about_bio_intel_closing": "Working in harmony with living biology to build generational resilience.",
  "about_soil_desc": "Recognised worldwide as an elite biological innovator.",
  "about_soil_statement_p1": "Every agricultural output traces back to the health of the soil.",
  "about_soil_statement_p2": "When the soil microbiome is biologically balanced, crops flourish and dependency on chemicals diminishes.",
  "about_soil_statement_p3": "We are proudly known as the Soil Company.",
  "about_soil_the_soil_company": "THE SOIL COMPANY",
  "about_soil_onehealth": "ONE HEALTH INTEGRATION",
  "about_card_product_range": "Product Range",
  "about_card_verticals": "Core Verticals",
  "about_card_ip_patents": "Granted Patents",
  "about_card_ip_tech": "Proprietary Platforms",
  "about_card_domestic_dealers": "Dealer Network",
  "about_card_domestic_farmers": "Farmers Reached",
  "about_card_team_scientists": "R&D Scientists",
  "about_card_team_members": "Total Workforce",
  "about_card_intl_countries": "Global Markets",
  "about_card_intl_footprint": "International Footprint",
  "about_vision_kicker": "OUR VISION",
  "about_vision_heading": "Global benchmark in biological solutions.",
  "about_vision_desc": "Unlocking the latent power of microorganisms to drive global food security and planetary regeneration.",
  "about_mission_kicker": "OUR MISSION",
  "about_mission_desc": "Empowering sustainable farming, aquaculture, and animal husbandry through research-backed microbial solutions that enhance productivity without ecological harm.",
  "about_chain_soil": "Soil",
  "about_chain_crops": "Crops",
  "about_chain_water": "Water",
  "about_chain_shrimp": "Shrimp ponds",
  "about_chain_poultry": "Poultry",
  "about_chain_animals": "Animals",
  "about_chain_human": "Human health",
  "about_lead_kicker": "LEADERSHIP",
  "about_lead_title": "Guided by Science & Integrity",
  "about_lead_role_ceo": "Founder & Managing Director",
  "about_lead_role_director": "Executive Director",
  "about_lead_role_rnd": "Head of Research & Development",
  "about_journey_kicker": "OUR JOURNEY",
  "about_journey_title": "A Decade of Impact",

  // --- NUTRIENTS ---
  "nutrients_hero_eyebrow": "PLANT NUTRITION · BIOLOGICAL MOBILISATION",
  "nutrients_hero_title": "BIOLOGY THAT MOVES NUTRIENTS",
  "nutrients_hero_subtitle": "Converting unavailable soil reserves into active plant nutrition through living microbial pathways.",
  "nutrients_card1_tag": "CHEMICAL INPUTS",
  "nutrients_card1_text": "Adding synthetic chemicals often results in 70% fixation or runoff.",
  "nutrients_card2_tag": "BIOLOGICAL MOBILISATION",
  "nutrients_card2_text": "Microbial inoculants unlock existing soil reserves into active plant-available nutrition.",
  "nutrients_n_title": "NITROGEN",
  "nutrients_n_sub": "From the atmosphere to biology.",
  "nutrients_n_atomic": "NITROGEN · ATOMIC NO. 7",
  "nutrients_n_card_title": "EARTH'S ATMOSPHERE BY VOLUME",
  "nutrients_n_card_desc": "is nitrogen. Plants cannot use atmospheric N₂ directly.",
  "nutrients_n_para1": "The atmosphere contains approximately 78% nitrogen. Yet plants cannot use atmospheric N₂ directly. Nitrogen-fixing microorganisms convert that inert atmospheric nitrogen into biologically useful forms.",
  "nutrients_n_para2": "Under suitable symbiotic conditions, legumes can fix more than 250 kg N per hectare in a growing season. In other systems, biological nitrogen fixation is lower and depends on the microorganism, crop, soil and environment.",
  "nutrients_n_row1_title": "GLOBAL FIXATION",
  "nutrients_n_row1_desc": "fixed biologically in agricultural systems every year, worldwide.",
  "nutrients_n_row2_title": "FIXATION CAPACITY",
  "nutrients_n_row2_desc": "reported for faba bean; up to 389 kg N/ha for red clover.",
  "nutrients_n_principle_tag": "BIOLOGICAL PRINCIPLE",
  "nutrients_n_principle_quote": "Biology does not invent nitrogen. It opens a pathway to the largest nitrogen reservoir on Earth.",
  "nutrients_p_title": "PHOSPHORUS",
  "nutrients_p_sub": "From locked-up to available.",
  "nutrients_p_atomic": "PHOSPHORUS · ATOMIC NO. 15",
  "nutrients_p_card_title": "APPLIED FERTILISER P USED BY THE CROP",
  "nutrients_p_card_season": "SEASON 1",
  "nutrients_p_card_desc": "The rest is rapidly fixed in the soil.",
  "nutrients_p_para1": "Phosphorus is abundant in many soils. Most of it, however, remains locked in insoluble mineral or chemically bound forms that plants cannot readily access.",
  "nutrients_p_para2": "Phosphate-solubilising microorganisms release organic acids, chelating compounds and other metabolites that help convert these forms into more plant-available phosphorus.",
  "nutrients_p_row1_title": "ORGANIC ACIDS",
  "nutrients_p_row1_desc": "release bound phosphate from calcium and iron complexes.",
  "nutrients_p_row2_title": "P-USE EFFICIENCY",
  "nutrients_p_row2_desc": "average gain with biofertilisers across field trials worldwide.",
  "nutrients_p_principle_quote": "The real question is not simply how much phosphorus is added. It is: how much of the phosphorus already present can biology make accessible?",
  "nutrients_k_title": "POTASSIUM",
  "nutrients_k_sub": "From mineral reserves to plant availability.",
  "nutrients_k_atomic": "POTASSIUM · ATOMIC NO. 19",
  "nutrients_k_card_title": "TOTAL SOIL K HELD IN MINERAL FORMS",
  "nutrients_k_card_minerals": "FELDSPAR · MICA",
  "nutrients_k_card_desc": "of the total K in most soils is not readily available to plants.",
  "nutrients_k_para1": "Soils can contain enormous quantities of potassium. Only a small fraction is immediately available to plants.",
  "nutrients_k_para2": "Potassium-solubilising microorganisms release potassium from mineral sources through organic-acid production and biological weathering.",
  "nutrients_k_row1_title": "DIRECT RECOVERY",
  "nutrients_k_row1_desc": "of soil K is in water-soluble & exchangeable forms roots can take up directly.",
  "nutrients_k_row2_title": "WEATHERING MECHANISM",
  "nutrients_k_row2_desc": "break silicate lattices to release soluble potassium ions.",
  "nutrients_k_principle_quote": "Again, the opportunity is not simply to add more potassium. It is to unlock more of what already exists.",
  "nutrients_closing_statement": "Because the future of plant nutrition is not only about what we put into the soil. It is also about what biology can unlock from it.",
  "nutrients_closing_focus": "RHIZOSPHERE & PLANT NUTRITION",

  // --- AQUACULTURE ---
  "aqua_hero_title": "BIOLOGY THAT BALANCES THE POND.",
  "aqua_hero_subtitle": "Most pond problems start at the bottom. Our targeted consortia manage organic load, eliminate toxic gases, and maintain water stability throughout the culture cycle.",
  "aqua_data_phosphorus": "of the phosphorus added to a vannamei pond settles into the sediment. Only about a third of the nitrogen leaves as harvested shrimp.",
  "aqua_data_oxygen": "below the sediment surface, pore water usually holds no oxygen at all.",
  "aqua_data_sulphide": "is the safe limit for hydrogen sulphide in brackish-water ponds. At 50–500 µg/L, half of exposed marine animals can die within 96 hours.",
  "aqua_water_above": "ABOVE THE BOTTOM",
  "aqua_water_title": "WATER",
  "aqua_water_sub": "Oxygen-rich at the surface. Low and shifting at night.",
  "aqua_water_stable": "Keeping the water column stable.",
  "aqua_water_zone1_label": "Surface: aerobic",
  "aqua_water_zone1_body": "Nitrifying bacteria near aerators convert ammonia to nitrate, and Bacillus clear dissolved organic matter so the plankton bloom stays steady.",
  "aqua_water_zone2_label": "Mid-water: micro-aerophilic",
  "aqua_water_zone2_body": "Facultative and photosynthetic bacteria such as Rhodopseudomonas palustris keep taking up ammonia and nitrite through night-time oxygen dips.",
  "aqua_bottom_tag": "THE POND BOTTOM",
  "aqua_bottom_title": "Where organic load turns into toxic gas.",
  "aqua_bottom_desc": "Uneaten feed, faeces and dead plankton settle on the bottom every day. Just below the surface of that sludge there is no oxygen, and microbes break it down anaerobically. The by-products seep up into the water where the shrimp live.",
  "aqua_bottom_how_toxins": "HOW TOXINS FORM",
  "aqua_bottom_three_toxins": "Three toxic metabolites, one source.",
  "aqua_bottom_ammonia_title": "Ammonia (NH₃)",
  "aqua_bottom_ammonia_desc": "Released as proteins in feed and faeces break down in the sediment.",
  "aqua_bottom_nitrite_title": "Nitrite (NO₂⁻)",
  "aqua_bottom_nitrite_desc": "Accumulates when low oxygen at the bottom stops nitrification halfway.",
  "aqua_bottom_h2s_title": "Hydrogen sulphide (H₂S)",
  "aqua_bottom_h2s_desc": "Produced by sulphate-reducing bacteria such as Desulfovibrio in oxygen-free sediment.",
  "aqua_bottom_upward_title": "Released upward",
  "aqua_bottom_upward_desc": "All three diffuse into the water column, where they stress shrimp, suppress feeding and weaken immunity.",
  "aqua_consortia_tag": "WHAT BIOLOGY DOES",
  "aqua_consortia_title": "CONSORTIA",
  "aqua_consortia_sub": "Anaerobic and facultative probiotics working together",
  "aqua_consortia_heading": "Anaerobic probiotics manage the load at its source.",
  "aqua_consortia_desc": "Surface-water probiotics cannot reach the sediment, where the problem starts. Anaerobic and facultative bacteria can, and they work as a consortium.",
  "aqua_consortia_point1_title": "Digest the organic load",
  "aqua_consortia_point1_desc": "Hydrolytic bacteria break down sludge, leaving less fuel for H₂S producers.",
  "aqua_consortia_point2_title": "Remove nitrogen as gas",
  "aqua_consortia_point2_desc": "Denitrifying bacteria convert nitrate and nitrite to harmless N₂, which leaves the pond for good.",
  "aqua_consortia_point3_title": "Neutralise sulphide",
  "aqua_consortia_point3_desc": "Sulphide-oxidising and photosynthetic bacteria convert H₂S before it reaches the water.",
  "aqua_consortia_point4_title": "Protect the interface",
  "aqua_consortia_point4_desc": "A lighter organic load uses less oxygen, helping keep the thin top layer of sediment oxidised.",
  "aqua_minerals_title": "Minerals shrimp can actually use.",
  "aqua_minerals_desc1": "Shrimp absorb minerals directly from water through gills and exoskeleton. In low-salinity ponds, essential minerals like potassium, magnesium and calcium become limiting factors for growth and moulting.",
  "aqua_minerals_desc2": "Chelated minerals improve bioavailability, allowing shrimp to maintain ion balance and complete successful moults even in freshwater conditions.",
  "aqua_minerals_p_title": "Phosphorus",
  "aqua_minerals_p_desc": "Supports energy metabolism and skeletal development. Chelation prevents precipitation in alkaline water.",
  "aqua_minerals_kmg_title": "Potassium + magnesium",
  "aqua_minerals_kmg_desc": "Maintain osmotic balance. Critical for successful moulting in low-salinity conditions.",
  "aqua_minerals_ca_title": "Calcium",
  "aqua_minerals_ca_desc": "Essential for exoskeleton formation. Chelated calcium improves absorption during intermoult periods.",
  "aqua_minerals_why": "Why minerals matter",
  "aqua_minerals_survival_tag": "LOW-SALINITY SURVIVAL",
  "aqua_minerals_without": "Without minerals",
  "aqua_minerals_with": "With minerals",
  "aqua_closing_tag": "THE BIOFACTOR APPROACH",
  "aqua_closing_title": "Manage the bottom, and the water follows.",
  "aqua_closing_desc": "A healthy pond starts a few millimetres below the surface of the sediment. Our anaerobic and facultative consortia work exactly there — breaking down organic load, removing toxic gases and restoring the soil–water interface that shrimp depend on.",
  "aqua_closing_stat1": "less H₂S in treated sediment",
  "aqua_closing_stat2": "of production lost to disease annually",
  "aqua_closing_stat3": "more feed converts to growth",

  // --- BIOREMEDIATION ---
  "bio_hero_title": "BIOLOGY THAT CLEANS WATER & RESTORES ECOSYSTEMS.",
  "bio_hero_subtitle": "Targeted microbial consortia that degrade complex organic contaminants, eliminate toxic sludge, and restore natural water quality without synthetic chemicals.",
  "bio_data_sanitation": "people still lacked safely managed sanitation in 2024.",
  "bio_data_countries": "countries could report how much of their industrial wastewater is treated. The rest of the world has no reliable data.",
  "bio_data_household": "of household wastewater worldwide was safely treated in 2020. Data on industrial wastewater is too thin for a global figure.",
  "bio_oxygen_tag": "HOW BIOLOGICAL TREATMENT WORKS",
  "bio_oxygen_title": "Three oxygen conditions, three kinds of microbial work.",
  "bio_oxygen_desc": "Good treatment moves wastewater through zones with no oxygen, low oxygen and plenty of oxygen. Each zone favours different microbes, and each removes a different part of the pollution.",
  "bio_oxygen_raw_tag": "RAW WASTEWATER",
  "bio_oxygen_raw_sub": "organics · N · P · dyes · metals",
  "bio_oxygen_anaerobic_tag": "ANAEROBIC · NO O₂",
  "bio_oxygen_anoxic_tag": "ANOXIC · NITRATE AS ELECTRON ACCEPTOR",
  "bio_oxygen_aerobic_tag": "AEROBIC · WITH O₂",
  "bio_oxygen_treated_tag": "TREATED WATER & SLUDGE",
  "bio_diff_tag": "DIFFERENT WASTES NEED DIFFERENT MICROBES",
  "bio_diff_title": "DIFFERENT WASTES NEED DIFFERENT MICROBES.",
  "bio_ind_tag": "TEXTILE · TANNERY · PROCESS",
  "bio_ind_title": "INDUSTRIAL",
  "bio_ind_priority": "Priority · colour, toxic metals, compounds normal sludge can't handle",
  "bio_ind_heading": "Specialist microbes for specialist pollutants.",
  "bio_ind_desc": "Industrial effluents carry compounds that ordinary sewage bacteria rarely meet. Azo dyes make up about two-thirds of synthetic dyes, and an estimated 10–15% of dye produced is discarded into the environment. Tannery effluent can carry hexavalent chromium, which is toxic and carcinogenic.",
  "bio_ind_dye_title": "DYE DECOLOURISATION",
  "bio_ind_dye_desc": "Bacterial azoreductases split the azo bond without oxygen. An aerobic step then breaks down the aromatic amines this produces.",
  "bio_ind_chrom_title": "CHROMIUM DETOXIFICATION",
  "bio_ind_chrom_desc": "Chromium-resistant bacteria reduce toxic Cr(VI) to far less mobile and less toxic Cr(III).",
  "bio_closing_quote": "Clean water is not the absence of microbes. It is the right microbes, doing the work.",

  // --- POULTRY ---
  "poultry_hero_title": "BIOLOGY THAT PROTECTS THE FLOCK.",
  "poultry_hero_subtitle": "The gut is the bird’s largest barrier, immune organ, and engine for growth. Our microbial solutions stabilise the microbiome, enhance feed conversion, and replace prophylactic antibiotics.",
  "poultry_data_necrotic": "Estimated yearly global cost of necrotic enteritis, a gut disease of broilers.",
  "poultry_data_ban": "The EU banned all antibiotics as feed growth promoters. Other markets have followed, including India’s 2019 ban on colistin for food animals.",
  "poultry_data_phos": "of the phosphorus in corn and soybean meal is available to poultry. The rest passes through into the litter.",
  "poultry_three_tag": "04 / BREEDERS, LAYERS AND BROILERS",
  "poultry_three_title": "Breeders, layers and broilers need different things from the gut.",
  "poultry_breeders_tag": "PARENT STOCK",
  "poultry_breeders_title": "BREEDERS",
  "poultry_breeders_priority": "Priority · gut health for hatchability, chick quality and longevity",
  "poultry_breeders_heading": "A breeder passes more than genes.",
  "poultry_breeders_desc": "Breeder hens live longer and undergo distinct nutritional and physiological stages. A healthy gut ensures maternal antibody transfer, consistent eggshell quality, and vital microbial seeding to the next generation.",
  "poultry_layers_tag": "COMMERCIAL EGG PRODUCTION",
  "poultry_layers_title": "LAYERS",
  "poultry_layers_priority": "Priority · sustained lay, strong shells and gut stability over a long cycle",
  "poultry_layers_heading": "A long laying cycle needs a stable gut.",
  "poultry_layers_desc": "A laying hen produces for a year or more, and every egg draws heavily on calcium and phosphorus. A balanced gut community supports feed efficiency and mineral uptake across the whole cycle, and helps keep Salmonella out of the flock and off the eggs.",
  "poultry_broilers_tag": "MEAT PRODUCTION",
  "poultry_broilers_title": "BROILERS",
  "poultry_broilers_priority": "Priority · rapid growth, uniform FCR and disease resilience in short cycles",
  "poultry_broilers_heading": "42 days to build everything.",
  "poultry_broilers_desc": "Broilers grow at astonishing rates. Every gram of weight gain depends on villi height, enzyme activity, and a healthy gut wall. Our probiotics colonise the young gut on day one, priming digestive capacity and shielding against Clostridium perfringens.",
  "poultry_closing_quote": "Feed the microbes well, and they feed the animal.",

  // --- RUMINANTS ---
  "ruminants_hero_title": "BIOLOGY THAT FEEDS THE RUMEN.",
  "ruminants_hero_subtitle": "The cow feeds the rumen, and the rumen feeds the cow. Our targeted biological inputs support microbial fermentation, prevent subacute acidosis, and convert roughage into high-value milk and butterfat.",
  "ruminants_data_milk": "of milk was forecast to be produced worldwide in 2023. The largest producer, India, supplies about a quarter.",
  "ruminants_data_methane": "of a ruminant's energy intake is lost as methane during rumen fermentation.",
  "ruminants_data_acidosis": "of early- and mid-lactation dairy cows show subacute ruminal acidosis in surveys.",
  "ruminants_rumen_tag": "01 / A LIVING FERMENTER",
  "ruminants_rumen_title": "The rumen is a microbial factory with one customer.",
  "ruminants_rumen_desc": "Bacteria, protozoa, fungi and archaea in the rumen break down fibre and starch. What they produce feeds the animal. What they waste leaves as methane.",
  "ruminants_stages_tag": "02 / TARGETED ANIMAL APPLICATIONS",
  "ruminants_stages_title": "From the first week of life to peak lactation.",
  "ruminants_calves_tag": "STAGE 01 — REARING",
  "ruminants_calves_title": "CALVES",
  "ruminants_calves_desc": "Early-life gut colonisation & early rumen development.",
  "ruminants_methane_tag": "03 / ENTERIC EMISSIONS REDUCTION",
  "ruminants_methane_title": "Methane is feed energy the animal never uses.",
  "ruminants_methane_desc": "Enteric methane from ruminants represents not only 14.5% of global human-induced greenhouse gas emissions, but also 2–12% of the gross feed energy the animal consumes without gaining any benefit.",
  "ruminants_closing_quote": "Feed the microbes well, and they feed the animal.",

  // --- ONE HEALTH ---
  "one_health_chapter_soil_title": "Soil",
  "one_health_chapter_soil_headline": "Where It Starts",
  "one_health_chapter_soil_desc": "Healthy soil is alive — full of microbes, minerals, and structure that let roots do their job. Everything else in this chain depends on getting soil right first.",
  "one_health_chapter_plant_title": "Plant",
  "one_health_chapter_plant_headline": "The First Beneficiary",
  "one_health_chapter_plant_desc": "A plant grown in healthy soil is stronger before it's ever sprayed, fed, or harvested. Plant health starts underground, long before it shows above it.",
  "one_health_chapter_animal_title": "Animal",
  "one_health_chapter_animal_headline": "Sharing the Same Foundation",
  "one_health_chapter_animal_desc": "Animals raised on healthy feed and healthy land carry that health forward — into growth, into resistance to disease, into what they eventually become.",
  "one_health_chapter_food_title": "Food",
  "one_health_chapter_food_headline": "What All of This Becomes",
  "one_health_chapter_food_desc": "Every meal traces back through this chain — soil, plant, and animal all show up on a plate, whether anyone thinks about it or not.",
  "one_health_chapter_people_title": "People",
  "one_health_chapter_people_headline": "The Point of All of It",
  "one_health_chapter_people_desc": "Food quality isn't separate from soil quality. When the chain holds up from the start, it shows up in the people eating at the end of it.",
  "one_health_chapter_planet_title": "Planet",
  "one_health_chapter_planet_headline": "What Holds the Whole Chain",
  "one_health_chapter_planet_desc": "Every link here draws on the same land, water, and climate. A chain that only works for one link at a time isn't sustainable — it has to hold across all of them, or it doesn't really hold.",
  "one_health_closing_statement": "This is why we build agriculture, aquaculture, poultry, and animal health as one connected platform — not six separate businesses.",
  "one_health_scroll_hint": "Scroll to follow the chain",
  "one_health_see_verticals": "See where this shows up across our verticals",

  // --- CAREERS ---
  "careers_hiring_pill": "We're hiring!",
  "careers_hero_h1": "Grow Your Career at",
  "careers_hero_sub": "Join us in revolutionizing sustainable agriculture through innovative biological solutions.",
  "careers_contact_hr": "Contact HR Department",
  "careers_view_positions": "View Open Positions",
  "careers_why_choose_tag": "Why Choose Us",
  "careers_why_join_title": "Why Join Biofactor?",
  "careers_why_join_desc": "Be part of a mission-driven team that's transforming agriculture while building meaningful careers.",
  "careers_openings_tag": "Join Our Team",
  "careers_openings_title": "Current Job Openings",
  "careers_openings_desc": "Explore opportunities to contribute to sustainable agriculture.",
  "careers_process_tag": "Application Process",
  "careers_process_title": "Our Hiring Process",
  "careers_process_desc": "A transparent and engaging journey from application to onboarding.",
  "careers_apply_now": "Apply Now",

  // --- CONTACT ---
  "contact_f1_tag": "01 / 05 · GET IN TOUCH",
  "contact_f1_h1": "Grow With Expert Agricultural Support",
  "contact_f1_lead": "Get personalized solutions for your farming needs. Our team of agricultural experts is ready to help you increase yield and maximize profits.",
  "contact_f1_cta": "Explore Science & Tech →",
  "contact_f2_tag": "02 / 05 · REACH US",
  "contact_f2_h3": "Three ways to reach our experts",
  "contact_f2_call": "Call Us",
  "contact_f2_email": "Email Us",
  "contact_f2_visit": "Visit Us",
  "contact_f4_tag": "04 / 05 · VISITING HOURS",
  "contact_f4_h2": "We're open six days a week",
  "contact_f4_sub": "Walk in or call us during these hours.",

  // --- RESOURCES ---
  "resources_hub_tag": "Biofactor Intelligence Hub",
  "resources_hub_title": "Scientific Resource Hub",
  "resources_hub_desc": "Explore our curated library of peer-reviewed research papers and scientific studies demonstrating microbial bio-stimulant performance and environmental impact.",
  "resources_search_placeholder": "Search by title, topic, author or keyword...",
  "resources_published_papers": "Published Research Papers",
  "resources_view_study": "View Full Study & Figures",
  "resources_download_pdf": "Download Full Paper (PDF)",

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
3. Keep scientific names and chemical formulas like "FCR", "pH", "ENZYMES", "METABOLITES", "H₂S", "N₂", "NH₃", "NO₂⁻", "Cr(VI)", "Cr(III)", "Ca", "Mg", "K", "Zn", "Fe" intact and appropriate.
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

  // Load existing Telugu and Hindi translations to avoid re-translating existing keys
  let existingTe = {};
  let existingHi = {};
  try {
    if (fs.existsSync(path.join(outputDir, 'te.json'))) {
      existingTe = JSON.parse(fs.readFileSync(path.join(outputDir, 'te.json'), 'utf8'));
    }
    if (fs.existsSync(path.join(outputDir, 'hi.json'))) {
      existingHi = JSON.parse(fs.readFileSync(path.join(outputDir, 'hi.json'), 'utf8'));
    }
  } catch (e) {
    console.warn('Could not read existing translations:', e);
  }

  // Find missing keys for Telugu
  const missingTe = {};
  for (const k of Object.keys(baseEnglish)) {
    if (!existingTe[k]) missingTe[k] = baseEnglish[k];
  }
  console.log(`Missing Telugu keys to translate: ${Object.keys(missingTe).length}`);

  if (Object.keys(missingTe).length > 0) {
    const teChunks = chunkObject(missingTe, 25);
    for (let i = 0; i < teChunks.length; i++) {
      console.log(`Translating batch ${i + 1}/${teChunks.length} into Telugu...`);
      const translatedChunk = await translateBatch(teChunks[i], 'te', 'Telugu');
      existingTe = { ...existingTe, ...translatedChunk };
    }
  }
  fs.writeFileSync(path.join(outputDir, 'te.json'), JSON.stringify(existingTe, null, 2), 'utf8');
  console.log('✅ te.json updated successfully.');

  // Find missing keys for Hindi
  const missingHi = {};
  for (const k of Object.keys(baseEnglish)) {
    if (!existingHi[k]) missingHi[k] = baseEnglish[k];
  }
  console.log(`Missing Hindi keys to translate: ${Object.keys(missingHi).length}`);

  if (Object.keys(missingHi).length > 0) {
    const hiChunks = chunkObject(missingHi, 25);
    for (let i = 0; i < hiChunks.length; i++) {
      console.log(`Translating batch ${i + 1}/${hiChunks.length} into Hindi...`);
      const translatedChunk = await translateBatch(hiChunks[i], 'hi', 'Hindi');
      existingHi = { ...existingHi, ...translatedChunk };
    }
  }
  fs.writeFileSync(path.join(outputDir, 'hi.json'), JSON.stringify(existingHi, null, 2), 'utf8');
  console.log('✅ hi.json updated successfully.');

  console.log('\n🎉 Translation complete! All dictionary files created in app/i18n/locales/');
}

main().catch(err => {
  console.error('❌ Translation process failed:', err);
  process.exit(1);
});
