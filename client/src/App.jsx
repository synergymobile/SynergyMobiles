import React from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import { ShopProvider, useShop } from './context/ShopContext';
import Header from './components/Header';
import Footer from './components/Footer';
import HomePage from './pages/HomePage';
import ProductPage from './pages/ProductPage';
import ProductDetailPage from './pages/ProductDetailPage';
import AdminDashboard from './pages/AdminDashboard';
import LoginPage from './pages/LoginPage';
import AdminLoginPage from './pages/AdminLoginPage';
import SignupPage from './pages/SignupPage';
import ProfilePage from './pages/ProfilePage';
import AboutPage from './pages/AboutPage';
import ContactPage from './pages/ContactPage';
import PrivacyPolicy from './pages/PrivacyPolicy';
import TermsPage from './pages/TermsPage';
import ReturnPolicy from './pages/ReturnPolicy';
import CartSidebar from './components/CartSidebar';
import ProductModal from './components/ProductModal';
import CheckoutModal from './components/CheckoutModal';
import DealPosterModal from './components/DealPosterModal';
import ScrollToTop from './components/ScrollToTop';

const AppContent = () => {
    const { isCheckoutOpen, closeCheckout, productModalData, closeProductModal } = useShop();
    const location = useLocation();

    // Check if the current route is an admin route
    const isAdminRoute = location.pathname.startsWith('/admin');

    return (
        <div className="flex flex-col min-h-screen">
            {!isAdminRoute && <Header />}
            <main className="grow">
                <Routes>
                    <Route path="/" element={<HomePage />} />
                    <Route path="/products" element={<ProductPage />} />
                    <Route path="/accessories" element={<ProductPage />} />
                    <Route path="/product/:slug" element={<ProductDetailPage />} />
                     <Route path="/admin" element={<AdminDashboard />} />
                     <Route path="/admin/login" element={<AdminLoginPage />} />
                     <Route path="/login" element={<LoginPage />} />
                     <Route path="/signup" element={<SignupPage />} />
                     <Route path="/profile" element={<ProfilePage />} />
                     <Route path="/about" element={<AboutPage />} />
                    <Route path="/contact" element={<ContactPage />} />
                    <Route path="/privacy" element={<PrivacyPolicy />} />
                    <Route path="/terms" element={<TermsPage />} />
                    <Route path="/returns" element={<ReturnPolicy />} />
                    <Route path="*" element={<HomePage />} />
                </Routes>
            </main>
            {!isAdminRoute && <Footer />}
            {!isAdminRoute && <CartSidebar />}
            
            {productModalData && (
                <ProductModal 
                    key={productModalData.id}
                    isOpen={!!productModalData} 
                    product={productModalData} 
                    onClose={closeProductModal} 
                />
            )}
            {isCheckoutOpen && (
                <CheckoutModal 
                    isOpen={isCheckoutOpen} 
                    onClose={closeCheckout} 
                />
            )}
            {!isAdminRoute && <DealPosterModal />}
        </div>
    );
};

function App() {
  return (
    <HelmetProvider>
      <ShopProvider>
        <Router>
          <ScrollToTop />
          <AppContent />
        </Router>
      </ShopProvider>
    </HelmetProvider>
  );
}

export default App;
