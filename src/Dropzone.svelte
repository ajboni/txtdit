<script>
  import { onMount } from "svelte";

  onMount(() => {
    let dropArea = document.getElementById("main");
    ["dragenter", "dragover", "dragleave", "drop"].forEach(eventName => {
      dropArea.addEventListener(eventName, preventDefaults, false);
    });

    function preventDefaults(e) {
      e.preventDefault();
      e.stopPropagation();
    }

    ["dragenter", "dragover"].forEach(eventName => {
      dropArea.addEventListener(eventName, highlight, false);
    });
    ["dragleave", "drop"].forEach(eventName => {
      dropArea.addEventListener(eventName, unhighlight, false);
    });

    function highlight(e) {
      dropArea.classList.add("highlight");
    }

    function unhighlight(e) {
      dropArea.classList.remove("highlight");
    }

    dropArea.addEventListener("drop", handleDrop, false);

    function readFile(event) {
      // textarea.textContent = event.target.result;
      localStorage.setItem("content", event.target.result);
      location.reload();
    }
    function handleDrop(e) {
      let dt = e.dataTransfer;
      let file = dt.files[0];
      const objectURL = window.URL.createObjectURL(file);
      const fr = new FileReader();
      fr.addEventListener("load", readFile);
      fr.readAsText(file);
      // handleFiles(files);
    }
  });
</script>
