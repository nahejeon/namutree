<!-- Login form -->
<div class="hero min-h-screen">
  <div class="card bg-base-100 w-full max-w-sm shrink-0">
    <div class="card-body">

      <div class="flex flex-col gap-1">
        <!-- Google -->
        <button class="btn bg-white text-black border-[#e5e5e5]">
          <svg aria-label="Google logo" width="16" height="16" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><g><path d="m0 0H512V512H0" fill="#fff"></path><path fill="#34a853" d="M153 292c30 82 118 95 171 60h62v48A192 192 0 0190 341"></path><path fill="#4285f4" d="m386 400a140 175 0 0053-179H260v74h102q-7 37-38 57"></path><path fill="#fbbc02" d="m90 341a208 200 0 010-171l63 49q-12 37 0 73"></path><path fill="#ea4335" d="m153 219c22-69 116-109 179-50l55-54c-78-75-230-72-297 55"></path></g></svg>
          Continue with Google
        </button>
      
        <!-- Apple -->
        <button class="btn bg-white text-black border-[#e5e5e5]">
          <svg aria-label="Apple logo" width="16" height="16" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1195 1195"><path fill="black" d="M1006.933 812.8c-32 153.6-115.2 211.2-147.2 249.6-32 25.6-121.6 25.6-153.6 6.4-38.4-25.6-134.4-25.6-166.4 0-44.8 32-115.2 19.2-128 12.8-256-179.2-352-716.8 12.8-774.4 64-12.8 134.4 32 134.4 32 51.2 25.6 70.4 12.8 115.2-6.4 96-44.8 243.2-44.8 313.6 76.8-147.2 96-153.6 294.4 19.2 403.2zM802.133 64c12.8 70.4-64 224-204.8 230.4-12.8-38.4 32-217.6 204.8-230.4z"></path></svg>
          Continue with Apple
        </button>
      
        <!-- Microsoft -->
        <button class="btn bg-white text-black border-[#e5e5e5]">
          <svg aria-label="Microsoft logo" width="16" height="16" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path d="M96 96H247V247H96" fill="#f24f23"></path><path d="M265 96V247H416V96" fill="#7eba03"></path><path d="M96 265H247V416H96" fill="#3ca4ef"></path><path d="M265 265H416V416H265" fill="#f9ba00"></path></svg>
          Continue with Microsoft
        </button>
      </div>

      <div class="divider"></div>

      <form method="POST" action="?/login">
        <label class="label mb-1" for="email">Email</label>
        <input type="email" class="input" name="email" placeholder="Email" />

        <label class="label mt-3  mb-1" for="password">Password</label>
        <input type="password" class="input mb-1.5" name="password" placeholder="Password" />
        <div><a class="link link-hover">Forgot password?</a></div>

        <button class="btn btn-neutral mt-4 w-full">Continue</button>
        <!-- <button class="btn btn-neutral mt-4" formaction="?/signup">Sign up</button> -->
      </form>
    </div>
  </div>
</div>
