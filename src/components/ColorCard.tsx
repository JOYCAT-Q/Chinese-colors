import { ChineseColor } from '../types/color';

interface ColorCardProps {
  color: ChineseColor;
  onCopy: (color: ChineseColor) => void;
}

const getContrastColor = (hexColor: string) => {
  // WCAG相对亮度计算公式
  const [r, g, b] = hexColor.slice(1).match(/../g)!.map(x => parseInt(x, 16)/255);
  const rsrgb = r <= 0.03928 ? r / 12.92 : Math.pow((r + 0.055) / 1.055, 2.4);
  const gsrgb = g <= 0.03928 ? g / 12.92 : Math.pow((g + 0.055) / 1.055, 2.4);
  const bsrgb = b <= 0.03928 ? b / 12.92 : Math.pow((b + 0.055) / 1.055, 2.4);
  
  const luminance = 0.2126 * rsrgb + 0.7152 * gsrgb + 0.0722 * bsrgb;
  return luminance > 0.179 ? '#000000' : '#FFFFFF';
};

// 添加新的对比度检查函数
const isColorLight = (hexColor: string) => {
  const r = parseInt(hexColor.slice(1, 3), 16);
  const g = parseInt(hexColor.slice(3, 5), 16);
  const b = parseInt(hexColor.slice(5, 7), 16);
  const luminance = (0.299 * r + 0.587 * g + 0.114 * b) / 255;
  return luminance > 0.5;
};

export default function ColorCard({ color, onCopy }: ColorCardProps) {
  return (
    <div 
      className="group relative rounded-lg overflow-hidden shadow-lg transition-all duration-300 hover:shadow-xl"
      style={{ backgroundColor: color.hex, color: getContrastColor(color.hex) }}>
    
      <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      <div className="p-6">
        <div className="space-y-2">
          <h3 className="text-2xl font-bold tracking-wide">{color.name.chinese}</h3>
          <p className="text-sm opacity-90 font-medium">{color.name.pinyin}</p>
        </div>
        
        <div className="mt-4 space-y-1 text-sm opacity-70">
          <p>RGB: {color.rgb.r}, {color.rgb.g}, {color.rgb.b}</p>
          <p>HEX: {color.hex}</p>
        </div>
        
        {color.description && (
          <p className="mt-4 text-sm italic opacity-80 leading-relaxed">
            {color.description}
          </p>
        )}
        
        <button
          onClick={() => onCopy(color)}
          className="mt-4 px-4 py-2 bg-white/10 backdrop-blur-sm rounded-full text-sm font-medium hover:bg-white/20 transition-colors duration-200"
        >
          复制颜色代码
        </button>
      </div>
    </div>
  );
}