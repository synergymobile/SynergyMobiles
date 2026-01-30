import React, { useState, useEffect, useMemo } from 'react';
import { useShop } from '../context/ShopContext';
import { useNavigate } from 'react-router-dom';
import { 
  Package, 
  PlusCircle, 
  LogOut, 
  Trash2, 
  Edit3, 
  Search,
  Filter,
  X,
  Upload,
  Image as ImageIcon,
  DollarSign,
  MessageSquare,
  TrendingUp,
  AlertTriangle,
  ChevronRight,
  MoreVertical,
  Check,
  LayoutGrid,
  List
} from 'lucide-react';
import Logo from '../components/Logo';
import NotificationModal from '../components/NotificationModal';
import CustomDropdown from '../components/CustomDropdown';

const AdminDashboard = () => {
  const { 
    isAdmin, 
    logoutAdmin, 
    products, 
    addProduct, 
    deleteProduct, 
    updateProduct,
    uploadProductImages,
    isLoading
  } = useShop();
  
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('products');
  const [editingProduct, setEditingProduct] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('all');
  const [stockFilter, setStockFilter] = useState('all');
  const [viewMode, setViewMode] = useState('table'); // 'table' or 'grid'
  
  const [isUploading, setIsUploading] = useState(false);
  const [notification, setNotification] = useState({
    isOpen: false,
    type: 'success',
    title: '',
    message: ''
  });

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
    isNewArrival: false,
    selectedFiles: []
  });

  useEffect(() => {
    if (!isAdmin) {
      navigate('/login');
    }
  }, [isAdmin, navigate]);

  const showNotification = (type, title, message) => {
    setNotification({ isOpen: true, type, title, message });
  };

  const closeNotification = () => {
    setNotification(prev => ({ ...prev, isOpen: false }));
  };

  const handleLogout = () => {
    logoutAdmin();
    navigate('/');
  };

  const generateSlug = (name) => {
    return name
      .toLowerCase()
      .trim()
      .replace(/[^\w\s-]/g, '')
      .replace(/\s+/g, '-')
      .replace(/-+/g, '-');
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
      isNewArrival: false,
      selectedFiles: []
    });
  };

  const handleProductSubmit = async (e) => {
    e.preventDefault();
    setIsUploading(true);
    
    try {
      let finalProductForm = { ...productForm };

      // Handle image uploads
      if (productForm.selectedFiles && productForm.selectedFiles.length > 0) {
        const imageUrls = await uploadProductImages(productForm.selectedFiles);
        if (imageUrls && imageUrls.length > 0) {
          finalProductForm.image = imageUrls[0];
          finalProductForm.images = imageUrls;
        } else {
          showNotification('error', 'Upload Failed', 'Image upload failed. Please try again.');
          setIsUploading(false);
          return;
        }
      } else if (!editingProduct) {
        if (!finalProductForm.image && !finalProductForm.images?.length) {
          showNotification('warning', 'Missing Image', 'Please upload at least one product image.');
          setIsUploading(false);
          return;
        }
      }

      const { selectedFiles, ...productData } = finalProductForm;
      
      productData.price = parseFloat(productData.price) || 0;
      productData.originalPrice = parseFloat(productData.originalPrice) || productData.price;
      productData.stock = parseInt(productData.stock) || 0;
      
      if (!editingProduct || productData.name !== editingProduct.name) {
        productData.slug = generateSlug(productData.name);
      }

      const success = editingProduct 
        ? await updateProduct({ ...productData, _id: editingProduct._id || editingProduct.id })
        : await addProduct(productData);

      if (success) {
        showNotification(
          'success', 
          editingProduct ? 'Product Updated' : 'Product Added', 
          'Operation completed successfully.'
        );
        setEditingProduct(null);
        resetForm();
        setActiveTab('products');
      } else {
        showNotification('error', 'Operation Failed', 'Please try again.');
      }
    } catch (error) {
      console.error('Submit Error:', error);
      showNotification('error', 'Error', error.message || 'Unknown error');
    } finally {
      setIsUploading(false);
    }
  };

  const handleEditClick = (product) => {
    setEditingProduct(product);
    setProductForm(product);
    setActiveTab('add-product');
  };

  const handleDeleteClick = async (id) => {
    if (window.confirm('Are you sure? This action is permanent.')) {
      const success = await deleteProduct(id);
      if (success) {
        showNotification('success', 'Deleted', 'Product removed successfully.');
      }
    }
  };

  // Filtered products
  const filteredProducts = useMemo(() => {
    return products.filter(p => {
      const matchesSearch = p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                           p.brand.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesCategory = categoryFilter === 'all' || p.category === categoryFilter;
      const matchesStock = stockFilter === 'all' || 
                          (stockFilter === 'low' && p.stock < 10) ||
                          (stockFilter === 'out' && p.stock === 0);
      return matchesSearch && matchesCategory && matchesStock;
    });
  }, [products, searchQuery, categoryFilter, stockFilter]);

  if (!isAdmin) return null;

  const NavItem = ({ id, icon: Icon, label, badge }) => (
    <li 
      className={`group flex items-center justify-between gap-3 px-4 py-3 rounded-xl cursor-pointer transition-all duration-300 relative ${
        activeTab === id 
          ? 'bg-linear-to-r from-blue-600 to-blue-500 text-white shadow-lg shadow-blue-500/20' 
          : 'text-slate-400 hover:bg-slate-800 hover:text-white'
      }`}
      onClick={() => {
        if(id === 'add-product') { setEditingProduct(null); resetForm(); }
        setActiveTab(id);
      }}
    >
      <div className="flex items-center gap-3">
        <Icon className={`w-5 h-5 transition-transform duration-300 ${activeTab === id ? 'scale-110' : 'group-hover:scale-110'}`} />
        <span className="font-medium text-sm">{label}</span>
      </div>
      {badge && (
        <span className="px-2 py-0.5 text-[10px] font-bold bg-red-500 text-white rounded-full">
          {badge}
        </span>
      )}
    </li>
  );

  return (
    <div className="flex bg-slate-50 min-h-screen text-slate-900 font-sans">
      {/* Sidebar */}
      <aside className="w-72 bg-slate-900 border-r border-slate-800 fixed h-full z-50 flex-col p-6 hidden lg:flex">
        <div className="mb-10 px-2">
          <Logo variant="light" className="h-10 w-auto" />
          <p className="text-[10px] uppercase tracking-[0.3em] text-slate-500 font-bold mt-2 ml-1 opacity-60">Management</p>
        </div>

        <nav className="flex-1">
          <ul className="flex flex-col gap-2">
            <NavItem id="products" icon={Package} label="All Products" badge={products.length} />
            <NavItem id="add-product" icon={PlusCircle} label={editingProduct ? "Edit Product" : "Add Product"} />
          </ul>
        </nav>

        <div className="mt-auto">
          <button 
            onClick={handleLogout}
            className="flex items-center gap-3 px-4 py-3 rounded-xl text-slate-400 hover:bg-red-500/10 hover:text-red-500 transition-all duration-300 group w-full"
          >
            <LogOut className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
            <span className="font-bold text-sm">Sign Out</span>
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 lg:ml-72 p-6 lg:p-10 pb-24 max-w-[1920px]">
        {/* Header */}
        <header className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-10">
          <div>
            <h1 className="text-4xl font-black tracking-tight capitalize bg-linear-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              {activeTab === 'add-product' ? (editingProduct ? 'Edit Product' : 'New Product') : 'Inventory'}
            </h1>
            <p className="text-slate-500 text-sm mt-1 font-medium">
              {activeTab === 'products' ? 'Manage your product catalog, prices, and stock.' : 'Fill in the details below to update your catalog.'}
            </p>
          </div>
          
          <div className="flex items-center gap-3">
            <div className={`px-4 py-2 rounded-xl text-sm font-bold shadow-sm border ${activeTab === 'products' ? 'bg-white border-slate-200 text-slate-700' : 'bg-blue-50 border-blue-100 text-blue-600'}`}>
              Total Items: {products.length}
            </div>
          </div>
        </header>

        {isLoading ? (
          <div className="flex items-center justify-center h-64">
             <div className="w-10 h-10 border-4 border-blue-600 border-t-transparent rounded-full animate-spin" />
          </div>
        ) : (
          <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
            {activeTab === 'products' && (
              <div className="space-y-6">
                {/* Filters Bar */}
                <div className="bg-white rounded-2xl border border-slate-200 p-2 shadow-sm flex flex-col xl:flex-row gap-2">
                  <div className="flex-1 relative">
                    <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                    <input 
                      type="text" 
                      placeholder="Search by name, brand..." 
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="pl-11 pr-4 py-2.5 w-full bg-transparent focus:bg-slate-50 rounded-xl focus:outline-none transition-colors text-sm font-medium"
                    />
                  </div>
                  <div className="h-px xl:h-auto xl:w-px bg-slate-100 mx-2" />
                  <div className="flex gap-2 p-1 flex-wrap items-center">
                    <div className="w-[180px]">
                      <CustomDropdown
                        options={[
                          { value: 'all', label: 'All Categories' },
                          { value: 'smartphone', label: 'Smartphones' },
                          { value: 'tablet', label: 'Tablets' },
                          { value: 'accessories', label: 'Accessories' },
                          { value: 'smartwatch', label: 'Smartwatches' },
                          { value: 'laptop', label: 'Laptops' },
                          { value: 'audio', label: 'Audio' }
                        ]}
                        value={categoryFilter}
                        onChange={setCategoryFilter}
                        placeholder="All Categories"
                      />
                    </div>
                    <div className="w-[160px]">
                      <CustomDropdown
                        options={[
                          { value: 'all', label: 'All Stock' },
                          { value: 'low', label: 'Low Stock' },
                          { value: 'out', label: 'Out of Stock' }
                        ]}
                        value={stockFilter}
                        onChange={setStockFilter}
                        placeholder="All Stock"
                      />
                    </div>
                    
                    <div className="flex bg-slate-100 rounded-xl p-1 ml-2">
                        <button 
                            onClick={() => setViewMode('table')}
                            className={`p-1.5 rounded-lg transition-all ${viewMode === 'table' ? 'bg-white shadow text-slate-800' : 'text-slate-400 hover:text-slate-600'}`}
                        >
                            <List className="w-4 h-4" />
                        </button>
                        <button 
                            onClick={() => setViewMode('grid')}
                            className={`p-1.5 rounded-lg transition-all ${viewMode === 'grid' ? 'bg-white shadow text-slate-800' : 'text-slate-400 hover:text-slate-600'}`}
                        >
                            <LayoutGrid className="w-4 h-4" />
                        </button>
                    </div>
                  </div>
                  {(searchQuery || categoryFilter !== 'all' || stockFilter !== 'all') && (
                      <button 
                        onClick={() => { setSearchQuery(''); setCategoryFilter('all'); setStockFilter('all'); }}
                        className="px-4 py-2 text-red-500 hover:bg-red-50 rounded-xl text-xs font-bold transition-colors whitespace-nowrap"
                      >
                        Reset
                      </button>
                    )}
                </div>

                {filteredProducts.length === 0 ? (
                    <div className="bg-white rounded-3xl border border-slate-200 p-16 text-center shadow-sm">
                        <Package className="w-16 h-16 text-slate-200 mx-auto mb-4" />
                        <h3 className="text-xl font-black text-slate-900 mb-2">No products found</h3>
                        <p className="text-slate-500">Try adjusting your filters to see more results.</p>
                    </div>
                ) : (
                    <>
                    {viewMode === 'grid' ? (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                            {filteredProducts.map(product => (
                                // Keeping the existing card design as an option since it's "grid"
                                <div key={product._id || product.id} className="bg-white border border-slate-200 rounded-3xl overflow-hidden group hover:shadow-xl transition-all duration-500 relative flex flex-col">
                                    <div className="aspect-square bg-slate-50 p-6 relative overflow-hidden">
                                        <img src={product.image || product.images?.[0]} alt={product.name} className="w-full h-full object-contain mix-blend-multiply group-hover:scale-110 transition-transform duration-500" />
                                        {product.stock < 5 && <span className="absolute top-4 left-4 bg-red-500 text-white text-[10px] font-black px-2 py-1 rounded-full uppercase">Low Stock</span>}
                                    </div>
                                    <div className="p-5 flex flex-col flex-1">
                                        <span className="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-1">{product.brand}</span>
                                        <h4 className="font-bold text-slate-900 mb-2 line-clamp-2">{product.name}</h4>
                                        <div className="mt-auto flex items-center justify-between">
                                            <span className="font-black text-lg">PKR {product.price.toLocaleString()}</span>
                                            <div className="flex gap-2">
                                                <button onClick={() => handleEditClick(product)} className="p-2 bg-blue-50 text-blue-600 rounded-lg hover:bg-blue-100 transition-colors"><Edit3 className="w-4 h-4" /></button>
                                                <button onClick={() => handleDeleteClick(product._id || product.id)} className="p-2 bg-red-50 text-red-600 rounded-lg hover:bg-red-100 transition-colors"><Trash2 className="w-4 h-4" /></button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    ) : (
                        <div className="bg-white border border-slate-200 rounded-3xl overflow-hidden shadow-sm">
                            <div className="overflow-x-auto">
                                <table className="w-full text-left border-collapse">
                                    <thead>
                                        <tr className="bg-slate-50/50 border-b border-slate-100 text-[11px] uppercase tracking-widest font-black text-slate-400">
                                            <th className="px-6 py-5 pl-8">Product</th>
                                            <th className="px-6 py-5">Category</th>
                                            <th className="px-6 py-5">Price</th>
                                            <th className="px-6 py-5">Stock Status</th>
                                            <th className="px-6 py-5">Visibility</th>
                                            <th className="px-6 py-5 text-right pr-8">Actions</th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-slate-100">
                                        {filteredProducts.map(product => (
                                            <tr key={product._id || product.id} className="group hover:bg-slate-50/50 transition-colors">
                                                <td className="px-6 py-4 pl-8">
                                                    <div className="flex items-center gap-4">
                                                        <div className="w-16 h-16 rounded-xl bg-slate-100 border border-slate-200 p-2 shrink-0">
                                                            <img src={product.image || product.images?.[0]} alt="" className="w-full h-full object-contain mix-blend-multiply" />
                                                        </div>
                                                        <div>
                                                            <div className="text-[10px] font-bold text-blue-600 uppercase tracking-wider mb-0.5">{product.brand}</div>
                                                            <div className="font-bold text-slate-900 text-sm">{product.name}</div>
                                                        </div>
                                                    </div>
                                                </td>
                                                <td className="px-6 py-4">
                                                    <span className="inline-flex items-center px-2.5 py-1 rounded-lg bg-slate-100 text-slate-600 text-xs font-bold capitalize">
                                                        {product.category}
                                                    </span>
                                                </td>
                                                <td className="px-6 py-4">
                                                    <div className="font-black text-slate-900 text-sm">
                                                        PKR {product.price.toLocaleString()}
                                                    </div>
                                                    {product.originalPrice > product.price && (
                                                        <div className="text-xs text-slate-400 line-through">
                                                            PKR {product.originalPrice.toLocaleString()}
                                                        </div>
                                                    )}
                                                </td>
                                                <td className="px-6 py-4">
                                                    <div className="flex flex-col gap-1.5">
                                                        <div className="w-24 h-1.5 bg-slate-100 rounded-full overflow-hidden">
                                                            <div 
                                                                className={`h-full rounded-full ${
                                                                    product.stock < 5 ? 'bg-red-500' : 
                                                                    product.stock < 20 ? 'bg-orange-400' : 'bg-green-500'
                                                                }`} 
                                                                style={{ width: `${Math.min(100, (product.stock / 50) * 100)}%` }} 
                                                            />
                                                        </div>
                                                        <span className={`text-xs font-bold ${
                                                            product.stock === 0 ? 'text-red-500' : 
                                                            product.stock < 5 ? 'text-orange-500' : 'text-slate-500'
                                                        }`}>
                                                            {product.stock === 0 ? 'Out of Stock' : `${product.stock} Units`}
                                                        </span>
                                                    </div>
                                                </td>
                                                <td className="px-6 py-4">
                                                    <div className="flex items-center gap-1">
                                                        {product.isFeatured && <span title="Featured" className="w-2 h-2 rounded-full bg-purple-500" />}
                                                        {product.isHotDeal && <span title="Hot Deal" className="w-2 h-2 rounded-full bg-orange-500" />}
                                                        {product.isNewArrival && <span title="New Arrival" className="w-2 h-2 rounded-full bg-blue-500" />}
                                                        {!product.isFeatured && !product.isHotDeal && !product.isNewArrival && (
                                                            <span className="text-xs text-slate-300 font-medium">-</span>
                                                        )}
                                                    </div>
                                                </td>
                                                <td className="px-6 py-4 pr-8 text-right">
                                                    <div className="flex items-center justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                                                        <button 
                                                            onClick={() => handleEditClick(product)}
                                                            className="p-2 text-slate-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                                                            title="Edit"
                                                        >
                                                            <Edit3 className="w-4 h-4" />
                                                        </button>
                                                        <button 
                                                            onClick={() => handleDeleteClick(product._id || product.id)}
                                                            className="p-2 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                                                            title="Delete"
                                                        >
                                                            <Trash2 className="w-4 h-4" />
                                                        </button>
                                                    </div>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    )}
                    </>
                )}
              </div>
            )}

            {activeTab === 'add-product' && (
              <form onSubmit={handleProductSubmit} className="max-w-6xl mx-auto animate-in fade-in slide-in-from-bottom-4 duration-500">
                <div className="flex items-center justify-between mb-8">
                   <button 
                     type="button" 
                     onClick={() => setActiveTab('products')}
                     className="flex items-center gap-2 text-slate-500 hover:text-slate-800 transition-colors text-sm font-bold"
                   >
                     <ChevronRight className="w-4 h-4 rotate-180" /> Back to List
                   </button>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                   {/* Left Column: Main Info */}
                   <div className="lg:col-span-2 space-y-8">
                      {/* Basic Details Card */}
                      <div className="bg-white rounded-3xl p-8 shadow-sm border border-slate-200">
                         <h3 className="text-lg font-black text-slate-800 mb-6 flex items-center gap-2">
                           <Package className="w-5 h-5 text-blue-500" /> Basic Information
                         </h3>
                         
                         <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="group md:col-span-2">
                               <label className="block text-xs font-bold uppercase tracking-widest text-slate-500 mb-2 ml-1">Product Name *</label>
                               <input 
                                 type="text" 
                                 placeholder="e.g. iPhone 15 Pro Max" 
                                 className="w-full px-5 py-4 bg-slate-50 border-2 border-slate-100 rounded-2xl focus:outline-none focus:border-blue-500 focus:bg-white transition-all font-bold text-slate-800"
                                 value={productForm.name}
                                 onChange={e => setProductForm({...productForm, name: e.target.value})}
                                 required
                               />
                            </div>
                            
                            <div className="group">
                               <label className="block text-xs font-bold uppercase tracking-widest text-slate-500 mb-2 ml-1">Brand Name *</label>
                               <input 
                                 type="text" 
                                 placeholder="e.g. Apple" 
                                 className="w-full px-5 py-4 bg-slate-50 border-2 border-slate-100 rounded-2xl focus:outline-none focus:border-blue-500 focus:bg-white transition-all font-bold text-slate-800"
                                 value={productForm.brand}
                                 onChange={e => setProductForm({...productForm, brand: e.target.value})}
                                 required
                               />
                            </div>
                            
                            <div className="group">
                               <label className="block text-xs font-bold uppercase tracking-widest text-slate-500 mb-2 ml-1">Category *</label>
                               <CustomDropdown
                                 options={[
                                   { value: 'smartphone', label: 'Smartphone' },
                                   { value: 'tablet', label: 'Tablet' },
                                   { value: 'accessories', label: 'Accessories' },
                                   { value: 'smartwatch', label: 'Smartwatch' },
                                   { value: 'laptop', label: 'Laptop' },
                                   { value: 'audio', label: 'Audio' }
                                 ]}
                                 value={productForm.category}
                                 onChange={(val) => setProductForm({...productForm, category: val})}
                                 placeholder="Select Category"
                                 className="mt-1"
                               />
                            </div>
                         </div>
                      </div>

                      {/* Pricing & Inventory Card */}
                      <div className="bg-white rounded-3xl p-8 shadow-sm border border-slate-200">
                         <h3 className="text-lg font-black text-slate-800 mb-6 flex items-center gap-2">
                           <DollarSign className="w-5 h-5 text-emerald-500" /> Pricing & Inventory
                         </h3>
                         
                         <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                            <div className="group">
                               <label className="block text-xs font-bold uppercase tracking-widest text-slate-500 mb-2 ml-1">Price (PKR) *</label>
                               <div className="relative">
                                 <span className="absolute left-5 top-1/2 -translate-y-1/2 font-black text-slate-400">PKR</span>
                                 <input 
                                   type="number" 
                                   placeholder="0.00" 
                                   className="w-full pl-16 pr-5 py-4 bg-slate-50 border-2 border-slate-100 rounded-2xl focus:outline-none focus:border-emerald-500 focus:bg-white transition-all font-bold text-slate-800"
                                   value={productForm.price}
                                   onChange={e => setProductForm({...productForm, price: e.target.value})}
                                   required
                                 />
                               </div>
                            </div>
                            <div className="group">
                               <label className="block text-xs font-bold uppercase tracking-widest text-slate-500 mb-2 ml-1">Original Price *</label>
                               <div className="relative">
                                 <span className="absolute left-5 top-1/2 -translate-y-1/2 font-black text-slate-400">PKR</span>
                                 <input 
                                   type="number" 
                                   placeholder="0.00" 
                                   className="w-full pl-16 pr-5 py-4 bg-slate-50 border-2 border-slate-100 rounded-2xl focus:outline-none focus:border-emerald-500 focus:bg-white transition-all font-bold text-slate-800"
                                   value={productForm.originalPrice}
                                   onChange={e => setProductForm({...productForm, originalPrice: e.target.value})}
                                   required
                                 />
                               </div>
                            </div>
                            <div className="group">
                               <label className="block text-xs font-bold uppercase tracking-widest text-slate-500 mb-2 ml-1">Stock Units *</label>
                               <input 
                                 type="number" 
                                 placeholder="Qty" 
                                 className="w-full px-5 py-4 bg-slate-50 border-2 border-slate-100 rounded-2xl focus:outline-none focus:border-blue-500 focus:bg-white transition-all font-bold text-slate-800"
                                 value={productForm.stock}
                                 onChange={e => setProductForm({...productForm, stock: e.target.value})}
                                 required
                               />
                            </div>
                         </div>
                      </div>

                      {/* Description Card */}
                      <div className="bg-white rounded-3xl p-8 shadow-sm border border-slate-200">
                         <div className="flex justify-between items-baseline mb-6">
                            <h3 className="text-lg font-black text-slate-800 flex items-center gap-2">
                              <MessageSquare className="w-5 h-5 text-purple-500" /> Description
                            </h3>
                            <span className="text-[10px] bg-purple-50 text-purple-600 px-3 py-1 rounded-full font-bold">Supports Formatting</span>
                         </div>
                         
                         <div className="group">
                           <label className="block text-xs font-bold uppercase tracking-widest text-slate-500 mb-2 ml-1">Product Details *</label>
                           <textarea 
                             rows="8" 
                             placeholder="Describe your product...&#10;- Use bullet points&#10;- Add details"
                             className="w-full px-5 py-4 bg-slate-50 border-2 border-slate-100 rounded-2xl focus:outline-none focus:border-purple-500 focus:bg-white transition-all font-medium text-slate-700 leading-relaxed resize-y"
                             value={productForm.description}
                             onChange={e => setProductForm({...productForm, description: e.target.value})}
                             required
                           />
                           <p className="mt-2 text-xs text-slate-400 font-medium ml-1">
                              Use <span className="text-slate-600 font-bold">Enter</span> for paragraphs and <span className="text-slate-600 font-bold">-</span> for bullet points.
                           </p>
                         </div>
                      </div>
                   </div>

                   {/* Right Column: Media & Actions */}
                   <div className="lg:col-span-1 space-y-8">
                      {/* Media Card */}
                      <div className="bg-white rounded-3xl p-8 shadow-sm border border-slate-200">
                         <h3 className="text-lg font-black text-slate-800 mb-6 flex items-center gap-2">
                           <ImageIcon className="w-5 h-5 text-pink-500" /> Media
                         </h3>
                         
                         <div className="space-y-4">
                            <label className="w-full aspect-square rounded-2xl border-3 border-dashed border-slate-200 bg-slate-50 hover:bg-slate-100 hover:border-blue-400 transition-all cursor-pointer flex flex-col items-center justify-center p-6 text-center group">
                               <div className="w-16 h-16 bg-white rounded-full shadow-lg flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                                 <Upload className="w-8 h-8 text-blue-500" />
                               </div>
                               <span className="text-sm font-black text-slate-700">Click to Upload</span>
                               <span className="text-xs text-slate-400 mt-1">PNG, JPG up to 5MB</span>
                               <input 
                                 type="file" 
                                 className="hidden" 
                                 multiple 
                                 accept="image/*"
                                 onChange={(e) => {
                                   const newFiles = Array.from(e.target.files);
                                   setProductForm(prev => {
                                     const existingFiles = prev.selectedFiles || [];
                                     const combinedFiles = [...existingFiles, ...newFiles].slice(0, 3);
                                     return { ...prev, selectedFiles: combinedFiles };
                                   });
                                   e.target.value = '';
                                 }}
                               />
                            </label>

                            {/* Preview Section */}
                            <div className="grid grid-cols-3 gap-3">
                               {(productForm.selectedFiles?.length > 0 ? productForm.selectedFiles : (productForm.images || [])).slice(0, 3).map((file, i) => (
                                  <div key={i} className="aspect-square rounded-xl overflow-hidden border border-slate-200 bg-white shadow-sm relative group">
                                     <img 
                                       src={file instanceof File ? URL.createObjectURL(file) : file} 
                                       alt="preview" 
                                       className="w-full h-full object-cover" 
                                     />
                                     <div className="absolute top-1 left-1 w-5 h-5 bg-blue-500 text-white flex items-center justify-center text-[10px] font-bold rounded-full border border-white shadow-sm z-10">
                                        {i+1}
                                     </div>
                                     <button
                                        type="button"
                                        onClick={() => {
                                            setProductForm(prev => {
                                                if (prev.selectedFiles?.length > 0) {
                                                    const newFiles = [...prev.selectedFiles];
                                                    newFiles.splice(i, 1);
                                                    return { ...prev, selectedFiles: newFiles };
                                                } else {
                                                    const newImages = [...(prev.images || [])];
                                                    newImages.splice(i, 1);
                                                    // Also update the main image if the first one is removed
                                                    const mainImage = newImages.length > 0 ? newImages[0] : '';
                                                    return { ...prev, images: newImages, image: mainImage };
                                                }
                                            });
                                        }}
                                        className="absolute top-1 right-1 w-6 h-6 bg-red-500 text-white flex items-center justify-center rounded-full shadow-md hover:bg-red-600 transition-colors z-20 cursor-pointer"
                                     >
                                        <X className="w-3 h-3 font-bold" />
                                     </button>
                                  </div>
                               ))}
                            </div>
                            
                            {productForm.selectedFiles?.length > 0 && (
                              <button 
                                type="button"
                                onClick={() => setProductForm({...productForm, selectedFiles: []})}
                                className="w-full py-2 text-xs font-bold text-red-500 bg-red-50 rounded-xl hover:bg-red-100 transition-colors"
                              >
                                Clear Selection
                              </button>
                            )}
                            
                            <label className="text-xs font-black uppercase tracking-widest text-slate-500 ml-1 block text-center">
                              Product Images (Upload 3 for Gallery)
                            </label>
                         </div>
                      </div>

                      {/* Status Card */}
                      <div className="bg-white rounded-3xl p-8 shadow-sm border border-slate-200">
                         <h3 className="text-lg font-black text-slate-800 mb-6 flex items-center gap-2">
                           <TrendingUp className="w-5 h-5 text-orange-500" /> Visibility
                         </h3>
                         
                         <div className="space-y-4">
                            {['isFeatured', 'isHotDeal', 'isNewArrival'].map(tag => (
                              <label key={tag} className="flex items-center justify-between cursor-pointer group p-3 rounded-xl hover:bg-slate-50 transition-colors border border-transparent hover:border-slate-100">
                                 <span className="font-bold text-slate-600 capitalize">{tag.replace('is', '').replace(/([A-Z])/g, ' $1').trim()}</span>
                                 <div className={`w-12 h-7 rounded-full p-1 transition-colors ${productForm[tag] ? 'bg-blue-500' : 'bg-slate-200'}`}>
                                    <div className={`w-5 h-5 bg-white rounded-full shadow-sm transition-transform ${productForm[tag] ? 'translate-x-5' : 'translate-x-0'}`} />
                                 </div>
                                 <input 
                                   type="checkbox" 
                                   className="hidden" 
                                   checked={productForm[tag]} 
                                   onChange={e => setProductForm({...productForm, [tag]: e.target.checked})} 
                                 />
                              </label>
                            ))}
                         </div>
                      </div>

                      {/* Actions */}
                      <div className="pt-4">
                         <button 
                           type="submit" 
                           className={`w-full py-5 rounded-2xl font-black text-lg shadow-xl shadow-blue-500/20 transform active:scale-95 transition-all ${
                             isUploading 
                               ? 'bg-slate-300 text-white cursor-not-allowed' 
                               : 'bg-blue-600 hover:bg-blue-700 text-white'
                           }`}
                           disabled={isUploading}
                         >
                           {isUploading ? (
                              <span className="flex items-center justify-center gap-2">
                                <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                                Processing...
                              </span>
                           ) : (
                              editingProduct ? 'Update Product' : 'Publish Product'
                           )}
                         </button>
                      </div>
                   </div>
                </div>
              </form>
            )}
          </div>
        )}
      </main>

      <NotificationModal 
        isOpen={notification.isOpen} 
        onClose={closeNotification} 
        type={notification.type} 
        title={notification.title} 
        message={notification.message} 
      />
    </div>
  );
};

export default AdminDashboard;
