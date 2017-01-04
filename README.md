Loppo is an extremely easy static site generator of markdown documents. You get your site with only one command. Please visit [demo](http://redux.ruanyifeng.com/).

## Features

- easy config ([example](https://github.com/ruanyf/redux-docs/blob/master/loppo.yml))
- simple site structure ([example](https://github.com/ruanyf/redux-docs/blob/master/chapters.yml))
- friendly template syntax([example](https://github.com/ruanyf/redux-docs/blob/master/themes/oceandeep/page.template))

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

Enter your site directory.

```bash
$ cd myProject
```

Run the command.

```bash
$ loppo server
```

Visit http://127.0.0.1:8080 in your browser.

## License

GPL v3
