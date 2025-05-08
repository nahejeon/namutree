<script>
  import { page } from '$app/state';
	let { showModal = $bindable() } = $props();

	let dialog = $state(); // HTMLDialogElement

  let vocabName = $state()
  let vocabMeaning = $state()
  
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

    <form class="fieldset" method="POST">
      
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
      <textarea class="textarea" name="notes" placeholder="Example sentences, pronunciation, etc."></textarea>

      <!-- Buttons -->
      <div class="modal-action">
        <button class="btn" formaction="?/new" disabled={!(vocabName && vocabMeaning)}>Save</button>
        <button class="btn" formmethod="dialog">Close</button>
      </div>
    </form>
  </div>
</dialog>
