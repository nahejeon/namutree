<script lang="ts">
  import { invalidate } from '$app/navigation'
  import { onMount } from 'svelte'
  import "../app.css";
  import FolderListItem from './FolderListItem.svelte';

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

  const foldersDummy = [{name: "Russian"}, {name:"일본어"}, {name: "Arabic"}]

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
          <svg class="w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none">
            <path d="M5.47719 7.96225C5.1802 8.25099 5.17351 8.72582 5.46225 9.02281C5.75099 9.3198 6.22582 9.32649 6.52281 9.03775L5.47719 7.96225ZM9.6 5H10.35C10.35 4.69857 10.1695 4.42644 9.89188 4.30913C9.61422 4.19182 9.29331 4.25214 9.07719 4.46225L9.6 5ZM8.85 19C8.85 19.4142 9.18579 19.75 9.6 19.75C10.0142 19.75 10.35 19.4142 10.35 19H8.85ZM18.5228 16.0377C18.8198 15.749 18.8265 15.2742 18.5377 14.9772C18.249 14.6802 17.7742 14.6735 17.4772 14.9623L18.5228 16.0377ZM14.4 19H13.65C13.65 19.3014 13.8305 19.5736 14.1081 19.6909C14.3858 19.8082 14.7067 19.7479 14.9228 19.5377L14.4 19ZM15.15 5C15.15 4.58579 14.8142 4.25 14.4 4.25C13.9858 4.25 13.65 4.58579 13.65 5H15.15ZM6.52281 9.03775L10.1228 5.53775L9.07719 4.46225L5.47719 7.96225L6.52281 9.03775ZM8.85 5V19H10.35V5H8.85ZM17.4772 14.9623L13.8772 18.4623L14.9228 19.5377L18.5228 16.0377L17.4772 14.9623ZM15.15 19V5H13.65V19H15.15Z" fill="#000000"/>
          </svg>
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
        <svg class="h-[1em] opacity-50" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
          <g
            stroke-linejoin="round"
            stroke-linecap="round"
            stroke-width="2.5"
            fill="none"
            stroke="currentColor"
          >
            <circle cx="11" cy="11" r="8"></circle>
            <path d="m21 21-4.3-4.3"></path>
          </g>
        </svg>
        <input type="search" required placeholder="Search" />
      </label>

      {#if !session?.user.is_anonymous}
        <!-- Greeting & Settings -->
         <div class="dropdown dropdown-end">
          <div tabindex="0" role="button" class="btn btn-ghost btn-circle m-1 px-1 justify-between">
            <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" fill="#888888" version="1.1" id="Layer_1" viewBox="0 0 472.615 472.615" xml:space="preserve">
              <path d="M472.615,274.117V198.4l-55.335-9.255c-4.332-16.64-10.929-32.492-19.692-47.458L430.178,96l-53.563-53.563    l-45.686,32.591c-14.966-8.763-30.917-15.36-47.557-19.692L274.215,0H198.4l-9.157,55.335    c-16.64,4.332-32.591,10.929-47.557,19.692L96,42.437L42.437,96l32.591,45.686c-8.763,14.966-15.36,30.818-19.692,47.458L0,198.4    v75.717l55.335,9.255c4.332,16.64,10.929,32.591,19.692,47.557l-32.591,45.686L96,430.178l45.686-32.689    c14.966,8.862,30.917,15.458,47.557,19.791l9.157,55.335h75.815l9.157-55.335c16.64-4.332,32.591-10.929,47.557-19.791    l45.686,32.689l53.563-53.563l-32.591-45.686c8.763-14.966,15.36-30.917,19.692-47.557L472.615,274.117z M236.308,334.769    c-54.252,0-98.462-44.209-98.462-98.462c0-54.351,44.209-98.462,98.462-98.462s98.462,44.111,98.462,98.462    C334.769,290.56,290.56,334.769,236.308,334.769z"/>
            </svg>
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

              {#each foldersDummy as folder}
                <FolderListItem folder={folder} addingNew={false}/>
              {/each}

              {#if addingFolder}
                <FolderListItem addingNew bind:addingFolder />
              {/if}

            </ul>
            
          </li> 
        </ul>
      </div>

      <!-- New folder button -->
      <button class="flex items-center gap-2 font-light text-base cursor-pointer" onclick={() => addingFolder = true}>
        <svg xmlns="http://www.w3.org/2000/svg" class="fill-none stroke-3 stroke-white w-7" viewBox="0 0 64 64">
          <circle cx="32" cy="32" r="24"/>
          <line x1="20" y1="32" x2="44" y2="32"/>
          <line x1="32" y1="20" x2="32" y2="44"/>
        </svg>
        New folder
      </button>
    </div>
  </div>
</div>

<!-- <a href="https://iconscout.com/icons/tree" class="text-underline font-size-sm" target="_blank">Tree</a> by <a href="https://iconscout.com/contributors/chamedesign" class="text-underline font-size-sm" target="_blank">Chamestudio</a> -->
