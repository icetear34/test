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
