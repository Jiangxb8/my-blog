(function () {
  function build() {
    // 只在首页运行
    if (!document.getElementById('post-container')) return;
    if (document.getElementById('right-sidebar')) return;

    var contentInner = document.getElementById('content-inner');
    if (!contentInner) return;

    var sidebar = document.createElement('div');
    sidebar.id = 'right-sidebar';

    /* ── 欢迎卡片 ── */
    var wc = document.createElement('div');
    wc.className = 'right-card rs-welcome-card';
    wc.innerHTML =
      '<div class="rs-online"><span class="rs-dot"></span>欢迎访问</div>' +
      '<h3 class="rs-site-name">Uriosh 的小站</h3>' +
      '<p class="rs-desc">记录技术与生活，给互联网留下一点属于自己的痕迹。</p>' +
      '<a class="rs-btn" href="/about/">查看关于 →</a>';

    /* ── 最近文章卡片（从 DOM 提取标题） ── */
    var rc = document.createElement('div');
    rc.className = 'right-card rs-recent-card';

    var items = [];
    document.querySelectorAll('.recent-post-item').forEach(function (el) {
      var a   = el.querySelector('a.article-title, .article-title a, .recent-post-title a');
      var d   = el.querySelector('.post-meta-date-created, .post-meta-date, time');
      if (a && items.length < 6) {
        items.push({
          title : a.textContent.trim(),
          href  : a.href || '#',
          date  : d ? d.textContent.trim() : ''
        });
      }
    });

    var listHTML = items.map(function (it) {
      return '<li>' +
        '<a href="' + it.href + '">' + it.title + '</a>' +
        (it.date ? '<span class="rs-date">' + it.date + '</span>' : '') +
        '</li>';
    }).join('');

    rc.innerHTML =
      '<div class="rs-header"><span>⏰</span> 最近文章</div>' +
      '<ul class="rs-list">' + listHTML + '</ul>';

    sidebar.appendChild(wc);
    sidebar.appendChild(rc);
    contentInner.appendChild(sidebar);
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', build);
  } else {
    build();
  }
})();
