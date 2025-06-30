<script lang="ts">
  let { form }: PageProps = $props();

  let email = $derived(form?.email);
  let password = $derived(form?.password);

  let invalidCredentials = $derived(form?.incorrect);
</script>

<div class="hero min-h-[calc(100vh-64px)]">
  <div class="card bg-base-100 w-full max-w-sm shrink-0 shadow-sm">
    <div class="card-body gap-0">
      <form method="POST" action="?/login">

        <h3 class="text-2xl font-bold mb-0">Welcome back!</h3>
        <h3 class="text-xl font-medium text-gray-300 mb-5">Let's continue your journey</h3>

        <!-- Email -->
        <label class="label mb-2" for="email">Email</label>
        <input type="email" class="input w-full" name="email" placeholder="Email" bind:value={email} />

        <!-- Password -->
        <label class="label mt-3 mb-2" for="password">Password</label>
        <input type="password" class={ invalidCredentials ? "input input-error w-full" : "input w-full"} name="password" placeholder="Password" bind:value={password} />
        
        {#if invalidCredentials}
          <p class="text-error text-xs italic mt-2">Wrong password</p>
        {/if}

        <div class="mt-2 underline text-gray-700"><a class="link link-hover">Forgot password?</a></div>

        <!-- Buttons -->
        <button class="btn btn-neutral mt-4 shadow-none w-full mt-6" disabled={!email || !password}>Login</button>
      </form>
    </div>
  </div>
</div>
