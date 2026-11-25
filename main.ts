// The 3 AM Excuse — make.fun entry.
//
// One line, under 200 characters, in the voice of a hardware wallet
// refusing to sign a transaction at 3 AM. Wallet personality, reason and
// joke in one breath: it is a vault, not a nightclub; the PIN pad is
// closed; and the owner may return at noon — with coffee, and a token
// they can actually pronounce.
import { mkdirSync, readdirSync, rmSync, writeFileSync } from "node:fs";
import { join } from "node:path";

// SETUP: the refusal — a vault, not a nightclub, at 3 AM.
const SETUP =
  "It's 3 AM. I'm a hardware wallet, not a nightclub. You want me to sign a contract you haven't read, half asleep. ";

// PUNCH: the terms — come back at noon, with coffee, and a pronounceable token.
const PUNCH =
  "My PIN pad is closed. Come back at noon, with coffee and a token you can pronounce.";

// The entry is the two parts joined: one line, refusal earning the terms.
const TEXT = SETUP + PUNCH;

function clearDir(dir: string): void {
  // Clear only the directory's contents, never the directory itself:
  // the grader runs on a read-only filesystem whose parent is not writable.
  for (const f of readdirSync(dir)) {
    rmSync(join(dir, f), { force: true, recursive: true });
  }
}

function main(): void {
  // Gate: 1 to 200 characters, never only whitespace.
  if (TEXT.length < 1 || TEXT.length > 200) {
    throw new Error(`entry is ${TEXT.length} chars, gate is 1-200`);
  }
  if (!TEXT.trim()) throw new Error("entry is only whitespace");
  const outDir = "/output";
  mkdirSync(outDir, { recursive: true });
  clearDir(outDir);
  writeFileSync(join(outDir, "entry.txt"), TEXT, "utf8");
}

main();
