import { mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { fileURLToPath } from "node:url";

const line = "Before we escalate this to engineering, could you please confirm the device is actually plugged into a wall and not just resting near an outlet for moral support?";
const outputDirectory = new URL("file:///output/");
const outputFile = new URL("entry.txt", outputDirectory);
const expected = `${line}\n`;

const characterCount = Array.from(line).length;
if (characterCount < 1 || characterCount > 199 || /[\r\n\u2028\u2029]/.test(line)) {
  throw new Error("Entry does not satisfy the text gate");
}

mkdirSync(fileURLToPath(outputDirectory), { recursive: true });
writeFileSync(fileURLToPath(outputFile), expected, "utf8");
if (!readFileSync(fileURLToPath(outputFile)).equals(Buffer.from(expected, "utf8"))) {
  throw new Error("Written entry does not match expected bytes");
}
