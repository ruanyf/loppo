# Commands

Loppo supports several commands.

## loppo server

`loppo server` builds the document site at first, and thereafter launch a web server on 8080 port for `dist` sub-directory.

```bash
$ loppo server
```

After running the comand, you could visit http://127.0.0.1:8080 in your browser.

This command is helpful for preview when you develop your documents.

## loppo count

`loppo count` will output statistic information of your documents.

```bash
$ loppo count

[Files] 56
[Lines] 8885
[Words] 51555
[Chars] 362931
```

Attention, before using this command, `chapters.yml` must already be existed. Otherwise you will get an error.

`loppo count` has two options.

```bash
# output every markdown file's statistic information
$ loppo count --detail

# output a specified markdown file's statistic information
# the file path should be same as the corresponding item in chapters.yml
$ loppo count -f some.md
```

