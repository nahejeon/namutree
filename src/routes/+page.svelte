<script lang="ts">
  import VocabList from '$lib/VocabList.svelte';
	import type { PageProps } from './$types';

  let { data }: PageProps = $props();
</script>

<VocabList items={data.items} folders={data.folders} count={data.count} page={data.page} />
