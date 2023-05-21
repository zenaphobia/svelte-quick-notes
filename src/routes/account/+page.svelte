<script>
export let data

let userData = data.userData

</script>
<input type="checkbox" id="my-modal-4" class="modal-toggle" />
<label for="my-modal-4" class="flex modal cursor-pointer">
  <label class="modal-box relative" for="">
    <h3 class="text-lg font-bold">Are you sure?</h3>
    <p class="py-4">Click the button below to delete your account.</p>
    <div class="flex self-end">
        <form action="actions?/deleteAccount" method="POST"><button class="flex btn btn-accent self-end">Delete Account</button></form>
    </div>
  </label>
</label>
<div class="p-4 rubik">
    <div class="flex flex-col sm:w-full md:w-1/2 lg:mx-auto justify-center content-center m-auto my-24 rounded-lg bg-neutral p-16">
        <div class="flex flex-col mb-8">
            <h1 class="text-4xl font-bold">Account Information</h1>
        </div>
        <div class="flex flex-row flex-wrap">
            <div class="flex gap-12">
                <div class="flex flex-col">
                    <label class="label" for="name">
                        <span class="label-text text-lg text-slate-400">Name</span>
                    </label>
                    <input class="input input-sm input-bordered w-full max-w-xs" name="name" type="text" bind:value={userData.name}>
                </div>
                <div>
                    <label class="label" for="username">
                        <span class="label-text text-lg text-slate-400">Username</span>
                    </label>
                    <input class="input input-sm input-bordered w-full max-w-xs" name="username" type="text" bind:value={userData.username}>
                </div>
            </div>
        </div>
        <div class="flex flex-row flex-wrap content-center my-4">
            <!-- <button class="btn btn-primary m-1">Make changes</button> -->
            <label for="my-modal-4" class="btn btn-accent btn-outline m-1">Delete Account</label>
        </div>
    </div>
</div>

<style>
    .rubik {
        font-family: 'Rubik', sans-serif;
    }
</style>
