import React from 'react';
import { motion } from 'framer-motion';
import { useParams, useNavigate } from 'react-router-dom';
import { PieChart, Pie, Cell, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { ArrowLeftIcon, CurrencyDollarIcon, ChartBarIcon } from '@heroicons/react/24/outline';
import { useApp } from '../../context/AppContext';

const ProductDetails: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { state } = useApp();

  const product = state.products.find(p => p.id === id);

  if (!product) {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="text-center py-12"
      >
        <div className="text-gray-500 text-lg">Product not found</div>
        <button
          onClick={() => navigate('/dashboard')}
          className="mt-4 btn-primary"
        >
          Back to Dashboard
        </button>
      </motion.div>
    );
  }

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
    }).format(value);
  };

  const formatPercentage = (value: number) => {
    return `${value.toFixed(2)}%`;
  };

  // Data for pie chart
  const pieData = [
    { name: 'Profit', value: product.profit, color: '#10B981' },
    { name: 'TE', value: product.te, color: '#F59E0B' },
    { name: 'Credit', value: product.credit, color: '#3B82F6' },
    { name: 'Amazon Fee', value: product.amazonFee, color: '#EF4444' },
  ].filter(item => item.value > 0);

  // Data for bar chart
  const barData = [
    { name: 'Sales', value: product.sales, color: '#3B82F6' },
    { name: 'Profit', value: product.profit, color: '#10B981' },
    { name: 'TE', value: product.te, color: '#F59E0B' },
    { name: 'Credit', value: product.credit, color: '#8B5CF6' },
    { name: 'Amazon Fee', value: product.amazonFee, color: '#EF4444' },
  ];

  const metrics = [
    {
      label: 'Total Sales',
      value: formatCurrency(product.sales),
      icon: CurrencyDollarIcon,
      color: 'text-blue-600',
      bgColor: 'bg-blue-100',
    },
    {
      label: 'Net Profit',
      value: formatCurrency(product.profit),
      icon: ChartBarIcon,
      color: product.profit >= 0 ? 'text-green-600' : 'text-red-600',
      bgColor: product.profit >= 0 ? 'bg-green-100' : 'bg-red-100',
    },
    {
      label: 'Profit Percentage',
      value: formatPercentage(product.profitPercentage),
      icon: ChartBarIcon,
      color: product.profitPercentage >= 0 ? 'text-green-600' : 'text-red-600',
      bgColor: product.profitPercentage >= 0 ? 'bg-green-100' : 'bg-red-100',
    },
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="max-w-7xl mx-auto p-6"
    >
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="mb-8"
      >
        <button
          onClick={() => navigate('/dashboard')}
          className="flex items-center text-gray-600 hover:text-gray-900 mb-4 transition-colors"
        >
          <ArrowLeftIcon className="w-5 h-5 mr-2" />
          Back to Dashboard
        </button>
        
        <h1 className="text-3xl font-bold text-gray-900 mb-2">
          {product.productName}
        </h1>
        <p className="text-gray-600">Detailed product analysis and metrics</p>
      </motion.div>

      {/* Metrics Cards */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8"
      >
        {metrics.map((metric, index) => {
          const Icon = metric.icon;
          return (
            <motion.div
              key={metric.label}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.6 + index * 0.1 }}
              className="card"
            >
              <div className="flex items-center">
                <div className={`p-3 rounded-lg ${metric.bgColor} mr-4`}>
                  <Icon className={`w-6 h-6 ${metric.color}`} />
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-600">{metric.label}</p>
                  <p className={`text-2xl font-bold ${metric.color}`}>
                    {metric.value}
                  </p>
                </div>
              </div>
            </motion.div>
          );
        })}
      </motion.div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Pie Chart */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.8 }}
          className="card"
        >
          <h3 className="text-lg font-semibold text-gray-900 mb-4">
            Revenue Breakdown
          </h3>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={pieData}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={120}
                  paddingAngle={5}
                  dataKey="value"
                >
                  {pieData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip formatter={(value) => formatCurrency(Number(value))} />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </motion.div>

        {/* Bar Chart */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 1.0 }}
          className="card"
        >
          <h3 className="text-lg font-semibold text-gray-900 mb-4">
            Financial Overview
          </h3>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={barData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip formatter={(value) => formatCurrency(Number(value))} />
                <Bar dataKey="value" fill="#3B82F6" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </motion.div>
      </div>

      {/* Detailed Breakdown */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.2 }}
        className="mt-8 card"
      >
        <h3 className="text-lg font-semibold text-gray-900 mb-6">
          Detailed Financial Breakdown
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-4">
            <div className="flex justify-between items-center py-2 border-b border-gray-200">
              <span className="text-gray-600">Total Sales</span>
              <span className="font-medium">{formatCurrency(product.sales)}</span>
            </div>
            <div className="flex justify-between items-center py-2 border-b border-gray-200">
              <span className="text-gray-600">TE (Total Expenses)</span>
              <span className="font-medium">{formatCurrency(product.te)}</span>
            </div>
            <div className="flex justify-between items-center py-2 border-b border-gray-200">
              <span className="text-gray-600">Credit</span>
              <span className="font-medium">{formatCurrency(product.credit)}</span>
            </div>
          </div>
          <div className="space-y-4">
            <div className="flex justify-between items-center py-2 border-b border-gray-200">
              <span className="text-gray-600">Amazon Fee</span>
              <span className="font-medium">{formatCurrency(product.amazonFee)}</span>
            </div>
            <div className="flex justify-between items-center py-2 border-b border-gray-200">
              <span className="text-gray-600">Net Profit</span>
              <span className={`font-medium ${product.profit >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                {formatCurrency(product.profit)}
              </span>
            </div>
            <div className="flex justify-between items-center py-2 border-b border-gray-200">
              <span className="text-gray-600">Profit Percentage</span>
              <span className={`font-medium ${product.profitPercentage >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                {formatPercentage(product.profitPercentage)}
              </span>
            </div>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default ProductDetails;


