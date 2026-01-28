import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useShop } from '../context/ShopContext';
import { 
  User, 
  Mail, 
  Lock, 
  ArrowRight, 
  Eye, 
  EyeOff,
  UserPlus
} from 'lucide-react';
import Logo from '../components/Logo';

const SignupPage = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const navigate = useNavigate();
  const { signupUser } = useShop();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    const success = await signupUser({ name, email, password });
    if (success) {
        navigate('/');
    } else {
        alert('Account creation failed. Please check your information or try again later.');
    }
    setIsSubmitting(false);
  };

  return (
    <div className="py-20 lg:py-32 bg-slate-50 relative overflow-hidden px-4 font-sans selection:bg-primary/10">
      {/* Background Orbs */}
      <div className="absolute top-0 -left-20 w-96 h-96 bg-primary/5 rounded-full blur-3xl text-primary" />
      <div className="absolute bottom-0 -right-20 w-96 h-96 bg-blue-600/10 rounded-full blur-3xl text-primary" />

      <div className="w-full max-w-md mx-auto relative z-10 animate-in fade-in slide-in-from-bottom-8 duration-700">
        <div className="text-center mb-10">
          <div className="flex items-center justify-center gap-3 mb-2">
            <UserPlus className="w-8 h-8 text-primary" />
            <h1 className="text-3xl font-black tracking-tight text-slate-900">Create Account</h1>
          </div>
          <p className="text-slate-500 text-sm font-medium">Join the Synergy Mobiles community</p>
        </div>

        <div className="bg-white border border-slate-100 p-8 md:p-10 rounded-4xl shadow-2xl shadow-slate-200/50">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <label className="text-xs font-bold text-slate-700 ml-1">Full Name</label>
              <div className="relative group">
                <User className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 group-focus-within:text-primary transition-colors" />
                <input 
                  type="text" 
                  className="w-full pl-12 pr-4 py-4 bg-slate-50/50 border border-slate-100 rounded-2xl focus:outline-none focus:ring-4 focus:ring-primary/5 focus:bg-white transition-all text-sm font-medium"
                  placeholder="John Doe"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-xs font-bold text-slate-700 ml-1">Email Address</label>
              <div className="relative group">
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 group-focus-within:text-primary transition-colors" />
                <input 
                  type="email" 
                  className="w-full pl-12 pr-4 py-4 bg-slate-50/50 border border-slate-100 rounded-2xl focus:outline-none focus:ring-4 focus:ring-primary/5 focus:bg-white transition-all text-sm font-medium"
                  placeholder="john@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-xs font-bold text-slate-700 ml-1">Password</label>
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
              className="w-full py-5 bg-slate-900 text-white font-black rounded-2xl hover:bg-primary transition-all shadow-xl shadow-slate-900/10 active:scale-95 flex items-center justify-center gap-2 group disabled:opacity-50 disabled:cursor-not-allowed mt-4"
            >
              {isSubmitting ? (
                <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
              ) : (
                <>
                  Create Account
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </>
              )}
            </button>
          </form>

          <footer className="mt-8 pt-8 border-t border-slate-100 text-center">
              <p className="text-sm font-medium text-slate-500">
                Already have an account?{" "}
                <Link 
                  to="/login" 
                  className="text-primary font-black hover:text-slate-900 transition-colors ml-1"
                >
                  Sign In
                </Link>
              </p>
          </footer>
        </div>
      </div>
    </div>
  );
};

export default SignupPage;
