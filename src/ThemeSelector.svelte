<script>
  import themes from "./themes/theme-list";
  import FooterItem from "./FooterItem.svelte";
  import { theme } from "./store.js";

  function changeTheme(e) {
    const newTheme = e.target.value;
    localStorage.setItem("theme", newTheme);
    theme.set(newTheme);
  }
</script>

<FooterItem caption="" icon="fa fa-palette">

  <select id="themeSelector" on:change={changeTheme} style="cursor: pointer">
    {#each themes as item}
      <!-- content here -->
      <option value={item}>{item}</option>
    {/each}
  </select>
</FooterItem>
