import { writable } from "svelte/store";

export let fullscreen = writable(false)
export let theme = writable("default")
export let content = writable("")
export let documentName = writable("")


// Load from local storage
if (localStorage.getItem("theme")) { theme.set(localStorage.getItem("theme")) }
if (localStorage.getItem("content")) { content.set(localStorage.getItem("content")) }
if (sessionStorage.getItem("documentName")) { documentName.set(sessionStorage.getItem("documentName")) }

// Update CSS with new theme
theme.subscribe(newTheme => {
	console.log(newTheme)
		;
	if (!newTheme) {
		newTheme = "default";
	}
	const path = "/themes/";
	const ext = ".css"
	const defaultThemeCSS = `${path}default${ext}`;
	let themeCSS = `${path}${newTheme}${ext}`;

	fetch(themeCSS).then(res => {
		let href = res.ok ? themeCSS : defaultThemeCSS;
		document.getElementById("stylesheet").href = href;
	});
})