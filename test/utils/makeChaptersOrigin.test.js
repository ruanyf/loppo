'use strict';

const test = require('tape');
const makeChaptersOrigin = require('../../utils/makeChaptersOrigin');

const log = require('../../lib/utils').log;
log.setLevel('error');

const test_title = '[utils/makeChaptersOrigin.js] ';

test(
  test_title +
  'nextLevelBegins / currentLevelEnds / currentLevelEndNumber No.1',
  function (t) {
    const chapters = [
      { 'a.md': 'xxx' },
      { 'dir1/': 'xxx' },
      { 'dir1/dir2/': 'xxx' },
      { 'dir1/dir2/b.md': 'xxx' },
      { 'dir3/': 'xxx' },
      { 'dir3/c.md': 'xxx' },
      { 'd.md': 'xxx' }
    ];
    const result = makeChaptersOrigin(chapters);
    t.equal(result[0].nextLevelBegins, false);
    t.equal(result[0].currentLevelEnds, false);
    t.equal(result[1].nextLevelBegins, true);
    t.equal(result[1].currentLevelEnds, false);
    t.equal(result[2].nextLevelBegins, true);
    t.equal(result[2].currentLevelEnds, false);
    t.equal(result[3].nextLevelBegins, false);
    t.equal(result[3].currentLevelEnds, true);
    t.equal(result[3].currentLevelEndNum, 2);
    t.equal(result[4].nextLevelBegins, true);
    t.equal(result[4].currentLevelEnds, false);
    t.equal(result[5].nextLevelBegins, false);
    t.equal(result[5].currentLevelEnds, true);
    t.equal(result[5].currentLevelEndNum, 1);
    t.equal(result[6].nextLevelBegins, false);
    t.equal(result[6].currentLevelEnds, false);
    t.end();
  }
);

test(
  test_title +
  'nextLevelBegins / currentLevelEnds / currentLevelEndNumber No.2',
  function (t) {
    const chapters = [
      { 'dir1/': 'xxx' },
      { 'dir1/dir2/': 'xxx' },
      { 'dir1/dir2/b.md': 'xxx' },
      { 'dir1/dir2/c.md': 'xxx' }
    ];
    const result = makeChaptersOrigin(chapters);
    t.equal(result[0].nextLevelBegins, true);
    t.equal(result[0].currentLevelEnds, false);
    t.equal(result[1].nextLevelBegins, true);
    t.equal(result[1].currentLevelEnds, false);
    t.equal(result[2].nextLevelBegins, false);
    t.equal(result[2].currentLevelEnds, false);
    t.equal(result[3].nextLevelBegins, false);
    t.equal(result[3].currentLevelEnds, true);
    t.equal(result[3].currentLevelEndNum, 2);
    t.end();
  }
);

test(
  test_title +
  'nextLevelBegins / currentLevelEnds / currentLevelEndNumber No.3',
  function (t) {
    const chapters = [
      { 'a.md': 'xxx' },
      { 'b.md': 'xxx' },
      { 'c.md': 'xxx' }
    ];
    const result = makeChaptersOrigin(chapters);
    t.equal(result[0].nextLevelBegins, false);
    t.equal(result[0].currentLevelEnds, false);
    t.equal(result[1].nextLevelBegins, false);
    t.equal(result[1].currentLevelEnds, false);
    t.equal(result[2].nextLevelBegins, false);
    t.equal(result[2].currentLevelEnds, false);
    t.end();
  }
);

test(
  test_title +
  'nextLevelBegins / currentLevelEnds / currentLevelEndNumber No.4',
  function (t) {
    const chapters = [
      { 'dir1/': 'xxx' },
      { 'dir1/a.md': 'xxx' },
      { 'dir1/dir2/': 'xxx' },
      { 'dir1/dir2/dir3/': 'xxx' },
      { 'dir1/dir2/dir3/b.md': 'xxx' }
    ];
    const result = makeChaptersOrigin(chapters);
    t.equal(result[0].nextLevelBegins, true);
    t.equal(result[0].currentLevelEnds, false);
    t.equal(result[1].nextLevelBegins, false);
    t.equal(result[1].currentLevelEnds, false);
    t.equal(result[2].nextLevelBegins, true);
    t.equal(result[2].currentLevelEnds, false);
    t.equal(result[3].nextLevelBegins, true);
    t.equal(result[3].currentLevelEnds, false);
    t.equal(result[4].nextLevelBegins, false);
    t.equal(result[4].currentLevelEnds, true);
    t.equal(result[4].currentLevelEndNum, 3);
    t.end();
  }
);

test(
  test_title +
  'nextLevelBegins / currentLevelEnds / currentLevelEndNumber No.5',
  function (t) {
    const chapters = [
      { 'dir1/': 'xxx' },
      { 'dir1/a.md': 'xxx' },
      { 'dir1/dir2/': 'xxx' },
      { 'dir1/dir2/dir3/': 'xxx' },
      { 'dir1/dir2/dir3/b.md': 'xxx' },
      { 'dir4/': 'xxx' },
      { 'dir4/c.md': 'xxx' }
    ];
    const result = makeChaptersOrigin(chapters);
    t.equal(result[5].nextLevelBegins, true);
    t.equal(result[5].currentLevelEnds, false);
    t.equal(result[6].nextLevelBegins, false);
    t.equal(result[6].currentLevelEnds, true);
    t.equal(result[6].currentLevelEndNum, 1);
    t.end();
  }
);

test(
  test_title +
  'nextLevelBegins / currentLevelEnds / currentLevelEndNumber No.5',
  function (t) {
    const chapters = [
      { 'dir1/': 'xxx' },
      { 'dir1/a.md': 'xxx' },
      { 'dir1/b.md': 'xxx' },
      { 'dir2/': 'xxx' },
      { 'dir2/c.md': 'xxx' },
      { 'dir3/': 'xxx' },
      { 'dir3/d.md': 'xxx' }
    ];
    const result = makeChaptersOrigin(chapters);
    t.equal(result[0].nextLevelBegins, true);
    t.equal(result[0].currentLevelEnds, false);
    t.equal(result[1].nextLevelBegins, false);
    t.equal(result[1].currentLevelEnds, false);
    t.equal(result[2].nextLevelBegins, false);
    t.equal(result[2].currentLevelEnds, true);
    t.equal(result[2].currentLevelEndNum, 1);
    t.equal(result[3].nextLevelBegins, true);
    t.equal(result[3].currentLevelEnds, false);
    t.equal(result[4].nextLevelBegins, false);
    t.equal(result[4].currentLevelEnds, true);
    t.equal(result[4].currentLevelEndNum, 1);
    t.equal(result[5].nextLevelBegins, true);
    t.equal(result[5].currentLevelEnds, false);
    t.equal(result[6].nextLevelBegins, false);
    t.equal(result[6].currentLevelEnds, true);
    t.equal(result[6].currentLevelEndNum, 1);
    t.end();
  }
);

test(
  test_title +
  'nextLevelBegins / currentLevelEnds / currentLevelEndNumber No.6',
  function (t) {
    const chapters = [
      { 'dir1/': 'xxx' },
      { 'dir1/dir2/': 'xxx' },
      { 'dir1/dir2/b.md': 'xxx' },
      { 'dir1/dir2/c.md': 'xxx' },
      { 'dir1/d.md': 'xxx' }
    ];
    const result = makeChaptersOrigin(chapters);
    t.equal(result[3].nextLevelBegins, false);
    t.equal(result[3].currentLevelEnds, true);
    t.equal(result[3].currentLevelEndNum, 1);
    t.equal(result[4].nextLevelBegins, false);
    t.equal(result[4].currentLevelEnds, true);
    t.equal(result[4].currentLevelEndNum, 1);
    t.end();
  }
);

test(
  test_title +
  'nextLevelBegins / currentLevelEnds / currentLevelEndNumber No.7',
  function (t) {
    const chapters = [
      { 'dir1/': 'xxx' },
      { 'dir1/dir2/': 'xxx' },
      { 'dir1/dir2/b.md': 'xxx' },
      { 'dir1/dir2/c.md': 'xxx' },
      { 'dir1/d.md': 'xxx' },
      { 'e.md': 'xxx' },
    ];
    const result = makeChaptersOrigin(chapters);
    t.equal(result[3].nextLevelBegins, false);
    t.equal(result[3].currentLevelEnds, true);
    t.equal(result[3].currentLevelEndNum, 1);
    t.equal(result[4].nextLevelBegins, false);
    t.equal(result[4].currentLevelEnds, true);
    t.equal(result[4].currentLevelEndNum, 1);
    t.equal(result[5].nextLevelBegins, false);
    t.equal(result[5].currentLevelEnds, false);
    t.end();
  }
);
