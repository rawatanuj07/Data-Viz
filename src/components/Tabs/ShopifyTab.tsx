import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { BuildingStorefrontIcon, ChartBarIcon, CurrencyDollarIcon, UsersIcon } from '@heroicons/react/24/outline';

const ShopifyTab: React.FC = () => {
  const [isConnected, setIsConnected] = useState(false);
  const [shopDomain, setShopDomain] = useState('');
  const [accessToken, setAccessToken] = useState('');

  const handleConnect = () => {
    if (shopDomain && accessToken) {
      setIsConnected(true);
    }
  };

  const handleDisconnect = () => {
    setIsConnected(false);
    setShopDomain('');
    setAccessToken('');
  };

  const mockData = {
    totalOrders: 892,
    totalRevenue: 32456.78,
    averageOrderValue: 36.38,
    totalCustomers: 1247,
    topSellingProduct: 'Organic Coffee Beans',
    monthlyGrowth: 15.3,
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
            <div className="w-12 h-12 bg-gradient-to-r from-green-500 to-teal-500 rounded-lg flex items-center justify-center mr-4">
              <BuildingStorefrontIcon className="w-6 h-6 text-white" />
            </div>
            <div>
              <h2 className="text-2xl font-bold text-gray-900">Shopify Integration</h2>
              <p className="text-gray-600">Connect your Shopify store</p>
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
            Connect Your Shopify Store
          </h3>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Shop Domain
              </label>
              <input
                type="text"
                value={shopDomain}
                onChange={(e) => setShopDomain(e.target.value)}
                placeholder="your-store.myshopify.com"
                className="input-field"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Access Token
              </label>
              <input
                type="password"
                value={accessToken}
                onChange={(e) => setAccessToken(e.target.value)}
                placeholder="Enter your Shopify access token"
                className="input-field"
              />
            </div>
            <button
              onClick={handleConnect}
              disabled={!shopDomain || !accessToken}
              className="btn-primary w-full disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Connect to Shopify
            </button>
          </div>
          <div className="mt-6 p-4 bg-green-50 rounded-lg">
            <h4 className="font-medium text-green-900 mb-2">How to get your access token:</h4>
            <ol className="text-sm text-green-800 space-y-1 list-decimal list-inside">
              <li>Go to your Shopify admin panel</li>
              <li>Navigate to Apps → App and sales channel settings</li>
              <li>Click "Develop apps" and create a new app</li>
              <li>Configure the app permissions and generate an access token</li>
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
                  <BuildingStorefrontIcon className="w-6 h-6 text-blue-600" />
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
                <div className="p-3 bg-teal-100 rounded-lg mr-4">
                  <UsersIcon className="w-6 h-6 text-teal-600" />
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-600">Total Customers</p>
                  <p className="text-2xl font-bold text-gray-900">{mockData.totalCustomers.toLocaleString()}</p>
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
              <div className="h-64 bg-gradient-to-br from-green-50 to-teal-50 rounded-lg flex items-center justify-center">
                <div className="text-center">
                  <ChartBarIcon className="w-12 h-12 text-gray-400 mx-auto mb-2" />
                  <p className="text-gray-600">Sales chart would appear here</p>
                  <p className="text-sm text-gray-500">Connected to Shopify API</p>
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
                    <p className="font-medium text-gray-900">Artisan Soap</p>
                    <p className="text-sm text-gray-600">High customer satisfaction</p>
                  </div>
                  <div className="text-right">
                    <p className="font-medium text-green-600">+12.8%</p>
                  </div>
                </div>
                <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <div>
                    <p className="font-medium text-gray-900">Handmade Candles</p>
                    <p className="text-sm text-gray-600">Steady performer</p>
                  </div>
                  <div className="text-right">
                    <p className="font-medium text-green-600">+7.4%</p>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>

          {/* Store Info */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.0 }}
            className="card"
          >
            <h3 className="text-lg font-semibold text-gray-900 mb-4">
              Store Information
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <p className="text-sm font-medium text-gray-600">Store Domain</p>
                <p className="text-lg text-gray-900">{shopDomain}</p>
              </div>
              <div>
                <p className="text-sm font-medium text-gray-600">Connection Status</p>
                <p className="text-lg text-green-600 font-medium">Active</p>
              </div>
              <div>
                <p className="text-sm font-medium text-gray-600">Last Sync</p>
                <p className="text-lg text-gray-900">2 minutes ago</p>
              </div>
              <div>
                <p className="text-sm font-medium text-gray-600">API Status</p>
                <p className="text-lg text-green-600 font-medium">Healthy</p>
              </div>
            </div>
          </motion.div>

          {/* Disconnect Button */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.2 }}
            className="flex justify-end"
          >
            <button
              onClick={handleDisconnect}
              className="btn-secondary"
            >
              Disconnect Store
            </button>
          </motion.div>
        </>
      )}
    </motion.div>
  );
};

export default ShopifyTab;
