import process from 'node:process';
import { r as runCli, e as exclude, d as prompts, f as parseNun } from './shared/ni.4b98e4da.mjs';
import { F as Fzf } from './shared/ni.db737f77.mjs';
import { g as getPackageJSON } from './shared/ni.a51c46c1.mjs';
import 'node:fs';
import 'node:path';
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

runCli(async (agent, args, ctx) => {
  const isInteractive = !args.length && !ctx?.programmatic;
  if (isInteractive || args[0] === "-m") {
    const pkg = getPackageJSON(ctx);
    const allDependencies = { ...pkg.dependencies, ...pkg.devDependencies };
    const raw = Object.entries(allDependencies);
    if (!raw.length) {
      console.error("No dependencies found");
      return;
    }
    const fzf = new Fzf(raw, {
      selector: ([dep, version]) => `${dep} ${version}`,
      casing: "case-insensitive"
    });
    const choices = raw.map(([dependency, version]) => ({
      title: dependency,
      value: dependency,
      description: version
    }));
    const isMultiple = args[0] === "-m";
    const type = isMultiple ? "autocompleteMultiselect" : "autocomplete";
    if (isMultiple)
      args = exclude(args, "-m");
    try {
      const { depsToRemove } = await prompts({
        type,
        name: "depsToRemove",
        choices,
        instructions: false,
        message: `remove ${isMultiple ? "dependencies" : "dependency"}`,
        async suggest(input, choices2) {
          const results = fzf.find(input);
          return results.map((r) => choices2.find((c) => c.value === r.item[0]));
        }
      });
      if (!depsToRemove) {
        process.exitCode = 1;
        return;
      }
      const isSingleDependency = typeof depsToRemove === "string";
      if (isSingleDependency)
        args.push(depsToRemove);
      else
        args.push(...depsToRemove);
    } catch {
      process.exit(1);
    }
  }
  return parseNun(agent, args);
});
