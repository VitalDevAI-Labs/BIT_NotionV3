import { existsSync, readFileSync, readdirSync } from 'node:fs';
import { join, resolve } from 'node:path';

const root = resolve(import.meta.dirname, '..', '..');
const contextDir = join(root, '.vital_context');
const errors = [];
const warnings = [];

function read(relativePath) {
  const path = join(root, relativePath);
  if (!existsSync(path)) {
    errors.push(`Missing required file: ${relativePath}`);
    return '';
  }
  return readFileSync(path, 'utf8');
}

const requiredFiles = [
  'AGENTS.md', 'claude.md', '.vital_context/CONTEXT.md',
  '.vital_context/GOVERNANCE.md', '.vital_context/CURRENT_PROJECT.md',
  '.vital_context/state.json', '.vital_context/alignment.md',
  '.vital_context/PRD.md', '.vital_context/playbook.md',
  '.vital_context/architecture.md', '.vital_context/bugs.md',
  '.vital_context/backlog.md', '.vital_context/tasks/index.md',
  '.vital_context/tasks/TEMPLATE.md', '.vital_context/agents/generic.md',
  '.vital_context/agents/claude.md', '.vital_context/agents/codex.md'
];
for (const file of requiredFiles) read(file);

let state;
try {
  state = JSON.parse(read('.vital_context/state.json'));
} catch (error) {
  errors.push(`state.json is invalid JSON: ${error.message}`);
}

const validTaskStates = new Set(['proposed', 'ready', 'active', 'implemented', 'verified', 'accepted', 'blocked', 'cancelled', 'done']);

if (state) {
  for (const field of ['schemaVersion', 'frameworkVersion', 'project', 'projectVersion', 'currentStage', 'stageStatus', 'activeTasks', 'lastReconciled']) {
    if (state[field] === undefined) errors.push(`state.json missing field: ${field}`);
  }
  if (!Array.isArray(state.activeTasks)) {
    errors.push('state.json activeTasks must be an array');
  } else {
    const context = read('.vital_context/CONTEXT.md');
    const index = read('.vital_context/tasks/index.md');
    const taskFiles = readdirSync(join(contextDir, 'tasks'));
    for (const taskId of state.activeTasks) {
      const filename = taskFiles.find((name) => name.startsWith(`${taskId}-`) && name.endsWith('.md'));
      if (!filename) {
        errors.push(`Active task has no task file: ${taskId}`);
        continue;
      }
      const task = read(`.vital_context/tasks/${filename}`);
      const status = task.match(/^- \*\*Status:\*\*\s*([^\r\n]+)/m)?.[1]?.trim();
      if (!status) errors.push(`${filename} has no task status`);
      else if (!validTaskStates.has(status)) errors.push(`${filename} has invalid status: ${status}`);
      else if (!['active', 'implemented', 'verified', 'blocked'].includes(status)) errors.push(`state.json lists ${taskId} as active but its task status is ${status}`);
      if (!context.includes(taskId)) errors.push(`CONTEXT.md does not list active task ${taskId}`);
      if (!index.includes(taskId)) errors.push(`tasks/index.md does not list active task ${taskId}`);
    }
  }
}

const taskFiles = readdirSync(join(contextDir, 'tasks')).filter((name) => /^task-\d{8}-\d{3}-.+\.md$/.test(name));
for (const filename of taskFiles) {
  const task = read(`.vital_context/tasks/${filename}`);
  const status = task.match(/^- \*\*Status:\*\*\s*([^\r\n]+)/m)?.[1]?.trim();
  if (status === 'accepted') {
    for (const heading of ['## Acceptance Criteria', '## Verification', '## Context Reconciliation', '## Files Changed', '## Outcome']) {
      if (!task.includes(heading)) errors.push(`${filename} is accepted but missing ${heading}`);
    }
    if (/- \[ \]/.test(task)) errors.push(`${filename} is accepted but contains unchecked checklist items`);
  }
}

if (/single source of truth/i.test(read('claude.md'))) warnings.push('Root claude.md should remain a pointer, not claim independent SOT ownership');

if (errors.length) {
  console.error('Vital Context validation failed:');
  for (const error of errors) console.error(`- ERROR: ${error}`);
}
if (warnings.length) {
  console.warn('Vital Context warnings:');
  for (const warning of warnings) console.warn(`- WARN: ${warning}`);
}
if (!errors.length) console.log(`Vital Context valid (${taskFiles.length} task records checked).`);
process.exitCode = errors.length ? 1 : 0;
