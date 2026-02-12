import React, { createContext, useState, useEffect, useContext } from 'react';
import axios from 'axios';

const ShopContext = createContext();

export const useShop = () => useContext(ShopContext);

const API_BASE_URL = import.meta.env.VITE_API_URL || 
    ((window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1')
        ? 'http://localhost:5000/api' 
        : '/api');

const SERVER_URL = import.meta.env.VITE_API_URL 
    ? import.meta.env.VITE_API_URL.replace('/api', '') 
    : ((window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1')
        ? 'http://localhost:5000' 
        : '');

console.log('ShopContext: API_BASE_URL is set to:', API_BASE_URL);
console.log('ShopContext: Current Hostname:', window.location.hostname);

export const ShopProvider = ({ children }) => {
    const [products, setProducts] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    
    const [userOrders, setUserOrders] = useState([]);

    // Admin States
    const [adminToken, setAdminToken] = useState(localStorage.getItem('adminToken') || null);
    const [isAdmin, setIsAdmin] = useState(!!localStorage.getItem('adminToken'));
    
    // User States
    const [userToken, setUserToken] = useState(localStorage.getItem('userToken') || null);
    const [user, setUser] = useState(null);
    const [isUserLoggedIn, setIsUserLoggedIn] = useState(!!localStorage.getItem('userToken'));

    // UI States
    const [isCartOpen, setIsCartOpen] = useState(false);
    const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
    const [productModalData, setProductModalData] = useState(null);

    // Persistence-based States
    const [cart, setCart] = useState(() => {
        const saved = localStorage.getItem('cart');
        return saved ? JSON.parse(saved) : [];
    });

    const [orders, setOrders] = useState(() => {
        const saved = localStorage.getItem('orders');
        return saved ? JSON.parse(saved) : [];
    });

    const [dealPoster, setDealPoster] = useState(() => {
        const saved = localStorage.getItem('dealPoster');
        return saved ? JSON.parse(saved) : {
            image: "https://images.unsplash.com/photo-1607082348824-0a96f2a4b9da?q=80&w=1920&auto=format&fit=crop",
            title: "Mega Sale is Live!",
            description: "Enjoy up to 50% OFF on premium gadgets. Limited stock available.",
            showOnLoad: true
        };
    });

    const [homeCategoriesSelection, setHomeCategoriesSelection] = useState(() => {
        const saved = localStorage.getItem('homeCategoriesSelection');
        return saved ? JSON.parse(saved) : [];
    });

    const [headerCategoriesSelection, setHeaderCategoriesSelection] = useState(() => {
        const saved = localStorage.getItem('headerCategoriesSelection');
        return saved ? JSON.parse(saved) : [];
    });

    const [featuredPopup, setFeaturedPopup] = useState(() => {
        const saved = localStorage.getItem('featuredPopup');
        return saved ? JSON.parse(saved) : { productId: null, showOnLoad: false };
    });

    // Derived state
    const cartCount = cart.reduce((total, item) => total + item.quantity, 0);
    const cartTotal = cart.reduce((total, item) => total + (item.price * item.quantity), 0);

    // Persistence Effects
    useEffect(() => {
        localStorage.setItem('cart', JSON.stringify(cart));
    }, [cart]);

    useEffect(() => {
        localStorage.setItem('dealPoster', JSON.stringify(dealPoster));
    }, [dealPoster]);

    useEffect(() => {
        localStorage.setItem('homeCategoriesSelection', JSON.stringify(homeCategoriesSelection));
    }, [homeCategoriesSelection]);

    useEffect(() => {
        localStorage.setItem('headerCategoriesSelection', JSON.stringify(headerCategoriesSelection));
    }, [headerCategoriesSelection]);

    useEffect(() => {
        localStorage.setItem('featuredPopup', JSON.stringify(featuredPopup));
    }, [featuredPopup]);

    // Admin Persistence
    useEffect(() => {
        if (adminToken) {
            localStorage.setItem('adminToken', adminToken);
            setIsAdmin(true);
        } else {
            localStorage.removeItem('adminToken');
            setIsAdmin(false);
        }
    }, [adminToken]);

    // User Persistence
    useEffect(() => {
        if (userToken) {
            localStorage.setItem('userToken', userToken);
            setIsUserLoggedIn(true);
            // Fetch profile and orders if token exists
            if (!user) fetchUserProfile(userToken);
            fetchUserOrders(userToken);
        } else {
            localStorage.removeItem('userToken');
            setIsUserLoggedIn(false);
            setUser(null);
            setUserOrders([]);
        }
    }, [userToken]);

    const fetchUserProfile = async (tokenValue) => {
        try {
            const { data } = await axios.get(`${API_BASE_URL}/users/profile`, {
                headers: { Authorization: `Bearer ${tokenValue}` }
            });
            setUser(data);
        } catch (error) {
            console.error('Failed to fetch profile:', error);
            logoutUser();
        }
    };

    const fetchUserOrders = async (tokenValue) => {
        try {
            const { data } = await axios.get(`${API_BASE_URL}/orders/myorders`, {
                headers: { Authorization: `Bearer ${tokenValue}` }
            });
            if (Array.isArray(data)) {
                setUserOrders(data);
            }
        } catch (error) {
            console.error('Failed to fetch orders:', error);
        }
    };

    // Initial Data Fetch
    useEffect(() => {
        const fetchProducts = async () => {
            try {
                setIsLoading(true);
                const { data } = await axios.get(`${API_BASE_URL}/products`);
                if (Array.isArray(data)) {
                    setProducts(data);
                } else {
                    console.error('API Error: Products data is not an array', data);
                }
            } catch (error) {
                console.error('Failed to fetch products:', error);
            } finally {
                setIsLoading(false);
            }
        };

        fetchProducts();
    }, []);

    // Admin Data Fetch
    useEffect(() => {
        if (isAdmin && adminToken) {
            const fetchAdminData = async () => {
                try {
                    const config = { headers: { Authorization: `Bearer ${adminToken}` } };
                    const { data: orderData } = await axios.get(`${API_BASE_URL}/inquiries`, config);
                    if (Array.isArray(orderData)) {
                        setOrders(orderData);
                    }
                } catch (error) {
                    console.error('Failed to fetch admin data:', error);
                }
            };
            fetchAdminData();
        }
    }, [isAdmin, adminToken]);

    // Cart Actions
    const addToCart = (productId, quantity = 1) => {
        const product = products.find(p => p.id === productId || p._id === productId);
        if (!product) return;

        setCart(prevCart => {
            const existingItem = prevCart.find(item => item.id === productId || item._id === productId);
            if (existingItem) {
                return prevCart.map(item => 
                    (item.id === productId || item._id === productId)
                        ? { ...item, quantity: item.quantity + quantity }
                        : item
                );
            }
            return [...prevCart, { ...product, quantity }];
        });
        setIsCartOpen(true);
    };

    const removeFromCart = (productId) => {
        setCart(prevCart => prevCart.filter(item => item.id !== productId && item._id !== productId));
    };

    const updateQuantity = (productId, delta) => {
        setCart(prevCart => {
            return prevCart.map(item => {
                if (item.id === productId || item._id === productId) {
                    const newQuantity = item.quantity + delta;
                    return newQuantity > 0 ? { ...item, quantity: newQuantity } : item;
                }
                return item;
            });
        });
    };

    const clearCart = () => setCart([]);
    const toggleCart = () => setIsCartOpen(!isCartOpen);
    const openCheckout = () => { setIsCartOpen(false); setIsCheckoutOpen(true); };
    const closeCheckout = () => setIsCheckoutOpen(false);
    const openProductModal = (product) => setProductModalData(product);
    const closeProductModal = () => setProductModalData(null);

    // Admin Auth Actions
    const loginAdmin = async (email, password) => {
        console.log('API Request: POST', `${API_BASE_URL}/users/login`);
        try {
            const { data } = await axios.post(`${API_BASE_URL}/users/login`, { email, password });
            console.log('API Response Data:', data);
            
            if (data.isAdmin) {
                console.log('Admin verification successful.');
                setAdminToken(data.token);
                return true;
            } else {
                console.warn('Login successful but user is not an admin.');
                return false;
            }
        } catch (error) {
            console.error('API Login Error:', error.response?.data?.message || error.message);
            if (error.response) {
                console.error('Error Status:', error.response.status);
                console.error('Error Data:', error.response.data);
            }
            return false;
        }
    };

    const logoutAdmin = () => setAdminToken(null);

    // User Auth Actions
    const signupUser = async (userData) => {
        try {
            const { data } = await axios.post(`${API_BASE_URL}/users`, userData);
            setUserToken(data.token);
            setUser(data);
            return true;
        } catch (error) {
            console.error('Signup failed:', error);
            return false;
        }
    };

    const loginUser = async (email, password) => {
        try {
            const { data } = await axios.post(`${API_BASE_URL}/users/login`, { email, password });
            setUserToken(data.token);
            setUser(data);
            return true;
        } catch (error) {
            console.error('User login failed:', error);
            return false;
        }
    };

    const logoutUser = () => {
        setUserToken(null);
        setUser(null);
    };

    const uploadProductImages = async (files) => {
        try {
            console.log('Starting image upload for files:', files);
            const formData = new FormData();
            files.forEach(file => {
                formData.append('images', file);
            });

            const config = {
                headers: {
                    'Content-Type': 'multipart/form-data',
                    Authorization: `Bearer ${adminToken}`
                }
            };

            const { data } = await axios.post(`${API_BASE_URL}/upload`, formData, config);
            console.log('Image upload successful. Response data (URLs):', data);
            return data; // Returns array of image URLs
        } catch (error) {
            console.error('Image upload failed:', error);
            if (error.response) {
                console.error('Error Response Data:', error.response.data);
                console.error('Error Response Status:', error.response.status);
            }
            return null;
        }
    };

    const addProduct = async (productData) => {
        try {
            const config = { headers: { Authorization: `Bearer ${adminToken}` } };
            const { data } = await axios.post(`${API_BASE_URL}/products`, productData, config);
            setProducts([...products, data]);
            return true;
        } catch (error) {
            console.error('Failed to add product:', error);
            return false;
        }
    };

    const updateProduct = async (updatedProduct) => {
        try {
            const config = { headers: { Authorization: `Bearer ${adminToken}` } };
            const { data } = await axios.put(`${API_BASE_URL}/products/${updatedProduct._id || updatedProduct.id}`, updatedProduct, config);
            setProducts(products.map(p => (p._id === data._id || p.id === data.id) ? data : p));
            return true;
        } catch (error) {
            console.error('Failed to update product:', error);
            return false;
        }
    };

    const deleteProduct = async (id) => {
        try {
            const config = { headers: { Authorization: `Bearer ${adminToken}` } };
            await axios.delete(`${API_BASE_URL}/products/${id}`, config);
            setProducts(products.filter(p => p._id !== id && p.id !== id));
            return true;
        } catch (error) {
            console.error('Failed to delete product:', error);
            return false;
        }
    };

    const updateDealPoster = (newPoster) => setDealPoster(newPoster);
    const updateHomeCategoriesSelection = (cats) => setHomeCategoriesSelection(cats);
    const updateHeaderCategoriesSelection = (cats) => setHeaderCategoriesSelection(cats);
    const updateFeaturedPopup = (config) => setFeaturedPopup(config);

    const getImageUrl = (path) => {
        if (!path) return '';
        if (path.startsWith('http') || path.startsWith('blob:') || path.startsWith('data:')) return path;
        // Ensure path starts with / if not present (though upload usually adds it)
        const cleanPath = path.startsWith('/') ? path : `/${path}`;
        return `${SERVER_URL}${cleanPath}`;
    };

    const placeOrder = async (formData) => {
        try {
            const config = { headers: { Authorization: `Bearer ${userToken}` } };
            
            const orderData = {
                orderItems: cart.map(item => ({
                    name: item.name,
                    quantity: item.quantity,
                    image: item.images[0],
                    price: item.price,
                    product: item._id || item.id
                })),
                shippingAddress: {
                    fullName: formData.fullName,
                    address: formData.address,
                    city: formData.city,
                    postalCode: formData.postalCode,
                    phone: formData.phone
                },
                paymentMethod: formData.paymentMethod,
                itemsPrice: cartTotal,
                shippingPrice: 200, // Flat rate example
                taxPrice: 0,
                totalPrice: cartTotal + 200,
                transactionId: formData.transactionId
            };

            const { data } = await axios.post(`${API_BASE_URL}/orders`, orderData, config);
            clearCart();
            fetchUserOrders(userToken);
            return { success: true, id: data._id };
        } catch (error) {
            console.error('Failed to place order:', error);
            return { success: false, message: error.response?.data?.message || 'Failed to place order' };
        }
    };

    return (
        <ShopContext.Provider value={{
            products,
            isLoading,
            isAdmin,
            cart,
            orders,
            dealPoster,
            homeCategoriesSelection,
            featuredPopup,
            cartCount,
            cartTotal,
            user,
            userOrders,
            isUserLoggedIn,
            isCartOpen,
            isCheckoutOpen,
            productModalData,
            addToCart,
            removeFromCart,
            updateQuantity,
            clearCart,
            toggleCart,
            openCheckout,
            closeCheckout,
            openProductModal,
            closeProductModal,
            placeOrder,
            loginAdmin,
            logoutAdmin,
            signupUser,
            loginUser,
            logoutUser,
            addProduct,
            updateProduct,
            deleteProduct,
            uploadProductImages,
            updateDealPoster,
            updateHomeCategoriesSelection,
            updateHeaderCategoriesSelection,
            updateFeaturedPopup,
            getImageUrl
        }}>
            {children}
        </ShopContext.Provider>
    );
};
