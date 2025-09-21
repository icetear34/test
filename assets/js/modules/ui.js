// UI 元素填充與格式化
import { dom } from './state.js';

export function fillSelect(select, items){
  select.innerHTML = '';
  for(const it of items){
    const opt = document.createElement('option');
    opt.value = it.id;
    opt.textContent = it.name;
    select.appendChild(opt);
  }
}

export function initSelectors(){
  const ROLES = window.ROLES||[], WEAPONS = window.WEAPONS||[], A = window.ARMOR_PARTS||{};
  fillSelect(dom.roleSel, ROLES.map(r=>({id:r.id, name:`${r.name}（+${r.cost}pt）`})));
  fillSelect(dom.mainSel, WEAPONS.map(w=>({id:w.id, name:`${w.name}（${w.cost}pt）`})));
  fillSelect(dom.sideSel, WEAPONS.map(w=>({id:w.id, name:`${w.name}（${w.cost}pt）`})));
  const fillArmor = (sel, part)=>{
    const opts = (A[part]?.options||[]).map(o=>({id:o.id, name:`${o.name}（${o.cost}pt）`}));
    fillSelect(sel, opts);
  };
  fillArmor(dom.aHeadSel,'head'); fillArmor(dom.aChestSel,'chest');
  fillArmor(dom.aArmSel,'arm');   fillArmor(dom.aLegSel,'leg');
}

export function renderExtras(roleId){
  const box = dom.extrasBox;
  box.innerHTML = '';
  const common = [
    { id:'smoke', name:'煙霧彈', cost:2 },
    { id:'ammo',  name:'額外彈藥', cost:2 },
    { id:'medkit',name:'醫療包', cost:2 },
  ];
  const eng = [
    { id:'shield', name:'機動護盾', cost:5 },
    { id:'bridge', name:'凱若爾便橋', cost:5 },
    { id:'beacon', name:'信號機', cost:5 },
  ];
  const pack = [...common, ...(roleId==='engineer'? eng: [])];
  pack.forEach(x=>{
    const id = `x_${x.id}`;
    const lab = document.createElement('label');
    lab.className='chip'; lab.style.cursor='pointer';
    const cb = document.createElement('input');
    cb.type='checkbox'; cb.id=id; cb.value=x.id; cb.dataset.cost=x.cost; cb.style.marginRight='6px';
    lab.appendChild(cb); lab.append(`${x.name} +${x.cost}pt`); box.appendChild(lab);
  });
}

export function fmtRole(id){
  const r = (window.ROLES||[]).find(x=>x.id===id);
  return r? r.name : id;
}
export function fmtWeapon(id){
  const w = (window.WEAPONS||[]).find(x=>x.id===id);
  return w? `${w.name}（${w.cost}）` : '—';
}
export function fmtWeaponStat(id){
  const w = (window.WEAPONS||[]).find(x=>x.id===id);
  if(!w || id==='none') return '—';
  return `${w.range}｜AP${w.ap}/DMG${w.dmg}`;
}
export function fmtArmor(part,key){
  const opt = (window.ARMOR_PARTS?.[part]?.options||[]).find(o=>o.id===key);
  if(!opt || opt.id==='none') return `${(window.ARMOR_PARTS?.[part]?.label)||'護甲'}：—`;
  return `${window.ARMOR_PARTS[part].label}：${opt.name}（${opt.cost}）`;
}
export function fmtArmorValues(picks){
  const pk = picks || {};
  const get = (p)=> (p && typeof p.armor === 'number' ? p.armor : 0);
  return `頭${get(pk.head)}／胸${get(pk.chest)}／臂${get(pk.arm)}／腿${get(pk.leg)}`;
}
