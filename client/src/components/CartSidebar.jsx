import React from 'react';
import { useShop } from '../context/ShopContext';

const CartSidebar = () => {
    const { isCartOpen, toggleCart, cart, removeFromCart, updateQuantity, cartTotal, openCheckout } = useShop();

    return (
        <>
            <div 
                className={`fixed top-0 right-0 h-full w-full sm:w-[380px] bg-white shadow-2xl z-50 transform transition-transform duration-500 ease-in-out flex flex-col ${isCartOpen ? 'translate-x-0' : 'translate-x-full'}`} 
                id="cartSidebar"
            >
                <div className="flex justify-between items-center p-6 border-b border-gray-100 bg-white">
                    <h2 className="text-xl font-black text-slate-900 flex items-center gap-3">
                        <i className="fas fa-shopping-bag text-primary"></i> 
                        <span className="uppercase tracking-tighter">Your Cart</span>
                    </h2>
                    <button 
                        className="cursor-pointer text-slate-400 hover:text-red-500 text-2xl w-10 h-10 flex items-center justify-center rounded-xl hover:bg-slate-50 transition-all active:scale-90" 
                        onClick={toggleCart}
                    >
                        <i className="fas fa-times text-lg"></i>
                    </button>
                </div>
                
                <div className="flex-1 overflow-y-auto p-4 custom-scrollbar" id="cartBody">
                    {cart.length === 0 ? (
                        <div className="flex flex-col items-center justify-center h-full text-gray-500 gap-4">
                            <i className="fas fa-shopping-cart text-4xl text-gray-300"></i>
                            <p>Your cart is empty</p>
                            <button onClick={toggleCart} className="text-primary hover:underline">Continue Shopping</button>
                        </div>
                    ) : (
                        cart.map(item => (
                            <div className="flex gap-3 mb-4 p-3 bg-white border border-gray-100 rounded-lg shadow-sm hover:shadow-md transition-shadow" key={item.id}>
                                <div className="w-16 h-16 shrink-0 bg-gray-50 rounded p-1 flex items-center justify-center">
                                    <img src={item.image} alt={item.name} className="max-w-full max-h-full object-contain" />
                                </div>
                                <div className="flex-1 min-w-0">
                                    <h4 className="font-semibold text-gray-800 text-sm mb-1 truncate">{item.name}</h4>
                                    <div className="text-primary font-bold text-sm mb-2">PKR {item.price.toLocaleString()}</div>
                                    <div className="flex items-center justify-between">
                                        <div className="flex items-center border border-gray-300 rounded overflow-hidden h-7">
                                            <button className="w-7 h-full flex items-center justify-center hover:bg-gray-100 text-gray-600 transition-colors" onClick={() => updateQuantity(item.id, -1)}>-</button>
                                            <span className="w-8 h-full flex items-center justify-center text-xs font-medium border-l border-r border-gray-300">{item.quantity}</span>
                                            <button className="w-7 h-full flex items-center justify-center hover:bg-gray-100 text-gray-600 transition-colors" onClick={() => updateQuantity(item.id, 1)}>+</button>
                                        </div>
                                        <div className="cursor-pointer text-gray-400 hover:text-red-500 transition-colors" onClick={() => removeFromCart(item.id)}>
                                            <i className="fas fa-trash-alt"></i>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))
                    )}
                </div>
                
                <div className="p-5 bg-gray-50 border-t border-gray-200">
                    <div className="mb-4 space-y-2">
                        <div className="flex justify-between text-sm text-gray-600">
                            <span>Subtotal</span>
                            <span id="cartSubtotal" className="font-medium">PKR {cartTotal.toLocaleString()}</span>
                        </div>
                        <div className="flex justify-between text-sm text-gray-600">
                            <span>Shipping</span>
                            <span className="font-medium">PKR 200</span>
                        </div>
                        <div className="flex justify-between text-lg font-bold text-gray-900 pt-2 border-t border-gray-200 mt-2">
                            <span>Total</span>
                            <span id="cartTotal" className="text-primary">PKR {(cartTotal + 200).toLocaleString()}</span>
                        </div>
                    </div>
                    
                    <div className="flex items-center gap-2 text-xs text-blue-600 bg-blue-50 p-2 rounded mb-4 border border-blue-100">
                        <i className="fas fa-info-circle"></i> COD available with PKR 200 advance payment
                    </div>
                    
                    <button 
                        className="w-full bg-primary hover:bg-primary-dark text-white font-bold py-3 px-4 rounded-lg shadow hover:shadow-lg transform active:scale-95 transition-all duration-300 flex items-center justify-center gap-2" 
                        onClick={openCheckout}
                    >
                        Proceed to Checkout <i className="fas fa-arrow-right"></i>
                    </button>
                </div>
            </div>
            
            {isCartOpen && (
                <div 
                    className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40 transition-opacity duration-300" 
                    id="overlay" 
                    onClick={toggleCart}
                ></div>
            )}
        </>
    );
};

export default CartSidebar;
