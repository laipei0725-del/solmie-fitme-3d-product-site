const fs = require("fs");
const path = require("path");

const root = path.resolve(__dirname, "..");
const outDir = path.join(root, "dist");
const entries = ["index.html", "styles.css", "script.js", "assets", ".openai"];

fs.rmSync(outDir, { recursive: true, force: true });
fs.mkdirSync(outDir, { recursive: true });

for (const entry of entries) {
  fs.cpSync(path.join(root, entry), path.join(outDir, entry), {
    recursive: true,
    filter: (source) => !source.endsWith(".DS_Store"),
  });
}
