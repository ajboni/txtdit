<script>
  export let caption;
  export let callback = null;
  export let className = "footer-item";
  export let icon;
</script>

<div class={className} on:click={callback}>
  <i class={icon} />

  <span style="padding: 0px 0px 0px 0px; top: auto; bottom:auto">
    {caption}
  </span>
  <slot />
</div>
