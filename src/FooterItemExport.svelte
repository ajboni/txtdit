<script>
  import FooterItem from "./FooterItem.svelte";
  import { content, documentName } from "./store.js";

  function downloadFile() {
    if (!content || !$content) {
      return;
    }
    if (!documentName || !$documentName) {
      documentName.set($content.slice(0, 10));
    }

    var a = window.document.createElement("a");
    a.href = window.URL.createObjectURL(
      new Blob([content], { type: "text/plain" })
    );
    a.download = $documentName;

    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  }
</script>

<FooterItem
  callback={() => downloadFile()}
  caption="Export"
  icon="fa fa-download" />
