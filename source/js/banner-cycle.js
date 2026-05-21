(function () {
  // Banner 轮播图片列表，可自由替换为自己喜欢的图片 URL
  var imgs = [
    'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1920&q=85', // 雪山
    'https://images.unsplash.com/photo-1448375240586-882707db888b?w=1920&q=85', // 森林
    'https://images.unsplash.com/photo-1505118380757-91f5f5632de0?w=1920&q=85', // 海浪
    'https://images.unsplash.com/photo-1531366936337-7c912a4589a7?w=1920&q=85', // 极光
    'https://images.unsplash.com/photo-1477959858617-67f85cf4f1df?w=1920&q=85', // 城市夜景
    'https://images.unsplash.com/photo-1469474968028-56623f02e42e?w=1920&q=85', // 山谷日光
  ];

  // 随机选一张作为起始图
  var cur = Math.floor(Math.random() * imgs.length);
  var INTERVAL = 6000;   // 切换间隔（毫秒）
  var FADE_MS  = 1400;   // 淡入淡出时长（毫秒）

  // 等页面加载完再执行
  window.addEventListener('load', function () {
    var header = document.getElementById('page-header');
    if (!header) return;

    // 设置初始图片
    header.style.backgroundImage = 'url(' + imgs[cur] + ')';
    header.style.backgroundSize  = 'cover';
    header.style.backgroundPosition = 'center';
    header.style.position = 'relative';
    header.style.overflow = 'hidden';

    // 预加载所有图片，减少切换时的白屏
    imgs.forEach(function (src) {
      var img = new Image();
      img.src = src;
    });

    // 开始轮播
    setInterval(function () {
      var next = (cur + 1) % imgs.length;

      // 创建一个渐入层覆盖在顶部
      var layer = document.createElement('div');
      layer.style.cssText = [
        'position:absolute',
        'top:0', 'left:0', 'right:0', 'bottom:0',
        'background-size:cover',
        'background-position:center',
        'background-image:url(' + imgs[next] + ')',
        'opacity:0',
        'transition:opacity ' + (FADE_MS / 1000) + 's ease',
        'z-index:0',
        'pointer-events:none',
      ].join(';');

      header.appendChild(layer);

      // 下一帧触发淡入
      requestAnimationFrame(function () {
        requestAnimationFrame(function () {
          layer.style.opacity = '1';

          // 淡入完成后：更新底层背景，移除覆盖层
          setTimeout(function () {
            header.style.backgroundImage = 'url(' + imgs[next] + ')';
            layer.remove();
            cur = next;
          }, FADE_MS + 100);
        });
      });
    }, INTERVAL);
  });
})();
