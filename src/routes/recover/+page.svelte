<script lang="ts">
    import { enhance } from '$app/forms';
    import Alert from '../../components/Alert.svelte';
    export let form
    let isSubmitClicked:boolean | undefined
    $: formResponse = form
    $: isSubmitClicked = form === null || form?.success === true ? false : true

function handleSubmit(){
    isSubmitClicked = true
}
</script>

<div class="flex flex-col justify-center items-center w-full lg:h-[1000px] my-12 lg:my-0 rubik fade-in">
    <h3 class="text-5xl font-bold text-center my-2">Password Reset</h3>
    <p class="text-slate-500 px-8 lg:px-0">If the email exists we will send over a password reset form</p>
    <div class="flex content-center justify-center rounded-lg p-4 m-4 w-full lg:max-w-screen-sm h[800px]">
        <div class="card w-full bg-neutral shadow-xl p-12">
            <div class="card-body">
                <div class="flex flex-col justify-center items-center">
                    <form method="POST" class="flex flex-col w-full gap-6 items-center" use:enhance>
                        <div class="form-control w-full max-w-md">
                            <label class="label" for="email">
                                <span class="label-text">Email</span>
                            </label>
                            <input type="email" name="email" id="" class="input w-full">
                        </div>
                        <button class:loading = {isSubmitClicked} disabled={isSubmitClicked} on:click={handleSubmit} class="btn btn-primary">Send reset request</button>
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