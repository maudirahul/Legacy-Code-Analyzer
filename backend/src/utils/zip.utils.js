const fs = require("fs");
const unzipper = require("unzipper");

exports.extractZip = async (zipPath, workspacePath) => {
  return new Promise((resolve, reject) => {
    const readStream = fs.createReadStream(zipPath);

    readStream
      .pipe(unzipper.Extract({ path: workspacePath }))
      .on("finish", () => {
        console.log("✅ ZIP extraction finished");
        resolve();
      })
      .on("error", (err) => {
        console.error("❌ ZIP extraction error:", err);
        reject(err);
      });
  });
};
