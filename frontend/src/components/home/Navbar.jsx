import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <nav className="w-full border-b border-white/10 bg-[#09090b]/80 backdrop-blur-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
        {/* Left: Logo & Icon */}
        <div className="flex items-center gap-10">
          <Link to="/" className="flex items-center gap-2 group">
            <div className="w-8 h-8 rounded-lg bg-linear-to-br from-indigo-500 to-purple-600 flex items-center justify-center shadow-lg shadow-indigo-500/20 group-hover:shadow-indigo-500/40 transition-all duration-300">
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
            <span className="text-3xl font-bold tracking-tight text-transparent bg-clip-text bg-linear-to-r from-white to-slate-400">
             ArchLens
            </span>
          </Link>

          {/* Center: Primary Navigation (Hidden on small screens) */}
          <div className="hidden md:flex items-center gap-6 text-sm font-medium text-slate-400">
            <a
              href="#features"
              onClick={(e) => {
                e.preventDefault();
                document
                  .getElementById("features")
                  ?.scrollIntoView({ behavior: "smooth" });
              }}
              className="hover:text-white transition-colors cursor-pointer"
            >
              Features
            </a>
            <a
              href="#ai-analysis"
              onClick={(e) => {
                e.preventDefault();
                document
                  .getElementById("ai-analysis")
                  ?.scrollIntoView({ behavior: "smooth" });
              }}
              className="hover:text-white transition-colors cursor-pointer"
            >
              AI Analysis
            </a>
            <Link to="/docs" className="hover:text-white transition-colors">
              Docs
            </Link>
          </div>
        </div>

        {/* Right: Authentication Actions */}
        <div className="flex items-center gap-5">
          <Link
            to="/login"
            className="text-sm font-medium text-slate-300 hover:text-white transition-colors"
          >
            Sign In
          </Link>
          <Link
            to="/signup"
            className="text-sm px-4 py-2 rounded-md bg-white text-black hover:bg-slate-200 transition-all font-semibold shadow-[0_0_15px_rgba(255,255,255,0.1)] hover:shadow-[0_0_20px_rgba(255,255,255,0.2)]"
          >
            Start Analyzing
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
