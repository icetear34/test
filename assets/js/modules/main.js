// assets/js/main.js
import { initUI, bindForm, bindCapDropdown, bindToolbar, tryLoadFromStorage, tryLoadFromUrl } from './events.js';
import { initDom } from './state.js';

function boot(){
  initDom();        // ← 先把所有 dom.* 綁好
  initUI();         // 再做 UI 初始化（會用到 dom.*）
  bindForm();
  bindCapDropdown();
  bindToolbar();
  // 先 URL，再 localStorage
  tryLoadFromUrl() || tryLoadFromStorage();
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', boot);
} else {
  boot();
}
