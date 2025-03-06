import { ChineseColor } from '../types/color';

const colorsData = require('../../colors.json');

export const colors: ChineseColor[] = colorsData.map((color: any) => ({
  name: {
    chinese: color.name,
    pinyin: color.pinyin,
    english: color.name.english
  },
  hex: color.hex,
  rgb: {
    r: color.RGB?.[0] ?? 0,
    g: color.RGB?.[1] ?? 0,
    b: color.RGB?.[2] ?? 0
  },
  category: color.category,
  description: color.description
}));