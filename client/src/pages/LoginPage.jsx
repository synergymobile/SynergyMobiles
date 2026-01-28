import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useShop } from '../context/ShopContext';
import { 
  ShieldCheck, 
  User, 
  Mail, 
  Lock, 
  ArrowRight, 
  CheckCircle2, 
  Laptop,
  Smartphone,
  Eye,
  EyeOff
} from 'lucide-react';
import Logo from '../components/Logo';

const LoginPage = ({ isAdminLogin = false, isSignup = false }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const navigate = useNavigate();
  const { loginAdmin, loginUser, signupUser } = useShop();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    let success = false;
    if (isAdminLogin) {
        success = await loginAdmin(email, password);
        if (success) navigate('/admin');
    } else if (isSignup) {
        success = await signupUser({ name, email, password });
        if (success) navigate('/');
    } else {
        success = await loginUser(email, password);
        if (success) navigate('/');
    }

    if (!success) {
        alert('Authentication failed. Please check your credentials.');
    }
    setIsSubmitting(false);
  };

  const title = isAdminLogin ? 'Admin Access' : (isSignup ? 'Create Account' : 'Welcome Back');
  const subtitle = isAdminLogin ? 'Secure access for platform administrators' : (isSignup ? 'Join the Synergy Mobiles community' : 'Sign in to access your orders and profile');
  const icon = isAdminLogin ? <ShieldCheck className="w-8 h-8 text-primary" /> : <User className="w-8 h-8 text-primary" />;

  return (
    <div className="py-20 lg:py-32 bg-slate-50 relative overflow-hidden px-4 font-sans selection:bg-primary/10">
      {/* Background Orbs */}
      <div className="absolute top-0 -left-20 w-96 h-96 bg-primary/5 rounded-full blur-3xl text-primary" />
      <div className="absolute bottom-0 -right-20 w-96 h-96 bg-primary/10 rounded-full blur-3xl text-primary" />

      <div className="w-full max-w-md mx-auto relative z-10 animate-in fade-in slide-in-from-bottom-8 duration-700">
        <div className="text-center mb-10">
          <div className="flex items-center justify-center gap-3 mb-2">
            {icon}
            <h1 className="text-3xl font-black tracking-tight text-slate-900">{title}</h1>
          </div>
          <p className="text-slate-500 text-sm font-medium">{subtitle}</p>
        </div>

        <div className="bg-white border border-slate-100 p-8 md:p-10 rounded-4xl shadow-2xl shadow-slate-200/50">
          <form onSubmit={handleSubmit} className="space-y-6">
            {isSignup && (
              <div className="space-y-2">
                <label className="text-xs font-bold text-slate-700 ml-1">Full Name</label>
                <div className="relative group">
                  <User className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 group-focus-within:text-primary transition-colors" />
                  <input 
                    type="text" 
                    className="w-full pl-12 pr-4 py-4 bg-slate-50/50 border border-slate-100 rounded-2xl focus:outline-none focus:ring-4 focus:ring-primary/5 focus:bg-white transition-all text-sm font-medium"
                    placeholder="Enter your name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                  />
                </div>
              </div>
            )}

            <div className="space-y-2">
              <label className="text-xs font-bold text-slate-700 ml-1">Email Address</label>
              <div className="relative group">
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 group-focus-within:text-primary transition-colors" />
                <input 
                  type="email" 
                  className="w-full pl-12 pr-4 py-4 bg-slate-50/50 border border-slate-100 rounded-2xl focus:outline-none focus:ring-4 focus:ring-primary/5 focus:bg-white transition-all text-sm font-medium"
                  placeholder="name@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
            </div>

            <div className="space-y-2">
              <div className="flex justify-between items-center ml-1">
                <label className="text-xs font-bold text-slate-700">Password</label>
                {!isSignup && !isAdminLogin && <a href="#" className="text-xs font-bold text-primary hover:text-slate-900 transition-colors">Forgot Password?</a>}
              </div>
              <div className="relative group">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 group-focus-within:text-primary transition-colors" />
                <input 
                  type={showPassword ? "text" : "password"} 
                  className="w-full pl-12 pr-12 py-4 bg-slate-50/50 border border-slate-100 rounded-2xl focus:outline-none focus:ring-4 focus:ring-primary/5 focus:bg-white transition-all text-sm font-medium"
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
                <button 
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-primary transition-colors"
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            <button 
              type="submit" 
              disabled={isSubmitting}
              className="w-full py-5 bg-slate-900 text-white font-black rounded-2xl hover:bg-primary transition-all shadow-xl shadow-slate-900/10 active:scale-95 flex items-center justify-center gap-2 group disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isSubmitting ? (
                <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
              ) : (
                <>
                  {isAdminLogin ? 'Login to Dashboard' : (isSignup ? 'Create Account' : 'Login')}
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </>
              )}
            </button>
          </form>

          <footer className="mt-8 pt-8 border-t border-slate-100 text-center">
            {isAdminLogin ? (
              <p className="text-xs text-slate-400 font-bold uppercase tracking-widest">
                Secure Administrator Portal
              </p>
            ) : (
              <p className="text-sm font-medium text-slate-500">
                {isSignup ? "Already have an account?" : "Don't have an account?"}{" "}
                <Link 
                  to={isSignup ? "/login" : "/signup"} 
                  className="text-primary font-black hover:text-slate-900 transition-colors"
                >
                  {isSignup ? "Sign In" : "Register Now"}
                </Link>
              </p>
            )}
          </footer>
        </div>

        {!isAdminLogin && (
          <div className="mt-10 grid grid-cols-2 gap-4">
              <div className="p-4 bg-white border border-slate-100 rounded-2xl flex flex-col items-center gap-2 text-center group hover:border-primary/20 transition-colors">
                  <Smartphone className="w-5 h-5 text-slate-400 group-hover:text-primary transition-colors" />
                  <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Premium Store</p>
              </div>
              <div className="p-4 bg-white border border-slate-100 rounded-2xl flex flex-col items-center gap-2 text-center group hover:border-primary/20 transition-colors">
                  <CheckCircle2 className="w-5 h-5 text-slate-400 group-hover:text-primary transition-colors" />
                  <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Secure Checkout</p>
              </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default LoginPage;
