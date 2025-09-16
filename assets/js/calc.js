// 計算、遷移與序列化
import { armorOpt } from './utils.js';
import { state } from './state.js';

export function getWeapon(id){ return (window.WEAPONS||[]).find(w=>w.id===id); }
export function weaponCost(id){ const w = getWeapon(id); return w? w.cost:0; }

export function pickArmorFromIds(ids){
  return {
    head:  armorOpt('head',  ids.head),
    chest: armorOpt('chest', ids.chest),
    arm:   armorOpt('arm',   ids.arm),
    leg:   armorOpt('leg',   ids.leg),
  };
}

export function armorPickCost(picks){
  return ['head','chest','arm','leg'].reduce((s,part)=>{
    const p = picks[part]; return s + (p?.cost||0);
  },0);
}

export function extrasCost(ids){
  const map = { smoke:2, ammo:2, medkit:2, shield:5, bridge:5, beacon:5 };
  return (ids||[]).reduce((s,x)=> s+(map[x]||0), 0);
}

export function deriveStats(unit){
  const role = (window.ROLES||[]).find(r=>r.id===unit.role);
  let move = role?.baseMove ?? 6;
  let shoot = role?.baseShoot ?? 0;

  if(role?.limits?.moveMod) move += role.limits.moveMod;
  if(unit.armorPicks?.leg?.moveMod)  move += unit.armorPicks.leg.moveMod||0;
  if(unit.armorPicks?.head?.shootMod) shoot += unit.armorPicks.head.shootMod||0;

  const mainW = getWeapon(unit.main);
  if(mainW?.tags?.includes('heavy')) move -= 1;

  return { move: Math.max(0, move), shoot };
}

export function calcUnitCost(u){
  let c = window.BASE_COST || 5;
  const role = (window.ROLES||[]).find(r=>r.id===u.role);  c += role? role.cost:0;
  const mw   = getWeapon(u.main);                          c += mw? mw.cost:0;
  const sw   = getWeapon(u.side);                          c += sw? sw.cost:0;
  c += armorPickCost(u.armorPicks||pickArmorFromIds(u.armor||{}));
  c += extrasCost(u.extras);
  return c;
}

// 舊資料遷移
export function migrateUnit(u){
  if(!u) return u;
  u.armor = u.armor || { head:'none', chest:'none', arm:'none', leg:'none' };
  u.armorPicks = u.armorPicks || pickArmorFromIds(u.armor);
  if (typeof u.cost !== 'number')  u.cost = calcUnitCost(u);
  if (typeof u.move !== 'number' || typeof u.shoot !== 'number'){
    const st = deriveStats(u); u.move=st.move; u.shoot=st.shoot;
  }
  return u;
}

export function serialize(){
  return { version:2, cap: state.TEAM_CAP, total: totalPoints(), units: state.units };
}
export function totalPoints(){ return state.units.reduce((a,b)=>a+(b.cost||0),0); }
