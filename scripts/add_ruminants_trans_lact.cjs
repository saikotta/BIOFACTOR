#!/usr/bin/env node
"use strict";

require("dotenv").config({ path: ".env" });
const fs = require("fs");
const path = require("path");

const AZURE_ENDPOINT = process.env.AZURE_OPENAI_ENDPOINT;
const AZURE_KEY = process.env.AZURE_OPENAI_KEY;
const DEPLOYMENT = process.env.AZURE_OPENAI_DEPLOYMENT || "gpt-4o";
const API_VER = "2024-02-15-preview";

async function translate(texts, lang) {
  const langName = lang === "te" ? "Telugu (తెలుగు)" : "Hindi (हिन्दी)";
  const prompt = `You are a professional translator. Translate each English value in the JSON below into ${langName}.

Rules:
- Keep brand/company names in English: "Biofactor Biologicals", "Biofac Inputs Private Limited", "MetaByaum", "MetaBiome", "One Health"
- Keep scientific names (Bacillus, Lactobacillus) in English/Latin
- Keep chemical/technical abbreviations: FCR, DMI, pH, VFA
- Keep numeric measurements: "1.2–1.8 kg", "+1.4–2.2 L/hd/day", "4.8–6.5%", "3–5 weeks"
- For stage labels like "STAGE 02 — PERIPARTURIENT" and section titles like "TRANSITION", "LACTATION" — translate the descriptive parts but keep the numbers/dashes
- Return ONLY the JSON object with same keys, translated values. No extra text.

${JSON.stringify(texts, null, 2)}`;

  const url = `${AZURE_ENDPOINT}openai/deployments/${DEPLOYMENT}/chat/completions?api-version=${API_VER}`;
  const body = {
    messages: [{ role: "user", content: prompt }],
    temperature: 0.1,
    max_tokens: 4096,
    response_format: { type: "json_object" },
  };

  const res = await fetch(url, {
    method: "POST",
    headers: { "Content-Type": "application/json", "api-key": AZURE_KEY },
    body: JSON.stringify(body),
  });

  if (!res.ok) {
    const err = await res.text();
    throw new Error(`Azure API error ${res.status}: ${err}`);
  }

  const data = await res.json();
  return JSON.parse(data.choices[0].message.content);
}

async function main() {
  const localesDir = path.join(__dirname, "../app/i18n/locales");
  const enPath = path.join(localesDir, "en.json");
  const tePath = path.join(localesDir, "te.json");
  const hiPath = path.join(localesDir, "hi.json");

  const en = JSON.parse(fs.readFileSync(enPath, "utf8"));
  const te = JSON.parse(fs.readFileSync(tePath, "utf8"));
  const hi = JSON.parse(fs.readFileSync(hiPath, "utf8"));

  // All new keys for TRANSITION (Chapter 2) and LACTATION (Chapter 3)
  const newKeys = {
    // TRANSITION editorial content (left column)
    ruminants_trans_h4: "The critical weeks around calving.",
    ruminants_trans_desc: "The transition period (3 weeks pre-calving to 3 weeks post-calving) is the highest metabolic risk window in a dairy cow's life. Rapid diet changes, immune suppression, and energy deficits create severe ruminal dysbiosis if not actively managed.",
    ruminants_trans_metabolic_title: "METABOLIC STABILITY",
    ruminants_trans_metabolic_desc: "Reduced incidence of subclinical ketosis and displaced abomasum by keeping ruminal pH stable.",
    ruminants_trans_dmi_title: "DRY MATTER INTAKE",
    ruminants_trans_dmi_desc: "1.2–1.8 kg higher daily dry matter intake during early lactation post-calving recovery.",
    ruminants_trans_inflam_title: "INFLAMMATION CONTROL",
    ruminants_trans_inflam_desc: "Targeted biologicals reduce systemic inflammatory response after calving, redirecting energy from immune activation toward milk synthesis and rapid reproductive recovery.",
    // TRANSITION stage label (right column)
    ruminants_trans_stage: "STAGE 02 — PERIPARTURIENT",
    ruminants_trans_title: "TRANSITION",
    ruminants_trans_short_desc: "Periparturient metabolic balance & dry matter intake recovery.",
    // LACTATION stage label (left column)
    ruminants_lact_stage: "STAGE 03 — PRODUCTION",
    ruminants_lact_title: "LACTATION",
    ruminants_lact_short_desc: "Peak milk production & sustained feed efficiency.",
    // LACTATION editorial content (right column)
    ruminants_lact_h4: "A more efficient rumen turns more food into milk.",
    ruminants_lact_desc: "During peak lactation, the cow's metabolic demand is extreme. Optimising the ratio of propionate to acetate in the rumen unlocks additional energy for milk fat and protein synthesis without increasing feed intake.",
    ruminants_lact_milk_title: "MILK YIELD & QUALITY",
    ruminants_lact_milk_desc: "+1.4–2.2 L/hd/day increase in energy-corrected milk yield with improved fat and protein ratio.",
    ruminants_lact_fcr_title: "FEED CONVERSION RATIO",
    ruminants_lact_fcr_desc: "4.8–6.5% improvement in overall herd feed efficiency across total lactation length.",
    ruminants_lact_sus_title: "SUSTAINED PRODUCTION",
    ruminants_lact_sus_desc: "Maintains peak milk yield for 3–5 weeks longer while reducing body condition loss during negative energy balance in early lactation.",
  };

  // Add to en.json
  Object.assign(en, newKeys);
  fs.writeFileSync(enPath, JSON.stringify(en, null, 2), "utf8");
  console.log("✅ en.json updated with", Object.keys(newKeys).length, "new keys.");

  // Translate to Telugu
  console.log("\nTranslating to Telugu...");
  const teNew = await translate(newKeys, "te");
  Object.assign(te, teNew);
  fs.writeFileSync(tePath, JSON.stringify(te, null, 2), "utf8");
  console.log("✅ te.json updated.");

  // Translate to Hindi
  console.log("Translating to Hindi...");
  const hiNew = await translate(newKeys, "hi");
  Object.assign(hi, hiNew);
  fs.writeFileSync(hiPath, JSON.stringify(hi, null, 2), "utf8");
  console.log("✅ hi.json updated.");

  console.log("\n🎉 All ruminants TRANSITION & LACTATION keys added!");
}

main().catch((e) => { console.error(e); process.exit(1); });
