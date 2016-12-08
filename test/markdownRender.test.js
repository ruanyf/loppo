'use strict';

// const path = require('path');
const test = require('tape');
// const fs = require('fs-extra');
const markdownRender = require('../lib/utils').markdownRender;

const log = require('../lib/utils').log;
log.setLevel('error');

const test_title = '[utils.js/markdownRender] ';

test(
  test_title +
  'regular file',
  function (t) {
    const opt = {
      dir: 'docs',
      site: 'My Site',
      chapters: [
        { 'dir1/': 'dir1' },
        { 'dir1/a.md': 'Title A' },
        { 'dir2/': 'dir2' },
        { 'dir2/b.md': 'Title B' }
      ],
      content: '# My Title\n\nThis is an example.\n'
    };
    const optionObj = markdownRender('dir1/a.md', opt);
    t.equal(optionObj.toc, '');
    t.equal(optionObj.content, '<h1 id="my-title">My Title <a class="markdownIt-Anchor" href="#my-title">#</a></h1>\n<p>This is an example.</p>\n');
    t.end();
  }
);

test(
  test_title +
  'special title',
  function (t) {
    const opt = {
      dir: 'docs',
      site: 'My Site',
      chapters: [
        { 'dir1/': 'dir1' },
        { 'dir1/a.md': 'Title A' },
        { 'dir2/': 'dir2' },
        { 'dir2/b.md': 'Title B' }
      ],
      content: '## HTML 文档的”标题“\n'
    };
    const optionObj = markdownRender('dir1/a.md', opt);
    t.equal(optionObj.toc, '<ul class="markdownIt-TOC">\n<li><a href="#html-%E6%96%87%E6%A1%A3%E7%9A%84%E6%A0%87%E9%A2%98">HTML 文档的”标题“</a></li>\n</ul>\n');
    t.equal(optionObj.content, '<h2 id="html-文档的标题">HTML 文档的”标题“ <a class="markdownIt-Anchor" href="#html-文档的标题">#</a></h2>\n');
    t.end();
  }
);

test(
  test_title +
  'toc',
  function (t) {
    const opt = {
      dir: 'docs',
      site: 'My Site',
      chapters: [
        { 'dir1/': 'dir1' },
        { 'dir1/a.md': 'Title A' },
        { 'dir2/': 'dir2' },
        { 'dir2/b.md': 'Title B' }
      ],
      content: '# My Title\n\n## Title 1\n## Title 2\n### Title 3\n### Title 4\n'
    };
    const optionObj = markdownRender('dir1/a.md', opt);
    t.equal(optionObj.toc, '<ul class="markdownIt-TOC">\n<li><a href="#title-1">Title 1</a></li>\n<li><a href="#title-2">Title 2</a>\n<ul>\n<li><a href="#title-3">Title 3</a></li>\n<li><a href="#title-4">Title 4</a></li>\n</ul>\n</li>\n</ul>\n');
    t.equal(optionObj.content, '<h1 id="my-title">My Title <a class="markdownIt-Anchor" href="#my-title">#</a></h1>\n<h2 id="title-1">Title 1 <a class="markdownIt-Anchor" href="#title-1">#</a></h2>\n<h2 id="title-2">Title 2 <a class="markdownIt-Anchor" href="#title-2">#</a></h2>\n<h3 id="title-3">Title 3 <a class="markdownIt-Anchor" href="#title-3">#</a></h3>\n<h3 id="title-4">Title 4 <a class="markdownIt-Anchor" href="#title-4">#</a></h3>\n');
    t.end();
  }
);

test(
  test_title +
  'Chinese title',
  function (t) {
    const opt = {
      dir: 'docs',
      site: 'My Site',
      chapters: [
        { 'dir1/': 'dir1' },
        { 'dir1/a.md': 'Title A' },
        { 'dir2/': 'dir2' },
        { 'dir2/b.md': 'Title B' }
      ],
      content: '## 你好\n\n### 世界\n'
    };
    const optionObj = markdownRender('dir1/a.md', opt);
    t.equal(optionObj.toc, '<ul class="markdownIt-TOC">\n<li><a href="#%E4%BD%A0%E5%A5%BD">你好</a>\n<ul>\n<li><a href="#%E4%B8%96%E7%95%8C">世界</a></li>\n</ul>\n</li>\n</ul>\n');
    t.equal(optionObj.content, '<h2 id="你好">你好 <a class="markdownIt-Anchor" href="#你好">#</a></h2>\n<h3 id="世界">世界 <a class="markdownIt-Anchor" href="#世界">#</a></h3>\n');
    t.end();
  }
);

test(
  test_title +
  'code highlight',
  function (t) {
    const opt = {
      dir: 'docs',
      site: 'My Site',
      chapters: [
        { 'dir1/': 'dir1' },
        { 'dir1/a.md': 'Title A' },
        { 'dir2/': 'dir2' },
        { 'dir2/b.md': 'Title B' }
      ],
      content: '```javascript\nconsole.log("hello world");\n```\n'
    };
    const optionObj = markdownRender('dir1/a.md', opt);
    t.equal(optionObj.toc, '');
    t.equal(optionObj.content, '<pre class="hljs"><code><span class="hljs-built_in">console</span>.log(<span class="hljs-string">"hello world"</span>);\n</code></pre>\n');
    t.end();
  }
);
