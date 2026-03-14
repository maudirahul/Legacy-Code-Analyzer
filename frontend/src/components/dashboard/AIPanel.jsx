import { useState, useEffect } from "react";
import { usePredefinedAnalysis, useCustomPrompt } from "../../hooks/useAI";

const AiPanel = ({ activeProjectId, selectedNode, isSidebarCollapsed }) => {
  // UI State
  const [activeTab, setActiveTab] = useState("insights"); // 'insights' or 'chat'

  // Chat State
  const [chatInput, setChatInput] = useState("");
  const [aiResponse, setAiResponse] = useState("");
  const [chatHistory, setChatHistory] = useState([]);

  // TanStack Hooks
  const { mutate: runPredefined, isPending: isRunningPredefined } =
    usePredefinedAnalysis();
  const { mutate: runCustom, isPending: isRunningCustom } = useCustomPrompt();

  // Reset the panel when a new node is clicked
  useEffect(() => {
    setAiResponse("");
    setChatHistory([]);
    setActiveTab("insights");
  }, [selectedNode]);

  // --- Handlers ---
  const handlePredefinedAction = (key) => {
    setAiResponse("");

    runPredefined(
      { projectId: activeProjectId, filePath: selectedNode.id, promptKey: key },
      {
        onSuccess: (data) => {
          setAiResponse(data.explanation);
        },
        onError: (err) => {
          console.error("AI Error:", err);

          const isRateLimit = err.response?.status === 429;

          setAiResponse(
            isRateLimit
              ? "⚠️ **API Limit Reached:** I'm processing too many requests right now. Please wait about 30 seconds and try again!"
              : "❌ **Error:** Failed to connect to the AI service. Please try again later.",
          );
        },
      },
    );
  };

  const handleCustomSubmit = (e) => {
    e.preventDefault();
    if (!chatInput.trim()) return;

    const newHistory = [...chatHistory, { role: "user", text: chatInput }];
    setChatHistory(newHistory);
    setChatInput("");

    const formattedMessages = newHistory.map((msg) => ({
      role: msg.role === "ai" ? "model" : "user",
      content: msg.text,
    }));

    runCustom(
      {
        projectId: activeProjectId,
        messages: formattedMessages,
        filePath: selectedNode.id,
      },
      {
        onSuccess: (data) => {
          setChatHistory([...newHistory, { role: "ai", text: data.reply }]);
        },
        onError: (err) => {
          console.error("Chat Error:", err);
          const isRateLimit = err.response?.status === 429;

          setChatHistory([
            ...newHistory,
            {
              role: "ai",
              text: isRateLimit
                ? "⚠️ **API Limit Reached:** I'm processing too many requests right now. Please wait about 30 seconds and try again!"
                : "❌ **Error:** Failed to connect to the AI service.",
            },
          ]);
        },
      },
    );
  };

  return (
    <aside
      className={`border-l border-white/10 bg-[#0a0a0c] flex flex-col h-full shrink-0 transition-all duration-300 ease-in-out ${
        isSidebarCollapsed ? "flex-1" : "w-96"
      }`}
    >
      {/* Header */}
      <div className="h-16 flex items-center px-6 border-b border-white/10 shrink-0 bg-[#09090b]">
        <h2 className="text-sm font-bold text-white flex items-center gap-2">
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
              d="M13 10V3L4 14h7v7l9-11h-7z"
            />
          </svg>
          AI Code Insights
        </h2>
      </div>

      {!activeProjectId || !selectedNode ? (
        <div className="flex-1 flex flex-col items-center justify-center p-6 text-center text-slate-500">
          <div className="w-12 h-12 rounded-full bg-white/5 flex items-center justify-center mb-4">
            <svg
              className="w-6 h-6 text-slate-400"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M15 15l-2 5L9 9l11 4-5 2zm0 0l5 5M7.188 2.239l.777 2.897M5.136 7.965l-2.898-.777M13.95 4.05l-2.122 2.122m-5.657 5.656l-2.12 2.122"
              />
            </svg>
          </div>
          <p className="text-sm">
            Click any node in the graph or select file in the explorer to analyze its architecture.
          </p>
        </div>
      ) : (
        <div className="flex flex-col h-full overflow-hidden animate-in fade-in duration-300">
          {/* File Context Header */}
          <div className="p-5 border-b border-white/5 bg-white/1 shrink-0">
            <span
              className={`text-[10px] font-bold uppercase tracking-wider px-2 py-1 rounded-md ${selectedNode.isBackend ? "bg-purple-500/20 text-purple-300" : "bg-blue-500/20 text-blue-300"}`}
            >
              {selectedNode.isBackend ? "Backend Logic" : "Frontend View"}
            </span>
            <h3 className="text-lg font-bold text-white mt-3 mb-1 break-all leading-tight">
              {selectedNode.name}
            </h3>
            <p className="text-[11px] text-slate-500 font-mono break-all truncate">
              {selectedNode.id}
            </p>
          </div>

          {/* AI Sub-Tabs */}
          <div className="flex px-5 pt-3 border-b border-white/10 shrink-0 gap-4">
            <button
              onClick={() => setActiveTab("insights")}
              className={`pb-2 text-xs font-semibold uppercase tracking-wide border-b-2 transition-colors ${activeTab === "insights" ? "border-indigo-500 text-indigo-400" : "border-transparent text-slate-500 hover:text-slate-300"}`}
            >
              Quick Actions
            </button>
            <button
              onClick={() => setActiveTab("chat")}
              className={`pb-2 text-xs font-semibold uppercase tracking-wide border-b-2 transition-colors ${activeTab === "chat" ? "border-indigo-500 text-indigo-400" : "border-transparent text-slate-500 hover:text-slate-300"}`}
            >
              Ask AI
            </button>
          </div>

          {/* TAB 1: PREDEFINED PROMPTS */}
          {activeTab === "insights" && (
            <div className="p-5 flex-1 overflow-y-auto no-scrollbar">
              <div className="grid grid-cols-1 gap-1 mb-6">
                <button
                  onClick={() => handlePredefinedAction("summary")}
                  disabled={isRunningPredefined}
                  className="p-2 text-xs font-medium rounded bg-white/5 border border-white/10 text-slate-300 hover:bg-white/10 hover:text-white transition-colors disabled:opacity-50"
                >
                  📄 Summarize File
                </button>
              </div>

              {isRunningPredefined ? (
                <div className="flex flex-col items-center justify-center p-8 text-indigo-400 animate-pulse no-scrollbar">
                  <div className="w-6 h-6 border-2 border-indigo-500 border-t-transparent rounded-full animate-spin mb-3"></div>
                  <span className="text-xs font-medium">
                    Analyzing AST syntax...
                  </span>
                </div>
              ) : aiResponse ? (
                <div className="bg-black/30 rounded-lg p-4 border border-white/10 text-sm text-slate-300 leading-relaxed prose prose-invert prose-sm max-w-none text-left  whitespace-pre-wrap wrap-break-word">
                  {aiResponse}
                </div>
              ) : (
                <div className="text-center text-slate-500 text-sm italic mt-8">
                  Select an action above to analyze this module.
                </div>
              )}
            </div>
          )}

          {/* TAB 2: CUSTOM CHAT */}
          {activeTab === "chat" && (
            <div className="flex flex-col flex-1 overflow-y-auto no-scrollbar">
              <div className="flex-1 overflow-y-auto no-scrollbar p-5 space-y-4">
                {chatHistory.length === 0 ? (
                  <div className="text-center text-slate-500 text-sm mt-8">
                    Ask me anything about{" "}
                    <span className="text-indigo-400 font-mono">
                      {selectedNode.name}
                    </span>
                    .
                  </div>
                ) : (
                  chatHistory.map((msg, i) => (
                    <div
                      key={i}
                      className={`flex flex-col ${msg.role === "user" ? "items-end" : "items-start"}`}
                    >
                      <div
                        className={`px-4 py-2.5 rounded-2xl max-w-[85%] text-sm ${msg.role === "user" ? "bg-indigo-600 text-white rounded-br-sm" : "bg-white/10 text-slate-200 rounded-bl-sm border border-white/5"}`}
                      >
                        {msg.text}
                      </div>
                    </div>
                  ))
                )}

                {isRunningCustom && (
                  <div className="flex items-start">
                    <div className="px-4 py-3 rounded-2xl bg-white/5 text-slate-400 rounded-bl-sm border border-white/5 flex gap-1">
                      <span className="w-1.5 h-1.5 rounded-full bg-indigo-500 animate-bounce"></span>
                      <span className="w-1.5 h-1.5 rounded-full bg-indigo-500 animate-bounce [animation-delay:0.2s]"></span>
                      <span className="w-1.5 h-1.5 rounded-full bg-indigo-500 animate-bounce [animation-delay:0.4s]"></span>
                    </div>
                  </div>
                )}
              </div>

              {/* Chat Input Area */}
              <div className="p-4 bg-[#0a0a0c] border-t border-white/5 shrink-0">
                <form
                  onSubmit={handleCustomSubmit}
                  className="relative flex items-center"
                >
                  <input
                    type="text"
                    value={chatInput}
                    onChange={(e) => setChatInput(e.target.value)}
                    placeholder="Ask about this code..."
                    disabled={isRunningCustom}
                    className="w-full bg-black/50 border border-white/10 rounded-xl pl-4 pr-10 py-3 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-indigo-500/50 focus:ring-1 focus:ring-indigo-500/50 transition-all disabled:opacity-50"
                  />
                  <button
                    type="submit"
                    disabled={isRunningCustom || !chatInput.trim()}
                    className="absolute right-2 p-1.5 text-indigo-400 hover:text-indigo-300 disabled:text-slate-600 transition-colors bg-white/5 hover:bg-white/10 rounded-lg"
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
                        strokeWidth={2}
                        d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"
                      />
                    </svg>
                  </button>
                </form>
              </div>
            </div>
          )}
        </div>
      )}
    </aside>
  );
};

export default AiPanel;
