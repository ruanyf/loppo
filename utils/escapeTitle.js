const { escape } = require('lodash');

function escapeTitle(chapters) {
  if (!chapters) return undefined;
  chapters.map(c => {
    for (let key in c) {
      c[key] = escape(c[key]);
    }
    return c;
  });
  return chapters;
}

module.exports = escapeTitle;
