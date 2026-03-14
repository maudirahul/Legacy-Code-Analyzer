import { useState, useEffect, useEffectEvent } from "react";
import Sidebar from "../components/dashboard/Sidebar";
import MainWorkspace from "../components/dashboard/MainWorkspace";
import AiPanel from "../components/dashboard/AIPanel";
import ProjectView from "../components/dashboard/ProjectView";

const Dashboard = () => {
  const [activeProjectId, setActiveProjectId] = useState(null);
  const [selectedNode, setSelectedNode] = useState(null);
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);

  useEffect(() => {
    setSelectedNode(null);
  }, [activeProjectId]);

  const handleOnClose = () => {
    setActiveProjectId(null);
    setSelectedNode(null);
  };

  return (
    <div className="flex h-screen w-full bg-[#09090b] text-slate-300 font-sans overflow-hidden">
      <Sidebar
        activeProjectId={activeProjectId}
        setActiveProjectId={setActiveProjectId}
        isCollapsed={isSidebarCollapsed}
        toggleCollapse={() => setIsSidebarCollapsed(!isSidebarCollapsed)}
      />

      {activeProjectId ? (
        <ProjectView
          key={`view-${activeProjectId}`}
          projectId={activeProjectId}
          onClose={handleOnClose}
          onNodeSelect={setSelectedNode}
        />
      ) : (
        <MainWorkspace
          onUploadSuccess={(newProjectId) => setActiveProjectId(newProjectId)}
        />
      )}

      {activeProjectId && (
        <AiPanel
          activeProjectId={activeProjectId}
          selectedNode={selectedNode}
          isSidebarCollapsed={isSidebarCollapsed}
        />
      )}
    </div>
  );
};

export default Dashboard;
