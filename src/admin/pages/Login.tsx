import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Mail, Lock, Eye, EyeOff, ArrowRight } from 'lucide-react';

// --- FIX: Define the interface for props ---
interface LoginProps {
  onLoginSuccess: () => void;
}

const Login: React.FC<LoginProps> = ({ onLoginSuccess }) => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage(null);
    setIsLoading(true);

    try {
      const response = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });

      if (!response.ok) {
        type ErrorResponse = { message?: string };
        const errorData = await response.json().catch(() => ({} as ErrorResponse));
        const msg = errorData.message || `HTTP ${response.status}`;
        throw new Error(msg);
      }

      const data = await response.json();
      localStorage.setItem('isLoggedIn', 'true');
      localStorage.setItem('authToken', data.token || 'mock-token');
      onLoginSuccess();
      navigate('/admin/dashboard');
    } catch (error) {
      const message = error instanceof Error ? error.message : 'Login failed. Please try again.';
      setErrorMessage(message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#F0F4F8] flex items-center justify-center p-4 lg:p-8 font-sans antialiased">
      <div className="w-full max-w-[950px] bg-white rounded-[2.5rem] shadow-2xl flex overflow-hidden min-h-[600px] border border-white">
        
        {/* --- LEFT SIDE: BRANDING --- */}
        <div className="hidden lg:flex w-1/2 bg-[#034b6cbd] relative items-center justify-center p-12 overflow-hidden">
          <img 
            src="https://scontent.fpnh10-1.fna.fbcdn.net/v/t39.30808-6/470212758_1008778511055159_7319525854756683997_n.jpg?_nc_cat=111&ccb=1-7&_nc_sid=2a1932&_nc_ohc=2QlKZ4NjT1cQ7kNvwEQlzTS&_nc_oc=Adqsflo-XUJPbvjbCDni7vzMtzYWCqDIym0pnIdpCEpzskggcDxqOisrZ56qnZ5XMz4&_nc_zt=23&_nc_ht=scontent.fpnh10-1.fna&_nc_gid=tVsihpCxpaM-KlOUTskSSw&_nc_ss=7a30f&oh=00_Afx6lPnJJ8FnHKrGmFhZXtlYPDhEJlSceTjV4dpwdtIsBA&oe=69CADD95" 
            alt="Restaurant Culture" 
            className="absolute inset-0 w-full h-full object-cover opacity-40 mix-blend-overlay"
          />
          <div className="relative z-10 w-full">
            <h2 className="text-5xl font-black text-white italic leading-tight mb-4 tracking-tight">
              Lotus Blanc <br /> Restaurant.
            </h2>
            <div className="h-1 w-20 bg-[#FF6E31] rounded-full" />
          </div>
        </div>

        {/* --- RIGHT SIDE: CLEAN LOGIN FORM --- */}
        <div className="w-full lg:w-1/2 p-8 lg:p-16 flex flex-col justify-center bg-white">
          <div className="mb-12">
            <h1 className="text-4xl font-black text-slate-800 tracking-tight text-center ">Login</h1>
          </div>

          <form onSubmit={handleLogin} className="space-y-10">
            {/* EMAIL */}
            <div className="space-y-1 group">
              <label className="text-[10px] font-black uppercase text-slate-400 tracking-[0.2em] ml-1">Email Address</label>
              <div className="relative border-b-2 border-slate-100 group-focus-within:border-[#034A6C] transition-all">
                <Mail className="absolute left-2 top-1/2 -translate-y-1/2 text-slate-500 group-focus-within:text-[#034A6C] transition-colors " size={18} />
                <input 
                  type="email" required placeholder="admin@lotus.com"
                  className="w-full pl-8 pr-4 py-4 bg-transparent outline-none font-medium text-slate-700 placeholder:text-slate-300 rounded-2xl"
                  value={email} onChange={(e) => setEmail(e.target.value)}
                />
              </div>
            </div>

            {/* PASSWORD */}
            <div className="space-y-1 group">
              <label className="text-[10px] font-black uppercase text-slate-400 tracking-[0.2em] ml-1">Password</label>
              <div className="relative border-b-2 border-slate-100 group-focus-within:border-[#034A6C] transition-all">
                <Lock className="absolute left-2 top-1/2 -translate-y-1/2 text-slate-500 group-focus-within:text-[#034A6C] transition-colors" size={18} />
                <input 
                  type={showPassword ? "text" : "password"} required placeholder="••••••••"
                  className="w-full pl-8 pr-12 py-4 bg-transparent outline-none font-medium text-slate-700 placeholder:text-slate-300 rounded-2xl"
                  value={password} onChange={(e) => setPassword(e.target.value)}
                />
                <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-2 top-1/2 -translate-y-1/2 text-slate-500">
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
            </div>

            {/* Error message */}
            {errorMessage && (
              <p className="text-sm text-red-600 font-semibold text-center">{errorMessage}</p>
            )}

            {/* SUBMIT BUTTON */}
            <button 
              type="submit" disabled={isLoading}
              className="w-full py-5 bg-[#FF6E31] hover:bg-[#ff5714] text-white font-black rounded-2xl shadow-xl shadow-orange-500/20 transition-all uppercase tracking-[0.2em] text-[11px] flex items-center justify-center gap-3 active:scale-[0.98]"
            >
              {isLoading ? "Validating..." : "Login to Dashboard"} <ArrowRight size={18} />
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;