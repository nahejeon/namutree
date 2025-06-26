<script lang="ts">
  import { page } from '$app/state';

  import { invalidate } from '$app/navigation';
  import { onMount } from 'svelte';
  import "../app.css";
  import FolderListItem from './FolderListItem.svelte';

  import logo from '$lib/assets/logo-color.png';
  import { getURL }  from '$lib/getURL.ts';

  import AddFolderIcon from '$lib/icons/AddFolderIcon.svelte';
  import CheckIcon from '$lib/icons/CheckIcon.svelte';
  import OpenDrawerIcon from '$lib/icons/OpenDrawerIcon.svelte';
  import SearchIcon from '$lib/icons/SearchIcon.svelte';
  import SettingsIcon from '$lib/icons/SettingsIcon.svelte';
  import SortIcon from '$lib/icons/SortIcon.svelte';

  let { data, children } = $props();
  let { folders, folder_id, session, supabase, sort, profileName, searchString } = $derived(data);

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


{#snippet dropdown_item(text, name)}
  <li>
    <a href={getURL({folderId: folder_id, searchString, sort: name})}>
      {text}
      {#if sort == name}
        <CheckIcon/>
      {/if}
    </a>
  </li>
{/snippet}

<div class="drawer lg:drawer-open">
  <input id="my-drawer-2" type="checkbox" class="drawer-toggle" />
  <div class="drawer-content bg-base-200">
    <!-- Top bar -->
    <div class="navbar justify-between">

      <label for="my-drawer-2" class="lg:hidden cursor-pointer m-1 px-1">
        <OpenDrawerIcon />
      </label>

      <!-- Sort -->
      <div class="dropdown">
        <div tabindex="0" role="button" class="btn m-1 px-3 justify-between">
          <SortIcon />
          <span class="text-nowrap">Sort by</span>
        </div>
        
        <ul class="menu dropdown-content bg-base-100 rounded-box z-1 w-52 p-2 shadow-sm">
          {@render dropdown_item('Created: Newest first', 'newest')}
          {@render dropdown_item('Created: Oldest first', 'oldest')}
          {@render dropdown_item('Name', 'name')}
          <!-- {@render dropdown_item('Random 🔥', 'random')} -->
        </ul>
      </div>

      <!-- Search -->
      <form action={ folder_id ? "/folder/" + folder_id + "/search" : "/search" }>
        <label class="input md:w-100 xl:w-180">
          <SearchIcon />
          <input name="q" type="search" required placeholder="Search" bind:value={searchString}/>
        </label>
      </form>

      {#if session}

        <!-- Greeting & Settings -->
        <div class="flex items-center gap-2 ml-2">
          <div class="hidden md:block">Hi <span class="font-bold">{profileName}</span>!</div>

          <div class="dropdown dropdown-end">
            <div tabindex="0" role="button" class="btn btn-ghost btn-circle m-1 px-1 justify-between">
              <SettingsIcon />
            </div>
            
            <ul class="menu dropdown-content bg-base-100 rounded-box z-1 w-32 p-2 shadow-sm">
              <li><a href="/profile">Profile</a></li>
              <li><button onclick={logout}>Logout</button></li>
            </ul>
          </div>
        </div>

      {:else}

        <!-- Log in & Sign up -->
        <div class="dropdown dropdown-end">
          <button class="btn btn-ghost">
            <a href="/login">Log in</a>
          </button>
          <button class="btn btn-accent">
            <a href="/signup">Sign up</a>
          </button>
        </div>

      {/if}
    </div>

    {@render children()}
  </div>

  <div class="drawer-side">
    <label for="my-drawer-2" aria-label="close sidebar" class="drawer-overlay"></label>
    <div class="flex flex-col justify-between bg-primary text-base-100 p-4 min-h-screen">
      <div>
        <!-- Logo -->
        <a href="/" class="flex gap-2">
          <img class="w-8 h-8" alt="The project logo" src={logo} />

          <h1 class="text-2xl text-accent font-chilanka">
            NAMUTREE
          </h1>
        </a>

        <!-- Folder List -->
        <ul class="menu w-50 text-base overflow-y-scroll h-[calc(100vh-150px)]">
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

      <div>

        <a href="https://www.flaticon.com/free-icons/eco-friendly" title="eco friendly icons" class="text-xs block font-chilanka text-primary-content/50 text-serif pt-1">Eco friendly icons created by <br/> Freepik - Flaticon</a>

        <!-- New folder button -->
        <button class="flex items-center gap-2 font-light text-base cursor-pointer" onclick={() => addingFolder = true}>
          <AddFolderIcon />
          New folder
        </button>
        
      </div>

    </div>
  </div>
</div>
