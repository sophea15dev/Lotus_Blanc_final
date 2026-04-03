import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../../api/axios'; 
import { Mail, Lock, Eye, EyeOff, ArrowRight } from 'lucide-react';

interface LoginProps { onLoginSuccess: () => void; }

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
      const response = await api.post('/auth/login', { email, password });
      
      localStorage.setItem('isLoggedIn', 'true');
      localStorage.setItem('authToken', response.data.token || response.data.access_token);
      
      onLoginSuccess();
      navigate('/admin/dashboard');
    } catch (error: any) {
      // Logic to prevent "undefined" error messages
      console.error("Full Error Object:", error);
      
      if (!error.response) {
        setErrorMessage("Server Connection Error. Check Backend CORS settings.");
      } else {
        setErrorMessage(error.response.data?.message || "Invalid credentials.");
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#F0F4F8] flex items-center justify-center p-4 font-sans">
      <div className="w-full max-w-[950px] bg-white rounded-[2.5rem] shadow-2xl flex overflow-hidden border border-white min-h-[580px]">
        
        {/* LEFT SIDE - BRANDING */}
        <div className="hidden md:flex w-1/2 bg-[#034A6C] relative items-center justify-center p-12 overflow-hidden">
          <img 
            src="https://scontent.fpnh10-1.fna.fbcdn.net/v/t39.30808-6/470212758_1008778511055159_7319525854756683997_n.jpg?_nc_cat=111&ccb=1-7&_nc_sid=2a1932&_nc_ohc=47Q42A9l0hEQ7kNvwHmQ8oJ&_nc_oc=AdqQDmmx6f4FbC69Acaox_PYGYpwptCh5a-C5z3xhAM-HXd8KnJPXn5QuAqDIe_GGQ8&_nc_zt=23&_nc_ht=scontent.fpnh10-1.fna&_nc_gid=OJ1IEYVRf7ygAXXa-ZAcSQ&_nc_ss=7a389&oh=00_Af1QMgTTTlmBw35iURbg3WJWTh6HVqTrIiJj6KpTgU9HHQ&oe=69D4F915" 
            alt="Restaurant" 
            className="absolute inset-0 w-full h-full object-cover opacity-40" 
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#034b6cb0] to-transparent opacity-70" />
          
          <div className="relative z-10 w-full">
            <h2 className="text-5xl font-black text-white italic leading-tight mb-4 tracking-tighter font-['Work_Sans']">
              Lotus Blanc <br /> Restaurant.
            </h2>
            <div className="h-1.5 w-20 bg-[#FF6E31] rounded-full" />
          </div>
        </div>

        {/* RIGHT SIDE - FORM */}
        <div className="w-full md:w-1/2 p-8 lg:p-16 flex flex-col justify-center bg-white">
          <h1 className="text-4xl font-black text-[#024a6c] font-['Work_Sans'] text-center mb-10 tracking-tight">Login</h1>
          
          <form onSubmit={handleLogin} className="space-y-7">
            <div className="space-y-1">
              <label className="text-[10px] font-black uppercase  text-slate-400  font-['Work_Sans'] tracking-widest ml-1">Email</label>
              <div className="relative border-b-2 border-slate-100 focus-within:border-[#034A6C] transition-all">
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

            <div className="space-y-1">
              <label className="text-[10px] font-black uppercase text-slate-400 font-['Work_Sans'] tracking-widest ml-1">Password</label>
              <div className="relative border-b-2 border-slate-100 focus-within:border-[#034A6C] transition-all">
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
                  className="absolute right-1 top-1/2 -translate-y-1/2 text-slate-300 hover:text-[#034A6C]"
                >
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
            </div>

            {errorMessage && (
              <div className="bg-rose-50 p-4 rounded-2xl border border-rose-100">
                <p className="text-[11px] text-rose-600 font-bold text-center uppercase tracking-wider leading-relaxed">
                  {errorMessage}
                </p>
              </div>
            )}

            <button 
              type="submit" 
              disabled={isLoading} 
              className="w-full py-5 bg-[#FF6E31] hover:bg-[#ff5714] text-white font-black rounded-2xl shadow-xl transition-all uppercase tracking-widest text-[11px] flex items-center justify-center gap-3 active:scale-95 disabled:opacity-50 font-['Work_Sans']"
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