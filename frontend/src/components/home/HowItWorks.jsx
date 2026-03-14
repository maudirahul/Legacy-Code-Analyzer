const HowItWorks = () => {
  const steps = [
    {
      step: "01",
      title: "Connect Codebase",
      description: "The system accepts a legacy codebase as input. Securely upload your repository or connect your environment to begin the automated analysis.",
      icon: (
        <svg className="w-6 h-6 text-indigo-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" />
        </svg>
      ),
    },
    {
      step: "02",
      title: "AST-Powered Parsing",
      description: "The engine performs static code analysis to examine the project structure.By utilizing Abstract Syntax Tree (AST) parsing techniques, the tool identifies files, functions, and their relationships.",
      icon: (
        <svg className="w-6 h-6 text-purple-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
        </svg>
      ),
    },
    {
      step: "03",
      title: "Generate Visual Insights",
      description: "Based on the static analysis, the system generates architectural overviews and visual dependency graphs to clearly represent the internal workings of the application.",
      icon: (
        <svg className="w-6 h-6 text-blue-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16V4m0 0L3 8m4-4l4 4m6 0v12m0 0l4-4m-4 4l-4-4" />
        </svg>
      ),
    },
    {
      step: "04",
      title: "AI Explanations",
      description: "Leverage advanced AI models to provide structured, plain-English explanations for complex, undocumented legacy logic.",
      icon: (
        <svg className="w-6 h-6 text-green-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
        </svg>
      ),
    },
  ];

  return (
    <section className="bg-[#09090b] py-2 relative overflow-hidden border-t border-white/5">
      <div className="max-w-7xl mx-auto px-6 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-10">
          <h2 className="text-sm font-semibold text-purple-400 tracking-wide uppercase mb-3">
            How It Works
          </h2>
          <h3 className="text-3xl md:text-5xl font-bold text-white mb-6">
            From tangled logic to clear architecture in four steps.
          </h3>
          <p className="text-lg text-slate-400">
            Our pipeline is designed to be frictionless. Point us to your legacy monolith, and we handle the heavy lifting of mapping and explaining the underlying structure.
          </p>
        </div>

        {/* Steps Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 relative">
          
          {steps.map((step, index) => (
            <div 
              key={index} 
              className="relative z-10 flex flex-col items-start text-left p-8 rounded-2xl bg-white/2 border border-white/10 hover:bg-white/4 transition-colors h-full"
            >
              {/* Step Number & Icon */}
              <div className="flex items-center justify-between w-full mb-8">
                <div className="w-12 h-12 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center">
                  {step.icon}
                </div>
                <span className="text-4xl font-black text-white/5">{step.step}</span>
              </div>
              
              {/* Content */}
              <h4 className="text-xl font-semibold text-white mb-3">
                {step.title}
              </h4>
              <p className="text-slate-400 leading-relaxed text-sm grow">
                {step.description}
              </p>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};

export default HowItWorks;