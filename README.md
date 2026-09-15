# InterviewPrep

A personal study desk for Prathamesh Nikam: 83 interview questions in 26 collections, grounded in public project documentation and the supplied ML/NLP question list, plus six AI interview platform guides. Plain HTML, CSS and JavaScript. No backend, API key, runtime package, external font or build tool is required.

## Study

- Browse repository collections or follow topics across projects and foundations.
- Open **AI interview platforms** for Mercor, micro1, Alignerr, Outlier, Turing and HireVue. Each guide distinguishes official process facts from original practice advice and offers a six-question practice round.
- Search full answers, deep dives, follow-ups and original uploaded question wording. Combine collection, topic, depth and revision filters.
- Read a concise answer, detailed explanation, technical section, answered follow-ups and a pitfall. Five responsive diagrams include text equivalents.
- Rehearse a shuffled selection with hidden answers. Mark questions practiced yourself; the site does not score your knowledge.
- Keep bookmarks and notes in browser storage. Export/import revision JSON from **My revision** to move between devices.
- Copy stable question links such as `#q=psychota-causality`. Hash routes work at the GitHub Pages project path and after reload.

## Preview and validate

From the repository root:

```sh
python -m http.server 8000
```

Open `http://localhost:8000`. Use HTTP rather than double-clicking `index.html`, because browsers restrict fetching the content JSON over `file://`.

```sh
node scripts/validate.mjs
node --check assets/app.js
```

Node 22 or newer is used by CI. The site itself only needs a modern browser. Content validation checks IDs, sections, sources, collection references, diagrams and all 60 original uploaded-question mappings. Browser QA results are documented in [docs/QA.md](docs/QA.md).

## Publish on GitHub Pages

1. Review and merge the feature PR into `main` when ready.
2. In repository **Settings → Pages → Build and deployment**, choose **GitHub Actions** if not already configured.
3. The Pages workflow validates and publishes only `main`. If Pages is configured after the merge workflow failed, rerun **Deploy GitHub Pages** on `main`.
4. The expected project URL is `https://prathmesh333.github.io/InterviewPrep/`. A feature PR is not itself a deployed site.

The deployment artifact contains only `index.html`, `assets/`, `data/` and public `docs/`. Relative URLs and hash routes support the `/InterviewPrep/` base path. The workflow uses the official [GitHub Pages workflow pattern](https://docs.github.com/en/pages/getting-started-with-github-pages/using-custom-workflows-with-github-pages).

The repository was initially empty. One minimal `.gitkeep` baseline commit on `main` was needed to create a reviewable PR. All website work belongs to the feature branch.

## Revise content

Platform guides live in the `platforms` array of `data/content.json`. Each has a stable ID, category, sourced process summary, preparation steps, review date, official links and a `questionIds` practice selection. Details use links such as `#view=platforms&platform=mercor`. Search in the question bank also recognizes associated platform names. See [platform source notes](docs/PLATFORM_SOURCES.md) for evidence boundaries and updating instructions. The twelve additional exercises are original rehearsal prompts, not actual or guaranteed platform questions.

Edit `data/content.json`. Content is separate from rendering. No regeneration or package installation is needed. Each question has:

```json
{
  "id": "stable-question-id",
  "collection": "hqde",
  "topic": "Distributed ML",
  "difficulty": "Deep dive",
  "title": "A specific interview question?",
  "short": "A concise spoken answer.",
  "answer": ["First detailed paragraph.", "Second detailed paragraph."],
  "deep": "Equation, mechanism, concrete example or technical tradeoff.",
  "followups": [
    {"question": "A probing follow-up?", "answer": "A complete response."},
    {"question": "A second follow-up?", "answer": "A complete response."}
  ],
  "pitfall": "The specific mistake to avoid.",
  "evidence": "What was verified and what remains a proposal.",
  "sources": [{"label": "Source file", "url": "https://github.com/owner/repo/blob/COMMIT/file"}],
  "diagram": null
}
```

Use `Core` or `Deep dive` for difficulty. Diagram keys are `rag`, `hqde`, `psychota`, `attention`, and `ensemble`; edit their content in `assets/app.js`. Add collections with unique IDs, names, subtitles, repository names or null, and source notes. Keep IDs stable: notes and shared links depend on them. Text is escaped before rendering, so content is plain text, not executable HTML.

`data/source-questions.json` preserves every uploaded question occurrence and its canonical answer mapping. Duplicate and closely related phrasings map to 40 answers. Do not drop source entries to satisfy validation. New source batches should extend the mapping and update the validator’s expected totals intentionally.

## Evidence and limitations

[Master specification](docs/MASTER_SPEC.md) defines the requested product. [Source audit](docs/SOURCE_AUDIT.md) records all 35 repositories and inspection depth. HQDE and PsychoTA include targeted implementation checks; most other project content is README-grounded. FH-RAG follows the supplied brief because no matching public repository was located. TA-RS → PsychoTA is an inferred mapping, made explicit in the site.

Answers are rehearsal drafts. They distinguish implementation from proposals and do not verify personal ownership, clinical validity or unexecuted benchmark gains. Several earlier sample claims are corrected in the content. Learning repositories and forks are not presented as production accomplishments.

## Local revision data

Study data lives under `interviewprep.study.v1` in `localStorage`. No notes are sent to GitHub. Import accepts version 1 exports up to 2 MB, merges bookmarks and practice marks, and replaces notes only for matching known IDs. Unknown IDs are skipped. Invalid files are rejected before mutation. Notes are limited to 10,000 characters per question. If browser storage is blocked, the current session still works and export can preserve it.

Browser storage is not encrypted and clearing site data removes it. Use exported backups for portability. Loading the site from a different origin or port creates a different storage area. The site makes no offline-cache guarantee; once loaded, question content and interactions do not call a backend.
