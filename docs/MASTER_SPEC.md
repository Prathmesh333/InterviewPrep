# InterviewPrep: master prompt and implementation specification

## Platform-preparation extension — 15 September 2026

Add a prominent AI interview platforms destination for Mercor, micro1 and related platforms. Cover Mercor, micro1, Alignerr, Outlier, Turing and HireVue with official links, dated process summaries, format distinctions, preparation plans and practice selections drawn from original exercises and the repository library. Do not imply that all platforms use the same AI interviewer, that practice prompts are actual assessment questions, or that screening guarantees work. Preserve existing IDs, notes and progress. Deliver the extension on a feature branch and open a new PR for review.

Build a personal interview-preparation website for Prathamesh Nikam using https://github.com/Prathmesh333/InterviewPrep. Inspect the public repositories at https://github.com/Prathmesh333 and use their actual documentation and implementation to produce technically defensible interview material. The audience is the project author preparing for ML engineering, NLP, research engineering and software engineering interviews.

## Learning experience

Create a focused study workspace with repository collections, a topic index and a searchable question bank. Make project stories and fundamentals equally easy to find. Feature FH-RAG, HQDE and TA-RS/PsychoTA. Include the supplied project questions and every distinct question in the uploaded ML/NLP list; preserve source-question mappings when merging duplicates. Add questions for other substantive repositories after inspection. Inventory repositories with insufficient evidence, forks and profile/training repositories explicitly instead of inventing work.

Each question needs a stable ID, repository or collection, topic, difficulty, title, a concise spoken answer, a detailed answer, a technical deep dive, at least two follow-up questions with answers, and a pitfall. Project answers must distinguish code-supported facts, README claims, supplied sample claims, and proposed improvements. Add source links and a verification note. First-person answers are rehearsal drafts: do not fabricate ownership, measured gains, publications, production usage or benchmarks. Where source claims conflict, prefer inspected code and explain the gap.

Detailed answers should explain the problem, approach, rationale, evaluation, tradeoffs and limitations as relevant. Technical sections should include equations, tensor shapes, complexity or concrete examples when useful. Correct oversimplifications in the uploaded sample answers, especially preprocessing before splitting, indiscriminate punctuation removal, leakage, weak-label evaluation and confidence versus correctness. Do not reproduce truncated answers as finished content.

## Structure and interactions

The default screen should introduce the study library, show actual question and collection counts, and offer a clear path into repository questions. Provide full-text search across questions and answers, combinable repository/topic/difficulty filters, clear filters and an informative empty state. Questions should have shareable hash links that work after a GitHub Pages reload.

Allow bookmarking, marking questions practiced, and private browser-local notes. Show honest progress based on user actions. Include a practice mode that hides answers until requested and selects questions from the current filters. Support export and import of study progress with validation. Explain that browser data does not sync between devices. Keep all learning material accessible without an account, API key or server.

Use readable diagrams for hierarchical retrieval, ensemble aggregation, dialogue modeling and attention where they add explanatory value. Provide text equivalents. Diagrams must remain usable on small screens without external rendering services.

## Visual design

Use an editorial study-desk aesthetic: warm ivory canvas, deep green navigation, restrained lime accents and serif display headings paired with a readable system sans-serif. The signature element is a numbered repository reading list, with clear dividers and compact topic labels. Give long answers a comfortable reading width. Avoid decorative charts, fake metrics and unnecessary animation.

Use semantic HTML, visible keyboard focus, a skip link, labeled controls, meaningful button states and sufficient contrast. Layout must work at 375px, tablet and desktop widths. Honor reduced-motion preferences. Reading and filtering must work with keyboard controls. Provide useful JavaScript-disabled guidance.

## Implementation and maintenance

Use plain HTML, CSS and JavaScript with no backend or runtime dependencies. Keep content in a separate editable JSON file. Use relative asset URLs and hash navigation for project-path GitHub Pages hosting. Bundle all fonts/icons/diagrams locally or use system fonts and native drawing. Never embed credentials. Separate public content from browser-local study data.

Add a README with local preview instructions, content schema, question-editing example, source-refresh procedure, storage behavior and GitHub Pages setup. Include this specification and a repository audit with source revisions, inspection depth, coverage decisions and outstanding evidence gaps. Include a validation script for IDs, required answer sections, source URLs, collection references and uploaded-question coverage. Test actual search, filters, practice, persistence, deep links, import/export and mobile layout in a browser.

## Git delivery and acceptance

Work on a feature branch and open a pull request against the default branch. If the repository has no commits, create the smallest initial baseline needed for a PR and explain it. Keep all website work on the feature branch. Add PR validation and a GitHub Pages workflow that deploys only from the default branch after merge. Do not merge the PR.

Acceptance requires a functioning static site, complete supplied-question coverage, substantive project content, evidence-aware answers, working search and revision tools, responsive verification, passing content validation, documented hosting, and a reviewable PR. Report any hosting configuration that still needs a repository owner action. Never describe an unmerged branch as a live deployed website.
