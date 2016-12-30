'use strict';

const path = require('path');
const fs = require('fs-extra');
const yaml = require('js-yaml');
const markdownIt = require('markdown-it');
const hljs = require('highlight.js');
const htmlToText = require('html-to-text');
const wordCount = require('wordcount');

function print(filesArr) {
  let totalLine = 0;
  let totalWord = 0;
  let totalChar = 0;
  filesArr.forEach(f => {
    totalLine += f.line;
    totalWord += f.word;
    totalChar += f.char;

    console.log('[File] ' + f.file);
    console.log('[Lines] ' + f.line);
    console.log('[Words] ' + f.word);
    console.log('[Chars] ' + f.char);
    console.log();
  });

  console.log('[Total]');
  console.log('[Files] ' + filesArr.length);
  console.log('[Lines] ' + totalLine);
  console.log('[Words] ' + totalWord);
  console.log('[Chars] ' + totalChar);
}

module.exports = {
  command: 'count',
  desc: 'word counts for each markdown file',
  handler: (/* argv */) => {
    const chaptersPath = path.resolve(process.cwd(), 'chapters.yml');
    const chaptersContent = fs.readFileSync(chaptersPath, 'utf8');
    const chaptersArr = yaml.safeLoad(chaptersContent);

    const cfgPath = path.resolve(process.cwd(), 'loppo.yml');
    const cfgContent = fs.readFileSync(cfgPath, 'utf8');
    const cfgObj = yaml.safeLoad(cfgContent);
    const docDir = cfgObj.dir;

    const filesArr = [];
    chaptersArr
    .filter(c => Object.keys(c)[0].substr(-3) === '.md')
    .forEach(c => {
      const fileName = Object.keys(c)[0];
      const filePath = path.resolve(process.cwd(), docDir, fileName);
      let fileContent = fs.readFileSync(filePath, 'utf8').trim();
      const fileContentArr = fileContent.split('\n');
      if (/^\s*#\s*([^#].*?)\s*$/.test(fileContentArr[0])) fileContentArr.shift();
      fileContent = fileContentArr.join('\n');

      function highlight(str, lang) {
        if (lang && hljs.getLanguage(lang)) {
          try {
            return '<pre class="hljs"><code>' +
              hljs.highlight(lang, str, true).value +
              '</code></pre>';
          } catch (e) {
            throw e;
          }
        }
        // eslint-disable-next-line
        return '<pre class="hljs"><code>' + md.utils.escapeHtml(str) + '</code></pre>';
      }

      const md = markdownIt({
        html: true,  // Enable HTML tags in source
        linkify: true,  // Autoconvert URL-like text to links
        highlight
      });

      const HTMLContent = md.render(fileContent);
      const TEXTContent = htmlToText.fromString(HTMLContent, {
        wordwrap: false,
        ignoreImage: true,
        ignoreHref: true
      });
      const result = {};
      result.file = fileName;
      result.line = TEXTContent.split('\n').length;
      result.word = wordCount(TEXTContent);
      result.char = TEXTContent.length;
      filesArr.push(result);
    });

    print(filesArr);

  }
};

