'use strict';

const index = require('./shared/ni.42d614bb.cjs');
require('node:fs');
require('node:path');
require('node:process');
require('readline');
require('events');
require('os');
require('tty');
require('node:module');
require('child_process');
require('path');
require('process');
require('stream');
require('node:os');
require('fs');
require('fs/promises');
require('node:fs/promises');

index.runCli(
  (agent, _, hasLock) => index.parseNi(agent, ["--frozen-if-present"], hasLock),
  { autoInstall: true }
);
