import React, { useCallback, useState } from 'react';
import { useDropzone } from 'react-dropzone';
import { motion } from 'framer-motion';
import { CloudArrowUpIcon, DocumentIcon, ExclamationTriangleIcon } from '@heroicons/react/24/outline';
import * as XLSX from 'xlsx';
import { useApp } from '../../context/AppContext';
import { Product } from '../../types';

const FileUpload: React.FC = () => {
  const [isProcessing, setIsProcessing] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { dispatch } = useApp();

  const validateSheetData = (data: any[]): Product[] => {
    const requiredColumns = ['Product Name', 'Sales', 'Profit', 'TE', 'Credit', 'Amazon Fee', 'Profit Percentage'];
    
    if (data.length === 0) {
      throw new Error('Sheet is empty');
    }

    const headers = Object.keys(data[0]);
    const missingColumns = requiredColumns.filter(col => !headers.includes(col));
    
    if (missingColumns.length > 0) {
      throw new Error(`Missing required columns: ${missingColumns.join(', ')}`);
    }

    return data.map((row, index) => ({
      id: `product-${Date.now()}-${index}`,
      productName: row['Product Name'] || '',
      sales: parseFloat(row['Sales']) || 0,
      profit: parseFloat(row['Profit']) || 0,
      te: parseFloat(row['TE']) || 0,
      credit: parseFloat(row['Credit']) || 0,
      amazonFee: parseFloat(row['Amazon Fee']) || 0,
      profitPercentage: parseFloat(row['Profit Percentage']) || 0,
    }));
  };

  const processFile = useCallback(async (file: File) => {
    setIsProcessing(true);
    setError(null);

    try {
      const data = await new Promise<any[]>((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = (e) => {
          try {
            const data = new Uint8Array(e.target?.result as ArrayBuffer);
            const workbook = XLSX.read(data, { type: 'array' });
            const sheetName = workbook.SheetNames[0];
            const worksheet = workbook.Sheets[sheetName];
            const jsonData = XLSX.utils.sheet_to_json(worksheet);
            resolve(jsonData);
          } catch (error) {
            reject(error);
          }
        };
        reader.onerror = () => reject(new Error('Failed to read file'));
        reader.readAsArrayBuffer(file);
      });

      const products = validateSheetData(data);
      dispatch({ type: 'SET_PRODUCTS', payload: products });
      dispatch({ type: 'SET_ERROR', payload: null });
    } catch (err: any) {
      setError(err.message);
      dispatch({ type: 'SET_ERROR', payload: err.message });
    } finally {
      setIsProcessing(false);
    }
  }, [dispatch]);

  const onDrop = useCallback((acceptedFiles: File[]) => {
    const file = acceptedFiles[0];
    if (file) {
      processFile(file);
    }
  }, [processFile]);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'text/csv': ['.csv'],
      'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet': ['.xlsx'],
      'application/vnd.ms-excel': ['.xls'],
    },
    multiple: false,
  });

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="max-w-4xl mx-auto p-4 sm:p-6"
    >
      <div className="text-center mb-6 sm:mb-8">
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="text-2xl sm:text-3xl font-bold text-gray-900 mb-4"
        >
          Upload Your Data Sheet
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="text-sm sm:text-base text-gray-600"
        >
          Upload CSV or Excel files with your product data
        </motion.p>
      </div>

      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.6 }}
        className="bg-white rounded-2xl shadow-xl border-2 border-dashed border-gray-300 p-6 sm:p-12"
      >
        <div
          {...getRootProps()}
          className={`cursor-pointer transition-all duration-200 ${
            isDragActive
              ? 'border-blue-400 bg-blue-50 scale-105'
              : 'hover:border-gray-400 hover:bg-gray-50'
          }`}
        >
          <input {...getInputProps()} />
          
          <div className="text-center">
            <motion.div
              animate={isDragActive ? { scale: 1.1, rotate: 5 } : { scale: 1, rotate: 0 }}
              transition={{ duration: 0.2 }}
              className="mx-auto w-16 h-16 sm:w-24 sm:h-24 bg-gradient-to-r from-blue-100 to-purple-100 rounded-full flex items-center justify-center mb-4 sm:mb-6"
            >
              {isProcessing ? (
                <div className="animate-spin rounded-full h-8 w-8 sm:h-12 sm:w-12 border-b-2 border-blue-600"></div>
              ) : (
                <CloudArrowUpIcon className="w-8 h-8 sm:w-12 sm:h-12 text-blue-600" />
              )}
            </motion.div>

            <motion.h3
              animate={{ opacity: isDragActive ? 0.8 : 1 }}
              className="text-lg sm:text-xl font-semibold text-gray-900 mb-2"
            >
              {isProcessing
                ? 'Processing your file...'
                : isDragActive
                ? 'Drop your file here'
                : 'Drag & drop your file here'}
            </motion.h3>

            <p className="text-sm sm:text-base text-gray-600 mb-4 sm:mb-6">
              or click to browse files
            </p>

            <div className="flex items-center justify-center space-x-4 text-sm text-gray-500">
              <div className="flex items-center">
                <DocumentIcon className="w-4 h-4 mr-1" />
                CSV
              </div>
              <div className="flex items-center">
                <DocumentIcon className="w-4 h-4 mr-1" />
                Excel
              </div>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Required Format Info */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.8 }}
        className="mt-8 bg-blue-50 rounded-xl p-6"
      >
        <h3 className="text-lg font-semibold text-blue-900 mb-4">
          Required Sheet Format
        </h3>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-4">
          {['Product Name', 'Sales', 'Profit', 'TE', 'Credit', 'Amazon Fee', 'Profit Percentage'].map((column) => (
            <div key={column} className="bg-white rounded-lg p-2 sm:p-3 text-center">
              <span className="text-xs sm:text-sm font-medium text-gray-700">{column}</span>
            </div>
          ))}
        </div>
      </motion.div>

      {/* Error Display */}
      {error && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mt-6 bg-red-50 border border-red-200 rounded-xl p-4"
        >
          <div className="flex items-center">
            <ExclamationTriangleIcon className="w-5 h-5 text-red-600 mr-2" />
            <span className="text-red-800">{error}</span>
          </div>
        </motion.div>
      )}
    </motion.div>
  );
};

export default FileUpload;
