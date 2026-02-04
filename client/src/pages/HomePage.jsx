import React, { useMemo } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Star, Smartphone, Tablet, Watch, Headphones, Battery, Truck, Shield, Clock, CreditCard } from 'lucide-react';
import Hero from '../components/Hero';
import ProductCard from '../components/ProductCard';
import BrandMarquee from '../components/BrandMarquee';
import { useShop } from '../context/ShopContext';

const HomePage = () => {
  const { products } = useShop();
  
  // Filter products
  const featuredProducts = products.filter(p => p.isFeatured).slice(0, 8);
  const newArrivals = products.filter(p => p.isNewArrival).slice(0, 8);
  const bestSellers = products.filter(p => p.rating >= 4.7).slice(0, 8);

  const categories = useMemo(() => {
    const categoryMap = {
      smartphone: { icon: Smartphone, color: 'text-blue-500 bg-blue-50' },
      tablet: { icon: Tablet, color: 'text-emerald-500 bg-emerald-50' },
      wearable: { icon: Watch, color: 'text-purple-500 bg-purple-50' },
      audio: { icon: Headphones, color: 'text-rose-500 bg-rose-50' },
      accessory: { icon: Battery, color: 'text-amber-500 bg-amber-50' }
    };

    const uniqueCategories = [...new Set(products.map(p => p.category).filter(Boolean))].sort();

    return uniqueCategories.map(cat => {
      const lowerCat = cat.toLowerCase();
      const style = categoryMap[lowerCat] || { icon: Smartphone, color: 'text-blue-500 bg-blue-50' };
      
      return {
        id: cat,
        name: cat.charAt(0).toUpperCase() + cat.slice(1),
        ...style
      };
    });
  }, [products]);

  const features = [
    { icon: Truck, title: 'Express Delivery', desc: 'Secure shipping on all premium orders.' },
    { icon: Shield, title: 'Certified Warranty', desc: 'Official 1-year PTA approved coverage.' },
    { icon: Clock, title: 'Expert Support', desc: 'Dedicated 24/7 technical assistance.' },
    { icon: CreditCard, title: 'Payment Shield', desc: '100% encrypted secure transactions.' },
  ];

  return (
    <div className="min-h-screen bg-white selection:bg-primary selection:text-white">
      <Hero />

      {/* Brand Marquee Section */}
      <div className="py-12 bg-white">
        <BrandMarquee />
      </div>

      {/* Service Features Section */}
      <section className="py-16 bg-slate-50">
        <div className="container-custom px-4 md:px-10 lg:px-16">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                {features.map((feature, idx) => (
                    <div key={idx} className="flex items-center gap-5 p-8 rounded-4xl bg-white hover-rise premium-shadow border border-slate-50 transition-all duration-300 group">
                        <div className="p-4 bg-slate-50 text-primary rounded-2xl group-hover:bg-primary group-hover:text-white transition-all duration-500">
                            <feature.icon className="w-7 h-7" />
                        </div>
                        <div>
                            <h3 className="font-black text-slate-900 mb-1 tracking-tight">{feature.title}</h3>
                            <p className="text-xs text-slate-500 font-bold leading-relaxed">{feature.desc}</p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
      </section>

      {/* Shop by Category */}
      <section className="py-24 bg-white">
        <div className="container-custom px-4 md:px-10 lg:px-16">
            <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-6">
                <div className="max-w-xl">
                    <div className="flex items-center gap-3 mb-4">
                        <div className="w-10 h-0.5 bg-primary" />
                        <span className="text-primary font-black tracking-[0.3em] text-[10px] uppercase">Elite Selection</span>
                    </div>
                    <h2 className="text-4xl md:text-5xl font-black text-slate-900 mb-4 tracking-tighter">Shop by Category</h2>
                    <p className="text-slate-500 text-lg font-medium">Browse our extensive collection of premium devices and accessories.</p>
                </div>
                <Link to="/products" className="hidden md:flex items-center gap-3 text-slate-900 font-black hover:text-primary transition-all bg-slate-50 px-8 py-4 rounded-2xl group">
                    View All <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </Link>
            </div>
            
            <div className="grid grid-cols-2 lg:grid-cols-5 gap-8">
                {categories.map((cat) => (
                    <Link to={`/products?category=${cat.id}`} key={cat.id} className="group relative overflow-hidden bg-white rounded-4xl p-10 premium-shadow hover-rise border border-slate-50 flex flex-col items-center text-center">
                        <div className={`w-24 h-24 mb-8 rounded-3xl flex items-center justify-center ${cat.color} group-hover:scale-110 group-hover:rotate-3 transition-all duration-500 shadow-sm`}>
                            <cat.icon className="w-12 h-12" />
                        </div>
                        
                        <h3 className="text-xl font-black text-slate-900 mb-2 group-hover:text-primary transition-colors">{cat.name}</h3>
                        <div className="text-[10px] font-black text-slate-300 uppercase tracking-widest group-hover:text-slate-500 transition-all">Explore <i className="fas fa-chevron-right ml-1 text-[8px]"></i></div>
                    </Link>
                ))}
            </div>
        </div>
      </section>

      {/* Featured Products Section */}
      <section className="py-24 bg-slate-50 rounded-[4rem] mx-4">
        <div className="container-custom px-4 md:px-10 lg:px-16">
            <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-4">
                <div>
                     <div className="flex items-center gap-3 mb-4">
                        <div className="w-10 h-0.5 bg-primary" />
                        <span className="text-primary font-black tracking-[0.3em] text-[10px] uppercase">Staff Picks</span>
                    </div>
                    <h2 className="text-4xl font-black text-slate-900 mb-2 tracking-tighter">Featured Innovations</h2>
                    <p className="text-slate-500 font-medium">Hand-picked selection of premium devices just for you.</p>
                </div>
                <Link to="/products" className="group flex items-center gap-3 text-primary font-black hover:text-primary-dark transition-colors uppercase text-xs tracking-widest">
                    View All Products <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1 shadow-sm" />
                </Link>
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">
                {featuredProducts.map(product => (
                    <ProductCard key={product.id} product={product} />
                ))}
            </div>
        </div>
      </section>

      {/* Promo Banner Section */}
      <section className="py-20 md:py-32 px-4">
        <div className="container-custom">
            <div className="relative rounded-4xl md:rounded-[3.5rem] overflow-hidden bg-slate-900 min-h-[400px] md:min-h-[500px] flex items-center premium-shadow-lg group">
                <div className="absolute inset-0">
                    <img 
                        src="https://images.unsplash.com/photo-1526045431048-f857369baa09?q=80&w=1920&auto=format&fit=crop" 
                        alt="Promo Banner" 
                        className="w-full h-full object-cover opacity-40 transition-transform duration-7000 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-linear-to-r from-slate-900 via-slate-900/60 to-transparent"></div>
                </div>
                <div className="relative z-10 p-8 sm:p-12 md:p-24 max-w-2xl text-white">
                    <div className="bg-primary/20 backdrop-blur-md border border-primary/30 text-primary text-[10px] font-black px-4 py-1.5 rounded-full uppercase tracking-[0.2em] mb-6 md:mb-8 inline-block">
                        Proprietary Offer
                    </div>
                    <h2 className="text-3xl sm:text-5xl md:text-7xl font-black mb-6 md:mb-10 leading-[1.1] md:leading-[0.9] tracking-tighter">The Future of Mobile Tech is Here.</h2>
                    <p className="text-slate-200 text-base md:text-xl mb-8 md:mb-12 font-medium leading-relaxed">Upgrade your lifestyle with our exclusive smart tech collection. Limited time advantageous pricing applied.</p>
                    <Link to="/products?category=wearable" className="inline-flex items-center gap-3 md:gap-4 bg-white text-slate-900 hover:bg-primary hover:text-white font-black px-8 py-4 md:px-12 md:py-6 rounded-2xl transition-all hover:scale-105 shadow-2xl text-sm md:text-base">
                        Acquire Now <ArrowRight className="w-5 h-5 md:w-6 md:h-6" />
                    </Link>
                </div>
            </div>
        </div>
      </section>

      {/* Best Sellers Section */}
      <section className="py-24 bg-white">
        <div className="container-custom px-4 md:px-10 lg:px-16">
            <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-4">
                <div>
                     <div className="flex items-center gap-3 mb-4">
                        <div className="w-10 h-0.5 bg-primary" />
                        <span className="text-primary font-black tracking-[0.3em] text-[10px] uppercase">Top Rated</span>
                    </div>
                    <h2 className="text-4xl font-black text-slate-900 mb-2 tracking-tighter">Market Hall of Fame</h2>
                    <p className="text-slate-500 font-medium">Our most popular products based on sales and reviews.</p>
                </div>
                <Link to="/products?sort=rating" className="group flex items-center gap-3 text-slate-400 hover:text-primary transition-colors font-black uppercase text-[10px] tracking-[0.2em]">
                    View Top Rated
                </Link>
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">
                {bestSellers.map(product => (
                    <ProductCard key={product.id} product={product} />
                ))}
            </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-20 md:py-32 bg-slate-900 text-white overflow-hidden relative rounded-4xl md:rounded-[4rem] mx-4">
        {/* Background Elements */}
        <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
            <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/10 rounded-full blur-[120px] opacity-30"></div>
            <div className="absolute bottom-1/4 right-1/4 w-[500px] h-[500px] bg-blue-600/10 rounded-full blur-[160px] opacity-30"></div>
        </div>

        <div className="container-custom px-4 md:px-10 lg:px-16 relative z-10">
            <div className="text-center mb-16 md:mb-24">
                <span className="text-primary font-black tracking-[0.5em] uppercase text-[10px] mb-6 block">Elite Feedback</span>
                <h2 className="text-3xl md:text-6xl font-black mb-4 tracking-tighter">What Our Clients Say</h2>
                <div className="w-20 h-1.5 bg-primary mx-auto rounded-full"></div>
            </div>
            
            <div className="relative w-full">
                <div className="flex w-max animate-scroll hover:pause py-4">
                    {/* First Set of Testimonials */}
                    <div className="flex gap-6 md:gap-10 px-5">
                        {[
                            { name: 'Sarah Ahmed', role: 'Verified Buyer', text: 'The delivery was impeccably fast! Got my iPhone 15 Pro Max within 24 hours. Highly recommended!', initial: 'S', color: 'bg-primary' },
                            { name: 'Bilal Khan', role: 'Tech Enthusiast', text: 'Market leading prices. The warranty support is also very responsive. An elevated experience overall.', initial: 'B', color: 'bg-blue-600' },
                            { name: 'Ayesha Malik', role: 'Verified Buyer', text: 'Loved the packaging and the care they took with the product. Will definitely be a returning client.', initial: 'A', color: 'bg-indigo-600' },
                            { name: 'Usman Ali', role: 'Professional', text: 'The team guided me perfectly through the selection process. Synergy has set a new standard.', initial: 'U', color: 'bg-emerald-600' }
                        ].map((item, idx) => (
                            <div key={`testi-1-${idx}`} className="w-[280px] sm:w-[350px] md:w-[450px] bg-white/5 backdrop-blur-xl p-8 md:p-12 rounded-4xl border border-white/5 hover:border-primary/50 transition-all duration-700 hover:-translate-y-4 hover:shadow-2xl">
                                <div className="flex justify-between items-start mb-6 md:mb-8">
                                    <div className="flex gap-1 md:gap-1.5 text-yellow-500">
                                        {[...Array(5)].map((_, i) => <Star key={i} className="w-3 h-3 md:w-4 md:h-4 fill-current" />)}
                                    </div>
                                    <div className="opacity-10 text-4xl md:text-6xl font-black italic text-primary">"</div>
                                </div>
                                <p className="text-slate-200 mb-8 md:mb-10 text-base md:text-xl font-medium leading-relaxed italic">"{item.text}"</p>
                                <div className="flex items-center gap-4 md:gap-6 mt-auto">
                                    <div className={`w-10 h-10 md:w-14 md:h-14 ${item.color} rounded-xl md:rounded-2xl flex items-center justify-center font-black text-white text-lg md:text-2xl shadow-xl`}>
                                        {item.initial}
                                    </div>
                                    <div>
                                        <h4 className="font-black text-white text-sm md:text-lg">{item.name}</h4>
                                        <p className="text-[9px] md:text-[10px] font-black uppercase tracking-widest text-slate-500">{item.role}</p>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
      </section>

      {/* New Arrivals Section */}
      <section className="py-24 bg-white">
        <div className="container-custom px-4 md:px-10 lg:px-16">
            <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-4">
                <div>
                    <div className="flex items-center gap-3 mb-4">
                        <div className="w-10 h-0.5 bg-primary" />
                        <span className="text-primary font-black tracking-[0.3em] text-[10px] uppercase">Just Docked</span>
                    </div>
                    <h2 className="text-4xl font-black text-slate-900 mb-2 tracking-tighter">Current Releases</h2>
                    <p className="text-slate-500 font-medium">Check out the latest additions to our curated store.</p>
                </div>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">
                {newArrivals.map(product => (
                    <ProductCard key={product.id} product={product} />
                ))}
            </div>
        </div>
      </section>
    </div>
  );
};

export default HomePage;
