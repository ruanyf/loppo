'use strict';

const test = require('tape');
const makeChapterList = require('../../utils/makeChapterList');

const log = require('../../lib/utils').log;
log.setLevel('error');

const test_title = '[utils/makeChapterList.js] ';

test(
  test_title +
  'empty ChapterArray',
  function (t) {
    const chapters = [];
    const result = makeChapterList('/', { chapters, relative_root_path: '' });
    t.equal(result.chapterList, '<ul class="chapter-area"></ul>');
    t.end();
  }
);

test(
  test_title +
  'top level article',
  function (t) {
    const chapters = [{'a.md': 'a.md'}];
    const result = makeChapterList('/', { chapters, relative_root_path: '' });
    t.equal(result.chapterList, '<ul class="chapter-area"><li class="chapter-item "><a href="a.html">a.md</a></li></ul>');
    t.end();
  }
);

test(
  test_title +
  'second level article',
  function (t) {
    const chapters = [{'a.md': 'a.md'}, {'test/': 'test'}, {'test/b.md': 'b.md'}];
    const result = makeChapterList('/', { chapters, relative_root_path: '' });
    t.equal(result.chapterList, '<ul class="chapter-area"><li class="chapter-item "><a href="a.html">a.md</a></li><li class="chapter-item "><a href="test/index.html">test</a>&nbsp;<a class="first-level-collapse"><span class="icon icon-expand" data-icon="expand"></span></a></li><ul class="chapter-level-1"><li class="chapter-item "><a href="test/b.html">b.md</a></li></ul></ul>');
    t.end();
  }
);

test(
  test_title +
  'third level article',
  function (t) {
    const chapters = [
      {'a.md': 'a.md'},
      {'test/': 'test'},
      {'test/b.md': 'b.md'},
      {'test/c/': 'c'},
      {'test/c/d.md': 'd.md'}
    ];
    const result = makeChapterList('/', { chapters, relative_root_path: '' });
    t.equal(
      result.chapterList,
      '<ul class="chapter-area"><li class="chapter-item "><a href="a.html">a.md</a></li><li class="chapter-item "><a href="test/index.html">test</a>&nbsp;<a class="first-level-collapse"><span class="icon icon-expand" data-icon="expand"></span></a></li><ul class="chapter-level-1"><li class="chapter-item "><a href="test/b.html">b.md</a></li><li class="chapter-item "><a href="test/c/index.html">c</a></li><ul class="chapter-level-2"><li class="chapter-item "><a href="test/c/d.html">d.md</a></li></ul></ul></ul>'
    );
    t.end();
  }
);

test(
  test_title +
  'complex level case one',
  function (t) {
    const chapters = [
      {'test/': 'xxx'},
      {'test/a.md': 'xxx'},
      {'develop/': 'xxx'},
      {'develop/front/': 'xxx'},
      {'develop/front/1.md': 'xxx'}
    ];
    const result = makeChapterList('/', { chapters, relative_root_path: '' });
    t.equal(
      result.chapterList,
      '<ul class="chapter-area"><li class="chapter-item "><a href="test/index.html">xxx</a>&nbsp;<a class="first-level-collapse"><span class="icon icon-expand" data-icon="expand"></span></a></li><ul class="chapter-level-1"><li class="chapter-item "><a href="test/a.html">xxx</a></li></ul><li class="chapter-item "><a href="develop/index.html">xxx</a>&nbsp;<a class="first-level-collapse"><span class="icon icon-expand" data-icon="expand"></span></a></li><ul class="chapter-level-1"><li class="chapter-item "><a href="develop/front/index.html">xxx</a></li><ul class="chapter-level-2"><li class="chapter-item "><a href="develop/front/1.html">xxx</a></li></ul></ul></ul>'
    );
    t.end();
  }
);

test(
  test_title +
  'complex level case two',
  function (t) {
    const chapters = [
      {'test/': 'xxx'},
      {'test/a.md': 'xxx'},
      {'develop/': 'xxx'},
      {'develop/front/': 'xxx'},
      {'develop/front/1.md': 'xxx'},
      {'develop/front/2.md': 'xxx'},
      {'develop/back/': 'xxx'},
      {'devlelop/back/3/': 'xxx'},
      {'devlelop/back/3/3.md': 'xxx'},
    ];
    const result = makeChapterList('/', { chapters, relative_root_path: '' });
    t.equal(
      result.chapterList,
      '<ul class="chapter-area"><li class="chapter-item "><a href="test/index.html">xxx</a>&nbsp;<a class="first-level-collapse"><span class="icon icon-expand" data-icon="expand"></span></a></li><ul class="chapter-level-1"><li class="chapter-item "><a href="test/a.html">xxx</a></li></ul><li class="chapter-item "><a href="develop/index.html">xxx</a>&nbsp;<a class="first-level-collapse"><span class="icon icon-expand" data-icon="expand"></span></a></li><ul class="chapter-level-1"><li class="chapter-item "><a href="develop/front/index.html">xxx</a></li><ul class="chapter-level-2"><li class="chapter-item "><a href="develop/front/1.html">xxx</a></li><li class="chapter-item "><a href="develop/front/2.html">xxx</a></li></ul><li class="chapter-item "><a href="develop/back/index.html">xxx</a></li><ul class="chapter-level-2"><li class="chapter-item "><a href="devlelop/back/3/index.html">xxx</a></li><ul class="chapter-level-3"><li class="chapter-item "><a href="devlelop/back/3/3.html">xxx</a></li></ul></ul></ul></ul>'
    );
    t.end();
  }
);

test(
  test_title +
  'complex level case three',
  function (t) {
    const chapters = [
      {'test/': 'xxx'},
      {'test/a.md': 'xxx'},
      {'develop/': 'xxx'},
      {'develop/front/': 'xxx'},
      {'develop/front/1.md': 'xxx'},
      {'develop/front/2.md': 'xxx'},
      {'develop/back/': 'xxx'},
      {'devlelop/back/3/': 'xxx'},
      {'devlelop/back/3/3.md': 'xxx'},
      {'devlelop/back/4/': 'xxx'},
      {'devlelop/back/4/4.md': 'xxx'},
    ];
    const result = makeChapterList('/', { chapters, relative_root_path: '' });
    t.equal(
      result.chapterList,
      '<ul class="chapter-area"><li class="chapter-item "><a href="test/index.html">xxx</a>&nbsp;<a class="first-level-collapse"><span class="icon icon-expand" data-icon="expand"></span></a></li><ul class="chapter-level-1"><li class="chapter-item "><a href="test/a.html">xxx</a></li></ul><li class="chapter-item "><a href="develop/index.html">xxx</a>&nbsp;<a class="first-level-collapse"><span class="icon icon-expand" data-icon="expand"></span></a></li><ul class="chapter-level-1"><li class="chapter-item "><a href="develop/front/index.html">xxx</a></li><ul class="chapter-level-2"><li class="chapter-item "><a href="develop/front/1.html">xxx</a></li><li class="chapter-item "><a href="develop/front/2.html">xxx</a></li></ul><li class="chapter-item "><a href="develop/back/index.html">xxx</a></li><ul class="chapter-level-2"><li class="chapter-item "><a href="devlelop/back/3/index.html">xxx</a></li><ul class="chapter-level-3"><li class="chapter-item "><a href="devlelop/back/3/3.html">xxx</a></li></ul><li class="chapter-item "><a href="devlelop/back/4/index.html">xxx</a></li><ul class="chapter-level-3"><li class="chapter-item "><a href="devlelop/back/4/4.html">xxx</a></li></ul></ul></ul></ul>'
    );
    t.end();
  }
);

test(
  test_title +
  'complex level case three',
  function (t) {
    const chapters = [
      {'test/': 'xxx'},
      {'test/a.md': 'xxx'},
      {'develop/': 'xxx'},
      {'develop/front/': 'xxx'},
      {'develop/front/1.md': 'xxx'},
      {'develop/front/2.md': 'xxx'},
      {'develop/back/': 'xxx'},
      {'devlelop/back/3/': 'xxx'},
      {'devlelop/back/3/3.md': 'xxx'},
      {'devlelop/back/4/': 'xxx'},
      {'devlelop/back/4/4.md': 'xxx'},
      {'other/': 'xxx'},
      {'other/5.md': 'xxx'},
    ];
    const result = makeChapterList('/', { chapters, relative_root_path: '' });
    t.equal(
      result.chapterList,
      '<ul class="chapter-area"><li class="chapter-item "><a href="test/index.html">xxx</a>&nbsp;<a class="first-level-collapse"><span class="icon icon-expand" data-icon="expand"></span></a></li><ul class="chapter-level-1"><li class="chapter-item "><a href="test/a.html">xxx</a></li></ul><li class="chapter-item "><a href="develop/index.html">xxx</a>&nbsp;<a class="first-level-collapse"><span class="icon icon-expand" data-icon="expand"></span></a></li><ul class="chapter-level-1"><li class="chapter-item "><a href="develop/front/index.html">xxx</a></li><ul class="chapter-level-2"><li class="chapter-item "><a href="develop/front/1.html">xxx</a></li><li class="chapter-item "><a href="develop/front/2.html">xxx</a></li></ul><li class="chapter-item "><a href="develop/back/index.html">xxx</a></li><ul class="chapter-level-2"><li class="chapter-item "><a href="devlelop/back/3/index.html">xxx</a></li><ul class="chapter-level-3"><li class="chapter-item "><a href="devlelop/back/3/3.html">xxx</a></li></ul><li class="chapter-item "><a href="devlelop/back/4/index.html">xxx</a></li><ul class="chapter-level-3"><li class="chapter-item "><a href="devlelop/back/4/4.html">xxx</a></li></ul></ul></ul><li class="chapter-item "><a href="other/index.html">xxx</a>&nbsp;<a class="first-level-collapse"><span class="icon icon-expand" data-icon="expand"></span></a></li><ul class="chapter-level-1"><li class="chapter-item "><a href="other/5.html">xxx</a></li></ul></ul>'
    );
    t.end();
  }
);
