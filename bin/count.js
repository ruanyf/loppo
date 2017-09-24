'use strict';

const path = require('path');
const fs = require('fs-extra');
const yaml = require('js-yaml');
const md = require('turpan');
const htmlToText = require('html-to-text');
const wordCount = require('wordcount');

function print(filesArr, option) {
  if (option.file) {
    const fileList = [];
    filesArr.forEach(f => fileList.push(f.file));
    const position = fileList.indexOf(option.file);
    if (position === -1) {
      console.log('Error: cannot find ' + option.file);
      return;
    }
    console.log('[File] ' + option.file);
    console.log('[Lines] ' + filesArr[position].line);
    console.log('[Words] ' + filesArr[position].word);
    console.log('[Chars] ' + filesArr[position].char);
    return;
  }

  let totalLine = 0;
  let totalWord = 0;
  let totalChar = 0;
  filesArr.forEach((f) => {
    totalLine += f.line;
    totalWord += f.word;
    totalChar += f.char;

    if (option.detail) {
      console.log('[File] ' + f.file);
      console.log('[Lines] ' + f.line);
      console.log('[Words] ' + f.word);
      console.log('[Chars] ' + f.char);
      console.log();
    }
  });

  if (option.detail) {
    console.log('## Total');
  }

  console.log('[Files] ' + filesArr.length);
  console.log('[Lines] ' + totalLine);
  console.log('[Words] ' + totalWord);
  console.log('[Chars] ' + totalChar);
}

module.exports = {
  command: 'count',
  desc: 'word counts for each markdown file',
  builder: yargs => yargs
    .option('file', {
      alias: 'f',
      describe: 'the file name to count',
      type: 'string'
    })
    .option('detail', {
      alias: 'd',
      describe: 'detail mode',
      default: 'false',
      type: 'boolean'
    }),
  handler: (argv) => {
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
      .forEach((c) => {
        const fileName = Object.keys(c)[0];
        const filePath = path.resolve(process.cwd(), docDir, fileName);
        let fileContent = fs.readFileSync(filePath, 'utf8').trim();
        const fileContentArr = fileContent.split('\n');
        if (/^\s*#\s*([^#].*?)\s*$/.test(fileContentArr[0])) fileContentArr.shift();
        fileContent = fileContentArr.join('\n');

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

    print(filesArr, argv);
  }
};

