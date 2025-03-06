export interface ChineseColor {
  name: {
    chinese: string;
    pinyin: string;
  };
  hex: string;
  rgb: {
    r: number;
    g: number;
    b: number;
  };
  cmyk: {
    c: number;
    m: number;
    y: number;
    k: number;
  };
  category: string;
  description?: string;
}