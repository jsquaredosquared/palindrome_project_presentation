import { r as runCli, a as parseNi } from './shared/ni.4b98e4da.mjs';
import 'node:fs';
import 'node:path';
import 'node:process';
import 'readline';
import 'events';
import 'os';
import 'tty';
import 'node:module';
import 'child_process';
import 'path';
import 'process';
import 'stream';
import 'node:os';
import 'fs';
import 'fs/promises';
import 'node:fs/promises';

runCli(
  (agent, _, hasLock) => parseNi(agent, ["--frozen-if-present"], hasLock),
  { autoInstall: true }
);
