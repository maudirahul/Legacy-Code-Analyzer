import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import api from "../services/api"; 

const ResetPassword = () => {
  const { token } = useParams();
  const navigate = useNavigate();
  
  const [formData, setFormData] = useState({
    password: "",
    confirmPassword: "",
  });
  const [isPending, setIsPending] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Prevent submitting if passwords don't match
    if (formData.password !== formData.confirmPassword) {
      return toast.error("Passwords do not match!");
    }

    setIsPending(true);

    try {
      // Send the new password and the token to your backend
      await api.put(`/auth/resetpassword/${token}`, { 
        password: formData.password 
      });
      
      toast.success("Password reset successfully! Please log in.");
      navigate("/login");
      
    } catch (error) {
      toast.error(error.response?.data?.message || "Invalid or expired token");
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
              Set New Password
            </h2>
            <p className="text-sm text-slate-400">
              Please enter your new password below.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="block text-sm font-medium text-slate-300 mb-1.5" htmlFor="password">
                New Password
              </label>
              <input
                type="password"
                id="password"
                name="password"
                required
                value={formData.password}
                onChange={handleChange}
                className="w-full px-4 py-2.5 bg-[#09090b] border border-white/10 rounded-lg text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-purple-500/50 focus:border-purple-500 transition-all"
                placeholder="Enter new password"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-300 mb-1.5" htmlFor="confirmPassword">
                Confirm New Password
              </label>
              <input
                type="password"
                id="confirmPassword"
                name="confirmPassword"
                required
                value={formData.confirmPassword}
                onChange={handleChange}
                className="w-full px-4 py-2.5 bg-[#09090b] border border-white/10 rounded-lg text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-purple-500/50 focus:border-purple-500 transition-all"
                placeholder="Confirm new password"
              />
            </div>

            <button
              type="submit"
              disabled={isPending || !formData.password}
              className="w-full py-3 px-4 bg-white text-black font-semibold rounded-lg hover:bg-slate-200 transition-colors mt-2 disabled:opacity-70 disabled:cursor-not-allowed flex justify-center items-center"
            >
              {isPending ? (
                <div className="w-5 h-5 border-2 border-black border-t-transparent rounded-full animate-spin"></div>
              ) : (
                "Reset Password"
              )}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ResetPassword;