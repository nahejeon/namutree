<script lang="ts">
  import VocabModal from './VocabModal.svelte';
  import { invalidate } from '$app/navigation';

  import AddVocabIcon from '$lib/icons/AddVocabIcon.svelte';
  import DeleteIcon from '$lib/icons/DeleteIcon.svelte';

  let { items, folders, currentFolderId, count, page } = $props();

  let showModal = $state(false);
  let vocab = $state(null);

  let pageCount = $derived(Math.floor((count + 1) / 20) + 1);
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

<div class="flex flex-col">

  <div class="flex flex-row flex-wrap">

    {#if page == '1'}
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
    {/if}

  

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



  <!-- Pagination -->
  <div class="join justify-center m-3">
    {#if pageCount <= 5}
      {#each Array.from({length: pageCount}, (_, i) => i + 1) as i}
        {#if i == page}
          <a href={"/?page=" + i}><button class="join-item btn btn-active">{i}</button></a>
        {:else}
          <a href={"/?page=" + i}><button class="join-item btn">{i}</button></a>
        {/if}
      {/each}
    {:else}
      <button class="join-item btn">1</button>
      <button class="join-item btn">2</button>
      <button class="join-item btn btn-disabled">...</button>
      <button class="join-item btn">{pageCount - 1}</button>
      <button class="join-item btn">{pageCount}</button>
    {/if}
  </div>

</div>
