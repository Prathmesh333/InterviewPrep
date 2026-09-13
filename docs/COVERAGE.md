# Specification coverage

The supplied 35-section prompt is preserved in `PROJECT_SPEC.md`. The implementation uses plain HTML, CSS, JavaScript and separately editable JSON. Runtime does not depend on a backend or third-party CDN.

| Requirement | Implementation |
| --- | --- |
| Repository analysis and personal grounding | 35-repository inventory; 15 source-backed projects plus conceptual FH-RAG; commit-pinned source links and audit |
| Project introductions, architecture, implementation, tradeoffs, ownership | Project JSON banks; priority depth for HQDE, TA-RS and FH-RAG; ownership prompts distinguish evidence from personal confirmation |
| Quick / standard / deep | Every question has three answer fields; initially collapsed; deep mode also shows code and related questions |
| STAR | Behavioral and ownership prompts have STAR guidance and a personal note field; no invented autobiographical story |
| Visual explanations | Lightweight HTML/CSS concept flows for project pipelines, attention, RAG, CNN, ResNet, training, MapReduce, ensembles, backprop, vector search, embeddings and API flow |
| Fundamentals | ML, DL, CNN/computer vision, NLP, LLM, RAG, distributed systems, Ray, Python, SQL, DSA, DBMS, OS, networks, software engineering, behavioral |
| SQL | Eight fixture-backed exercises covering joins, grouping/HAVING, CTEs, correlated subqueries, window functions, ties, dates and duplicates |
| Search and filters | Full question-object search, project, topic, difficulty, type; bookmarks and revision sets |
| Study | One question, reveal, previous/next, mastery/revision, persistent notes |
| Random interviews | Specified 15-question ML Engineer mixture; no duplicate IDs within a session |
| Mock interviews | Project question → actual follow-up prompts → next project question |
| Progress | Viewed answers, known/revision states, project and topic mastery, browser localStorage, export/import |
| Answer quality | Source links, explicit uncertainty, common mistakes, related questions, code-level discrepancies |
| Mobile / theme / accessibility | Collapsible sidebar, dark/light persistence, keyboard controls, reduced motion, contrast checks |
| Static deployment | Relative assets and hash routes beneath `/InterviewPrep/`; validated Pages artifact |
| Documentation | README, original prompt, audit inventory, coverage map, screenshots, editing schema and test instructions |

## Intentional evidence limits

FH-RAG formulas, implementation, variant counts and benchmark outcomes cannot be verified without its source and experiment artifacts. Its portfolio entry explicitly has no repository URL. First-person contribution, hardest bugs and results require Prathmesh's own confirmation. Quantitative claims from marketing-style READMEs are not repeated as verified achievements.

The repository inventory distinguishes source-inspected projects from README-only learning projects and sparse repositories. No claim is made that every notebook was executed or every source file audited. Model training and private datasets are outside website validation.

The follow-up sequence is a rehearsal aid, not an AI evaluator. Answers are compact rather than padded to fixed durations. Code can be copied; execution happens in the user's development environment. The deployed site fetches its own static JSON on load, so offline first-load/service-worker caching is not claimed.
