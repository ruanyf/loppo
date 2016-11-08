# Option Object

## option.site

`option.site` is the site name.

## option.dir

`option.dir` is the document directory of the repo.

## option.page_title

`option.page_title` is the page name of a document page.

- For sub-directories, it is `option.site`.
- 

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
