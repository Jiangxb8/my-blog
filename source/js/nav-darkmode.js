(function () {
  function addNavDarkBtn() {
    var navRight = document.getElementById('nav-right');
    if (!navRight || document.getElementById('nav-darkmode-btn')) return;

    var btn = document.createElement('div');
    btn.id = 'nav-darkmode-btn';
    btn.className = 'nav-button';
    btn.title = '切换深色 / 浅色模式';

    var icon = document.createElement('i');
    icon.className = 'anzhiyufont anzhiyu-icon-moon';
    btn.appendChild(icon);

    function updateIcon() {
      var isDark = document.documentElement.getAttribute('data-theme') === 'dark';
      icon.className = isDark
        ? 'anzhiyufont anzhiyu-icon-sun'
        : 'anzhiyufont anzhiyu-icon-moon';
    }

    btn.addEventListener('click', function () {
      var isDark = document.documentElement.getAttribute('data-theme') === 'dark';
      if (isDark) {
        window.activateLightMode && activateLightMode();
      } else {
        window.activateDarkMode && activateDarkMode();
      }
      // persist choice the same way the theme does
      var newMode = isDark ? 'light' : 'dark';
      try {
        var saves = JSON.parse(localStorage.getItem('hexo-theme-anzhiyu') || '{}');
        saves.theme = { value: newMode, expires: Date.now() + 2 * 24 * 3600 * 1000 };
        localStorage.setItem('hexo-theme-anzhiyu', JSON.stringify(saves));
      } catch (e) {}
      setTimeout(updateIcon, 50);
    });

    // insert before the totop button so it sits near the right edge
    var totop = document.getElementById('nav-totop');
    if (totop) {
      navRight.insertBefore(btn, totop);
    } else {
      navRight.appendChild(btn);
    }
    updateIcon();

    // keep icon in sync when theme changes externally (e.g. auto-darkmode)
    new MutationObserver(updateIcon).observe(document.documentElement, {
      attributes: true, attributeFilter: ['data-theme']
    });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', addNavDarkBtn);
  } else {
    addNavDarkBtn();
  }

  // also run after pjax navigation
  document.addEventListener('pjax:complete', addNavDarkBtn);
})();
