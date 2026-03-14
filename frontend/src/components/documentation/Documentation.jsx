import React from "react";

const DocumentationTab = () => {
  return (
    <div className="h-full overflow-y-auto no-scrollbar p-8 bg-[#09090b] text-slate-300 font-sans">
      <div className="max-w-4xl mx-auto space-y-10 pb-12">
        {/* Header */}
        <div className="border-b border-white/10 pb-6">
          <h1 className="text-4xl font-extrabold text-white tracking-tight mb-4">
            CodeInsight: Quick Start
          </h1>
          <p className="text-lg text-slate-400 leading-relaxed">
            Welcome to the CodeInsight documentation! This guide will teach you
            how to visualize, navigate, and understand complex codebases using
            our interactive dependency graph and AI-powered chat.
          </p>
        </div>

        {/* Section 1: Security & Privacy */}
        <section className="space-y-4">
          <h2 className="text-2xl font-bold text-white border-b border-white/5 pb-2">
            Security & Privacy First
          </h2>
          <p className="leading-relaxed">
            We know that your codebase is your most valuable asset. That is why
            CodeInsight is designed with strict privacy boundaries to ensure
            your proprietary logic remains safe.
          </p>

          <div className="bg-emerald-500/10 border border-emerald-500/20 rounded-lg p-5 mt-4">
            <h3 className="text-emerald-400 font-bold mb-2 flex items-center gap-2 text-lg">
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
                  d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
                />
              </svg>
              No Raw Code Leaves Your System
            </h3>
            <p className="text-sm text-slate-300 leading-relaxed">
              During the upload phase, our static analyzer only extracts{" "}
              <strong>structural metadata</strong>—such as file paths,
              import/export statements, function names, and class definitions.
              The actual raw source code and underlying business logic are never
              stored or sent to the Gemini AI. The AI operates purely on the
              architectural blueprint of your application, guaranteeing complete
              privacy for your sanity and security.
            </p>
          </div>
        </section>

        {/* Section 2: Thinking in CodeInsight */}
        <section className="space-y-4">
          <h2 className="text-2xl font-bold text-white border-b border-white/5 pb-2">
            Thinking in CodeInsight
          </h2>
          <p className="leading-relaxed">
            To get the most out of the platform, it helps to understand the
            mental model of how data flows through the application:
          </p>
          <ol className="list-decimal list-inside space-y-3 pl-2 text-slate-400 marker:text-indigo-400">
            <li>
              <strong className="text-slate-200">The Upload Phase:</strong> The
              Express backend statically analyzes the files to build a
              mathematical "Dependency Graph" using only your project's
              metadata.
            </li>
            <li>
              <strong className="text-slate-200">
                The Visualization Phase:
              </strong>{" "}
              The React frontend feeds this graph to D3.js, which applies
              simulated physics so highly connected files pull together
              visually.
            </li>
            <li>
              <strong className="text-slate-200">The Analysis Phase:</strong>{" "}
              When you click a node, the React frontend passes the file's
              structural context to the AI Panel. The Gemini API reads the
              architecture and answers your questions.
            </li>
          </ol>
        </section>

        {/* Section 3: Describing the UI */}
        <section className="space-y-4">
          <h2 className="text-2xl font-bold text-white border-b border-white/5 pb-2">
            Describing the UI
          </h2>
          <p className="leading-relaxed mb-4">
            CodeInsight is broken down into three primary workspace areas.
          </p>

          <div className="space-y-6">
            <div className="bg-white/2 border border-white/5 rounded-lg p-5">
              <h3 className="text-lg font-semibold text-indigo-300 mb-2">
                1. The Interactive Graph
              </h3>
              <p className="leading-relaxed mb-3 text-sm">
                The graph uses color-coded nodes to help you instantly recognize
                module domains:
              </p>
              <ul className="list-disc list-inside space-y-2 pl-2 text-sm text-slate-400">
                <li>
                  <span className="text-blue-400 font-medium">Frontend:</span>{" "}
                  React components, UI logic, and views.
                </li>
                <li>
                  <span className="text-purple-400 font-medium">Backend:</span>{" "}
                  Express controllers, Mongoose models, and services.
                </li>
                <li>
                  <span className="text-emerald-400 font-medium">Config:</span>{" "}
                  Environment files, package.json, and build setups.
                </li>
              </ul>
            </div>

            <div className="bg-white/2 border border-white/5 rounded-lg p-5">
              <h3 className="text-lg font-semibold text-indigo-300 mb-2">
                2. The File Explorer
              </h3>
              <p className="leading-relaxed text-sm">
                The File Explorer provides a VS Code-style nested tree view.
                Clicking any file with a custom badge instantly focuses that
                file in the AI Panel so you can begin querying its structure.
              </p>
            </div>

            <div className="bg-white/2 border border-white/5 rounded-lg p-5">
              <h3 className="text-lg font-semibold text-indigo-300 mb-2">
                3. The AI Panel
              </h3>
              <p className="leading-relaxed mb-3 text-sm">
                The AI panel is your architectural pair-programmer. You can
                interact in two ways:
              </p>
              <ul className="list-disc list-inside space-y-2 pl-2 text-sm text-slate-400">
                <li>
                  <strong className="text-slate-200">
                    Predefined Actions:
                  </strong>{" "}
                  Instantly generate a "File Role" summary or "Dependencies"
                  breakdown.
                </li>
                <li>
                  <strong className="text-slate-200">Custom Chat:</strong> Ask
                  specific structural questions and get Markdown-formatted
                  responses.
                </li>
              </ul>
            </div>
          </div>
        </section>

        {/* Section 4: API Reference */}
        <section className="space-y-4">
          <h2 className="text-2xl font-bold text-white border-b border-white/5 pb-2">
            API Reference
          </h2>
          <p className="leading-relaxed">
            When a user asks a custom question, the backend compiles a strict
            context prompt before sending it to Google Gemini:
          </p>

          {/* Mock Code Block */}
          <div className="bg-[#1e1e1e] rounded-lg p-4 font-mono text-sm border border-white/10 overflow-x-auto shadow-inner mt-4">
            <pre className="text-slate-300">
              <code>
                <span className="text-pink-400">const</span>{" "}
                <span className="text-blue-300">systemInstructionText</span>{" "}
                <span className="text-pink-400">=</span>{" "}
                <span className="text-yellow-300">{`\``}</span>
                <br />
                <span className="text-yellow-300">
                  You are a codebase structure assistant.
                </span>
                <br />
                <span className="text-yellow-300">Project Context: </span>
                <span className="text-blue-400">{`\${projectContext}`}</span>
                <br />
                <span className="text-yellow-300">Current File Context: </span>
                <span className="text-blue-400">{`\${fileContext}`}</span>
                <br />
                <span className="text-yellow-300">{`\``}</span>
                <span className="text-slate-300">;</span>
              </code>
            </pre>
          </div>
          <p className="text-sm text-slate-500 italic mt-3 border-l-2 border-indigo-500/50 pl-3">
            Because the AI only receives structural data, it is specifically
            instructed to safely reject general programming questions outside
            the scope of your uploaded project.
          </p>
        </section>
      </div>
    </div>
  );
};

export default DocumentationTab;
