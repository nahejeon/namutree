<script lang="ts">
  import { onMount } from 'svelte';

  import VocabModal from './VocabModal.svelte';
  import { invalidate } from '$app/navigation';

  import AddVocabIcon from '$lib/icons/AddVocabIcon.svelte';
  import DeleteIcon from '$lib/icons/DeleteIcon.svelte';

  import { getURL }  from '$lib/getURL.ts';

  let { items, folders, currentFolderId, count, page, sort, searchString } = $props();

  let showModal = $state(false);
  let vocab = $state(null);

  let pageCount = $derived(Math.floor((count + 1) / 20) + 1);

  let showEverything = $state(true);

  const highlightSearch = (text) => {
    return text.replaceAll(searchString, '<mark class="highlight">' + searchString + '</mark>');
  }

  const highlightHiddenSearch = (text) => {
    return text.replaceAll(searchString, '<mark class="highlight-hidden">' + searchString + '</mark>');
  }
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
</style>

<VocabModal
  bind:showModal
  { vocab }
  { folders }
  { currentFolderId }
/>

<div class="flex flex-col justify-between h-[calc(100vh-64px)]">
  <div class="flex flex-row flex-wrap overflow-y-scroll">

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
