const path = require("path");
const { parseJavaScriptFile } = require("../utils/astParser");

/*
  Runs AST analysis on a project's JavaScript files.
  - Parses only files marked as JavaScript
  - Skips files that fail parsing
  - Returns summarized analysis data
*/
async function analyzeProject(project) {
  const analysis = {
    files: {},
  };

  if (!project?.files || !project.workspacePath) {
    return analysis;
  }

  for (const file of project.files) {
    // Only analyze JavaScript source files
    if (!file.isCode || file.language !== "javascript") {
      continue;
    }

    const absoluteFilePath = path.join(project.workspacePath, file.path);

    try {
      const result = parseJavaScriptFile(absoluteFilePath);

      analysis.files[file.path] = {
        imports: result.imports,
        exports: result.exports,
        functions: result.functions,
        classes: result.classes,
      };
    } catch (error) {
      continue;
    }
  }

  return analysis;
}

module.exports = {
  analyzeProject,
};
