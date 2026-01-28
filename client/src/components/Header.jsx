import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Menu, X, ShoppingCart, User, Search, ShieldCheck, Smartphone, Instagram, MessageCircle, ChevronRight, Laptop, Headphones } from 'lucide-react';
import { useShop } from '../context/ShopContext';
import Logo from './Logo';

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { cartCount, toggleCart, isUserLoggedIn, user, isAdmin } = useShop();

  return (
    <header className="bg-white/90 backdrop-blur-xl border-b border-slate-100 shadow-sm sticky top-0 z-50 transition-all duration-300">
      {/* Announcement Bar */}
      <div className="bg-linear-to-r from-primary via-primary to-primary-dark text-white text-[10px] md:text-[11px] font-bold py-2 text-center uppercase tracking-widest px-4 relative z-50">
        <span className="flex flex-col sm:flex-row items-center justify-center gap-1 sm:gap-2">
          <span>Special Deal: Get 10% off on all accessories!</span>
          <Link to="/products" className="bg-white/20 hover:bg-white/30 px-3 py-0.5 rounded-full transition-colors inline-block mt-1 sm:mt-0">Shop Now</Link>
        </span>
      </div>

      <div className="container-custom py-3 md:py-4 relative z-50 bg-white/90 backdrop-blur-xl">
        <div className="flex justify-between items-center">
          {/* Logo */}
          <Link to="/" className="flex items-center group relative">
            <Logo className="h-7 sm:h-9 w-auto transform transition-all duration-500 group-hover:scale-105" />
            <div className="absolute -bottom-1 left-0 w-0 h-0.5 bg-primary transition-all duration-500 group-hover:w-full"></div>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-10">
            {[
              { label: 'Home', path: '/' },
              { label: 'Mobiles', path: '/products?category=smartphone' },
              { label: 'Accessories', path: '/products?category=accessory' },
              { label: 'About', path: '/about' },
              { label: 'Contact', path: '/contact' }
            ].map((link) => (
              <Link 
                key={link.label}
                to={link.path} 
                className="text-sm font-bold text-slate-600 hover:text-primary transition-colors relative group"
              >
                {link.label}
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-primary transition-all duration-300 group-hover:w-full"></span>
              </Link>
            ))}
          </nav>

          {/* Icons */}
          <div className="hidden md:flex items-center space-x-5">
            <button className="p-2 hover:bg-slate-50 rounded-full text-slate-600 hover:text-primary transition-all">
                <Search className="w-5 h-5" />
            </button>
            <button onClick={toggleCart} className="relative p-2 hover:bg-slate-50 rounded-full text-slate-600 hover:text-primary transition-all">
              <ShoppingCart className="w-5 h-5" />
              <span className="absolute top-0 right-0 bg-secondary text-white text-[10px] font-black rounded-full w-4 h-4 flex items-center justify-center border-2 border-white shadow-sm">{cartCount}</span>
            </button>
            
            {/* User Account / Profile */}
            <Link to={isUserLoggedIn ? "/profile" : "/login"} className="p-2 hover:bg-slate-50 rounded-full text-slate-600 hover:text-primary transition-all flex items-center gap-2 group">
              <User className="w-5 h-5" />
              {isUserLoggedIn && <span className="text-[10px] font-black uppercase tracking-widest hidden lg:block">{user?.name?.split(' ')[0]}</span>}
            </Link>

            {/* Hidden Admin Access (Exclusive) */}
            {isAdmin && (
              <Link to="/admin" className="p-2 bg-slate-900 text-white rounded-lg hover:bg-primary transition-all shadow-lg shadow-slate-900/10">
                <ShieldCheck className="w-4 h-4" />
              </Link>
            )}
          </div>

          {/* Mobile Actions */}
          <div className="flex items-center gap-2 sm:gap-4 md:hidden">
            <button onClick={toggleCart} className="relative p-2 text-slate-600 hover:bg-slate-50 rounded-lg transition-colors">
              <ShoppingCart className="w-5 h-5" />
              <span className="absolute top-0 right-0 bg-secondary text-white text-[10px] font-black rounded-full w-4 h-4 flex items-center justify-center border-2 border-white shadow-sm">{cartCount}</span>
            </button>
            <button className="text-slate-900 border border-slate-100 p-2 rounded-xl hover:bg-slate-50 transition-colors" onClick={() => setIsOpen(!isOpen)}>
              {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Overlay */}
      <div 
        className={`fixed inset-0 bg-slate-900/60 backdrop-blur-md z-60 transition-opacity duration-500 md:hidden ${isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'}`} 
        onClick={() => setIsOpen(false)} 
      />
      
      {/* Mobile Menu Panel (Top-to-Bottom Drawer) */}
      <div className={`fixed top-0 left-0 right-0 bg-white z-70 transition-transform duration-700 ease-in-out shadow-2xl md:hidden overflow-hidden flex flex-col max-h-[90vh] rounded-b-[2.5rem] border-b border-slate-100 ${isOpen ? 'translate-y-0' : '-translate-y-full'}`}>
        {/* Drawer Header */}
        <div className="p-6 border-b border-slate-100 flex justify-between items-center bg-white sticky top-0 z-10 shrink-0">
          <Logo className="h-7 w-auto" />
          <button 
            onClick={() => setIsOpen(false)} 
            className="w-10 h-10 flex items-center justify-center rounded-xl bg-slate-50 text-slate-400 hover:text-primary transition-all active:scale-90"
          >
            <X className="w-6 h-6" />
          </button>
        </div>
        
        {/* Drawer Content */}
        <div className="flex-1 overflow-y-auto custom-scrollbar">
          {/* Main Navigation Sections */}
          <div className="p-6 space-y-10">
            {/* Search Bar */}
            <div className="relative group">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400 group-focus-within:text-primary transition-colors" />
              <input 
                type="text" 
                placeholder="Search products..." 
                className="w-full bg-slate-50 border border-slate-100 rounded-2xl py-4 pl-12 pr-4 text-sm font-medium focus:outline-none focus:ring-2 focus:ring-primary/20 focus:bg-white focus:border-primary/30 transition-all"
              />
            </div>

            {/* Primary Links - Sleek Text Style */}
            <div className="space-y-6">
              <p className="text-[10px] font-black uppercase tracking-[0.3em] text-primary mb-4 px-1">Navigation</p>
              <nav className="flex flex-col">
                {[
                  { label: 'Home', path: '/' },
                  { label: 'Smartphones', path: '/products?category=smartphone' },
                  { label: 'Featured Accessories', path: '/products?category=accessory' },
                  { label: 'Elite Tablets', path: '/products?category=tablet' },
                  { label: 'About Synergy', path: '/about' },
                  { label: 'Contact Support', path: '/contact' },
                ].map((link) => (
                  <Link 
                    key={link.label}
                    to={link.path} 
                    className="flex items-center justify-between py-5 border-b border-slate-50 group hover:px-2 transition-all"
                    onClick={() => setIsOpen(false)}
                  >
                    <span className="text-xl font-black text-slate-900 tracking-tighter group-hover:text-primary transition-colors">{link.label}</span>
                    <ChevronRight className="w-5 h-5 text-slate-300 group-hover:text-primary transform group-hover:translate-x-1 transition-all" />
                  </Link>
                ))}
              </nav>
            </div>

            {/* Account Card (Compact) */}
            <div className="space-y-4">
              <Link 
                to={isUserLoggedIn ? "/profile" : "/login"} 
                className="flex items-center justify-between p-5 rounded-3xl bg-slate-900 text-white group shadow-xl shadow-slate-200"
                onClick={() => setIsOpen(false)}
              >
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 bg-white/10 rounded-xl flex items-center justify-center border border-white/20">
                    <User className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <h4 className="font-black text-base">{isUserLoggedIn ? user?.name?.split(' ')[0] : "Client Access"}</h4>
                    <p className="text-[9px] text-white/40 font-black uppercase tracking-widest">{isUserLoggedIn ? "Secure Dashboard" : "Sign In / Join"}</p>
                  </div>
                </div>
                <ChevronRight className="w-5 h-5 text-white/30 group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>
          </div>
        </div>

        {/* Drawer Footer */}
        <div className="p-8 border-t border-slate-100 bg-slate-50 shrink-0">
          <div className="flex flex-col items-center gap-6">
            <div className="text-center">
              <p className="text-[10px] font-black uppercase tracking-[0.3em] text-slate-400 mb-2">Need Assistance?</p>
              <p className="font-black text-slate-900 text-lg">Elite Support 24/7</p>
            </div>
            <div className="flex gap-4">
                <button className="w-12 h-12 rounded-2xl bg-white shadow-xs border border-slate-100 flex items-center justify-center text-slate-400 hover:text-white transition-all hover:bg-emerald-500 hover:shadow-lg active:scale-95">
                   <MessageCircle className="w-6 h-6" />
                </button>
                <button className="w-12 h-12 rounded-2xl bg-white shadow-xs border border-slate-100 flex items-center justify-center text-slate-400 hover:text-white transition-all hover:bg-pink-500 hover:shadow-lg active:scale-95">
                   <Instagram className="w-6 h-6" />
                </button>
            </div>
            <p className="text-[9px] text-slate-400/60 font-black uppercase tracking-[0.2em]">&copy; 2026 Synergy Mobiles Official</p>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
