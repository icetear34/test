// 小工具與共用函式
export const el = (id) => document.getElementById(id);

// base64（URI-safe）
export const toBase64   = (str) => btoa(unescape(encodeURIComponent(str)));
export const fromBase64 = (b64) => decodeURIComponent(escape(atob(b64)));

// 抓護甲選項（若 id 不存在回傳 "無"）
export function armorOpt(part, id) {
  const def = window.ARMOR_PARTS?.[part];
  if (!def) return { id:'none', name:'無', cost:0, armor:0 };
  return def.options.find(o => o.id === id) || def.options[0];
}

// 隨機名稱生成器
const SOLDIER_NAMES = [
  // 台灣常見姓氏
  '王小明', '李大華', '陳志強', '林美玲', '張雅芳', '劉建國', '楊淑惠', '黃文彬',
  '吳志偉', '蔡雅婷', '鄭家豪', '謝淑芬', '周明哲', '許雅君', '孫志宏', '胡美珠',
  
  // 軍事風格代號
  '獵鷹', '雷霆', '鋼鐵', '閃電', '暴風', '獵豹', '猛虎', '烈火',
  '寒冰', '巨石', '利刃', '毒蛇', '幽靈', '蒼鷹', '野狼', '黑豹',
  
  // 數字代號
  'Alpha-1', 'Bravo-2', 'Charlie-3', 'Delta-4', 'Echo-5', 'Foxtrot-6',
  'Golf-7', 'Hotel-8', 'India-9', 'Juliet-10', 'Kilo-11', 'Lima-12',
  
  // 台灣城市代號
  '台北兵', '高雄兵', '台中兵', '台南兵', '桃園兵', '新竹兵',
  '基隆兵', '嘉義兵', '台東兵', '花蓮兵', '宜蘭兵', '屏東兵'
];

export function getRandomSoldierName() {
  const randomIndex = Math.floor(Math.random() * SOLDIER_NAMES.length);
  return SOLDIER_NAMES[randomIndex];
}
