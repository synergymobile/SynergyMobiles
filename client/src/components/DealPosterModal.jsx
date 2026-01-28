import React, { useEffect, useState } from 'react';
import { useShop } from '../context/ShopContext';
import { X, ArrowRight, Sparkles } from 'lucide-react';

const DealPosterModal = () => {
  const { dealPoster } = useShop();
  const [isVisible, setIsVisible] = useState(false);
  const [isRendered, setIsRendered] = useState(false);

  useEffect(() => {
    if (dealPoster?.showOnLoad) {
      const timer = setTimeout(() => {
        setIsRendered(true);
        setTimeout(() => setIsVisible(true), 50);
        document.body.style.overflow = 'hidden';
      }, 1500);
      return () => clearTimeout(timer);
    }
  }, [dealPoster?.showOnLoad]);

  const closePoster = () => {
    setIsVisible(false);
    setTimeout(() => {
        setIsRendered(false);
        document.body.style.overflow = 'auto';
    }, 500);
  };

  if (!isRendered) return null;

  return (
    <div className={`fixed inset-0 z-100 flex items-center justify-center p-8 sm:p-12 transition-all duration-1000 ease-in-out ${isVisible ? 'opacity-100' : 'opacity-0'}`}>
      {/* Cinematic Deep Backdrop */}
      <div 
        className={`absolute inset-0 bg-slate-950/80 backdrop-blur-2xl transition-opacity duration-1000 ${isVisible ? 'opacity-100' : 'opacity-0'}`} 
        onClick={closePoster}
      />
      
      <div className={`bg-slate-900 rounded-[3rem] w-full max-w-lg max-h-[calc(100vh-6rem)] overflow-hidden relative shadow-[0_50px_100px_-20px_rgba(0,0,0,0.7)] z-10 transition-all duration-1000 cubic-bezier(0.23, 1, 0.32, 1) transform ${isVisible ? 'scale-100 translate-y-0 rotate-0' : 'scale-90 translate-y-24 rotate-3'}`}>
        
        {/* Mirror Close Button */}
        <button 
          className="absolute top-8 right-8 w-10 h-10 flex items-center justify-center rounded-full bg-white/5 hover:bg-white/20 text-white transition-all z-30 backdrop-blur-3xl border border-white/10 active:scale-90 group" 
          onClick={closePoster}
        >
          <X className="w-4 h-4 group-hover:rotate-90 transition-transform duration-500" />
        </button>
        
        <div className="relative aspect-4/5 sm:aspect-3/4 group overflow-hidden">
          {/* Main Cinematic Visual */}
          <img 
            src={dealPoster.image} 
            alt="Elite Deal" 
            className="w-full h-full object-cover transition-transform duration-8000 ease-out group-hover:scale-125" 
          />
          
          {/* Luxury Overlays: Radial Darkening & Brand Vignette */}
          <div className="absolute inset-0 bg-radial-at-t from-transparent via-slate-950/20 to-slate-950/90" />
          <div className="absolute inset-0 bg-linear-to-t from-slate-950 via-slate-950/40 to-transparent" />

          {/* Floating Glassmorphic Content Card */}
          <div className="absolute inset-x-0 bottom-0 p-8 sm:p-12 flex flex-col items-center text-center">
            
            <div className="flex items-center gap-3 mb-6 animate-fade-in-down">
                <div className="h-px w-6 bg-primary/50" />
                <span className="text-[10px] font-black uppercase tracking-[0.6em] text-primary drop-shadow-[0_0_8px_rgba(var(--color-primary),0.5)]">
                    Elite Privileges
                </span>
                <div className="h-px w-6 bg-primary/50" />
            </div>

            <h2 className="text-4xl sm:text-5xl font-black text-white tracking-tighter leading-[0.95] mb-6 drop-shadow-2xl">
                {dealPoster.title}
            </h2>
            
            <p className="text-slate-300 text-sm sm:text-base font-medium leading-relaxed mb-10 max-w-[280px] drop-shadow-lg opacity-80">
                {dealPoster.description}
            </p>

            <div className="flex flex-col w-full gap-3">
              <button 
                className="w-full py-5 bg-white text-slate-950 font-black rounded-full shadow-[0_15px_30px_-5px_rgba(255,255,255,0.3)] flex items-center justify-center gap-2 hover:bg-primary hover:text-white transition-all duration-500 active:scale-95 group/btn overflow-hidden relative"
                onClick={closePoster}
              >
                <span className="relative z-10 flex items-center gap-2">
                    Experience Now
                    <ArrowRight className="w-5 h-5 group-hover/btn:translate-x-1 transition-transform" />
                </span>
              </button>
              
              <button 
                className="py-4 text-white/40 hover:text-white font-bold text-[9px] uppercase tracking-[0.4em] transition-all duration-300 hover:tracking-[0.5em]"
                onClick={closePoster}
              >
                Maybe Later
              </button>
            </div>
            
            {/* Subtle Brand Logo */}
            <div className="mt-8 opacity-10">
                <Sparkles className="w-6 h-6 text-white" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DealPosterModal;
