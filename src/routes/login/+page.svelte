<script lang="ts">
import { enhance } from '$app/forms';
import Alert from '../../components/Alert.svelte';
import { page } from '$app/stores';
export let form
let isSubmitClicked:boolean | undefined
$: formResponse = form
$: isSubmitClicked = form?.success

function handleSubmit(){
    isSubmitClicked = true
}
</script>
<div class="flex flex-col justify-center items-center w-full lg:h-[1000px] my-12 lg:my-0 rubik fade-in">
    <h3 class="text-5xl font-bold text-center my-2">Log in</h3>
    <p class="text-slate-500">Or <a href="/register" class="link link-primary">register</a> if you don't have an account!</p>
    <div class="flex content-center justify-center rounded-lg p-4 m-4 w-full lg:max-w-screen-sm h[800px]">
        <div class="card w-full bg-neutral shadow-xl p-12">
            <div class="card-body">
                <div class="flex flex-col justify-center items-center">
                    <form action="?/login" method="POST" class="flex flex-col w-full gap-6 items-center" use:enhance>
                        <div class="form-control w-full max-w-md">
                            <label class="label" for="email">
                                <span class="label-text">Email</span>
                            </label>
                            <input type="email" name="email" id="" class="input w-full">
                        </div>
                        <div class="form-control w-full max-w-md">
                            <label class="label" for="password">
                                <span class="label-text">Password</span>
                            </label>
                            <input type="password" name="password" id="" class="input w-full">
                        </div>
                        <button class:loading = {isSubmitClicked} disabled={isSubmitClicked} on:click={handleSubmit} class="btn btn-primary">Login</button>
                    </form>
                </div>
            </div>
          </div>
    </div>
</div>

{#if form}
  <div class="position-alert">
    <Alert success={formResponse?.success} message={formResponse?.message} />
  </div>
{/if}

<style>
    @keyframes fadeIn {
    from{opacity: 0}
    to{opacity: 100;}
  }
  .fade-in {
    opacity: 0;
    animation-name: fadeIn;
    animation-duration: .25s;
    animation-timing-function: ease-in-out;
    animation-fill-mode: forwards;
  }
    .rubik {
        font-family: 'Rubik', sans-serif;
    }
    .position-alert {
      display: block;
      position: absolute;
      margin-left: auto;
      margin-top: auto;
      top: 90%;
      left: 50%;
      transform: translate(-50%, -50%);
    }
</style>
<!-- {(console.log(form, isSubmitClicked))} -->