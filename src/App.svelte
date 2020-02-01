<script>
  import Footer from "./Footer.svelte";
  import Editor from "./Editor.svelte";
  // import scss to let rollup make the theme css.
  import "./themes/oldschool.scss";
  import "./themes/default.scss";
  import "./themes/simple.scss";
  import "./themes/oasis.scss";

  import { onMount } from "svelte";

  let themeLoaded = false;
  let themeName = localStorage.getItem("theme");
  const path = "/themes/";
  const ext = ".css";
  let theme = `${path}${themeName}${ext}`;
  const defaultTheme = `${path}default${ext}`;

  /* Load CSS File */
  fetch(theme).then(res => {
    let href = res.ok ? theme : defaultTheme;
    document.getElementById("stylesheet").href = href;
  });
</script>

<main id="main">
  <div class="editor-container">
    <Editor />
  </div>
  <div class="footer-container">
    <Footer />
  </div>
</main>
