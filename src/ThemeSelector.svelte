<script>
  import themes from "./themes/theme-list";
  import FooterItem from "./FooterItem.svelte";
  let theme = localStorage.getItem("theme");

  function changeTheme(e) {
    const theme = e.target.value;
    localStorage.setItem("theme", theme);
    console.log(e.target.value);
    location.reload();
  }
</script>

<FooterItem caption="" icon="fa fa-palette">

  <select
    id="themeSelector"
    bind:value={theme}
    on:change={changeTheme}
    style="cursor: pointer">
    {#each themes as item}
      <!-- content here -->
      <option value={item}>{item}</option>
    {/each}
  </select>
</FooterItem>
