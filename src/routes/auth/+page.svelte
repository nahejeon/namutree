<!-- Login form -->
<div class="hero min-h-screen">
  <div class="card bg-base-100 w-full max-w-sm shrink-0 shadow-2xl">
    <div class="card-body">
      <form method="POST" action="?/login">
        <label class="label" for="email">Email</label>
        <input type="email" class="input" name="email" placeholder="Email" />
        <label class="label" for="password">Password</label>
        <input type="password" class="input" name="password" placeholder="Password" />
        <div><a class="link link-hover">Forgot password?</a></div>
        <button class="btn btn-neutral mt-4">Login</button>
        <button class="btn btn-neutral mt-4" formaction="?/signup">Sign up</button>
      </form>
    </div>
  </div>
</div>
