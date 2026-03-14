import { useState, useMemo } from "react";
import { useProjectFiles } from "../../hooks/useAnalysis";

//  Custom File Icon Renderer ---
const FileIcon = ({ name }) => {
  const extension = name.split(".").pop().toLowerCase();

  // React / JSX / TSX
  if (["jsx", "tsx"].includes(extension)) {
    return (
      <svg
        className="w-4 h-4 shrink-0 text-[#61DAFB]"
        viewBox="0 0 24 24"
        fill="currentColor"
      >
        <path d="M12 22.75C6.42 22.75 2 20.46 2 17.5C2 14.54 6.42 12.25 12 12.25C17.58 12.25 22 14.54 22 17.5C22 20.46 17.58 22.75 12 22.75ZM12 13.75C7.3 13.75 3.5 15.48 3.5 17.5C3.5 19.52 7.3 21.25 12 21.25C16.7 21.25 20.5 19.52 20.5 17.5C20.5 15.48 16.7 13.75 12 13.75Z" />
        <path
          d="M12 22.75C11.59 22.75 11.25 22.41 11.25 22V12C11.25 11.59 11.59 11.25 12 11.25C12.41 11.25 12.75 11.59 12.75 12V22C12.75 22.41 12.41 22.75 12 22.75Z"
          transform="rotate(60 12 17.5)"
        />
        <path
          d="M12 22.75C11.59 22.75 11.25 22.41 11.25 22V12C11.25 11.59 11.59 11.25 12 11.25C12.41 11.25 12.75 11.59 12.75 12V22C12.75 22.41 12.41 22.75 12 22.75Z"
          transform="rotate(-60 12 17.5)"
        />
        <circle cx="12" cy="17.5" r="2.5" fill="#61DAFB" />
      </svg>
    );
  }

  // JavaScript / JS
  if (["js", "cjs", "mjs"].includes(extension)) {
    return (
      <svg
        className="w-4 h-4 shrink-0 text-[#F7DF1E]"
        viewBox="0 0 24 24"
        fill="currentColor"
      >
        <path d="M3 3h18v18H3V3zm11.75 14.5c.34-.14.67-.34.96-.58l1.43 1.63c-.6.58-1.35 1.05-2.22 1.34-.87.29-1.8.44-2.76.44-1.74 0-3.08-.43-4.04-1.28-.96-.86-1.44-2.11-1.44-3.77 0-1.63.5-2.88 1.48-3.74.98-.86 2.37-1.29 4.16-1.29 1 0 1.88.13 2.65.38.77.25 1.42.6 1.95 1.05l-1.43 1.76c-.41-.33-.84-.57-1.29-.72-.45-.15-.97-.22-1.57-.22-.96 0-1.69.23-2.18.68-.49.45-.74 1.13-.74 2.05 0 .97.23 1.67.7 2.11.47.44 1.16.66 2.08.66.72 0 1.35-.11 1.89-.32l.37-.18zm-8.8-1.55c.34-.14.67-.34.96-.58l1.43 1.63c-.6.58-1.35 1.05-2.22 1.34-.87.29-1.8.44-2.76.44-1.74 0-3.08-.43-4.04-1.28C.36 17.64.08 16.58.08 15.1c0-1.63.5-2.88 1.48-3.74.98-.86 2.37-1.29 4.16-1.29 1 0 1.88.13 2.65.38.77.25 1.42.6 1.95 1.05l-1.43 1.76c-.41-.33-.84-.57-1.29-.72-.45-.15-.97-.22-1.57-.22-.96 0-1.69.23-2.18.68-.49.45-.74 1.13-.74 2.05 0 .97.23 1.67.7 2.11.47.44 1.16.66 2.08.66.72 0 1.35-.11 1.89-.32l.37-.18z" />
      </svg>
    );
  }

  // JSON / Config
  if (
    ["json", "env", "config"].includes(extension) ||
    name.includes("config")
  ) {
    return (
      <svg
        className="w-4 h-4 shrink-0 text-[#8BC34A]"
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
    );
  }

  // CSS / Styling
  if (["css", "scss", "html"].includes(extension)) {
    return (
      <svg
        className="w-4 h-4 shrink-0 text-[#2965f1]"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01"
        />
      </svg>
    );
  }

  // Default File Icon
  return (
    <svg
      className="w-4 h-4 shrink-0 text-slate-500"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z"
      />
    </svg>
  );
};

// --- 1. Recursive Tree Node Component ---
const FileTreeNode = ({ node, level = 0, onNodeSelect }) => {
  const [isOpen, setIsOpen] = useState(level < 1); // Open top-level folders by default
  const isFolder = node.type === "folder";

  const handleSelect = () => {
    if (isFolder) {
      setIsOpen(!isOpen);
    } else {
      // Send the exact same data format that the D3 graph sends!
      onNodeSelect({
        id: node.path,
        name: node.name,
        isBackend: node.path.startsWith("backend"),
      });
    }
  };

  return (
    <div className="select-none text-sm">
      <div
        onClick={handleSelect}
        className={`flex items-center gap-2 py-1.5 px-2 hover:bg-white/5 cursor-pointer text-slate-300 hover:text-white transition-colors group ${!isFolder ? "ml-4" : ""}`}
        style={{ paddingLeft: `${level * 16 + 8}px` }}
      >
        {isFolder ? (
          <svg
            className={`w-3.5 h-3.5 shrink-0 transition-transform text-blue-400 group-hover:text-slate-300 ${isOpen ? "rotate-90" : ""}`}
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M9 5l7 7-7 7"
            />
          </svg>
        ) : (
          <FileIcon name={node.name} />
        )}

        {isFolder && isOpen ? (
          <svg
            className="w-4 h-4 shrink-0 text-indigo-400"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              fillRule="evenodd"
              d="M2 6a2 2 0 012-2h4l2 2h6a2 2 0 012 2v7a2 2 0 01-2 2H4a2 2 0 01-2-2V6z"
              clipRule="evenodd"
            />
          </svg>
        ) : isFolder && !isOpen ? (
          <svg
            className="w-4 h-4 shrink-0 text-slate-400"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              fillRule="evenodd"
              d="M2 6a2 2 0 012-2h4l2 2h6a2 2 0 012 2v7a2 2 0 01-2 2H4a2 2 0 01-2-2V6z"
              clipRule="evenodd"
            />
          </svg>
        ) : null}

        <span
          className={`truncate ${isFolder ? "font-medium text-slate-200" : ""}`}
        >
          {node.name}
        </span>
      </div>

      {/* Render Children Recursively */}
      {isFolder && isOpen && node.children && (
        <div>
          {Object.values(node.children)
            .sort((a, b) => {
              // Folders first, then files alphabetically
              if (a.type === "folder" && b.type !== "folder") return -1;
              if (a.type !== "folder" && b.type === "folder") return 1;
              return a.name.localeCompare(b.name);
            })
            .map((childNode) => (
              <FileTreeNode
                key={childNode.path}
                node={childNode}
                level={level + 1}
                onNodeSelect={onNodeSelect}
              />
            ))}
        </div>
      )}
    </div>
  );
};

// --- 2. Main Tab Component ---
const FileExplorerTab = ({ projectId, onNodeSelect }) => {
  const { data: filesData, isLoading, isError } = useProjectFiles(projectId);

  // Convert flat array to nested tree
  const fileTree = useMemo(() => {
    if (!filesData) return {};

    const root = {};
    filesData.forEach((file) => {
      const parts = file.path.split("/");
      let currentLevel = root;

      parts.forEach((part, index) => {
        if (!currentLevel[part]) {
          currentLevel[part] = {
            name: part,
            path: parts.slice(0, index + 1).join("/"),
            // If it's the last part of the path, it's whatever the API says it is. Otherwise, it's a folder.
            type: index === parts.length - 1 ? file.type : "folder",
            children: {},
            rawInfo: index === parts.length - 1 ? file : null,
          };
        }
        currentLevel = currentLevel[part].children;
      });
    });
    return root;
  }, [filesData]);

  if (isLoading) {
    return (
      <div className="p-6 text-sm text-slate-500 animate-pulse">
        Loading file system...
      </div>
    );
  }

  if (isError || !filesData) {
    return (
      <div className="p-6 text-sm text-red-400">
        Failed to load file explorer.
      </div>
    );
  }

  return (
    <div className="h-full flex flex-col animate-in fade-in duration-300">
      <div className="p-4 border-b border-white/5 bg-[#0a0a0c] shrink-0">
        <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider">
          Project Files
        </h3>
      </div>

      <div className="flex-1 overflow-y-auto no-scrollbar p-2 bg-[#09090b]">
        {Object.values(fileTree)
          .sort((a, b) => (a.type === "folder" ? -1 : 1))
          .map((node) => (
            <FileTreeNode
              key={node.path}
              node={node}
              onNodeSelect={onNodeSelect}
            />
          ))}
      </div>
    </div>
  );
};

export default FileExplorerTab;
