<script lang="ts">
	let { folder, editing, addingFolder = $bindable() } = $props();
	import MoreIcon from '$lib/icons/MoreIcon.svelte';
	import { invalidate, invalidateAll } from '$app/navigation';

	let folderName = $state('');

	let ref, dropdown;

	const addFolder = async (e) => {
    if (e.key == 'Enter' && folderName) {
    	await fetch('/api/folders', {
				method: 'POST',
				body: JSON.stringify({ name: folderName }),
				headers: {
					'content-type': 'application/json'
				}
			});

			invalidate('folders:all');
			addingFolder = false;
    }
  }

  const editFolder = async (e) => {
    if (e.key == 'Enter' && folderName) {
    	await fetch(`/api/folders/${folder.id}`, {
				method: 'PUT',
				body: JSON.stringify({ name: folderName }),
				headers: {
					'content-type': 'application/json'
				}
			});

			invalidate('folders:all');
			editing = false;
    }
  }

  const deleteFolder = async () => {
  	dropdown.style.display = "none";

  	await fetch(`/api/folders/${folder.id}`, {
      method: 'DELETE'
    });

		invalidate('folders:all');
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

		<input
			bind:this={ref}
			bind:value={folderName}

			class="input bg-primary" 
			id="edit"
			type="text"
			placeholder="Type here"
			
			onkeydown={folder ? editFolder : addFolder}
			onblur={() => {
				folderName = '';
				editing = false;
				addingFolder = false;
			}}
		/>

	{:else}

		<div class="flex justify-between pr-1">

			<a href="/folder/{folder.id}">
				{ folder?.name }
			</a>

			<div class="dropdown dropdown-end">
        <div tabindex="0" role="button" class="btn btn-more h-6 w-6 p-0">
          <MoreIcon />
        </div>
        
        <ul class="menu dropdown-content bg-secondary rounded-box z-1 w-28 shadow-sm" bind:this={dropdown}>
          <li><button onclick={() => editing = true}>Rename</button></li>
          <li><button onclick={deleteFolder}>Delete</button></li>
        </ul>
      </div>

		</div>

	{/if}

</li>
