<script>
  import FooterItem from "./FooterItem.svelte";
  import { fullscreen } from "./store.js";

  function toggleFullScreen() {
    if (document.fullscreenElement) {
      document.exitFullscreen();
      fullscreen.set(false);
    } else {
      document.documentElement.requestFullscreen();
      fullscreen.set(true);
    }
  }
</script>

<FooterItem
  caption=""
  icon="fa fa-compress-arrows-alt"
  callback={toggleFullScreen} />
