import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ShoppingBagIcon, ChartBarIcon, CurrencyDollarIcon, ArrowTrendingUpIcon } from '@heroicons/react/24/outline';

const AmazonTab: React.FC = () => {
  const [isConnected, setIsConnected] = useState(false);
  const [apiKey, setApiKey] = useState('');
  const [secretKey, setSecretKey] = useState('');

  const handleConnect = () => {
    if (apiKey && secretKey) {
      setIsConnected(true);
    }
  };

  const handleDisconnect = () => {
    setIsConnected(false);
    setApiKey('');
    setSecretKey('');
  };

  const mockData = {
    totalOrders: 1247,
    totalRevenue: 45678.90,
    averageOrderValue: 36.65,
    conversionRate: 3.2,
    topSellingProduct: 'Wireless Headphones',
    monthlyGrowth: 12.5,
  };

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
    }).format(value);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="space-y-6"
    >
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="card"
      >
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <div className="w-12 h-12 bg-gradient-to-r from-orange-500 to-yellow-500 rounded-lg flex items-center justify-center mr-4">
              <ShoppingBagIcon className="w-6 h-6 text-white" />
            </div>
            <div>
              <h2 className="text-2xl font-bold text-gray-900">Amazon Integration</h2>
              <p className="text-gray-600">Connect your Amazon seller account</p>
            </div>
          </div>
          <div className={`px-4 py-2 rounded-full text-sm font-medium ${
            isConnected 
              ? 'bg-green-100 text-green-800' 
              : 'bg-gray-100 text-gray-800'
          }`}>
            {isConnected ? 'Connected' : 'Not Connected'}
          </div>
        </div>
      </motion.div>

      {!isConnected ? (
        /* Connection Form */
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="card"
        >
          <h3 className="text-lg font-semibold text-gray-900 mb-6">
            Connect Your Amazon Account
          </h3>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                API Key
              </label>
              <input
                type="password"
                value={apiKey}
                onChange={(e) => setApiKey(e.target.value)}
                placeholder="Enter your Amazon API key"
                className="input-field"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Secret Key
              </label>
              <input
                type="password"
                value={secretKey}
                onChange={(e) => setSecretKey(e.target.value)}
                placeholder="Enter your Amazon secret key"
                className="input-field"
              />
            </div>
            <button
              onClick={handleConnect}
              disabled={!apiKey || !secretKey}
              className="btn-primary w-full disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Connect to Amazon
            </button>
          </div>
          <div className="mt-6 p-4 bg-blue-50 rounded-lg">
            <h4 className="font-medium text-blue-900 mb-2">How to get your API credentials:</h4>
            <ol className="text-sm text-blue-800 space-y-1 list-decimal list-inside">
              <li>Log in to your Amazon Seller Central account</li>
              <li>Go to Apps & Services → API Keys</li>
              <li>Generate a new API key and secret</li>
              <li>Copy the credentials and paste them above</li>
            </ol>
          </div>
        </motion.div>
      ) : (
        /* Dashboard */
        <>
          {/* Metrics */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
          >
            <div className="card">
              <div className="flex items-center">
                <div className="p-3 bg-blue-100 rounded-lg mr-4">
                  <ShoppingBagIcon className="w-6 h-6 text-blue-600" />
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-600">Total Orders</p>
                  <p className="text-2xl font-bold text-gray-900">{mockData.totalOrders.toLocaleString()}</p>
                </div>
              </div>
            </div>

            <div className="card">
              <div className="flex items-center">
                <div className="p-3 bg-green-100 rounded-lg mr-4">
                  <CurrencyDollarIcon className="w-6 h-6 text-green-600" />
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-600">Total Revenue</p>
                  <p className="text-2xl font-bold text-gray-900">{formatCurrency(mockData.totalRevenue)}</p>
                </div>
              </div>
            </div>

            <div className="card">
              <div className="flex items-center">
                <div className="p-3 bg-purple-100 rounded-lg mr-4">
                  <ChartBarIcon className="w-6 h-6 text-purple-600" />
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-600">Avg Order Value</p>
                  <p className="text-2xl font-bold text-gray-900">{formatCurrency(mockData.averageOrderValue)}</p>
                </div>
              </div>
            </div>

            <div className="card">
              <div className="flex items-center">
                <div className="p-3 bg-orange-100 rounded-lg mr-4">
                  <ArrowTrendingUpIcon className="w-6 h-6 text-orange-600" />
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-600">Conversion Rate</p>
                  <p className="text-2xl font-bold text-gray-900">{mockData.conversionRate}%</p>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Charts and Data */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.6 }}
              className="card"
            >
              <h3 className="text-lg font-semibold text-gray-900 mb-4">
                Sales Performance
              </h3>
              <div className="h-64 bg-gradient-to-br from-blue-50 to-purple-50 rounded-lg flex items-center justify-center">
                <div className="text-center">
                  <ChartBarIcon className="w-12 h-12 text-gray-400 mx-auto mb-2" />
                  <p className="text-gray-600">Sales chart would appear here</p>
                  <p className="text-sm text-gray-500">Connected to Amazon API</p>
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.8 }}
              className="card"
            >
              <h3 className="text-lg font-semibold text-gray-900 mb-4">
                Top Products
              </h3>
              <div className="space-y-3">
                <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <div>
                    <p className="font-medium text-gray-900">{mockData.topSellingProduct}</p>
                    <p className="text-sm text-gray-600">Best seller this month</p>
                  </div>
                  <div className="text-right">
                    <p className="font-medium text-green-600">+{mockData.monthlyGrowth}%</p>
                  </div>
                </div>
                <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <div>
                    <p className="font-medium text-gray-900">Gaming Mouse</p>
                    <p className="text-sm text-gray-600">High conversion rate</p>
                  </div>
                  <div className="text-right">
                    <p className="font-medium text-green-600">+8.2%</p>
                  </div>
                </div>
                <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <div>
                    <p className="font-medium text-gray-900">Bluetooth Speaker</p>
                    <p className="text-sm text-gray-600">Steady performer</p>
                  </div>
                  <div className="text-right">
                    <p className="font-medium text-green-600">+5.1%</p>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>

          {/* Disconnect Button */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.0 }}
            className="flex justify-end"
          >
            <button
              onClick={handleDisconnect}
              className="btn-secondary"
            >
              Disconnect Account
            </button>
          </motion.div>
        </>
      )}
    </motion.div>
  );
};

export default AmazonTab;


