<script lang="ts">
  let { data, form }: PageProps = $props();

  let invalidLink = $derived(data.invalid);

  let password = $derived(form?.password);
  let confirmPassword = $derived(form?.password);
  let passwordMissing = $derived(form?.missing && !password);

  let passwordValid = $derived(
    password && password.length >= 8 && containsNumber(password),
  );

  function containsNumber(str) {
    return /\d/.test(str);
  }
</script>

<div class="hero min-h-[calc(100vh-64px)]">
  <div class="card bg-base-100 w-full max-w-sm shrink-0 shadow-sm">
    <div class="card-body gap-0">
      {#if !invalidLink}
        <h3 class="text-2xl font-bold mb-3">Update password</h3>

        <!-- Password -->
        <form method="POST">
          <label class="label mt-3 mb-2" for="password">Password</label>
          <input
            type="password"
            class={passwordMissing
              ? "input input-error w-full"
              : "input w-full"}
            name="password"
            placeholder="Password"
            bind:value={password}
          />

          <ul
            class="ml-3 mt-2 list-disc text-xs text-black/30 italic marker:text-black/40"
          >
            <li
              class={password && password.length >= 8
                ? "text-emerald-400 marker:text-emerald-400"
                : ""}
            >
              Must contain at least 8 or more characters
              <span
                class="ml-2 text-sm text-emerald-400"
                hidden={!(password && password.length >= 8)}>✓</span
              >
            </li>
            <li
              class={password && containsNumber(password)
                ? "text-emerald-400 marker:text-emerald-400"
                : ""}
            >
              Must contain at least one number
              <span
                class="ml-2 text-sm text-emerald-400"
                hidden={!(password && containsNumber(password))}>✓</span
              >
            </li>
          </ul>

          <!-- Confirm password -->
          <label class="label mt-3 mb-2" for="password">Confirm password</label>
          <input
            type="password"
            class={passwordMissing
              ? "input input-error w-full"
              : "input w-full"}
            name="confirm-password"
            placeholder="Password"
            bind:value={confirmPassword}
          />

          <!-- Passwords don't match -->
          {#if confirmPassword && password != confirmPassword}
            <p class="text-error text-xs italic mt-2">Passwords don't match</p>
          {/if}

          <!-- Success -->
          {#if form?.success && !password}
            <p class="text-success text-xs italic mt-2">Successfully updated</p>
          {/if}

          <button
            class="btn btn-neutral w-full shadow-none mt-8"
            disabled={!passwordValid || password != confirmPassword}
            >Update password</button
          >
        </form>
      {:else}
        <div class="flex flex-col">
          <h3 class="text-2xl font-bold mb-3 self-center">
            Link invalid or expired
          </h3>

          <a
            class="btn btn-neutral btn-wide shadow-none self-center mt-3"
            href="/login">Get other one</a
          >
        </div>
      {/if}
    </div>
  </div>
</div>
