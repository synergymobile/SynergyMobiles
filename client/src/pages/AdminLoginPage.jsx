import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useShop } from '../context/ShopContext';
import { 
  ShieldCheck, 
  Mail, 
  Lock, 
  ArrowRight, 
  Eye, 
  EyeOff,
  ChevronLeft
} from 'lucide-react';
import Logo from '../components/Logo';

const AdminLoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const navigate = useNavigate();
  const { loginAdmin } = useShop();

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log('--- Login Attempt Initiated ---');
    console.log('Email:', email);
    setIsSubmitting(true);
    
    try {
        const success = await loginAdmin(email, password);
        console.log('Login Success Status:', success);
        if (success) {
            console.log('Redirecting to Admin Dashboard...');
            navigate('/admin');
        } else {
            console.warn('Login failed: Invalid administrative credentials.');
            alert('Access Denied. Invalid administrative credentials.');
        }
    } catch (err) {
        console.error('Login submission error:', err);
    } finally {
        setIsSubmitting(false);
        console.log('--- Login Attempt Finished ---');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-900 relative overflow-hidden px-4 font-sans selection:bg-primary/20">
      {/* Cinematic Background Elements */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
        <div className="absolute -top-24 -left-24 w-96 h-96 bg-primary/20 rounded-full blur-[120px] animate-pulse" />
        <div className="absolute -bottom-24 -right-24 w-96 h-96 bg-blue-600/10 rounded-full blur-[120px] animate-pulse delay-700" />
      </div>

      <div className="w-full max-w-md relative z-10">
        <div className="text-center mb-10">
          <Link to="/" className="inline-flex items-center gap-2 text-slate-500 hover:text-white transition-colors mb-8 group">
            <ChevronLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
            <span className="text-[10px] font-black uppercase tracking-widest">Return to Store</span>
          </Link>
          <Logo variant="light" className="h-12 w-auto mb-8 mx-auto" />
          <div className="flex items-center justify-center gap-3 mb-2">
            <ShieldCheck className="w-8 h-8 text-primary shadow-lg shadow-primary/20" />
            <h1 className="text-3xl font-black tracking-tight text-white">Developer Portal</h1>
          </div>
          <p className="text-slate-400 text-sm font-medium">Authorized Personnel Only</p>
        </div>

        <div className="bg-slate-800/50 backdrop-blur-2xl border border-slate-700/50 p-8 md:p-10 rounded-[2.5rem] shadow-2xl shadow-black/50">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <label className="text-[10px] font-black uppercase tracking-widest text-slate-500 ml-1">Secure Identity (Email)</label>
              <div className="relative group">
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500 group-focus-within:text-primary transition-colors" />
                <input 
                  type="email" 
                  className="w-full pl-12 pr-4 py-4 bg-slate-900/50 border border-slate-700 rounded-2xl focus:outline-none focus:ring-4 focus:ring-primary/20 focus:border-primary transition-all text-sm font-medium text-white placeholder:text-slate-600"
                  placeholder="admin@synergymobiles.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-[10px] font-black uppercase tracking-widest text-slate-500 ml-1">Access PIN (Password)</label>
              <div className="relative group">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500 group-focus-within:text-primary transition-colors" />
                <input 
                  type={showPassword ? "text" : "password"} 
                  className="w-full pl-12 pr-12 py-4 bg-slate-900/50 border border-slate-700 rounded-2xl focus:outline-none focus:ring-4 focus:ring-primary/20 focus:border-primary transition-all text-sm font-medium text-white placeholder:text-slate-600"
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
                <button 
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-500 hover:text-primary transition-colors"
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            <button 
              type="submit" 
              disabled={isSubmitting}
              className="w-full py-5 bg-primary text-white font-black rounded-2xl hover:bg-primary-dark transition-all shadow-xl shadow-primary/20 active:scale-95 flex items-center justify-center gap-2 group disabled:opacity-50 disabled:cursor-not-allowed mt-4"
            >
              {isSubmitting ? (
                <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
              ) : (
                <>
                  Verify & Unlock
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </>
              )}
            </button>
          </form>

          <footer className="mt-8 pt-8 border-t border-slate-700/50 text-center">
              <p className="text-[10px] text-slate-600 font-bold uppercase tracking-[0.2em]">
                System Protected by <span className="text-slate-400">Elite Guard SSL</span>
              </p>
          </footer>
        </div>
        
        <div className="mt-8 flex justify-center gap-6">
            <div className="text-slate-600 text-[10px] font-bold uppercase tracking-widest flex items-center gap-2">
                <div className="w-1.5 h-1.5 rounded-full bg-green-500" /> Server Status: Optimal
            </div>
        </div>
      </div>
    </div>
  );
};

export default AdminLoginPage;
