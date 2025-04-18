<script>
  let { children } = $props();
  import "../app.css";
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
    <div class="menu bg-primary text-base-100 min-h-full w-50 p-4">
      <div class="text-2xl font-semibold mb-2 text-accent">NamuTree</div>
      <li><a>All</a></li>
    </div>
  </div>
</div>
