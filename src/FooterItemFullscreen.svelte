<script>
  import FooterItem from "./FooterItem.svelte";

  function toggleFullScreen() {
    if (document.fullscreenElement) {
      document.exitFullscreen();
    } else {
      document.documentElement.requestFullscreen();
    }
  }
</script>

<FooterItem
  caption=""
  icon="fa fa-compress-arrows-alt"
  callback={toggleFullScreen} />
