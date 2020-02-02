# TXTDIT

TXTDIT is a featurless themeable text editor. 

Main features:

* No text formatting
* Multiple Themes
* Import/export plain text file.
* Autosave current document
* No more features


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
4. To automatically generate css, add to app.svelte `import "./themes/newTheme.scss"`;
5. run the project, your css will be added in the docs/themes folder

If a new variable is added, you should add a default value in `_defaults.scss` otherwise it will throw error on themes not using it.



