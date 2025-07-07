<script lang="ts">
  let { form }: PageProps = $props();
  import { DotLottie } from '@lottiefiles/dotlottie-web';

  let email = $derived(form?.email);
  let password = $derived(form?.password);

  let invalidCredentials = $derived(form?.incorrect);

  let forgotPassword = $state(false);

  let resetSent = $derived(form?.resetSent);
  let resetFail = $derived(form?.resetFail);

  let canvas;

  $effect(() => {
    if (resetSent) {
      new DotLottie({
        autoplay: true,
        loop: true,
        canvas: canvas,
        src: "https://lottie.host/fb6790b1-0866-494f-ac64-158ee530b5ab/wd9zKrJXiI.lottie",
      });
    }
  });
</script>

<div class="hero min-h-[calc(100vh-64px)]">
  <div class="card bg-base-100 w-full max-w-sm shrink-0 shadow-sm">
    <div class="card-body gap-0">
      {#if resetSent}

        <!-- Recovery email sent -->
        <div class="flex flex-col items-center pt-3 pb-6">
          <h3 class="text-2xl font-bold mb-0">Email sent!</h3>
          <h4 class="text-xl font-medium text-gray-300 mb-5">Check your inbox</h4>

          <canvas id="dotlottie-canvas" style="width: 100px; height: 100px;" bind:this={canvas}></canvas>
        </div>

      {:else if !forgotPassword}

        <!-- Default view -->
        <form method="POST" action="?/login">

          <h3 class="text-2xl font-bold mb-0">Welcome back!</h3>
          <h4 class="text-xl font-medium text-gray-300 mb-5">Let's continue your journey</h4>

          <!-- Email -->
          <label class="label mb-2" for="email">Email</label>
          <input type="email" class="input w-full" name="email" placeholder="Email" bind:value={email} />

          <!-- Password -->
          <label class="label mt-3 mb-2" for="password">Password</label>
          <input type="password" class={ invalidCredentials ? "input input-error w-full" : "input w-full"} name="password" placeholder="Password" bind:value={password} />
          
          {#if invalidCredentials}
            <p class="text-error text-xs italic mt-2">Wrong password</p>
          {/if}

          <div class="mt-2 underline text-gray-700"><button class="link" onclick={() => forgotPassword = true} type="button">Forgot password?</button></div>

          <!-- Buttons -->
          <button class="btn btn-neutral mt-4 shadow-none w-full mt-6" disabled={!email || !password}>Login</button>

        </form>

      {:else}

        <!-- Recovery flow -->
        <form method="POST" action="?/resetPassword">

          <h3 class="text-2xl font-bold mb-0 ">Enter your email</h3>
          <h4 class="text-xl font-medium text-gray-400 mb-5">We'll send you a recovery link</h4>

          <!-- Email -->
          <label class="label mb-2" for="email">Email</label>
          <input type="email" class="input w-full" name="email" placeholder="Email" bind:value={email} />

          <div class="flex flex-col mt-3">

            <button class="btn btn-neutral shadow-none w-full">Send</button>

            <div class="mt-2 underline text-gray-700 self-center">
              <button class="link" onclick={() => forgotPassword = false}>Go back</button>
            </div>

          </div>

          {#if resetFail}
            <p class="text-error text-xs italic mt-2">Request failed. Try again after 5 seconds.</p>
          {/if}

        </form>

      {/if}

    </div>
  </div>
</div>
