'use strict';

const path = require('path');
const fs = require('fs');
const test = require('tape');
const yaml = require('js-yaml');
const chapters = require('../lib/chapters');

const log = require('../lib/utils').log;
log.setLevel('error');

const test_title = '[chapters.js] ';
const CHAPTERS_FILE = 'chapters.yml';

test(
  test_title +
  'if chapters.yml already exists, add the content to option.chapters',
  function (t) {
    const TEST_PATH = path.resolve(__dirname, './fixture/chapters/chapters-file-already-exists');
    process.chdir(TEST_PATH);
    const result = chapters({});
    t.equal(result.chapters[0]['a.md'], 'a');
    t.equal(result.chapters[1]['b.md'], 'b');
    t.end();
  }
);

test.skip(
  test_title +
  'if no docs directory exists, it will print throw an error',
  function (t) {
    const TEST_PATH = path.resolve(__dirname, './fixture/chapters/no-docs-directory-exists');
    process.chdir(TEST_PATH);
    t.throws(function () {
      chapters({ dir: 'docs' });
    });
    t.end();
  }
);

test(
  test_title +
  'simple generating chapters.yml',
  function (t) {
    const TEST_PATH = path.resolve(__dirname, './fixture/chapters/simple-generating-chapters-file');
    process.chdir(TEST_PATH);
    const result = chapters({ dir: 'docs' });
    t.equal(result.chapters[0]['a.md'], 'Title A');
    t.equal(result.chapters[1]['b.md'], 'Title B');
    t.ok(fs.existsSync(path.join(TEST_PATH, CHAPTERS_FILE)));
    const content = yaml.load(fs.readFileSync(path.join(TEST_PATH, CHAPTERS_FILE), 'utf8'));
    t.equal(content[0]['a.md'], 'Title A');
    t.equal(content[1]['b.md'], 'Title B');
    t.end();
    fs.unlinkSync(path.join(TEST_PATH, CHAPTERS_FILE));
  }
);

test(
  test_title +
  'exclude empty directory',
  function (t) {
    const TEST_PATH = path.resolve(__dirname, './fixture/chapters/exclude-empty-directory');
    process.chdir(TEST_PATH);
    const result = chapters({ dir: 'docs' });
    t.equal(result.chapters[0]['a.md'], 'A');
    t.equal(result.chapters.length, 1);
    t.ok(fs.existsSync(path.join(TEST_PATH, CHAPTERS_FILE)));
    const content = yaml.load(fs.readFileSync(path.join(TEST_PATH, CHAPTERS_FILE), 'utf8'));
    t.equal(content[0]['a.md'], 'A');
    t.equal(content.length, 1);
    t.end();
    fs.unlinkSync(path.join(TEST_PATH, CHAPTERS_FILE));
  }
);

test(
  test_title +
  'exclude double empty directory',
  function (t) {
    const TEST_PATH = path.resolve(__dirname, './fixture/chapters/exclude-double-empty-directory');
    process.chdir(TEST_PATH);
    const result = chapters({ dir: 'docs' });
    t.equal(result.chapters[0]['a.md'], 'A');
    t.equal(result.chapters.length, 1);
    t.ok(fs.existsSync(path.join(TEST_PATH, CHAPTERS_FILE)));
    const content = yaml.load(fs.readFileSync(path.join(TEST_PATH, CHAPTERS_FILE), 'utf8'));
    t.equal(content[0]['a.md'], 'A');
    t.equal(content.length, 1);
    t.end();
    fs.unlinkSync(path.join(TEST_PATH, CHAPTERS_FILE));
  }
);

test(
  test_title +
  'exclude complex empty directory',
  function (t) {
    const TEST_PATH = path.resolve(__dirname, './fixture/chapters/exclude-complex-empty-directory');
    process.chdir(TEST_PATH);
    const result = chapters({ dir: 'docs' });
    t.equal(result.chapters[0]['a.md'], 'A');
    t.equal(result.chapters[1]['images/'], 'images');
    t.equal(result.chapters[2]['images/dir3/'], 'dir3');
    t.equal(result.chapters[3]['images/dir3/b.md'], 'B');
    t.equal(result.chapters.length, 4);
    t.ok(fs.existsSync(path.join(TEST_PATH, CHAPTERS_FILE)));
    const content = yaml.load(fs.readFileSync(path.join(TEST_PATH, CHAPTERS_FILE), 'utf8'));
    t.equal(content[0]['a.md'], 'A');
    t.equal(content[1]['images/'], 'images');
    t.equal(content[2]['images/dir3/'], 'dir3');
    t.equal(content[3]['images/dir3/b.md'], 'B');
    t.equal(content.length, 4);
    t.end();
    fs.unlinkSync(path.join(TEST_PATH, CHAPTERS_FILE));
  }
);

test(
  test_title +
  'generating chapters.yml filter',
  function (t) {
    const TEST_PATH = path.resolve(__dirname, './fixture/chapters/generating-chapters-file-filter');
    process.chdir(TEST_PATH);
    chapters({ dir: 'docs' });
    t.ok(fs.existsSync(path.join(TEST_PATH, CHAPTERS_FILE)));
    const content = yaml.load(fs.readFileSync(path.join(TEST_PATH, CHAPTERS_FILE), 'utf8'));
    t.equal(typeof content, 'object');
    t.equal(content.length, 0);
    t.end();
    fs.unlinkSync(path.join(TEST_PATH, CHAPTERS_FILE));
  }
);

test(
  test_title +
  'empty chapters.yml',
  function (t) {
    const TEST_PATH = path.resolve(
      __dirname,
      './fixture/chapters/empty-chapters-file'
    );
    process.chdir(TEST_PATH);
    const result = chapters({ dir: 'docs' });
    t.equal(result.chapters, undefined);
    t.end();
  }
);

test(
  test_title +
  'generating chapters.yml complex format',
  function (t) {
    const TEST_PATH = path.resolve(
      __dirname,
      './fixture/chapters/generating-chapters-file-complex-format'
    );
    process.chdir(TEST_PATH);
    const result = chapters({ dir: 'docs' });
    t.equal(result.chapters[0]['a.md'], 'Title A');
    t.equal(result.chapters[1]['b.md'], 'Title B');
    t.ok(fs.existsSync(path.join(TEST_PATH, CHAPTERS_FILE)));
    const content = yaml.load(fs.readFileSync(path.join(TEST_PATH, CHAPTERS_FILE), 'utf8'));
    t.equal(content[0]['a.md'], 'Title A');
    t.equal(content[1]['b.md'], 'Title B');
    t.end();
    fs.unlinkSync(path.join(TEST_PATH, CHAPTERS_FILE));
  }
);

test(
  test_title +
  'complex docs directory structure',
  function (t) {
    const TEST_PATH = path.resolve(
      __dirname,
      './fixture/chapters/complex-docs-directory-structure'
    );
    process.chdir(TEST_PATH);
    const result = chapters({ dir: 'docs' });
    t.equal(result.chapters[0]['a.md'], 'Title A');
    t.equal(result.chapters[1]['b/'], 'b');
    t.equal(result.chapters[2]['b/c/'], 'c');
    t.equal(result.chapters[3]['b/c/d.md'], 'Title D');
    t.ok(fs.existsSync(path.join(TEST_PATH, CHAPTERS_FILE)));
    const content = yaml.load(fs.readFileSync(path.join(TEST_PATH, CHAPTERS_FILE), 'utf8'));
    t.equal(content[0]['a.md'], 'Title A');
    t.equal(content[1]['b/'], 'b');
    t.equal(content[2]['b/c/'], 'c');
    t.equal(content[3]['b/c/d.md'], 'Title D');
    fs.unlinkSync(path.join(TEST_PATH, CHAPTERS_FILE));
    t.end();
  }
);
