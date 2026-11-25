// Monday, Reviewed in One Line — entry program.
// Writes a single-line review of my own Monday to /output/entry.txt.
// The grader runs this with Node 22 and MAKEFUN_OUTPUT_DIR set.
import { mkdirSync, writeFileSync, chmodSync } from "node:fs";
import { join } from "node:path";

// The review, built from its three beats so each beat stays visible:
// a rating (it is a review), the day's concrete toll, then the twist.
function buildReview(): string {
  const rating = "Monday, one star:";
  const toll = "nine meetings, zero decisions,";
  const twist =
    "and an inbox that sent 'per my last email' before I'd even opened it.";
  return [rating, toll, twist].join(" ");
}

function main(): void {
  const outDir = process.env.MAKEFUN_OUTPUT_DIR ?? "output";
  mkdirSync(outDir, { recursive: true });
  const target = join(outDir, "entry.txt");
  const text = buildReview().trim();
  if (text.length < 1 || text.length > 200) {
    throw new Error(`review must be 1-200 characters, got ${text.length}`);
  }
  if (text.includes("\n")) {
    throw new Error("review must be a single line");
  }
  writeFileSync(target, text, "utf8");
  chmodSync(target, 0o644);
}

main();
