import { Link } from "react-router-dom";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-[#09090b] py-8 border-t border-white/10 mt-auto">
      <div className="max-w-7xl mx-auto px-6 flex flex-col items-center text-center">
        {/* Brand */}
        <Link to="/" className="flex items-center gap-2 mb-3 group">
          <div className="w-8 h-8 rounded-lg bg-linear-to-br from-indigo-500 to-purple-600 flex items-center justify-center shadow-lg shadow-indigo-500/20">
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
          <span className="text-xl font-bold tracking-tight text-transparent bg-clip-text bg-linear-to-r from-white to-slate-400">
            ArchLens
          </span>
        </Link>

        {/* Short Description */}
        <p className="text-slate-400 text-sm max-w-md mb-6">
          An automated codebase visualization and analysis tool built for
          understanding software architecture.
        </p>

        {/* Bottom Section */}
        <div className="flex flex-col md:flex-row items-center justify-between w-full pt-6 border-t border-white/10 text-slate-500 text-sm gap-4">
          <p>© {currentYear} ArchLens.</p>

          <div className="flex items-center gap-1.5">
            <span>Built with</span>
            <svg
              className="w-4 h-4 text-rose-500"
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path
                fillRule="evenodd"
                d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z"
                clipRule="evenodd"
              />
            </svg>
            <span>by Rahul</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
