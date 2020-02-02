<script>
  import FooterItem from "./FooterItem.svelte";

  function downloadFile() {
    const content = localStorage.getItem("content");
    if (!content) {
      return;
    }
    let documentName = sessionStorage.getItem("documentName");
    if (!documentName) {
      documentName = content.slice(0, 10);
    }

    var a = window.document.createElement("a");
    a.href = window.URL.createObjectURL(
      new Blob([content], { type: "text/plain" })
    );
    a.download = documentName;

    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  }
</script>

<FooterItem callback={downloadFile} caption="Export" icon="fa fa-download" />
