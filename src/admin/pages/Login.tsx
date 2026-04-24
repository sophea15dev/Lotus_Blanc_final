import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import api from "../../api/axios";
import { Mail, Lock, Eye, EyeOff, ArrowRight } from "lucide-react";

interface LoginProps {
  onLoginSuccess: () => void;
}

const Login: React.FC<LoginProps> = ({ onLoginSuccess }) => {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);

  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  // ✅ Load saved email
  useEffect(() => {
    const savedEmail = localStorage.getItem("rememberEmail");

    if (savedEmail) {
      setEmail(savedEmail);
      setRememberMe(true);
    }
  }, []);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage(null);
    setIsLoading(true);

    try {
      const response = await api.post("/auth/login", {
        email,
        password,
      });

      const data = response.data;

      const token = data?.token || data?.access_token;

      if (!token) {
        throw new Error("Token not found");
      }

      // save token
      localStorage.setItem("authToken", token);
      localStorage.setItem("isLoggedIn", "true");

      // ✅ Remember email logic
      if (rememberMe) {
        localStorage.setItem("rememberEmail", email);
      } else {
        localStorage.removeItem("rememberEmail");
      }

      onLoginSuccess();
      navigate("/admin/dashboard");
    } catch (error: any) {
      console.error(error);

      if (error.response?.status === 401) {
        setErrorMessage("Invalid email or password");
      } else if (error.response?.status === 404) {
        setErrorMessage("API not found: /auth/login");
      } else {
        setErrorMessage(error.response?.data?.message || "Login failed");
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#F0F4F8] flex items-center justify-center p-4 font-sans">
      <div className="w-full max-w-[950px] bg-white rounded-[2.5rem] shadow-2xl flex overflow-hidden border border-white min-h-[580px]">

        {/* LEFT SIDE (UNCHANGED) */}
        <div className="hidden md:flex w-1/2 bg-[#034A6C] relative items-center justify-center p-12 overflow-hidden">
          <img
            src="https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?q=80&w=1000"
            alt="Restaurant"
            className="absolute inset-0 w-full h-full object-cover opacity-40"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#034A6C] to-transparent opacity-70" />

          <div className="relative z-10 w-full">
            <h2 className="text-5xl font-black text-white italic leading-tight mb-4 tracking-tighter font-['Work_Sans']">
              Lotus Blanc <br /> Restaurant.
            </h2>
            <div className="h-1.5 w-20 bg-[#FF6E31] rounded-full" />
          </div>
        </div>

        {/* RIGHT SIDE (UNCHANGED UI) */}
        <div className="w-full md:w-1/2 p-8 lg:p-16 flex flex-col justify-center bg-white">
          <h1 className="text-4xl font-black text-slate-800 text-center mb-10 tracking-tight">
            Login
          </h1>

          <form onSubmit={handleLogin} className="space-y-7">

            {/* EMAIL */}
            <div className="space-y-1">
              <label className="text-[10px] font-black uppercase text-slate-400 tracking-widest ml-1">
                Email
              </label>
              <div className="relative border-b-2 border-slate-100 focus-within:border-[#034A6C]">
                <Mail className="absolute left-1 top-1/2 -translate-y-1/2 text-slate-300" size={18} />
                <input
                  type="email"
                  required
                  className="w-full pl-8 py-4 outline-none text-slate-700 bg-transparent"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
            </div>

            {/* PASSWORD */}
            <div className="space-y-1">
              <label className="text-[10px] font-black uppercase text-slate-400 tracking-widest ml-1">
                Password
              </label>
              <div className="relative border-b-2 border-slate-100 focus-within:border-[#034A6C]">
                <Lock className="absolute left-1 top-1/2 -translate-y-1/2 text-slate-300" size={18} />

                <input
                  type={showPassword ? "text" : "password"}
                  required
                  className="w-full pl-8 pr-10 py-4 outline-none text-slate-700 bg-transparent"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />

                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-1 top-1/2 -translate-y-1/2 text-slate-300"
                >
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
            </div>

            {/* REMEMBER ME */}
            <div className="flex items-center gap-2">
              <input
                type="checkbox"
                checked={rememberMe}
                onChange={(e) => setRememberMe(e.target.checked)}
              />
              <label className="text-sm text-slate-500">
                Remember me
              </label>
            </div>

            {/* ERROR */}
            {errorMessage && (
              <div className="bg-rose-50 p-4 rounded-2xl border border-rose-100">
                <p className="text-[11px] text-rose-600 font-bold text-center uppercase tracking-wider">
                  {errorMessage}
                </p>
              </div>
            )}

            {/* BUTTON */}
            <button
              type="submit"
              disabled={isLoading}
              className="w-full py-5 bg-[#FF6E31] hover:bg-[#ff5714] text-white font-black rounded-2xl shadow-xl transition-all uppercase tracking-widest text-[11px] flex items-center justify-center gap-3 disabled:opacity-50"
            >
              {isLoading ? "Validating..." : "Login to Dashboard"}
              <ArrowRight size={18} />
            </button>

          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;