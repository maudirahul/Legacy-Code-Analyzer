const path = require("path");

/*
  Builds an internal-only dependency graph from project analysis.
   Nodes: internal JS files
   Edges: static import relationships
*/
function buildDependencyGraph(project) {
  const graph = {
    node: [],
    edges: [],
  };

  if (!project?.files || !project?.analysis?.files) {
    return graph;
  }

  //fast lookup set of internal JS files
  const internalFiles = new Set(
    project.files
      .filter(
        (f) => f.isCode && f.language === "javascript" && f.type === "file",
      )
      .map((f) => f.path),
  );

  graph.node = Array.from(internalFiles);

  //For each analyzed file
  for (const [filePath, analysis] of Object.entries(project.analysis.files)) {
    if (!analysis.imports || !internalFiles.has(filePath)) continue;

    const fromDir = path.dirname(filePath);

    for (const importPath of analysis.imports) {
      //Ignore external packages
      if (!importPath.startsWith("./") && !importPath.startsWith("../")) {
        continue;
      }
      //Try resolving import to internal file
      const possibleTargets = [
        path.join(fromDir, importPath + ".js"),
        path.join(fromDir, importPath + ".jsx"),
        path.join(fromDir, importPath),
      ].map((p) => p.replace(/\\/g, "/"));

      const resolvedTarget = possibleTargets.find((p) => internalFiles.has(p));

      if (resolvedTarget) {
        graph.edges.push({
          from: filePath,
          to: resolvedTarget,
          type: "import",
        });
      }
    }
  }

  return graph;
}

module.exports = {
  buildDependencyGraph,
};
