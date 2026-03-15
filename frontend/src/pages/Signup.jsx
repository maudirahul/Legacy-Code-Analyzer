import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useSignup } from "../hooks/useAuth";
import { toast } from "react-toastify";

const Signup = () => {
  const navigate = useNavigate();
  const { mutate: signup, isError, isPending, error } = useSignup();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    signup(formData, {
      onSuccess: () => {
        navigate("/dashboard");
        toast.success("Account created successfully");
      },
    });
  };

  return (
    <div className="min-h-screen bg-[#09090b] flex items-center justify-center p-6 relative overflow-hidden">
      {/* Background Accent */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-150 h-100 bg-purple-500/10 rounded-full blur-[120px] pointer-events-none"></div>

      <div className="w-full max-w-md bg-[#0a0a0c] border border-white/10 rounded-2xl shadow-2xl relative z-10 overflow-hidden">
        <div className="p-8">
          {/* Header & Logo */}
          <div className="text-center mb-8">
            <Link to="/" className="inline-flex items-center gap-2 mb-4 group">
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
              <span className="text-3xl font-bold tracking-tight text-transparent bg-clip-text bg-linear-to-r from-white to-slate-400">
                ArchLens
              </span>
            </Link>
            <h2 className="text-2xl font-semibold text-white mb-2">
              Create an account
            </h2>
            <p className="text-sm text-slate-400">
              Start untangling your legacy code today.
            </p>
          </div>

          {isError && (
            <div className="mb-4 p-3 rounded bg-red-500/10 border border-red-500/20 text-red-400 text-sm text-center">
              {error?.response?.data?.message || "Invalid email or password"}
            </div>
          )}

          {/* Signup Form */}
          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label
                className="block text-sm font-medium text-slate-300 mb-1.5"
                htmlFor="name"
              >
                Full Name
              </label>
              <input
                type="text"
                id="name"
                name="name"
                required
                value={formData.name}
                onChange={handleChange}
                className="w-full px-4 py-2.5 bg-[#09090b] border border-white/10 rounded-lg text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-purple-500/50 focus:border-purple-500 transition-all"
                placeholder="enter your name"
              />
            </div>

            <div>
              <label
                className="block text-sm font-medium text-slate-300 mb-1.5"
                htmlFor="email"
              >
                Email Address
              </label>
              <input
                type="email"
                id="email"
                name="email"
                required
                value={formData.email}
                onChange={handleChange}
                className="w-full px-4 py-2.5 bg-[#09090b] border border-white/10 rounded-lg text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-purple-500/50 focus:border-purple-500 transition-all"
                placeholder="enter your email"
              />
            </div>

            <div>
              <label
                className="block text-sm font-medium text-slate-300 mb-1.5"
                htmlFor="password"
              >
                Password
              </label>
              <input
                type="password"
                id="password"
                name="password"
                required
                value={formData.password}
                onChange={handleChange}
                className="w-full px-4 py-2.5 bg-[#09090b] border border-white/10 rounded-lg text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-purple-500/50 focus:border-purple-500 transition-all"
                placeholder="enter your password"
              />
            </div>

            <button
              type="submit"
              disabled={isPending}
              className="w-full py-3 px-4 bg-white text-black font-semibold rounded-lg hover:bg-slate-200 transition-colors mt-2 disabled:opacity-70 disabled:cursor-not-allowed flex justify-center items-center"
            >
              {isPending ? (
                // Simple CSS spinner
                <div className="w-5 h-5 border-2 border-black border-t-transparent rounded-full animate-spin"></div>
              ) : (
                "Create Account"
              )}
            </button>
          </form>
        </div>

        {/* Footer Link */}
        <div className="p-4 border-t border-white/5 bg-white/2 text-center">
          <p className="text-sm text-slate-400">
            Already have an account?{" "}
            <Link
              to="/login"
              className="font-medium text-white hover:text-purple-400 transition-colors"
            >
              Sign in
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Signup;
