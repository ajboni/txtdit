import App from './App.svelte';
// import scss to let rollup make the theme css.
import "./themes/oldschool.scss";
import "./themes/default.scss";
import "./themes/simple.scss";
import "./themes/oasis.scss";
import "./themes/saturday.scss";
import "./themes/sunday.scss";
import "./themes/narrow.scss";
import "./themes/vscode.scss";
import "./themes/vault76.scss";

const app = new App({
	target: document.body,
	props: {
		name: 'world'
	}
});

export default app;