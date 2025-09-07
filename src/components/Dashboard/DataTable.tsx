import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Product } from '../../types';
import ProductModal from '../ProductDetails/ProductModal';

interface DataTableProps {
  products: Product[];
}

const DataTable: React.FC<DataTableProps> = ({ products }) => {
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleRowClick = (product: Product) => {
    setSelectedProduct(product);
    setIsModalOpen(true);
  };

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
    }).format(value);
  };

  const formatPercentage = (value: number) => {
    return `${value.toFixed(2)}%`;
  };

  if (products.length === 0) {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="text-center py-12"
      >
        <div className="text-gray-500 text-lg">No data available. Please upload a file first.</div>
      </motion.div>
    );
  }

  return (
    <>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="bg-white rounded-xl shadow-lg overflow-hidden"
      >
        <div className="px-4 lg:px-6 py-4 border-b border-gray-200">
          <h2 className="text-lg lg:text-xl font-semibold text-gray-900">Product Data</h2>
          <p className="text-sm text-gray-600">{products.length} products found</p>
        </div>

        {/* Desktop Table */}
        <div className="hidden lg:block overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Product Name
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Sales
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Profit
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  TE
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Credit
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Amazon Fee
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Profit %
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {products.map((product, index) => (
                <motion.tr
                  key={product.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.05 }}
                  onClick={() => handleRowClick(product)}
                  className="hover:bg-blue-50 cursor-pointer transition-colors duration-200 group"
                >
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-medium text-gray-900 group-hover:text-blue-600 transition-colors">
                      {product.productName}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">
                      {formatCurrency(product.sales)}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className={`text-sm font-medium ${
                      product.profit >= 0 ? 'text-green-600' : 'text-red-600'
                    }`}>
                      {formatCurrency(product.profit)}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">
                      {formatCurrency(product.te)}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">
                      {formatCurrency(product.credit)}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">
                      {formatCurrency(product.amazonFee)}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className={`text-sm font-medium ${
                      product.profitPercentage >= 0 ? 'text-green-600' : 'text-red-600'
                    }`}>
                      {formatPercentage(product.profitPercentage)}
                    </div>
                  </td>
                </motion.tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Mobile Cards */}
        <div className="lg:hidden">
          {products.map((product, index) => (
            <motion.div
              key={product.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05 }}
              onClick={() => handleRowClick(product)}
              className="p-4 border-b border-gray-200 hover:bg-blue-50 cursor-pointer transition-colors duration-200"
            >
              <div className="flex items-center justify-between mb-2">
                <h3 className="text-sm font-medium text-gray-900 truncate flex-1 mr-2">
                  {product.productName}
                </h3>
                <div className={`text-sm font-medium ${
                  product.profit >= 0 ? 'text-green-600' : 'text-red-600'
                }`}>
                  {formatCurrency(product.profit)}
                </div>
              </div>
              <div className="grid grid-cols-2 gap-2 text-xs text-gray-600">
                <div className="flex justify-between">
                  <span>Sales:</span>
                  <span className="font-medium">{formatCurrency(product.sales)}</span>
                </div>
                <div className="flex justify-between">
                  <span>Profit %:</span>
                  <span className={`font-medium ${
                    product.profitPercentage >= 0 ? 'text-green-600' : 'text-red-600'
                  }`}>
                    {formatPercentage(product.profitPercentage)}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span>TE:</span>
                  <span className="font-medium">{formatCurrency(product.te)}</span>
                </div>
                <div className="flex justify-between">
                  <span>Credit:</span>
                  <span className="font-medium">{formatCurrency(product.credit)}</span>
                </div>
              </div>
              <div className="mt-2 text-xs text-gray-500">
                Amazon Fee: {formatCurrency(product.amazonFee)}
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>

      <ProductModal
        product={selectedProduct}
        isOpen={isModalOpen}
        onClose={() => {
          setIsModalOpen(false);
          setSelectedProduct(null);
        }}
      />
    </>
  );
};

export default DataTable;


