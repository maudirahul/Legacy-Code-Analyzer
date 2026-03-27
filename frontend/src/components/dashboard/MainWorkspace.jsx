import { useState, useRef } from "react";
import { useUploadZip, useAnalyzeGithub } from "../../hooks/useUpload";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
const MainWorkspace = ({ onUploadSuccess }) => {
  const [uploadMethod, setUploadMethod] = useState("zip");
  const [isDragging, setIsDragging] = useState(false);
  const [githubUrl, setGithubUrl] = useState("");

  const fileInputRef = useRef(null);

  const { mutate: uploadZip, isPending: isUploadingZip } = useUploadZip();
  const { mutate: analyzeGithub, isPending: isAnalyzingGithub } =
    useAnalyzeGithub();

  // Determine if *any* upload is currently happening
  const isProcessing = isUploadingZip || isAnalyzingGithub;

  const handleDragOver = (e) => {
    e.preventDefault();
    if (!isProcessing) setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragging(false);

    if (isProcessing) return;

    const files = e.dataTransfer.files;
    if (files.length > 0) {
      const file = files[0];
      if (file.type === "application/zip" || file.name.endsWith(".zip")) {
        uploadZip(file, {
          onSuccess: (data) => {
            console.log("Success:", data);
            // Instantly switch to the Graph View!
            if (data.projectId) onUploadSuccess(data.projectId);
            toast.success("Project Analyzed");
          },
          onError: (err) => {
            console.error("Error:", err);
            toast.error("Project upload failed");
          },
        });
      } else {
        alert("Please upload a valid .zip file.");
      }
    }
  };

  // --- Manual File Selection Handler ---
  const handleFileSelect = (e) => {
    const files = e.target.files;
    if (files && files.length > 0) {
      uploadZip(files[0]);
    }
    // Clear the input value so the same file can be selected again if needed
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const handleGithubSubmit = (e) => {
    e.preventDefault();
    if (githubUrl.trim() && !isProcessing) {
      analyzeGithub(githubUrl, {
        onSuccess: (data) => {
          console.log("Success:", data);
          setGithubUrl("");
          if (data.projectId) onUploadSuccess(data.projectId);
          toast.success("Project Analyzed");
        },
        onError: (err) => {
          console.error("Error:", err);
          toast.error("Project upload failed");
        },
      });
    }
  };

  return (
    <main className="flex-1 flex flex-col relative bg-[radial-gradient(#ffffff0a_1px,transparent_1px)] [bg-size:24px_24px] h-full">
      <header className="h-16 flex items-center justify-between px-8 border-b border-white/10 bg-[#09090b]/80 backdrop-blur-sm z-10 shrink-0">
        <h1 className="text-lg font-semibold text-white">Project Workspace</h1>
        <div className="flex items-center gap-4">
          <Link
            to={"/docs"}
            className="text-sm px-4 py-1.5 rounded-md bg-white/5 border border-white/10 hover:bg-white/10 transition-colors text-slate-300 cursor-pointer"
          >
            Documentation
          </Link>
        </div>
      </header>

      <div className="flex justify-center mt-0.5 mb-0">
        <div className="w-full max-w-2xl mb-6 bg-indigo-500/10 border border-indigo-500/20 rounded-xl p-4 flex  items-center gap-3 shadow-lg shadow-indigo-500/5 animate-in fade-in slide-in-from-bottom-4 duration-500">
          <svg
            className="w-5 h-5 text-indigo-400 shrink-0 mt-0.5"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
          <div>
            <h4 className="text-sm font-semibold text-indigo-300 mb-0.5">
              Language Support Notice
            </h4>
            <p className="text-sm text-indigo-200/70 leading-relaxed">
              Currently, this analyzer only supports{" "}
              <strong>JavaScript/Node.js</strong> environments (including React,
              Express, Vue, etc.). Support for Python, Java, and Go is currently
              in active development and coming soon!
            </p>
          </div>
        </div>
      </div>

      <div className="flex-1 flex items-center justify-center p-8 relative overflow-hidden">
        <div className="w-full max-w-2xl bg-[#0a0a0c] border border-white/10 rounded-2xl shadow-2xl overflow-hidden relative z-10 transition-all duration-300">
          {/* Hide tabs if we are currently processing a file */}
          {!isProcessing && (
            <div className="flex p-2 bg-white/2 border-b border-white/10 gap-2">
              <button
                onClick={() => setUploadMethod("zip")}
                className={`flex-1 py-2.5 px-4 rounded-lg text-sm font-medium flex items-center justify-center gap-2 transition-all cursor-pointer ${
                  uploadMethod === "zip"
                    ? "bg-white/10 text-white shadow-sm"
                    : "text-slate-400 hover:text-slate-200 hover:bg-white/5"
                }`}
              >
                Upload .Zip File
              </button>
              <button
                onClick={() => setUploadMethod("github")}
                className={`flex-1 py-2.5 px-4 rounded-lg text-sm font-medium flex items-center justify-center gap-2 transition-all cursor-pointer ${
                  uploadMethod === "github"
                    ? "bg-white/10 text-white shadow-sm"
                    : "text-slate-400 hover:text-slate-200 hover:bg-white/5"
                }`}
              >
                Import from GitHub
              </button>
            </div>
          )}

          <div className="p-8 h-70 flex flex-col justify-center items-center relative">
            {/* === PROCESSING STATE UI === */}
            {isProcessing ? (
              <div className="flex flex-col items-center justify-center animate-in fade-in zoom-in duration-500">
                {/* Glowing Spinner */}
                <div className="relative w-20 h-20 mb-6">
                  <div className="absolute inset-0 rounded-full border-t-2 border-indigo-500 animate-spin"></div>
                  <div className="absolute inset-2 rounded-full border-r-2 border-purple-500 animate-spin animation-delay-150"></div>
                  <div className="absolute inset-4 rounded-full border-b-2 border-blue-500 animate-spin animation-delay-300"></div>
                  <svg
                    className="absolute inset-0 m-auto w-6 h-6 text-white/50 animate-pulse"
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

                <h3 className="text-xl font-bold text-white mb-2">
                  {isUploadingZip
                    ? "Extracting & Parsing ZIP..."
                    : "Cloning Repository..."}
                </h3>
                <p className="text-slate-400 text-sm max-w-xs text-center animate-pulse">
                  Our AST engine is analyzing the codebase. This might take a
                  few moments.
                </p>
              </div>
            ) : (
              /* === NORMAL UPLOAD UI === */
              <>
                {uploadMethod === "zip" && (
                  <div
                    onDragOver={handleDragOver}
                    onDragLeave={handleDragLeave}
                    onDrop={handleDrop}
                    className={`w-full h-full rounded-xl border-2 border-dashed transition-all duration-300 flex flex-col items-center justify-center p-6 text-center relative ${
                      isDragging
                        ? "border-indigo-500 bg-indigo-500/10 scale-[1.02]"
                        : "border-white/20 bg-white/1 hover:border-white/40"
                    }`}
                  >
                    <div className="w-14 h-14 rounded-full bg-white/5 flex items-center justify-center mb-4">
                      <svg
                        className={`w-7 h-7 transition-colors ${isDragging ? "text-indigo-400" : "text-slate-400"}`}
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
                        />
                      </svg>
                    </div>
                    <h3 className="text-lg font-bold text-white mb-1">
                      Upload Legacy Code
                    </h3>
                    <p className="text-slate-400 text-sm max-w-sm mb-6">
                      Drag and drop your{" "}
                      <span className="text-indigo-300 font-mono">.zip</span>{" "}
                      archive here.
                    </p>
                    <input
                      type="file"
                      accept=".zip,application/zip"
                      className="hidden"
                      ref={fileInputRef}
                      onChange={handleFileSelect}
                    />

                    {/* 3. The Clickable Button */}
                    <button
                      onClick={() => fileInputRef.current?.click()}
                      className="px-5 py-2 rounded-lg bg-white text-black text-sm font-semibold hover:bg-slate-200 transition-colors cursor-pointer"
                    >
                      Browse Files
                    </button>
                  </div>
                )}

                {uploadMethod === "github" && (
                  <form
                    onSubmit={handleGithubSubmit}
                    className="w-full flex flex-col items-center justify-center h-full"
                  >
                    <div className="w-14 h-14 rounded-full bg-white/5 flex items-center justify-center mb-6">
                      <svg
                        className="w-7 h-7 text-slate-400"
                        fill="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          fillRule="evenodd"
                          d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"
                          clipRule="evenodd"
                        />
                      </svg>
                    </div>

                    <div className="w-full max-w-md mb-6">
                      <input
                        type="url"
                        value={githubUrl}
                        onChange={(e) => setGithubUrl(e.target.value)}
                        placeholder="https://github.com/username/repository"
                        className="w-full px-4 py-3 bg-[#09090b] border border-white/10 rounded-lg text-white placeholder-slate-600 focus:outline-none focus:ring-2 focus:ring-indigo-500/50 focus:border-indigo-500 transition-all text-center"
                        required
                      />
                    </div>

                    <button
                      type="submit"
                      className="px-6 py-2.5 rounded-lg bg-white text-black text-sm font-semibold hover:bg-slate-200 transition-colors cursor-pointer"
                    >
                      Analyze Repository
                    </button>
                  </form>
                )}
              </>
            )}
          </div>
        </div>
      </div>
    </main>
  );
};

export default MainWorkspace;
