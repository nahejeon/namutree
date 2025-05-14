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
      <div class="flex justify-center gap-3">
        <a href="/auth">Log in</a>
        <a href="/signup">Sign up</a>
      </div>
    </div>
  </div>
</div>
