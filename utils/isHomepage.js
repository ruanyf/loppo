function isHomepage(root) {
  if (root === '/' || root === 'index.md') return true;
  return false;
}

module.exports = isHomepage;
