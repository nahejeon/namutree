<script lang="ts">
	let { folder, addingNew, addingFolder = $bindable() } = $props();
	import MoreIcon from '$lib/icons/MoreIcon.svelte';

	let editing = $state(addingNew);

	let ref;

	const addFolder = (e) => {
		// Change this to submit form
    if (e.key == 'Enter') {
      console.log(e);
    }
  }

  $effect(() => {
		if (editing) {
	  	ref?.focus();
	  }
	});

</script>

<style>
  .btn-more {
    color: white;
    background-color: transparent;
    box-shadow: none;
    border: none;
  }
</style>

<li class="h-9">

	{#if editing}

		<input bind:this={ref} id="edit" type="text" placeholder="Type here" class="input bg-primary" onkeydown={addFolder} onblur={() => addingFolder = false}/>

	{:else}

		<div class="flex justify-between pr-1">

			{folder.name}

			<div class="dropdown dropdown-end">
        <div tabindex="0" role="button" class="btn btn-more h-6 w-6 p-0">
          <MoreIcon />
        </div>
        
        <ul class="menu dropdown-content bg-secondary rounded-box z-1 w-28 shadow-sm">
          <li><button onclick={''}>Rename</button></li>
          <li><button onclick={''}>Delete</button></li>
        </ul>
      </div>

		</div>

	{/if}

</li>
