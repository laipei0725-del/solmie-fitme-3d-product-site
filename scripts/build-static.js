const fs = require("fs");
const path = require("path");

const root = path.resolve(__dirname, "..");
const outDir = path.join(root, "dist");
const serverDir = path.join(outDir, "server");
const entries = ["index.html", "styles.css", "script.js", "assets", ".openai"];

fs.rmSync(outDir, { recursive: true, force: true });
fs.mkdirSync(outDir, { recursive: true });

for (const entry of entries) {
  fs.cpSync(path.join(root, entry), path.join(outDir, entry), {
    recursive: true,
    filter: (source) => !source.endsWith(".DS_Store"),
  });
}

fs.mkdirSync(serverDir, { recursive: true });
fs.writeFileSync(
  path.join(serverDir, "index.js"),
  `export default {
  async fetch(request, env) {
    const url = new URL(request.url);

    if (url.pathname === "/") {
      url.pathname = "/index.html";
      return env.ASSETS.fetch(new Request(url, request));
    }

    return env.ASSETS.fetch(request);
  },
};
`,
);
