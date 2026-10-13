/**
 * Script to inject multilingual support (en, te, hi) into all 9 public HTML files.
 */
const fs = require('fs');
const path = require('path');

const tr = JSON.parse(fs.readFileSync(path.join(__dirname, 'iframe_translations.json'), 'utf8'));

// Helper to wrap script
function getLangScript(scriptFn) {
  return `<script>
(function() {
  var lang = new URLSearchParams(window.location.search).get('lang') || 'en';
  if (lang !== 'te' && lang !== 'hi') return;
  var trData = ${JSON.stringify(tr)};
  var T = trData[lang] || {};
  (${scriptFn.toString()})(T, lang);
})();
</script>`;
}

// 1. shrimp-gut-health.html
function patchShrimpGutHealth() {
  const filePath = path.join(__dirname, '../public/shrimp-gut-health.html');
  let content = fs.readFileSync(filePath, 'utf8');

  const patchTag = '<!-- I18N_INJECTED_SHRIMP -->';
  if (content.includes(patchTag)) return;

  const script = `${patchTag}
<script>
(function() {
  var lang = new URLSearchParams(window.location.search).get('lang') || 'en';
  if (lang !== 'te' && lang !== 'hi') return;
  var trData = ${JSON.stringify({ te: tr.te, hi: tr.hi })};
  var T = trData[lang] || {};

  function applyTr() {
    var eb = document.querySelector('.eyebrow');
    if (eb && T.sgh_eyebrow) {
      eb.innerHTML = '<span class="eyebrow-bar"></span>' + T.sgh_eyebrow;
    }
    var h1Lines = document.querySelectorAll('h1 .headline-line');
    if (h1Lines.length >= 2) {
      if (T.sgh_headline1) h1Lines[0].textContent = T.sgh_headline1;
      if (T.sgh_headline2) h1Lines[1].textContent = T.sgh_headline2;
    }
    var lede = document.querySelector('.lede');
    if (lede && T.sgh_lede) lede.innerHTML = T.sgh_lede;

    var deb = document.querySelector('.diag-eyebrow');
    if (deb && T.sgh_diag_eyebrow) deb.textContent = T.sgh_diag_eyebrow;
    var dcap = document.querySelector('.diag-caption');
    if (dcap && T.sgh_diag_caption) dcap.textContent = T.sgh_diag_caption;

    var legs = document.querySelectorAll('.diag-legend .leg-row');
    if (legs[0] && T.sgh_leg1) legs[0].innerHTML = '<span class="leg-dot" style="--c:#1f8a57;--pd:0s"></span>' + T.sgh_leg1;
    if (legs[1] && T.sgh_leg2) legs[1].innerHTML = '<span class="leg-dot" style="--c:#c0392b;--pd:.4s"></span><em>Vibrio</em> ' + T.sgh_leg2;
    if (legs[2] && T.sgh_leg3) legs[2].innerHTML = '<span class="leg-dot" style="--c:#8aa31c;--pd:.8s"></span>' + T.sgh_leg3;

    var boxes = document.querySelectorAll('.sec-boxes .box');
    var bdata = [
      { tag: T.sgh_box1_tag, tit: T.sgh_box1_title, bod: T.sgh_box1_body },
      { tag: T.sgh_box2_tag, tit: T.sgh_box2_title, bod: T.sgh_box2_body },
      { tag: T.sgh_box3_tag, tit: T.sgh_box3_title, bod: T.sgh_box3_body },
      { tag: T.sgh_box4_tag, tit: T.sgh_box4_title, bod: T.sgh_box4_body }
    ];
    boxes.forEach(function(b, i) {
      if (!bdata[i]) return;
      var tag = b.querySelector('.btag');
      var tit = b.querySelector('.btit');
      var bod = b.querySelector('.bbod');
      if (tag && bdata[i].tag) tag.textContent = bdata[i].tag;
      if (tit && bdata[i].tit) tit.textContent = bdata[i].tit;
      if (bod && bdata[i].bod) bod.innerHTML = bdata[i].bod;
    });

    var ctit = document.querySelector('.ctit');
    if (ctit && T.sgh_chart_title) ctit.textContent = T.sgh_chart_title;
    var csub = document.querySelector('.csub');
    if (csub && T.sgh_chart_sub) csub.textContent = T.sgh_chart_sub;

    var bbars = document.querySelectorAll('.bbar .blbl');
    if (bbars[0] && T.sgh_bar1_label) bbars[0].innerHTML = T.sgh_bar1_label + '<span>' + (T.sgh_bar1_sub || 'improvement ↑') + '</span>';
    if (bbars[1] && T.sgh_bar2_label) bbars[1].innerHTML = T.sgh_bar2_label + '<span>' + (T.sgh_bar2_sub || 'improvement ↑') + '</span>';
    if (bbars[2] && T.sgh_bar3_label) bbars[2].innerHTML = T.sgh_bar3_label + '<span>' + (T.sgh_bar3_sub || 'improvement ↓') + '</span>';
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', applyTr);
  } else {
    applyTr();
  }
})();
</script>`;

  content = content.replace('</body>', `${script}\n</body>`);
  fs.writeFileSync(filePath, content, 'utf8');
  console.log('✅ Patched shrimp-gut-health.html');
}

// 2. aquaculture-culture-cycle.html
function patchAquacultureCycle() {
  const filePath = path.join(__dirname, '../public/aquaculture-culture-cycle.html');
  let content = fs.readFileSync(filePath, 'utf8');

  const patchTag = '/* I18N_INJECTED_CYCLE */';
  if (content.includes(patchTag)) return;

  const injectCode = `
    ${patchTag}
    (function() {
      var lang = new URLSearchParams(window.location.search).get('lang') || 'en';
      if (lang !== 'te' && lang !== 'hi') return;
      var trData = ${JSON.stringify({ te: tr.te, hi: tr.hi })};
      var T = trData[lang] || {};

      var ebText = document.querySelector('.eyebrow-text');
      if (ebText && T.acc_eyebrow) ebText.textContent = T.acc_eyebrow;

      var hl = document.querySelector('.headline');
      if (hl && T.acc_headline) hl.textContent = T.acc_headline;

      if (T.acc_row0_title) { data.rows[0].title = T.acc_row0_title; data.rows[0].subtitle = T.acc_row0_sub; }
      if (T.acc_row1_title) { data.rows[1].title = T.acc_row1_title; data.rows[1].subtitle = T.acc_row1_sub; }
      if (T.acc_row2_title) { data.rows[2].title = T.acc_row2_title; data.rows[2].subtitle = T.acc_row2_sub; }
      if (T.acc_row3_title) { data.rows[3].title = T.acc_row3_title; data.rows[3].subtitle = T.acc_row3_sub; }

      if (T.acc_stage1_name) { data.stages[0].name = T.acc_stage1_name; data.stages[0].subtitle = T.acc_stage1_sub; }
      if (T.acc_stage2_name) { data.stages[1].name = T.acc_stage2_name; data.stages[1].subtitle = T.acc_stage2_sub; }
      if (T.acc_stage3_name) { data.stages[2].name = T.acc_stage3_name; data.stages[2].subtitle = T.acc_stage3_sub; }
      if (T.acc_stage4_name) { data.stages[3].name = T.acc_stage4_name; data.stages[3].subtitle = T.acc_stage4_sub; }
      if (T.acc_stage5_name) { data.stages[4].name = T.acc_stage5_name; data.stages[4].subtitle = T.acc_stage5_sub; }

      if (T.acc_c0r0) data.stages[0].cells[0].text = T.acc_c0r0;
      if (T.acc_c0r1) data.stages[0].cells[1].text = T.acc_c0r1;
      if (T.acc_c0r3) data.stages[0].cells[3].text = T.acc_c0r3;

      if (T.acc_c1r0) data.stages[1].cells[0].text = T.acc_c1r0;
      if (T.acc_c1r1) data.stages[1].cells[1].text = T.acc_c1r1;
      if (T.acc_c1r2) data.stages[1].cells[2].text = T.acc_c1r2;
      if (T.acc_c1r3) data.stages[1].cells[3].text = T.acc_c1r3;

      if (T.acc_c2r0) data.stages[2].cells[0].text = T.acc_c2r0;
      if (T.acc_c2r1) data.stages[2].cells[1].text = T.acc_c2r1;
      if (T.acc_c2r2) data.stages[2].cells[2].text = T.acc_c2r2;
      if (T.acc_c2r3) data.stages[2].cells[3].text = T.acc_c2r3;

      if (T.acc_c3r0) data.stages[3].cells[0].text = T.acc_c3r0;
      if (T.acc_c3r1) data.stages[3].cells[1].text = T.acc_c3r1;
      if (T.acc_c3r2) data.stages[3].cells[2].text = T.acc_c3r2;
      if (T.acc_c3r3) data.stages[3].cells[3].text = T.acc_c3r3;

      if (T.acc_c4r0) data.stages[4].cells[0].text = T.acc_c4r0;
    })();
`;

  content = content.replace('const matrix = document.getElementById("culture-cycle-matrix");', `${injectCode}\nconst matrix = document.getElementById("culture-cycle-matrix");`);
  fs.writeFileSync(filePath, content, 'utf8');
  console.log('✅ Patched aquaculture-culture-cycle.html');
}

// 3. bioremediation-treatment-chain.html
function patchBioremTreatmentChain() {
  const filePath = path.join(__dirname, '../public/bioremediation-treatment-chain.html');
  let content = fs.readFileSync(filePath, 'utf8');

  const patchTag = '<!-- I18N_INJECTED_BIOREM -->';
  if (content.includes(patchTag)) return;

  const script = `${patchTag}
<script>
(function() {
  var lang = new URLSearchParams(window.location.search).get('lang') || 'en';
  if (lang !== 'te' && lang !== 'hi') return;
  var trData = ${JSON.stringify({ te: tr.te, hi: tr.hi })};
  var T = trData[lang] || {};

  function applyTr() {
    var eb = document.querySelector('.eyebrow-text');
    if (eb && T.brtc_eyebrow) eb.textContent = T.brtc_eyebrow;

    var hLines = document.querySelectorAll('.headline-line');
    if (hLines[0] && T.brtc_headline1) hLines[0].textContent = T.brtc_headline1;
    if (hLines[1] && T.brtc_headline2) hLines[1].textContent = T.brtc_headline2;

    var sub = document.querySelector('.subtext');
    if (sub && T.brtc_subtext) sub.textContent = T.brtc_subtext;

    var r0 = document.querySelector('.row-label[data-row="0"]');
    if (r0) {
      if (T.brtc_row0_title) r0.querySelector('.row-title').textContent = T.brtc_row0_title;
      if (T.brtc_row0_sub) r0.querySelector('.row-subtitle').textContent = T.brtc_row0_sub;
    }
    var r1 = document.querySelector('.row-label[data-row="1"]');
    if (r1) {
      if (T.brtc_row1_title) r1.querySelector('.row-title').textContent = T.brtc_row1_title;
      if (T.brtc_row1_sub) r1.querySelector('.row-subtitle').textContent = T.brtc_row1_sub;
    }

    var stages = [
      { name: T.brtc_s1_name, sub: T.brtc_s1_sub, cells: [T.brtc_c1r0, T.brtc_c1r1] },
      { name: T.brtc_s2_name, sub: T.brtc_s2_sub, cells: [null, T.brtc_c2r1] },
      { name: T.brtc_s3_name, sub: T.brtc_s3_sub, cells: [T.brtc_c3r0, T.brtc_c3r1] },
      { name: T.brtc_s4_name, sub: T.brtc_s4_sub, cells: [T.brtc_c4r0, T.brtc_c4r1] },
      { name: T.brtc_s5_name, sub: T.brtc_s5_sub, cells: [T.brtc_c5r0, T.brtc_c5r1] }
    ];

    stages.forEach(function(st, idx) {
      var col = document.querySelector('.stage-column[data-stage="' + (idx + 1) + '"]');
      if (!col) return;
      if (st.name) {
        var h3 = col.querySelector('.stage-name');
        if (h3) h3.textContent = st.name;
      }
      if (st.sub) {
        var ssub = col.querySelector('.stage-subtitle');
        if (ssub) ssub.textContent = st.sub;
      }
      var cells = col.querySelectorAll('.stage-cell .cell-content');
      if (cells[0] && st.cells[0]) cells[0].textContent = st.cells[0];
      if (cells[1] && st.cells[1]) cells[1].textContent = st.cells[1];
    });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', applyTr);
  } else {
    applyTr();
  }
})();
</script>`;

  content = content.replace('</body>', `${script}\n</body>`);
  fs.writeFileSync(filePath, content, 'utf8');
  console.log('✅ Patched bioremediation-treatment-chain.html');
}

// 4. poultry-production-stages.html
function patchPoultryProductionStages() {
  const filePath = path.join(__dirname, '../public/poultry-production-stages.html');
  let content = fs.readFileSync(filePath, 'utf8');

  const patchTag = '<!-- I18N_INJECTED_POULTRY_STAGES -->';
  if (content.includes(patchTag)) return;

  const script = `${patchTag}
<script>
(function() {
  var lang = new URLSearchParams(window.location.search).get('lang') || 'en';
  if (lang !== 'te' && lang !== 'hi') return;
  var trData = ${JSON.stringify({ te: tr.te, hi: tr.hi })};
  var T = trData[lang] || {};

  function applyTr() {
    var hl = document.querySelector('.headline');
    if (hl && T.pps_headline) hl.textContent = T.pps_headline;

    var sub = document.querySelector('.subtext');
    if (sub && T.pps_subtext) sub.textContent = T.pps_subtext;

    var rows = [
      { tit: T.pps_row0_title, sub: T.pps_row0_sub },
      { tit: T.pps_row1_title, sub: T.pps_row1_sub },
      { tit: T.pps_row2_title, sub: T.pps_row2_sub }
    ];
    rows.forEach(function(r, idx) {
      var rowEl = document.querySelector('.row-label[data-row="' + idx + '"]');
      if (rowEl) {
        if (r.tit) rowEl.querySelector('.row-title').textContent = r.tit;
        if (r.sub) rowEl.querySelector('.row-subtitle').textContent = r.sub;
      }
    });

    var stages = [
      { name: T.pps_s1_name, sub: T.pps_s1_sub, cells: [T.pps_c1r0, T.pps_c1r1, T.pps_c1r2] },
      { name: T.pps_s2_name, sub: T.pps_s2_sub, cells: [T.pps_c2r0, T.pps_c2r1, T.pps_c2r2] },
      { name: T.pps_s3_name, sub: T.pps_s3_sub, cells: [T.pps_c3r0, T.pps_c3r1, T.pps_c3r2] },
      { name: T.pps_s4_name, sub: T.pps_s4_sub, cells: [T.pps_c4r0, T.pps_c4r1, T.pps_c4r2] },
      { name: T.pps_s5_name, sub: T.pps_s5_sub, cells: [T.pps_c5r0, T.pps_c5r1, T.pps_c5r2] }
    ];

    var cols = document.querySelectorAll('.stage-column');
    stages.forEach(function(st, idx) {
      var col = cols[idx];
      if (!col) return;
      if (st.name) {
        var nm = col.querySelector('.stage-name');
        if (nm) nm.textContent = st.name;
      }
      if (st.sub) {
        var ssub = col.querySelector('.stage-subtitle');
        if (ssub) ssub.textContent = st.sub;
      }
      var cells = col.querySelectorAll('.stage-cell .cell-content');
      cells.forEach(function(c, cidx) {
        if (st.cells[cidx]) c.innerHTML = st.cells[cidx];
      });
    });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', applyTr);
  } else {
    applyTr();
  }
})();
</script>`;

  content = content.replace('</body>', `${script}\n</body>`);
  fs.writeFileSync(filePath, content, 'utf8');
  console.log('✅ Patched poultry-production-stages.html');
}

// 5. ruminants-production-stages.html
function patchRuminantsProductionStages() {
  const filePath = path.join(__dirname, '../public/ruminants-production-stages.html');
  let content = fs.readFileSync(filePath, 'utf8');

  const patchTag = '<!-- I18N_INJECTED_RUMINANTS_STAGES -->';
  if (content.includes(patchTag)) return;

  const script = `${patchTag}
<script>
(function() {
  var lang = new URLSearchParams(window.location.search).get('lang') || 'en';
  if (lang !== 'te' && lang !== 'hi') return;
  var trData = ${JSON.stringify({ te: tr.te, hi: tr.hi })};
  var T = trData[lang] || {};

  function applyTr() {
    var hl = document.querySelector('.headline');
    if (hl && T.rps_headline) hl.textContent = T.rps_headline;

    var sub = document.querySelector('.subtext');
    if (sub && T.rps_subtext) sub.textContent = T.rps_subtext;

    var rows = [
      { tit: T.rps_row0_title, sub: T.rps_row0_sub },
      { tit: T.rps_row1_title, sub: T.rps_row1_sub },
      { tit: T.rps_row2_title, sub: T.rps_row2_sub }
    ];
    rows.forEach(function(r, idx) {
      var rowEl = document.querySelector('.row-label[data-row="' + idx + '"]');
      if (rowEl) {
        if (r.tit) rowEl.querySelector('.row-title').textContent = r.tit;
        if (r.sub) rowEl.querySelector('.row-subtitle').textContent = r.sub;
      }
    });

    var stages = [
      { name: T.rps_s1_name, sub: T.rps_s1_sub, cells: [T.rps_c1r0, T.rps_c1r1, T.rps_c1r2] },
      { name: T.rps_s2_name, sub: T.rps_s2_sub, cells: [T.rps_c2r0, T.rps_c2r1, T.rps_c2r2] },
      { name: T.rps_s3_name, sub: T.rps_s3_sub, cells: [T.rps_c3r0, T.rps_c3r1, T.rps_c3r2] },
      { name: T.rps_s4_name, sub: T.rps_s4_sub, cells: [T.rps_c4r0, T.rps_c4r1, T.rps_c4r2] },
      { name: T.rps_s5_name, sub: T.rps_s5_sub, cells: [T.rps_c5r0, T.rps_c5r1, T.rps_c5r2] }
    ];

    var cols = document.querySelectorAll('.stage-column');
    stages.forEach(function(st, idx) {
      var col = cols[idx];
      if (!col) return;
      if (st.name) {
        var nm = col.querySelector('.stage-name');
        if (nm) nm.textContent = st.name;
      }
      if (st.sub) {
        var ssub = col.querySelector('.stage-subtitle');
        if (ssub) ssub.textContent = st.sub;
      }
      var cells = col.querySelectorAll('.stage-cell .cell-content');
      cells.forEach(function(c, cidx) {
        if (st.cells[cidx]) c.innerHTML = st.cells[cidx];
      });
    });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', applyTr);
  } else {
    applyTr();
  }
})();
</script>`;

  content = content.replace('</body>', `${script}\n</body>`);
  fs.writeFileSync(filePath, content, 'utf8');
  console.log('✅ Patched ruminants-production-stages.html');
}

// 6. first-colonisers.html
function patchFirstColonisers() {
  const filePath = path.join(__dirname, '../public/first-colonisers.html');
  let content = fs.readFileSync(filePath, 'utf8');

  const patchTag = '<!-- I18N_INJECTED_COLONISERS -->';
  if (content.includes(patchTag)) return;

  const script = `${patchTag}
<script>
(function() {
  var lang = new URLSearchParams(window.location.search).get('lang') || 'en';
  if (lang !== 'te' && lang !== 'hi') return;
  var trData = ${JSON.stringify({ te: tr.te, hi: tr.hi })};
  var T = trData[lang] || {};

  function applyTr() {
    var eb = document.querySelector('.eyebrow');
    if (eb && T.fc_eyebrow) eb.textContent = T.fc_eyebrow;

    var h1 = document.querySelector('h1');
    if (h1 && T.fc_headline1 && T.fc_headline2) {
      h1.innerHTML = T.fc_headline1 + '<br>' + T.fc_headline2;
    }

    var held = document.querySelector('[data-label="held"]');
    if (held && T.fc_stat_held) held.textContent = T.fc_stat_held;

    var turned = document.querySelector('[data-label="turned"]');
    if (turned && T.fc_stat_turned) turned.textContent = T.fc_stat_turned;

    var secLabel = document.querySelector('[data-stat="secured"] + .stat-label');
    if (secLabel && T.fc_stat_secured) secLabel.textContent = T.fc_stat_secured;

    var cl = document.querySelector('.clock-label');
    if (cl && T.fc_clock_label) cl.textContent = T.fc_clock_label;

    var btnB = document.querySelector('[data-mode="beneficial"]');
    if (btnB && T.fc_btn_beneficial) btnB.textContent = T.fc_btn_beneficial;

    var btnP = document.querySelector('[data-mode="pathogen"]');
    if (btnP && T.fc_btn_pathogen) btnP.textContent = T.fc_btn_pathogen;

    var legB = document.querySelector('.legend-item');
    if (legB && T.fc_legend_beneficial) {
      legB.innerHTML = '<span class="swatch swatch-good" aria-hidden="true"></span>' + T.fc_legend_beneficial;
    }

    var paras = document.querySelectorAll('.copy-grid p');
    if (paras[0] && T.fc_p1_lead) {
      paras[0].innerHTML = '<span class="lead-in">' + T.fc_p1_lead + '</span>' + (T.fc_p1_body || '');
    }
    if (paras[1] && T.fc_p2_lead) {
      paras[1].innerHTML = '<span class="lead-in">' + T.fc_p2_lead + '</span>' + (T.fc_p2_body || '');
    }
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', applyTr);
  } else {
    applyTr();
  }
})();
</script>`;

  content = content.replace('</body>', `${script}\n</body>`);
  fs.writeFileSync(filePath, content, 'utf8');
  console.log('✅ Patched first-colonisers.html');
}

// 7. poultry-gut-ledger.html
function patchPoultryGutLedger() {
  const filePath = path.join(__dirname, '../public/poultry-gut-ledger.html');
  let content = fs.readFileSync(filePath, 'utf8');

  const patchTag = '<!-- I18N_INJECTED_LEDGER -->';
  if (content.includes(patchTag)) return;

  const script = `${patchTag}
<script>
(function() {
  var lang = new URLSearchParams(window.location.search).get('lang') || 'en';
  if (lang !== 'te' && lang !== 'hi') return;
  var trData = ${JSON.stringify({ te: tr.te, hi: tr.hi })};
  var T = trData[lang] || {};

  function applyTr() {
    var pl = document.querySelector('.page-label');
    if (pl && T.pgl_page_label) pl.textContent = T.pgl_page_label;

    var pt = document.querySelector('.page-title');
    if (pt && T.pgl_page_title) pt.textContent = T.pgl_page_title;

    var colHeads = document.querySelectorAll('.column-heading');
    if (colHeads[0]) {
      if (T.pgl_col1_label) colHeads[0].querySelector('.column-label').textContent = T.pgl_col1_label;
      if (T.pgl_col1_title) colHeads[0].querySelector('.column-title').innerHTML = T.pgl_col1_title.replace(' ', '<br>');
    }
    if (colHeads[1]) {
      if (T.pgl_col2_label) colHeads[1].querySelector('.column-label').textContent = T.pgl_col2_label;
      if (T.pgl_col2_title) colHeads[1].querySelector('.column-title').innerHTML = T.pgl_col2_title.replace(' ', '<br>');
    }

    var rows = document.querySelectorAll('.ledger .row');
    var rowData = [
      { lTit: T.pgl_r1_left_title, lBod: T.pgl_r1_left_body, rTit: T.pgl_r1_right_title, rBod: T.pgl_r1_right_body },
      { lTit: T.pgl_r2_left_title, lBod: T.pgl_r2_left_body, rTit: T.pgl_r2_right_title, rBod: T.pgl_r2_right_body },
      { lTit: T.pgl_r3_left_title, lBod: T.pgl_r3_left_body, rTit: T.pgl_r3_right_title, rBod: T.pgl_r3_right_body },
      { lTit: T.pgl_r4_left_title, lBod: T.pgl_r4_left_body, rTit: T.pgl_r4_right_title, rBod: T.pgl_r4_right_body }
    ];

    rows.forEach(function(r, idx) {
      if (!rowData[idx]) return;
      var cl = r.querySelector('.card-left');
      var cr = r.querySelector('.card-right');
      if (cl) {
        if (rowData[idx].lTit) cl.querySelector('.entry-title').textContent = rowData[idx].lTit;
        if (rowData[idx].lBod) cl.querySelector('.entry-copy').innerHTML = rowData[idx].lBod;
      }
      if (cr) {
        if (rowData[idx].rTit) cr.querySelector('.entry-title').textContent = rowData[idx].rTit;
        if (rowData[idx].rBod) cr.querySelector('.entry-copy').innerHTML = rowData[idx].rBod;
      }
    });

    var et = document.querySelector('.evidence-title');
    if (et && T.pgl_evidence_title) et.textContent = T.pgl_evidence_title;

    var esub = document.querySelector('.evidence-subtitle');
    if (esub && T.pgl_evidence_sub) esub.textContent = T.pgl_evidence_sub;

    var elabels = document.querySelectorAll('.evidence-label');
    if (elabels[0] && T.pgl_ev_label1) elabels[0].textContent = T.pgl_ev_label1;
    if (elabels[1] && T.pgl_ev_label2) elabels[1].textContent = T.pgl_ev_label2;
    if (elabels[2] && T.pgl_ev_label3) elabels[2].textContent = T.pgl_ev_label3;
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', applyTr);
  } else {
    applyTr();
  }
})();
</script>`;

  content = content.replace('</body>', `${script}\n</body>`);
  fs.writeFileSync(filePath, content, 'utf8');
  console.log('✅ Patched poultry-gut-ledger.html');
}

// 8. poultry-mineral-bioavailability.html
function patchPoultryMineralBioavailability() {
  const filePath = path.join(__dirname, '../public/poultry-mineral-bioavailability.html');
  let content = fs.readFileSync(filePath, 'utf8');

  const patchTag = '<!-- I18N_INJECTED_MINERAL -->';
  if (content.includes(patchTag)) return;

  const script = `${patchTag}
<script>
(function() {
  var lang = new URLSearchParams(window.location.search).get('lang') || 'en';
  if (lang !== 'te' && lang !== 'hi') return;
  var trData = ${JSON.stringify({ te: tr.te, hi: tr.hi })};
  var T = trData[lang] || {};

  function applyTr() {
    var hlines = document.querySelectorAll('.headline-line');
    if (hlines[0] && T.pmb_headline1) hlines[0].textContent = T.pmb_headline1;
    if (hlines[1] && T.pmb_headline2) hlines[1].textContent = T.pmb_headline2;

    var lead = document.querySelector('.lead');
    if (lead && T.pmb_lead) lead.innerHTML = T.pmb_lead;

    var expP = document.querySelectorAll('.explanation-grid p');
    if (expP[0] && T.pmb_exp1) expP[0].innerHTML = T.pmb_exp1;
    if (expP[1] && T.pmb_exp2) expP[1].innerHTML = T.pmb_exp2;

    var mtitle = document.querySelector('.meter-title');
    if (mtitle && T.pmb_meter_title) mtitle.textContent = T.pmb_meter_title;

    var msub = document.querySelector('.meter-subtitle');
    if (msub && T.pmb_meter_sub) msub.textContent = T.pmb_meter_sub;

    var cornLabel = document.querySelector('[data-ingredient="corn"] .lock-label span');
    var cornVal = document.querySelector('[data-ingredient="corn"] .lock-value');
    if (cornLabel && T.pmb_corn_label) cornLabel.textContent = T.pmb_corn_label;
    if (cornVal && T.pmb_corn_value) cornVal.textContent = T.pmb_corn_value;

    var soyLabel = document.querySelector('[data-ingredient="soybean"] .lock-label span');
    var soyVal = document.querySelector('[data-ingredient="soybean"] .lock-value');
    if (soyLabel && T.pmb_soy_label) soyLabel.textContent = T.pmb_soy_label;
    if (soyVal && T.pmb_soy_value) soyVal.textContent = T.pmb_soy_value;

    var legItems = document.querySelectorAll('.legend-item');
    if (legItems[0] && T.pmb_legend_bound) legItems[0].innerHTML = '<span class="legend-swatch" aria-hidden="true"></span>' + T.pmb_legend_bound;
    if (legItems[1] && T.pmb_legend_other) legItems[1].innerHTML = '<span class="legend-swatch other" aria-hidden="true"></span>' + T.pmb_legend_other;

    var keyItems = document.querySelectorAll('.key-item');
    var kdata = [
      { tit: T.pmb_p_title, copy: T.pmb_p_copy },
      { tit: T.pmb_ca_title, copy: T.pmb_ca_copy },
      { tit: T.pmb_znfe_title, copy: T.pmb_znfe_copy }
    ];
    keyItems.forEach(function(k, idx) {
      if (!kdata[idx]) return;
      if (kdata[idx].tit) k.querySelector('.key-title').textContent = kdata[idx].tit;
      if (kdata[idx].copy) k.querySelector('.key-copy').textContent = kdata[idx].copy;
    });

    var src = document.querySelector('.source-line');
    if (src && T.pmb_source) src.textContent = T.pmb_source;
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', applyTr);
  } else {
    applyTr();
  }
})();
</script>`;

  content = content.replace('</body>', `${script}\n</body>`);
  fs.writeFileSync(filePath, content, 'utf8');
  console.log('✅ Patched poultry-mineral-bioavailability.html');
}

// 9. pond-floor.html
function patchPondFloor() {
  const filePath = path.join(__dirname, '../public/pond-floor.html');
  let content = fs.readFileSync(filePath, 'utf8');

  const patchTag = '<!-- I18N_INJECTED_POND -->';
  if (content.includes(patchTag)) return;

  const script = `${patchTag}
<script>
(function() {
  var lang = new URLSearchParams(window.location.search).get('lang') || 'en';
  if (lang !== 'te' && lang !== 'hi') return;
  var trData = ${JSON.stringify({ te: tr.te, hi: tr.hi })};
  var T = trData[lang] || {};

  function applyTr() {
    var pt = document.querySelector('.page-title');
    if (pt && T.pf_title) pt.textContent = T.pf_title;

    var texts = document.querySelectorAll('svg#scene text');
    texts.forEach(function(t) {
      var txt = t.textContent.trim();
      if (txt.includes('WATER COLUMN') && T.pf_water_col) t.textContent = T.pf_water_col;
      else if (txt.includes('SOIL-WATER INTERFACE') && T.pf_interface) t.textContent = T.pf_interface;
      else if (txt.includes('ANAEROBIC SEDIMENT') && T.pf_sediment) t.textContent = T.pf_sediment;
      else if (txt.includes('Organic N') && T.pf_organic_n) t.textContent = T.pf_organic_n;
      else if (txt.includes('Incomplete nitrification') && T.pf_nitrif) t.textContent = T.pf_nitrif;
      else if (txt.includes('Sulphate-reducing') && T.pf_sulphate) t.textContent = T.pf_sulphate;
      else if (txt.includes('ANAEROBIC CONSORTIA') && T.pf_anaerobic) t.textContent = T.pf_anaerobic;
      else if (txt.includes('digest the organic load') && T.pf_digest) t.textContent = T.pf_digest;
      else if (txt.includes('DENITRIFIERS') && T.pf_denitrifiers) t.textContent = T.pf_denitrifiers;
      else if (txt.includes('N → N₂') && T.pf_n2) t.textContent = T.pf_n2;
      else if (txt.includes('Feed, faeces') && T.pf_settle1) t.textContent = T.pf_settle1;
      else if (txt.includes('settle daily') && T.pf_settle2) t.textContent = T.pf_settle2;
    });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', applyTr);
  } else {
    applyTr();
  }
})();
</script>`;

  content = content.replace('</body>', `${script}\n</body>`);
  fs.writeFileSync(filePath, content, 'utf8');
  console.log('✅ Patched pond-floor.html');
}

// Run all patches
patchShrimpGutHealth();
patchAquacultureCycle();
patchBioremTreatmentChain();
patchPoultryProductionStages();
patchRuminantsProductionStages();
patchFirstColonisers();
patchPoultryGutLedger();
patchPoultryMineralBioavailability();
patchPondFloor();

console.log('\nAll 9 public HTML files successfully patched with multilingual support!');
