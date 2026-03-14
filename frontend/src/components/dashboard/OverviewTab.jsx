import { useMemo } from "react";

const OverviewTab = ({ graphData }) => {
  // --- Calculate Overview Stats automatically from the AST Data ---
  const overviewStats = useMemo(() => {
    if (!graphData || !graphData.node || !graphData.edges) return null;

    const nodes = graphData.node;
    const edges = graphData.edges;

    // 1. Quick Stats
    const totalFiles = nodes.length;
    const totalDependencies = edges.length;
    const backendFiles = nodes.filter((n) => n.startsWith("backend")).length;
    const backendPercent = Math.round((backendFiles / totalFiles) * 100) || 0;
    const frontendPercent = 100 - backendPercent;

    // 2. Hotspots
    const inDegree = {};
    nodes.forEach((n) => (inDegree[n] = 0)); 
    edges.forEach((e) => {
      if (inDegree[e.to] !== undefined) inDegree[e.to]++; 
    });

    const hotspots = Object.entries(inDegree)
      .sort((a, b) => b[1] - a[1]) 
      .slice(0, 4)
      .map(([id, count]) => ({
        id,
        name: id.split("/").pop(),
        count,
        isBackend: id.startsWith("backend"),
      }));

    // 3. Tech Stack Detection
    const techStack = new Set();
    
    // Normalize all paths to lowercase for easier matching
    const filePaths = nodes.map(n => n.toLowerCase());

    // --- Frontend Frameworks ---
    if (filePaths.some(n => n.endsWith('.jsx') || n.endsWith('.tsx') || n.includes('/components/') || n.includes('/hooks/'))) {
      techStack.add("React");
    }
    // if (filePaths.some(n => n.includes('next.config') || n.includes('/app/layout') || n.includes('/pages/'))) {
    //   techStack.add("Next.js");
    // }
    if (filePaths.some(n => n.endsWith('.vue') || n.includes('nuxt.config'))) {
      techStack.add("Vue.js");
    }
    if (filePaths.some(n => n.includes('.component.ts') || n.includes('angular.json'))) {
      techStack.add("Angular");
    }

    // --- Backend & APIs ---
    if (filePaths.some(n => n.includes('server.js') || n.includes('app.js') || n.includes('/routes/') || n.includes('/controllers/'))) {
      techStack.add("Node.js / Express");
    }
    if (filePaths.some(n => n.includes('/graphql/') || n.includes('resolvers') || n.endsWith('.graphql'))) {
      techStack.add("GraphQL");
    }

    // --- Databases & ORMs ---
    if (filePaths.some(n => n.includes('/models/') || n.includes('/schemas/'))) {
      techStack.add("MongoDB / Mongoose"); 
    }
    if (filePaths.some(n => n.includes('prisma'))) {
      techStack.add("Prisma");
    }
    if (filePaths.some(n => n.includes('/migrations/') || n.includes('sequelize'))) {
      techStack.add("SQL / Sequelize");
    }

    // --- Tooling & Languages ---
    if (filePaths.some(n => n.endsWith('.ts') || n.endsWith('.tsx') || n.includes('tsconfig'))) {
      techStack.add("TypeScript");
    }
    if (filePaths.some(n => n.includes('vite.config'))) {
      techStack.add("Vite");
    }
    if (filePaths.some(n => n.includes('webpack.config'))) {
      techStack.add("Webpack");
    }
    if (filePaths.some(n => n.includes('tailwind.config') || n.includes('postcss.config'))) {
      techStack.add("Tailwind CSS");
    }
    
    // --- State Management & Testing ---
    if (filePaths.some(n => n.includes('/store/') || n.includes('/slices/') || n.includes('/reducers/'))) {
      techStack.add("Redux");
    }
    if (filePaths.some(n => n.includes('jest.config') || n.includes('.test.') || n.includes('.spec.'))) {
      techStack.add("Jest / Testing");
    }

    return {
      totalFiles,
      totalDependencies,
      backendPercent,
      frontendPercent,
      hotspots,
      techStack: Array.from(techStack),
    };
  }, [graphData]);

  return (
    <div className="p-8 h-full overflow-y-auto no-scrollbar animate-in fade-in duration-300">
      <div className="max-w-5xl mx-auto space-y-8">
        <div>
          <h3 className="text-2xl font-bold text-white tracking-tight mb-1">
            Project Overview
          </h3>
          <p className="text-slate-400 text-sm">
            Automated structural analysis and codebase metrics.
          </p>
        </div>

        {!overviewStats ? (
          <div className="h-32 flex items-center justify-center border border-white/10 rounded-xl bg-white/5 animate-pulse">
            <span className="text-slate-500 text-sm">
              Analyzing project structure...
            </span>
          </div>
        ) : (
          <>
            {/* 1. Tech Stack Badges */}
            <div className="flex flex-wrap gap-2">
              {overviewStats.techStack.map((tech) => (
                <span
                  key={tech}
                  className="px-3 py-1.5 bg-indigo-500/10 border border-indigo-500/20 text-indigo-300 text-xs font-semibold rounded-md shadow-[inset_0_0_10px_rgba(99,102,241,0.05)]"
                >
                  {tech}
                </span>
              ))}
            </div>

            {/* 2. Quick Stats Grid */}
            <div className="grid grid-cols-3 gap-6">
              <div className="bg-[#0a0a0c] p-6 rounded-xl border border-white/10 shadow-lg relative overflow-hidden">
                <div className="absolute top-0 right-0 p-4 opacity-10">
                  <svg
                    className="w-12 h-12"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M8 7v8a2 2 0 002 2h6M8 7V5a2 2 0 012-2h4.586a1 1 0 01.707.293l4.414 4.414a1 1 0 01.293.707V15a2 2 0 01-2 2h-2M8 7H6a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2v-2"
                    />
                  </svg>
                </div>
                <h4 className="text-slate-500 text-xs font-bold uppercase tracking-wider mb-2">
                  Total Modules
                </h4>
                <p className="text-4xl font-bold text-white">
                  {overviewStats.totalFiles}
                </p>
              </div>

              <div className="bg-[#0a0a0c] p-6 rounded-xl border border-white/10 shadow-lg relative overflow-hidden">
                <div className="absolute top-0 right-0 p-4 opacity-10">
                  <svg
                    className="w-12 h-12"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1"
                    />
                  </svg>
                </div>
                <h4 className="text-slate-500 text-xs font-bold uppercase tracking-wider mb-2">
                  Dependencies
                </h4>
                <p className="text-4xl font-bold text-white">
                  {overviewStats.totalDependencies}
                </p>
              </div>

              <div className="bg-[#0a0a0c] p-6 rounded-xl border border-white/10 shadow-lg relative overflow-hidden flex flex-col justify-center">
                <h4 className="text-slate-500 text-xs font-bold uppercase tracking-wider mb-3">
                  Codebase Split
                </h4>
                <div className="flex w-full h-3 bg-white/10 rounded-full overflow-hidden mb-2">
                  <div
                    style={{ width: `${overviewStats.frontendPercent}%` }}
                    className="bg-blue-500 h-full"
                  ></div>
                  <div
                    style={{ width: `${overviewStats.backendPercent}%` }}
                    className="bg-purple-500 h-full"
                  ></div>
                </div>
                <div className="flex justify-between text-xs font-medium">
                  <span className="text-blue-400">
                    {overviewStats.frontendPercent}% Frontend
                  </span>
                  <span className="text-purple-400">
                    {overviewStats.backendPercent}% Backend
                  </span>
                </div>
              </div>
            </div>

            {/* 3. Hotspots Section */}
            <div className="bg-[#0a0a0c] rounded-xl border border-white/10 shadow-lg overflow-hidden">
              <div className="px-6 py-5 border-b border-white/5 flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg bg-amber-500/10 flex items-center justify-center">
                  <svg
                    className="w-4 h-4 text-amber-500"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M17.657 18.657A8 8 0 016.343 7.343S7 9 9 10c0-2 .5-5 2.986-7C14 5 16.09 5.777 17.656 7.343A7.975 7.975 0 0120 13a7.975 7.975 0 01-2.343 5.657z"
                    />
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9.879 16.121A3 3 0 1012.015 11L11 14H9c0 .768.293 1.536.879 2.121z"
                    />
                  </svg>
                </div>
                <div>
                  <h4 className="text-white font-bold">
                    Architecture Hotspots
                  </h4>
                  <p className="text-slate-500 text-xs mt-0.5">
                    Most depended-on files in the repository
                  </p>
                </div>
              </div>

              <div className="divide-y divide-white/5">
                {overviewStats.hotspots.length > 0 ? (
                  overviewStats.hotspots.map((file, index) => (
                    <div
                      key={file.id}
                      className="p-4 px-6 flex items-center justify-between gap-4 hover:bg-white/2 transition-colors"
                    >
                      <div className="flex items-center gap-4 flex-1 min-w-0">
                        <span className="text-slate-600 font-mono text-sm font-bold w-4 shrink-0">
                          {index + 1}.
                        </span>

                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2">
                            <span
                              className={`w-2 h-2 rounded-full shrink-0 ${file.isBackend ? "bg-purple-500" : "bg-blue-500"}`}
                            ></span>
                            <span className="text-slate-200 font-medium truncate block">
                              {file.name}
                            </span>
                          </div>
                          <span
                            className="text-slate-500 text-xs font-mono block mt-1 truncate"
                            title={file.id}
                          >
                            {file.id}
                          </span>
                        </div>
                      </div>
                      <div className="flex items-center gap-2 bg-white/5 px-3 py-1 rounded-md border border-white/5 shrink-0">
                        <svg
                          className="w-3.5 h-3.5 text-slate-400 shrink-0"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1"
                          />
                        </svg>
                        <span className="text-slate-300 text-sm font-bold whitespace-nowrap">
                          {file.count}{" "}
                          <span className="text-slate-500 font-normal">
                            imports
                          </span>
                        </span>
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="p-6 text-center text-slate-500 text-sm">
                    No dependencies found to calculate hotspots.
                  </div>
                )}
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default OverviewTab;
