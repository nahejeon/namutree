<script>
	let { showModal = $bindable()} = $props();

	let dialog = $state(); // HTMLDialogElement

	$effect(() => {
		if (showModal) dialog.showModal();
	});
</script>

<dialog
  id="add-vocab"
  class="modal"
  bind:this={dialog}
  onclose={() => (showModal = false)}
	onclick={(e) => { if (e.target === dialog) dialog.close(); }}
>
  <div class="modal-box">
    <h3 class="text-lg font-bold">Add new vocab</h3>
    <fieldset class="fieldset">
      <legend class="fieldset-legend">Vocab</legend>
      <input type="text" class="input"/>
      <legend class="fieldset-legend">Meaning</legend>
      <input type="text" class="input"/>
      <legend class="fieldset-legend">Notes</legend>
      <textarea class="textarea" placeholder="Example sentences, pronunciation, etc."></textarea>
    </fieldset>
    <div class="modal-action">
      <form method="dialog">
        <!-- if there is a button in form, it will close the modal -->
        <button class="btn">Save</button>
        <button class="btn">Close</button>
      </form>
    </div>
  </div>
</dialog>
