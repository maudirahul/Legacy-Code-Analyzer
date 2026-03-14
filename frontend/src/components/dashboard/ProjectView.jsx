import { useState } from "react";
import { useProjectGraph } from "../../hooks/useAnalysis";
import DependencyGraphCanvas from "./DependencyGraph";
import OverviewTab from "./OverviewTab";
import FileExplorerTab from "./FileExplorerTab";

const ProjectView = ({ projectId, onClose, onNodeSelect }) => {
  // Set the default tab to "graph"
  const [activeTab, setActiveTab] = useState("overview");

  const { data: graphData, isLoading, isError } = useProjectGraph(projectId);


  return (
    <main className="flex-1 flex flex-col relative bg-[#09090b] h-full border-x border-white/10 overflow-hidden">
      {/* 1. Top Header */}
      <header className="h-16 flex items-center justify-between px-6 border-b border-white/10 shrink-0 bg-[#0a0a0c]">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center">
            <svg
              className="w-4 h-4 text-indigo-400"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M5 19a2 2 0 01-2-2V7a2 2 0 012-2h4l2 2h4a2 2 0 012 2v1M5 19h14a2 2 0 002-2v-5a2 2 0 00-2-2H9a2 2 0 00-2 2v5a2 2 0 01-2 2z"
              />
            </svg>
          </div>
          <div>
            <h2 className="text-sm font-bold text-white">Project Analysis</h2>
            <p className="text-xs text-slate-500 font-mono leading-none mt-0.5">
              ID: {projectId}
            </p>
          </div>
        </div>

        {/* Close Button to go back to Upload screen */}
        <button
          onClick={onClose}
          className="w-8 h-8 flex items-center justify-center rounded-md text-slate-400 hover:text-white hover:bg-white/10 transition-colors"
          title="Close Project"
        >
          <svg
            className="w-5 h-5"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </button>
      </header>

      {/* 2. Tabbed Navigation */}
      <div className="flex px-6 border-b border-white/10 bg-[#0a0a0c] shrink-0 gap-6">
        <button
          onClick={() => setActiveTab("overview")}
          className={`py-3.5 text-sm font-medium border-b-2 transition-colors cursor-pointer ${
            activeTab === "overview"
              ? "border-indigo-500 text-indigo-400"
              : "border-transparent text-slate-400 hover:text-slate-200 hover:border-white/20"
          }`}
        >
          Overview
        </button>
        <button
          onClick={() => setActiveTab("graph")}
          className={`py-3.5 text-sm font-medium border-b-2 transition-colors cursor-pointer ${
            activeTab === "graph"
              ? "border-indigo-500 text-indigo-400"
              : "border-transparent text-slate-400 hover:text-slate-200 hover:border-white/20"
          }`}
        >
          Dependency Graph
        </button>
        <button
          onClick={() => setActiveTab("files")}
          className={`py-3.5 text-sm font-medium border-b-2 transition-colors cursor-pointer ${
            activeTab === "files"
              ? "border-indigo-500 text-indigo-400"
              : "border-transparent text-slate-400 hover:text-slate-200 hover:border-white/20"
          }`}
        >
          File Explorer
        </button>
      </div>

      {/* 3. Dynamic Content Area */}
      <div className="flex-1 overflow-hidden bg-[radial-gradient(#ffffff0a_1px,transparent_1px)] [bg-size:24px_24px]">
        {/* Overview Tab Content */}
       {activeTab === "overview" && (
          <OverviewTab graphData={graphData} />
        )}

        {/* Dependency Graph Tab Content */}
        {activeTab === "graph" && (
          <div className="w-full h-full animate-in fade-in duration-300 relative">
            {/* Loading State */}
            {isLoading && (
              <div className="absolute inset-0 flex flex-col items-center justify-center bg-[#0a0a0c]/80 backdrop-blur-sm z-10">
                <div className="w-10 h-10 border-2 border-indigo-500 border-t-transparent rounded-full animate-spin mb-4"></div>
                <p className="text-slate-400 font-medium">
                  Constructing graph vectors...
                </p>
              </div>
            )}

            {/* Error State */}
            {isError && (
              <div className="absolute inset-0 flex items-center justify-center">
                <p className="text-red-400">
                  Failed to load graph data from the server.
                </p>
              </div>
            )}

            {/* Render the actual D3 Canvas once data exists! */}
            {!isLoading && !isError && graphData && (
              <DependencyGraphCanvas
                data={graphData}
                onNodeClick={onNodeSelect}
              />
            )}
          </div>
        )}

        {/* File Explorer Tab Content */}
        {activeTab === "files" && (
          <FileExplorerTab projectId={projectId} onNodeSelect={onNodeSelect} />
        )}
      </div>
    </main>
  );
};

export default ProjectView;
