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

<div class="flex flex-row">
  <div class="card bg-base-100 card-border min-w-50 m-1">
    <div class="card-body">
      <button class="btn" onclick={() => (showModal = true)}>
        open modal
      </button>
    </div>
  </div>

  {#each data.items as item}
    <div class="card bg-base-100 card-border min-w-50 m-1">
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
