const ProblemSection = () => {
  const problems = [
    {
      title: "Poorly Documented Systems",
      description:
        "Legacy codebases are often complex and lack proper documentation, leaving your team to rely on outdated tribal knowledge just to keep things running.",
      icon: (
        <svg
          className="w-5 h-5 text-amber-400"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
          />
        </svg>
      ),
    },
    {
      title: "Dangerous Maintenance",
      description:
        "A lack of clarity creates significant challenges during system maintenance and enhancement. Fixing a bug in one module silently breaks three others.",
      icon: (
        <svg
          className="w-5 h-5 text-red-400"
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
      ),
    },
    {
      title: "Slow Developer Onboarding",
      description:
        "New hires spend weeks or months just trying to untangle the control flow and module dependencies before they can push their first meaningful commit.",
      icon: (
        <svg
          className="w-5 h-5 text-orange-400"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
          />
        </svg>
      ),
    },
  ];

  return (
    <section className="bg-[#09090b] py-15 border-t border-white/5 relative overflow-hidden">
      {/* Subtle background glow to separate sections */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-lg h-px bg-linear-to-r from-transparent via-red-500/20 to-transparent"></div>

      <div className="max-w-7xl mx-auto px-6">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Left Column: The Narrative */}
          <div className="max-w-xl">
            <h2 className="text-sm font-semibold text-red-400 tracking-wide uppercase mb-3">
              The Legacy Code Trap
            </h2>
            <h3 className="text-3xl md:text-5xl font-bold text-white mb-6 leading-tight">
              Organizations rely on systems no one fully understands.
            </h3>
            <p className="text-lg text-slate-400 mb-8 leading-relaxed">
              In contemporary software development environments, relying
              extensively on aging codebases is unavoidable. But when that code
              becomes a black box, it transforms from an asset into your biggest
              technical liability.
            </p>

            {/* Contextual stat or quote block */}
            <div className="pl-6 border-l-2 border-red-500/30">
              <p className="text-slate-300 italic">
                "We spend more time deciphering what the old code does than
                actually writing new features."
              </p>
            </div>
          </div>

          {/* Right Column: The Pain Points */}
          <div className="space-y-4 relative">
            {/* Background decoration for the cards */}
            <div className="absolute -inset-4 bg-linear-to-b from-red-500/5 to-transparent blur-2xl rounded-3xl pointer-events-none"></div>

            {problems.map((problem, index) => (
              <div
                key={index}
                className="relative p-6 rounded-xl border border-white/10 bg-white/2 backdrop-blur-sm hover:bg-white/4 transition-colors flex gap-5"
              >
                <div className="mt-1 w-10 h-10 rounded-lg bg-red-500/10 border border-red-500/20 flex items-center justify-center shrink-0">
                  {problem.icon}
                </div>
                <div>
                  <h4 className="text-lg font-semibold text-white mb-2">
                    {problem.title}
                  </h4>
                  <p className="text-slate-400 text-sm leading-relaxed">
                    {problem.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProblemSection;
