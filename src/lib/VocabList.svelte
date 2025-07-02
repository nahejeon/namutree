<script lang="ts">
  import { onMount } from 'svelte';
  import { userState } from './state.svelte.js';

  import VocabModal from './VocabModal.svelte';
  import { invalidate, invalidateAll } from '$app/navigation';

  import AddVocabIcon from '$lib/icons/AddVocabIcon.svelte';
  import DeleteIcon from '$lib/icons/DeleteIcon.svelte';

  import { getURL }  from '$lib/getURL.ts';

  let { items, folders, currentFolderId, count, page, sort, searchString } = $props();

  let showModal = $state(false);
  let vocab = $state(null);

  let pageCount = $derived(Math.floor((count + 1) / 20) + 1);

  let showEverything = $state(true);

  let itemIds = items.map((i) => i.id);
  let selectedItemIdsBit = $state(0);
  
  const highlightSearch = (text) => text.replaceAll(searchString, '<mark class="highlight">' + searchString + '</mark>');

  const highlightHiddenSearch = (text) => text.replaceAll(searchString, '<mark class="highlight-hidden">' + searchString + '</mark>');

  const selectItem = (i) => {
    selectedItemIdsBit ^= 1 << i;
  }

  const getSelectedItems = () => {
    let ids = [];

    for (let i = 0; i < items.length; i++) {
      if (selectedItemIdsBit & (1 << i)) {
        ids.push(items[i].id);
      }
    }

    return ids;
  }

  const deleteItems = async () => {
    await fetch(`/vocab`, {
      method: 'DELETE',
      body: JSON.stringify({ ids: getSelectedItems() }),
      headers: {
        'content-type': 'application/json'
      }
    });

    selectedItemIdsBit = 0;
    invalidateAll();
  }

  const moveItems = async (folderId) => {
    await fetch(`/vocab`, {
      method: 'PUT',
      body: JSON.stringify({ folder_id: folderId, ids: getSelectedItems() }),
      headers: {
        'content-type': 'application/json'
      }
    });

    selectedItemIdsBit = 0;
    invalidateAll();
  }


  $effect(() => {
    if (!userState.select) {
      selectedItemIdsBit = 0;
    }
  });
</script>

<style>
  button.vocab-card {
    all: unset;
    cursor: grab;
  }

  div :global {
    .card:hover {
      .meaning {
        color: gray;

        .highlight-hidden {
          background-color: #a7f3d0;
          color: gray;
        }
      }

      .notes {
        color: black;

        .highlight-hidden {
          background-color: #a7f3d0;
          color: black;
        }
      }
    }
      

    .highlight {
      background-color: #a7f3d0;
    }

    .highlight-hidden {
      background-color: white;
      color: white;
    }
  }

  .card {
    &:has(> :checked) {
      outline: none;
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
  <div class="flex flex-row flex-wrap overflow-y-scroll ml-2">

    {#if searchString && items.length == 0}

      <p class="ml-5 mt-2 text-gray-400 italic">
        No items found
      </p>
      
    {:else}
      
      {#if page == '1' && !searchString}
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

      {#each items as item, i}
        <!-- Vocab card -->
        <div class="card  bg-base-100 card-border w-50 h-36 m-1 relative">
          {#if userState.select}
            <input type="checkbox" checked={selectedItemIdsBit & 1 << i} class="checkbox checkbox-xs checkbox-success absolute top-2 right-2" />
          {/if}

          <button
            class="vocab-card"
            onclick={() => {
              if (userState.select) {
                selectItem(i);
              } else {
                vocab = item;
                showModal = true;
              }
            }}>
            <div class="card-body w-50 p-4">
              {#if showEverything && searchString}
                <div class="line-clamp-2 mr-3">
                  <span class="text font-semibold text-xl text-wrap mr-0.5">
                    {@html highlightSearch(item.name)}
                  </span>
                  <span class="text text-gray-400">{@html highlightSearch(item.meaning)}</span>
                </div>
                <p class="text font-serif text-sm line-clamp-3">{@html highlightSearch(item.notes )}</p>

              {:else if showEverything}
                <div class="line-clamp-2 mr-3">
                  <span class="text font-semibold text-xl text-wrap mr-0.5">
                    {item.name}
                  </span>
                  <span class="text text-gray-400">{item.meaning}</span>
                </div>
                <p class="text font-serif text-sm line-clamp-3">{item.notes}</p>

              {:else if searchString}
                <div class="line-clamp-2 mr-3">
                  <span class="text font-semibold text-xl text-wrap mr-0.5">{@html highlightSearch(item.name)}</span>
                  <span class="text meaning text-white">{@html highlightHiddenSearch(item.meaning)}</span>
                </div>
                <p class="text notes font-serif text-sm line-clamp-3 text-white">{@html highlightHiddenSearch(item.notes)}</p>

              {:else}
                <div class="line-clamp-2 mr-3">
                  <span class="text font-semibold text-xl text-wrap mr-0.5">{item.name}</span>
                  <span class="text meaning text-white">{item.meaning}</span>
                </div>
                <p class="text notes font-serif text-sm line-clamp-3 text-white">{item.notes}</p>
              {/if}
            </div>
          </button>
        </div>
      {/each}   
  
    {/if}
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
      {/if}
    </div>

    {#if userState.select}
      <div class="col-start-3 justify-self-end">

        <div class="dropdown dropdown-top dropdown-end">
          <div tabindex="0" role="button" class="btn btn-outline btn-primary hover:text-white shadow-none">
            Move to
          </div>
          
          <ul class="menu dropdown-content bg-base-300 rounded-box z-1 w-52 p-2 shadow-sm mb-2">
            {#each folders as folder}
              <li><a href="#" onclick={() => moveItems(folder.id)}>{folder.name}</a></li>
            {/each}
          </ul>
        </div>

        <button
          class="btn btn-neutral btn-outline hover:shadow-none"
          onclick={deleteItems}
        >
          Delete
        </button>
      </div>
    {/if}
    
    
  </div>
  <!-- End Footer -->
  
</div>
