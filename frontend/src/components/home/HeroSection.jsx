import { Link } from "react-router-dom";

const HeroSection = () => {
  return (
    <section className="relative overflow-hidden bg-[#09090b] pt-24 py-5">
      {/* Background Glow Effect */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-3xl h-125 bg-linear-to-b from-indigo-500/20 to-transparent blur-[100px] rounded-full opacity-50 pointer-events-none"></div>

      <div className="relative max-w-7xl mx-auto px-6 text-center">
        {/* Subtle Top Badge */}
        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/5 border border-white/10 text-slate-300 text-sm font-medium mb-8 shadow-sm">
          <span className="flex h-2 w-2 rounded-full bg-indigo-500 shadow-[0_0_8px_rgba(99,102,241,0.8)]"></span>
          AI-Powered Code Analysis
        </div>

        {/* Main Headline */}
        <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight text-white mb-6 leading-tight">
          Untangle{" "}
          <span className="text-transparent bg-clip-text bg-linear-to-r from-indigo-400 to-purple-500">
            Legacy Code
          </span>{" "}
          <br className="hidden md:block" /> with Confidence.
        </h1>

        {/* Subheadline */}
        <p className="max-w-2xl mx-auto text-lg md:text-xl text-slate-400 mb-10 leading-relaxed">
          Instantly generate visual dependency graphs, get AI-driven
          explanations for complex logic, and safely refactor technical debt
          without breaking your system.
        </p>

        {/* Call to Action Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link
            to="/signup"
            className="w-full sm:w-auto px-8 py-3.5 rounded-lg bg-white text-black font-semibold hover:bg-slate-200 transition-all shadow-[0_0_20px_rgba(255,255,255,0.15)] hover:shadow-[0_0_30px_rgba(255,255,255,0.25)] text-center"
          >
            Start Analyzing for Free
          </Link>
          <a
              href="#ai-analysis"
              onClick={(e) => {
                e.preventDefault();
                document
                  .getElementById("ai-analysis")
                  ?.scrollIntoView({ behavior: "smooth" });
              }}
               className="w-full sm:w-auto px-8 py-3.5 rounded-lg bg-white/5 text-white font-medium border border-white/10 hover:bg-white/10 transition-all text-center"
            >
              View Example Graph
            </a>
        </div>

        {/* Product Mockup UI */}
        <div className="mt-20 mx-auto max-w-5xl rounded-xl border border-white/10 bg-[#09090b]/50 backdrop-blur-xl shadow-2xl overflow-hidden text-left relative">
          {/* Subtle reflection overlay on the mockup */}
          <div className="absolute inset-0 bg-linear-to-tr from-white/5 to-transparent opacity-10 pointer-events-none"></div>

          {/* Mac-style Window Header */}
          <div className="flex items-center px-4 py-3 border-b border-white/10 bg-white/2">
            <div className="flex gap-2">
              <div className="w-3 h-3 rounded-full bg-red-500/80"></div>
              <div className="w-3 h-3 rounded-full bg-yellow-500/80"></div>
              <div className="w-3 h-3 rounded-full bg-green-500/80"></div>
            </div>
            <div className="mx-auto text-xs text-slate-500 font-mono tracking-wider">
              analyze-monolith.js
            </div>
          </div>

          {/* Fake Code / AI Output Area */}
          <div className="p-6 md:p-8 grid md:grid-cols-2 gap-8 items-center">
            {/* Left: Code Snippet */}
            <div className="font-mono text-sm md:text-base text-slate-300 space-y-2 overflow-x-auto">
              <p>
                <span className="text-purple-400">import</span> {"{"}{" "}
                analyzeCode {"}"} <span className="text-purple-400">from</span>{" "}
                <span className="text-green-400">'@codeinsight/core'</span>;
              </p>
              <br />
              <p>
                <span className="text-purple-400">const</span> result ={" "}
                <span className="text-blue-400">await</span>{" "}
                <span className="text-yellow-200">analyzeCode</span>({"{"}
              </p>
              <p className="pl-4">
                path: <span className="text-green-400">'./legacy-system'</span>,
              </p>
              <p className="pl-4">
                buildGraph: <span className="text-orange-400">true</span>,
              </p>
              <p className="pl-4">
                aiExplanation: <span className="text-orange-400">true</span>
              </p>
              <p>{"}"});</p>
            </div>

            {/* Right: AI Output Mockup */}
            <div className="bg-indigo-500/10 border border-indigo-500/20 rounded-lg p-5">
              <div className="flex items-center gap-2 mb-3">
                <svg
                  className="w-5 h-5 text-indigo-400"
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
                <span className="text-indigo-300 text-sm font-semibold tracking-wide uppercase">
                  AI Analysis Complete
                </span>
              </div>
              <p className="text-slate-300 text-sm leading-relaxed mb-4">
                This module handles user authentication but contains deeply
                nested legacy callbacks. We mapped{" "}
                <span className="text-white font-semibold">
                  14 tangled dependencies
                </span>{" "}
                to external services.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
