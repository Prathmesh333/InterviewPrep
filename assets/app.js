"use strict";
(() => {
  const $ = (s, root = document) => root.querySelector(s);
  const esc = (value) =>
    String(value ?? "").replace(
      /[&<>"']/g,
      (c) =>
        ({
          "&": "&amp;",
          "<": "&lt;",
          ">": "&gt;",
          '"': "&quot;",
          "'": "&#39;",
        })[c],
    );
  const key = "interviewprep.study.v1";
  const main = $("#main");
  let data,
    questionMap,
    collectionMap,
    topics,
    practice = null,
    noticeTimer;
  let filters = {
    search: "",
    collection: "",
    topic: "",
    difficulty: "",
    status: "",
  };
  let state = { version: 1, bookmarks: [], practiced: [], notes: {} };
  let storageOK = true;
  try {
    const saved = localStorage.getItem(key);
    if (saved) state = validateState(JSON.parse(saved));
  } catch {
    storageOK = false;
  }

  function validateState(value) {
    if (
      !value ||
      value.version !== 1 ||
      !Array.isArray(value.bookmarks) ||
      !Array.isArray(value.practiced) ||
      !value.notes ||
      typeof value.notes !== "object" ||
      Array.isArray(value.notes)
    )
      throw Error("Invalid study file");
    for (const list of [value.bookmarks, value.practiced])
      if (
        list.length > 10000 ||
        list.some(
          (id) => typeof id !== "string" || !/^[a-z0-9-]{1,100}$/.test(id),
        )
      )
        throw Error("Invalid question IDs");
    const notes = Object.create(null);
    for (const [id, note] of Object.entries(value.notes)) {
      if (
        !/^[a-z0-9-]{1,100}$/.test(id) ||
        typeof note !== "string" ||
        note.length > 10000
      )
        throw Error("Invalid notes");
      notes[id] = note;
    }
    return {
      version: 1,
      bookmarks: [...new Set(value.bookmarks)],
      practiced: [...new Set(value.practiced)],
      notes,
    };
  }
  function notify(message, persist = false) {
    const box = $("#notice");
    clearTimeout(noticeTimer);
    box.textContent = message;
    box.hidden = false;
    if (!persist)
      noticeTimer = setTimeout(() => {
        box.hidden = true;
      }, 4200);
  }
  function save() {
    try {
      localStorage.setItem(key, JSON.stringify(state));
      storageOK = true;
    } catch {
      storageOK = false;
      notify(
        "Browser storage is unavailable. Export your revision to keep this session.",
        true,
      );
    }
    updateNav();
  }
  function updateNav() {
    $("#nav-count").textContent = data.questions.length;
    $("#saved-count").textContent = state.bookmarks.length;
    const view = params().get("view") || "home";
    document.querySelectorAll("[data-view]").forEach((a) => {
      const active = a.dataset.view === (params().has("q") ? "library" : view);
      a.classList.toggle("active", active);
      if (active) a.setAttribute("aria-current", "page");
      else a.removeAttribute("aria-current");
      if (active) {
        const nav = a.parentElement;
        if (nav.scrollWidth > nav.clientWidth) {
          nav.scrollLeft +=
            a.getBoundingClientRect().left -
            nav.getBoundingClientRect().left -
            (nav.clientWidth - a.clientWidth) / 2;
        }
      }
    });
  }
  const params = () => new URLSearchParams(location.hash.slice(1));
  const questionURL = (id) => "#q=" + encodeURIComponent(id);
  const collectionURL = (id) =>
    "#view=library&collection=" + encodeURIComponent(id);
  const count = (c) => data.questions.filter((q) => q.collection === c).length;
  const done = (id) => state.practiced.includes(id);
  function tags(q) {
    return `<div class="tags"><span class="tag">${esc(collectionMap.get(q.collection).name)}</span><span class="tag topic">${esc(q.topic)}</span><span class="tag level">${esc(q.difficulty)}</span>${done(q.id) ? '<span class="tag">✓ Practiced</span>' : ""}</div>`;
  }
  function bookmark(q) {
    const saved = state.bookmarks.includes(q.id);
    return `<button class="bookmark" data-bookmark="${esc(q.id)}" aria-pressed="${saved}" aria-label="${saved ? "Remove bookmark for" : "Bookmark"} ${esc(q.title)}">${saved ? "◆" : "◇"}</button>`;
  }
  function questionRows(items) {
    return items
      .map(
        (q) =>
          `<div class="question-row"><a href="${questionURL(q.id)}">${tags(q)}<h3>${esc(q.title)}</h3><p>${esc(q.short)}</p></a>${bookmark(q)}</div>`,
      )
      .join("");
  }
  function collectionRows(items) {
    return items
      .map(
        (c, i) =>
          `<a class="collection-row" href="${collectionURL(c.id)}"><span class="number">${String(i + 1).padStart(2, "0")}</span><div><h3>${esc(c.name)}</h3><p>${esc(c.subtitle)}</p></div><span class="count">${count(c.id)} questions</span><span class="arrow" aria-hidden="true">↗</span></a>`,
      )
      .join("");
  }
  function filtered() {
    const terms = filters.search
      .toLocaleLowerCase()
      .trim()
      .split(/\s+/)
      .filter(Boolean);
    return data.questions.filter(
      (q) =>
        (!filters.collection || q.collection === filters.collection) &&
        (!filters.topic || q.topic === filters.topic) &&
        (!filters.difficulty || q.difficulty === filters.difficulty) &&
        (!filters.status ||
          (filters.status === "saved"
            ? state.bookmarks.includes(q.id)
            : filters.status === "practiced"
              ? done(q.id)
              : !done(q.id))) &&
        terms.every((t) => q.searchText.includes(t)),
    );
  }
  function filterUI() {
    const options = (values, current) =>
      values
        .map(
          ([v, label]) =>
            `<option value="${esc(v)}" ${v === current ? "selected" : ""}>${esc(label)}</option>`,
        )
        .join("");
    return `<div class="search-wrap"><label class="sr-only" for="search">Search all questions and answers</label><input id="search" type="search" placeholder="Search questions, concepts or project details…" value="${esc(filters.search)}" autocomplete="off"><kbd aria-hidden="true">/</kbd></div>
      <div class="filters"><label class="filter-label">Collection<select id="collection">${options([["", "All collections"], ...data.collections.map((c) => [c.id, c.name])], filters.collection)}</select></label><label class="filter-label">Topic<select id="topic">${options([["", "All topics"], ...topics.map((t) => [t, t])], filters.topic)}</select></label><label class="filter-label">Depth<select id="difficulty">${options(
        [
          ["", "All depths"],
          ["Core", "Core"],
          ["Deep dive", "Deep dive"],
        ],
        filters.difficulty,
      )}</select></label><label class="filter-label">Revision<select id="status">${options(
        [
          ["", "Any status"],
          ["saved", "Bookmarked"],
          ["practiced", "Practiced"],
          ["unpracticed", "Not practiced"],
        ],
        filters.status,
      )}</select></label><button class="text-button" data-action="clear">Clear filters</button></div><div class="results-meta"><span id="results-count" role="status" aria-live="polite"></span><button class="button secondary small" data-action="practice">Practice this selection <span aria-hidden="true">↗</span></button></div><div id="results" class="question-list"></div>`;
  }
  function refreshResults() {
    const items = filtered();
    $("#results-count").textContent =
      `${items.length} ${items.length === 1 ? "question" : "questions"}${filters.search ? " matching your search" : ""}`;
    $("#results").innerHTML = items.length
      ? questionRows(items)
      : '<div class="empty"><h2>No questions in this selection.</h2><p>Try a broader search or clear a filter.</p><button class="button secondary" data-action="clear">Clear filters</button></div>';
    const practiceButton = $('[data-action="practice"]', main);
    if (practiceButton) practiceButton.disabled = !items.length;
  }
  function home() {
    main.innerHTML = `<section class="hero"><div><p class="eyebrow"><span class="dot"></span> A LITTLE PRACTICE. A CLEARER ANSWER.</p><h1>Your work.<br>Your next <em>great answer.</em></h1><p class="intro">Turn the projects you’ve built into stories you can explain.<br>Study the ideas, work through the tradeoffs, and make the answer yours.</p><div class="actions"><a class="button" href="#view=library">Explore question bank <span aria-hidden="true">→</span></a><a class="button secondary" href="#view=collections">Browse repositories</a></div></div><div class="practice-card"><span class="orbit" aria-hidden="true"></span><p class="eyebrow">THE RECALL ROUTINE</p><h2>Read less.<br>Recall more.</h2><p>Pick a question. Say your answer out loud. Then check the details you missed.</p><button data-action="practice-all">Start a practice round <span aria-hidden="true">↗</span></button></div></section>
    <div class="stats"><div class="stat"><strong>${data.questions.length}</strong><span>interview questions</span></div><div class="stat"><strong>${data.collections.length}</strong><span>study collections</span></div><div class="stat"><strong>${topics.length}</strong><span>connected topics</span></div><div class="stat"><strong>${state.practiced.length}<span style="display:inline;font-size:15px"> / ${data.questions.length}</span></strong><span>practiced by you</span></div></div>
    ${platformShortcuts()}
    <section class="collections"><div class="section-heading"><h2>Start with your projects</h2><a href="#view=collections">All repositories <span aria-hidden="true">↗</span></a></div>${collectionRows(data.collections.slice(0, 3))}</section>
    <section><div class="section-heading"><h2>Find your next question</h2><span class="muted" style="font-size:10px">PROJECTS + FOUNDATIONS</span></div>${filterUI()}</section>`;
    refreshResults();
  }
  function library(view) {
    const c = collectionMap.get(filters.collection);
    main.innerHTML = `<p class="eyebrow">${view === "saved" ? "YOUR READING LIST" : "THE QUESTION BANK"}</p><h1>${view === "saved" ? "Keep the good questions close." : c ? esc(c.name) : "One question. A deeper understanding."}</h1><p class="page-intro">${view === "saved" ? "Return to the answers you want to revisit. Bookmarks are saved in this browser." : c ? esc(c.note) : "Find the concise answer, understand the reasoning, then rehearse the follow-ups. Search covers the full answer, including technical details."}</p>${filterUI()}`;
    refreshResults();
  }
  function collectionPage() {
    main.innerHTML = `<p class="eyebrow">LEARN FROM WHAT YOU’VE BUILT</p><h1>The repository reading list.</h1><p class="page-intro">Project-specific questions connect architecture to the choices behind it. FH-RAG follows your supplied brief; source notes make the evidence clear.</p><div class="collections">${collectionRows(data.collections.filter((c) => !["ml", "nlp", "platform-prep"].includes(c.id)))}</div><div class="section-heading"><h2>Foundations & interview practice</h2></div>${collectionRows(data.collections.filter((c) => ["ml", "nlp", "platform-prep"].includes(c.id)))}<details class="inventory"><summary>Full GitHub inventory · ${data.repositories.length} repositories</summary><p class="page-intro" style="margin-top:15px">README-level survey with targeted code inspection for HQDE and PsychoTA. Forks and repositories with limited evidence remain listed without invented experience claims.</p>${data.repositories.map((r) => `<div class="inventory-item"><a href="${esc(r.url)}" target="_blank" rel="noopener noreferrer">${esc(r.name)} ↗</a>${r.fork ? ' <span class="tag topic">Fork</span>' : ""}<p>${esc(r.note)}</p></div>`).join("")}</details>`;
  }
  function platformShortcuts() {
    return `<section class="platform-shortcuts" aria-label="Prepare by interview platform"><div><p class="section-kicker">PREPARE FOR YOUR NEXT SCREENING</p><h2>Mercor, micro1 or somewhere else?</h2><p>Know the format. Rehearse the skills. Bring your own examples.</p></div><a class="button secondary" href="#view=platforms">Explore 6 platforms →</a><div class="platform-pills">${data.platforms.map((p) => `<a href="#view=platforms&platform=${esc(p.id)}">${esc(p.name)} <span aria-hidden="true">↗</span></a>`).join("")}</div></section>`;
  }
  function platformPage(id) {
    const p = data.platforms.find((p) => p.id === id);
    if (id && !p) {
      main.innerHTML =
        '<div class="empty"><h1>Platform not found.</h1><p>Choose one of the available preparation guides.</p><a class="button" href="#view=platforms">All platforms →</a></div>';
      return;
    }
    if (!p) {
      main.innerHTML = `<p class="eyebrow">THE INTERVIEW BEYOND YOUR RESUME</p><h1>Prepare for the platform.<br><em>Keep your answers yours.</em></h1><p class="page-intro">Mercor, micro1 and the other platforms below use different screening formats. Find official guidance and practice the relevant skills with your own project examples.</p><div class="platform-disclosure"><strong>Original practice, grounded guidance.</strong> These are our rehearsal exercises, not actual or guaranteed platform questions. Format notes link to official sources; follow the instructions in your current invitation.</div><div class="platform-tools"><label for="platform-search">Find a platform or format<input id="platform-search" type="search" placeholder="Try micro1, coding or AI-work…" autocomplete="off"></label><p id="platform-count" role="status" aria-live="polite"></p></div><div id="platform-list" class="platform-grid"></div><p class="platform-footer">Official information checked 15 Sep 2026 · <a href="docs/PLATFORM_SOURCES.md">Sources and update notes</a></p>`;
      refreshPlatforms("");
      return;
    }
    const items = p.questionIds.map((id) => questionMap.get(id));
    document.title = `${p.name} interview preparation — InterviewPrep`;
    main.innerHTML = `<a class="back" href="#view=platforms">← All interview platforms</a><header class="platform-detail-heading"><span class="platform-monogram" aria-hidden="true">${esc(p.initial)}</span><div><p class="eyebrow">${esc(p.kind)}</p><h1>${esc(p.name)} interview preparation</h1></div></header><p class="page-intro">${esc(p.summary)}</p><div class="platform-detail-grid"><section class="revision-panel"><h2>What the official guide says</h2><p>${esc(p.format)}</p><div class="platform-source-links">${p.sources.map((s) => `<a href="${esc(s.url)}" target="_blank" rel="noopener noreferrer">${esc(s.label)} ↗</a>`).join("")}</div><p class="platform-date">Checked ${esc(p.reviewed)}</p><div class="platform-check"><strong>Check your current invitation</strong><p>${esc(p.check)}</p></div></section><section class="revision-panel platform-plan"><p class="section-kicker">YOUR PREPARATION PLAN</p><h2>Build a clear, flexible answer.</h2><ol>${p.steps.map((s) => `<li>${esc(s)}</li>`).join("")}</ol><div class="tags">${p.focus.map((s) => `<span class="tag topic">${esc(s)}</span>`).join("")}</div></section></div><div class="section-heading"><h2>Your ${esc(p.name)} practice round</h2><button class="button" data-action="practice-platform" data-platform="${esc(p.id)}">Practice ${items.length} questions →</button></div><p class="page-intro">An editorial selection of original exercises and existing project questions. These are not claimed to appear in a ${esc(p.name)} assessment. Practice here uses no microphone, camera or external interview service.</p><div class="question-list">${questionRows(items)}</div><p class="platform-footer"><a href="docs/PLATFORM_SOURCES.md">Preparation scope and source notes</a> · <a href="#view=platforms">Compare platforms</a></p>`;
  }
  function refreshPlatforms(search) {
    const terms = search
      .toLocaleLowerCase()
      .trim()
      .split(/\s+/)
      .filter(Boolean);
    const items = data.platforms.filter((p) =>
      terms.every((term) =>
        JSON.stringify([p.name, p.kind, p.summary, p.format, p.focus])
          .toLocaleLowerCase()
          .includes(term),
      ),
    );
    $("#platform-count").textContent =
      `${items.length} ${items.length === 1 ? "platform" : "platforms"}`;
    $("#platform-list").innerHTML = items.length
      ? items
          .map(
            (p) =>
              `<article class="platform-card"><div class="platform-card-top"><span class="platform-monogram" aria-hidden="true">${esc(p.initial)}</span><span class="tag topic">${esc(p.kind)}</span></div><h2><a href="#view=platforms&platform=${esc(p.id)}">${esc(p.name)}</a></h2><p>${esc(p.summary)}</p><div class="tags">${p.focus.map((s) => `<span class="tag">${esc(s)}</span>`).join("")}</div><div class="platform-card-bottom"><span>${p.questionIds.length} practice questions</span><a href="#view=platforms&platform=${esc(p.id)}" aria-label="Open ${esc(p.name)} preparation guide">Open guide →</a></div></article>`,
          )
          .join("")
      : '<div class="empty"><h2>No matching platforms.</h2><p>Try a name such as Mercor or a format such as coding.</p><button class="button secondary" data-action="clear-platforms">Show all platforms</button></div>';
  }
  function topicPage() {
    main.innerHTML = `<p class="eyebrow">CONNECT THE IDEAS</p><h1>Follow a topic.</h1><p class="page-intro">Move between foundations and your own projects. The same tradeoff often appears in more than one system.</p>${platformShortcuts()}<div class="topic-grid">${topics.map((t, i) => `<a class="topic-card" href="#view=library&topic=${encodeURIComponent(t)}"><span>${String(i + 1).padStart(2, "0")} / TOPIC</span><h2>${esc(t)}</h2><span>${data.questions.filter((q) => q.topic === t).length} questions ↗</span></a>`).join("")}</div>`;
  }
  function progressPage() {
    const practiced = data.questions.filter((q) => done(q.id));
    main.innerHTML = `<p class="eyebrow">SMALL SESSIONS ADD UP</p><h1>Make the answer yours.</h1><p class="page-intro">Practiced means you marked it after a rehearsal. It’s a record of your work, not an automatic assessment of mastery.</p><section class="revision-panel"><h2>${practiced.length} of ${data.questions.length} questions practiced</h2><div class="progress-track" role="progressbar" aria-label="Questions practiced" aria-valuenow="${practiced.length}" aria-valuemin="0" aria-valuemax="${data.questions.length}"><span style="width:${(100 * practiced.length) / data.questions.length}%"></span></div><p>${state.bookmarks.length} bookmarks · ${Object.values(state.notes).filter(Boolean).length} questions with notes</p><div class="actions"><button class="button" data-action="practice-unseen">Practice an unpracticed question →</button><button class="button secondary" data-action="export">Export revision</button></div></section><section class="revision-panel"><h2>Keep a copy of your progress.</h2><p>Bookmarks, practice marks and notes stay in this browser. They do not sync with GitHub or other devices. Export a backup before clearing browser data. Import merges known questions; imported notes replace notes for the same question.</p><label for="import" class="notes-label">Import an InterviewPrep revision file (.json, up to 2 MB)</label><input class="file-input" id="import" type="file" accept="application/json,.json"><p>${storageOK ? "Browser storage is available." : "Browser storage is unavailable. Export to preserve your current session."}</p></section><div class="section-heading"><h2>Your practiced questions</h2></div><div class="question-list">${practiced.length ? questionRows(practiced) : '<div class="empty"><h2>Your first rehearsal starts here.</h2><p>Open a question, say your answer aloud, and mark it practiced.</p><a class="button" href="#view=library">Choose a question →</a></div>'}</div>`;
  }
  const diagrams = {
    rag: {
      title: "HIERARCHICAL RETRIEVAL · CONCEPTUAL FLOW",
      steps: [
        ["Document tree", "sections → chunks"],
        ["Query + scores", "propagate relevance"],
        ["Beam + pruning", "select evidence"],
        ["Generator", "answer with context"],
      ],
      text: "Indexing produces a hierarchy. At query time, score and expand candidate branches, then pass selected evidence to the generator. Exact FH-RAG implementation was not available for verification.",
    },
    hqde: {
      title: "HQDE · TWO DISTINCT TRAINING MODES",
      steps: [
        ["Worker replicas", "PyTorch models"],
        ["Independent", "keep separate weights"],
        ["Prediction fusion", "combine logits"],
      ],
      text: "Alternative FedAvg path: workers train locally → send deltas → coordinator aggregates → server state returns to workers each epoch. This is not per-step DDP gradient synchronization.",
    },
    psychota: {
      title: "PSYCHOTA · TOKEN TO CONVERSATION",
      steps: [
        ["Tokens + speaker", "utterance encoder"],
        ["Turn attention", "windowed + causal"],
        ["BiGRU", "future context allowed"],
        ["Four task heads", "ego · transaction · stroke · life"],
      ],
      text: "Causal masking applies to the attention stage. The bidirectional GRU uses future turns in full-conversation processing, so the full architecture is not strictly causal.",
    },
    attention: {
      title: "ATTENTION · RETRIEVE AND MIX INFORMATION",
      steps: [
        ["Q × Kᵀ", "pairwise scores"],
        ["Scale + mask", "visibility rules"],
        ["Softmax", "weights over keys"],
        ["Weights × V", "weighted context"],
      ],
      text: "Q: n×dₖ · K: m×dₖ · V: m×dᵥ → output: n×dᵥ. For self-attention, n=m. The mask removes invalid positions before normalization.",
    },
    ensemble: {
      title: "STACKING · KEEP THE META SPLIT SEPARATE",
      steps: [
        ["Base training data", "fit diverse models"],
        ["Held-out meta data", "base predictions"],
        ["Combiner", "learn fusion"],
        ["Untouched test", "evaluate once"],
      ],
      text: "The combiner must learn from predictions on samples that did not train the base models. This prevents in-sample confidence from leaking into meta training.",
    },
  };
  function diagram(id) {
    const d = diagrams[id];
    if (!d) return "";
    return `<figure class="diagram"><figcaption>${esc(d.title)}</figcaption><div class="flow">${d.steps.map(([title, sub], i) => `${i ? '<span class="flow-arrow" aria-hidden="true">→</span>' : ""}<div class="flow-step">${esc(title)}<small>${esc(sub)}</small></div>`).join("")}</div><p>${esc(d.text)}</p></figure>`;
  }
  function answerPage(q, isPractice = false) {
    const shown = !isPractice || practice.revealed;
    const practiceHeader = isPractice
      ? `<div class="practice-bar"><p>RECALL ROUND · ${practice.index + 1} / ${practice.ids.length}<br><span style="font-size:10px">From your selected questions</span></p><div class="actions"><button class="button small" data-action="next">${practice.index + 1 === practice.ids.length ? "Finish round" : "Next question →"}</button><button class="button small" data-action="exit-practice">End practice</button></div></div>`
      : '<a href="#view=library" class="back" data-action="back-library">← Back to question bank</a>';
    main.innerHTML = `${practiceHeader}<article><header class="answer-heading">${tags(q)}<h1>${esc(q.title)}</h1><div class="actions">${shown ? `<button class="button" data-action="practiced" data-id="${q.id}" aria-pressed="${done(q.id)}">${done(q.id) ? "✓ Practiced · undo" : "Mark as practiced"}</button>` : ""}${bookmark(q)}<button class="button secondary" data-action="copy-link" data-id="${q.id}">Copy question link</button></div></header>${!shown ? '<div class="reveal"><p class="eyebrow" style="justify-content:center">TRY IT WITHOUT THE NOTES</p><h2>Say the answer out loud.</h2><p>Explain the idea, give one example, and name a tradeoff.</p><button class="button" data-action="reveal">Reveal the answer →</button></div>' : `<div class="answer-grid"><div class="answer-body"><section class="quick-answer"><h2>THE CONCISE ANSWER</h2><p>${esc(q.short)}</p></section><h2>The interview-ready answer</h2>${q.answer.map((p) => `<p>${esc(p)}</p>`).join("")}${diagram(q.diagram)}<section class="technical"><h2>Technical deep dive</h2><p>${esc(q.deep)}</p></section><div class="pitfall"><strong>DON’T MISS THIS</strong>${esc(q.pitfall)}</div><h2>Be ready for the follow-up</h2>${q.followups.map((f) => `<details class="followup"><summary>${esc(f.question)}</summary><p>${esc(f.answer)}</p></details>`).join("")}${q.originalQuestions?.length ? `<details class="source-alias"><summary>Original uploaded question wording (${q.originalQuestions.length})</summary><ul>${q.originalQuestions.map((t) => `<li>${esc(t)}</li>`).join("")}</ul></details>` : ""}</div><aside class="answer-side"><section class="side-note"><h2>THE EVIDENCE</h2><p>${esc(q.evidence)}</p>${q.sources.map((s) => `<a href="${esc(s.url)}" ${s.url.startsWith("https:") ? 'target="_blank" rel="noopener noreferrer"' : ""}>${esc(s.label)} ↗</a>`).join("")}</section><section><label class="notes-label" for="notes">Your version of the answer</label><textarea class="notes" id="notes" data-id="${q.id}" maxlength="10000" placeholder="Add your example, a real result, or a detail to revisit…">${esc(state.notes[q.id] || "")}</textarea><p class="notes-help">Saved on this browser as you type. Export a backup in My revision.</p></section></aside></div>`}</article>`;
    document.title = `${q.title} — InterviewPrep`;
  }
  function startPractice(items) {
    if (!items.length)
      return notify(
        "No questions match this selection. Clear a filter to start.",
      );
    const ids = items.map((q) => q.id);
    for (let i = ids.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [ids[i], ids[j]] = [ids[j], ids[i]];
    }
    practice = { ids, index: 0, revealed: false };
    if (location.hash === "#view=practice") route();
    else location.hash = "view=practice";
  }
  function route() {
    const p = params();
    const view = p.get("view") || "home";
    const qid = p.get("q");
    document.title = "InterviewPrep — The study desk";
    if (p.has("collection"))
      filters.collection = collectionMap.has(p.get("collection"))
        ? p.get("collection")
        : "";
    if (p.has("topic"))
      filters.topic = topics.includes(p.get("topic")) ? p.get("topic") : "";
    if (view === "saved") filters.status = "saved";
    if (qid) {
      const q = questionMap.get(qid);
      if (q) answerPage(q);
      else
        main.innerHTML =
          '<div class="empty"><h1>Question not found.</h1><p>This link may refer to an older question.</p><a class="button" href="#view=library">Open question bank</a></div>';
    } else if (view === "practice" && practice)
      answerPage(questionMap.get(practice.ids[practice.index]), true);
    else if (view === "practice") {
      main.innerHTML =
        '<div class="empty"><h1>Start a fresh practice round.</h1><p>Your notes and marks are saved. Practice order resets after a reload.</p><button class="button" data-action="practice-all">Start practice →</button></div>';
    } else if (view === "platforms") platformPage(p.get("platform"));
    else if (view === "collections") collectionPage();
    else if (view === "topics") topicPage();
    else if (view === "progress") progressPage();
    else if (view === "library" || view === "saved") library(view);
    else home();
    const labels = {
      home: "Study desk",
      library: "Question bank",
      collections: "Repositories",
      topics: "Topics",
      platforms: "AI interview platforms",
      saved: "Bookmarks",
      progress: "My revision",
      practice: "Practice",
    };
    $("#breadcrumb").textContent = qid
      ? "Question / Reading"
      : labels[view] || "Study desk";
    updateNav();
    window.scrollTo(0, 0);
  }
  main.addEventListener("input", (e) => {
    if (e.target.id === "platform-search") refreshPlatforms(e.target.value);
    if (e.target.id === "search") {
      filters.search = e.target.value;
      refreshResults();
    }
    if (e.target.id === "notes") {
      state.notes[e.target.dataset.id] = e.target.value;
      save();
    }
  });
  main.addEventListener("change", async (e) => {
    if (["collection", "topic", "difficulty", "status"].includes(e.target.id)) {
      filters[e.target.id] = e.target.value;
      refreshResults();
    }
    if (e.target.id === "import" && e.target.files[0]) {
      const file = e.target.files[0];
      try {
        if (file.size > 2 * 1024 * 1024) throw Error("The file exceeds 2 MB.");
        const incoming = validateState(JSON.parse(await file.text()));
        const known = (list) => list.filter((id) => questionMap.has(id));
        state.bookmarks = [
          ...new Set([...state.bookmarks, ...known(incoming.bookmarks)]),
        ];
        state.practiced = [
          ...new Set([...state.practiced, ...known(incoming.practiced)]),
        ];
        for (const [id, note] of Object.entries(incoming.notes))
          if (questionMap.has(id)) state.notes[id] = note;
        save();
        progressPage();
        notify(
          "Revision imported. Known questions merged; unknown IDs skipped.",
        );
      } catch {
        notify(
          "Could not import. Choose a valid InterviewPrep revision JSON file under 2 MB.",
        );
      }
      e.target.value = "";
    }
  });
  main.addEventListener("click", async (e) => {
    const b = e.target.closest("button,[data-action]");
    if (!b) return;
    if (b.dataset.bookmark) {
      const id = b.dataset.bookmark;
      const exists = state.bookmarks.includes(id);
      state.bookmarks = exists
        ? state.bookmarks.filter((x) => x !== id)
        : [...state.bookmarks, id];
      save();
      if ($("#results")) refreshResults();
      else if (params().get("view") === "progress") progressPage();
      else {
        b.setAttribute("aria-pressed", String(!exists));
        b.textContent = exists ? "◇" : "◆";
        b.setAttribute(
          "aria-label",
          `${exists ? "Bookmark" : "Remove bookmark for"} ${questionMap.get(id).title}`,
        );
      }
      notify(exists ? "Bookmark removed." : "Question bookmarked.");
      return;
    }
    const action = b.dataset.action;
    if (action === "clear-platforms") {
      $("#platform-search").value = "";
      refreshPlatforms("");
      $("#platform-search").focus();
    }
    if (action === "practice-platform") {
      const platform = data.platforms.find((p) => p.id === b.dataset.platform);
      if (platform)
        startPractice(platform.questionIds.map((id) => questionMap.get(id)));
    }
    if (action === "clear") {
      filters = {
        search: "",
        collection: "",
        topic: "",
        difficulty: "",
        status: "",
      };
      if (params().get("view") === "saved") location.hash = "view=library";
      else {
        const wasHome = !params().get("view");
        wasHome ? home() : library("library");
      }
    }
    if (action === "practice") startPractice(filtered());
    if (action === "practice-all") startPractice(data.questions);
    if (action === "practice-unseen")
      startPractice(data.questions.filter((q) => !done(q.id)));
    if (action === "reveal") {
      practice.revealed = true;
      answerPage(questionMap.get(practice.ids[practice.index]), true);
    }
    if (action === "next") {
      if (practice.index + 1 === practice.ids.length) {
        practice = null;
        location.hash = "view=progress";
        notify(
          "Practice round finished. Your practice marks and notes are saved.",
        );
      } else {
        practice.index++;
        practice.revealed = false;
        answerPage(questionMap.get(practice.ids[practice.index]), true);
        window.scrollTo(0, 0);
      }
    }
    if (action === "exit-practice") {
      practice = null;
      location.hash = "view=library";
    }
    if (action === "practiced") {
      const id = b.dataset.id;
      state.practiced = done(id)
        ? state.practiced.filter((x) => x !== id)
        : [...state.practiced, id];
      save();
      b.setAttribute("aria-pressed", String(done(id)));
      b.textContent = done(id) ? "✓ Practiced · undo" : "Mark as practiced";
      notify(done(id) ? "Practice recorded." : "Practice mark removed.");
    }
    if (action === "copy-link") {
      const url = new URL(location.href);
      url.hash = "q=" + encodeURIComponent(b.dataset.id);
      try {
        await navigator.clipboard.writeText(url.href);
        notify("Question link copied.");
      } catch {
        notify("Copy this question URL from the address bar.");
        location.hash = url.hash;
      }
    }
    if (action === "export") {
      const blob = new Blob([JSON.stringify(state, null, 2)], {
        type: "application/json",
      });
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = "interviewprep-revision.json";
      a.click();
      setTimeout(() => URL.revokeObjectURL(url), 1000);
      notify("Revision backup exported.");
    }
  });
  document.addEventListener("keydown", (e) => {
    if (
      e.key === "/" &&
      !e.ctrlKey &&
      !e.metaKey &&
      !e.altKey &&
      !["INPUT", "TEXTAREA", "SELECT"].includes(
        document.activeElement.tagName,
      ) &&
      $("#search")
    ) {
      e.preventDefault();
      $("#search").focus();
    }
  });
  document.querySelector("nav").addEventListener("click", (e) => {
    const a = e.target.closest("a");
    if (!a) return;
    filters = {
      search: "",
      collection: "",
      topic: "",
      difficulty: "",
      status: "",
    };
    if (
      a.hash === location.hash ||
      (!location.hash && a.getAttribute("href") === "#")
    )
      setTimeout(route, 0);
  });
  window.addEventListener("hashchange", () => {
    if (data) {
      route();
      main.focus({ preventScroll: true });
    }
  });
  async function init() {
    try {
      const response = await fetch("data/content.json");
      if (!response.ok) throw Error("Content unavailable");
      data = await response.json();
      collectionMap = new Map(data.collections.map((c) => [c.id, c]));
      questionMap = new Map(data.questions.map((q) => [q.id, q]));
      topics = [...new Set(data.questions.map((q) => q.topic))].sort();
      data.questions.forEach(
        (q) =>
          (q.searchText = JSON.stringify([
            q.title,
            q.short,
            q.answer,
            q.deep,
            q.followups,
            q.pitfall,
            q.originalQuestions,
            q.topic,
            collectionMap.get(q.collection).name,
            data.platforms
              .filter((p) => p.questionIds.includes(q.id))
              .map((p) => p.name),
          ]).toLocaleLowerCase()),
      );
      state.bookmarks = state.bookmarks.filter((id) => questionMap.has(id));
      state.practiced = state.practiced.filter((id) => questionMap.has(id));
      state.notes = Object.fromEntries(
        Object.entries(state.notes).filter(([id]) => questionMap.has(id)),
      );
      route();
      if (!storageOK)
        notify(
          "Saved revision could not be loaded. You can still study and export this session.",
          true,
        );
    } catch {
      main.innerHTML =
        '<div class="empty"><h1>The question bank could not load.</h1><p>Use a local HTTP server or GitHub Pages to open the site, then reload.</p><button class="button" onclick="location.reload()">Try again</button> <a href="data/content.json">Read the content file</a></div>';
    }
  }
  init();
})();
