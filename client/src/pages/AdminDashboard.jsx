import React, { useState, useEffect } from 'react';
import { useShop } from '../context/ShopContext';
import { useNavigate } from 'react-router-dom';
import { 
  LayoutDashboard, 
  Package, 
  PlusCircle, 
  ShoppingCart, 
  Settings, 
  LogOut, 
  Trash2, 
  Edit3, 
  CheckCircle2, 
  Clock, 
  TrendingUp, 
  Users, 
  ChevronRight,
  Search,
  MoreVertical,
  Bell,
  MessageSquare,
  DollarSign
} from 'lucide-react';
import Logo from '../components/Logo';

const AdminDashboard = () => {
  const { 
    isAdmin, 
    logoutAdmin, 
    products, 
    orders, 
    addProduct, 
    deleteProduct, 
    updateProduct,
    dealPoster,
    updateDealPoster,
    isLoading
  } = useShop();
  
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('dashboard');
  const [editingProduct, setEditingProduct] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  
  // Form State
  const [productForm, setProductForm] = useState({
    name: '',
    category: 'smartphone',
    brand: '',
    price: '',
    originalPrice: '',
    description: '',
    stock: '',
    image: '',
    images: [],
    videos: [],
    colors: [],
    isFeatured: false,
    isHotDeal: false,
    isNewArrival: false
  });

  useEffect(() => {
    if (!isAdmin) {
      navigate('/login');
    }
  }, [isAdmin, navigate]);

  const handleLogout = () => {
    logoutAdmin();
    navigate('/');
  };

  const handleProductSubmit = async (e) => {
    e.preventDefault();
    const success = editingProduct 
      ? await updateProduct({ ...productForm, _id: editingProduct._id || editingProduct.id })
      : await addProduct(productForm);

    if (success) {
      alert(editingProduct ? 'Product updated!' : 'Product added!');
      setEditingProduct(null);
      resetForm();
      setActiveTab('products');
    } else {
      alert('Operation failed. Please check your connection or permissions.');
    }
  };

  const resetForm = () => {
    setProductForm({
      name: '',
      category: 'smartphone',
      brand: '',
      price: '',
      originalPrice: '',
      description: '',
      stock: '',
      image: '',
      images: [],
      videos: [],
      colors: [],
      isFeatured: false,
      isHotDeal: false,
      isNewArrival: false
    });
  };

  const handleEditClick = (product) => {
    setEditingProduct(product);
    setProductForm(product);
    setActiveTab('add-product');
  };

  const handleDeleteClick = async (id) => {
    if (window.confirm('Are you sure you want to delete this product? This action is permanent.')) {
      await deleteProduct(id);
    }
  };

  if (!isAdmin) return null;

  const NavItem = ({ id, icon: Icon, label }) => (
    <li 
      className={`group flex items-center gap-3 px-4 py-3 rounded-xl cursor-pointer transition-all duration-300 relative ${
        activeTab === id 
          ? 'bg-primary text-white shadow-lg shadow-primary/20' 
          : 'text-slate-400 hover:bg-slate-800 hover:text-white'
      }`}
      onClick={() => {
        if(id === 'add-product') { setEditingProduct(null); resetForm(); }
        setActiveTab(id);
      }}
    >
      <Icon className={`w-5 h-5 transition-transform duration-300 ${activeTab === id ? 'scale-110' : 'group-hover:scale-110'}`} />
      <span className="font-medium text-sm">{label}</span>
      {activeTab === id && (
        <div className="absolute right-2 w-1.5 h-1.5 rounded-full bg-white animate-pulse" />
      )}
    </li>
  );

  const StatCard = ({ label, value, icon: Icon, color, trend }) => (
    <div className="bg-white/80 backdrop-blur-xl border border-white/20 p-6 rounded-3xl shadow-sm hover:shadow-md transition-shadow">
      <div className="flex justify-between items-start mb-4">
        <div className={`p-3 rounded-2xl ${color} bg-opacity-10 text-${color.split('-')[1]}-600`}>
          <Icon className="w-6 h-6" />
        </div>
        {trend && (
          <div className="flex items-center gap-1 text-xs font-bold text-green-500 bg-green-50 px-2 py-1 rounded-full">
            <TrendingUp className="w-3 h-3" /> {trend}
          </div>
        )}
      </div>
      <div>
        <p className="text-slate-500 text-sm font-medium">{label}</p>
        <h3 className="text-2xl font-black text-slate-900 mt-1">{value}</h3>
      </div>
    </div>
  );

  return (
    <div className="flex bg-slate-50 min-h-screen text-slate-900 font-sans selection:bg-primary/10">
      {/* Sidebar */}
      <aside className="w-72 bg-slate-900 border-r border-slate-800 fixed h-full z-100 flex-col p-6 hidden lg:flex">
        <div className="mb-10 px-2">
            <Logo variant="light" className="h-10 w-auto" />
            <p className="text-[10px] uppercase tracking-[0.3em] text-slate-500 font-bold mt-2 ml-1">Control Center</p>
        </div>

        <nav className="flex-1">
          <p className="text-[10px] uppercase tracking-widest text-slate-500 font-semibold mb-4 px-2">Main Menu</p>
          <ul className="flex flex-col gap-2">
            <NavItem id="dashboard" icon={LayoutDashboard} label="Dashboard" />
            <NavItem id="products" icon={Package} label="Inventory" />
            <NavItem id="add-product" icon={PlusCircle} label="New Product" />
            <NavItem id="requests" icon={MessageSquare} label="Product Requests" />
          </ul>

          <p className="text-[10px] uppercase tracking-widest text-slate-500 font-semibold mt-8 mb-4 px-2">System</p>
          <ul className="flex flex-col gap-2">
            <NavItem id="settings" icon={Settings} label="Site Settings" />
          </ul>
        </nav>

        <button 
          onClick={handleLogout}
          className="mt-auto flex items-center gap-3 px-4 py-3 rounded-xl text-slate-400 hover:bg-red-500/10 hover:text-red-500 transition-all duration-300 group"
        >
          <LogOut className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
          <span className="font-bold text-sm">Logout</span>
        </button>
      </aside>

      {/* Main Content */}
      <main className="flex-1 lg:ml-72 p-6 lg:p-10 pb-24">
        {/* Header */}
        <header className="flex justify-between items-center mb-10">
          <div>
            <h1 className="text-3xl font-black tracking-tight text-slate-900 capitalize">{activeTab.replace('-', ' ')}</h1>
            <p className="text-slate-500 text-sm mt-1">Welcome back, Admin. Here's what's happening today.</p>
          </div>
          
          <div className="flex items-center gap-4">
            <div className="relative group hidden md:block">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
              <input 
                type="text" 
                placeholder="Global Search..." 
                className="pl-10 pr-4 py-2.5 bg-white border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all w-64 text-sm"
              />
            </div>
            <button className="relative p-2.5 bg-white border border-slate-200 rounded-xl text-slate-600 hover:bg-slate-50 transition-colors">
              <Bell className="w-5 h-5" />
              <span className="absolute top-2 right-2 w-2 h-2 bg-red-500 rounded-full border-2 border-white" />
            </button>
            <div className="w-10 h-10 rounded-xl bg-primary text-white flex items-center justify-center font-black">AD</div>
          </div>
        </header>

        {isLoading ? (
          <div className="flex items-center justify-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
          </div>
        ) : (
          <div className="animate-in fade-in slide-in-from-bottom-4 duration-700">
            {activeTab === 'dashboard' && (
              <>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
                  <StatCard label="Total Products" value={products.length} icon={Package} color="bg-blue-500" />
                  <StatCard label="Live Requests" value={orders.length} icon={MessageSquare} color="bg-purple-500" trend="+12%" />
                  <StatCard label="Est. Revenue" value={`PKR ${(orders.reduce((acc, o) => acc + (o.total || 0), 0) / 1000).toFixed(1)}k`} icon={DollarSign} color="bg-green-500" trend="+5.2%" />
                  <StatCard label="Avg. Order" value="PKR 45k" icon={TrendingUp} color="bg-orange-500" />
                </div>

                <div className="bg-white rounded-3xl border border-slate-200 shadow-sm overflow-hidden mb-10">
                  <div className="p-6 border-b border-slate-100 flex justify-between items-center bg-slate-50/50">
                    <h3 className="font-black text-slate-900 flex items-center gap-2">
                       <ShoppingCart className="w-5 h-5 text-primary" /> Recent Activities
                    </h3>
                    <button className="text-primary text-xs font-bold hover:underline">View All Report</button>
                  </div>
                  <div className="overflow-x-auto mini-scrollbar">
                    <table className="w-full text-left">
                      <thead>
                        <tr className="text-slate-400 text-[10px] uppercase tracking-widest bg-slate-50/50">
                          <th className="px-6 py-4 font-bold border-b border-slate-100">Client Info</th>
                          <th className="px-6 py-4 font-bold border-b border-slate-100">Status</th>
                          <th className="px-6 py-4 font-bold border-b border-slate-100">Amount</th>
                          <th className="px-6 py-4 font-bold border-b border-slate-100">Date</th>
                          <th className="px-6 py-4 font-bold border-b border-slate-100"></th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-slate-50">
                        {orders.slice(0, 5).map(order => (
                          <tr key={order.id} className="hover:bg-slate-50/50 transition-colors group">
                            <td className="px-6 py-4">
                              <div className="flex items-center gap-3">
                                <div className="w-8 h-8 rounded-lg bg-slate-100 flex items-center justify-center text-xs font-bold text-slate-500 capitalize">{order.fullName?.[0]}</div>
                                <div>
                                  <p className="text-sm font-bold text-slate-900 line-clamp-1">{order.fullName}</p>
                                  <p className="text-[10px] text-slate-400">{order.email}</p>
                                </div>
                              </div>
                            </td>
                            <td className="px-6 py-4">
                              <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-wider ${
                                order.status === 'delivered' ? 'bg-green-100 text-green-700' : 'bg-orange-100 text-orange-700'
                              }`}>
                                {order.status === 'delivered' ? <CheckCircle2 className="w-3 h-3" /> : <Clock className="w-3 h-3" />}
                                {order.status}
                              </span>
                            </td>
                            <td className="px-6 py-4 font-bold text-sm">PKR {(order.total || 0).toLocaleString()}</td>
                            <td className="px-6 py-4 text-xs text-slate-500 font-medium">{new Date(order.date || Date.now()).toLocaleDateString()}</td>
                            <td className="px-6 py-4 text-right">
                              <button className="p-2 opacity-0 group-hover:opacity-100 bg-slate-100 rounded-lg text-slate-500 hover:text-primary transition-all">
                                <ChevronRight className="w-4 h-4" />
                              </button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </>
            )}

            {activeTab === 'products' && (
              <div className="space-y-6">
                <div className="flex items-center justify-between mb-2">
                   <div className="relative group w-full max-w-md">
                      <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                      <input 
                        type="text" 
                        placeholder="Filter products..." 
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="pl-12 pr-4 py-3 bg-white border border-slate-200 rounded-2xl focus:outline-none focus:ring-4 focus:ring-primary/5 focus:border-primary transition-all w-full text-sm"
                      />
                   </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                  {products.filter(p => p.name.toLowerCase().includes(searchQuery.toLowerCase())).map(product => (
                    <div key={product._id || product.id} className="bg-white border border-slate-200 rounded-3xl overflow-hidden group hover:shadow-xl hover:shadow-slate-200/50 transition-all duration-500 relative">
                        <div className="aspect-square bg-slate-50 p-6 relative overflow-hidden">
                            <img src={product.image} alt={product.name} className="w-full h-full object-contain mix-blend-multiply group-hover:scale-110 transition-transform duration-700" />
                            <div className="absolute top-4 right-4 flex flex-col gap-2 opacity-0 group-hover:opacity-100 transition-all duration-300 translate-x-4 group-hover:translate-x-0">
                                <button onClick={() => handleEditClick(product)} className="p-2.5 bg-white shadow-lg rounded-xl text-blue-600 hover:bg-blue-600 hover:text-white transition-all"><Edit3 className="w-4 h-4" /></button>
                                <button onClick={() => handleDeleteClick(product._id || product.id)} className="p-2.5 bg-white shadow-lg rounded-xl text-red-600 hover:bg-red-600 hover:text-white transition-all"><Trash2 className="w-4 h-4" /></button>
                            </div>
                        </div>
                        <div className="p-5">
                            <span className="text-[10px] font-black uppercase tracking-widest text-primary bg-primary/5 px-2 py-1 rounded-md mb-2 inline-block">{product.brand}</span>
                            <h4 className="font-bold text-slate-900 leading-tight mb-2 line-clamp-1 group-hover:text-primary transition-colors">{product.name}</h4>
                            <div className="flex items-center justify-between mt-4">
                                <p className="font-black text-slate-900">PKR {product.price.toLocaleString()}</p>
                                <p className={`text-[10px] font-bold ${product.stock > 0 ? 'text-green-500' : 'text-red-500'}`}>{product.stock} left</p>
                            </div>
                        </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {activeTab === 'add-product' && (
              <div className="bg-white border border-slate-200 rounded-[2.5rem] p-10 shadow-2xl shadow-slate-200/50 max-w-4xl mx-auto">
                 <form onSubmit={handleProductSubmit} className="space-y-8">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        <div className="space-y-2">
                            <label className="text-xs font-black uppercase tracking-widest text-slate-500 ml-1">Product Identity</label>
                            <input type="text" placeholder="Full Product Name" className="w-full px-6 py-4 bg-slate-50 border border-slate-100 rounded-2xl focus:outline-none focus:ring-4 focus:ring-primary/5 focus:bg-white transition-all" value={productForm.name} onChange={e => setProductForm({...productForm, name: e.target.value})} required />
                        </div>
                        <div className="space-y-2">
                             <label className="text-xs font-black uppercase tracking-widest text-slate-500 ml-1">Brand Selection</label>
                            <input type="text" placeholder="Apple, Samsung, etc." className="w-full px-6 py-4 bg-slate-50 border border-slate-100 rounded-2xl focus:outline-none focus:ring-4 focus:ring-primary/5 focus:bg-white transition-all" value={productForm.brand} onChange={e => setProductForm({...productForm, brand: e.target.value})} required />
                        </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        <div className="space-y-2">
                             <label className="text-xs font-black uppercase tracking-widest text-slate-500 ml-1">Price (PKR)</label>
                            <input type="number" placeholder="0.00" className="w-full px-6 py-4 bg-slate-50 border border-slate-100 rounded-2xl focus:outline-none focus:ring-4 focus:ring-primary/5 focus:bg-white transition-all" value={productForm.price} onChange={e => setProductForm({...productForm, price: e.target.value})} required />
                        </div>
                        <div className="space-y-2">
                             <label className="text-xs font-black uppercase tracking-widest text-slate-500 ml-1">Stock Units</label>
                            <input type="number" placeholder="Inventory Count" className="w-full px-6 py-4 bg-slate-50 border border-slate-100 rounded-2xl focus:outline-none focus:ring-4 focus:ring-primary/5 focus:bg-white transition-all" value={productForm.stock} onChange={e => setProductForm({...productForm, stock: e.target.value})} required />
                        </div>
                        <div className="space-y-2">
                             <label className="text-xs font-black uppercase tracking-widest text-slate-500 ml-1">Category</label>
                             <select className="w-full px-6 py-4 bg-slate-50 border border-slate-100 rounded-2xl focus:outline-none focus:ring-4 focus:ring-primary/5 focus:bg-white transition-all appearance-none cursor-pointer" value={productForm.category} onChange={e => setProductForm({...productForm, category: e.target.value})}>
                                <option value="smartphone">Smartphone</option>
                                <option value="tablet">Tablet</option>
                                <option value="accessories">Accessories</option>
                                <option value="smartwatch">Smartwatch</option>
                            </select>
                        </div>
                    </div>

                    <div className="space-y-2">
                         <label className="text-xs font-black uppercase tracking-widest text-slate-500 ml-1">Product Visual (URL)</label>
                        <input type="url" placeholder="https://image-source.com/product.png" className="w-full px-6 py-4 bg-slate-50 border border-slate-100 rounded-2xl focus:outline-none focus:ring-4 focus:ring-primary/5 focus:bg-white transition-all" value={productForm.image} onChange={e => setProductForm({...productForm, image: e.target.value})} required />
                    </div>

                    <div className="space-y-2">
                         <label className="text-xs font-black uppercase tracking-widest text-slate-500 ml-1">Marketing Description</label>
                        <textarea rows="4" placeholder="Detail your product features..." className="w-full px-6 py-4 bg-slate-50 border border-slate-100 rounded-2xl focus:outline-none focus:ring-4 focus:ring-primary/5 focus:bg-white transition-all resize-none" value={productForm.description} onChange={e => setProductForm({...productForm, description: e.target.value})} required></textarea>
                    </div>

                    <div className="flex justify-between items-center p-6 bg-slate-50 rounded-3xl border border-slate-100">
                        <div className="flex gap-8">
                            {['isFeatured', 'isHotDeal', 'isNewArrival'].map(tag => (
                                <label key={tag} className="flex items-center gap-2 cursor-pointer group">
                                    <div className={`w-5 h-5 rounded-md border-2 flex items-center justify-center transition-all ${productForm[tag] ? 'bg-primary border-primary' : 'border-slate-300'}`}>
                                        {productForm[tag] && <CheckCircle2 className="w-3.5 h-3.5 text-white" />}
                                    </div>
                                    <input type="checkbox" className="hidden" checked={productForm[tag]} onChange={e => setProductForm({...productForm, [tag]: e.target.checked})} />
                                    <span className="text-xs font-bold text-slate-600 transition-colors group-hover:text-primary capitalize">{tag.replace('is', '')}</span>
                                </label>
                            ))}
                        </div>
                        <button type="submit" className="px-10 py-5 bg-slate-900 text-white font-black rounded-2xl hover:bg-primary transition-all shadow-xl shadow-slate-900/10 active:scale-95">
                            {editingProduct ? 'Update Product Architecture' : 'Deploy New Product'}
                        </button>
                    </div>
                 </form>
              </div>
            )}

            {activeTab === 'requests' && (
              <div className="bg-white rounded-[2.5rem] border border-slate-200 overflow-hidden shadow-sm">
                  <div className="p-8 border-b border-slate-100 flex items-center justify-between">
                      <div>
                        <h3 className="font-black text-xl text-slate-900">Custom Product Requests</h3>
                        <p className="text-slate-400 text-sm mt-1">Direct inquiries from potential customers</p>
                      </div>
                      <div className="p-3 bg-purple-50 rounded-2xl text-purple-600"><Bell className="w-6 h-6" /></div>
                  </div>
                  <div className="overflow-x-auto">
                    <table className="w-full text-left">
                        <thead className="bg-slate-50/80">
                            <tr className="text-[10px] uppercase font-black tracking-widest text-slate-400">
                                <th className="px-8 py-5">Full Name</th>
                                <th className="px-8 py-5">Contact Meta</th>
                                <th className="px-8 py-5">Interest</th>
                                <th className="px-8 py-5">Action</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-50">
                            {orders.map(req => (
                                <tr key={req.id} className="hover:bg-slate-50/50 transition-colors">
                                    <td className="px-8 py-6 font-bold text-slate-900">{req.fullName}</td>
                                    <td className="px-8 py-6">
                                        <div className="flex flex-col gap-1">
                                            <span className="text-xs font-medium text-slate-600">{req.email}</span>
                                            <span className="text-[10px] text-slate-400">{req.phone}</span>
                                        </div>
                                    </td>
                                    <td className="px-8 py-6">
                                        <span className="inline-block px-3 py-1 bg-blue-50 text-blue-600 rounded-lg text-[10px] font-black uppercase tracking-widest">{req.paymentMethod || 'Inquiry'}</span>
                                    </td>
                                    <td className="px-8 py-6">
                                        <button className="text-primary hover:text-slate-900 font-black text-xs uppercase tracking-widest flex items-center gap-1.5 transition-colors">
                                            Execute <ChevronRight className="w-3.5 h-3.5" />
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                  </div>
              </div>
            )}
          </div>
        )}
      </main>
    </div>
  );
};

export default AdminDashboard;
