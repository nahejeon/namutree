<script lang="ts">
  import AddVocabModal from './AddVocabModal.svelte';
	import type { PageProps } from './$types';

	let { data }: PageProps = $props();

  let showModal = $state(false);
</script>

<div class="flex flex-row">
  <div class="card bg-base-100 card-border min-w-50 m-1">
    <div class="card-body">
        <!-- Open the modal using ID.showModal() method -->
        <button class="btn" onclick={() => (showModal = true)}>open modal</button>
        <AddVocabModal
          bind:showModal
        />
    </div>
  </div>
  {#each data.items as item}
    <div class="card bg-base-100 card-border min-w-50 m-1">
      <div class="card-body">
        <h2 class="card-title">{item.name}</h2>
        <p>{item.meaning}</p>
        <p>{item.notes}</p>
      </div>
    </div>
	{/each}
</div>
