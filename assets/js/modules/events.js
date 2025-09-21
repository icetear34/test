// 事件註冊
import { dom, state, LS_KEY } from './state.js';
import { currentCosts, showWarnings, renderList } from './render.js';
import { deriveStats, migrateUnit, serialize } from './calc.js';
import { toBase64, fromBase64, getRandomSoldierName } from './utils.js';
import { initSelectors, renderExtras } from './ui.js';

export function bindForm(){
  const onChange = ()=>{
    currentCosts();
    showWarnings();
  };
  ['role','mainWeapon','sidearm','armorHead','armorChest','armorArm','armorLeg']
    .map(id=>document.getElementById(id))
    .forEach(s=>{
      s.addEventListener('change', ()=>{
        if(s.id==='role'){ renderExtras(dom.roleSel.value); }
        onChange();
      });
    });
  dom.extrasBox.addEventListener('change', onChange);

  dom.btnAdd.addEventListener('click', (e)=>{
    e.preventDefault();
    const { total, picks } = currentCosts();
    const armorIds = {
      head:dom.aHeadSel.value, chest:dom.aChestSel.value, arm:dom.aArmSel.value, leg:dom.aLegSel.value
    };
    const extras = [...dom.extrasBox.querySelectorAll('input[type=checkbox]:checked')].map(cb=>cb.value);

    const unit = {
      name: document.getElementById('name').value.trim(),
      role: dom.roleSel.value,
      main: dom.mainSel.value,
      side: dom.sideSel.value,
      armor: armorIds,
      armorPicks: picks,
      extras,
      cost: total
    };
    const st = deriveStats(unit); unit.move=st.move; unit.shoot=st.shoot;

    if(state.editIndex===-1){ state.units.push(unit); } else { state.units[state.editIndex]=unit; }
    state.editIndex=-1; document.getElementById('formTitle').textContent='新增單位'; dom.btnAdd.textContent='加入列表';
    resetForm(); renderList(); saveToStorage();
  });

  dom.btnReset.addEventListener('click', (e)=>{ e.preventDefault(); resetForm(); });

  dom.btnRandomName.addEventListener('click', (e)=>{
    e.preventDefault();
    document.getElementById('name').value = getRandomSoldierName();
  });

  document.querySelector('#list').addEventListener('click', (e)=>{
    const act = e.target.dataset.act;
    const idx = Number(e.target.dataset.i);
    if(act==='del'){
      state.units.splice(idx,1); renderList(); saveToStorage();
    }else if(act==='edit'){
      const u = state.units[idx];
      state.editIndex=idx; document.getElementById('formTitle').textContent='修改單位'; dom.btnAdd.textContent='保存修改';
      document.getElementById('name').value = u.name||'';
      dom.roleSel.value = u.role; dom.mainSel.value = u.main; dom.sideSel.value = u.side;
      dom.aHeadSel.value = u.armor.head; dom.aChestSel.value = u.armor.chest; dom.aArmSel.value = u.armor.arm; dom.aLegSel.value = u.armor.leg;
      renderExtras(u.role);
      // 勾選裝備
      dom.extrasBox.querySelectorAll('input[type=checkbox]').forEach(cb=>{ cb.checked = u.extras.includes(cb.value); });
      currentCosts(); showWarnings();
      window.scrollTo({top:0,behavior:'smooth'});
    }
  });
}

export function bindCapDropdown(){
  // 預設收起由 HTML 的 hidden 控制，這裡只處理切換
  dom.capChip.addEventListener('click', (e)=>{
    if (e.target.closest('.menu')) return;
    dom.capMenu.hidden = !dom.capMenu.hidden;
  });
  dom.capMenu.querySelectorAll('button').forEach(btn=>{
    btn.addEventListener('click', (e)=>{
      e.stopPropagation();
      state.TEAM_CAP = Number(btn.dataset.cap);
      dom.capLabel.textContent = state.TEAM_CAP;
      dom.capInline.textContent = state.TEAM_CAP;
      dom.capMenu.hidden = true;
      renderList(); saveToStorage();
    });
  });
  document.addEventListener('click', (e)=>{ if(!dom.capChip.contains(e.target)) dom.capMenu.hidden = true; });
}

export function bindToolbar(){
  dom.btnExport?.addEventListener('click', ()=>{
    const blob = new Blob([JSON.stringify(serialize(),null,2)],{type:'application/json'});
    const a = document.createElement('a'); const ts = new Date().toISOString().slice(0,10);
    a.href = URL.createObjectURL(blob); a.download = `army_${ts}.json`;
    document.body.appendChild(a); a.click(); setTimeout(()=>{ URL.revokeObjectURL(a.href); a.remove(); }, 0);
  });

  dom.fileImport?.addEventListener('change', (e)=>{
    const f = e.target.files[0]; if(!f) return; const reader = new FileReader();
    reader.onload = ()=>{
      try{
        const data = JSON.parse(reader.result);
        if(!data || !Array.isArray(data.units)) throw new Error('格式錯誤');
        state.units = data.units.map(migrateUnit);
        state.TEAM_CAP = data.cap || 300;
        dom.capLabel.textContent = state.TEAM_CAP; dom.capInline.textContent = state.TEAM_CAP;
        renderList(); saveToStorage(); alert('匯入成功！');
      }catch(err){ alert('匯入失敗：' + err.message); }
    };
    reader.readAsText(f); e.target.value='';
  });

  dom.btnShare?.addEventListener('click', async ()=>{
    const b64 = toBase64(JSON.stringify(serialize()));
    const url = `${location.origin}${location.pathname.replace(/[^/]+$/,'')}index.html#team=${b64}`;
    try{ await navigator.clipboard.writeText(url); alert('分享連結已複製到剪貼簿！\n\n'+url); }
    catch{ prompt('將下列連結複製分享：', url); }
  });

  dom.btnClear?.addEventListener('click', ()=>{
    if(!confirm('確定要清空整個清單嗎？')) return;
    state.units = []; renderList(); saveToStorage();
    if(location.hash){ history.replaceState(null,'',location.pathname+location.search); }
  });
}

export function resetForm(){
  document.getElementById('name').value = getRandomSoldierName();
  dom.roleSel.selectedIndex=0; dom.mainSel.selectedIndex=0; dom.sideSel.selectedIndex=0;
  dom.aHeadSel.selectedIndex=0; dom.aChestSel.selectedIndex=0; dom.aArmSel.selectedIndex=0; dom.aLegSel.selectedIndex=0;
  renderExtras(dom.roleSel.value); currentCosts(); showWarnings();
}

export function saveToStorage(){
  try{ localStorage.setItem(LS_KEY, JSON.stringify(serialize())); }catch(e){}
}

export function tryLoadFromStorage(){
  try{
    const raw = localStorage.getItem(LS_KEY); if(!raw) return false;
    const data = JSON.parse(raw); if(!data || !Array.isArray(data.units)) return false;
    state.units = data.units.map(migrateUnit);
    state.TEAM_CAP = data.cap || 300;
    dom.capLabel.textContent = state.TEAM_CAP; dom.capInline.textContent = state.TEAM_CAP;
    renderList(); return true;
  }catch{ return false; }
}

export function tryLoadFromUrl(){
  if(!location.hash.startsWith('#team=')) return false;
  try{
    const b64 = location.hash.replace('#team=','');
    const data = JSON.parse(fromBase64(b64));
    if(!data || !Array.isArray(data.units)) return false;
    state.units = data.units.map(migrateUnit);
    state.TEAM_CAP = data.cap || 300;
    dom.capLabel.textContent = state.TEAM_CAP; dom.capInline.textContent = state.TEAM_CAP;
    renderList(); saveToStorage(); return true;
  }catch{ return false; }
}

export function initUI(){
  initSelectors();
  renderExtras(dom.roleSel.value);
  resetForm();
}
