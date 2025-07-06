<script lang="ts">
  import VocabList from '$lib/VocabList.svelte';
	import type { PageProps } from './$types';

  import InfoIcon from '$lib/icons/InfoIcon.svelte';

  let { data }: PageProps = $props();
</script>

{#if data.user?.is_anonymous}
  <div role="alert" class="alert alert-info alert-soft m-3">
    <InfoIcon />
    <span>We created some sample data for you to start with. Any changes will be lost if you don't <a class="underline font-bold" href="/signup">sign up</a>.</span>
  </div>
{/if}

<VocabList items={data.items} folders={data.folders} count={data.count} page={data.page} sort={data.sort} />
