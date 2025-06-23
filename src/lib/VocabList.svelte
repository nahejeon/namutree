<script lang="ts">
  import VocabModal from './VocabModal.svelte';
  import { invalidate } from '$app/navigation';

  import AddVocabIcon from '$lib/icons/AddVocabIcon.svelte';
  import DeleteIcon from '$lib/icons/DeleteIcon.svelte';

  import { getURL }  from '$lib/getURL.ts';

  let { items, folders, currentFolderId, count, page, sort } = $props();

  let showModal = $state(false);
  let vocab = $state(null);

  let pageCount = $derived(Math.floor((count + 1) / 20) + 1);

  let showEverything = $state(true);

  const getParams = (i) => {
    let url = '/';

    if (currentFolderId) {
      url += `folder/${currentFolderId}`;
    }

    const searchParams = new URLSearchParams({ page: i });
    url += '?' + searchParams.toString();

    return url;
  }
</script>

<style>
  button.vocab-card {
    all: unset;
    cursor: grab;
  }

  .card:hover {
    .meaning {
      color: gray;
    }

    .notes {
      color: black;
    }
  }
</style>

<VocabModal
  bind:showModal
  { vocab }
  { folders }
  { currentFolderId }
/>

<div class="flex flex-col justify-between h-[calc(100vh-64px)]">

  <div class="flex flex-row flex-wrap overflow-y-scroll">

    {#if page == '1'}
      <!-- Add vocab -->
      <button
        class="card card-dash border-dashed border-1 border-gray-400 min-w-50 h-36 m-1 relative cursor-grab"
        onclick={() => showModal = true}
      >
        <div class="card-body justify-center items-center">
          <AddVocabIcon />
          <h3 class="text-base text-gray-600">Add vocab</h3>
        </div>
      </button>
    {/if}

    {#each items as item}
      <!-- Vocab card -->
      <div class="card bg-base-100 card-border w-50 h-36 m-1 relative">
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
          <!-- <input type="checkbox" checked="checked" class="checkbox checkbox-xs checked-neutral" /> -->
          <DeleteIcon />
        </button>
        
        <button
          class="vocab-card"
          onclick={() => {
            vocab = item;
            showModal = true;
          }}>
          <div class="card-body w-50 p-4">
            {#if showEverything}
              <div class="line-clamp-2 mr-3">
                <span class="font-semibold text-xl text-wrap mr-0.5">{item.name}</span>
                <span class="text-gray-400">{item.meaning}</span>
              </div>
              <p class="font-serif text-sm line-clamp-3">{item.notes}</p>
            {:else}
              <div class="line-clamp-2 mr-3">
                <span class="font-semibold text-xl text-wrap mr-0.5">{item.name}</span>
                <span class="meaning text-white">{item.meaning}</span>
              </div>
              <p class="notes font-serif text-sm line-clamp-3 text-white">{item.notes}</p>
            {/if}
          </div>
        </button>
      </div>
    {/each}   

  </div>

  <!-- Footer -->
  <div class="grid grid-cols-3 m-3"> 

    <!-- View Toggle -->
    <div class="flex items-center gap-2 justify-self-start">
      <input type="checkbox" checked={showEverything} class="toggle toggle-primary" onclick={() => showEverything = !showEverything} />
      <p class="text-sm text-base-content/50">Show everything</p>
    </div>

    <!-- Pagination -->
    <div class="col-start-2 join justify-center justify-self-center">
      {#if pageCount <= 5}
        {#each Array.from({length: pageCount}, (_, i) => i + 1) as i}
          {#if i == page}
            <a href={getURL({ folderId: currentFolderId, sort, page: i })}><button class="join-item btn btn-active">{i}</button></a>
          {:else}
            <a href={getURL({ folderId: currentFolderId, sort, page: i })}><button class="join-item btn">{i}</button></a>
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
  <!-- End Footer -->
  
</div>
