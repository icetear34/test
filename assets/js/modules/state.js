// assets/js/state.js
// 啟動狀態
export const LS_KEY = 'armyBuilder300';

export const dom = {}; // 先留空，等 initDom() 後才填入

export function initDom() {
  const el = (id)=>document.getElementById(id);
  dom.roleSel   = el('role');
  dom.mainSel   = el('mainWeapon');
  dom.sideSel   = el('sidearm');
  dom.aHeadSel  = el('armorHead');
  dom.aChestSel = el('armorChest');
  dom.aArmSel   = el('armorArm');
  dom.aLegSel   = el('armorLeg');
  dom.extrasBox = el('extrasBox');


  dom.costRole  = el('costRole');
  dom.costMain  = el('costMain');
  dom.costSide  = el('costSide');
  dom.costArmor = el('costArmor');
  dom.costExtra = el('costExtra');
  dom.costTotal = el('costTotal');
  dom.warnings  = el('warnings');

  dom.btnAdd    = el('btnAdd');
  dom.btnReset  = el('btnReset');
  dom.btnRandomName = el('btnRandomName');

  dom.sumPts     = el('sumPts');
  dom.sumPtsFoot = el('sumPtsFoot');
  dom.sumUnits   = el('sumUnits');
  dom.sumCmd     = el('sumCmd');
  dom.bar        = el('bar');
  dom.listBody   = document.querySelector('#list tbody');
  dom.formTitle  = el('formTitle');

  dom.capChip   = el('capChip');
  dom.capMenu   = el('capMenu');
  dom.capLabel  = el('capLabel');
  dom.capInline = el('capInline');

  dom.btnExport = el('btnExport');
  dom.fileImport= el('fileImport');
  dom.btnShare  = el('btnShare');
  dom.btnClear  = el('btnClear');
}

export const state = {
  units: [],
  editIndex: -1,
  TEAM_CAP: 300,
};
