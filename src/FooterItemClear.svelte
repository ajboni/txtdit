<script>
  import FooterItem from "./FooterItem.svelte";

  function clearEditor() {
    const confirm = window.confirm("Delete all content from the editor?");
    if (!confirm) return;
    localStorage.removeItem("content");
    sessionStorage.removeItem("documentName");
    location.reload();
  }
</script>

<FooterItem callback={clearEditor} caption="Clear" icon="fa fa-eraser" />
