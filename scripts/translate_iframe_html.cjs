/**
 * Script to generate Azure OpenAI translations for all iframe HTML text content.
 * Translates to Telugu (te) and Hindi (hi).
 */
"use strict";

const https = require("https");
const fs = require("fs");
const path = require("path");

// --- Azure OpenAI config ---
require("dotenv").config({ path: path.join(__dirname, "../.env") });
const ENDPOINT = (process.env.AZURE_OPENAI_ENDPOINT || "").replace(/\/$/, "");
const API_KEY = process.env.AZURE_OPENAI_API_KEY || "";
const DEPLOYMENT = process.env.AZURE_OPENAI_DEPLOYMENT_NAME || "gpt-4.1";
const API_VERSION = process.env.AZURE_OPENAI_API_VERSION || "2024-02-01";

async function callAzure(chunk, lang) {
  const langName = lang === "te" ? "Telugu" : "Hindi";
  const systemPrompt = `You are a precise translator. Translate the given English texts to ${langName}.
Rules:
- Keep scientific/biological names (Vibrio, Bacillus, Salmonella, Clostridium, Lactobacillus, E. coli) in English (or italics)
- Keep brand/company names in English
- Keep chemical symbols unchanged (NH₃, H₂S, NO₂⁻, Cr(VI), VFA, FCR, MOS, AHL)
- Keep element symbols unchanged (P, Ca, Mg, K, Zn, Fe, Cu, N, S)
- Keep technical abbreviations unchanged (FSTP, AHPND)
- Keep numbers, percentages, units unchanged
- Keep stage numbers (01, 02, etc.) unchanged
- Keep time frames like "0-8 wks", "Days 0–30" unchanged except for words
- Return ONLY a JSON object with the same keys and translated values`;

  const userPrompt = `Translate these texts to ${langName}:\n${JSON.stringify(chunk, null, 2)}`;

  return new Promise((resolve, reject) => {
    const url = `${ENDPOINT}/openai/deployments/${DEPLOYMENT}/chat/completions?api-version=${API_VERSION}`;
    const body = JSON.stringify({
      messages: [
        { role: "system", content: systemPrompt },
        { role: "user", content: userPrompt },
      ],
      max_tokens: 3500,
      temperature: 0.2,
    });

    const urlObj = new URL(url);
    const req = https.request(
      {
        hostname: urlObj.hostname,
        path: urlObj.pathname + urlObj.search,
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "api-key": API_KEY,
          "Content-Length": Buffer.byteLength(body),
        },
      },
      (res) => {
        let data = "";
        res.on("data", (chunkData) => (data += chunkData));
        res.on("end", () => {
          try {
            const parsed = JSON.parse(data);
            const content = parsed.choices?.[0]?.message?.content || "{}";
            const jsonMatch = content.match(/\{[\s\S]*\}/);
            if (!jsonMatch) throw new Error("No JSON in response: " + content);
            resolve(JSON.parse(jsonMatch[0]));
          } catch (e) {
            reject(new Error("Parse error: " + e.message + "\nRaw: " + data.slice(0, 500)));
          }
        });
      }
    );
    req.on("error", reject);
    req.write(body);
    req.end();
  });
}

async function azureTranslate(allTexts, lang) {
  const keys = Object.keys(allTexts);
  const CHUNK_SIZE = 20;
  const merged = {};

  for (let i = 0; i < keys.length; i += CHUNK_SIZE) {
    const chunkKeys = keys.slice(i, i + CHUNK_SIZE);
    const chunk = {};
    for (const k of chunkKeys) chunk[k] = allTexts[k];

    console.log(`  translating chunk ${Math.floor(i / CHUNK_SIZE) + 1}/${Math.ceil(keys.length / CHUNK_SIZE)} (${chunkKeys.length} keys)...`);
    const translated = await callAzure(chunk, lang);
    Object.assign(merged, translated);
  }
  return merged;
}

// All texts to translate from all HTML files
const texts = {
  // === shrimp-gut-health.html ===
  sgh_eyebrow: "Inside the shrimp",
  sgh_headline1: "A healthy gut is the",
  sgh_headline2: "first line of disease defence.",
  sgh_lede: "Disease costs tropical shrimp farming up to 40% of production a year. Many bacterial diseases, including Vibrio infections such as AHPND, start by colonising the gut. Probiotics add beneficial bacteria. Prebiotics feed them. Together they restore a gut community that resists pathogens and turns more feed into growth.",
  sgh_diag_eyebrow: "Shrimp midgut · cross-section",
  sgh_diag_caption: "Midgut schematic · not to scale",
  sgh_leg1: "Probiotics line the gut wall",
  sgh_leg2: "blocked, signals silenced",
  sgh_leg3: "Prebiotics feed the good bacteria",
  sgh_box1_tag: "Probiotic",
  sgh_box1_title: "Competitive exclusion",
  sgh_box1_body: "Beneficial bacteria occupy attachment sites and nutrients on the gut wall, leaving less room for Vibrio.",
  sgh_box2_tag: "Probiotic",
  sgh_box2_title: "Quorum quenching",
  sgh_box2_body: "Some Bacillus produce AHL-lactonase, which breaks down the signals Vibrio use to coordinate attack, reducing biofilm and mortality.",
  sgh_box3_tag: "Prebiotic",
  sgh_box3_title: "Feeding the good bacteria",
  sgh_box3_body: "Oligosaccharides and β-glucans feed beneficial bacteria. Together with probiotics they form a synbiotic.",
  sgh_box4_tag: "Both",
  sgh_box4_title: "Immune priming & digestion",
  sgh_box4_body: "A balanced gut community supports immune response and digestive enzymes, so more feed converts to growth.",
  sgh_chart_title: "What pooled shrimp studies show",
  sgh_chart_sub: "Meta-analysis of probiotic trials. Every pooled effect was in the beneficial direction.",
  sgh_bar1_label: "Survival",
  sgh_bar1_sub: "improvement ↑",
  sgh_bar2_label: "Growth rate",
  sgh_bar2_sub: "improvement ↑",
  sgh_bar3_label: "FCR",
  sgh_bar3_sub: "improvement ↓",
  sgh_exp_unit: "exp.",

  // === aquaculture-culture-cycle.html ===
  acc_eyebrow: "Across the culture cycle",
  acc_headline: "The right biology at each stage.",
  acc_row0_title: "Pond bottom",
  acc_row0_sub: "ANAEROBIC CONSORTIA",
  acc_row1_title: "Water column",
  acc_row1_sub: "AEROBIC · FACULTATIVE",
  acc_row2_title: "Gut",
  acc_row2_sub: "PRE- AND PROBIOTICS",
  acc_row3_title: "Minerals",
  acc_row3_sub: "SOLUBILISING BACTERIA",
  acc_stage1_name: "POND PREP",
  acc_stage1_sub: "BEFORE STOCKING",
  acc_stage2_name: "STOCKING",
  acc_stage2_sub: "DAYS 0–30",
  acc_stage3_name: "EARLY GROW-OUT",
  acc_stage3_sub: "DAYS 30–60",
  acc_stage4_name: "PEAK BIOMASS",
  acc_stage4_sub: "DAYS 60–HARVEST",
  acc_stage5_name: "HARVEST",
  acc_stage5_sub: "AND AFTER",
  acc_c0r0: "Digest old sludge; condition the soil",
  acc_c0r1: "Build a stable bloom",
  acc_c0r3: "Correct Ca, Mg, K balance",
  acc_c1r0: "Establish the bottom community",
  acc_c1r1: "Establish nitrifiers",
  acc_c1r2: "Seed a healthy gut in post-larvae",
  acc_c1r3: "Support early moults",
  acc_c2r0: "Organic load building",
  acc_c2r1: "Night-time oxygen dips begin",
  acc_c2r2: "Hold Vibrio down as feeding rises",
  acc_c2r3: "Release sediment-bound P",
  acc_c3r0: "Highest sludge, NH₃ and H₂S risk",
  acc_c3r1: "Highest ammonia and nitrite load",
  acc_c3r2: "Highest disease pressure",
  acc_c3r3: "Frequent moults",
  acc_c4r0: "Clear sludge before next crop",
  acc_empty: "Not a focus at this stage",

  // === bioremediation-treatment-chain.html ===
  brtc_eyebrow: "ALONG THE TREATMENT CHAIN",
  brtc_headline1: "Where biology",
  brtc_headline2: "does the work.",
  brtc_subtext: "From generation and containment to final discharge, microbial consortia degrade contaminants, break down refractory sludge, and stabilise effluent before it reaches waterways.",
  brtc_row0_title: "Industrial",
  brtc_row0_sub: "EFFLUENT",
  brtc_row1_title: "Septic",
  brtc_row1_sub: "ON-SITE",
  brtc_s1_name: "SOURCE",
  brtc_s1_sub: "GENERATION",
  brtc_s2_name: "COLLECTION",
  brtc_s2_sub: "TANK · DRAIN · SUMP",
  brtc_s3_name: "BIOLOGICAL TREATMENT",
  brtc_s3_sub: "CORE PROCESS",
  brtc_s4_name: "POLISHING",
  brtc_s4_sub: "FINAL QUALITY",
  brtc_s5_name: "RECEIVING WATER",
  brtc_s5_sub: "LAKE · RIVER · REUSE",
  brtc_c1r0: "Segregate difficult streams",
  brtc_c1r1: "Correct tank design and use",
  brtc_c2r1: "Regular emptying",
  brtc_c3r0: "Dye cleavage, Cr(VI) reduction",
  brtc_c3r1: "Septage treatment at FSTP",
  brtc_c4r0: "Aerobic clean-up of by-products",
  brtc_c4r1: "Stabilised, safer sludge",
  brtc_c5r0: "Lower toxic load discharged",
  brtc_c5r1: "Less dumping into water bodies",

  // === poultry-production-stages.html ===
  pps_headline: "The right biology at every stage of the bird's life.",
  pps_subtext: "The gut faces different pressures at each stage. Biologicals work best matched to those pressures.",
  pps_row0_title: "Gut restoration",
  pps_row0_sub: "Pre- and probiotics",
  pps_row1_title: "Disease management",
  pps_row1_sub: "Exclusion, immunity",
  pps_row2_title: "Mineral availability",
  pps_row2_sub: "Solubilising bacteria",
  pps_s1_name: "Breeder flock",
  pps_s1_sub: "Parent stock",
  pps_s2_name: "Hatchery",
  pps_s2_sub: "Egg to chick",
  pps_s3_name: "Brooding",
  pps_s3_sub: "Days 0–14",
  pps_s4_name: "Grow-out",
  pps_s4_sub: "Broilers, pullets",
  pps_s5_name: "Production",
  pps_s5_sub: "Lay, market",
  pps_c1r0: "Stable gut through the laying cycle",
  pps_c1r1: "Less Salmonella passed through the egg",
  pps_c1r2: "Shell quality for hatching eggs",
  pps_c2r0: "First beneficial microbes for the chick",
  pps_c2r1: "Protect the embryo on the shell",
  pps_c2r2: "Not a focus at this stage",
  pps_c3r0: "Seed the empty gut early",
  pps_c3r1: "Early exclusion of Salmonella",
  pps_c3r2: "Bone development",
  pps_c4r0: "Recover after feed changes and stress",
  pps_c4r1: "Necrotic enteritis window",
  pps_c4r2: "Phytate P for fast growth",
  pps_c5r0: "Hold stability over a long lay",
  pps_c5r1: "Keep Salmonella off eggs",
  pps_c5r2: "Calcium for every eggshell",

  // === ruminants-production-stages.html ===
  rps_headline: "The right biology at every stage.",
  rps_subtext: "The rumen faces different pressures at each stage. Biologicals work best matched to those pressures.",
  rps_row0_title: "Rumen development",
  rps_row0_sub: "Papillae & microbial ecosystem",
  rps_row1_title: "Health & immunity",
  rps_row1_sub: "Disease resistance & stress",
  rps_row2_title: "Nutrient absorption",
  rps_row2_sub: "Energy capture & minerals",
  rps_s1_name: "Pre-weaning",
  rps_s1_sub: "0–8 wks",
  rps_s2_name: "Weaned heifer",
  rps_s2_sub: "2–12 mos",
  rps_s3_name: "Dry & transition",
  rps_s3_sub: "-3 to +3 wks",
  rps_s4_name: "Peak lactation",
  rps_s4_sub: "Wks 4–20",
  rps_s5_name: "Late lactation",
  rps_s5_sub: "Wks 20+",
  rps_c1r0: "Papillae development from milk",
  rps_c1r1: "Immune priming & gut barrier",
  rps_c1r2: "Milk as primary nutrient source",
  rps_c2r0: "Fiber digestion capacity builds",
  rps_c2r1: "Transition to solid feed stress",
  rps_c2r2: "Structural growth requires minerals",
  rps_c3r0: "Rumen adaptation for lactation",
  rps_c3r1: "Metabolic support & immunity",
  rps_c3r2: "Mineral mobilisation & storage",
  rps_c4r0: "Maximum VFA yield & efficiency",
  rps_c4r1: "High metabolic stress management",
  rps_c4r2: "Energy capture & methane reduction",
  rps_c5r0: "Persistent yield maintenance",
  rps_c5r1: "Body condition recovery",
  rps_c5r2: "Efficiency & nutrient partitioning",

  // === first-colonisers.html ===
  fc_eyebrow: "The gut is the front line",
  fc_headline1: "Whoever colonises the gut",
  fc_headline2: "first sets the course.",
  fc_stat_held: "Sites held by beneficial bacteria",
  fc_stat_turned: "Pathogens turned away",
  fc_stat_secured: "Villi fully secured",
  fc_clock_label: "hours after hatching",
  fc_btn_beneficial: "Beneficial bacteria arrive first",
  fc_btn_pathogen: "Pathogens arrive first",
  fc_legend_beneficial: "Beneficial bacteria",
  fc_p1_lead: "A chick hatches with an almost empty gut.",
  fc_p1_body: "The first bacteria to settle there shape how the gut lining develops, how the immune system matures and which pathogens can find a place to attach.",
  fc_p2_lead: "The idea is 50 years old.",
  fc_p2_body: "In 1973, Nurmi and Rantala showed that day-old chicks given gut bacteria from healthy adult hens resisted Salmonella colonisation. This became known as competitive exclusion.",

  // === poultry-gut-ledger.html ===
  pgl_page_label: "Gut restoration and disease management",
  pgl_page_title: "Probiotics bring the right bacteria. Prebiotics keep them there.",
  pgl_col1_label: "Probiotics: live beneficial bacteria",
  pgl_col1_title: "How they protect the gut",
  pgl_col2_label: "Prebiotics: food for good bacteria",
  pgl_col2_title: "How they shape the community",
  pgl_r1_left_title: "Competitive exclusion:",
  pgl_r1_left_body: "Beneficial bacteria take the attachment sites and nutrients that Salmonella, E. coli and Clostridium need.",
  pgl_r1_right_title: "Selective feeding:",
  pgl_r1_right_body: "Fibres such as mannan- and fructo-oligosaccharides pass undigested to the lower gut, where beneficial bacteria ferment them.",
  pgl_r2_left_title: "Antimicrobial compounds:",
  pgl_r2_left_body: "Bacillus and lactic acid bacteria produce substances that inhibit pathogens directly.",
  pgl_r2_right_title: "Pathogen binding:",
  pgl_r2_right_body: "Mannan-oligosaccharides (MOS) bind to the fimbriae that some bacteria use to attach, so those bacteria pass out instead of colonising.",
  pgl_r3_left_title: "Stronger gut lining:",
  pgl_r3_left_body: "A healthy community supports taller villi and tighter junctions between gut cells, so fewer pathogens and toxins get through.",
  pgl_r3_right_title: "Short-chain fatty acids:",
  pgl_r3_right_body: "Fermentation produces acids that lower gut pH, feed gut cells and discourage pathogens.",
  pgl_r4_left_title: "Hardy spores:",
  pgl_r4_left_body: "Bacillus spores tolerate heat and stomach acid far better than most bacteria, which helps them survive feed processing and reach the intestine.",
  pgl_r4_right_title: "Synbiotic effect:",
  pgl_r4_right_body: "Given together, probiotic and prebiotic reinforce each other.",
  pgl_evidence_title: "Prebiotic evidence: mannan-oligosaccharide in broilers",
  pgl_evidence_sub: "Pooled pen trials, MOS compared with a diet without antibiotics.",
  pgl_ev_label1: "mortality",
  pgl_ev_label2: "body weight",
  pgl_ev_label3: "feed conversion ratio",

  // === poultry-mineral-bioavailability.html ===
  pmb_headline1: "Unlocking the minerals",
  pmb_headline2: "already in the feed.",
  pmb_lead: "Most of the phosphorus in grain and oilseed meal is locked in phytate, a compound birds cannot break down well. Phytate also binds calcium, zinc and iron. Farmers pay for minerals twice: once in the grain and again as supplements to make up for what the bird cannot use.",
  pmb_exp1: "Mineral-solubilising bacteria in the gut produce phytase enzymes that break phytate apart, and organic acids that keep calcium and other minerals soluble where they can be absorbed. The bird gets more from the same feed, and less phosphorus ends up in the litter and the soil.",
  pmb_exp2: "This has been shown in principle: when broilers on a phosphorus-deficient diet were given Lactobacillus strains engineered to produce phytase, they grew as well as birds on a diet with adequate phosphorus.",
  pmb_meter_title: "Where feed phosphorus is locked up",
  pmb_meter_sub: "Share of total phosphorus held as phytate versus other forms.",
  pmb_corn_label: "Corn",
  pmb_corn_value: "72% phytate",
  pmb_soy_label: "Soybean meal",
  pmb_soy_value: "60% phytate",
  pmb_legend_bound: "Bound in phytate",
  pmb_legend_other: "Other forms",
  pmb_p_title: "Released from phytate",
  pmb_p_copy: "Phytate holds 60–72% of the phosphorus in soybean meal and corn.",
  pmb_ca_title: "Shell and bone",
  pmb_ca_copy: "Probiotics increased eggshell thickness and weight in laying hens.",
  pmb_znfe_title: "Freed from binding",
  pmb_znfe_copy: "Breaking down phytate also releases the trace minerals it holds.",
  pmb_source: "Only 10–30% of the phosphorus in these ingredients is available to poultry. Source: Mississippi State University Extension. The proportions shown are illustrative, not measured results.",

  // === pond-floor.html ===
  pf_title: "Inside the pond floor: where toxins are born",
  pf_water_col: "WATER COLUMN · SHRIMP",
  pf_interface: "SOIL-WATER INTERFACE · THIN OXIDISED LAYER",
  pf_sediment: "ANAEROBIC SEDIMENT · NO OXYGEN",
  pf_organic_n: "Organic N → ammonia",
  pf_nitrif: "Incomplete nitrification",
  pf_sulphate: "Sulphate-reducing bacteria",
  pf_anaerobic: "ANAEROBIC CONSORTIA",
  pf_digest: "digest the organic load",
  pf_denitrifiers: "DENITRIFIERS · SULPHIDE OXIDISERS",
  pf_n2: "N → N₂ gas · H₂S → sulphur",
  pf_settle1: "Feed, faeces, dead plankton",
  pf_settle2: "settle daily",

  // === MineralsSection.tsx hardcoded strings ===
  ms_low_salinity: "LOW-SALINITY SURVIVAL",
  ms_why_minerals: "Why minerals matter",
  ms_survival_rate: "Survival rate",
  ms_without_minerals: "Without minerals",
  ms_with_minerals: "With minerals",
};

async function main() {
  console.log("Translating", Object.keys(texts).length, "keys to Telugu and Hindi...");

  let te, hi;
  try {
    console.log("\n→ Translating to Telugu (batch 1/2)...");
    te = await azureTranslate(texts, "te");
    console.log("  Telugu done:", Object.keys(te).length, "keys");
  } catch (e) {
    console.error("Telugu translation failed:", e.message);
    process.exit(1);
  }

  try {
    console.log("\n→ Translating to Hindi (batch 2/2)...");
    hi = await azureTranslate(texts, "hi");
    console.log("  Hindi done:", Object.keys(hi).length, "keys");
  } catch (e) {
    console.error("Hindi translation failed:", e.message);
    process.exit(1);
  }

  // Save translations to a file for use in HTML injection
  const output = {
    en: texts,
    te,
    hi,
  };

  const outPath = path.join(__dirname, "iframe_translations.json");
  fs.writeFileSync(outPath, JSON.stringify(output, null, 2), "utf8");
  console.log("\n✅ Saved translations to:", outPath);
}

main().catch((e) => {
  console.error("Fatal:", e);
  process.exit(1);
});
