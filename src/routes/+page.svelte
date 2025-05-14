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
        class="btn btn-circle btn-ghost size-[1.8em] absolute top-1 right-1"
        onclick={async () => {
          await fetch(`/vocab/${item.id}`, {
            method: 'DELETE'
          });

          const items = data.items.filter((i) => i.id !== item.id);

          data = { ...data, items };
        }}
      >
        <img src="/delete_icon.svg" alt="delete">
      </button>
      
      <button
        class="vocab_card"
        onclick={() => {
          vocab = item;
          showModal = true;
        }}>
        <div class="card-body">
          <h2 class="card-title">{item.name}</h2>
          <p>{item.meaning}</p>
          <p>{item.notes}</p>
        </div>
      </button>
    </div>
	{/each}
</div>
