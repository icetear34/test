// 護甲資料（部位 → 選項；含 armor 數值與對移動/射擊修正）
window.ARMOR_PARTS = {
  head: {
    label:'頭盔',
    options:[
      { id:'none', name:'無', cost:0,  armor:0,  shootMod:0 },
      { id:'A2',   name:'Armor 2', cost:5,  armor:2,  shootMod:0 },
      { id:'A4',   name:'Armor 4', cost:10, armor:4,  shootMod:-2 },
      { id:'A6',   name:'Armor 6', cost:15, armor:6,  shootMod:-2 },
      { id:'A10',  name:'Armor 10',cost:20, armor:10, shootMod:-2 },
    ]
  },
  chest:{
    label:'胸甲（含腹）',
    options:[
      { id:'none', name:'無', cost:0,  armor:0,  rollMod:0 },
      { id:'A2',   name:'Armor 2', cost:4,  armor:2,  rollMod:0 },
      { id:'A4',   name:'Armor 4', cost:8,  armor:4,  rollMod:-1 },
      { id:'A6',   name:'Armor 6', cost:12, armor:6,  rollMod:-1 },
      { id:'A8',   name:'Armor 8', cost:16, armor:8,  rollMod:-1 },
    ]
  },
  arm:{
    label:'臂甲（雙手）',
    options:[
      { id:'none', name:'無', cost:0,  armor:0, dexMod:0 },
      { id:'A2',   name:'Armor 2', cost:3, armor:2, dexMod:0 },
      { id:'A4',   name:'Armor 4', cost:6, armor:4, dexMod:-1 },
      { id:'A6',   name:'Armor 6', cost:9, armor:6, dexMod:-1 },
    ]
  },
  leg:{
    label:'腿甲（雙腿）',
    options:[
      { id:'none', name:'無', cost:0,  armor:0, moveMod:0 },
      { id:'A2',   name:'Armor 2', cost:3, armor:2, moveMod:0 },
      { id:'A4',   name:'Armor 4', cost:6, armor:4, moveMod:-1 },
      { id:'A6',   name:'Armor 6', cost:9, armor:6, moveMod:-1 },
    ]
  }
};
