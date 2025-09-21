# 變更日誌 (CHANGELOG)

## [2025-09-22] - 專案重構

### 新增
- 建立模組化的檔案結構
- 新增 README.md 專案說明文件
- 新增此變更日誌文件

### 改變
- 重新組織檔案結構：
  - 將 JavaScript 檔案移動到 `assets/js/modules/` 
  - 將資料檔案移動到 `assets/js/data/`
  - 將 CSS 檔案移動到 `assets/css/`
- 資料檔案重新命名：
  - `data_roles.js` → `roles.js`
  - `data_weapons.js` → `weapons.js`
  - `data_armors.js` → `armors.js`
  - `data_rules.js` → `rules.js`
- 更新 HTML 檔案中的路徑引用

### 修復
- 修正 `render.js` 中的程式碼品質問題
- 移除不必要的 `ensureDom()` 函式呼叫

### 檔案結構對照

#### 重構前
```
CB/
├── index.html
├── rules.html
├── assets/
│   ├── styles.css
│   ├── data_roles.js
│   ├── data_weapons.js
│   ├── data_armors.js
│   ├── data_rules.js
│   └── js/
│       ├── main.js
│       ├── state.js
│       ├── events.js
│       ├── render.js
│       ├── calc.js
│       ├── ui.js
│       └── utils.js
```

#### 重構後
```
CB/
├── index.html
├── rules.html
├── README.md
├── CHANGELOG.md
├── assets/
│   ├── css/
│   │   └── styles.css
│   └── js/
│       ├── modules/
│       │   ├── main.js
│       │   ├── state.js
│       │   ├── events.js
│       │   ├── render.js
│       │   ├── calc.js
│       │   ├── ui.js
│       │   └── utils.js
│       └── data/
│           ├── roles.js
│           ├── weapons.js
│           ├── armors.js
│           └── rules.js
```

這次重構提升了專案的可維護性和可讀性，採用了更標準的 Web 專案結構。