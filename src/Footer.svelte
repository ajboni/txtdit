<script>
  import FooterItem from "./FooterItem.svelte";
  import FooterItemClear from "./FooterItemClear.svelte";
  import FooterItemExport from "./FooterItemExport.svelte";
  import FooterItemImport from "./FooterItemImport.svelte";
  import FooterItemFullscreen from "./FooterItemFullscreen.svelte";
  import ThemeSelector from "./ThemeSelector.svelte";
  import pkg from "../package.json";
  console.log(`running version ${pkg.version}`);
</script>

<div class="footer-item-container">
  <ThemeSelector />
</div>
<div class="footer-middle">
  <FooterItem caption={pkg.version} icon="fa fa-code-branch" />
</div>
<div class="footer-item-container">
  <FooterItemClear />
  <FooterItemImport />
  <FooterItemExport />
  <FooterItemFullscreen />

</div>
<!-- <FooterItem caption="Words" icon="fa fa-tachometer-alt" /> -->
