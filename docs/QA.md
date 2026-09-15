# Verification record

## Platform extension — 15 September 2026

Content validation passes for 83 questions in 26 collections, including 12 new original practice exercises, six sourced platform guides and every referenced practice-question ID. The original 60 uploaded-question mappings remain intact.

Playwright/Chrome verifies all six platform detail routes and their practice rounds, search by platform name and format, zero-results recovery, unknown-platform recovery, official-link rendering, new-question bookmarks and notes after reload, and global question search using platform names. The prior functional regression suite also passes with the expanded content count.

Desktop axe checks report no WCAG 2 A/AA or WCAG 2.1 AA violations on the platform directory, micro1 guide and response-ranking question. Home, directory, Mercor/micro1 guides and topics have no document overflow at 375px. Desktop directory and mobile micro1 screenshots were visually reviewed. Active navigation remains visible within the horizontally scrolling mobile navigation.

The records below describe the original release and its source audit.

Functional browser checks first ran on 13 September 2026 and passed again on 15 September 2026. The final accessibility pass and source-link pinning ran on 15 September 2026. These checks validate the website; no project ML benchmark or model-training run was executed.

## Automated content checks

`node scripts/validate.mjs` passes for 71 complete questions in 25 nonempty collections. All 60 uploaded question occurrences map to 40 canonical answers. The three supplied project questions and all 35 public repository inventory entries are present. Required answer sections, follow-ups, IDs, source paths and diagram keys are checked. `node --check assets/app.js` passes.

## Browser behavior

Tested with Playwright and locally installed Google Chrome, using the project subpath `/InterviewPrep/`:

- Search over full answer text; collection and topic filters combined; zero-results state and clear filters.
- Direct question URLs, reload, invalid-question recovery and repository inventory expansion.
- Bookmark add/remove behavior, explicit practice marks, notes and persistence after reload.
- Practice on a filtered collection, answer conceal/reveal, next-question concealment and exit.
- Revision export produces valid JSON; import merges known IDs, ignores unknown IDs and restores notes.
- Malformed import leaves existing stored state unchanged.
- Blocked local storage still permits session notes and displays a backup notice.
- No uncaught browser exceptions in the functional test.

## Responsive and visual checks

Reviewed rendered desktop study-desk and question screenshots, plus mobile attention content. At 375 CSS pixels, home, question bank, repositories, topics, revision and two diagram-bearing answers had no document-level horizontal overflow. Navigation intentionally scrolls horizontally on narrow screens; diagrams stack vertically. Desktop functional checks used 1440 × 1100. These checks do not establish compatibility with every browser or assistive technology.

## Accessibility

After darkening muted text, topic labels, collection numbers and concise-answer labels, axe-core reported no WCAG 2 A/AA or WCAG 2.1 AA violations on home, question bank, topics, revision and the PsychoTA answer at desktop width. Navigation color transitions were removed so intermediate states do not reduce text contrast. The `/` keyboard shortcut correctly focuses search. Semantic controls, visible focus styles, a skip link, labeled fields, native expandable follow-ups and reduced-motion behavior are included.

Automated checks are partial evidence, not a certification. Screen-reader testing and a full keyboard traversal across all imported-data states remain useful future checks.

## Deployment boundary

All 26 unique commit-pinned GitHub source-file URLs were checked through the GitHub contents API and resolved successfully on 15 September 2026.

GitHub Pages is configured with `build_type: workflow`. The workflow only deploys `main`, so the feature PR does not publish the site. Actual Pages deployment is verified only after merge and a successful deployment run. GitHub-hosted validation results are visible on the PR.
