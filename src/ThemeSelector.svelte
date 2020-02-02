<script>
  import themes from "./themes/theme-list";
  export let className = "footer-item";
  let theme = localStorage.getItem("theme");

  function changeTheme(e) {
    const theme = e.target.value;
    localStorage.setItem("theme", theme);
    console.log(e.target.value);
    location.reload();
  }
</script>

<div class={className}>
  <i class="fa fa-palette" />
  <select id="themeSelector" bind:value={theme} on:change={changeTheme}>
    {#each themes as item}
      <!-- content here -->
      <option value={item}>{item}</option>
    {/each}
  </select>
</div>
