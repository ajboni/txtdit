<script>
  import FooterItem from "./FooterItem.svelte";
  import FooterItemClear from "./FooterItemClear.svelte";
  import FooterItemExport from "./FooterItemExport.svelte";
  import FooterItemImport from "./FooterItemImport.svelte";
  import FooterItemFullscreen from "./FooterItemFullscreen.svelte";
  import ThemeSelector from "./ThemeSelector.svelte";
</script>

<div>
  <ThemeSelector />
</div>
<div class="footer-middle" />
<div class="footer-item-container">
  <FooterItemClear />
  <FooterItemImport />
  <FooterItemExport />
  <FooterItemFullscreen />
</div>
<!-- <FooterItem caption="Words" icon="fa fa-tachometer-alt" /> -->
