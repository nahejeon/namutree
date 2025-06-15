<script lang="ts">
  import VocabModal from './VocabModal.svelte';

  import AddVocabIcon from '$lib/icons/AddVocabIcon.svelte';
  import DeleteIcon from '$lib/icons/DeleteIcon.svelte';

  let { items, folders, currentFolderId } = $props();

  let showModal = $state(false);
  let vocab = $state(null);
</script>

<style>
  button.vocab_card {
    all: unset;
    cursor: grab;
  }
</style>

<VocabModal
  bind:showModal
  { vocab }
  { folders }
  { currentFolderId }
/>

<div class="flex flex-row flex-wrap">
  <!-- Add vocab -->
  <button
    class="card card-dash border-dashed border-1 border-gray-400 min-w-50 m-1 relative cursor-grab"
    onclick={() => (showModal = true)}
  >
    <div class="card-body justify-center items-center">
      <AddVocabIcon />
      <h3 class="text-base text-gray-600">Add vocab</h3>
    </div>
  </button>

  {#each items as item}
    <!-- Vocab card -->
    <div class="card bg-base-100 card-border min-w-50 m-1 relative">
      <!-- delete button -->
      <button
        aria-label="delete"
        class="btn btn-circle btn-ghost size-[1.5em] absolute top-1 right-1"
        onclick={async () => {
          await fetch(`/vocab/${item.id}`, {
            method: 'DELETE'
          });

          items = items.filter((i) => i.id !== item.id);
        }}
      >
        <DeleteIcon />
      </button>
      
      <button
        class="vocab_card"
        onclick={() => {
          vocab = item;
          showModal = true;
        }}>
        <div class="card-body max-w-50 p-4">
          <div class="line-clamp-2 mr-3">
            <span class="font-semibold text-xl text-wrap mr-0.5">{item.name}</span>
            <span class="text-gray-400">{item.meaning}</span>
          </div>
          <p class="font-serif text-sm line-clamp-4">{item.notes}</p>
        </div>
      </button>
    </div>
	{/each}
</div>
