<script lang="ts">
  import { invalidate } from '$app/navigation'
  import { onMount } from 'svelte'
  import "../app.css";
  import FolderListItem from './FolderListItem.svelte';

  import AddFolderIcon from '$lib/icons/AddFolderIcon.svelte';
  import SearchIcon from '$lib/icons/SearchIcon.svelte';
  import SettingsIcon from '$lib/icons/SettingsIcon.svelte';
  import SortIcon from '$lib/icons/SortIcon.svelte';

  let { data, children } = $props();
  let { folders, session, supabase } = $derived(data);

  let addingFolder = $state(false);

  const logout = async () => {
    const { error } = await supabase.auth.signOut()
    if (error) {
      console.error(error)
    } else {
      location.reload();
    } 
  }

  onMount(() => {
    const { data } = supabase.auth.onAuthStateChange((_, newSession) => {
      if (newSession?.expires_at !== session?.expires_at) {
        invalidate('supabase:auth');
      }
    })
    return () => data.subscription.unsubscribe();
  })
</script>

<style>
  .btn-ghost:hover {
    color: white;
    background-color: transparent;
    box-shadow: none;
    outline: white;
  }
</style>

<div class="drawer lg:drawer-open">
  <input id="my-drawer-2" type="checkbox" class="drawer-toggle" />
  <div class="drawer-content bg-base-200">
    <!-- Top bar -->
    <div class="navbar justify-between">

      <!-- Sort -->
      <div class="dropdown">
        <div tabindex="0" role="button" class="btn m-1 px-3 justify-between">
          <SortIcon />
          <span>Sort by</span>
        </div>
        
        <ul class="menu dropdown-content bg-base-100 rounded-box z-1 w-52 p-2 shadow-sm">
          <li><a>Created: Newest first</a></li>
          <li><a>Created: Oldest first</a></li>
          <li><a>Name</a></li>
        </ul>
      </div>

      <!-- Search -->
      <label class="input w-200">
        <SearchIcon />
        <input type="search" required placeholder="Search" />
      </label>

      {#if !session?.user.is_anonymous}
        <!-- Greeting & Settings -->
         <div class="dropdown dropdown-end">
          <div tabindex="0" role="button" class="btn btn-ghost btn-circle m-1 px-1 justify-between">
            <SettingsIcon />
          </div>
          
          <ul class="menu dropdown-content bg-base-100 rounded-box z-1 w-32 p-2 shadow-sm">
            <li><a href="/profile">Profile</a></li>
            <li><button onclick={logout}>Logout</button></li>
          </ul>
        </div>
      {:else}
        <!-- Log in & Sign up -->
        <div class="dropdown dropdown-end">
          <button class="btn btn-ghost"><a href="/login">Log in</a></button>
          <button class="btn btn-accent"><a href="/signup">Sign up</a></button>
        </div>
      {/if}
    </div>

    {@render children()}

    <label for="my-drawer-2" class="btn btn-primary drawer-button lg:hidden">
      Open drawer
    </label>
  </div>

  <div class="drawer-side">
    <label for="my-drawer-2" aria-label="close sidebar" class="drawer-overlay"></label>
    <div class="flex flex-col justify-between bg-primary text-base-100 min-h-full p-4">
      <div>
        <!-- Logo -->
        <h1 class="text-2xl font-semibold mb-2 text-accent">
          <a href="/">NamuTree</a>
        </h1>

        <!-- Folder List -->
        <ul class="menu w-50 text-base">
          <li>
            <h2 class="menu-title text-lg"><a href="/">All</a></h2>

            <ul>

              {#each folders as folder}
                <FolderListItem folder={folder} editing={false}/>
              {/each}

              {#if addingFolder}
                <FolderListItem editing bind:addingFolder />
              {/if}

            </ul>
            
          </li> 
        </ul>
      </div>

      <!-- New folder button -->
      <button class="flex items-center gap-2 font-light text-base cursor-pointer" onclick={() => addingFolder = true}>
        <AddFolderIcon />
        New folder
      </button>
    </div>
  </div>
</div>

<!-- <a href="https://iconscout.com/icons/tree" class="text-underline font-size-sm" target="_blank">Tree</a> by <a href="https://iconscout.com/contributors/chamedesign" class="text-underline font-size-sm" target="_blank">Chamestudio</a> -->
