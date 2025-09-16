// 兵種資料（基本移動/射擊、分數、限制）
window.ROLES = [
  { id:'soldier',   name:'一般兵', cost:5, baseMove:6, baseShoot:0, limits:{} },
  { id:'medic',     name:'醫護兵', cost:7, baseMove:6, baseShoot:0,
    limits:{ mainAllowed:['pistol9','pistol45','smg','shotgunAutoPistol'] }},
  { id:'engineer',  name:'工兵',   cost:5, baseMove:6, baseShoot:0, limits:{} },
  { id:'specialist',name:'專家',   cost:3, baseMove:5, baseShoot:0, limits:{ moveMod:-1 }},
  { id:'support',   name:'支援兵', cost:7, baseMove:5, baseShoot:0, limits:{ moveMod:-1 }},
  { id:'commander', name:'指揮官（唯一）', cost:8, baseMove:6, baseShoot:0, limits:{ unique:true } },
];

// ⚠️ 素體分數取消
window.BASE_COST = 0;
