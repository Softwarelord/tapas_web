# Tapas Infosolutions — website wireframe (REQ-9)

A low-fidelity, clickable wireframe of the new Tapas Infosolutions website. It covers the full sitemap from the approved functional specification (REQ-9, FS v2, approved 2026-10-23). Pages are grey boxes with labelled slots. Visual design, colours, typography and brand assets are out of scope (FR-011).

## Run it

Plain static HTML, CSS and JS with no build step. Links are root-relative, so serve the folder from a web root:

```sh
python3 -m http.server 8000
# open http://localhost:8000/
```

Opening the files directly with `file://` does not work, because the root-relative links break.

## Structure

| Path | Purpose |
|---|---|
| `assets/css/wireframe.css` | Block styles from FS section 8 (hero, value cards, stat counters, before/after, step-flow, module tags, case-study card, CTA band, enquiry form). Breakpoints: tablet ≤ 1024px, mobile ≤ 640px. |
| `assets/js/site.js` | Draws the global header and mega-menus (section 6), the mobile drawer, the footer (section 7), CTA bands and enquiry forms. **All shared data lives at the top of this file**: entity name, contact details, Helpdesk URL, social links, menu groups, footer links and the enquiry interest list. Change it once there (FR-130, FR-132). |
| `<section>/<page>/index.html` | One folder per URL from FS 5.1, giving extension-less URLs (FR-060). |
| `404.html` | Page not found (FR-091). |

### Wireframe conventions

- `[Content to be supplied by client]` and other *italic grey* text are placeholders. No content was invented (FR-144).
- **Amber notes** record open points ("TBC") and the FR or section they come from.
- **Dashed amber outlines** mark blocks that the spec says are **hidden on the live site** until the client supplies and approves content: unconfirmed stat counters, case studies, AI evidence and client logos.
- Small uppercase labels above elements are slot names (FR-143).

## Page → specification map

| URL | FS section | Template (8.12) |
|---|---|---|
| `/` | 9 | Home |
| `/ai/` | 12 | Hub |
| `/ai/sap-joule-btp-ai/` | 13 | Service detail + inline form |
| `/ai/custom-ai-agents/` | 14 | Service detail |
| `/sap-solutions/rise-with-sap/` | 15 | Service detail |
| `/sap-solutions/grow-with-sap/` | 16 | Service detail |
| `/services/` | 17 | Hub |
| `/services/sap-s4hana/` (`#implementation`, `#migration`, `#mobility`) | 18 | Service detail |
| `/services/sap-process-control-audit/` | 19 | Service detail (selectable phase flow) |
| `/services/sap-system-support/` (`#helpdesk`) | 20 | Service detail |
| `/services/sap-testing-training/` | 21 | Service detail |
| `/services/sap-business-improvement/` | 22 | Service detail |
| `/services/sap-integration-services/` | 23 | Service detail + inline form |
| `/accelerators/` + 5 detail pages | 24 * | Hub / Accelerator detail |
| `/industries/` (tile anchors) | 26 * | Hub |
| `/industries/government-public-sector/` | 27 * | Service detail |
| `/company/about-us/` (`#why-tapas`) | 10, 11 | Company page |
| `/company/implementation-methodology/` | 25 * | Company page |
| `/company/project-governance/` | 30 * | Company page |
| `/company/case-studies/` + 4 detail pages | 28 * | Hub / Case study detail |
| `/company/clients/` | 29 * | Company page |
| `/contact-us/` | 31 * | Contact + enquiry form |
| `/privacy-policy/` | 5.10 | Utility |

\* These sections are **not in the approved FS** (see below). The pages are built from the sitemap (FR-057–FR-092), the section 8.12 templates and the profile content quoted elsewhere in the FS.

## ⚠ Specification gap

The approved FS is cut off. It ends mid-sentence at **FR-519** in section 23.9 (`"SFDC" is shown as "Sales`), and Srijak's live copy ends at the same place. Sections that the FS refers to but that are missing:

- 24 Accelerators
- 25 Implementation Methodology
- 26 Industries
- 27 Government and Public Sector
- 28 Case Studies
- 29 Clients
- 30 Project Governance
- 31 Contact Us and enquiry form
- 32 Claims and figures validation
- 33 Responsive and accessibility rules
- 34 SEO and analytics
- 35 Content mapping
- 36 Brand assets
- 37 Open points
- 38 Glossary

Assumptions made because of the gap:

- Breakpoints: 1024px and 640px.
- Enquiry form fields: name, organisation, email, optional phone, area of interest, message, consent.
- Form behaviour: the interest is preset from `?interest=` and the source page is recorded from `?from=`. The wireframe simulates submission, and there is a checkbox to simulate a failure; the entered data is kept on failure.
- Per-page SEO metadata: a placeholder `<title>` and meta description only.
- No analytics.

## Inconsistencies found in the FS

- **"Trusted SAP partner…" strapline** (FR-252, verbatim) versus FR-030 (no page implies SAP partner status). The approved wording is kept and flagged on the About Us and Government pages.
- **Terms of Use:** FR-136 asks for a footer link to a Terms of Use page that is not in the sitemap (FR-090, FR-092). It is shown as a non-link "[page TBC]".
- **Company Snapshot:** FR-083 puts the full Snapshot and Differentiators content on About Us at `#why-tapas`, while FR-238 asks About Us to show only a teaser that links to it. The full section is placed at `#why-tapas` and the teaser is omitted.
- **CTA label case:** "Talk to an SAP & AI **E**xpert" (FR-115, header) versus "… **e**xpert" (FR-187, home hero). Both are kept as written.
- **Helpdesk link:** FR-467 asks whether the header or footer should carry a Helpdesk link, but FR-055, FR-116 and FR-133 already require one. The link is included.
- **SUM/DMA:** the FS keeps the profile's "SUM/DMA" while noting that SAP's name is "DMO" (FR-349, FR-423). The tags show "DMA" until this is confirmed.

## Main open points (client to confirm)

1. Legal entity name: "Tapas Infosolutions" or "Tapas Infosolutions LLP". Set by `ENTITY_NAME` / `ENTITY_NAME_CONFIRMED` in `site.js`.
2. SAP partner status for RISE with SAP and GROW with SAP. Until it is confirmed, there are no badges, SAP logos or partner wording anywhere.
3. Dedicated Helpdesk Portal URL (`HELPDESK_URL`). Until it is set, links point to `/services/sap-system-support/#helpdesk`.
4. Social profile URLs (`SOCIAL`). Icons stay hidden until URLs are supplied.
5. What "AI autonomous" means in practice, and the AI use cases, case studies and figures behind the "Delivered" claims.
6. Every stat-counter figure (100+ years, 100+ consultants, ₹6 crore turnover, 20.8 → 3.8 days) needs written confirmation.
7. Approval to describe the four government projects, and to name Atos / Eviden.
8. Content for Implementation Methodology, Clients, Project Governance detail, Important Compliances, the accelerator before/after steps and the case-study modules.
9. Whether Careers, Blog / Insights, News and Terms of Use are in scope.
10. Whether to keep, move or drop the Steve Jobs quote, and the final hero headline and tagline.
