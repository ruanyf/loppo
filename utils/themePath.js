const path = require('path');

function themePath(themeName) {
  let theme_src = '';
  try {
    theme_src = require('loppo-theme-' + themeName);
  } catch (e) {
    theme_src = require(path.resolve(__dirname, '../node_modules', 'loppo-theme-' + themeName));
  }
  return theme_src;
}

module.exports = themePath;
