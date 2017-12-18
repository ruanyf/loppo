# Command line options

Loppo has some command line options.

## --dir, -d

`--dir` or `-d` sets the document directory which keeps the original Markdown files. `docs` is the default directory.

```bash
$ loppo --dir my_docs
```

## --output, -o

`--output` or `-o` sets the output directory which keeps the generated documents. `dist` is the default directory.

```bash
$ loppo --output my_site
```

##  --site, -s

`--site` or `-s` sets the site's name. `Documents` is the default.

```bash
$ loppo --site "My Documents"
```

## --theme, -t

`--theme` or `-t` sets a site's theme. `loppo-theme-oceandeep` is the default.

```bash
$ loppo --theme oceandeep
```

##  --id

`--id` sets a site's ID (default is the dir name of the project).

## --direction

`--direction` sets the document's character direction. `ltr` is the default. It also could be setted as `rtl`.

The option needs the support of the site theme.

## --debug

`--debug` opens Loppo's debug mode.

##  --version, -v

`--version` or `-v` shows Loppo's version information.

## --help

`--help` gives Loppo's commandline usage.

  
  
 

示例：
  loppo --dir docs --output dist
