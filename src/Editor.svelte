<script>
  import Dropzone from "./Dropzone.svelte";
  import { content } from "./store.js";

  function saveContent(e) {
    localStorage.setItem("content", e.target.value);
  }

  function handleInput(e) {
    /* Handles tabulation on TAB key*/
    if (e.keyCode == 9 || e.which == 9) {
      e.preventDefault();
      var s = this.selectionStart;
      this.value =
        this.value.substring(0, this.selectionStart) +
        "\t" +
        this.value.substring(this.selectionEnd);
      this.selectionEnd = s + 1;
    }
  }
</script>

<div class="editor-text-container">
  <textarea
    bind:value={$content}
    on:keydown={handleInput}
    on:keyup={saveContent}
    name="editor"
    id="editor"
    cols="30"
    rows="2" />
  <Dropzone />
</div>
