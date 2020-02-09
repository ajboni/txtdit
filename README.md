# TXTDIT

TXTDIT is a featurless themeable text editor. 

Main features:

* No text formatting
* Multiple Themes
* Import/export plain text file.
* Autosave current document
* No more features

## SCREENSHOTS
<a href="https://postimg.cc/kDvjdcPd" target="_blank"><img src="https://i.postimg.cc/kDvjdcPd/Screenshot-2020-02-03-TXTdit.png" alt="Screenshot-2020-02-03-TXTdit"/></a> <a href="https://postimg.cc/GTdsQGXF" target="_blank"><img src="https://i.postimg.cc/GTdsQGXF/Screenshot-2020-02-03-TXTdit-1.png" alt="Screenshot-2020-02-03-TXTdit-1"/></a><br/><br/>
<a href="https://postimg.cc/9rXLX7cw" target="_blank"><img src="https://i.postimg.cc/9rXLX7cw/Screenshot-2020-02-03-TXTdit-2.png" alt="Screenshot-2020-02-03-TXTdit-2"/></a> <a href="https://postimg.cc/4ng8M0M5" target="_blank"><img src="https://i.postimg.cc/4ng8M0M5/Screenshot-2020-02-03-TXTdit-3.png" alt="Screenshot-2020-02-03-TXTdit-3"/></a><br/><br/>
<a href="https://postimg.cc/47CcYrtF" target="_blank"><img src="https://i.postimg.cc/47CcYrtF/Screenshot-2020-02-03-TXTdit-5.png" alt="Screenshot-2020-02-03-TXTdit-5"/></a> <a href="https://postimg.cc/wR2RbMrS" target="_blank"><img src="https://i.postimg.cc/wR2RbMrS/txtdit.png" alt="txtdit"/></a><br/><br/>


## DEVELOPMENT

Install the dependencies...

```bash
cd svelte-app
npm install
```

...then start [Rollup](https://rollupjs.org):

```bash
npm run dev
```

Navigate to [localhost:5000](http://localhost:5000). You should see your app running. Edit a component file in `src`, save it, and reload the page to see your changes.

By default, the server will only respond to requests from localhost. To allow connections from other computers, edit the `sirv` commands in package.json to include the option `--host 0.0.0.0`.

## ADD A THEME

1. Add theme source in src/theme/ (eg: newTheme.scss)
2. At the bottom of the theme add `import "app.scss";`
3. Include the theme name (filename) in theme-list.js
4. To automatically generate css, add to `main.js`: `import "./themes/newTheme.scss"`;
5. run the project, your css will be added in the public/themes folder

If a new variable is added, you should add a default value in `_defaults.scss` otherwise it will throw error on themes not using it.



