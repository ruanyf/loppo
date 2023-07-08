/* set content's min-height */
(function () {
  var content = document.querySelector('.content');
  var navbarHeight =
    window.getComputedStyle(document.querySelector('.navbar'))
    .getPropertyValue('height');
  var footHeight =
    window.getComputedStyle(document.querySelector('.foot'))
    .getPropertyValue('height');
  var minHeight = document.documentElement.clientHeight
    - parseInt(navbarHeight)
    - parseInt(footHeight);
  content.style.minHeight = minHeight + 'px';
})();


/* insert article's toc */
(function () {
  var article = document.querySelector('.article');
  var firstH2Title = article.querySelector('h2');
  var h2TitleNumber = article.querySelectorAll('h2');

  if (firstH2Title && LOPPO.article_toc && h2TitleNumber.length >= 2) {
    var toc_div = document.createElement('div');
    toc_div.setAttribute('class', 'article-toc');
    toc_div.innerHTML = '<h3>Contents</h3>' + LOPPO.article_toc;
    article.insertBefore(toc_div, firstH2Title);
  }
})();


/* hashchange handler */
window.onhashchange = function () {
  var hash = location.hash;
  if (!hash) return;
  var nav = document.querySelector('.navbar');
  var navHeight = nav.getBoundingClientRect().height;
  window.scrollBy(0, -1 * navHeight);
};


/* content font size */
(function () {
  var content = document.querySelector('.content');
  var sizeArr = ['is-medium', null, 'is-large'];
  var currentSize = 1;
  var switcher = document.querySelector('.article-bar .level-item .link-item-size');
  switcher.onclick = function (e) {
    content.classList.remove(sizeArr[currentSize]);
    currentSize += 1;
    if (currentSize > 2) currentSize -= 3;
    content.classList.add(sizeArr[currentSize]);
  };
})();


/* toggle book toc */
(function () {
  var toc = document.querySelector('.book-toc');
  var switcher = document.querySelector('.article-bar .level-item .link-item-toc');
  switcher.onclick = function (e) {
    toc.classList.toggle('is-hidden');
  };
  var closeButton = toc.querySelector('.title-close');
  closeButton.onclick = function (e) {
    toc.classList.toggle('is-hidden');
  };
})();


/* toggle first level directory */
(function () {
  var firstLevelDir = document.querySelectorAll('.book-toc .chapter-level-1:not(.chapter-level-1-current)');
  firstLevelDirArr = Array.prototype.slice.call(firstLevelDir);
  firstLevelDirArr.forEach(function (i) {
    i.classList.add('is-hidden');
  });

  var firstLevelCollapse = document.querySelectorAll('.book-toc .first-level-collapse');
  firstLevelCollapseArr = Array.prototype.slice.call(firstLevelCollapse);
  firstLevelCollapseArr.forEach(function (i) {
    i.onclick = function (e) {
      e.currentTarget.parentElement.nextSibling.classList.toggle('is-hidden');
      var icon = i.querySelector('.icon');
      icon.classList.toggle('icon-expand');
      icon.classList.toggle('icon-collapse');
      insert_icon_image('expand');
      insert_icon_image('collapse');
    };
  });
})();


/* insert icon image */
function insert_icon_image(iconName) {
  if (iconName === undefined) {
    var icons = document.querySelectorAll('.icon');
  } else {
    var icons = document.querySelectorAll('.icon-' + iconName);
  }
  var iconsArr = Array.prototype.slice.call(icons);
  iconsArr.forEach(function (i) {
    var imgOld = i.querySelector('img');
    if (imgOld) i.removeChild(imgOld);
    var img = document.createElement('img');
    if (iconName === undefined) {
      img.src = LOPPO.relative_root_path + 'assets/css/' + i.dataset.icon + '.svg';
    } else {
      img.src = LOPPO.relative_root_path + 'assets/css/' + iconName + '.svg';
    }
    i.appendChild(img);
  });
}
insert_icon_image();


/* sticky article bar */
(function () {
  var article = document.querySelector('.article-container');
  var articleWidth = article.getBoundingClientRect().width;
  var bar = document.querySelector('.article-bar');
  bar.style.width = articleWidth + 'px';
  var foot = document.querySelector('.foot');

  var placeholder = document.createElement('div');
  var barWidth = bar.getClientRects()[0].width;
  var barHeight = bar.getClientRects()[0].height;
  foot.style.height = barHeight + 'px';
  placeholder.style.width = barWidth + 'px';
  placeholder.style.height = barHeight + 'px';
  var isAdded = false;

  function throttle(f) {
    var mark = Date.now();
    return function () {
      var now = Date.now();
      if ((now - mark) < 300) return;
      mark = now;
      f();
    };
  }

  function toggleSticky() {
    setTimeout(function () {
    var footTop = foot.getBoundingClientRect().top;
    if (!isAdded && footTop > (document.documentElement.clientHeight + barHeight + 10)) {
      isAdded = true;
      article.insertBefore(placeholder, bar);
      bar.classList.add('sticky');
    } else if (isAdded && footTop <= (document.documentElement.clientHeight + barHeight + 10)) {
      article.removeChild(placeholder);
      bar.classList.remove('sticky');
      isAdded = false;
    }
    }, 0);
  }

  toggleSticky();
  window.addEventListener('scroll', throttle(toggleSticky));
})();


/* progress indicator */
(function () {
  // var pageHeight = document.documentElement.scrollHeight;
  var article = document.querySelector('.article');
  var viewportHeight = document.documentElement.clientHeight;
  var articleHeight = article.getBoundingClientRect().height;
  var prog = document.querySelector('.progress-indicator');
  window.addEventListener('scroll', function () {
    window.requestAnimationFrame(function () {
      var perc = Math.max(0, Math.min(1, (viewportHeight - article.getBoundingClientRect().top) / articleHeight));
      updateProgress(perc);
    });
  });
  function updateProgress(perc) {
    prog.style.width = perc * 100 + '%';
  }
})();

/* support mermaid.js */
(function () {
function onNextFrame(callback) {
  return () => {
    setTimeout(function () {
      window.requestAnimationFrame(callback)
    }, 0)
  };
}

function addScript(src, callback) {
  const head = document.getElementsByTagName('head')[0];
  const script = document.createElement('script');
  script.setAttribute('type', 'text/javascript');
  script.setAttribute('charset', 'utf-8');
  script.setAttribute('src', src);
  script.onload = callback;
  head.appendChild(script);
}

function addStyle(src) {
  const head = document.getElementsByTagName('head')[0];
  const link = document.createElement('link');
  link.type = 'text/css';
  link.rel = 'stylesheet';
  link.href = src;
  head.appendChild(link);
}

// mermaid
function embedMermaid() {
  const mermaidDivs = document.querySelectorAll('.mermaid');
  const mermaidArr = Array.prototype.slice.call(mermaidDivs);
  if (!mermaidArr.length) return;
  function mermaidHandler() {
    window.mermaid.initialize({
      startOnLoad: false,
      logLevel: 4,
      gantt: {
        axisFormatter: [
          // Within a day
          ["%I:%M", function (d) {
            return d.getHours();
          }],
          // Monday a week
          ["%m-%d", function (d) {
            return d.getDay() == 1;
          }],
          // Day within a week (not monday)
          ["%m-%e", function (d) {
            return d.getDay() && d.getDate() != 1;
          }],
          // within a month
          ["%m-%e", function (d) {
            return d.getDate() != 1;
          }],
          // Month
          ["%m-%e", function (d) {
            return d.getMonth();
          }]
        ]
      },
    });
    mermaidArr.forEach((f, i) => {
      if (f.dataset["processed"] === 'true') return;
      f.innerHTML = decodeURIComponent(f.dataset["source"]);
      f.style.color = 'white';
      (onNextFrame(() => {
        window.mermaid.init(undefined, f);
        if (!('eventAttached' in f.dataset)) {
          f.dataset['eventAttached'] = true;
        }
        f.style.color = 'inherit';
      }))();
    });
  }

  if (window.mermaid) {
    mermaidHandler();
  } else {
    addStyle('https://cdn.rawgit.com/knsv/mermaid/7.0.0/dist/mermaid.css');
    addScript(
      'https://cdn.rawgit.com/knsv/mermaid/7.0.0/dist/mermaid.min.js',
      mermaidHandler
    );
  }
}

window.addEventListener('load', embedMermaid, false);
})();
