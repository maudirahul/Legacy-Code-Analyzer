import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const SettingsModal = ({ isOpen, onClose, isDarkMode, toggleDarkMode }) => {
  const navigate = useNavigate();
  
  if (!isOpen) return null;

  const handleLogout = () => {
    localStorage.removeItem("token"); 
    navigate("/"); 
    toast.success("Logged out successfully")
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm animate-in fade-in duration-200">
      {/* Modal Container */}
      <div className="bg-[#0a0a0c] border border-white/10 rounded-xl shadow-2xl w-full max-w-sm overflow-hidden scale-in-95 animate-in duration-200">
        {/* Header */}
        <div className="px-6 py-4 border-b border-white/5 flex justify-between items-center bg-white/1">
          <h3 className="text-lg font-bold text-white tracking-tight">
            Settings
          </h3>
          <button
            onClick={onClose}
            className="text-slate-400 hover:text-white transition-colors p-1 rounded-md hover:bg-white/10"
          >
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
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>

        {/* Body */}
        <div className="p-6 space-y-6">
          {/* Dark Mode Toggle */}
          <div className="flex items-center justify-between">
            <div>
              <div className="text-sm font-medium text-slate-200">
                Theme Preference
              </div>
              <div className="text-xs text-slate-500 mt-0.5">
                Switch between dark and light mode
              </div>
            </div>

            <button
              onClick={toggleDarkMode}
              className={`w-11 h-6 rounded-full relative transition-colors duration-200 ease-in-out border border-white/10 ${isDarkMode ? "bg-indigo-500" : "bg-slate-700"}`}
            >
              <span
                className={`absolute top-0.5 left-0.5 bg-white w-4.5 h-4.5 rounded-full transition-transform duration-200 ease-in-out shadow-sm ${isDarkMode ? "translate-x-5" : "translate-x-0"}`}
              />
            </button>
          </div>

          <hr className="border-white/5" />

          {/* Logout Button */}
          <button
            onClick={handleLogout}
            className="w-full py-2.5 px-4 bg-rose-500/10 hover:bg-rose-500/20 text-rose-400 border border-rose-500/20 rounded-lg transition-colors font-semibold text-sm flex items-center justify-center gap-2 group"
          >
            <svg
              className="w-4 h-4 group-hover:-translate-x-1 transition-transform"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
              />
            </svg>
            Log Out
          </button>
        </div>
      </div>
    </div>
  );
};

export default SettingsModal;
