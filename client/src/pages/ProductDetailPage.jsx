import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useShop } from '../context/ShopContext';
import VideoModal from '../components/VideoModal';

const ProductDetailPage = () => {
  const { slug } = useParams();
  const { products, addToCart } = useShop();
  const [product, setProduct] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [selectedColor, setSelectedColor] = useState(null);
  const [selectedImage, setSelectedImage] = useState(null);
  const [videoModalOpen, setVideoModalOpen] = useState(false);
  const [currentVideoUrl, setCurrentVideoUrl] = useState('');

  const getYouTubeId = (url) => {
    const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
    const match = url.match(regExp);
    return (match && match[2].length === 11) ? match[2] : null;
  };

  const openVideo = (url) => {
    setCurrentVideoUrl(url);
    setVideoModalOpen(true);
  };

  const handleAddToCart = () => {
    if (product) {
      addToCart(product.id, quantity);
      alert('Product added to cart!');
    }
  };

  useEffect(() => {
    if (products.length > 0 && slug) {
      // Try to find by slug first
      let found = products.find(p => p.slug === slug);
      
      // If not found, try available ID formats (Mongo _id or numeric id)
      if (!found) {
        found = products.find(p => p._id === slug || (p.id && p.id === parseInt(slug)));
      }
      
      if (found) {
        setProduct(found);
        setSelectedColor(found.colors && found.colors.length > 0 ? found.colors[0] : null);
        setSelectedImage(found.images && found.images.length > 0 ? found.images[0] : found.image);
      }
    }
  }, [products, slug]);

  if (!product) {
    return (
      <div className="min-h-screen flex justify-center items-center bg-gray-50">
        <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-primary"></div>
      </div>
    );
  }

  const discount = product.originalPrice ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100) : 0;
  const allVideos = [
    ...(product.videos || []),
    ...(product.youtubeVideo ? [{ type: 'youtube', url: product.youtubeVideo }] : [])
  ];

  const stars = Array(5).fill(0).map((_, i) => (
    <i key={i} className={`fas fa-star ${i < Math.floor(product.rating || 4.5) ? 'text-yellow-400' : 'text-gray-300'}`}></i>
  ));

  return (
    <div className="bg-gray-50 min-h-screen pb-20 pt-20 md:pt-28 lg:pt-32">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Breadcrumb */}
        <nav className="text-xs md:text-sm mb-6 md:mb-10 flex items-center gap-2 text-gray-500 overflow-x-auto whitespace-nowrap pb-2 no-scrollbar">
          <Link to="/" className="hover:text-primary transition-colors flex items-center gap-1 relative z-10">
             <i className="fas fa-home"></i> Home
          </Link>
          <i className="fas fa-chevron-right text-[10px] text-gray-400"></i>
          <Link to="/products" className="hover:text-primary transition-colors">Products</Link>
          <i className="fas fa-chevron-right text-[10px] text-gray-400"></i>
          <span className="text-gray-900 font-medium truncate">{product.name}</span>
        </nav>

        <div className="bg-white rounded-3xl lg:rounded-[2.5rem] shadow-xl overflow-hidden mb-12">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-0">
            {/* Gallery Section */}
            <div className="lg:col-span-7 p-6 sm:p-10 lg:p-16 bg-gray-50/50 flex flex-col">
              <div className="relative aspect-square flex items-center justify-center mb-6 sm:mb-10 group bg-white rounded-2xl md:rounded-4xl shadow-sm border border-gray-100 overflow-hidden">
                <img 
                  src={selectedImage} 
                  alt={product.name} 
                  className="max-w-full max-h-[300px] sm:max-h-[500px] object-contain p-6 sm:p-10 mix-blend-multiply transition-transform duration-700 group-hover:scale-110" 
                />
                {discount > 0 && (
                  <div className="absolute top-4 left-4 sm:top-8 sm:left-8 bg-secondary text-white text-xs sm:text-base font-black px-3 py-1.5 sm:px-5 sm:py-2.5 rounded-full shadow-xl shadow-secondary/20 z-10">
                    -{discount}% OFF
                  </div>
                )}
                 <button className="absolute top-4 right-4 sm:top-8 sm:right-8 w-10 h-10 sm:w-14 sm:h-14 flex items-center justify-center rounded-full bg-white shadow-md text-gray-400 hover:text-red-500 hover:bg-red-50 transition-all duration-300 z-10">
                  <i className="far fa-heart text-lg sm:text-xl"></i>
                </button>
              </div>

              {/* Thumbnails - Only show if we have images */}
              {(product.images && product.images.length > 1) && (
                <div className="grid grid-cols-5 gap-3 sm:gap-4 max-w-md mx-auto lg:mx-0">
                  {product.images.map((img, index) => (
                    <div 
                      key={index} 
                      className={`cursor-pointer bg-white rounded-xl sm:rounded-2xl overflow-hidden aspect-square transition-all duration-300 p-2 flex items-center justify-center border-2 ${selectedImage === img ? 'border-primary shadow-lg scale-105' : 'border-transparent hover:border-gray-200'}`}
                      onClick={() => setSelectedImage(img)}
                    >
                      <img src={img} alt={`${product.name} ${index + 1}`} className="w-full h-full object-contain mix-blend-multiply" />
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Info Section */}
            <div className="lg:col-span-5 p-6 sm:p-10 lg:p-16 flex flex-col">
              <div className="flex flex-wrap items-center gap-3 mb-6">
                 <span className="bg-primary/10 text-primary text-[10px] font-black px-3 py-1.5 rounded-lg uppercase tracking-widest">{product.category}</span>
                 <div className="flex items-center gap-1.5 text-yellow-400 text-sm bg-yellow-50 px-3 py-1.5 rounded-lg border border-yellow-100/50">
                    {stars}
                    <span className="text-slate-400 font-black ml-2 text-[10px] uppercase tracking-wider">({product.reviews || 124} reviews)</span>
                 </div>
              </div>

              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-slate-900 mb-4 leading-[1.1] tracking-tight">{product.name}</h1>
              
              <div className="flex flex-wrap items-center gap-3 text-xs text-slate-400 mb-8 font-black uppercase tracking-widest">
                 <span>Brand: <span className="text-slate-600">{product.brand}</span></span>
                 <span className="w-1 h-1 bg-slate-300 rounded-full"></span>
                 <span>SKU: <span className="text-slate-600">SM-{product._id?.slice(-6) || product.id}</span></span>
              </div>

              <div className="flex items-end gap-4 mb-10 pb-10 border-b border-slate-100">
                <span className="text-4xl sm:text-5xl font-black text-primary tracking-tighter">PKR {product.price.toLocaleString()}</span>
                {product.originalPrice && (
                  <span className="text-lg sm:text-xl text-slate-300 line-through decoration-2 mb-1.5">PKR {product.originalPrice.toLocaleString()}</span>
                )}
              </div>

              {/* Description removed to avoid duplication */}

              {product.colors && product.colors.length > 0 && (
                <div className="mb-10">
                  <h3 className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] mb-4">Color: <span className="text-slate-900">{selectedColor?.name}</span></h3>
                  <div className="flex flex-wrap gap-3 sm:gap-4">
                    {product.colors.map((color, index) => (
                      <button 
                        key={index} 
                        className={`group relative w-12 h-12 sm:w-14 sm:h-14 rounded-2xl border-2 shadow-sm transition-all duration-300 flex items-center justify-center ${selectedColor === color ? 'border-primary ring-4 ring-primary/5 bg-slate-50' : 'border-slate-100 hover:border-slate-200 bg-white'}`}
                        onClick={() => setSelectedColor(color)}
                      >
                        <span 
                            className="w-8 h-8 sm:w-10 sm:h-10 rounded-xl shadow-inner block"
                            style={{ backgroundColor: color.value }}
                        ></span>
                      </button>
                    ))}
                  </div>
                </div>
              )}

              <div className="flex flex-col sm:flex-row gap-6 mb-10">
                 <div className="w-full sm:w-40">
                    <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">Quantity</label>
                    <div className="flex items-center border-2 border-gray-200 rounded-xl overflow-hidden h-14 bg-gray-50">
                      <button 
                        className="w-12 h-full flex items-center justify-center hover:bg-gray-200 text-gray-600 transition-colors font-bold text-xl" 
                        onClick={() => setQuantity(q => Math.max(1, q - 1))}
                      >-</button>
                      <input 
                        type="number" 
                        value={quantity} 
                        readOnly 
                        className="w-full h-full text-center bg-transparent border-none text-gray-900 font-bold focus:ring-0 text-lg p-0" 
                      />
                      <button 
                        className="w-12 h-full flex items-center justify-center hover:bg-gray-200 text-gray-600 transition-colors font-bold text-xl" 
                        onClick={() => setQuantity(q => q + 1)}
                      >+</button>
                    </div>
                 </div>
                 
                 <div className="flex-1">
                    <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-2 opacity-0">Action</label>
                    <button 
                      className="w-full bg-primary hover:bg-primary-dark text-white font-bold h-14 px-8 rounded-xl shadow-lg shadow-primary/30 hover:shadow-xl hover:shadow-primary/40 transform active:scale-[0.99] transition-all duration-300 flex items-center justify-center gap-3 text-lg" 
                      onClick={handleAddToCart}
                    >
                      <i className="fas fa-shopping-bag"></i> Add to Cart
                    </button>
                 </div>
              </div>

              <div className="grid grid-cols-2 gap-6 p-6 bg-gray-50 rounded-2xl border border-gray-100">
                 <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center text-xl">
                        <i className="fas fa-truck"></i>
                    </div>
                    <div>
                        <h4 className="font-bold text-gray-900 text-sm">Free Delivery</h4>
                        <p className="text-xs text-gray-500">For all orders over 5000</p>
                    </div>
                 </div>
                 <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-full bg-green-100 text-green-600 flex items-center justify-center text-xl">
                        <i className="fas fa-check-circle"></i>
                    </div>
                    <div>
                        <h4 className="font-bold text-gray-900 text-sm">In Stock</h4>
                        <p className="text-xs text-gray-500">Ready to ship today</p>
                    </div>
                 </div>
                 <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-full bg-orange-100 text-orange-600 flex items-center justify-center text-xl">
                        <i className="fas fa-shield-alt"></i>
                    </div>
                    <div>
                        <h4 className="font-bold text-gray-900 text-sm">1 Year Warranty</h4>
                        <p className="text-xs text-gray-500">Official manufacturer warranty</p>
                    </div>
                 </div>
                 <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-full bg-purple-100 text-purple-600 flex items-center justify-center text-xl">
                        <i className="fas fa-undo"></i>
                    </div>
                    <div>
                        <h4 className="font-bold text-gray-900 text-sm">Easy Returns</h4>
                        <p className="text-xs text-gray-500">30 day return policy</p>
                    </div>
                 </div>
              </div>
            </div>
          </div>
        </div>

        {/* Product Details Tabs / Additional Info */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
           <div className="lg:col-span-2 space-y-8">
              {/* Description */}
              <div className="bg-white rounded-3xl shadow-lg p-8">
                  <h3 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-3">
                      <span className="w-8 h-1 bg-primary rounded-full"></span>
                      Product Description
                  </h3>
                  <div className="prose max-w-none text-gray-600 leading-relaxed">
                      {product.description ? product.description.split('\n').map((line, index) => {
                          const trimmed = line.trim();
                          if (!trimmed) return <br key={index} />;
                          
                          if (trimmed.startsWith('-') || trimmed.startsWith('•')) {
                              return (
                                  <div key={index} className="flex gap-3 mb-2 pl-2">
                                      <span className="text-primary font-bold">•</span>
                                      <span>{trimmed.substring(1).trim()}</span>
                                  </div>
                              );
                          }
                          return <p key={index} className="mb-4">{line}</p>;
                      }) : <p>No description available.</p>}
                  </div>
              </div>
              
              {/* Videos */}
              {(allVideos.length > 0 || product.packagingVideo) && (
                <div className="bg-white rounded-3xl shadow-lg p-8">
                   <h3 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-3">
                      <span className="w-8 h-1 bg-primary rounded-full"></span>
                      Product Videos
                   </h3>
                   <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                      {allVideos.map((video, index) => {
                         const videoUrl = video.type === 'uploaded' ? video.url : video.url;
                         const thumbUrl = video.type === 'uploaded' 
                           ? null 
                           : `https://img.youtube.com/vi/${getYouTubeId(video.url)}/0.jpg`;
                         
                         return (
                          <div key={index} className="group cursor-pointer rounded-2xl overflow-hidden shadow-md relative aspect-video" onClick={() => openVideo(videoUrl)}>
                            {thumbUrl ? (
                              <img src={thumbUrl} alt={video.title || video.name} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" />
                            ) : (
                                <video className="w-full h-full object-cover">
                                    <source src={videoUrl} type={video.file?.type || 'video/mp4'} />
                                </video>
                            )}
                            <div className="absolute inset-0 bg-black/30 group-hover:bg-black/40 transition-colors flex items-center justify-center">
                              <div className="w-16 h-16 bg-white/20 backdrop-blur-md rounded-full flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                                <i className="fas fa-play text-white text-2xl ml-1"></i>
                              </div>
                            </div>
                            <div className="absolute bottom-0 left-0 right-0 p-4 bg-linear-to-t from-black/80 to-transparent">
                                <p className="text-white font-medium truncate">{video.title || video.name}</p>
                            </div>
                          </div>
                        );
                      })}
                   </div>
                </div>
              )}
           </div>

           {/* Sidebar / Related / Features */}
           <div className="lg:col-span-1">
               <div className="bg-white rounded-3xl shadow-lg p-8 sticky top-28">
                   <h3 className="text-xl font-bold text-gray-900 mb-6">Why Shop With Us?</h3>
                   <ul className="space-y-6">
                       <li className="flex gap-4">
                           <div className="w-10 h-10 rounded-full bg-primary/10 text-primary flex items-center justify-center shrink-0">
                               <i className="fas fa-award"></i>
                           </div>
                           <div>
                               <h4 className="font-bold text-gray-900">Official Distributor</h4>
                               <p className="text-sm text-gray-500">100% authentic products directly from brands.</p>
                           </div>
                       </li>
                       <li className="flex gap-4">
                           <div className="w-10 h-10 rounded-full bg-primary/10 text-primary flex items-center justify-center shrink-0">
                               <i className="fas fa-shipping-fast"></i>
                           </div>
                           <div>
                               <h4 className="font-bold text-gray-900">Fast Shipping</h4>
                               <p className="text-sm text-gray-500">Delivery within 2-3 business days nationwide.</p>
                           </div>
                       </li>
                       <li className="flex gap-4">
                           <div className="w-10 h-10 rounded-full bg-primary/10 text-primary flex items-center justify-center shrink-0">
                               <i className="fas fa-thumbs-up"></i>
                           </div>
                           <div>
                               <h4 className="font-bold text-gray-900">Satisfaction Guarantee</h4>
                               <p className="text-sm text-gray-500">Not happy? Return it within 30 days.</p>
                           </div>
                       </li>
                   </ul>
               </div>
           </div>
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

export default ProductDetailPage;
