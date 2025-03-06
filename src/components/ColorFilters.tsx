import { ChineseColor } from '../types/color';
import { Combobox } from '@headlessui/react';
// 若找不到 @heroicons/react/24/outline 模块，需要安装该模块
// 安装命令: npm install @heroicons/react
import { CheckIcon, ChevronUpDownIcon, XMarkIcon } from '@heroicons/react/24/outline';
import { useState, useEffect } from 'react';

export default function ColorFilters({
  colors,
  selectedCategories,
  setSelectedCategories,
  searchQuery,
  setSearchQuery
}: {
  colors: ChineseColor[];
  selectedCategories: string[];
  setSelectedCategories: (categories: string[]) => void;
  searchQuery: string;
  setSearchQuery: (query: string) => void;
}) {
  const [searchSuggestions, setSearchSuggestions] = useState<ChineseColor[]>([]);

  useEffect(() => {
    const suggestions = colors.filter(color => 
      color.name.chinese.toLowerCase().includes(searchQuery.toLowerCase()) ||
      color.name.pinyin.toLowerCase().includes(searchQuery.toLowerCase())
    );
    setSearchSuggestions(suggestions);
  }, [searchQuery]);

  const categories = Array.from(new Set(colors.map(c => c.category?.trim()))).filter(Boolean);

  return (
    <div className="space-y-4">
      {/* 搜索框 */}
      <Combobox as="div" value={searchQuery} onChange={setSearchQuery} className="relative">
        <div className="relative">
          <Combobox.Input
            className="w-full rounded-lg border bg-white/20 backdrop-blur-sm py-2 pl-3 pr-10 text-sm leading-5"
            placeholder="搜索颜色名称或拼音..."
            displayValue={(color: ChineseColor) => color?.name.chinese || ''}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <Combobox.Button className="absolute inset-y-0 right-0 flex items-center pr-2">
            <ChevronUpDownIcon className="h-5 w-5 opacity-50" aria-hidden="true" />
          </Combobox.Button>
        </div>
      </Combobox>

      {/* 已选标签 */}
      {selectedCategories.length > 0 && (
        <div className="flex flex-wrap gap-2 pb-2">
          {selectedCategories.map((category) => (
            <span 
              key={category}
              className="flex items-center px-3 py-1 bg-white/20 rounded-full text-sm"
            >
              {category}
              <XMarkIcon
                className="h-4 w-4 ml-1 cursor-pointer"
                onClick={() => setSelectedCategories(selectedCategories.filter(c => c !== category))}
              />
            </span>
          ))}
        </div>
      )}

      {/* 分类多选 */}
      <div className="space-y-2">
        <h4 className="text-sm font-medium">颜色分类</h4>
        {categories.map((category) => (
          <label key={category} className="flex items-center space-x-2">
            <input
              type="checkbox"
              checked={selectedCategories.includes(category)}
              onChange={(e) => {
                const newSelected = e.target.checked
                  ? [...selectedCategories, category]
                  : selectedCategories.filter(c => c !== category);
                setSelectedCategories(newSelected);
              }}
              className="rounded border-gray-300 text-indigo-600 focus:ring-indigo-500 w-4 h-4"
            />
            <span className="text-sm flex-grow">{category}</span>
          </label>
        ))}
      </div>
    </div>
  );
}