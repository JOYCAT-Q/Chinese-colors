'use client';

import { useState } from 'react';
import { colors } from '../data/colors';
import ColorCard from '../components/ColorCard';
import Toast from '../components/Toast';
import { ChineseColor } from '../types/color';

export default function Home() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [toastMessage, setToastMessage] = useState('');
  const [showToast, setShowToast] = useState(false);

  const categories = ['all', ...new Set(colors.map(color => color.category))];

  const filteredColors = colors.filter(color => {
    if (!color?.name) return false;
    const matchesSearch = 
      (color.name.chinese || '').toLowerCase().includes(searchTerm.toLowerCase()) ||
      (color.name.pinyin || '').toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesCategory = selectedCategory === 'all' || color.category === selectedCategory;
    
    return matchesSearch && matchesCategory;
  });

  const handleCopyColor = async (color: ChineseColor) => {
    try {
      await navigator.clipboard.writeText(color.hex);
      setToastMessage(`已复制 ${color.name.chinese} 的颜色代码`);
    } catch (error) {
      setToastMessage(`无法复制颜色代码，请检查浏览器权限设置`);
    }
    setShowToast(true);
    setTimeout(() => setShowToast(false), 2000);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 py-6">
          <h1 className="text-3xl font-bold text-gray-900">中国色 Chinese Colors</h1>
          <div className="mt-4 flex gap-4">
            <input
              type="text"
              placeholder="搜索颜色..."
              className="flex-1 px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <select
              className="px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
            >
              {categories.map(category => (
                <option key={category} value={category}>
                  {category === 'all' ? '所有颜色' : category}
                </option>
              ))}
            </select>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 py-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredColors.map((color, index) => (
            <ColorCard
              key={index}
              color={color}
              onCopy={handleCopyColor}
            />
          ))}
        </div>
      </main>

      <footer className="bg-white border-t mt-8">
        <div className="max-w-7xl mx-auto px-4 py-6 text-center text-gray-600">
          <p>© 2024 中国色 Chinese Colors</p>
        </div>
      </footer>

      <Toast
        message={toastMessage}
        isVisible={showToast}
        onClose={() => setShowToast(false)}
      />
    </div>
  );
}
