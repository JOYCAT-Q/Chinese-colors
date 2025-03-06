import axios from 'axios';
import * as cheerio from 'cheerio';
import { ChineseColor } from '../src/types/color';
import fs from 'fs/promises';
import * as path from 'path';

async function scrapeColors() {
  try {
    const { data, status } = await axios.get('https://www.zhongguose.com/');
    console.log('响应状态:', status, '数据长度:', data?.length);
    const $ = cheerio.load(data);
    const colors: ChineseColor[] = [];
    
    console.log('找到颜色元素数量:', $('.color > .coloritem').length);
    
    $('.color > .coloritem').each((i, el) => {
      const name = $(el).find('.name').text().trim().split('\n');
      const hex = $(el).find('.color-meta-hex').text().trim();
      const rgb = $(el).find('.rgb').text().trim().match(/\d+/g)?.map(Number) || [0,0,0];
      
      const color: ChineseColor = {
        name: {
          chinese: name[0],
          pinyin: name[1],
          english: name[2]
        },
        hex: `#${hex}`,
        rgb: {
          r: rgb[0],
          g: rgb[1],
          b: rgb[2]
        },
        category: $(el).find('.category').text().trim(),
        description: $(el).find('.desc').text().trim()
      };
      
      console.log('抓取到颜色:', color);
      colors.push(color);
    });

    await fs.writeFile(
      path.join(__dirname, '../src/data/colors.ts'),
      `import { ChineseColor } from '../types/color';

export const colors: ChineseColor[] = ${JSON.stringify(colors, null, 2)};`
    );
    
    console.log('成功抓取并更新了颜色数据');
    console.log('总抓取数量:', colors.length);
  } catch (error) {
    console.error('抓取数据失败:', error);
  }
}

scrapeColors();