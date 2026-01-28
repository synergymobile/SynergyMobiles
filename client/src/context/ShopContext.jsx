import React, { createContext, useState, useEffect, useContext } from 'react';
import axios from 'axios';

const ShopContext = createContext();

export const useShop = () => useContext(ShopContext);

const API_BASE_URL = import.meta.env.VITE_API_URL || 
    (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1'
        ? 'http://localhost:5000/api' 
        : '/api');

console.log('ShopContext: API_BASE_URL is set to:', API_BASE_URL);
console.log('ShopContext: Current Hostname:', window.location.hostname);

export const ShopProvider = ({ children }) => {
    const [products, setProducts] = useState([
        {
            _id: "p1",
            id: 1,
            name: "iPhone 15 Pro Max",
            brand: "Apple",
            description: "Experience the next level of mobile technology with the titanium-built iPhone 15 Pro Max.",
            originalPrice: 380000,
            price: 345000,
            category: "smartphone",
            images: ["https://images.unsplash.com/photo-1696446701796-da61225697cc?q=80&w=1000&auto=format&fit=crop"],
            isFeatured: true,
            isNewArrival: true,
            rating: 4.9,
            slug: "iphone-15-pro-max"
        },
        {
            _id: "p2",
            id: 2,
            name: "Samsung Galaxy S24 Ultra",
            brand: "Samsung",
            description: "Enter the era of mobile AI with the Galaxy S24 Ultra, featuring a 200MP camera and built-in S Pen.",
            originalPrice: 350000,
            price: 310000,
            category: "smartphone",
            images: ["https://images.unsplash.com/photo-1707064434241-e940f81f181f?q=80&w=1000&auto=format&fit=crop"],
            isFeatured: true,
            isNewArrival: false,
            rating: 4.8,
            slug: "samsung-s24-ultra"
        },
        {
            _id: "p3",
            id: 3,
            name: "Sony WH-1000XM5",
            brand: "Sony",
            description: "Industry-leading noise cancellation and premium sound quality for an immersive audio experience.",
            originalPrice: 95000,
            price: 85000,
            category: "audio",
            images: ["https://images.unsplash.com/photo-1618366712010-f4ae9c647dcb?q=80&w=1000&auto=format&fit=crop"],
            isFeatured: true,
            isNewArrival: true,
            rating: 4.7,
            slug: "sony-wh1000xm5"
        },
        {
            _id: "p4",
            id: 4,
            name: "MacBook Pro M3 Max",
            brand: "Apple",
            description: "The most advanced chips ever built for a personal computer. Liquid Retina XDR display.",
            originalPrice: 950000,
            price: 850000,
            category: "laptop",
            images: ["https://images.unsplash.com/photo-1517336714731-489689fd1ca8?q=80&w=1000&auto=format&fit=crop"],
            isFeatured: true,
            isNewArrival: true,
            rating: 5.0,
            slug: "macbook-pro-m3"
        },
        {
            _id: "p5",
            id: 5,
            name: "iPad Pro M2",
            brand: "Apple",
            description: "Astonishing performance. Incredibly advanced displays. Superfast wireless connectivity.",
            originalPrice: 280000,
            price: 245000,
            category: "tablet",
            images: ["https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?q=80&w=1000&auto=format&fit=crop"],
            isFeatured: false,
            isNewArrival: true,
            rating: 4.8,
            slug: "ipad-pro-m2"
        },
        {
            _id: "p6",
            id: 6,
            name: "Apple Watch Ultra 2",
            brand: "Apple",
            description: "The most rugged and capable Apple Watch ever. Designed for athletes and adventurers.",
            originalPrice: 250000,
            price: 220000,
            category: "wearable",
            images: ["https://images.unsplash.com/photo-1434493907317-a46b53b81882?q=80&w=1000&auto=format&fit=crop"],
            isFeatured: true,
            isNewArrival: false,
            rating: 4.9,
            slug: "apple-watch-ultra-2"
        },
        {
            _id: "p7",
            id: 7,
            name: "Google Pixel 8 Pro",
            brand: "Google",
            description: "The all-pro phone engineered by Google. It's sleek, sophisticated, and incredibly powerful.",
            originalPrice: 220000,
            price: 195000,
            category: "smartphone",
            images: ["https://images.unsplash.com/photo-1696424317924-d25039f60b73?q=80&w=1000&auto=format&fit=crop"],
            isFeatured: true,
            isNewArrival: true,
            rating: 4.7,
            slug: "google-pixel-8-pro"
        },
        {
            _id: "p8",
            id: 8,
            name: "Samsung Galaxy Tab S9",
            brand: "Samsung",
            description: "The new standard for premium tablets. Dynamic AMOLED 2X display and S Pen included.",
            originalPrice: 210000,
            price: 185000,
            category: "tablet",
            images: ["https://images.unsplash.com/photo-1636114673156-052a83459fc1?q=80&w=1000&auto=format&fit=crop"],
            isFeatured: false,
            isNewArrival: false,
            rating: 4.6,
            slug: "samsung-tab-s9"
        },
        {
            _id: "p9",
            id: 9,
            name: "AirPods Pro (2nd Gen)",
            brand: "Apple",
            description: "Rebuilt from the sound up. Magic that sounds like a revelation.",
            originalPrice: 75000,
            price: 65000,
            category: "audio",
            images: ["https://images.unsplash.com/photo-1588423770574-0409327aab2e?q=80&w=1000&auto=format&fit=crop"],
            isFeatured: true,
            isNewArrival: false,
            rating: 4.8,
            slug: "airpods-pro-2"
        },
        {
            _id: "p10",
            id: 10,
            name: "Apple Watch Series 9",
            brand: "Apple",
            description: "Smarter. Brighter. Mightier. Carbon neutral options available.",
            originalPrice: 125000,
            price: 110000,
            category: "wearable",
            images: ["https://images.unsplash.com/photo-1517502474097-f9b30659dadb?q=80&w=1000&auto=format&fit=crop"],
            isFeatured: true,
            isNewArrival: true,
            rating: 4.7,
            slug: "apple-watch-9"
        },
        {
            _id: "p11",
            id: 11,
            name: "Nothing Phone (2)",
            brand: "Nothing",
            description: "A new story with Nothing. Come for the Glyph Interface, stay for the unique OS.",
            originalPrice: 165000,
            price: 145000,
            category: "smartphone",
            images: ["https://images.unsplash.com/photo-1691438128447-798544bd06b7?q=80&w=1000&auto=format&fit=crop"],
            isFeatured: false,
            isNewArrival: true,
            rating: 4.5,
            slug: "nothing-phone-2"
        },
        {
            _id: "p12",
            id: 12,
            name: "Xiaomi 14 Ultra",
            brand: "Xiaomi",
            description: "Legendary imaging with Leica. Snapdragon 8 Gen 3 for peak performance.",
            originalPrice: 295000,
            price: 265000,
            category: "smartphone",
            images: ["https://images.unsplash.com/photo-1616348436168-de43ad0db179?q=80&w=1000&auto=format&fit=crop"],
            isFeatured: true,
            isNewArrival: true,
            rating: 4.8,
            slug: "xiaomi-14-ultra"
        },
        {
            _id: "p13",
            id: 13,
            name: "Bose QuietComfort Ultra",
            brand: "Bose",
            description: "World-class noise cancellation, quieter than ever before. Breakthrough spatial audio.",
            originalPrice: 115000,
            price: 105000,
            category: "audio",
            images: ["https://images.unsplash.com/photo-1505740420928-5e560c06d30e?q=80&w=1000&auto=format&fit=crop"],
            isFeatured: true,
            isNewArrival: false,
            rating: 4.8,
            slug: "bose-qc-ultra"
        },
        {
            _id: "p14",
            id: 14,
            name: "Galaxy Watch 6 Classic",
            brand: "Samsung",
            description: "The watch that knows you best is back with a more personalized health experience.",
            originalPrice: 95000,
            price: 85000,
            category: "wearable",
            images: ["https://images.unsplash.com/photo-1579586337278-3befd40fd17a?q=80&w=1000&auto=format&fit=crop"],
            isFeatured: false,
            isNewArrival: true,
            rating: 4.6,
            slug: "galaxy-watch-6"
        },
        {
            _id: "p15",
            id: 15,
            name: "Sennheiser Momentum 4",
            brand: "Sennheiser",
            description: "Superior sound meets premium comfort. Exceptional 60-hour battery life.",
            originalPrice: 98000,
            price: 89000,
            category: "audio",
            images: ["https://images.unsplash.com/photo-1546435770-a3e426bf472b?q=80&w=1000&auto=format&fit=crop"],
            isFeatured: true,
            isNewArrival: false,
            rating: 4.7,
            slug: "sennheiser-m4"
        },
        {
            _id: "p16",
            id: 16,
            name: "Anker 737 Power Bank",
            brand: "Anker",
            description: "Ultra-powerful 2-way charging. 140W max output for laptops and phones.",
            originalPrice: 45000,
            price: 38000,
            category: "accessory",
            images: ["https://images.unsplash.com/photo-1619131814187-a2296d51e12d?q=80&w=1000&auto=format&fit=crop"],
            isFeatured: false,
            isNewArrival: true,
            rating: 4.9,
            slug: "anker-737"
        },
        {
            _id: "p17",
            id: 17,
            name: "DJI Mini 4 Pro",
            brand: "DJI",
            description: "Mini to the Max. 4K/60fps HDR True Vertical Shooting.",
            originalPrice: 285000,
            price: 255000,
            category: "accessory",
            images: ["https://images.unsplash.com/photo-1473968512447-ac175bb42eca?q=80&w=1000&auto=format&fit=crop"],
            isFeatured: true,
            isNewArrival: true,
            rating: 4.9,
            slug: "dji-mini-4"
        },
        {
            _id: "p18",
            id: 18,
            name: "ASUS ROG Ally",
            brand: "ASUS",
            description: "Any Game. Anywhere. A powerful handheld gaming machine.",
            originalPrice: 195000,
            price: 175000,
            category: "smartphone", // Categorized as smartphone for simplicity in this mockup
            images: ["https://images.unsplash.com/photo-1531390844884-f93dca7cbc9f?q=80&w=1000&auto=format&fit=crop"],
            isFeatured: true,
            isNewArrival: false,
            rating: 4.6,
            slug: "rog-ally"
        }
    ]);
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
            return data; // Returns array of Cloudinary URLs
        } catch (error) {
            console.error('Image upload failed:', error);
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
            updateDealPoster
        }}>
            {children}
        </ShopContext.Provider>
    );
};
