<script lang="ts">
	let firstName = $state('');
	let lastName = $state('');

	let nickname = $state('');
</script>

<div class="flex flex-col items-center content-center min-h-screen mt-15">
	<div class="grid grid-cols-6 gap-3 w-130">

		<div class="col-start-1 col-span-4">
			<h1 class="text-3xl font-bold col-start-1">Edit Profile</h1>
		</div>

	  <div class="col-start-1 col-end-4">
	  	<fieldset class="fieldset">
			  <legend class="fieldset-legend">First name</legend>
			  <input type="text" class="input" />
			</fieldset>
	  </div>

	  <div class="col-start-4 col-end-7">
	  	<fieldset class="fieldset">
			  <legend class="fieldset-legend">Last name</legend>
			  <input type="text" class="input" />
			</fieldset>
	  </div>

	  <div class="col-start-1 col-end-4">
	  	<fieldset class="fieldset">
			  <legend class="fieldset-legend">Nickname</legend>
			  <input type="text" class="input" />
			</fieldset>
	  </div>

	  <div class="col-start-1 col-end-4">
	  	<fieldset class="fieldset">
			  <legend class="fieldset-legend">Email</legend>
			  <input type="text" class="input" />
			</fieldset>
	  </div>

	  <div class="col-start-1 col-end-4">
	  	<fieldset class="fieldset">
			  <legend class="fieldset-legend">Password</legend>
			  <input type="text" class="input" />
			</fieldset>
	  </div>

	  <div class="col-start-4 col-end-7">
	  	<fieldset class="fieldset">
			  <legend class="fieldset-legend">Confirm Password</legend>
			  <input type="text" class="input" />
			</fieldset>
	  </div>

	  <div class="col-start-1 col-end-7 ...">
	  	
	  </div>

	  <div class="flex gap-1 col-end-6">
		  <button class="btn hover:text-white w-20">
	    	Cancel
	    </button>
	    <button class="btn btn-secondary text-white w-20">
	    	Save
	    </button>
    </div>

	</div>
</div>
