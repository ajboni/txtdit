<script>
  import FooterItem from "./FooterItem.svelte";
  import { content, documentName } from "./store.js";

  function clearEditor() {
    const confirm = window.confirm("Delete all content from the editor?");
    if (!confirm) return;
    localStorage.removeItem("content");
    sessionStorage.removeItem("documentName");
    content.set("");
    documentName.set("");
  }
</script>

<FooterItem callback={clearEditor} caption="Clear" icon="fa fa-eraser" />
