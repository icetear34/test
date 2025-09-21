// 成本計算顯示 & 清單渲染
import { dom, state } from './state.js';
import { extrasCost, weaponCost, pickArmorFromIds, armorPickCost } from './calc.js';
import { fmtRole, fmtWeapon, fmtWeaponStat, fmtArmor, fmtArmorValues } from './ui.js';

export function currentCosts(){
  const BASE = window.BASE_COST||5;
  const role = (window.ROLES||[]).find(r=>r.id===dom.roleSel.value);
  const cRole  = role ? role.cost : 0;
  const cMain  = weaponCost(dom.mainSel.value);
  const cSide  = weaponCost(dom.sideSel.value);
  const picks  = pickArmorFromIds({
    head:dom.aHeadSel.value, chest:dom.aChestSel.value, arm:dom.aArmSel.value, leg:dom.aLegSel.value
  });
  const cArmor = armorPickCost(picks);
  const extraIds = [...dom.extrasBox.querySelectorAll('input[type=checkbox]:checked')].map(cb=>cb.value);
  const cExtra = extrasCost(extraIds);
  const total  =  cRole + cMain + cSide + cArmor + cExtra;

  dom.costRole.textContent  = cRole;
  dom.costMain.textContent  = cMain;
  dom.costSide.textContent  = cSide;
  dom.costArmor.textContent = cArmor;
  dom.costExtra.textContent = cExtra;
  dom.costTotal.textContent = total;

  return { total, picks };
}

export function showWarnings(){
  const msgs=[];
  const role = (window.ROLES||[]).find(r=>r.id===dom.roleSel.value);
  const main = dom.mainSel.value;
  if(role && role.id==='medic'){
    const allow = (role.limits?.mainAllowed)||[];
    if(main!=='none' && !allow.includes(main)){
      msgs.push('醫護兵主武器限制：手槍 / 重手槍 / SMG / 散彈手槍');
    }
  }
  if(role && role.limits?.unique){
    const hasCmd = state.units.some(u=>u.role==='commander');
    if(hasCmd && state.editIndex===-1){ msgs.push('指揮官為唯一職能：清單已有 1 名。'); }
  }
  dom.warnings.innerHTML = msgs.map(m=>`<div class="warn">⚠ ${m}</div>`).join('');
}

export function renderList(){
  dom.listBody.innerHTML='';
  let total=0, cmd=0;
  state.units.forEach((u,i)=>{
    total += u.cost;
    if(u.role==='commander') cmd++;
    const tr = document.createElement('tr');
    tr.innerHTML = `
      <td>${i+1}</td>
      <td>
        <div><strong>${u.name||'(未命名)'}</strong></div>
        <div class="muted small">${fmtRole(u.role)}</div>
        <div class="small">移動值：<strong>${u.move}</strong>　射擊值：<strong>${u.shoot>=0?`+${u.shoot}`:u.shoot}</strong></div>
      </td>
      <td>
        <div>${fmtWeapon(u.main)}</div>
        <div class="muted small">副：${fmtWeapon(u.side)}</div>
      </td>
      <td class="small">
        <div>${fmtWeaponStat(u.main)}</div>
        <div class="muted small">副：${fmtWeaponStat(u.side)}</div>
      </td>
      <td class="small">
        ${fmtArmor('head',u.armor.head)}<br>
        ${fmtArmor('chest',u.armor.chest)}<br>
        ${fmtArmor('arm',u.armor.arm)}<br>
        ${fmtArmor('leg',u.armor.leg)}
      </td>
      <td class="small">${fmtArmorValues(u.armorPicks)}</td>
      <td><strong>${u.cost}</strong></td>
      <td>
        <div class="inline">
          <button class="btn btn-ghost" data-act="edit" data-i="${i}">修改</button>
          <button class="btn btn-bad" data-act="del" data-i="${i}">移除</button>
        </div>
      </td>
    `;
    dom.listBody.appendChild(tr);
  });
  dom.sumPts.textContent = total;
  dom.sumPtsFoot.textContent = total;
  dom.sumUnits.textContent = state.units.length;
  dom.sumCmd.textContent = cmd;
  const pct = Math.max(0, Math.min(100, (total/state.TEAM_CAP)*100));
  dom.bar.style.width = pct + '%';
  if(cmd>1){ dom.sumCmd.parentElement.classList.add('bad'); } else { dom.sumCmd.parentElement.classList.remove('bad'); }
}
