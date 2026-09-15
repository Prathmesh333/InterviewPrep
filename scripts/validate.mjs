import fs from "node:fs";
import assert from "node:assert/strict";
const data = JSON.parse(
  fs.readFileSync(new URL("../data/content.json", import.meta.url), "utf8"),
);
const mapping = JSON.parse(
  fs.readFileSync(
    new URL("../data/source-questions.json", import.meta.url),
    "utf8",
  ),
);
const ids = new Set(),
  collections = new Set(data.collections.map((c) => c.id));
assert.equal(
  collections.size,
  data.collections.length,
  "Collection IDs must be unique",
);
for (const q of data.questions) {
  assert.match(q.id, /^[a-z0-9-]+$/);
  assert(!ids.has(q.id), `Duplicate ${q.id}`);
  ids.add(q.id);
  assert(collections.has(q.collection), `Unknown collection: ${q.id}`);
  for (const key of [
    "title",
    "topic",
    "difficulty",
    "short",
    "deep",
    "pitfall",
    "evidence",
  ])
    assert(
      typeof q[key] === "string" && q[key].trim().length > 3,
      `${q.id}: ${key}`,
    );
  assert(["Core", "Deep dive"].includes(q.difficulty));
  assert(
    q.answer.length >= 2 && q.answer.every((p) => p.length > 30),
    `${q.id}: incomplete answer`,
  );
  assert(
    q.followups.length >= 2 &&
      q.followups.every((f) => f.question.length > 5 && f.answer.length > 25),
    `${q.id}: incomplete followups`,
  );
  assert(q.sources.length > 0, `${q.id}: missing sources`);
  for (const source of q.sources) {
    assert(source.label.length > 0);
    if (source.url.startsWith("https://")) {
      const u = new URL(source.url);
      assert(u.hostname);
    } else {
      assert(!source.url.includes(".."));
      assert(
        fs.existsSync(new URL("../" + source.url, import.meta.url)),
        `Missing local source ${source.url}`,
      );
    }
  }
  if (q.diagram)
    assert(
      ["rag", "hqde", "psychota", "attention", "ensemble"].includes(q.diagram),
    );
  assert(
    !JSON.stringify(q).includes("Read more"),
    `${q.id}: truncated source leaked`,
  );
}
assert.equal(mapping.length, 60, "Preserve every uploaded question occurrence");
mapping.forEach((m, i) => {
  assert.equal(m.number, i + 1);
  assert(ids.has(m.answerId));
  assert(
    data.questions
      .find((q) => q.id === m.answerId)
      .originalQuestions.includes(m.question),
  );
});
assert.equal(new Set(mapping.map((m) => m.answerId)).size, 40);
for (const id of ["fh-story", "hqde-story", "psychota-story"])
  assert(ids.has(id));
for (const c of collections)
  assert(
    data.questions.some((q) => q.collection === c),
    `Empty collection: ${c}`,
  );
assert.equal(data.repositories.length, 35);
for (const file of [
  "index.html",
  "assets/styles.css",
  "assets/app.js",
  "assets/favicon.svg",
  "docs/MASTER_SPEC.md",
  "docs/SOURCE_AUDIT.md",
])
  assert(fs.existsSync(new URL("../" + file, import.meta.url)));
console.log(
  `PASS: ${ids.size} complete questions, ${collections.size} collections, all 60 uploaded questions mapped to 40 answers, 35 repositories inventoried.`,
);
