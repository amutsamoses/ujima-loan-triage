# 🦁 Ujima SACCO AI Loan Triage System

> Ethical AI for informal traders. Built for the people the old system forgot.

![License](https://img.shields.io/badge/license-MIT-blue.svg)
![Status](https://img.shields.io/badge/status-live-brightgreen.svg)
![Compliance](https://img.shields.io/badge/Kenya_DPA_2022-compliant-green.svg)
![Capstone](https://img.shields.io/badge/AI_Safari_Capstone-2026-orange.svg)

---

## What This Is

Ujima SACCO AI Triage is a frontend web application that simulates an ethical, multi-agent loan screening system designed for informal traders in East Africa maize farmers, market vendors, bodaboda operators, chama members people who have historically been excluded from formal credit access because the models were never built with them in mind.

The system routes loan applications through a three-agent pride: **Scout → Guardian → Hunter**, each with defined authority limits, kill switches, and human oversight built in at every escalation point.

Built as the AI Safari Capstone 2026 final project under the **FinSoko** startup track.

---

## Live Demo

🔗 **[ujima-loan-triage.github.io](https://amutsamoses.github.io/ujima-loan-triage)**

---

## The Three Agents

| Agent | Role | Authority Limit | Kill Switch |
|---|---|---|---|
| 🔭 **Scout** | Financial literacy coach. Detects stress signals, educates members on harvest-cycle budgeting via SMS | Cannot recommend loans. Max 3 SMS/day | `*#700#` |
| 🛡️ **Guardian** | Tier-1 loan screening. Scores applications against harvest-aligned risk criteria | Approve up to KES 15,000 only | `*#733#` |
| 🎯 **Hunter** | Human-in-loop coordinator. Prepares briefing packets for loan officers | Never approves or denies — coordination only | `*#799#` |

---

## Features

- **AIM-engineered prompts** — loan scoring logic built around role, instruction, and mission clarity rather than vague "assess risk" commands
- **MAP-grounded outputs** — repayment schedules aligned with Kenya's bi-annual harvest windows (March/April long rains, September/October short rains)
- **OCEAN verification panel** — real-time AI self-audit showing how each decision was observed, critiqued, evaluated, authenticated, and neutralised for bias
- **TRACK bias detection** — GUARD logic fires when informal occupation applicants score differently than formal employees with identical cash flow; counterfactual logged
- **Dignity Filter** — automatically rejects denial messages containing "unreliable" or "risky" and rewrites them with empathy and actionable next steps
- **PRIDE Loop** — mandatory human review triggered for loans exceeding KES 50,000; Elders Council notified
- **Harvest Calendar** — 12-month visual showing income peaks, repayment windows, and low-income seasons
- **Generational Impact counters** — projects lives impacted across three generations in real time as applications are processed
- **Kenya DPA 2022 compliant** — all data architecture designed for AWS Africa (Cape Town) region; no PII leaves Kenya
- **SASRA aligned** — interest calculations and denial protocols follow SASRA regulatory guidelines

---

## Tech Stack

```
HTML5        — semantic structure, accessibility-first markup
CSS3         — custom properties, grid, flexbox, no frameworks
JavaScript   — vanilla ES6+, zero dependencies
Satoshi      — body font via Fontshare CDN
Cabinet Grotesk — display font via Fontshare CDN
```

No React. No npm. No build step. Just three files that work.

---

## Project Structure

```
ujima-loan-triage/
├── index.html      # Structure — semantic HTML, zero inline styles
├── style.css       # All visual rules — light theme, CSS variables, responsive
├── script.js       # All logic — triage engine, OCEAN, GUARD, stats, log
└── README.md       # This file
```

---

## How the Triage Logic Works

```
Submit application
        │
        ▼
Financial stress signal detected?
   YES → SCOUT FLAGGED
        └─ Financial literacy coaching activated
        └─ Guardian alerted with harvest context
        └─ Max 3 SMS/day protocol active
        │
        NO
        ▼
Risk score calculated (GUARD logic):
   Loan > KES 15,000  → +3 pts
   Children under 5 ≥ 2 → +2 pts
   Stress signal       → +1 pt
   Harvest misaligned  → +1 pt
        │
        ├─ Score ≥ 3 → HUNTER REVIEW
        │              └─ Human officer briefed within 15 mins
        │              └─ Bias counterfactual logged
        │              └─ Dignity filter rewrites denial message
        │
        └─ Score < 3 → GUARDIAN APPROVED
                       └─ Repayment schedule generated
                       └─ Aligned to next harvest window
```

---

## Ethical Architecture

### TRACK Bias Audit

Training data for Ujima's historical model was 78% urban Nairobi applicants. "Formal employee" scored 22% denial rate vs 68% for "market vendor." The GUARD layer in this system runs a counterfactual on every informal occupation application: *"Would a formal employee with identical cash flow score differently?"* If yes — human review is triggered and the discrepancy is logged for quarterly audit.

### OASIS Data Charter

- All member data stored on **AWS Africa (Cape Town)** region
- Swahili consent script — *"Data yako ya M-Pesa inatumika tu na Ujima SACCO"*
- K-anonymity depth of 5 — no individual in a village of under 200 can be re-identified
- Non-essential metadata auto-deleted after 180 days
- End-to-end encryption on all USSD and SMS channels

### PRIDE Loop

- Pause Point P: mandatory human review for loans over KES 50,000
- Elders Council: 3 SACCO managers, 2 women vendors, 1 fintech regulator
- Disagreement Rights: any member can text `*#733#` to instantly request human review
- Quarterly fairness audits with SASRA compliance team

---

## Running Locally

No build step needed.

```bash
git clone https://github.com/amutsamoses/ujima-loan-triage.git
cd ujima-loan-triage
# Open index.html in your browser
# Or use VS Code Live Server
```

That's it.

---

## Test Cases

Try these applications to see all three agents in action:

| Name | Occupation | Amount (KES) | Children | Stress | Expected Agent |
|---|---|---|---|---|---|
| Grace Akinyi | Maize Farmer | 29,000 | 3 | Yes | 🔭 Scout Flagged |
| Peter Mutua | Formal Employee | 12,000 | 0 | No | 🛡️ Guardian Approved |
| Fatuma Hassan | Shea Butter Trader | 8,000 | 1 | No | 🛡️ Guardian Approved |
| James Otieno | Bodaboda Operator | 46,000 | 2 | No | 🎯 Hunter Review |
| Wanjiku Kamau | Market Vendor | 65,000 | 0 | No | 🎯 Hunter + PRIDE Loop |

---

## Frameworks Applied

This project demonstrates mastery of the following AI Safari frameworks:

| Framework | Applied In |
|---|---|
| **AIM** | Loan screening prompt engineering |
| **MAP** | Harvest-cycle repayment schedule generation |
| **OCEAN** | Real-time AI output verification panel |
| **4D** | Delegation boundaries between Scout, Guardian, Hunter |
| **ETHOS** | Dignity-centered decision design |
| **TRACK** | Occupation proxy bias detection + counterfactual testing |
| **OASIS** | Data sovereignty charter — Kenya DPA 2022 |
| **PRIDE** | Human oversight loop with pause points and Elders Council |
| **HORIZON** | Three-generation impact projection |
| **RANK** | Agent authority calibration |
| **TRAIL** | Memory architecture per agent |
| **GUARD** | Safety rails, bias flags, dignity filter |
| **CYCLE** | Self-improvement engine (Sunday 2AM EAT analysis) |

---

## Projected Impact

| Metric | Before | After |
|---|---|---|
| Female vendor loan approval rate | 29% | 66% (+37%) |
| Default rate | 11% | < 3% |
| Loan processing time | 4.2 days | 0.8 days |
| Bias incidents per month | 847 | < 12 |
| Dignity violations | 203/month | 0 |
| Data under African governance | ~40% | 100% |

---

## Acknowledgements

Built during the **AI Safari** program — a structured AI fluency course grounded in East African fintech and edtech contexts.

Inspired by the 61% of informal traders in Western Kenya who currently lack formal credit access — and the chama savings culture that proves community-led finance works when systems are built with people, not against them.

---

## License

MIT — use it, fork it, build on it. Just don't deploy it without reading the ethical architecture section first.

---

*Safari njema. The watering hole is full. The hunt begins at dawn. 🦁*
