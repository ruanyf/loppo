# Option Object

## Global Attributes

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
  {'dir2/b.md': 'Title B'}
]
```

If the `doc` directory has nothing, `option.chapters` will be `undefined`.

## Page Attributes

## option.content

`option.content` is the HTML markup of current page converted from markdown. It has three posibilities.

- For regular `.md` file, `option.content` is its markdown content.
- For the root directory (`docs` directory), `option.content` is the content of `README.md` under the project root directory (not `docs` directory)。If no `README.md`，`option.content` is an empty string.
- For sub-directories, `option.content` is all `.md` files and sub-directories directly under it.

### option.page_title

`option.page_title` is the page name of a document page.

- For sub-directories, it is `option.site`.
- For root directory, it is the `<h1>` title of `README.md`. If not, it is `option.site`.
- For regular `.md` file, it is the `<h1>` title of the file. If not, it is the title in `chapters.yml`.

### option.previous_page

`option.previous_page` is an object which represents the previous page of current page.

- For the first page, it is `null`.
- For other pages, it is the previous item before the current page in `chapters.yml`.

For example, current page is `b.md` as following. Then `option.previous_page` is `{ 'b.md': 'Title B' }`.

```javascript
- a.md: Title A
- b.md: Title B
```

Attention, if current page is the first item of `chapters.yml` and is not `index.md`，`option.previous_page` will be `{ 'index.md': 'Home' }`.

### option.next_page

`option.next_page` is object which represents the next page of current page.

- For the last page, it is `null`.
- For other page, it is the next item after the current page in `chapters.yml`.

For example, current page is `a.md` as following. Then `option.next_page` is `{ 'a.md': 'Title A' }`.

```javascript
- a.md: Title A
- b.md: Title B
```

### option.relative_root_path

`option.relative_root_path` is the relative path to the root path for the current page.

For example, if the root path is `/` and the current page is `dir1/a.md`, `option.relative_root_path` is `../`.

### option.build_time

`option.build_time` is the time of building the current page, which is a JavaScript Date instance.

### option.breadcrumb

`option.breadcrumb` is an array containing the location information of current page.

For example, if current page is `dir1/dir2/a.md`, `option.breadcrumb` is the following.

```javascript
[
  { 'index.md': 'Home' },
  { 'dir1/': 'dir1' },
  { 'dir1/dir2/': 'dir2' },
  { 'dir1/dir2/a.md': 'Title A' }
]
```

### option.toc

`option.toc` is the table of content of current page.
