# Option Object

## option.site

`option.site` is the site name.

## option.dir

`option.dir` is the document directory of the repo.

## option.page_title

`option.page_title` is the page name of a document page.

- For sub-directories, it is `option.site`.
- For root directory, it is the `<h1>` title of `README.md`. If not, it is `option.site`.
- For regular `.md` file, it is the `<h1>` title of the file. If not, it is the title in `chapters.yml`.

## option.previous_page

`option.previous_page` is an object which represents the previous page of current page.

- For the first page, it is `null`.
- For other pages, it is the previous item before the current page in `chapters.yml`.

For example, current page is `b.md` as following. Then `option.previous_page` is `{ 'b.md': 'Title B' }`.

```javascript
- a.md: Title A
- b.md: Title B
```

Attention, if current page is the first item of `chapters.yml` and is not `index.md`，`option.previous_page` will be `{ 'index.md': 'Home' }`.

## option.chapters

`option.chapters` is an array which includes all `.md` files and directories in the `docs` directory.

```javascript
[
  {'a.md': 'Title A'},
  {'dir1/': 'dir1'},
  {'dir2/b.md': 'Title B'}
]
```

If the `doc` directory has nothing, `option.chapters` will be `undefined`.

## option.content

`option.content` is the markdown content of current page. It has three posibilities.

- For regular `.md` file, `option.content` is its markdown content.
- For the root directory (`docs` directory), `option.content` is the content of `README.md` under the project root directory (not `docs` directory)。If no `README.md`，`option.content` is an empty string.
- For sub-directories, `option.content` is all `.md` files and sub-directories directly under it.
