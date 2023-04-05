<script lang="ts">

</script>
<div class="flex flex-col justify-center items-center w-full lg:h-[1000px]">
    <h3 class="text-5xl font-bold text-center my-2">Register Account</h3>
    <p>Or sign in if you already have an account</p>
    <div class="flex content-center justify-center rounded-lg p-4 m-4 w-full lg:max-w-screen-sm h[800px]">
        <div class="card w-full bg-neutral shadow-xl p-12">
            <div class="card-body">
                <div class="flex flex-col justify-center items-center">
                    <form action="?/register" method="POST" class="flex flex-col w-full gap-6 items-center">
                        <div class="form-control w-full max-w-md">
                            <label for="name">Name</label>
                            <input type="text" name="name" id="" class="input w-full">
                        </div>
                        <div class="form-control w-full max-w-md">
                            <label for="email">Email</label>
                            <input type="email" name="email" id="" class="input w-full">
                        </div>
                        <div class="form-control w-full max-w-md">
                            <label for="password">Password</label>
                            <input type="password" name="password" id="" class="input w-full">
                        </div>
                        <div class="form-control w-full max-w-md">
                            <label for="passwordConfirm">Confirm Password</label>
                            <input type="password" name="passwordConfirm" id="" class="input w-full">
                        </div>
                        <button class="btn btn-primary">Register</button>
                    </form>
                </div>
            </div>
          </div>
    </div>
</div>