import React, { useState } from 'react';
import { useShop } from '../context/ShopContext';

const CheckoutModal = ({ isOpen, onClose }) => {
  const { cart, cartTotal, placeOrder, isUserLoggedIn, user } = useShop();
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    fullName: user?.name || '',
    email: user?.email || '',
    phone: '',
    address: '',
    city: '',
    postalCode: '',
    paymentMethod: 'cod',
    transactionId: '',
    agreeTerms: false
  });

  // Update form if user data loads
  useState(() => {
    if (user) {
        setFormData(prev => ({
            ...prev,
            fullName: user.name,
            email: user.email
        }));
    }
  }, [user]);

  if (!isOpen) return null;

  const handleInputChange = (e) => {
    const { id, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [id]: type === 'checkbox' ? checked : value
    }));
  };

  const handlePaymentMethodSelect = (method) => {
    setFormData(prev => ({ ...prev, paymentMethod: method }));
  };

  const validateShipping = () => {
    return formData.fullName && formData.email && formData.phone && formData.address && formData.city;
  };

  const nextStep = () => {
    if (step === 1 && !isUserLoggedIn) {
        return; // Button is handled below
    }
    if (step === 1 && !validateShipping()) {
      alert('Please fill in all required fields');
      return;
    }
    setStep(prev => prev + 1);
  };

  const prevStep = () => {
    setStep(prev => prev - 1);
  };

  const handlePlaceOrder = async () => {
    if (!formData.agreeTerms) {
      alert('Please agree to the Terms & Conditions');
      return;
    }
    
    if (formData.paymentMethod === 'cod' && !formData.transactionId) {
        alert('Please enter the transaction ID for the advance payment');
        return;
    }

    // Construct WhatsApp Message (Create before placing order as cart gets cleared)
    const phoneNumber = "923001234567"; // Synergy Mobiles Contact
    let message = `*New Order Request*\n\n`;
    message += `*Customer Details:*\n`;
    message += `Name: ${formData.fullName}\n`;
    message += `Phone: ${formData.phone}\n`;
    message += `Address: ${formData.address}, ${formData.city}\n\n`;

    message += `*Order Details:*\n`;
    cart.forEach(item => {
        message += `- ${item.name} x ${item.quantity}: PKR ${(item.price * item.quantity).toLocaleString()}\n`;
    });

    message += `\n*Total Amount:* PKR ${(cartTotal + 200).toLocaleString()}\n`;
    message += `Payment Method: ${getPaymentMethodName(formData.paymentMethod)}\n`;

    if (formData.paymentMethod === 'cod' && formData.transactionId) {
         message += `Transaction ID: ${formData.transactionId}\n`;
    }

    const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;

    const result = await placeOrder(formData);
    if (result.success) {
        setOrderNumber(result.id);
        setStep(4);
        // Redirect to WhatsApp
        window.open(whatsappUrl, '_blank');
    } else {
        alert(result.message);
        // Optional: Offer WhatsApp fallback if API fails
        if (confirm("Order saving failed. Do you want to send your order via WhatsApp directly?")) {
            window.open(whatsappUrl, '_blank');
        }
    }
  };

  const getPaymentMethodName = (method) => {
    switch(method) {
      case 'cod': return 'Cash on Delivery';
      case 'card': return 'Credit/Debit Card';
      case 'bank': return 'Bank Transfer';
      case 'jazzcash': return 'JazzCash';
      default: return 'Cash on Delivery';
    }
  };

  const renderShippingStep = () => (
    <div className="animate-fade-in relative">
      {!isUserLoggedIn && (
        <div className="absolute inset-0 bg-white/60 backdrop-blur-[2px] z-10 flex items-center justify-center rounded-xl border border-dashed border-primary/20 p-8">
            <div className="text-center max-w-sm">
                <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                    <i className="fas fa-lock text-primary text-2xl"></i>
                </div>
                <h3 className="text-xl font-black text-slate-900 mb-2">Authentication Required</h3>
                <p className="text-slate-500 text-sm mb-6">Join the Synergy elite to proceed with your order and track your delivery.</p>
                <div className="flex flex-col gap-3">
                    <button 
                      onClick={() => { onClose(); window.location.href = '/login'; }} 
                      className="w-full py-3 bg-slate-900 text-white font-bold rounded-xl hover:bg-primary transition-all shadow-lg active:scale-95"
                    >
                      Authenticate Now
                    </button>
                    <button 
                      onClick={() => { onClose(); window.location.href = '/signup'; }} 
                      className="w-full py-3 bg-white text-slate-600 font-bold rounded-xl border border-slate-200 hover:bg-slate-50 transition-all"
                    >
                      Create Account
                    </button>
                </div>
            </div>
        </div>
      )}

      <div className="mb-6">
        <h3 className="text-lg font-semibold text-gray-800 mb-4 border-b border-gray-100 pb-2">Shipping Information</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="col-span-1 md:col-span-2">
            <label htmlFor="fullName" className="block text-sm font-medium text-gray-700 mb-1">Full Name *</label>
            <input type="text" id="fullName" className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-colors" placeholder="Enter your full name" required value={formData.fullName} onChange={handleInputChange} />
          </div>
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">Email Address *</label>
            <input type="email" id="email" className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-colors" placeholder="Enter your email" required value={formData.email} onChange={handleInputChange} />
          </div>
          <div>
            <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">Phone Number *</label>
            <input type="tel" id="phone" className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-colors" placeholder="Enter your phone number" required value={formData.phone} onChange={handleInputChange} />
          </div>
          <div className="col-span-1 md:col-span-2">
            <label htmlFor="address" className="block text-sm font-medium text-gray-700 mb-1">Shipping Address *</label>
            <textarea id="address" className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-colors" rows="3" placeholder="Enter complete shipping address" required value={formData.address} onChange={handleInputChange}></textarea>
          </div>
          <div>
            <label htmlFor="city" className="block text-sm font-medium text-gray-700 mb-1">City *</label>
            <input type="text" id="city" className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-colors" placeholder="Enter your city" required value={formData.city} onChange={handleInputChange} />
          </div>
          <div>
            <label htmlFor="postalCode" className="block text-sm font-medium text-gray-700 mb-1">Postal Code</label>
            <input type="text" id="postalCode" className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-colors" placeholder="Enter postal code" value={formData.postalCode} onChange={handleInputChange} />
          </div>
        </div>
      </div>
      
      <div className="bg-gray-50 p-4 rounded-lg mb-6 border border-gray-100">
        <h3 className="font-semibold text-gray-800 mb-3">Order Summary</h3>
        <div className="space-y-2 mb-3">
          {cart.map(item => (
            <div key={item.id || item._id} className="flex justify-between text-sm text-gray-600">
              <span>{item.name} × {item.quantity}</span>
              <span>PKR {(item.price * item.quantity).toLocaleString()}</span>
            </div>
          ))}
        </div>
        <div className="flex justify-between font-bold text-gray-900 pt-3 border-t border-gray-200">
          <span>Total</span>
          <span className="text-primary">PKR {(cartTotal + 200).toLocaleString()}</span>
        </div>
      </div>
      
      <div className="flex justify-end gap-3">
        <button type="button" className="px-6 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors" onClick={onClose}>Cancel</button>
        <button 
          type="button" 
          disabled={!isUserLoggedIn}
          className="px-6 py-2 bg-primary text-white rounded-lg hover:bg-primary-dark transition-colors font-medium disabled:opacity-50" 
          onClick={nextStep}
        >
          Proceed to Payment
        </button>
      </div>
    </div>
  );

  const renderPaymentStep = () => (
    <div className="animate-fade-in">
      <div className="mb-6">
        <h3 className="text-lg font-semibold text-gray-800 mb-4 border-b border-gray-100 pb-2">Select Payment Method</h3>
        
        <div className="space-y-3">
          <div 
            className={`flex items-center p-4 border rounded-lg cursor-pointer transition-all ${formData.paymentMethod === 'cod' ? 'border-primary bg-blue-50/50' : 'border-gray-200 hover:border-gray-300'}`} 
            onClick={() => handlePaymentMethodSelect('cod')}
          >
            <div className="w-10 h-10 rounded-full bg-blue-100 text-primary flex items-center justify-center mr-4">
              <i className="fas fa-truck"></i>
            </div>
            <div className="flex-1">
              <div className="font-semibold text-gray-900">Cash on Delivery (COD)</div>
              <div className="text-xs text-gray-500">Pay PKR 200 in advance, rest at delivery</div>
            </div>
            {formData.paymentMethod === 'cod' && <i className="fas fa-check-circle text-accent text-xl"></i>}
          </div>
          
          <div 
            className={`flex items-center p-4 border rounded-lg cursor-pointer transition-all ${formData.paymentMethod === 'card' ? 'border-primary bg-blue-50/50' : 'border-gray-200 hover:border-gray-300'}`} 
            onClick={() => handlePaymentMethodSelect('card')}
          >
            <div className="w-10 h-10 rounded-full bg-purple-100 text-purple-600 flex items-center justify-center mr-4">
              <i className="fas fa-credit-card"></i>
            </div>
            <div className="flex-1">
              <div className="font-semibold text-gray-900">Credit/Debit Card</div>
              <div className="text-xs text-gray-500">Pay securely with your card</div>
            </div>
            {formData.paymentMethod === 'card' && <i className="fas fa-check-circle text-accent text-xl"></i>}
          </div>
          
          <div 
            className={`flex items-center p-4 border rounded-lg cursor-pointer transition-all ${formData.paymentMethod === 'bank' ? 'border-primary bg-blue-50/50' : 'border-gray-200 hover:border-gray-300'}`} 
            onClick={() => handlePaymentMethodSelect('bank')}
          >
            <div className="w-10 h-10 rounded-full bg-green-100 text-green-600 flex items-center justify-center mr-4">
              <i className="fas fa-university"></i>
            </div>
            <div className="flex-1">
              <div className="font-semibold text-gray-900">Bank Transfer</div>
              <div className="text-xs text-gray-500">Transfer to our bank account</div>
            </div>
            {formData.paymentMethod === 'bank' && <i className="fas fa-check-circle text-accent text-xl"></i>}
          </div>
          
          <div 
            className={`flex items-center p-4 border rounded-lg cursor-pointer transition-all ${formData.paymentMethod === 'jazzcash' ? 'border-primary bg-blue-50/50' : 'border-gray-200 hover:border-gray-300'}`} 
            onClick={() => handlePaymentMethodSelect('jazzcash')}
          >
            <div className="w-10 h-10 rounded-full bg-red-100 text-red-600 flex items-center justify-center mr-4">
              <i className="fas fa-mobile-alt"></i>
            </div>
            <div className="flex-1">
              <div className="font-semibold text-gray-900">JazzCash</div>
              <div className="text-xs text-gray-500">Mobile wallet payment</div>
            </div>
            {formData.paymentMethod === 'jazzcash' && <i className="fas fa-check-circle text-accent text-xl"></i>}
          </div>
        </div>
        
        {formData.paymentMethod === 'cod' && (
          <div className="mt-4 p-4 bg-yellow-50 border border-yellow-100 rounded-lg text-sm text-yellow-800">
            <h4 className="font-semibold mb-2 flex items-center gap-2"><i className="fas fa-info-circle"></i> Cash on Delivery Instructions</h4>
            <ul className="list-disc pl-5 space-y-1">
              <li>Pay PKR 200 advance payment through JazzCash/transfer</li>
              <li>Provide transaction ID in next step</li>
              <li>Pay remaining amount when product is delivered</li>
              <li>Delivery within 3-5 business days</li>
            </ul>
          </div>
        )}

        {/* Add other payment info sections as needed */}
      </div>
      
      <div className="bg-gray-50 p-4 rounded-lg mb-6 border border-gray-100">
        <h3 className="font-semibold text-gray-800 mb-3">Order Summary</h3>
        <div className="space-y-2 mb-3">
          {cart.map(item => (
            <div key={item.id} className="flex justify-between text-sm text-gray-600">
              <span>{item.name} × {item.quantity}</span>
              <span>PKR {(item.price * item.quantity).toLocaleString()}</span>
            </div>
          ))}
        </div>
        <div className="flex justify-between font-bold text-gray-900 pt-3 border-t border-gray-200">
          <span>Total</span>
          <span className="text-primary">PKR {(cartTotal + 200).toLocaleString()}</span>
        </div>
      </div>
      
      <div className="flex justify-end gap-3">
        <button type="button" className="px-6 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors" onClick={prevStep}>Back</button>
        <button type="button" className="px-6 py-2 bg-primary text-white rounded-lg hover:bg-primary-dark transition-colors font-medium" onClick={nextStep}>Proceed to Confirmation</button>
      </div>
    </div>
  );

  const renderConfirmationStep = () => (
    <div className="animate-fade-in">
      <div className="mb-6">
        <h3 className="text-lg font-semibold text-gray-800 mb-4 border-b border-gray-100 pb-2">Order Confirmation</h3>
        
        <div className="bg-gray-50 p-4 rounded-lg mb-4 border border-gray-100">
          <h4 className="font-semibold text-gray-800 mb-2">Shipping Information</h4>
          <div className="text-sm text-gray-600 space-y-1">
            <p><strong className="text-gray-900">Name:</strong> {formData.fullName}</p>
            <p><strong className="text-gray-900">Email:</strong> {formData.email}</p>
            <p><strong className="text-gray-900">Phone:</strong> {formData.phone}</p>
            <p><strong className="text-gray-900">Address:</strong> {formData.address}</p>
            <p><strong className="text-gray-900">City:</strong> {formData.city}</p>
          </div>
        </div>
        
        <div className="bg-gray-50 p-4 rounded-lg mb-4 border border-gray-100">
          <h4 className="font-semibold text-gray-800 mb-2">Payment Method</h4>
          <p className="text-sm text-gray-600 mb-3"><strong className="text-gray-900">Selected:</strong> {getPaymentMethodName(formData.paymentMethod)}</p>
          {formData.paymentMethod === 'cod' && (
            <div className="mt-3 pt-3 border-t border-gray-200">
              <label htmlFor="transactionId" className="block text-sm font-medium text-gray-700 mb-1">Advance Payment Transaction ID *</label>
              <input type="text" id="transactionId" className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-colors" placeholder="Enter transaction ID for PKR 200 payment" required value={formData.transactionId} onChange={handleInputChange} />
              <p className="text-xs text-gray-500 mt-1">Provide JazzCash/transfer transaction ID for advance payment</p>
            </div>
          )}
        </div>
        
        <div className="bg-gray-50 p-4 rounded-lg mb-4 border border-gray-100">
          <h3 className="font-semibold text-gray-800 mb-3">Order Summary</h3>
          <div className="space-y-2 mb-3">
            {cart.map(item => (
              <div key={item.id} className="flex justify-between text-sm text-gray-600">
                <span>{item.name} × {item.quantity}</span>
                <span>PKR {(item.price * item.quantity).toLocaleString()}</span>
              </div>
            ))}
          </div>
          <div className="flex justify-between font-bold text-gray-900 pt-3 border-t border-gray-200">
            <span>Total</span>
            <span className="text-primary">PKR {(cartTotal + 200).toLocaleString()}</span>
          </div>
        </div>
        
        <div className="mt-4">
          <label className="flex items-center gap-2 cursor-pointer">
            <input type="checkbox" id="agreeTerms" required checked={formData.agreeTerms} onChange={handleInputChange} className="w-4 h-4 text-primary border-gray-300 rounded focus:ring-primary" />
            <span className="text-sm text-gray-700">I agree to the Terms & Conditions and Privacy Policy</span>
          </label>
        </div>
      </div>
      
      <div className="flex justify-end gap-3">
        <button type="button" className="px-6 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors" onClick={prevStep}>Back</button>
        <button type="button" className="px-6 py-2 bg-primary text-white rounded-lg hover:bg-primary-dark transition-colors font-medium" onClick={handlePlaceOrder}>Place Order</button>
      </div>
    </div>
  );

  const renderSuccessStep = () => (
    <div className="flex flex-col items-center justify-center py-8 animate-fade-in text-center">
      <div className="w-20 h-20 bg-green-100 text-green-500 rounded-full flex items-center justify-center mb-6 text-4xl">
        <i className="fas fa-check-circle"></i>
      </div>
      <h2 className="text-2xl font-bold text-gray-900 mb-2">Order Placed Successfully!</h2>
      <p className="text-gray-600 mb-8 max-w-md">Thank you for your order. We'll process it and contact you shortly.</p>
      
      <div className="bg-gray-50 p-6 rounded-lg border border-gray-100 w-full max-w-md mb-8 text-left">
        <div className="space-y-3 text-sm">
          <p className="flex justify-between border-b border-gray-200 pb-2">
            <span className="text-gray-600">Order Number:</span> 
            <span className="font-bold text-gray-900">{orderNumber}</span>
          </p>
          <p className="flex justify-between border-b border-gray-200 pb-2">
            <span className="text-gray-600">Estimated Delivery:</span> 
            <span className="font-medium text-gray-900">3-5 business days</span>
          </p>
          <p className="flex justify-between border-b border-gray-200 pb-2">
            <span className="text-gray-600">Payment Method:</span> 
            <span className="font-medium text-gray-900">{getPaymentMethodName(formData.paymentMethod)}</span>
          </p>
          <p className="text-gray-500 text-xs italic pt-2">You will receive a confirmation email shortly.</p>
        </div>
      </div>
      
      {whatsappLink && (
        <div className="mb-6 w-full max-w-md">
            <a 
                href={whatsappLink} 
                target="_blank" 
                rel="noopener noreferrer"
                className="w-full py-3 bg-[#25D366] text-white rounded-lg hover:bg-[#128C7E] transition-colors font-bold flex items-center justify-center gap-2 shadow-lg"
            >
                <i className="fab fa-whatsapp text-xl"></i> Send Order Details on WhatsApp
            </a>
            <p className="text-xs text-gray-500 mt-2">Click above if WhatsApp didn't open automatically.</p>
        </div>
      )}

      <div>
        <button className="px-8 py-3 bg-primary text-white rounded-lg hover:bg-primary-dark transition-colors font-bold flex items-center gap-2" onClick={onClose}>
          <i className="fas fa-shopping-bag"></i> Continue Shopping
        </button>
      </div>
    </div>
  );

  return (
    <div 
      className={`fixed inset-0 z-50 flex items-center justify-center p-4 transition-all duration-300 ${isOpen ? 'opacity-100 visible' : 'opacity-0 invisible pointer-events-none'}`} 
      id="checkoutModal"
    >
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={onClose}></div>
      <div className="bg-white rounded-xl w-full max-w-3xl max-h-[90vh] overflow-y-auto relative shadow-2xl z-10 custom-scrollbar flex flex-col">
        <div className="absolute top-4 right-4 z-20">
          <button className="w-8 h-8 flex items-center justify-center rounded-full bg-gray-100 hover:bg-red-500 hover:text-white transition-colors" onClick={onClose}>&times;</button>
        </div>
        
        <div className="p-6 md:p-8">
          {step !== 4 && (
             <div className="mb-8">
                <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">Checkout</h2>
                <div className="flex justify-between relative max-w-lg mx-auto">
                    {/* Progress Bar Background */}
                    <div className="absolute top-1/2 left-0 w-full h-1 bg-gray-200 -z-10 -translate-y-1/2 rounded-full"></div>
                    {/* Active Progress */}
                    <div 
                      className="absolute top-1/2 left-0 h-1 bg-primary -z-10 -translate-y-1/2 rounded-full transition-all duration-300" 
                      style={{ width: step === 1 ? '0%' : step === 2 ? '50%' : '100%' }}
                    ></div>

                    <div className={`flex flex-col items-center gap-2 bg-white px-2 ${step >= 1 ? 'text-primary' : 'text-gray-400'}`}>
                        <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold border-2 transition-all ${step >= 1 ? 'border-primary bg-primary text-white' : 'border-gray-300 bg-white'}`}>
                            {step > 1 ? <i className="fas fa-check"></i> : 1}
                        </div>
                        <span className="text-xs font-semibold">Shipping</span>
                    </div>
                    <div className={`flex flex-col items-center gap-2 bg-white px-2 ${step >= 2 ? 'text-primary' : 'text-gray-400'}`}>
                        <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold border-2 transition-all ${step >= 2 ? 'border-primary bg-primary text-white' : 'border-gray-300 bg-white'}`}>
                            {step > 2 ? <i className="fas fa-check"></i> : 2}
                        </div>
                        <span className="text-xs font-semibold">Payment</span>
                    </div>
                    <div className={`flex flex-col items-center gap-2 bg-white px-2 ${step >= 3 ? 'text-primary' : 'text-gray-400'}`}>
                        <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold border-2 transition-all ${step >= 3 ? 'border-primary bg-primary text-white' : 'border-gray-300 bg-white'}`}>
                            {step > 3 ? <i className="fas fa-check"></i> : 3}
                        </div>
                        <span className="text-xs font-semibold">Confirmation</span>
                    </div>
                </div>
             </div>
          )}

          {step === 1 && renderShippingStep()}
          {step === 2 && renderPaymentStep()}
          {step === 3 && renderConfirmationStep()}
          {step === 4 && renderSuccessStep()}
        </div>
      </div>
    </div>
  );
};

export default CheckoutModal;
