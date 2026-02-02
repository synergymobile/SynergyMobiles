import React, { useState, useEffect, useMemo, useRef } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Filter, X, ChevronDown, ChevronUp } from 'lucide-react';
import ProductCard from '../components/ProductCard';
import { useShop } from '../context/ShopContext';

const ProductPage = () => {
  const { products } = useShop();
  const location = useLocation();
  const navigate = useNavigate();
  const [isMobileFiltersOpen, setIsMobileFiltersOpen] = useState(false);
  const sortDropdownRef = useRef(null);
  
  // Parse query params
  const searchParams = new URLSearchParams(location.search);
  const initialCategory = searchParams.get('category') || 'all';
  const initialBrand = searchParams.get('brand') || 'all';
  
  // Filter States
  const [selectedCategory, setSelectedCategory] = useState(initialCategory);
  const [selectedBrand, setSelectedBrand] = useState(initialBrand);
  const [priceRange, setPriceRange] = useState([0, 500000]);
  const [sortBy, setSortBy] = useState('featured');
  const [expandedSections, setExpandedSections] = useState({
    category: true,
    brand: true,
    price: true
  });

  const [isSortDropdownOpen, setIsSortDropdownOpen] = useState(false);
  
  const sortOptions = [
    { value: 'featured', label: 'Featured' },
    { value: 'newest', label: 'Newest Arrivals' },
    { value: 'price-low', label: 'Price: Low to High' },
    { value: 'price-high', label: 'Price: High to Low' },
    { value: 'rating', label: 'Best Rating' }
  ];

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (sortDropdownRef.current && !sortDropdownRef.current.contains(event.target)) {
        setIsSortDropdownOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  // Sync state with URL changes
  useEffect(() => {
    const params = new URLSearchParams(location.search);
    setSelectedCategory(params.get('category') || 'all');
    setSelectedBrand(params.get('brand') || 'all');
  }, [location.search]);

  // Update URL when filters change
  const updateFilter = (key, value) => {
    const params = new URLSearchParams(location.search);
    if (value === 'all') {
      params.delete(key);
    } else {
      params.set(key, value);
    }
    navigate({ search: params.toString() });
  };

  // Toggle sections
  const toggleSection = (section) => {
    setExpandedSections(prev => ({ ...prev, [section]: !prev[section] }));
  };

  // Filter Logic
  const filteredProducts = useMemo(() => {
    let result = [...products];

    // Filter by Category
    if (selectedCategory !== 'all') {
      result = result.filter(p => 
        p.category.toLowerCase() === selectedCategory.toLowerCase()
      );
    }

    // Filter by Brand
    if (selectedBrand !== 'all') {
      result = result.filter(p => 
        p.brand.toLowerCase() === selectedBrand.toLowerCase()
      );
    }

    // Filter by Price
    result = result.filter(p => 
      p.price >= priceRange[0] && p.price <= priceRange[1]
    );

    // Sorting
    switch (sortBy) {
      case 'price-low':
        result.sort((a, b) => a.price - b.price);
        break;
      case 'price-high':
        result.sort((a, b) => b.price - a.price);
        break;
      case 'newest':
        result.sort((a, b) => (b.isNewArrival ? 1 : 0) - (a.isNewArrival ? 1 : 0));
        break;
      case 'rating':
        result.sort((a, b) => b.rating - a.rating);
        break;
      default: // featured
        result.sort((a, b) => (b.isFeatured ? 1 : 0) - (a.isFeatured ? 1 : 0));
    }

    return result;
  }, [products, selectedCategory, selectedBrand, priceRange, sortBy]);

  // Unique values for filters
  const categories = [...new Set(products.map(p => p.category))].filter(Boolean).sort();
  const brands = [...new Set(products.map(p => p.brand))];

  const clearFilters = () => {
    setSelectedCategory('all');
    setSelectedBrand('all');
    setPriceRange([0, 500000]);
    navigate({ search: '' });
  };

  return (
    <div className="bg-gray-50 min-h-screen py-8">
      <div className="container-custom px-4 md:px-8 lg:px-12">
        {/* Header & Mobile Filter Toggle */}
        <div className="flex flex-col md:flex-row justify-between items-end mb-8 gap-4 border-b border-gray-200 pb-6">
          <div>
            <h1 className="text-4xl font-bold text-gray-900 tracking-tight mb-2">
              {selectedCategory !== 'all' 
                ? `${selectedCategory.charAt(0).toUpperCase() + selectedCategory.slice(1)}s`
                : 'All Products'}
            </h1>
            <p className="text-gray-500">
              Showing {filteredProducts.length} results for your search
            </p>
          </div>
          
          <div className="flex items-center gap-4 w-full md:w-auto">
            <button 
              className="md:hidden flex items-center gap-2 px-4 py-2.5 bg-white border border-gray-200 rounded-lg shadow-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors"
              onClick={() => setIsMobileFiltersOpen(true)}
            >
              <Filter className="w-4 h-4" /> Filters
            </button>
            
            <div className="relative flex items-center">
              <span className="text-sm text-gray-500 mr-3 hidden sm:inline-block font-medium">Sort by:</span>
              
              <div className="relative" ref={sortDropdownRef}>
                <button 
                  onClick={() => setIsSortDropdownOpen(!isSortDropdownOpen)}
                  className="flex items-center justify-between min-w-[180px] gap-3 px-4 py-2.5 bg-white border border-gray-200 rounded-xl shadow-sm hover:border-primary/50 hover:ring-2 hover:ring-primary/5 transition-all duration-200 group"
                >
                  <span className="text-gray-700 font-medium text-sm">
                    {sortOptions.find(opt => opt.value === sortBy)?.label || 'Featured'}
                  </span>
                  <ChevronDown className={`w-4 h-4 text-gray-400 transition-transform duration-200 group-hover:text-primary ${isSortDropdownOpen ? 'rotate-180' : ''}`} />
                </button>

                {isSortDropdownOpen && (
                  <div className="absolute right-0 top-full mt-2 w-full min-w-[200px] bg-white rounded-xl shadow-xl border border-gray-100 py-2 z-30 animate-in fade-in zoom-in-95 duration-100 origin-top-right">
                    {sortOptions.map((option) => (
                      <button
                        key={option.value}
                        onClick={() => {
                          setSortBy(option.value);
                          setIsSortDropdownOpen(false);
                        }}
                        className={`w-full text-left px-4 py-2.5 text-sm transition-colors flex items-center justify-between
                          ${sortBy === option.value 
                            ? 'bg-primary/5 text-primary font-medium' 
                            : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                          }`}
                      >
                        {option.label}
                        {sortBy === option.value && (
                          <div className="w-1.5 h-1.5 rounded-full bg-primary"></div>
                        )}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        <div className="flex flex-col lg:flex-row gap-8">
          {/* Sidebar Filters */}
          <aside className={`
            fixed inset-y-0 left-0 z-50 w-80 bg-white transform transition-transform duration-300 ease-in-out lg:relative lg:transform-none lg:w-64 lg:bg-transparent lg:z-0
            ${isMobileFiltersOpen ? 'translate-x-0 shadow-2xl' : '-translate-x-full lg:translate-x-0'}
          `}>
            <div className="p-6 lg:p-0 h-full overflow-y-auto lg:overflow-visible">
              <div className="flex justify-between items-center lg:hidden mb-6">
                <h2 className="text-xl font-bold">Filters</h2>
                <button onClick={() => setIsMobileFiltersOpen(false)}>
                  <X className="w-6 h-6 text-gray-500" />
                </button>
              </div>

              {/* Active Filters Summary */}
              {(selectedCategory !== 'all' || selectedBrand !== 'all') && (
                <div className="mb-6 bg-white p-4 rounded-xl border border-gray-100 shadow-sm">
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-sm font-semibold text-gray-700">Active Filters:</span>
                    <button onClick={clearFilters} className="text-xs text-primary hover:underline">Clear All</button>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {selectedCategory !== 'all' && (
                      <span className="bg-primary/10 text-primary text-xs px-2 py-1 rounded-full flex items-center gap-1">
                        {selectedCategory}
                        <X className="w-3 h-3 cursor-pointer" onClick={() => updateFilter('category', 'all')} />
                      </span>
                    )}
                    {selectedBrand !== 'all' && (
                      <span className="bg-primary/10 text-primary text-xs px-2 py-1 rounded-full flex items-center gap-1">
                        {selectedBrand}
                        <X className="w-3 h-3 cursor-pointer" onClick={() => updateFilter('brand', 'all')} />
                      </span>
                    )}
                  </div>
                </div>
              )}

              {/* Categories Section */}
              <div className="mb-6 bg-white p-5 rounded-xl border border-gray-100 shadow-sm">
                <button 
                  className="flex justify-between items-center w-full mb-4"
                  onClick={() => toggleSection('category')}
                >
                  <h3 className="font-semibold text-gray-800">Categories</h3>
                  {expandedSections.category ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                </button>
                
                {expandedSections.category && (
                  <div className="space-y-2">
                    {categories.map(cat => (
                      <label key={cat} className="flex items-center gap-3 cursor-pointer group">
                        <div className={`
                          w-5 h-5 rounded border flex items-center justify-center transition-colors
                          ${selectedCategory === cat ? 'bg-primary border-primary' : 'border-gray-300 group-hover:border-primary'}
                        `}>
                          {selectedCategory === cat && <div className="w-2 h-2 bg-white rounded-full" />}
                        </div>
                        <input 
                          type="radio" 
                          name="category" 
                          className="hidden"
                          checked={selectedCategory === cat}
                          onChange={() => updateFilter('category', cat)}
                        />
                        <span className={`text-sm capitalize ${selectedCategory === cat ? 'text-primary font-medium' : 'text-gray-600'}`}>
                          {cat}
                        </span>
                      </label>
                    ))}
                  </div>
                )}
              </div>

              {/* Brands Section */}
              <div className="mb-6 bg-white p-5 rounded-xl border border-gray-100 shadow-sm">
                <button 
                  className="flex justify-between items-center w-full mb-4"
                  onClick={() => toggleSection('brand')}
                >
                  <h3 className="font-semibold text-gray-800">Brands</h3>
                  {expandedSections.brand ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                </button>
                
                {expandedSections.brand && (
                  <div className="space-y-2 max-h-60 overflow-y-auto pr-2 custom-scrollbar">
                    {brands.map(brand => (
                      <label key={brand} className="flex items-center gap-3 cursor-pointer group">
                         <div className={`
                          w-4 h-4 rounded border flex items-center justify-center transition-colors
                          ${selectedBrand === brand ? 'bg-primary border-primary' : 'border-gray-300 group-hover:border-primary'}
                        `}>
                          {selectedBrand === brand && <div className="w-2 h-2 bg-white rounded-full" />}
                        </div>
                        <input 
                          type="radio" 
                          name="brand" 
                          className="hidden"
                          checked={selectedBrand === brand}
                          onChange={() => updateFilter('brand', brand)}
                        />
                        <span className={`text-sm ${selectedBrand === brand ? 'text-primary font-medium' : 'text-gray-600'}`}>
                          {brand}
                        </span>
                      </label>
                    ))}
                  </div>
                )}
              </div>

              {/* Price Range Section */}
              <div className="bg-white p-5 rounded-xl border border-gray-100 shadow-sm">
                <button 
                  className="flex justify-between items-center w-full mb-4"
                  onClick={() => toggleSection('price')}
                >
                  <h3 className="font-semibold text-gray-800">Price Range</h3>
                  {expandedSections.price ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                </button>
                
                {expandedSections.price && (
                  <div className="px-2">
                    <input 
                      type="range" 
                      min="0" 
                      max="500000" 
                      step="5000"
                      value={priceRange[1]}
                      onChange={(e) => setPriceRange([0, parseInt(e.target.value)])}
                      className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-primary"
                    />
                    <div className="flex justify-between mt-2 text-xs text-gray-600 font-medium">
                      <span>PKR 0</span>
                      <span>PKR {priceRange[1].toLocaleString()}</span>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </aside>
          
          {/* Overlay for mobile filters */}
          {isMobileFiltersOpen && (
            <div 
              className="fixed inset-0 bg-black/50 z-40 lg:hidden"
              onClick={() => setIsMobileFiltersOpen(false)}
            />
          )}

          {/* Product Grid */}
          <main className="flex-1">
            {filteredProducts.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredProducts.map(p => (
                  <ProductCard key={p.id} product={p} />
                ))}
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center py-20 bg-white rounded-xl border border-gray-100">
                <div className="bg-gray-50 p-6 rounded-full mb-4">
                    <Filter className="w-10 h-10 text-gray-400" />
                </div>
                <h3 className="text-xl font-bold text-gray-800 mb-2">No products found</h3>
                <p className="text-gray-500 mb-6">Try adjusting your filters or search criteria.</p>
                <button 
                  onClick={clearFilters}
                  className="px-6 py-2 bg-primary text-white rounded-lg hover:bg-primary-dark transition-colors"
                >
                  Clear All Filters
                </button>
              </div>
            )}
          </main>
        </div>
      </div>
    </div>
  );
};

export default ProductPage;
