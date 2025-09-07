import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { onAuthStateChanged, signOut } from 'firebase/auth';
import { auth } from './firebase/config';
import { useApp } from './context/AppContext';
import Login from './components/Auth/Login';
import Sidebar from './components/Layout/Sidebar';
import FileUpload from './components/FileUpload/FileUpload';
import DataTable from './components/Dashboard/DataTable';
import ProductDetails from './components/ProductDetails/ProductDetails';
import ChatbotTab from './components/Tabs/ChatbotTab';
import ProfitTab from './components/Tabs/ProfitTab';
import AmazonTab from './components/Tabs/AmazonTab';
import ShopifyTab from './components/Tabs/ShopifyTab';

const App: React.FC = () => {
  const { state, dispatch } = useApp();
  const [activeTab, setActiveTab] = useState('dashboard');
  const [isLoading, setIsLoading] = useState(true);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        dispatch({
          type: 'SET_USER',
          payload: {
            uid: user.uid,
            email: user.email,
            displayName: user.displayName,
            photoURL: user.photoURL,
          }
        });
      } else {
        dispatch({ type: 'SET_USER', payload: null });
      }
      setIsLoading(false);
    });

    return () => unsubscribe();
  }, [dispatch]);

  const handleSignOut = async () => {
    try {
      await signOut(auth);
      dispatch({ type: 'SET_USER', payload: null });
      dispatch({ type: 'SET_PRODUCTS', payload: [] });
    } catch (error) {
      console.error('Error signing out:', error);
    }
  };

  const renderTabContent = () => {
    switch (activeTab) {
      case 'dashboard':
        return (
          <div className="space-y-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="flex items-center justify-between"
            >
              <div>
                <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
                <p className="text-gray-600">Overview of your product data</p>
              </div>
              <button
                onClick={handleSignOut}
                className="btn-secondary"
              >
                Sign Out
              </button>
            </motion.div>
            
            {state.products.length === 0 ? (
              <FileUpload />
            ) : (
              <DataTable products={state.products} />
            )}
          </div>
        );
      case 'chatbot':
        return <ChatbotTab />;
      case 'profit':
        return <ProfitTab />;
      case 'amazon':
        return <AmazonTab />;
      case 'shopify':
        return <ShopifyTab />;
      default:
        return <div>Tab not found</div>;
    }
  };

  if (isLoading) {
  return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-purple-50">
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="text-center"
        >
          <div className="w-16 h-16 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-4">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-white"></div>
          </div>
          <p className="text-gray-600">Loading...</p>
        </motion.div>
    </div>
  );
}

  if (!state.user) {
    return <Login />;
  }

  return (
    <Router>
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 flex flex-col">
        {/* Mobile Header */}
        <div className="lg:hidden bg-white border-b border-gray-200 px-4 py-3 flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-sm">DV</span>
            </div>
            <span className="font-bold text-gray-900">DataViz</span>
          </div>
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="p-2 rounded-lg hover:bg-gray-100 transition-colors"
          >
            <svg className="w-6 h-6 text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
        </div>

        <div className="flex flex-1">
          {/* Desktop Sidebar */}
          <div className="hidden lg:block">
            <Sidebar activeTab={activeTab} onTabChange={setActiveTab} />
          </div>
          
          {/* Mobile Sidebar Overlay */}
          {isMobileMenuOpen && (
            <div className="lg:hidden fixed inset-0 z-50 flex">
              <div 
                className="fixed inset-0 bg-black bg-opacity-50"
                onClick={() => setIsMobileMenuOpen(false)}
              />
              <div className="relative w-64 bg-white shadow-xl">
                <Sidebar 
                  activeTab={activeTab} 
                  onTabChange={(tab) => {
                    setActiveTab(tab);
                    setIsMobileMenuOpen(false);
                  }} 
                />
              </div>
            </div>
          )}
          
          <main className="flex-1 p-4 lg:p-6 overflow-y-auto">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeTab}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.3 }}
              >
                {renderTabContent()}
              </motion.div>
            </AnimatePresence>
          </main>
        </div>

        {/* Footer */}
        <footer className="bg-white border-t border-gray-200 py-3 px-4 lg:py-4 lg:px-6">
          <div className="flex flex-col sm:flex-row items-center justify-between space-y-2 sm:space-y-0">
            <div className="flex items-center space-x-2">
              <div className="w-6 h-6 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full flex items-center justify-center">
                <span className="text-white font-bold text-xs">DV</span>
              </div>
              <span className="text-sm text-gray-600">DataViz Dashboard</span>
            </div>
            <div className="text-xs sm:text-sm text-gray-500">
              Developed by <span className="font-medium text-gray-700">Anuj Rawat</span>
            </div>
          </div>
        </footer>

        <Routes>
          <Route path="/product/:id" element={<ProductDetails />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;