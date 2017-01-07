Loppo is an extremely easy static site generator of markdown documents. You get your site with only one command. Please visit [demo](http://redux.ruanyifeng.com/).

## Features

- easy config ([example](https://github.com/ruanyf/redux-docs/blob/master/loppo.yml))
- simple site structure ([example](https://github.com/ruanyf/redux-docs/blob/master/chapters.yml))
- friendly template syntax([example](https://github.com/ruanyf/redux-docs/blob/master/themes/oceandeep/page.template))
- built-in [utility commands](docs/commands.md)

## How to use

**Attention: Loppo is still in its very early stages. Use it in production at your own risk.**

First of all, arrange your documents into the following structure.

```
|- myProject
   |- README.md
   |- docs
      |- page1.md
      |- page2.md
      |- ...
```

Now, install Loppo.

```bash
$ npm install loppo -g
```

Enter your project directory.

```bash
$ cd myProject
```

Run the command.

```bash
$ loppo
```

Now, Loppo will build the document site under `dist` sub-directory. After the building process, you could open the site in your browser.

```bash
$ open dist/index.html
```

## License

GPL v3

