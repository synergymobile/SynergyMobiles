import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useShop } from '../context/ShopContext';
import { ChevronRight, List, Smartphone, Tablet, Watch, Headphones, Battery, ShieldCheck, Truck, Clock } from 'lucide-react';

const Hero = () => {
    const { getImageUrl, homeCategoriesSelection, heroBannersSelection, products } = useShop();
    const [activeSlide, setActiveSlide] = useState(0);

    const defaultSlides = [
        {
            image: 'https://images.unsplash.com/photo-1696446701796-da61225697cc?q=80&w=1920&auto=format&fit=crop',
            title: 'iPhone 15 Pro Max<br>Titanium Blue',
            desc: 'Experience the power of A17 Pro chip. The lightest, most durable iPhone ever.',
            btnText: 'Shop Apple',
            link: '/products?brand=apple'
        },
        {
            image: 'https://images.unsplash.com/photo-1610945265064-f58c35717bbb?q=80&w=1920&auto=format&fit=crop',
            title: 'Samsung Galaxy<br>S24 Ultra',
            desc: 'Galaxy AI is here. Epic cameras, all-day battery, and the S Pen experience.',
            btnText: 'Shop Samsung',
            link: '/products?brand=samsung'
        },
        {
            image: 'https://images.unsplash.com/photo-1508685096489-7aacd43bd3b1?q=80&w=1920&auto=format&fit=crop',
            title: 'Next-Gen<br>Smart Wearables',
            desc: 'Track your fitness, health, and connectivity with our premium smartwatch collection.',
            btnText: 'Explore Wearables',
            link: '/products?category=wearable'
        },
        {
            image: 'https://images.unsplash.com/photo-1618366712010-f4ae9c647dcb?q=80&w=1920&auto=format&fit=crop',
            title: 'Immersive Audio<br>Experience',
            desc: 'Noise cancelling headphones and earbuds for the ultimate sound quality.',
            btnText: 'Shop Audio',
            link: '/products?category=audio'
        },
        {
            image: 'https://images.unsplash.com/photo-1531297461136-82lw96317156?q=80&w=1920&auto=format&fit=crop',
            title: 'Ultimate Gaming<br>& Productivity',
            desc: 'Level up your setup with high-performance tablets and accessories.',
            btnText: 'View Tablets',
            link: '/products?category=tablet'
        }
    ];

    const dynamicSlides = (heroBannersSelection && heroBannersSelection.length > 0)
        ? heroBannersSelection.map(prodId => {
            const prod = products.find(p => (p._id === prodId || p.id === prodId));
            if (!prod) return null;
            return {
                 image: prod.images?.[0] || prod.image,
                 title: prod.name,
                 desc: prod.description.length > 120 ? prod.description.substring(0, 120) + '...' : prod.description,
                 btnText: 'View Details',
                 link: `/product/${prod.slug || prod._id || prod.id}`
             };
        }).filter(Boolean)
        : defaultSlides;

    const slides = dynamicSlides;

    useEffect(() => {
        const interval = setInterval(() => {
            setActiveSlide(prev => (prev + 1) % slides.length);
        }, 5000);
        return () => clearInterval(interval);
    }, [slides.length]);

    // Helper to get icon based on category name
    const getCategoryIcon = (name) => {
        const lower = name.toLowerCase();
        if (lower.includes('phone') || lower.includes('iphone') || lower.includes('mobile')) return <Smartphone className="w-4 h-4" />;
        if (lower.includes('tablet') || lower.includes('ipad')) return <Tablet className="w-4 h-4" />;
        if (lower.includes('watch') || lower.includes('wearable')) return <Watch className="w-4 h-4" />;
        if (lower.includes('audio') || lower.includes('headphone') || lower.includes('earbud') || lower.includes('sound')) return <Headphones className="w-4 h-4" />;
        if (lower.includes('battery') || lower.includes('power') || lower.includes('charge')) return <Battery className="w-4 h-4" />;
        if (lower.includes('game') || lower.includes('gaming')) return <Smartphone className="w-4 h-4" />; // Or add Gamepad icon if available
        return <Smartphone className="w-4 h-4" />; // Default fallback
    };

    // Default categories if none selected (fallback to keep UI populated initially)
    const defaultCategories = [
        { name: 'Smartphones', link: '/products?category=smartphone', icon: <Smartphone className="w-4 h-4" /> },
        { name: 'Tablets', link: '/products?category=tablet', icon: <Tablet className="w-4 h-4" /> },
        { name: 'Wearables', link: '/products?category=wearable', icon: <Watch className="w-4 h-4" /> },
        { name: 'Audio', link: '/products?category=audio', icon: <Headphones className="w-4 h-4" /> },
        { name: 'Accessories', link: '/products?category=accessory', icon: <Battery className="w-4 h-4" /> }
    ];

    const categories = (homeCategoriesSelection && homeCategoriesSelection.length > 0)
        ? homeCategoriesSelection.map(cat => ({
            name: cat.charAt(0).toUpperCase() + cat.slice(1),
            link: `/products?category=${cat}`,
            icon: getCategoryIcon(cat)
        }))
        : defaultCategories;

    return (
        <section className="py-6 bg-gray-50">
            <div className="container-custom">
                <div className="grid grid-cols-1 md:grid-cols-[280px_1fr] gap-6">
                    {/* Categories Sidebar */}
                    <div className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden hidden md:block h-full premium-shadow">
                        <div className="bg-primary text-white p-5 font-black text-xs tracking-widest flex items-center gap-3">
                            <List className="w-5 h-5" /> SHOP BY CATEGORY
                        </div>
                        <ul className="divide-y divide-slate-50">
                            {categories.map((cat, index) => (
                                <li key={index}>
                                    <Link 
                                        to={cat.link} 
                                        className="flex items-center justify-between px-6 py-4 text-slate-600 hover:bg-slate-50 hover:text-primary transition-all duration-300 text-sm font-bold group"
                                    >
                                        <div className="flex items-center gap-4">
                                            <span className="text-slate-300 group-hover:text-primary transition-colors transform group-hover:scale-110">{cat.icon}</span>
                                            {cat.name}
                                        </div>
                                        <ChevronRight className="w-4 h-4 text-slate-200 group-hover:text-primary group-hover:translate-x-1 transition-all" />
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Main Banner */}
                    <div className="flex flex-col gap-6 w-full overflow-hidden">
                        <div className="bg-slate-900 rounded-3xl md:rounded-4xl shadow-2xl overflow-hidden relative h-[400px] md:h-[450px] lg:h-[500px] group premium-shadow-lg">
                            {slides.map((slide, index) => (
                                <div 
                                    key={index} 
                                    className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${index === activeSlide ? 'opacity-100 z-10' : 'opacity-0 z-0'}`}
                                >
                                    <img 
                                        src={getImageUrl(slide.image)} 
                                        alt={slide.title.replace('<br>', ' ')}
                                        className={`absolute inset-0 w-full h-full object-cover transition-transform duration-7000 ease-linear ${index === activeSlide ? 'scale-110' : 'scale-100'}`}
                                    />
                                    <div className="absolute inset-0 bg-linear-to-r from-slate-900/95 via-slate-900/60 to-transparent flex items-center">
                                        <div className="px-6 sm:px-12 md:pl-20 max-w-[650px] text-white">
                                            <div className="mb-4 overflow-hidden">
                                                <span className={`inline-block py-1 px-3 bg-primary/20 backdrop-blur-md border border-primary/30 rounded text-[9px] sm:text-[10px] font-black tracking-[0.2em] uppercase transform transition-all duration-700 delay-200 ${index === activeSlide ? 'translate-y-0 opacity-100' : 'translate-y-full opacity-0'}`}>
                                                    Limited Edition
                                                </span>
                                            </div>
                                            <h2 
                                                className={`text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black mb-6 md:mb-8 leading-[0.95] tracking-tighter transform transition-all duration-700 delay-300 ${index === activeSlide ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}
                                                dangerouslySetInnerHTML={{ __html: slide.title }}
                                            ></h2>
                                            <p className={`text-base sm:text-lg md:text-xl text-slate-200/80 font-medium mb-8 md:mb-10 max-w-xs sm:max-w-md transform transition-all duration-700 delay-500 ${index === activeSlide ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
                                                {slide.desc}
                                            </p>
                                            <Link 
                                                to={slide.link} 
                                                className={`inline-flex items-center gap-3 bg-white text-slate-900 hover:bg-primary hover:text-white px-8 sm:px-10 py-4 sm:py-5 rounded-2xl font-black text-base sm:text-lg transition-all duration-500 shadow-2xl hover:scale-[1.05] transform ${index === activeSlide ? 'translate-y-0 opacity-100 delay-700' : 'translate-y-10 opacity-0'}`}
                                            >
                                                {slide.btnText} <ChevronRight className="w-5 h-5" />
                                            </Link>
                                        </div>
                                    </div>
                                </div>
                            ))}
                            
                            {/* Slide Indicators */}
                            <div className="absolute bottom-6 md:bottom-8 left-1/2 transform -translate-x-1/2 flex gap-3 md:gap-4 z-20 p-2 bg-black/10 backdrop-blur-md rounded-full">
                                {slides.map((_, index) => (
                                    <button
                                        key={index}
                                        onClick={() => setActiveSlide(index)}
                                        className={`w-2 h-2 md:w-2.5 md:h-2.5 rounded-full transition-all duration-500 ${index === activeSlide ? 'bg-primary w-6 md:w-10' : 'bg-white/40 hover:bg-white/60'}`}
                                    />
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Hero;
