<script lang="ts">
	import type { PageProps } from './$types';

  let { data }: PageProps = $props();

  let profile = $derived(data.profile[0]);

	let firstName = $derived(profile?.first_name);
	let lastName = $derived(profile?.last_name);

	let nickname = $derived(profile?.nickname);

	let email = $derived(data.email);
</script>

<div class="flex flex-col items-center min-h-screen mt-15">

	<form class="fieldset grid grid-cols-6 gap-3 w-130" method="POST">
		<h1 class="col-start-1 col-end-3 text-3xl font-bold">Edit Profile</h1>

	  <div class="col-start-1 col-end-4">
		  <legend class="fieldset-legend">First name</legend>
		  <input type="text" class="input" name="firstname" bind:value={firstName}/>
	  </div>

	  <div class="col-start-4 col-end-7">
		  <legend class="fieldset-legend">Last name</legend>
		  <input type="text" class="input" name="lastname" bind:value={lastName} />
	  </div>

	  <div class="col-start-1 col-end-4">
		  <legend class="fieldset-legend">Nickname</legend>
		  <input type="text" class="input" name="nickname" bind:value={nickname} />
	  </div>

	  {#if email}
		  <div class="col-start-1 col-end-7">
			  <div class="divider" />
			</div>

		  <div class="col-start-1 col-end-4">
			  <legend class="fieldset-legend">Email</legend>
			  <p class="text-base font-medium pt-1 pb-2">{email}</p>
		  </div>

		  <div class="col-start-1 col-end-4">
			  <legend class="fieldset-legend">Password</legend>
			  <input type="text" class="input" />
		  </div>

		  <div class="col-start-4 col-end-7">
			  <legend class="fieldset-legend">Confirm Password</legend>
			  <input type="text" class="input" />
		  </div>
	  {/if}

	  <div class="flex gap-1 col-start-1 col-end-6 mt-3">
		  <button formaction="?/cancel" class="btn hover:text-white w-20">
	    	Cancel
	    </button>
	    <button formaction="?/update" class="btn btn-secondary text-white w-20">
	    	Save
	    </button>
    </div>
  </form>

</div>
