# Template variables

Loppo provides some template variables used in templates.

They could be divided into two categories: site variables and page variables.

## Site variables

The site variables are the same within the whole site.

- site
- dir
- chapters
- chaptersOrigin
- chapterList
- loppo_version

### option.site

`option.site` is the site name.

### option.dir

`option.dir` is the document directory of the repo.

### option.chapters

`option.chapters` is an array which includes all `.md` files and directories in the `docs` directory.

```javascript
[
  {'a.md': 'Title A'},
  {'dir1/': 'dir1'},
  {'dir1/b.md': 'Title B'}
]
```

If the `doc` directory has nothing, `option.chapters` will be an empty array.

### option.chaptersOrigin

`option.chaptersOrigin` is just yet another form of `option.chapters` with different data structure.

```javascript
[
  { origin: 'a.md', path: 'a.html', text: 'Title A', nextLevelBegins: false, currentLevelEnds: false },
  { origin: 'dir1/', path: 'dir1/index.html', text: 'dir1', nextLevelBegins: true, currentLevelEnds: false },
  { origin: 'dir1/b.md', path: 'dir1/b.html', text: 'Title B', nextLevelBegins: false, currentLevelEnds: true, currentLevelEndNum: 2}
]
```

Fields

- origin: origin path of Markdown file
- path: path of HTML file
- text: title of Markdown file
- nextLevelBegins: a Boolean value indicating a diretory begins
- currentLevelEnds: a Boolean value indicating a directory ends
- currentLevelEndNum: a Number value indicating how many directory levels ends here, only exists when `currentLevelEnds` is `true`

### option.chapterList

`option.chapterList` is a HTML string converted from `option.chapters`.

### option.loppo_version

`option.loppo_version` is the version number of Loppo.

## Page variables

Page variables are different for every document page.

- current_path
- isHomepage
- page_title
- content
- previous_page_object
- previousPageOrigin
- previous_page
- next_page_object
- nextPageOrigin
- next_page
- relative_root_path
- build_time
- breadcrumbOrigin
- breadcrumb
- toc

### option.current_path

`option.current_path` is the relative path of current page, such like `dir1/example.md`.

For the index page of document directory, `option.current_path` is `/`.

### option.content

`option.content` is the HTML markup of current page converted from markdown. It has three posibilities.

- For regular `.md` file, `option.content` is its markdown content.
- For the root directory (`docs` directory), `option.content` is the content of `README.md` under the project root directory (not `docs` directory)。If no `README.md`，`option.content` is an empty string.
- For sub-directories, `option.content` is all `.md` files and sub-directories directly under it.

### option.isHomepage

`option.isHomepage` is a boolean value to indicate whether on not the current page is the homepage of the site.

### option.page_title

`option.page_title` is the page name of a document page.

- For sub-directories, it is `option.site`.
- For root directory, it is the `<h1>` title of `README.md`. If not, it is `option.site`.
- For regular `.md` file, it is the `<h1>` title of the file. If not, it is the title in `chapters.yml`.

### option.previous_page_object

`option.previous_page_object` is an object which represents the previous page of current page.

- For the first page, it is `null`.
- For other pages, it is the previous item before the current page in `chapters.yml`.

For example, current page is `b.md` as following. Then `option.previous_page` is `{ 'b.md': 'Title B' }`.

```javascript
- a.md: Title A
- b.md: Title B
```

Attention, if current page is the first item of `chapters.yml` and is not `index.md`，`option.previous_page` will be `{ 'index.md': 'Home' }`.

### option.previousPageOrigin

`option.previousPageOrigin` is yet another form of `option.previous_page_object` with different data structure.

```javascript
{ origin: 'b.md', path: 'b.html', text: 'Title B' }
```

### option.previous_page

`option.previous_page` is a HTML string converted from `option.previous_page_object`.

### option.next_page_object

`option.next_page_object` is object which represents the next page of current page.

- For the last page, it is `null`.
- For other page, it is the next item after the current page in `chapters.yml`.

For example, current page is `a.md` as following. Then `option.next_page_object` is `{ 'a.md': 'Title A' }`.

```javascript
- a.md: Title A
- b.md: Title B
```

### option.nextPageOrigin

`option.nextPageOrigin` is yet another form of `option.next_page_object` with different data structure.

```javascript
{ origin: 'b.md', path: 'b.html', text: 'Title B' }
```

### option.next_page

`option.next_page` is a HTML string converted from `option.next_page_object`.

### option.relative_root_path

`option.relative_root_path` is the relative path to the root path for the current page.

For example, if the root path is `/` and the current page is `dir1/a.md`, `option.relative_root_path` is `../`.

### option.build_time

`option.build_time` is the time of building the current page, which is a JavaScript Date instance.

### option.breadcrumbOrigin

`option.breadcrumbOrigin` is an array containing the location information of current page.

For example, if current page is `dir1/dir2/a.md`, `option.breadcrumb` is the following.

```javascript
[
  { path: 'index.html', text: 'Home' },
  { path: 'dir1/index.html', text: 'dir1' },
  { path: 'dir1/dir2/index.html', text: 'dir2' },
  { path: 'dir1/dir2/a.html', text: 'Title A' }
]
```

### option.breadcrumb

`option.breadcrumb` is a HTML string which containing the location information of current page.

```html
<div class="breadcrumb-area">
  <a href="index.html" class="breadcrumb-item" target="_blank">Home</a>
  <span class="breadcrumb-delimitor"> &gt; </span>
  <a href="dir1/" class="breadcrumb-item" target="_blank">dir1</a>
  <!-- ... -->
</div>
```

### option.toc

`option.toc` is the table of content of current page.

