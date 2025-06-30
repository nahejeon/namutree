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

	  {#if email}
		  <div class="col-start-1 col-end-4">
			  <legend class="fieldset-legend">Email</legend>
			  <p class="text-base font-medium pt-1 pb-2">{email}</p>
		  </div>

		  <div class="col-start-4 col-end-7">
			  <legend class="fieldset-legend">Password</legend>
				  <a class="col-start-3 col-end-5 btn btn-link shadow-none" href="/profile/update-password">
		  		Change password
		  	</a>
		  </div>
	  {/if}

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

	  <div class="flex gap-1 col-start-1 mt-9">
		  <button formaction="?/cancel" class="btn hover:text-white w-20">
	    	Cancel
	    </button>
	    <button formaction="?/update" class="btn btn-success w-20 shadow-none">
	    	Save
	    </button>
    </div>
  </form>

</div>
