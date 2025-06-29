<script lang="ts">
  let { form }: PageProps = $props();

  let email = $derived(form?.email);
  let password = $derived(form?.password); 

  let error = $state(form?.missing || form?.incorrect);

  let emailMissing = $derived(form?.missing && !email);
  let passwordMissing = $derived(form?.missing && !password);

  let invalidCredentials = $derived(form?.incorrect);

  let errorStyle = "text-error italic mt-2";
</script>

<div class="hero min-h-[calc(100vh-64px)]">
  <div class="card bg-base-100 w-full max-w-sm shrink-0 shadow-sm">
    <div class="card-body">
      <form method="POST" action="?/login">

        <!-- Email -->
        <label class="label mb-2" for="email">Email</label>
        <input type="email" class={(emailMissing || invalidCredentials) ? "input input-error" : "input"} name="email" placeholder="Email" bind:value={email} />

        {#if emailMissing}
          <p class={errorStyle}>Email is required</p>
        {/if}

        <!-- Password -->
        <label class="label mt-3 mb-2" for="password">Password</label>
        <input type="password" class={(passwordMissing || invalidCredentials) ? "input input-error" : "input"} name="password" placeholder="Password" bind:value={password} />

        <div class="mt-2 underline"><a class="link link-hover">Forgot password?</a></div>

        {#if passwordMissing}
          <p class={errorStyle}>Password field is required</p>
        {/if}
        
        {#if invalidCredentials}
          <p class={errorStyle}>Invalid credentials</p>
        {/if}

        <!-- Buttons -->
        <button class="btn btn-neutral btn-outline mt-4 shadow-none">Login</button>
        <button class="btn btn-neutral mt-4 shadow-none" formaction="?/signup">Sign up</button>
      </form>
    </div>
  </div>
</div>
