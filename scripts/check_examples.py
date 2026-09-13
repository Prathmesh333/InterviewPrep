"""Validate embedded SQL fixtures and safe, self-contained standard-library examples."""
import json
import pathlib
import sqlite3
import ast

root = pathlib.Path(__file__).resolve().parents[1]
manifest = json.loads((root / 'data/manifest.json').read_text(encoding='utf-8'))
questions = [q for name in manifest for q in json.loads((root / 'data' / name).read_text(encoding='utf-8'))]
sql_count = python_count = syntax_count = 0
for q in questions:
    if q.get('exercise'):
        with sqlite3.connect(':memory:') as db:
            db.executescript(q['exercise']['schema'])
            actual = [list(row) for row in db.execute(q['code']['text'])]
            assert actual == q['exercise']['expected'], (q['id'], actual)
        sql_count += 1
    if q.get('code', {}).get('language') == 'python':
        code = q['code']['text']
        ast.parse(code)
        syntax_count += 1
        if 'import ray' not in code and 'import torch' not in code:
            exec(compile(code, q['id'], 'exec'), {})
            python_count += 1
print(f'Passed {sql_count} SQL fixtures, {python_count} standard-library Python examples, {syntax_count} Python syntax checks.')
