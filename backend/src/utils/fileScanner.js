const fs = require("fs");
const path = require("path");

const IGNORE_DIRS = [
  "node_modules",
  ".git",
  "dist",
  "build",
  ".next",
  ".cache",
];

const IGNORE_EXTENSIONS = [
  "png",
  "jpg",
  "jpeg",
  "gif",
  "svg",
  "mp4",
  "mp3",
  "zip",
  "rar",
  "exe",
  "dll",
  "pdf",
];

const CODE_EXTENSIONS = {
  js: "javascript",
  jsx: "javascript",
  ts: "typescript",
  tsx: "typescript",
  py: "python",
  java: "java",
  go: "go",
};

function scanDirectory(basePath, currentPath = "") {
  const fullPath = path.join(basePath, currentPath);
  const entries = fs.readdirSync(fullPath, { withFileTypes: true });

  let results = [];

  for (const entry of entries) {
    if (IGNORE_DIRS.includes(entry.name)) continue;

    const relativePath = path.join(currentPath, entry.name).replace(/\\/g, "/");

    const absolutePath = path.join(basePath, relativePath);

    if (entry.isDirectory()) {
      results.push({
        path: relativePath,
        type: "folder",
      });

      results = results.concat(scanDirectory(basePath, relativePath));
    } else {
      const ext = path.extname(entry.name).replace(".", "").toLowerCase();
      if (IGNORE_EXTENSIONS.includes(ext)) continue;

      const stats = fs.statSync(absolutePath);
      const language = CODE_EXTENSIONS[ext] || null;

      results.push({
        path: relativePath,
        type: "file",
        extension: ext,
        size: stats.size,
        isCode: Boolean(language),
        language,
      });
    }
  }

  return results;
}

module.exports = { scanDirectory };
