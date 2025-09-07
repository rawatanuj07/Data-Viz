import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  HomeIcon, 
  ChatBubbleLeftRightIcon, 
  ChartBarIcon, 
  ShoppingBagIcon, 
  BuildingStorefrontIcon,
  Bars3Icon,
  XMarkIcon
} from '@heroicons/react/24/outline';
import { useApp } from '../../context/AppContext';

interface SidebarProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
}

const Sidebar: React.FC<SidebarProps> = ({ activeTab, onTabChange }) => {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const { state } = useApp();

  const tabs = [
    { id: 'dashboard', label: 'Dashboard', icon: HomeIcon },
    { id: 'profit', label: 'Profit Analysis', icon: ChartBarIcon },
    { id: 'chatbot', label: 'Chatbot', icon: ChatBubbleLeftRightIcon },
    { id: 'amazon', label: 'Amazon Integration', icon: ShoppingBagIcon },
    { id: 'shopify', label: 'Shopify Integration', icon: BuildingStorefrontIcon },
  ];

  return (
    <motion.div
      initial={{ x: -300 }}
      animate={{ x: 0 }}
      transition={{ duration: 0.3, ease: "easeOut" }}
      className={`bg-white shadow-xl border-r border-gray-200 transition-all duration-300 ${
        isCollapsed ? 'w-16' : 'w-64'
      }`}
    >
      {/* Header */}
      <div className="p-4 border-b border-gray-200">
        <div className="flex items-center justify-between">
          {!isCollapsed && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
              className="flex items-center space-x-2"
            >
              <div className="w-8 h-8 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-sm">DV</span>
              </div>
              <span className="font-bold text-gray-900">DataViz</span>
            </motion.div>
          )}
          <button
            onClick={() => setIsCollapsed(!isCollapsed)}
            className="p-2 rounded-lg hover:bg-gray-100 transition-colors"
          >
            {isCollapsed ? (
              <Bars3Icon className="w-5 h-5 text-gray-600" />
            ) : (
              <XMarkIcon className="w-5 h-5 text-gray-600" />
            )}
          </button>
        </div>
      </div>

      {/* User Info */}
      {!isCollapsed && state.user && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="p-4 border-b border-gray-200"
        >
          <div className="flex items-center space-x-3">
            <img
              src={state.user.photoURL || '/default-avatar.png'}
              alt={state.user.displayName || 'User'}
              className="w-10 h-10 rounded-full"
            />
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-gray-900 truncate">
                {state.user.displayName || 'User'}
              </p>
              <p className="text-xs text-gray-500 truncate">
                {state.user.email}
              </p>
            </div>
          </div>
        </motion.div>
      )}

      {/* Navigation */}
      <nav className="p-4 space-y-2">
        {tabs.map((tab, index) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;
          
          return (
            <motion.button
              key={tab.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.1 * index }}
              onClick={() => onTabChange(tab.id)}
              className={`w-full flex items-center space-x-3 px-3 py-3 rounded-lg transition-all duration-200 ${
                isActive
                  ? 'bg-gradient-to-r from-blue-50 to-purple-50 text-blue-600 border border-blue-200'
                  : 'text-gray-700 hover:bg-gray-50 hover:text-gray-900'
              }`}
            >
              <Icon className={`w-5 h-5 ${isActive ? 'text-blue-600' : 'text-gray-500'}`} />
              {!isCollapsed && (
                <motion.span
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.1 }}
                  className="font-medium"
                >
                  {tab.label}
                </motion.span>
              )}
            </motion.button>
          );
        })}
      </nav>

      {/* Collapse indicator */}
      <div className="absolute bottom-4 left-4">
        <motion.div
          animate={{ rotate: isCollapsed ? 180 : 0 }}
          transition={{ duration: 0.3 }}
          className="w-2 h-2 bg-gray-400 rounded-full"
        />
      </div>
    </motion.div>
  );
};

export default Sidebar;

