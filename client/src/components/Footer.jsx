import React from 'react';
import { Link } from 'react-router-dom';
import Logo from './Logo';

const Footer = () => {
  return (
    <footer className="bg-slate-900 text-slate-300 pt-24 pb-12 selection:bg-primary selection:text-white">
      <div className="container-custom px-6 md:px-10 lg:px-16">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-12 sm:gap-16 mb-20">
          <div className="flex flex-col gap-6 md:gap-8">
            <div className="mb-2">
              <Logo className="h-10 sm:h-12 w-auto" variant="light" />
            </div>
            <div className="text-sm leading-relaxed text-slate-400">
              <p className="mb-6 md:mb-8 font-medium">Synergy Mobiles represents the pinnacle of mobile technology retail in Pakistan. We curate only the most elite smartphones and wearables to elevate your digital lifestyle.</p>
              <div className="flex gap-3 sm:gap-4 flex-wrap">
                {[
                  { icon: "facebook-f", link: "#", color: "hover:bg-blue-600" },
                  
                  { icon: "instagram", link: "#", color: "hover:bg-pink-600" },
                  { icon: "youtube", link: "#", color: "hover:bg-red-600" },
                  { icon: "whatsapp", link: "#", color: "hover:bg-emerald-500" }
                ].map((social, idx) => (
                  <a href={social.link} key={idx} className={`w-11 h-11 bg-slate-800/50 backdrop-blur-sm rounded-2xl flex items-center justify-center text-slate-400 ${social.color} hover:text-white transition-all duration-500 hover:-translate-y-1 shadow-lg`}>
                    <i className={`fab fa-${social.icon}`}></i>
                  </a>
                ))}
              </div>
            </div>
          </div>
          
          <div>
            <h3 className="text-xl font-bold text-white mb-6 relative after:content-[''] after:absolute after:left-0 after:-bottom-2 after:w-12 after:h-1 after:bg-primary">Quick Links</h3>
            <ul className="flex flex-col gap-3">
              <li><Link to="/" className="text-gray-400 hover:text-primary hover:pl-2 transition-all duration-300 flex items-center gap-2"><i className="fas fa-chevron-right text-xs"></i> Home</Link></li>
              <li><Link to="/about" className="text-gray-400 hover:text-primary hover:pl-2 transition-all duration-300 flex items-center gap-2"><i className="fas fa-chevron-right text-xs"></i> About Us</Link></li>
              <li><Link to="/contact" className="text-gray-400 hover:text-primary hover:pl-2 transition-all duration-300 flex items-center gap-2"><i className="fas fa-chevron-right text-xs"></i> Contact Us</Link></li>
              <li><Link to="/privacy" className="text-gray-400 hover:text-primary hover:pl-2 transition-all duration-300 flex items-center gap-2"><i className="fas fa-chevron-right text-xs"></i> Privacy Policy</Link></li>
              <li><Link to="/terms" className="text-gray-400 hover:text-primary hover:pl-2 transition-all duration-300 flex items-center gap-2"><i className="fas fa-chevron-right text-xs"></i> Terms & Conditions</Link></li>
              <li><Link to="/returns" className="text-gray-400 hover:text-primary hover:pl-2 transition-all duration-300 flex items-center gap-2"><i className="fas fa-chevron-right text-xs"></i> Return Policy</Link></li>
             
            </ul>
          </div>
          
          <div>
            <h3 className="text-xl font-bold text-white mb-6 relative after:content-[''] after:absolute after:left-0 after:-bottom-2 after:w-12 after:h-1 after:bg-primary">Categories</h3>
            <ul className="flex flex-col gap-3">
              <li><Link to="/products?category=smartphone" className="text-gray-400 hover:text-primary hover:pl-2 transition-all duration-300 flex items-center gap-2"><i className="fas fa-chevron-right text-xs"></i> Smartphones</Link></li>
              <li><Link to="/products?category=tablet" className="text-gray-400 hover:text-primary hover:pl-2 transition-all duration-300 flex items-center gap-2"><i className="fas fa-chevron-right text-xs"></i> Tablets</Link></li>
              <li><Link to="/products?category=accessory" className="text-gray-400 hover:text-primary hover:pl-2 transition-all duration-300 flex items-center gap-2"><i className="fas fa-chevron-right text-xs"></i> Accessories</Link></li>
              <li><Link to="/products?category=wearable" className="text-gray-400 hover:text-primary hover:pl-2 transition-all duration-300 flex items-center gap-2"><i className="fas fa-chevron-right text-xs"></i> Wearables</Link></li>
              <li><Link to="/products?category=accessory" className="text-gray-400 hover:text-primary hover:pl-2 transition-all duration-300 flex items-center gap-2"><i className="fas fa-chevron-right text-xs"></i> Power Banks</Link></li>
              <li><Link to="/products?category=audio" className="text-gray-400 hover:text-primary hover:pl-2 transition-all duration-300 flex items-center gap-2"><i className="fas fa-chevron-right text-xs"></i> Audio Devices</Link></li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-xl font-bold text-white mb-6 relative after:content-[''] after:absolute after:left-0 after:-bottom-2 after:w-12 after:h-1 after:bg-primary">Contact Info</h3>
            <ul className="flex flex-col gap-4 mb-6">
              <li><a href="#" className="text-gray-400 hover:text-primary transition-colors flex items-start gap-3"><i className="fas fa-map-marker-alt mt-1 text-primary"></i> <span>Main Branch: Liberty Market, Lahore</span></a></li>
              <li><a href="#" className="text-gray-400 hover:text-primary transition-colors flex items-center gap-3"><i className="fas fa-phone text-primary"></i> +92 300 9786786</a></li>
              <li><a href="#" className="text-gray-400 hover:text-primary transition-colors flex items-center gap-3"><i className="fas fa-envelope text-primary"></i> admin@synergymobiles.com</a></li>
              <li><a href="#" className="text-gray-400 hover:text-primary transition-colors flex items-center gap-3"><i className="fas fa-clock text-primary"></i> Mon-Sat: 10:00 AM - 10:00 PM</a></li>
            </ul>
            <h4 className="text-white font-semibold mb-4 text-base">Payment Methods</h4>
            <div className="flex gap-3 flex-wrap">
              <div className="w-12 h-8 bg-white rounded flex items-center justify-center shadow-md opacity-90 hover:opacity-100 transition-opacity" title="Cash on Delivery">
                <i className="fas fa-money-bill-wave text-green-600 text-lg"></i>
              </div>
              <div className="w-12 h-8 bg-white rounded flex items-center justify-center shadow-md opacity-90 hover:opacity-100 transition-opacity" title="Visa">
                <i className="fab fa-cc-visa text-blue-900 text-2xl"></i>
              </div>
              <div className="w-12 h-8 bg-white rounded flex items-center justify-center shadow-md opacity-90 hover:opacity-100 transition-opacity" title="Mastercard">
                <i className="fab fa-cc-mastercard text-red-600 text-2xl"></i>
              </div>
              <div className="w-12 h-8 bg-white rounded flex items-center justify-center shadow-md opacity-90 hover:opacity-100 transition-opacity" title="American Express">
                <i className="fab fa-cc-amex text-blue-500 text-2xl"></i>
              </div>
              <div className="w-12 h-8 bg-white rounded flex items-center justify-center shadow-md opacity-90 hover:opacity-100 transition-opacity" title="PayPal">
                <i className="fab fa-cc-paypal text-blue-800 text-2xl"></i>
              </div>
            </div>
          </div>
        </div>
        
        <div className="border-t border-gray-800 pt-8 text-center text-sm text-gray-500">
          <p>&copy; 2026 Synergy Mobiles. All rights reserved. | Pakistan's #1 Mobile Retailer</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
