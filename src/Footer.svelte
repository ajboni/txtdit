<script>
  import FooterItem from "./FooterItem.svelte";
  import ThemeSelector from "./ThemeSelector.svelte";

  function toggleFullScreen() {
    if (document.fullscreenElement) {
      document.exitFullscreen();
    } else {
      document.documentElement.requestFullscreen();
    }
  }
</script>

<div>
  <ThemeSelector />
</div>
<div class="footer-middle" />
<div class="footer-item-container">

  <FooterItem caption="Open" icon="fa fa-upload" />
  <FooterItem caption="Export" icon="fa fa-download" />
  <FooterItem
    caption=""
    icon="fa fa-compress-arrows-alt"
    callback={toggleFullScreen} />
</div>
<!-- <FooterItem caption="Words" icon="fa fa-tachometer-alt" /> -->
