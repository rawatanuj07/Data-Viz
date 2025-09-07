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
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
        <div className="flex">
          <Sidebar activeTab={activeTab} onTabChange={setActiveTab} />
          
          <main className="flex-1 p-6 overflow-y-auto">
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

        <Routes>
          <Route path="/product/:id" element={<ProductDetails />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;