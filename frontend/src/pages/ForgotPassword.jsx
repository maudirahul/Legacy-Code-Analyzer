import { useState } from "react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import api from "../services/api"

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [isPending, setIsPending] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsPending(true);

    try {
      // Send the email to your backend route
      await api.post("/auth/forgotpassword", { email });
      toast.success("Reset link sent! Check your email.");
      setEmail(""); // Clear the input
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to send reset email");
    } finally {
      setIsPending(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#09090b] flex items-center justify-center p-6 relative overflow-hidden">
      {/* Background Accent */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-150 h-100 bg-purple-500/10 rounded-full blur-[120px] pointer-events-none"></div>

      <div className="w-full max-w-md bg-[#0a0a0c] border border-white/10 rounded-2xl shadow-2xl relative z-10 overflow-hidden">
        <div className="p-8">
          <div className="text-center mb-8">
            <h2 className="text-2xl font-semibold text-white mb-2">
              Forgot Password
            </h2>
            <p className="text-sm text-slate-400">
              Enter your email and we'll send you a reset link.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="block text-sm font-medium text-slate-300 mb-1.5" htmlFor="email">
                Email Address
              </label>
              <input
                type="email"
                id="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-2.5 bg-[#09090b] border border-white/10 rounded-lg text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-purple-500/50 focus:border-purple-500 transition-all"
                placeholder="enter your email"
              />
            </div>

            <button
              type="submit"
              disabled={isPending || !email}
              className="w-full py-3 px-4 bg-white text-black font-semibold rounded-lg hover:bg-slate-200 transition-colors mt-2 disabled:opacity-70 disabled:cursor-not-allowed flex justify-center items-center"
            >
              {isPending ? (
                <div className="w-5 h-5 border-2 border-black border-t-transparent rounded-full animate-spin"></div>
              ) : (
                "Send Reset Link"
              )}
            </button>
          </form>
        </div>

        <div className="p-4 border-t border-white/5 bg-white/2 text-center">
          <p className="text-sm text-slate-400">
            Remember your password?{" "}
            <Link to="/login" className="font-medium text-white hover:text-purple-400 transition-colors">
              Back to login
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;