function makeBreadcrumb(root, optionObj) {
  const bcHTMLArr = [];
  optionObj.breadcrumbOrigin.forEach(function (c) {
    let bcPath = c.path;
    /*
    if (bcPath.substr(-3) === '.md') {
      bcPath = bcPath.substr(0, bcPath.length - 3) + '.html';
    } else if (bcPath.substr(-1) === '/') {
      bcPath += 'index.html';
    }
    */
    const str = '<a href="'
      + optionObj.relative_root_path
      + bcPath
      + '" class="breadcrumb-item">'
      + c.text
      + '</a>';
    bcHTMLArr.push(str);
  });
  let bcHTML = '<div class="breadcrumb-area">';
  bcHTML += bcHTMLArr.join('<span class="breadcrumb-delimiter"> &gt; </span>');
  bcHTML += '</div>';
  optionObj.breadcrumb = bcHTML;
  return optionObj;
}

module.exports = makeBreadcrumb;
