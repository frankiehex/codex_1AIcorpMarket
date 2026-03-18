import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';

const dashboardPath = path.resolve(process.cwd(), 'projectos/apps/web/server.mjs');

test('dashboard exposes project intake and key modules', () => {
  const source = fs.readFileSync(dashboardPath, 'utf8');
  assert.match(source, /Project Intake/);
  assert.match(source, /Content engine/);
  assert.match(source, /CRM inbox \+ alerts/);
});
