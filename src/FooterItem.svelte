<script>
  export let caption;
  export let callback;
  export let className = "footer-item";
  export let icon;
</script>

<div class={className} on:click={callback}>
  <i class={icon} />

  <span style="padding: 0px 0px 0px 10px; top: auto; bottom:auto">
    {caption}
  </span>
</div>
