<script>
  import FooterItem from "./FooterItem.svelte";

  function openFile(e) {
    const textFile = e.target.files[0];
    const fr = new FileReader();
    fr.addEventListener("load", () => {
      localStorage.setItem("content", event.target.result);
      sessionStorage.setItem("documentName", textFile.name);
      location.reload();
    });
    fr.readAsText(textFile);
  }
</script>

<FooterItem
  callback={() => {
    document.getElementById('file-input').click();
  }}
  caption="Open"
  icon="fa fa-upload">
  <input
    on:change={e => openFile(e)}
    id="file-input"
    type="file"
    name="name"
    style="display: none;" />
</FooterItem>
