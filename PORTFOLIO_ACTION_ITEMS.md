# Portfolio Action Items

Status snapshot as of 2026-09-03. This file is a working checklist, not published content — it lives at the repo root, outside `content/`, so it never renders on the live site.

## 1. Needs a PowerPoint deck uploaded (field is wired, folder is empty)

These pages already show a "Solution Architecture Deck" button. Right now it points at a file that doesn't exist yet — drop the `.pptx` at the exact path below (filename must be `deck.pptx`) and it goes live with no further code changes.

| Project | Drop file at |
|---|---|
| Agora RAG | `public/architecture/projects/agora_rag/deck.pptx` |
| AI-Powered Sentence Completion | `public/architecture/projects/ai_powered_sentence_completion/deck.pptx` |
| Digital Lending E-Sign Prediction | `public/architecture/projects/digital_lending_esign_prediction/deck.pptx` |
| Fraud Risk Detection ML | `public/architecture/projects/fraud_risk_detection_ml/deck.pptx` |
| Nigerian RAG Health System (Dr. Amina) | `public/architecture/projects/nigerian_rag_health_system/deck.pptx` |
| InsightFlow | `public/architecture/projects/insightflow/deck.pptx` |
| CareClerk Medical Copilot (Client Work) | `public/architecture/client-work/careclerk/deck.pptx` |

## 2. Deck status not yet decided

- **Groundwork** — you said you'd generate one, but the `architectureDeck` field was never actually added to `content/projects/groundwork.mdx`. Folder exists (`public/architecture/projects/groundwork/`) but nothing is wired. Say the word once it's ready, or I can wire the field now and you drop the file in whenever.
- **Talvo, FilingPulse, Corivo** (Client Work) — never explicitly asked whether these have decks. Confirm yes/no for each.

## 3. Confirmed — no deck needed

Bank Marketing Insights, ConfidenceAI, Factor Analysis & Linear Regression, Data Predictive Insights ETL, Market Basket Analysis, Bike-Sharing Rider Efficiency, Sentiment Lab, Sign Language Recognition CNN, Doc Gen.

## 4. Missing cover images

None of these have a real thumbnail — pages fall back to a broken/missing image path right now:

- **Groundwork** → `public/images/projects/groundwork/cover.jpg`
- **All 5 Client Work entries** → `public/images/client-work/<slug>/cover.jpg` for `doc_gen`, `talvo`, `filingpulse`, `careclerk`, `corivo`

## 5. Open content work

- ~~Document Intelligence Platform write-up~~ — resolved: confirmed to be the same system as **Doc Gen**. Homepage card now links to `/client-work/doc_gen`.
- ~~5-Agent AI Customer Support System write-up~~ — resolved: confirmed to be the same system as **Corivo**. Homepage card now links to `/client-work/corivo`.
- **Client Work nav icon** — currently reusing the Projects nav thumbnail (`public/images/nav/client-work.jpg` is a copy of `projects.jpg`) as a placeholder. Swap for a real image whenever convenient — purely cosmetic.

## 6. Everything else — done

- Infra: sitemap, robots.txt, dynamic OG images, Turnstile fixes, font scoping — shipped and live.
- 15 projects + 5 Client Work case studies published, each with a Solution Architecture section, verified against real source material.
- Homepage shows all projects with per-card deck buttons where a deck exists.
- All of the above is committed and deployed to production (`olawale-ten.vercel.app`).
