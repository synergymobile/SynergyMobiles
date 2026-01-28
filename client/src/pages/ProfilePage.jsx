import React from 'react';
import { useShop } from '../context/ShopContext';
import { 
  User, 
  Package, 
  Heart, 
  Settings, 
  ChevronRight, 
  MapPin, 
  LogOut,
  ShoppingBag,
  CreditCard,
  Bell
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const ProfilePage = () => {
    const { user, userOrders, logoutUser, isUserLoggedIn } = useShop();
    const navigate = useNavigate();

    if (!isUserLoggedIn) {
        navigate('/login');
        return null;
    }

    const handleLogout = () => {
        logoutUser();
        navigate('/');
    };

    return (
        <div className="min-h-screen bg-slate-50 font-sans selection:bg-primary/10">
            {/* Header / Banner */}
            <div className="bg-slate-900 border-b border-white/10 pt-20 pb-24 md:pt-10 md:pb-20 relative overflow-hidden">
                <div className="absolute top-0 right-0 w-96 h-96 bg-primary/20 rounded-full blur-[120px]" />
                <div className="container-custom relative z-10 px-6">
                    <div className="flex flex-col md:flex-row items-center gap-6 md:gap-8">
                        <div className="w-20 h-20 md:w-24 md:h-24 bg-white/10 rounded-4xl md:rounded-3xl flex items-center justify-center backdrop-blur-xl border border-white/20 relative group">
                            <User className="w-10 h-10 md:w-12 md:h-12 text-white" />
                            <div className="absolute -bottom-1 -right-1 w-7 h-7 md:w-8 md:h-8 bg-green-500 rounded-lg md:rounded-xl border-4 border-slate-900 flex items-center justify-center">
                                <span className="w-1.5 h-1.5 md:w-2 md:h-2 bg-white rounded-full animate-ping" />
                            </div>
                        </div>
                        <div className="text-center md:text-left">
                            <h1 className="text-2xl md:text-3xl font-black text-white tracking-tight mb-2">Welcome, {user?.name}</h1>
                            <p className="text-slate-400 font-medium text-sm md:text-base">{user?.email}</p>
                        </div>
                        <div className="md:ml-auto flex gap-4 w-full md:w-auto mt-4 md:mt-0">
                            <button onClick={handleLogout} className="flex-1 md:flex-none px-6 py-3 bg-white/5 hover:bg-red-500/10 hover:text-red-500 text-slate-300 font-bold rounded-2xl border border-white/10 transition-all flex items-center justify-center gap-2 group text-sm">
                                <LogOut className="w-4 h-4" /> Sign Out
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            <div className="container-custom px-6 -mt-10 pb-20 relative z-20">
                <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
                    {/* Sidebar Navigation */}
                    <div className="lg:col-span-1 space-y-6">
                        <div className="bg-white rounded-4xl p-4 shadow-xl shadow-slate-200/50 border border-slate-100 flex lg:flex-col overflow-x-auto lg:overflow-x-visible no-scrollbar gap-2 lg:gap-0 lg:divide-y lg:divide-slate-50">
                            {[
                                { icon: ShoppingBag, label: 'Order History', color: 'text-blue-500', active: true },
                                { icon: Heart, label: 'Wishlist', color: 'text-pink-500' },
                                { icon: MapPin, label: 'Addresses', color: 'text-green-500' },
                                { icon: CreditCard, label: 'Payments', color: 'text-orange-500' },
                                { icon: Bell, label: 'Notifications', color: 'text-purple-500' },
                                { icon: Settings, label: 'Settings', color: 'text-slate-500' }
                            ].map((item, i) => (
                                <button key={i} className={`shrink-0 flex items-center gap-4 p-4 rounded-2xl transition-all ${item.active ? 'bg-slate-50 border border-slate-100 lg:border-none' : 'hover:bg-slate-50'}`}>
                                    <div className={`p-2 rounded-xl bg-white border border-slate-100 ${item.color}`}>
                                        <item.icon className="w-4 h-4" />
                                    </div>
                                    <span className={`text-[13px] font-black whitespace-nowrap ${item.active ? 'text-slate-900' : 'text-slate-500'}`}>{item.label}</span>
                                    <ChevronRight className={`hidden lg:block ml-auto w-4 h-4 ${item.active ? 'text-slate-400' : 'text-slate-200'}`} />
                                </button>
                            ))}
                        </div>

                        <div className="bg-primary p-6 md:p-8 rounded-4xl text-white shadow-xl shadow-primary/20 relative overflow-hidden group">
                           <div className="relative z-10">
                                <h4 className="font-black text-lg mb-2">Member Support</h4>
                                <p className="text-white/70 text-xs font-medium mb-6">Need help with an order? Contact our specialists.</p>
                                <button className="w-full py-4 bg-white text-primary font-black rounded-xl hover:bg-slate-900 hover:text-white transition-all text-xs">Contact Specialist</button>
                           </div>
                           <Package className="absolute -bottom-4 -right-4 w-24 h-24 text-white/10 group-hover:scale-110 transition-transform duration-700" />
                        </div>
                    </div>

                    {/* Main Content Area */}
                    <div className="lg:col-span-3 space-y-8">
                        {/* Order History Card */}
                        <div className="bg-white rounded-4xl md:rounded-[2.5rem] shadow-xl shadow-slate-200/50 border border-slate-100 overflow-hidden">
                            <div className="p-6 md:p-8 border-b border-slate-100 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                                <div>
                                    <h2 className="text-xl font-black text-slate-900 tracking-tight">Purchase History</h2>
                                    <p className="text-slate-400 text-[11px] md:text-xs font-medium uppercase tracking-widest mt-1">Tracking your latest elite gadgets</p>
                                </div>
                                <div className="px-4 py-2 bg-slate-50 rounded-xl text-[10px] font-black text-slate-400 border border-slate-100 uppercase tracking-widest">
                                    {userOrders.length} Total Orders
                                </div>
                            </div>

                            <div className="p-0">
                                {userOrders.length > 0 ? (
                                    <div className="divide-y divide-slate-50">
                                        {userOrders.map((order) => (
                                            <div key={order._id} className="p-6 md:p-8 hover:bg-slate-50/50 transition-colors group">
                                                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6 mb-6">
                                                   <div className="flex items-center gap-4">
                                                        <div className="w-12 h-12 bg-white rounded-2xl border border-slate-100 flex items-center justify-center text-slate-400">
                                                            <Package className="w-6 h-6" />
                                                        </div>
                                                        <div>
                                                            <p className="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-1">Order ID: #{order._id.slice(-8)}</p>
                                                            <p className="text-sm font-black text-slate-900">{new Date(order.createdAt).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}</p>
                                                        </div>
                                                   </div>
                                                   <div className="flex items-center justify-between sm:justify-end gap-6 border-t sm:border-none pt-4 sm:pt-0">
                                                       <div className="text-left sm:text-right">
                                                           <p className="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-1">Total Paid</p>
                                                           <p className="text-sm font-black text-primary">PKR {order.totalPrice.toLocaleString()}</p>
                                                       </div>
                                                       <div className={`px-4 py-2 rounded-xl text-[10px] font-black uppercase tracking-widest ${order.isDelivered ? 'bg-green-100 text-green-600 border border-green-200' : 'bg-orange-100 text-orange-600 border border-orange-200'}`}>
                                                           {order.isDelivered ? 'Delivered' : 'Pending'}
                                                       </div>
                                                   </div>
                                                </div>

                                                <div className="flex items-center gap-3 overflow-x-auto pb-4 custom-scrollbar">
                                                    {order.orderItems.map((item, idx) => (
                                                        <div key={idx} className="shrink-0 w-14 h-14 md:w-16 md:h-16 bg-white rounded-xl border border-slate-100 p-1 group-hover:border-primary/20 transition-all">
                                                            <img src={item.image} alt={item.name} className="w-full h-full object-cover rounded-lg" />
                                                        </div>
                                                    ))}
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                ) : (
                                    <div className="py-20 text-center px-6">
                                        <div className="w-20 h-20 bg-slate-50 rounded-full flex items-center justify-center mx-auto mb-6 border border-slate-100">
                                            <ShoppingBag className="w-8 h-8 text-slate-200" />
                                        </div>
                                        <h3 className="text-lg font-black text-slate-900 mb-2">No orders yet</h3>
                                        <p className="text-slate-400 text-sm mb-8">Your future elite gadgets will appear here.</p>
                                        <button onClick={() => navigate('/products')} className="w-full sm:w-auto px-8 py-4 bg-slate-900 text-white font-black rounded-2xl hover:bg-primary transition-all shadow-xl active:scale-95">Start Shopping</button>
                                    </div>
                                )}
                            </div>
                        </div>

                        {/* Additional Info Cards */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                            <div className="bg-white rounded-4xl p-8 border border-slate-100 shadow-xl shadow-slate-200/50">
                                <h4 className="text-lg font-black text-slate-900 mb-2">Saved Address</h4>
                                <p className="text-slate-400 text-xs font-medium mb-6">Your primary shipping destination</p>
                                {userOrders.length > 0 ? (
                                    <div className="p-6 bg-slate-50 rounded-2xl border border-slate-100 relative group overflow-hidden">
                                        <MapPin className="absolute -right-4 -bottom-4 w-20 h-20 text-slate-100 group-hover:scale-110 transition-transform duration-700" />
                                        <div className="relative z-10">
                                            <p className="text-sm font-black text-slate-900 mb-1">{user?.name}</p>
                                            <p className="text-xs text-slate-500 font-medium leading-relaxed">{userOrders[0].shippingAddress.address}, {userOrders[0].shippingAddress.city}</p>
                                        </div>
                                    </div>
                                ) : (
                                    <button className="w-full py-6 border border-dashed border-slate-200 rounded-2xl text-slate-400 text-sm font-bold hover:bg-slate-50 transition-all flex flex-col items-center gap-2">
                                        <MapPin className="w-5 h-5 opacity-50" />
                                        Add Shipping Address
                                    </button>
                                )}
                            </div>

                            <div className="bg-slate-900 rounded-4xl p-8 shadow-xl shadow-slate-900/10 relative overflow-hidden group">
                                <div className="relative z-10">
                                    <h4 className="text-lg font-black text-white mb-2">Synergy Elite</h4>
                                    <p className="text-slate-400 text-xs font-medium mb-6">Upgrade to experience exclusive benefits</p>
                                    <button className="px-6 py-3 bg-primary text-white font-black rounded-xl hover:bg-white hover:text-slate-900 transition-all text-[10px] uppercase tracking-widest">Explore Rewards</button>
                                </div>
                                <Sparkles className="absolute -right-8 -bottom-8 w-40 h-40 text-white/5 group-hover:scale-110 transition-transform duration-700" />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

import { Sparkles } from 'lucide-react';

export default ProfilePage;
