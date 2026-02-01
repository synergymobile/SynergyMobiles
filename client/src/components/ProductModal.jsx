import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useShop } from '../context/ShopContext';
import VideoModal from './VideoModal';
import { X, Star, ShoppingCart, Heart, Truck, ShieldCheck, Play, CheckCircle } from 'lucide-react';

const ProductModal = ({ product, isOpen, onClose }) => {
  const { addToCart, getImageUrl } = useShop();
  const [quantity, setQuantity] = useState(1);
  const [selectedColor, setSelectedColor] = useState(product?.colors?.[0] || null);
  const [selectedImage, setSelectedImage] = useState(product?.image || null);
  const [videoModalOpen, setVideoModalOpen] = useState(false);
  const [currentVideoUrl, setCurrentVideoUrl] = useState('');

  if (!isOpen || !product) return null;

  const discount = product.originalPrice ? 
    Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100) : 0;

  // Stars components for premium look
  const renderStars = () => {
    return (
      <div className="flex gap-1 text-amber-500">
        {[...Array(5)].map((_, i) => (
          <Star key={i} className={`w-3.5 h-3.5 ${i < Math.floor(product.rating) ? 'fill-current' : 'text-slate-200'}`} />
        ))}
      </div>
    );
  };

  const handleAddToCart = () => {
    addToCart(product.id, quantity);
    onClose();
  };

  const openVideo = (url) => {
    setCurrentVideoUrl(url);
    setVideoModalOpen(true);
  };

  const allVideos = [...(product.videos || []), ...(product.uploadedVideos || [])];

  return (
    <div 
      className={`fixed inset-0 z-100 flex items-center justify-center p-4 transition-all duration-500 ${isOpen ? 'opacity-100 visible' : 'opacity-0 invisible pointer-events-none'}`} 
    >
      <div className="absolute inset-0 bg-slate-900/60 backdrop-blur-xl transition-opacity" onClick={onClose}></div>
      
      <div className={`bg-white rounded-4xl w-full max-w-5xl max-h-[90vh] overflow-hidden relative shadow-[0_50px_100px_-20px_rgba(0,0,0,0.3)] z-10 flex flex-col md:flex-row transform transition-all duration-500 ease-out-expo ${isOpen ? 'scale-100 opacity-100 translate-y-0' : 'scale-95 opacity-0 translate-y-12'}`}>
        <button 
          className="absolute top-6 right-6 w-12 h-12 flex items-center justify-center rounded-2xl bg-slate-50 text-slate-400 hover:bg-secondary hover:text-white transition-all duration-300 z-50 group shadow-md" 
          onClick={onClose}
        >
          <X className="w-6 h-6 transform group-hover:rotate-90 transition-transform duration-300" />
        </button>
        
        {/* Gallery Section - Left Side */}
        <div className="w-full md:w-5/12 bg-slate-50 p-10 flex flex-col">
          <div className="relative grow flex items-center justify-center min-h-[350px] mb-10 group">
             <div className="absolute inset-0 bg-white/50 rounded-full blur-3xl opacity-20 scale-75"></div>
            <img 
              src={getImageUrl(selectedImage)} 
              alt={product.name} 
              className="max-w-full max-h-[450px] object-contain mix-blend-multiply transition-all duration-700 group-hover:scale-110 drop-shadow-2xl relative z-10" 
            />
            
            <div className="absolute top-0 left-0 flex flex-col gap-3 z-20">
                {discount > 0 && (
                <div className="bg-secondary text-white text-[10px] font-black px-4 py-1.5 rounded-full shadow-2xl shadow-secondary/20 tracking-widest">
                    -{discount}% OFF
                </div>
                )}
                {product.isNewArrival && (
                <div className="bg-primary text-white text-[10px] font-black px-4 py-1.5 rounded-full shadow-2xl shadow-primary/20 tracking-widest">
                    NEW ARRIVAL
                </div>
                )}
            </div>
          </div>
          
          <div className="flex gap-4 overflow-x-auto pb-4 custom-scrollbar justify-center">
            {product.images && product.images.map((img, index) => (
              <button 
                key={index} 
                className="w-20 h-20 shrink-0 bg-white rounded-3xl border-4 cursor-pointer transition-all duration-300 p-2 overflow-hidden shadow-sm"
                onClick={() => setSelectedImage(img)}
              >
                <img src={getImageUrl(img)} alt={`${product.name} thumbnail`} className="w-full h-full object-contain mix-blend-multiply" />
              </button>
            ))}
          </div>
        </div>

        {/* Info Section - Right Side */}
        <div className="w-full md:w-7/12 p-10 md:p-14 flex flex-col overflow-y-auto bg-white custom-scrollbar">
          <div className="flex items-center gap-3 mb-6">
            <span className="text-[10px] font-black tracking-[0.2em] text-primary bg-primary/5 border border-primary/10 px-3 py-1.5 rounded-full uppercase">{product.category}</span>
            {product.stock > 0 ? (
                <span className="text-[10px] font-black tracking-[0.2em] text-emerald-500 bg-emerald-50 px-3 py-1.5 rounded-full uppercase flex items-center gap-1.5"><CheckCircle className="w-3.5 h-3.5" /> Direct Stock</span>
            ) : (
                <span className="text-[10px] font-black tracking-[0.2em] text-rose-500 bg-rose-50 px-3 py-1.5 rounded-full uppercase">Sold Out</span>
            )}
          </div>

          <h2 className="text-4xl md:text-5xl font-black text-slate-900 mb-4 leading-none tracking-tighter">{product.name}</h2>
          
          <div className="flex items-center gap-6 mb-8 pt-2">
             <div className="text-xs font-black uppercase tracking-widest text-slate-400">Brand: <span className="text-slate-900">{product.brand}</span></div>
             <div className="w-1 h-1 bg-slate-200 rounded-full"></div>
             <div className="flex items-center gap-3">
                {renderStars()}
                <span className="text-[10px] text-slate-400 font-black uppercase tracking-widest">{product.reviews} Reviews</span>
             </div>
          </div>
          
          <div className="flex items-baseline gap-6 mb-10">
            <span className="text-5xl font-black text-slate-900 tracking-tighter">
                <span className="text-primary text-lg mr-2 font-bold">PKR</span>
                {product.price.toLocaleString()}
            </span>
            {product.originalPrice && (
              <span className="text-xl text-slate-300 line-through decoration-2 font-black">PKR {product.originalPrice.toLocaleString()}</span>
            )}
          </div>
          
          <p className="text-slate-500 mb-10 leading-relaxed text-lg font-medium border-l-4 border-slate-100 pl-6 py-2">{product.description}</p>
          
          {product.colors && product.colors.length > 0 && (
            <div className="mb-10">
              <h4 className="font-black text-xs uppercase tracking-[0.2em] text-slate-400 mb-5 flex items-center justify-between">
                <span>Vibrant Selection</span>
                <span className="text-slate-900">{selectedColor?.name}</span>
              </h4>
              <div className="flex flex-wrap gap-4">
                {product.colors.map((color, index) => (
                  <button 
                    key={index} 
                    className={`group relative w-12 h-12 rounded-2xl border-2 shadow-sm transition-all duration-300 flex items-center justify-center ${selectedColor === color ? 'border-primary ring-4 ring-primary/10 bg-slate-50' : 'border-slate-100 hover:border-slate-200 bg-white'}`}
                    onClick={() => setSelectedColor(color)}
                  >
                    <span 
                        className="w-8 h-8 rounded-xl shadow-inner block transform transition-transform group-hover:scale-90"
                        style={{ backgroundColor: color.value }}
                    ></span>
                  </button>
                ))}
              </div>
            </div>
          )}
          
          <div className="flex flex-col sm:flex-row gap-6 mb-12">
            <div className="w-full sm:w-40">
                <label className="block text-[10px] font-black text-slate-400 uppercase tracking-widest mb-3">Quantity</label>
                <div className="flex items-center border-2 border-slate-100 rounded-2xl overflow-hidden h-14 bg-slate-50 p-1">
                  <button 
                    className="w-12 h-full flex items-center justify-center hover:bg-white hover:shadow-sm rounded-xl text-slate-900 transition-all font-black text-lg" 
                    onClick={() => setQuantity(q => Math.max(1, q - 1))}
                  >-</button>
                  <input 
                    type="number" 
                    value={quantity} 
                    readOnly 
                    className="w-full h-full text-center bg-transparent border-none text-slate-900 font-black focus:ring-0 p-0 text-lg" 
                  />
                  <button 
                    className="w-12 h-full flex items-center justify-center hover:bg-white hover:shadow-sm rounded-xl text-slate-900 transition-all font-black text-lg" 
                    onClick={() => setQuantity(q => q + 1)}
                  >+</button>
                </div>
            </div>
            
            <div className="flex-1 flex gap-4">
                <button 
                  className="flex-1 bg-slate-900 hover:bg-primary text-white font-black py-4 px-10 rounded-[1.25rem] shadow-2xl shadow-slate-900/10 hover:shadow-primary/40 active:scale-[0.98] transition-all duration-500 flex items-center justify-center gap-4 text-lg" 
                  onClick={handleAddToCart}
                >
                  <ShoppingCart className="w-6 h-6" /> Add to Advantage
                </button>
                <button className="w-14 h-14 flex items-center justify-center rounded-[1.25rem] border-2 border-slate-100 text-slate-300 hover:text-secondary hover:border-secondary/20 hover:bg-secondary/5 transition-all duration-300">
                  <Heart className="w-6 h-6" />
                </button>
            </div>
          </div>
          
          <div className="grid grid-cols-2 gap-y-6 text-sm mt-auto pt-10 border-t border-slate-50 font-bold text-slate-400">
             <div className="flex items-center gap-4 group">
                <div className="w-10 h-10 rounded-2xl bg-blue-50 flex items-center justify-center text-blue-500 group-hover:bg-blue-500 group-hover:text-white transition-all">
                    <Truck className="w-5 h-5" />
                </div>
                <span>Global Logistics</span>
             </div>
             <div className="flex items-center gap-4 group">
                <div className="w-10 h-10 rounded-2xl bg-rose-50 flex items-center justify-center text-rose-500 group-hover:bg-rose-500 group-hover:text-white transition-all">
                    <ShieldCheck className="w-5 h-5" />
                </div>
                <span>Elite Warranty</span>
             </div>
          </div>

          {(allVideos.length > 0 || product.packagingVideo) && (
            <div className="mt-12 pt-8 border-t border-slate-50">
              <button 
                className="flex items-center gap-3 text-primary font-black hover:text-primary-dark transition-all group"
                onClick={() => openVideo(getImageUrl(allVideos[0]?.url || product.packagingVideo))}
              >
                <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform">
                    <Play className="w-5 h-5 fill-current" />
                </div>
                <span className="tracking-widest uppercase text-xs">Watch Cinematic Showcase</span>
              </button>
            </div>
          )}
        </div>
      </div>
      
      <VideoModal 
        isOpen={videoModalOpen} 
        onClose={() => setVideoModalOpen(false)} 
        videoUrl={currentVideoUrl} 
      />
    </div>
  );
};

export default ProductModal;
