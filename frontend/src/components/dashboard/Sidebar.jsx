import { useState } from "react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import { useUserHistory, useDeleteProject } from "../../hooks/useAnalysis";
import SettingsModal from "../modals/SettingModal";
import DeleteModal from "../modals/DeleteModal";

const Sidebar = ({
  activeProjectId,
  setActiveProjectId,
  isCollapsed,
  toggleCollapse,
}) => {
  const { data: recentAnalyses, isLoading, isError } = useUserHistory();

  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(true);
  const [projectToDelete, setProjectToDelete] = useState(false)

  const deleteProject = useDeleteProject();

  // delete handler
  const handleDeleteClick = (e, projectId) => {
    e.stopPropagation(); 
    setProjectToDelete(projectId); // Set the ID to open the modal
  };

  
  const confirmDelete = () => {
    if (!projectToDelete) return;
    
    deleteProject.mutate(projectToDelete, {
      onSuccess: () => {
        if (activeProjectId === projectToDelete) {
          setActiveProjectId(null);
        }
        setProjectToDelete(null); 
        toast.success("Project deleted successfully!");
      },
      onError:()=>{
        toast.error("Failed to delete project.");
      }
    });
  };

  return (
    <>
      <aside
        className={`border-r border-white/10 bg-[#0a0a0c] flex flex-col h-full transition-all duration-300 ease-in-out relative ${
          isCollapsed ? "w-16" : "w-64"
        }`}
      >
        {/* Brand Logo */}
        <div className="h-16 flex items-center px-4 border-b border-white/10 shrink-0 overflow-hidden">
          <Link
            to="/"
            className="flex items-center gap-3 group whitespace-nowrap"
          >
            <div className="w-8 h-8 shrink-0 rounded-md bg-linear-to-br from-indigo-500 to-purple-600 flex items-center justify-center shadow-lg shadow-indigo-500/20">
              <svg
                className="w-4 h-4 text-white"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4"
                />
              </svg>
            </div>
            <span
              className={`text-3xl font-bold tracking-tight text-transparent bg-clip-text bg-linear-to-r from-white to-slate-400 transition-opacity duration-300 ${isCollapsed ? "opacity-0" : "opacity-100"}`}
            >
              ArchLens
            </span>
          </Link>
        </div>

        {/* Navigation Links */}
        <nav className="p-3 space-y-1 shrink-0 overflow-hidden">
          <button
            onClick={toggleCollapse}
            className="w-full flex items-center gap-3 px-2.5 py-2 rounded-lg bg-white/5 hover:bg-white/10 transition-colors text-white font-medium whitespace-nowrap"
            title={isCollapsed ? "Expand Workspace" : "Collapse Workspace"}
          >
            <svg
              className="w-5 h-5 shrink-0 text-indigo-400"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z"
              />
            </svg>
            <span
              className={`transition-opacity duration-300 ${isCollapsed ? "opacity-0 w-0 hidden" : "opacity-100"}`}
            >
              Workspace
            </span>
          </button>
          <button
            onClick={() => setIsSettingsOpen(true)}
            className="w-full flex items-center gap-3 px-2.5 py-2 rounded-lg hover:bg-white/5 transition-colors text-slate-400 hover:text-slate-200 whitespace-nowrap"
            title="Settings"
          >
            <svg
              className="w-5 h-5 shrink-0 text-slate-500"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"
              />
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
              />
            </svg>
            <span
              className={`transition-opacity duration-300 ${isCollapsed ? "opacity-0 w-0 hidden" : "opacity-100"}`}
            >
              Settings
            </span>
          </button>
        </nav>

        {/* Dynamic Recent Files History */}
        <div className="py-4 mt-2 border-t border-white/5 flex-1 overflow-y-auto no-scrollbar overflow-x-hidden">
          <h4
            className={`text-xs font-semibold text-slate-500 uppercase tracking-wider mb-3 px-5 transition-opacity duration-300 ${isCollapsed ? "opacity-0 h-0 mb-0" : "opacity-100"}`}
          >
            Recent Analyses
          </h4>
          <ul className="space-y-1 px-3">
            {!isLoading &&
              !isError &&
              recentAnalyses?.map((project) => {
                const isActive = activeProjectId === project._id;
                return (
                  <li
                    key={project._id}
                    onClick={() => setActiveProjectId(project._id)}
                    title={project.name || project.projectName}
                    // 1. ADDED 'group' and 'justify-between' to the li classes
                    className={`group p-2 rounded-md cursor-pointer text-sm flex items-center justify-between transition-all whitespace-nowrap ${
                      isActive
                        ? "bg-indigo-500/10 border border-indigo-500/20 text-indigo-300 shadow-[inset_0_0_10px_rgba(99,102,241,0.05)]"
                        : "hover:bg-white/5 border border-transparent text-slate-400 hover:text-slate-200"
                    } ${isCollapsed ? "justify-center" : ""}`}
                  >
                    {/* Left Side: Icon and Text */}
                    <div className="flex items-center gap-3 overflow-hidden">
                      <svg
                        className={`w-5 h-5 shrink-0 ${isActive ? "text-indigo-400" : project.name?.endsWith(".zip") ? "text-purple-400" : "text-blue-400"}`}
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                        />
                      </svg>
                      <span
                        className={`truncate font-medium transition-opacity duration-300 ${isCollapsed ? "opacity-0 w-0" : "opacity-100"}`}
                      >
                        {project.name || project.projectName}
                      </span>
                    </div>

                    {/* Right Side: Active Dot AND Trash Button */}
                    {/* 2. MOVED the button INSIDE the li tag */}
                    {!isCollapsed && (
                      <div className="flex items-center shrink-0">
                        {isActive && (
                          <span className="mr-2 shrink-0 w-1.5 h-1.5 rounded-full bg-indigo-400 shadow-[0_0_5px_rgba(129,140,248,0.8)]"></span>
                        )}
                        <button
                          onClick={(e) =>  handleDeleteClick(e, project._id)}
                          disabled={deleteProject.isPending}
                          className="opacity-0 group-hover:opacity-100 p-1 rounded-md text-slate-500 hover:text-rose-400 hover:bg-rose-500/10 transition-all"
                          title="Delete Project"
                        >
                          <svg
                            className="w-4 h-4"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={1.5}
                              d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                            />
                          </svg>
                        </button>
                      </div>
                    )}
                  </li>
                );
              })}
          </ul>
        </div>
      </aside>
      <SettingsModal
        isOpen={isSettingsOpen}
        onClose={() => setIsSettingsOpen(false)}
        isDarkMode={isDarkMode}
        toggleDarkMode={() => setIsDarkMode(!isDarkMode)}
      />

      <DeleteModal 
        isOpen={!!projectToDelete} 
        onClose={() => setProjectToDelete(null)}
        onConfirm={confirmDelete}
        isDeleting={deleteProject.isPending}
      />
    </>
  );
};

export default Sidebar;
