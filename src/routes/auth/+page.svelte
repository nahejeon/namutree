<script lang="ts">
  let errorMessage = $state('');
</script>

<!-- Login form -->
<div class="hero min-h-[calc(100vh-64px)]">
  <div class="card bg-base-100 w-full max-w-sm shrink-0 shadow-sm">
    <div class="card-body">
      <form method="POST" action="?/login">

        <label class="label mb-2" for="email">Email</label>
        <input type="email" class="input" name="email" placeholder="Email" />

        <label class="label mt-3 mb-2" for="password">Password</label>
        <input type="password" class="input" name="password" placeholder="Password" />
        <div class="mt-2"><a class="link link-hover">Forgot password?</a></div>

        <p class="mt-2 text-error italic">{errorMessage}</p>

        <button class="btn btn-neutral btn-outline mt-4 shadow-none">Login</button>
        <button class="btn btn-neutral mt-4 shadow-none" formaction="?/signup">Sign up</button>
      </form>
    </div>
  </div>
</div>
