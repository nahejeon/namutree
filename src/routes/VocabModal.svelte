<script>  
	let {
    showModal = $bindable(),
    vocab
  } = $props();

	let dialog = $state(); // HTMLDialogElement

  let vocabName = $derived(vocab?.name);
  let vocabMeaning = $derived(vocab?.meaning);
  let vocabNotes = $derived(vocab?.notes);

  let existing = $derived(Boolean(vocab));

	$effect(() => {
    if (showModal) {
      dialog.showModal();
    } else {
      vocab = null;
    }
	});
</script>

<dialog
  id="add-vocab"
  class="modal"
  bind:this={dialog}
  onclose={() => { showModal = false }}
	onclick={(e) => { if (e.target === dialog) dialog.close(); }}
>
  <div class="modal-box">
    <form class="fieldset" method="POST">
      <input type="hidden" name="id" value={vocab?.id}/>

      <!-- Vocab -->
      <legend class="fieldset-legend">Vocab</legend>
      <p class="label">*Required</p>
      <input type="text" class="input" name="name" bind:value={vocabName}/>

      <!-- Meaning -->
      <legend class="fieldset-legend">Meaning</legend>
      <p class="label">*Required</p>
      <input type="text" class="input" name="meaning" bind:value={vocabMeaning}/>

      <!-- Notes -->
      <legend class="fieldset-legend">Notes</legend>
      <textarea class="textarea" name="notes" placeholder="Example sentences, pronunciation, etc." bind:value={vocabNotes}></textarea>

      <!-- Buttons -->
      <div class="modal-action">
        <button class="btn" formaction={ existing ? "?/update" : "?/new" } disabled={!(vocabName && vocabMeaning)}>Save</button>
        <button class="btn" formmethod="dialog">Close</button>
      </div>
    </form>
  </div>
</dialog>
