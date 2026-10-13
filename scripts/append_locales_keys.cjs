const fs = require('fs');
const path = require('path');

const enPath = path.join(__dirname, '../app/i18n/locales/en.json');
const tePath = path.join(__dirname, '../app/i18n/locales/te.json');
const hiPath = path.join(__dirname, '../app/i18n/locales/hi.json');

const en = JSON.parse(fs.readFileSync(enPath, 'utf8'));
const te = JSON.parse(fs.readFileSync(tePath, 'utf8'));
const hi = JSON.parse(fs.readFileSync(hiPath, 'utf8'));

const iframeTr = JSON.parse(fs.readFileSync(path.join(__dirname, 'iframe_translations.json'), 'utf8'));

// Keys for MineralsSection
en.aqua_minerals_eyebrow = "LOW-SALINITY SURVIVAL";
en.aqua_minerals_chart_title = "Why minerals matter";
en.aqua_minerals_survival_rate = "Survival rate";
en.aqua_minerals_without = "Without minerals";
en.aqua_minerals_with = "With minerals";

te.aqua_minerals_eyebrow = iframeTr.te.ms_low_salinity || "తక్కువ ఉప్పుతనం లో జీవించటం";
te.aqua_minerals_chart_title = iframeTr.te.ms_why_minerals || "ఖనిజాలు ఎందుకు అవసరం";
te.aqua_minerals_survival_rate = iframeTr.te.ms_survival_rate || "జీవిత రేటు";
te.aqua_minerals_without = iframeTr.te.ms_without_minerals || "ఖనిజాలు లేకుండా";
te.aqua_minerals_with = iframeTr.te.ms_with_minerals || "ఖనిజాలతో";

hi.aqua_minerals_eyebrow = iframeTr.hi.ms_low_salinity || "कम लवणता में जीवित रहना";
hi.aqua_minerals_chart_title = iframeTr.hi.ms_why_minerals || "खनिज क्यों महत्वपूर्ण हैं";
hi.aqua_minerals_survival_rate = iframeTr.hi.ms_survival_rate || "जीवित रहने की दर";
hi.aqua_minerals_without = iframeTr.hi.ms_without_minerals || "खनिजों के बिना";
hi.aqua_minerals_with = iframeTr.hi.ms_with_minerals || "खनिजों के साथ";

// Keys for PoultryThreeBirds
en.poultry_three_chart_title = "Hatching eggs sprayed with probiotic bacteria";
en.poultry_three_chart_sub = "Share of egg contents and embryos positive for Salmonella Enteritidis by day 18 of incubation";
en.poultry_three_untreated = "Untreated";
en.poultry_three_disinfectant = "Chemical disinfectant";
en.poultry_three_probiotic = "Probiotic spray";
en.poultry_three_chart_note = "Scale 0–100%. 560 hatching eggs, two Lactobacillus strains. Kosuri et al. 2025, Poultry Science.[5]";

te.poultry_three_chart_title = "ప్రోబయోటిక్ బ్యాక్టీరియాతో స్ప్రే చేసిన పొదిగే గుడ్లు";
te.poultry_three_chart_sub = "పొదిగే 18వ రోజు నాటికి Salmonella Enteritidis పాజిటివ్‌గా ఉన్న గుడ్డు కంటెంట్‌లు మరియు పిండాల వాటా";
te.poultry_three_untreated = "చికిత్స చేయనివి";
te.poultry_three_disinfectant = "రసాయన క్రిమిసంహారకం";
te.poultry_three_probiotic = "ప్రోబయోటిక్ స్ప్రే";
te.poultry_three_chart_note = "స్కేల్ 0–100%. 560 పొదిగే గుడ్లు, రెండు Lactobacillus జాతులు. Kosuri et al. 2025, Poultry Science.[5]";

hi.poultry_three_chart_title = "प्रोबायोटिक बैक्टीरिया से स्प्रे किए गए सेते अंडे";
hi.poultry_three_chart_sub = "ऊष्मायन के 18वें दिन तक Salmonella Enteritidis के लिए सकारात्मक अंडे की सामग्री और भ्रूण का हिस्सा";
hi.poultry_three_untreated = "अनुपचारित";
hi.poultry_three_disinfectant = "रासायनिक कीटाणुनाशक";
hi.poultry_three_probiotic = "प्रोबायोटिक स्प्रे";
hi.poultry_three_chart_note = "स्केल 0–100%। 560 सेते अंडे, दो Lactobacillus उपभेद। Kosuri et al. 2025, Poultry Science.[5]";

fs.writeFileSync(enPath, JSON.stringify(en, null, 2), 'utf8');
fs.writeFileSync(tePath, JSON.stringify(te, null, 2), 'utf8');
fs.writeFileSync(hiPath, JSON.stringify(hi, null, 2), 'utf8');

console.log('Successfully updated en.json, te.json, hi.json with new keys.');
