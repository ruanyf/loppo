const path = require('path');

function themePath(themeName) {
  let theme_src = '';
  try {
    const modulePath = path.resolve(process.cwd(), 'node_modules', 'loppo-theme-' + themeName);
    theme_src = require(modulePath);
  } catch (e) {
    theme_src = require(path.resolve(__dirname, '../node_modules', 'loppo-theme-' + themeName));
  }
  return theme_src;
}

module.exports = themePath;
