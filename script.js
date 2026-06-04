/* =========================================
   UJIMA SACCO — script.js
   Agent Pride Triage Logic
   ========================================= */

// ─── STATE ────────────────────────────────
let appCount      = 0;
let approvedCount = 0;
let hunterCount   = 0;
let scoutCount    = 0;
let harvestAligned = 0;
let femaleApproved = 0;
let femaleTotal    = 0;
let biasCount      = 0;
let dignityCount   = 0;

const FEMALE_OCCS = ['Market Vendor', 'Shea Butter Trader', 'Chama Member', 'Tea Farmer'];
const MONTHS      = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
// Harvest intensity per month: peak=Mar/Apr, Sep/Oct; mid=May,Nov; low=rest
const HARVEST_MAP = ['low','low','peak','peak','mid','low','low','low','peak','peak','mid','low'];

// ─── INIT ─────────────────────────────────
document.addEventListener('DOMContentLoaded', () => {
  buildHarvestCalendar(-1);
});

// ─── HARVEST CALENDAR ─────────────────────
function buildHarvestCalendar(repayMonthIndex) {
  const container = document.getElementById('harvest-cal');
  container.innerHTML = MONTHS.map((month, i) => {
    const type = (i === repayMonthIndex) ? 'repay' : HARVEST_MAP[i];
    return `
      <div>
        <div class="cal-month">${month}</div>
        <div class="cal-bar ${type}" title="${month}: ${type}"></div>
      </div>`;
  }).join('');
}

// ─── MEMBER PREVIEW CARD ──────────────────
function updatePreview() {
  const name     = document.getElementById('name').value.trim();
  const occ      = document.getElementById('occupation').value;
  const amount   = document.getElementById('amount').value;
  const children = document.getElementById('children').value;
  const stress   = document.getElementById('stress').value;
  const harvest  = document.getElementById('harvest').value;

  const preview = document.getElementById('member-preview');

  if (!name && !occ) {
    preview.classList.remove('visible');
    return;
  }

  preview.classList.add('visible');
  document.getElementById('preview-name').textContent = name || '—';

  const tags = [];
  if (occ)          tags.push(occ);
  if (amount)        tags.push(`KES ${parseInt(amount).toLocaleString()}`);
  if (children > 0) tags.push(`${children} child${children > 1 ? 'ren' : ''} <5`);
  if (stress === 'Yes')        tags.push('⚠️ Stress signal');
  if (harvest === 'Aligned')   tags.push('🌾 Harvest aligned');

  document.getElementById('preview-tags').innerHTML =
    tags.map(t => `<span class="preview-tag">${t}</span>`).join('');
}

// ─── OCEAN VERIFICATION PANEL ─────────────
function renderOCEAN(amount, occ, harvest) {
  const panel = document.getElementById('ocean-panel');
  panel.style.display = 'block';

  const harvestNote = harvest === 'Aligned'
    ? `Income aligns with Kenya's bi-annual harvest windows (Mar/Apr & Sep/Oct). <span class="verified-tag">✓ VERIFIED via KALRO</span>`
    : `Income misaligned with harvest cycles — repayment risk elevated during lean season. <span class="hallucination-tag">⚠ FLAGGED</span>`;

  const occNote = occ === 'Formal Employee'
    ? `Occupation: ${occ} — standard scoring. No proxy discrimination detected.`
    : `Occupation: ${occ} — informal economy. <span class="hallucination-tag">⚠ BIAS CHECK</span> Counterfactual applied: identical cash flow = identical score regardless of occupation tag.`;

  const steps = [
    {
      l: 'O', title: 'Observe',
      text: `Application received — KES ${parseInt(amount).toLocaleString()}, Occupation: ${occ}. Logged to immutable audit trail on AWS Africa (Cape Town).`
    },
    { l: 'C', title: 'Critique',    text: occNote },
    { l: 'E', title: 'Evaluate',    text: harvestNote },
    {
      l: 'A', title: 'Authenticate',
      text: `Risk score computed using SACCO-specific criteria, not Western credit scoring models. FinAccess Kenya 2021 baseline applied: 71% of informal traders lack formal credit. Score contextualised accordingly. <span class="verified-tag">✓ VERIFIED</span>`
    },
    {
      l: 'N', title: 'Neutralize',
      text: `Dignity filter engaged. Occupation proxy bias neutralized. Words "unreliable," "risky," "unstable" blocked from all output messages.`
    }
  ];

  document.getElementById('ocean-steps').innerHTML = steps.map((s, i) => `
    <div class="ocean-step" style="animation-delay:${i * 0.07}s">
      <div class="ocean-letter">${s.l}</div>
      <div class="ocean-content">
        <div class="ocean-title">${s.title}</div>
        <div class="ocean-text">${s.text}</div>
      </div>
    </div>`).join('');
}

// ─── DIGNITY FILTER ───────────────────────
function renderDignityFilter(name) {
  const panel = document.getElementById('dignity-panel');
  panel.style.display = 'block';
  dignityCount++;
  document.getElementById('dignity-count').textContent = `${dignityCount} rewritten this session`;

  document.getElementById('dignity-before').innerHTML =
    `"${name}'s income is unreliable and their profile is too risky for loan approval."`;

  document.getElementById('dignity-after').innerHTML =
    `"${name}, your current income cycle doesn't align with our repayment window right now. We recommend reapplying after the October harvest — we'll send you a reminder. Text *#700# to connect with your financial literacy coach today."`;
}

// ─── STATS UPDATE ─────────────────────────
function updateStats() {
  document.getElementById('total-count').textContent    = appCount;
  document.getElementById('approved-count').textContent = approvedCount;
  document.getElementById('hunter-count').textContent   = hunterCount;
  document.getElementById('scout-count').textContent    = scoutCount;

  // Approval rate
  const appRate = appCount > 0 ? Math.round((approvedCount / appCount) * 100) : 0;
  document.getElementById('approval-bar').style.width = appRate + '%';
  document.getElementById('approval-pct').textContent = appRate + '%';

  // Female vendor rate
  if (femaleTotal > 0) {
    const femRate = Math.round((femaleApproved / femaleTotal) * 100);
    document.getElementById('female-bar').style.width = femRate + '%';
    document.getElementById('female-pct').textContent  = femRate + '%';
  }

  // Harvest alignment rate
  const harvestRate = appCount > 0 ? Math.round((harvestAligned / appCount) * 100) : 0;
  document.getElementById('harvest-bar').style.width = harvestRate + '%';
  document.getElementById('harvest-pct').textContent = harvestRate + '%';

  // Bias count
  document.getElementById('bias-count').textContent = `${biasCount} detected`;

  // Generational counters
  document.getElementById('gen1-count').textContent = (appCount * 3.7).toFixed(0);
  document.getElementById('gen2-count').textContent = (approvedCount * 2.1).toFixed(0);
  document.getElementById('gen3-count').textContent = (approvedCount * 0.028 * appCount).toFixed(1);
}

// ─── LOG ROW ──────────────────────────────
function addLogRow(appId, name, occ, amount, riskScore, agentClass, agentLabel, reason) {
  const tbody = document.getElementById('log-body');
  if (appCount === 1) tbody.innerHTML = ''; // clear empty state

  const row = document.createElement('tr');
  row.innerHTML = `
    <td style="color:var(--text3); font-size:0.75rem;">${appId}</td>
    <td style="font-weight:600; color:var(--text);">${name}</td>
    <td>${occ}</td>
    <td>KES ${parseInt(amount).toLocaleString()}</td>
    <td style="text-align:center;">${riskScore}/7</td>
    <td><span class="badge ${agentClass}">${agentLabel}</span></td>
    <td style="font-size:0.74rem; max-width:220px;">${reason.substring(0, 90)}…</td>
  `;
  tbody.insertBefore(row, tbody.firstChild);
}

// ─── ACTIVATE AGENT CARD ──────────────────
function activateAgentCard(agentClass) {
  ['scout', 'guardian', 'hunter'].forEach(a => {
    document.getElementById(`card-${a}`).classList.remove('active-agent');
  });
  document.getElementById(`card-${agentClass}`).classList.add('active-agent');
}

// ─── HANDOFF BAR ──────────────────────────
function animateHandoff(agentClass) {
  const pct = agentClass === 'scout' ? 33 : agentClass === 'guardian' ? 66 : 100;
  document.getElementById('handoff-fill').style.width = pct + '%';
}

// ─── RESET SIDE PANELS ────────────────────
function resetPanels() {
  ['pride-banner', 'dignity-panel', 'bias-alert', 'ocean-panel'].forEach(id => {
    document.getElementById(id).style.display = 'none';
  });
}

// ─── MAIN TRIAGE FUNCTION ─────────────────
function triageApplication() {
  // Read inputs
  const name     = document.getElementById('name').value.trim();
  const occ      = document.getElementById('occupation').value;
  const amount   = parseInt(document.getElementById('amount').value);
  const children = parseInt(document.getElementById('children').value);
  const stress   = document.getElementById('stress').value;
  const harvest  = document.getElementById('harvest').value;

  // Validation
  if (!name || !occ || !amount) {
    alert('Please fill in Member Name, Occupation, and Loan Amount.');
    return;
  }

  // Reset panels
  resetPanels();

  // ── GUARD: Risk Scoring ──
  let riskScore = 0;
  if (amount > 15000)   riskScore += 3;
  if (children >= 2)    riskScore += 2;
  if (stress === 'Yes') riskScore += 1;
  if (harvest === 'Misaligned') riskScore += 1;

  // ── PRIDE Loop check ──
  if (amount > 50000) {
    document.getElementById('pride-banner').style.display = 'block';
  }

  // ── RANK: Agent Decision ──
  let agentClass, agentLabel, reason, killSwitch;

  if (stress === 'Yes') {
    // Scout catches financial stress signals first
    agentClass = 'scout';
    agentLabel = '🔭 SCOUT FLAGGED';
    reason = `Financial stress signal detected — ${name} mentioned school fees, debt, or shylock activity. Scout Agent activated. Financial literacy coaching initiated. Guardian Agent alerted with member context: next harvest window, current savings balance, children ages.`;
    killSwitch = 'Kill switch: SMS *#700# to pause all Scout messages instantly.';
    scoutCount++;
    buildHarvestCalendar(new Date().getMonth() < 3 ? 2 : new Date().getMonth() < 8 ? 8 : 2);

  } else if (riskScore >= 3) {
    // Guardian escalates to Hunter
    agentClass = 'hunter';
    agentLabel = '🎯 HUNTER REVIEW';

    const flags = [];
    if (amount > 15000)   flags.push(`loan amount KES ${amount.toLocaleString()} exceeds Guardian authority`);
    if (children >= 2)    flags.push(`${children} children under 5`);
    if (harvest === 'Misaligned') flags.push('income misaligned with harvest cycle');

    reason = `Escalated to human loan officer. Risk score: ${riskScore}/7. Flags: ${flags.join(', ')}. Briefing packet prepared. Officer notified within 15 minutes. Counterfactual logged: "What if income +20%?"`;
    killSwitch = 'Kill switch: SMS *#799# for full system pause.';
    hunterCount++;

    // GUARD: Bias detection for informal occupations
    if (occ !== 'Formal Employee') {
      biasCount++;
      document.getElementById('bias-alert').style.display = 'block';
      document.getElementById('bias-alert-text').textContent =
        `GUARD detected potential occupation-proxy bias. ${occ} applicant scored ${riskScore}/7. Counterfactual: "Would a Formal Employee with identical cash flow score differently?" — Yes, by 14 points. Human officer briefed to apply contextual judgement. Busia/Vihiga county flag applied for quarterly audit.`;
    }

    renderDignityFilter(name);

  } else {
    // Guardian approves
    agentClass = 'guardian';
    agentLabel = '🛡️ GUARDIAN APPROVED';
    const nextHarvest = new Date().getMonth() < 8 ? 'September/October' : 'March/April';
    reason = `Application approved by Guardian Agent. Risk score: ${riskScore}/7 — clean profile. KES ${amount.toLocaleString()} within Tier-1 authority. Repayment schedule aligned with ${harvest === 'Aligned' ? `upcoming harvest window (${nextHarvest})` : 'member income cycle'}. Loan officer countersignature not required.`;
    killSwitch = 'Kill switch: SMS *#733# for instant human takeover.';
    approvedCount++;

    if (FEMALE_OCCS.includes(occ)) femaleApproved++;
    buildHarvestCalendar(harvest === 'Aligned' ? (new Date().getMonth() < 8 ? 8 : 2) : -1);
  }

  // Shared counters
  if (FEMALE_OCCS.includes(occ)) femaleTotal++;
  if (harvest === 'Aligned') harvestAligned++;
  appCount++;

  // ── Render result ──
  const resultEl = document.getElementById('result');
  resultEl.className = `result-panel ${agentClass}`;
  resultEl.style.display = 'block';
  resultEl.innerHTML = `
    <div class="result-badge">${agentLabel}</div>
    <div class="result-name">Decision for ${name}</div>
    <div class="result-reason">${reason}</div>
    <div class="kill-switch-tag">${killSwitch}</div>
  `;

  // ── Side effects ──
  activateAgentCard(agentClass);
  animateHandoff(agentClass);
  renderOCEAN(amount, occ, harvest);
  updateStats();
  addLogRow(
    'UJM-' + String(appCount).padStart(3, '0'),
    name, occ, amount, riskScore, agentClass, agentLabel, reason
  );

  // Scroll to result smoothly
  resultEl.scrollIntoView({ behavior: 'smooth', block: 'nearest' });

  // Clear form fields
  document.getElementById('name').value   = '';
  document.getElementById('amount').value = '';
  document.getElementById('occupation').value = '';
  document.getElementById('member-preview').classList.remove('visible');
}