// 武器資料（分數 + 數值：range, ap, dmg）
window.WEAPONS = [
  { id:'none', name:'（無）', cost:0,   range:'—',             ap:null, dmg:null },
  { id:'pistol9',  name:'手槍 9mm',        cost:5,  range:'C2 3D6+2',    ap:1, dmg:2 },
  { id:'pistol45', name:'重手槍 .45',      cost:8,  range:'C2 3D8+2',    ap:2, dmg:3 },
  { id:'smg',      name:'衝鋒槍 SMG',      cost:10, range:'C3 4D8+1',    ap:2, dmg:2 },
  { id:'carbine',  name:'卡賓槍',          cost:12, range:'C2 4D10+2',   ap:3, dmg:3 },
  { id:'ar556',    name:'突擊步槍 5.56',   cost:15, range:'C2 4D12+3',   ap:3, dmg:4 },
  { id:'ar762',    name:'突擊步槍 7.62',   cost:18, range:'C2 3D12+3',   ap:4, dmg:5 },
  { id:'lmg',      name:'輕機槍 LMG',      cost:20, range:'C3 5D10+1',   ap:3, dmg:4, tags:['heavy'] },
  { id:'hmg',      name:'重機槍 HMG',      cost:25, range:'C3 5D12+2',   ap:5, dmg:5, tags:['heavy'] },
  { id:'shotgun12',name:'散彈 12G',        cost:15, range:'C4 4D12−4',   ap:3, dmg:3 },
  { id:'autoSG',   name:'自動散彈',        cost:18, range:'C4 3D8−2',    ap:3, dmg:2 },
  { id:'sniper308',name:'狙擊槍 .308',     cost:20, range:'C1 2D20+6',   ap:4, dmg:6 },
  { id:'amr50',    name:'反器材 .50',      cost:30, range:'C1 2D20+8',   ap:6, dmg:8, tags:['heavy'] },
  { id:'gl',       name:'榴彈發射器',      cost:25, range:'C1 2D12+3(範圍)', ap:2, dmg:5, tags:['heavy'] },
  { id:'at',       name:'火箭筒 / AT',     cost:40, range:'C1 1D12+5(範圍)', ap:6, dmg:8, tags:['heavy'] },
  { id:'shotgunAutoPistol', name:'散彈手槍（醫護）', cost:10, range:'C3 3D6−1', ap:2, dmg:2 }
];
