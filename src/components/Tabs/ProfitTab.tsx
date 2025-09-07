import React from 'react';
import { motion } from 'framer-motion';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import { useApp } from '../../context/AppContext';

const ProfitTab: React.FC = () => {
  const { state } = useApp();

  const totalSales = state.products.reduce((sum, product) => sum + product.sales, 0);
  const totalProfit = state.products.reduce((sum, product) => sum + product.profit, 0);
  const totalExpenses = state.products.reduce((sum, product) => sum + product.te + product.amazonFee, 0);
  const averageProfitPercentage = state.products.length > 0 
    ? state.products.reduce((sum, product) => sum + product.profitPercentage, 0) / state.products.length 
    : 0;

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
    }).format(value);
  };

  const formatPercentage = (value: number) => {
    return `${value.toFixed(2)}%`;
  };

  // Data for charts - show all products but with horizontal scroll
  const profitData = state.products.length > 0 ? state.products.map(product => ({
    name: product.productName.length > 15 
      ? product.productName.substring(0, 15) + '...' 
      : product.productName,
    profit: product.profit,
    sales: product.sales,
    profitPercentage: product.profitPercentage,
  })) : [
    // Fallback test data if no products
    { name: 'Test Product 1', profit: 100, sales: 500, profitPercentage: 20 },
    { name: 'Test Product 2', profit: 200, sales: 800, profitPercentage: 25 },
    { name: 'Test Product 3', profit: 150, sales: 600, profitPercentage: 25 },
  ];

  // Debug logging
  console.log('ProfitTab - Full state:', state);
  console.log('ProfitTab - Products count:', state.products.length);
  console.log('ProfitTab - Products:', state.products);
  console.log('ProfitTab - Profit data:', profitData);

  const pieData = [
    { name: 'Total Profit', value: totalProfit, color: '#10B981' },
    { name: 'Total Expenses', value: totalExpenses, color: '#EF4444' },
  ].filter(item => item.value > 0);

  const metrics = [
    {
      label: 'Total Sales',
      value: formatCurrency(totalSales),
      change: '+12.5%',
      changeType: 'positive',
    },
    {
      label: 'Total Profit',
      value: formatCurrency(totalProfit),
      change: '+8.3%',
      changeType: 'positive',
    },
    {
      label: 'Total Expenses',
      value: formatCurrency(totalExpenses),
      change: '-2.1%',
      changeType: 'negative',
    },
    {
      label: 'Avg Profit %',
      value: formatPercentage(averageProfitPercentage),
      change: '+5.2%',
      changeType: 'positive',
    },
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="space-y-6"
    >
      {/* Metrics Cards */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
      >
        {metrics.map((metric, index) => (
          <motion.div
            key={metric.label}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.4 + index * 0.1 }}
            className="card"
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">{metric.label}</p>
                <p className="text-2xl font-bold text-gray-900">{metric.value}</p>
              </div>
              <div className={`text-sm font-medium ${
                metric.changeType === 'positive' ? 'text-green-600' : 'text-red-600'
              }`}>
                {metric.change}
              </div>
            </div>
          </motion.div>
        ))}
      </motion.div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Profit vs Sales Bar Chart */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.6 }}
          className="card"
        >
          <h3 className="text-lg font-semibold text-gray-900 mb-4">
            Profit vs Sales by Product
          </h3>
          <div className="h-80 bg-gray-50 border-2 border-dashed border-gray-300 rounded-lg">
            {profitData.length === 0 ? (
              <div className="flex items-center justify-center h-full text-gray-500">
                No data available
              </div>
            ) : (
              <>
                <div className="chart-scroll overflow-x-auto h-full">
                  <div style={{ width: Math.max(800, profitData.length * 80), height: '100%' }}>
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart data={profitData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="name" />
                        <YAxis />
                        <Tooltip formatter={(value) => formatCurrency(Number(value))} />
                        <Bar dataKey="sales" fill="#3B82F6" name="Sales" />
                        <Bar dataKey="profit" fill="#10B981" name="Profit" />
                      </BarChart>
                    </ResponsiveContainer>
                  </div>
                </div>
                {profitData.length > 10 && (
                  <p className="text-sm text-gray-500 mt-2 text-center">
                    {profitData.length} products - Scroll horizontally to see all
                  </p>
                )}
              </>
            )}
          </div>
        </motion.div>

        {/* Profit Distribution Pie Chart */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.8 }}
          className="card"
        >
          <h3 className="text-lg font-semibold text-gray-900 mb-4">
            Profit vs Expenses Distribution
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
      </div>

      {/* Profit Percentage Trend */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.0 }}
        className="card"
      >
        <h3 className="text-lg font-semibold text-gray-900 mb-4">
          Profit Percentage by Product
        </h3>
        <div className="h-80 bg-gray-50 border-2 border-dashed border-gray-300 rounded-lg">
          {profitData.length === 0 ? (
            <div className="flex items-center justify-center h-full text-gray-500">
              No data available
            </div>
          ) : (
            <>
              <div className="chart-scroll overflow-x-auto h-full">
                <div style={{ width: Math.max(800, profitData.length * 80), height: '100%' }}>
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={profitData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="name" />
                      <YAxis />
                      <Tooltip formatter={(value) => formatPercentage(Number(value))} />
                      <Bar dataKey="profitPercentage" fill="#8B5CF6" name="Profit %" />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </div>
              {profitData.length > 10 && (
                <p className="text-sm text-gray-500 mt-2 text-center">
                  {profitData.length} products - Scroll horizontally to see all
                </p>
              )}
            </>
          )}
        </div>
      </motion.div>

      {/* Top Performers */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.2 }}
        className="card"
      >
        <h3 className="text-lg font-semibold text-gray-900 mb-4">
          Top Performing Products
        </h3>
        <div className="space-y-3">
          {state.products
            .sort((a, b) => b.profit - a.profit)
            .slice(0, 5)
            .map((product, index) => (
              <div key={product.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <div className="flex items-center">
                  <div className="w-8 h-8 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full flex items-center justify-center text-white font-bold text-sm mr-3">
                    {index + 1}
                  </div>
                  <div>
                    <p className="font-medium text-gray-900">{product.productName}</p>
                    <p className="text-sm text-gray-600">
                      {formatCurrency(product.sales)} sales
                    </p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="font-medium text-green-600">
                    {formatCurrency(product.profit)}
                  </p>
                  <p className="text-sm text-gray-600">
                    {formatPercentage(product.profitPercentage)}
                  </p>
                </div>
              </div>
            ))}
        </div>
      </motion.div>
    </motion.div>
  );
};

export default ProfitTab;
