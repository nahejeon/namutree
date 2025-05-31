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
  <div class="modal-box max-w-100">
    <form class="fieldset w-full" method="POST">
      <input type="hidden" name="id" value={vocab?.id}/>

      <!-- Vocab -->
      <div class="flex items-end gap-2">
        <legend class="fieldset-legend text-sm">Vocab</legend>
        <p class="label text-base-content/30 italic mb-1">*Required</p>
      </div>
      <input type="text" class="input w-full" name="name" bind:value={vocabName}/>

      <!-- Meaning -->
      <legend class="fieldset-legend text-sm">Meaning</legend>
      <input type="text" class="input w-full" name="meaning" bind:value={vocabMeaning}/>

      <!-- Notes -->
      <legend class="fieldset-legend text-sm pb-0">Notes</legend>
      <p class="label text-base-content/40 italic mb-1">Example sentences, pronunciation, etc.</p>
      <textarea class="textarea w-full h-30" name="notes" placeholder="" bind:value={vocabNotes}></textarea>

      <!-- Buttons -->
      <div class="modal-action">
        <button class="btn btn-primary text-white w-20" formaction={ existing ? "?/update" : "?/new" } disabled={!(vocabName)}>Save</button>
        <button class="btn btn-primary btn-soft w-20" formmethod="dialog">Close</button>
      </div>
    </form>
  </div>
</dialog>
