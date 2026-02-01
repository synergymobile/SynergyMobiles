import React, { useState } from 'react';
import { useShop } from '../context/ShopContext';

const CheckoutModal = ({ isOpen, onClose }) => {
  const { cart, cartTotal } = useShop();
  
  if (!isOpen) return null;

  const handleWhatsAppCheckout = () => {
    const phoneNumber = "923009786786"; // Synergy Mobiles Contact
    let message = `*New Order Request*\n\n`;
    
    message += `*Order Details:*\n`;
    cart.forEach(item => {
        message += `- ${item.name} x ${item.quantity}: PKR ${(item.price * item.quantity).toLocaleString()}\n`;
    });

    message += `\n*Total Amount:* PKR ${(cartTotal + 200).toLocaleString()}\n`;
    message += `(Shipping included: PKR 200)\n\n`;
    message += `I would like to place this order. Please confirm availability and delivery details.`;

    const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;
    
    // Open WhatsApp
    window.open(whatsappUrl, '_blank');
    
    // Close modal
    onClose();
  };

  return (
    <div 
      className={`fixed inset-0 z-50 flex items-center justify-center p-4 transition-all duration-300 ${isOpen ? 'opacity-100 visible' : 'opacity-0 invisible pointer-events-none'}`} 
      id="checkoutModal"
    >
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={onClose}></div>
      <div className="bg-white rounded-xl w-full max-w-lg overflow-hidden relative shadow-2xl z-10 flex flex-col animate-scale-up">
        <div className="absolute top-4 right-4 z-20">
          <button className="w-8 h-8 flex items-center justify-center rounded-full bg-gray-100 hover:bg-red-500 hover:text-white transition-colors" onClick={onClose}>&times;</button>
        </div>
        
        <div className="p-8 text-center">
          <div className="w-20 h-20 bg-[#25D366]/10 rounded-full flex items-center justify-center mx-auto mb-6">
            <i className="fab fa-whatsapp text-[#25D366] text-4xl"></i>
          </div>
          
          <h2 className="text-2xl font-bold text-gray-900 mb-3">Order via WhatsApp</h2>
          <p className="text-gray-600 mb-8">
            We process all orders directly through WhatsApp for a faster and more personal experience. Click the button below to send your order details to our team.
          </p>

          <div className="bg-gray-50 p-4 rounded-lg mb-8 border border-gray-100 text-left">
            <h3 className="font-semibold text-gray-800 mb-3 border-b border-gray-200 pb-2">Order Summary</h3>
            <div className="space-y-2 mb-3 max-h-40 overflow-y-auto custom-scrollbar">
              {cart.map(item => (
                <div key={item.id || item._id} className="flex justify-between text-sm text-gray-600">
                  <span>{item.name} × {item.quantity}</span>
                  <span>PKR {(item.price * item.quantity).toLocaleString()}</span>
                </div>
              ))}
            </div>
            <div className="flex justify-between font-bold text-gray-900 pt-3 border-t border-gray-200">
              <span>Total (inc. shipping)</span>
              <span className="text-primary">PKR {(cartTotal + 200).toLocaleString()}</span>
            </div>
          </div>
          
          <button 
            onClick={handleWhatsAppCheckout}
            className="w-full py-4 bg-[#25D366] text-white rounded-xl hover:bg-[#128C7E] transition-all shadow-lg hover:shadow-xl font-bold text-lg flex items-center justify-center gap-3 transform active:scale-95"
          >
            <i className="fab fa-whatsapp text-2xl"></i> Proceed to WhatsApp
          </button>
          
          <p className="text-xs text-gray-400 mt-4">
            You will be redirected to WhatsApp to confirm your delivery details.
          </p>
        </div>
      </div>
    </div>
  );
};

export default CheckoutModal;
