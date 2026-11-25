import { mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { fileURLToPath } from "node:url";

const text = "Before we escalate this to engineering, could you please confirm the device is actually plugged into a wall and not just resting near an outlet for moral support?";
if (Array.from(text).length < 1 || Array.from(text).length > 199 || /[\r\n]/.test(text)) {
  throw new Error("Entry must be 1 to 199 characters on a single line");
}

const outputDirectory = fileURLToPath(new URL("/output/", import.meta.url));
const outputFile = fileURLToPath(new URL("entry.txt", new URL("/output/", import.meta.url)));
const expected = Buffer.from(text + "\n", "utf8");

mkdirSync(outputDirectory, { recursive: true });
writeFileSync(outputFile, expected);
if (!readFileSync(outputFile).equals(expected)) {
  throw new Error("Written entry does not match the expected bytes");
}
