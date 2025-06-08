<script lang="ts">
  import VocabModal from './VocabModal.svelte';
	import type { PageProps } from './$types';

	let { data }: PageProps = $props();

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
/>

<div class="flex flex-row flex-wrap">
  <button
    class="card card-dash border-dashed border-1 border-gray-400 min-w-50 m-1 relative cursor-grab"
    onclick={() => (showModal = true)}
  >
    <div class="card-body justify-center items-center">
      <svg xmlns="http://www.w3.org/2000/svg" class="w-18 fill-none stroke-1 stroke-gray-300" viewBox="0 0 64 64">
        <circle cx="32" cy="32" r="24"/>
        <line x1="20" y1="32" x2="44" y2="32"/>
        <line x1="32" y1="20" x2="32" y2="44"/>
      </svg>
      <h3 class="text-base text-gray-600">Add vocab</h3>
    </div>
  </button>

  {#each data.items as item}
    <div class="card bg-base-100 card-border min-w-50 m-1 relative">
      <!-- delete button -->
      <button
        aria-label="delete"
        class="btn btn-circle btn-ghost size-[1.5em] absolute top-1 right-1"
        onclick={async () => {
          await fetch(`/vocab/${item.id}`, {
            method: 'DELETE'
          });

          const items = data.items.filter((i) => i.id !== item.id);

          data = { ...data, items };
        }}
      >
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32">
        <defs>
          <style>.cls-1{fill:none;stroke:#cccccc;stroke-linecap:round;stroke-linejoin:round;stroke-width:2px;}</style>
        </defs>
        <g id="cross">
          <line class="cls-1" x1="7" x2="25" y1="7" y2="25"/>
          <line class="cls-1" x1="7" x2="25" y1="25" y2="7"/>
        </g>
      </svg>
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
