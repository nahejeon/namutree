<script>
  import { invalidate } from '$app/navigation'
  import { onMount } from 'svelte'
  import "../app.css";

  let { data, children } = $props();
  let { session, supabase } = $derived(data);
  onMount(() => {
    const { data } = supabase.auth.onAuthStateChange((_, newSession) => {
      if (newSession?.expires_at !== session?.expires_at) {
        invalidate('supabase:auth');
      }
    })
    return () => data.subscription.unsubscribe();
  })
</script>

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
      
      <!-- Log in & Sign up -->
      <div class="dropdown dropdown-end">
        <button class="btn btn-ghost"><a href="/login">Log in</a></button>
        <button class="btn btn-accent"><a href="/signup">Sign up</a></button>
      </div>

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
        <div class="text-2xl font-semibold mb-2 text-accent">
          <a href="/">NamuTree</a>
        </div>
        <div>
          <ul class="menu w-50">
            <li><a href="/">All</a></li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</div>
