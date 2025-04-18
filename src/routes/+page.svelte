<script lang="ts">
	import type { PageProps } from './$types';

	let { data }: PageProps = $props();
</script>

<div class="flex flex-row">
  {#each data.vocab_list as vocab}
    <div class="card bg-base-100 card-border min-w-50 m-1">
      <div class="card-body">
        <h2 class="card-title">{vocab.word}</h2>
        <p>{vocab.meaning}</p>
        <p>hi</p>
      </div>
    </div>
	{/each}
</div>
