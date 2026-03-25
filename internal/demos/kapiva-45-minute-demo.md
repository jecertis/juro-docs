# 45-minute client demo — kapiva.in

Runbook for a prospect-facing session that starts with the **public-site DPDP-style URL scanner** and uses **kapiva.in** as the single golden domain. Tune pacing for **D2C / consumer brand** contexts (wellness, e-commerce, marketing stack).

**Note:** This file is intentionally stored under `internal/` so it is **not published** to the public docs site.

## Prerequisites

- Scanner UI: `juro-web/jurocompliant.html`, served in local dev by the Flask app in `juro/juro` at **http://localhost:5001** (requires `juro` and `juro-web` as sibling checkouts). Deployed equivalent: same UI + `POST /api/scan` on the same origin.
- Optional second tab: [Documentation](https://docs.jurocompliant.com) for “what happens after the URL scan.”

---

## Pre-demo (about 5 minutes — before the call)

| Check | Action |
|--------|--------|
| Environment | Confirm Flask + sibling `juro-web` path; open **http://localhost:5001** (or your deployed scanner URL). |
| Preflight | Run **one** scan on `kapiva.in` so you know **today’s** API output (findings come from the live collector, not static HTML fixtures). |
| Backup | Short screen recording if the network or target site fails. |
| Desktop | Quiet tab bar; hide unrelated bookmarks. |

---

## Minute-by-minute agenda (45 minutes)

| Time | Length | Block | Do / say |
|------|--------|--------|-----------|
| 0:00–0:04 | 4 min | Welcome + agenda | Introduce yourself and the arc: “We start with a **public-site DPDP-style scan** on **kapiva.in**, walk the findings, then connect to **deeper technical work**.” |
| 0:04–0:10 | 6 min | Problem / why URL first | Compliance is often found late; stakeholders **experience** privacy on the **live site** (consent, notice, trackers, forms). “We map observable signals to **obligation-style themes**, not a vanity score.” |
| 0:10–0:22 | 12 min | Live scan — kapiva.in | Enter **kapiva.in** → **Scan now**. Narrate **2–3** progress states (connectivity → page load → network/cookies → consent / notice). Let results render; pause on **Critical / High / Medium / Total**. |
| 0:22–0:32 | 10 min | Deep dive | **Posture:** one short phrase per row (red / amber / green story). **Findings:** expand the **strongest** issue first (title → description → **location** → **rule** chip → **remediation**) — “This is the handoff paragraph for web and legal.” Open **one** second finding on a **different** theme (e.g. trackers vs notice vs forms). |
| 0:32–0:38 | 6 min | D2C lens | Relate to **D2C**: performance pixels, **privacy policy** as the user-facing contract, **newsletter / checkout** consent, **cross-border** / SaaS hosting if it appears. One line: “A CMP on the page does not by itself fix **firing order** and **granularity**.” |
| 0:38–0:42 | 4 min | Bridge / next step | Use the on-page **full assessment** CTA: website layer vs **backend APIs, logs, databases**. Then one sentence: **docs** (CI, CLI, MCP) = same compliance idea **earlier in the SDLC**. |
| 0:42–0:45 | 3 min | Q&A buffer | Legal vs technical scope, false positives, pilot scope. |

---

## Kapiva-oriented talking points

Use only what **matches live scan output** for the day.

- **Privacy notice:** D2C brands often lag **DPDP** framing in the **published** notice; call out missing or legacy references when the scanner surfaces them.
- **Trackers:** Kapiva-class sites run **ads and analytics**; the issue is whether **non-essential** processing waits for **affirmative, purpose-specific** consent.
- **Forms:** Email capture and offers need **clear purpose**, **link to the notice**, and **opt-in** where applicable — not only blanket “by using this site” language.

If the live run returns **fewer or different** findings than expected, say: “Today’s crawl emphasises these surfaces; a **full engagement** widens coverage (more pages, journeys, and **backend** evidence).”

---

## Short lines to remember

- **Opening:** “We’re scanning **kapiva.in** the way a **technical compliance pass** would — starting from what the **browser and network** can observe.”
- **Posture:** “This shows **where** you’re weak by **theme** before we drown in tickets.”
- **Remediation:** “Each box is written so **engineering and legal** can share the same sentence.”
- **Disclaimer:** “This is **technical evidence** for your **compliance programme** — not legal advice.”

---

## Fallbacks

| Risk | Mitigation |
|------|------------|
| Scan slow or errors | Switch to a **pre-recorded** run or a backup URL; keep narrating the **same** UI story. |
| Sparse findings | Spend more time on **one** finding and **posture**; lean on the **full assessment** depth story. |
| Legal stakeholders in room | Slow down on **rule references** and **locations**; offer a **written** follow-up. |

---

## After the call

- Send a **screenshot or export** of results plus **one paragraph** on recommended next step (pilot vs full assessment).

---

## Related

- DPDP product context: [DPDP compliance](https://docs.jurocompliant.com/docs/regulations/dpdp-compliance)
- Platform service map (repos and domains): `juro-platform` repo — `infra/platform-topology.md`

