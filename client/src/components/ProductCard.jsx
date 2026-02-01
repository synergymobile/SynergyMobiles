import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useShop } from '../context/ShopContext';
import { ShoppingCart, Star, Play } from 'lucide-react';

const ProductCard = ({ product }) => {
  const { addToCart, getImageUrl } = useShop();
  const [isHovered, setIsHovered] = useState(false);
  const [isImageLoading, setIsImageLoading] = useState(true);

  const handleAddToCart = (e) => {
    e.preventDefault();
    e.stopPropagation();
    addToCart(product.id);
  };

  /* Quick view handler removed */

  // Calculate discount percentage
  const discount = product.originalPrice > product.price 
    ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
    : 0;

  return (
    <div 
      className="group bg-white rounded-4xl border border-slate-100 overflow-hidden transition-all duration-500 hover-rise premium-shadow relative flex flex-col h-full"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Badges */}
      <div className="absolute top-4 left-4 z-10 flex flex-col gap-2 pointer-events-none">
        {discount > 0 && (
          <span className="bg-secondary text-white text-[10px] font-black px-3 py-1 rounded-full uppercase tracking-wider shadow-lg shadow-secondary/20">
            -{discount}% OFF
          </span>
        )}
        {product.isNewArrival && (
          <span className="bg-primary text-white text-[10px] font-black px-3 py-1 rounded-full uppercase tracking-wider shadow-lg shadow-primary/20">
            NEW
          </span>
        )}
      </div>

      {/* Video Link Button */}
      {product.videoLink && (
        <a 
          href={product.videoLink} 
          target="_blank" 
          rel="noopener noreferrer"
          className={`absolute top-4 right-4 z-20 w-10 h-10 bg-white text-slate-900 rounded-full flex items-center justify-center shadow-xl hover:bg-primary hover:text-white transition-all duration-500 transform ${isHovered ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-4 pointer-events-none'}`}
          title="Watch Review"
          onClick={(e) => e.stopPropagation()}
        >
          <Play className="w-4 h-4 fill-current ml-0.5" />
        </a>
      )}

      {/* Action Buttons (Right Side) Removed */}

      {/* Main Link Wrapper for Clickability */}
      {/* Main Link Wrapper for Clickability */}
      <Link to={`/product/${product.slug || product.id || product._id}`} className="grow flex flex-col">
        {/* Image Container - Enforced Aspect Ratio for Uniformity */}
        <div className="relative aspect-square p-10 bg-slate-50/50 group-hover:bg-slate-50 transition-colors duration-500 overflow-hidden">
          {isImageLoading && (
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-10 h-10 border-2 border-primary border-t-transparent rounded-full animate-spin"></div>
            </div>
          )}
          <img 
            src={getImageUrl(product.images && product.images.length > 0 ? product.images[0] : product.image)} 
            alt={product.name}
            onLoad={() => setIsImageLoading(false)}
            className={`w-full h-full object-contain mix-blend-multiply transition-all duration-700 ease-out ${isHovered ? 'scale-110 -rotate-2' : 'scale-100'} ${isImageLoading ? 'opacity-0' : 'opacity-100'}`}
          />
          
          {/* Add to Cart Overlay Button - Shows on Hover */}
          <div className={`absolute bottom-6 left-6 right-6 transition-all duration-500 transform ${isHovered ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
            <button 
              onClick={handleAddToCart}
              className="w-full bg-slate-900 hover:bg-primary text-white font-black py-4 rounded-2xl shadow-2xl flex items-center justify-center gap-3 transition-all active:scale-95 group/btn"
            >
              <ShoppingCart className="w-5 h-5 group-hover/btn:scale-110 transition-transform" />
              <span className="text-sm uppercase tracking-widest">Add to Cart</span>
            </button>
          </div>
        </div>

        {/* Product Info */}
        <div className="p-6 flex flex-col grow">
          <div className="flex items-center justify-between mb-3">
            <span className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">{product.brand}</span>
            <div className="flex items-center gap-1.5 px-2 py-1 bg-amber-50 rounded-lg text-amber-500 text-[10px] font-black">
              <Star className="w-3 h-3 fill-current" />
              <span>{product.rating}</span>
            </div>
          </div>

          <h3 className="font-bold text-slate-800 text-lg mb-4 line-clamp-2 min-h-14 group-hover:text-primary transition-colors leading-tight">
            {product.name}
          </h3>

          <div className="mt-auto pt-4 border-t border-slate-50 flex items-baseline justify-between">
            <div className="flex flex-col">
              {product.originalPrice > product.price && (
                <span className="text-xs text-slate-400 line-through mb-1">
                  PKR {product.originalPrice.toLocaleString()}
                </span>
              )}
              <span className="text-xl font-black text-slate-900 leading-none">
                <span className="text-primary text-xs mr-1 font-bold">PKR</span>
                {product.price.toLocaleString()}
              </span>
            </div>
            
            <button 
              onClick={handleAddToCart}
              className="md:hidden w-10 h-10 bg-primary text-white rounded-xl flex items-center justify-center shadow-lg"
            >
              <ShoppingCart className="w-5 h-5" />
            </button>
          </div>
        </div>
      </Link>
    </div>
  );
};

export default ProductCard;
