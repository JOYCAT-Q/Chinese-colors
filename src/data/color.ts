export interface Color {
  CMYK: number[];
  RGB: number[];
  hex: string;
  name: string;
  pinyin: string;
}

export const colors: Color[] = [
  {
    CMYK: [4, 5, 18, 0],
    RGB: [249, 244, 220],
    hex: "#f9f4dc",
    name: "\u4e73\u767d",
    pinyin: "rubai"
  }
];