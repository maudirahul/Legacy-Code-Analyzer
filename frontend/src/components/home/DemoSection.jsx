const DemoSection = () => {
  return (
    <section id="ai-analysis" className="bg-[#09090b] py-10 relative overflow-hidden border-t border-white/5">
      {/* Background Glow Effects */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-200 h-150 bg-indigo-500/10 rounded-full blur-[150px] pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-sm font-semibold text-blue-400 tracking-wide uppercase mb-3">
             Demo
          </h2>
          <h3 className="text-3xl md:text-5xl font-bold text-white mb-6">
            See the invisible connections.
          </h3>
          <p className="text-lg text-slate-400">
            Instantly map out undocumented modules. Watch as our AST engine
            translates raw, tangled code into a clean, actionable architectural
            map.
          </p>
        </div>

        {/* Dashboard UI Mockup */}
        <div className="mx-auto rounded-2xl border border-white/10 bg-[#0a0a0c] shadow-2xl overflow-hidden ring-1 ring-white/5">
          {/* Dashboard Header / Toolbar */}
          <div className="flex items-center justify-between px-4 py-3 border-b border-white/10 bg-white/2">
            <div className="flex items-center gap-4">
              {/* Mac Window Controls */}
              <div className="flex gap-2">
                <div className="w-3 h-3 rounded-full bg-red-500/80"></div>
                <div className="w-3 h-3 rounded-full bg-yellow-500/80"></div>
                <div className="w-3 h-3 rounded-full bg-green-500/80"></div>
              </div>
              <div className="text-xs text-slate-500 font-mono bg-white/5 px-3 py-1 rounded-md">
                /legacy-api/auth.js
              </div>
            </div>
            <div className="flex gap-3">
              <span className="text-xs font-medium px-3 py-1 rounded-full bg-indigo-500/20 text-indigo-300 border border-indigo-500/30 flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-indigo-400 animate-pulse"></span>
                AST Engine Active
              </span>
            </div>
          </div>

          {/* Dashboard Body */}
          <div className="grid lg:grid-cols-2 min-h-125">
            {/* Left Panel: Code Editor Mockup */}
            <div className="p-6 border-r border-white/10 bg-[#09090b] relative overflow-hidden">
              <div className="absolute top-0 left-0 w-8 h-full bg-white/2 border-r border-white/5 flex flex-col items-center py-6 text-xs text-slate-600 font-mono space-y-1.5 select-none">
                <span>1</span>
                <span>2</span>
                <span>3</span>
                <span>4</span>
                <span>5</span>
                <span>6</span>
                <span>7</span>
                <span>8</span>
                <span>9</span>
                <span>10</span>
                <span>11</span>
                <span>12</span>
              </div>
              <div className="pl-6 font-mono text-sm leading-relaxed overflow-x-auto">
                <p className="text-slate-400">
                  <span className="text-purple-400">function</span>{" "}
                  <span className="text-blue-400">authenticateUser</span>(req,
                  res) {"{"}
                </p>
                <p className="pl-4 text-slate-500">
                  // Legacy callback logic from 2016
                </p>
                <p className="pl-4 text-slate-300">
                  db.<span className="text-yellow-200">query</span>(
                  <span className="text-green-400">
                    'SELECT * FROM users...'
                  </span>
                  , <span className="text-purple-400">function</span>(err, user){" "}
                  {"{"}
                </p>
                <p className="pl-8 text-slate-300">
                  <span className="text-purple-400">if</span> (err){" "}
                  <span className="text-purple-400">return</span> res.
                  <span className="text-yellow-200">status</span>(
                  <span className="text-orange-400">500</span>);
                </p>
                <p className="pl-8 text-slate-300">
                  <span className="text-purple-400">if</span> (user) {"{"}
                </p>
                <p className="pl-12 text-slate-300">
                  crypto.<span className="text-yellow-200">verify</span>
                  (req.body.pass, user.hash,{" "}
                  <span className="text-purple-400">function</span>(err, match){" "}
                  {"{"}
                </p>
                <p className="pl-16 text-slate-300">
                  <span className="text-purple-400">if</span> (match) {"{"}
                </p>
                <p className="pl-20 text-slate-300">
                  session.<span className="text-yellow-200">create</span>
                  (user.id, <span className="text-purple-400">function</span>
                  (err, token) {"{"}
                </p>
                <p className="pl-24 text-slate-300">
                  res.<span className="text-yellow-200">send</span>({"{"} token{" "}
                  {"}"});
                </p>
                <p className="pl-20 text-slate-300">{"}"});</p>
                <p className="pl-16 text-slate-300">{"}"}</p>
                <p className="pl-12 text-slate-300">{"}"});</p>
                <p className="pl-8 text-slate-300">{"}"}</p>
                <p className="pl-4 text-slate-300">{"}"});</p>
                <p className="text-slate-400">{"}"}</p>
              </div>
            </div>

            {/* Right Panel: Split between Graph and AI */}
            <div className="flex flex-col bg-[#0a0a0c]">
              {/* Top Half: D3.js Graph Container Placeholder */}
              <div className="flex-1 relative p-8 flex items-center justify-center min-h-75 bg-[radial-gradient(#ffffff11_1px,transparent_1px)] bg-size-[16px_16px]">
                {/* D3 Target Indicator */}
                <div className="absolute top-4 right-4 text-[10px] text-slate-500 font-mono uppercase tracking-widest border border-white/5 px-2 py-1 rounded bg-black/50">
                  D3.js Mount Target
                </div>

                {/* Simple Mock Tree (to be replaced by real D3) */}
                <div className="text-center">
                  <div className="inline-block px-4 py-2 bg-indigo-500/10 border border-indigo-500/30 rounded-lg text-indigo-300 text-sm font-mono mb-8 relative">
                    auth.js
                    {/* CSS Connector Line */}
                    <div className="absolute top-full left-1/2 -translate-x-1/2 w-px h-8 bg-white/20"></div>
                  </div>

                  <div className="flex items-center gap-6 justify-center border-t border-white/20 pt-6 relative">
                    {/* Horizontal Connector Line */}
                    <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[calc(100%-4rem)] h-px bg-white/20"></div>

                    <div className="relative px-4 py-2 bg-[#09090b] border border-white/10 rounded-lg text-slate-300 text-sm font-mono">
                      {/* Vertical tick */}
                      <div className="absolute bottom-full left-1/2 -translate-x-1/2 w-px h-6 bg-white/20"></div>
                      db/query.js
                    </div>

                    <div className="relative px-4 py-2 bg-[#09090b] border border-white/10 rounded-lg text-slate-300 text-sm font-mono">
                      {/* Vertical tick */}
                      <div className="absolute bottom-full left-1/2 -translate-x-1/2 w-px h-6 bg-white/20"></div>
                      session.js
                    </div>
                  </div>
                </div>
              </div>

              {/* Bottom Half: Updated AI Analysis Output */}
              <div className="p-6 bg-[#09090b] border-t border-white/10">
                <div className="flex items-center gap-2 mb-4">
                  <div className="w-7 h-7 rounded-full bg-linear-to-br from-blue-500 to-purple-600 flex items-center justify-center shadow-lg shadow-blue-500/20">
                    <svg
                      className="w-3.5 h-3.5 text-white"
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
                  </div>
                  <span className="text-white text-sm font-bold tracking-wide">
                    File Analysis
                  </span>
                </div>

                <p className="text-slate-400 text-sm leading-relaxed mb-4">
                  <span className="text-slate-200 font-semibold">
                    Module Overview:
                  </span>{" "}
                  The{" "}
                  <code className="text-purple-400 bg-white/5 border border-white/10 px-1.5 py-0.5 rounded text-xs">
                    auth.js
                  </code>{" "}
                  file serves as the primary gateway for user authentication. It
                  validates credentials against the database, manages
                  cryptographic verification, and establishes secure user
                  sessions.
                </p>

                <div className="bg-amber-500/10 border border-amber-500/20 rounded-md p-3 text-xs text-amber-300 font-mono flex items-start gap-3">
                  <span className="text-amber-400 font-bold">&gt;</span>
                  <span className="leading-relaxed">
                    System Impact: Critical. This file is a central dependency
                    for application security. Modifications here carry a high
                    risk of cascading failures in downstream modules.
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default DemoSection;
