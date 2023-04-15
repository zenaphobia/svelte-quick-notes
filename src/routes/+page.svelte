<script lang="ts">
	import TaskCard from "../components/TaskCard.svelte";
    import DemoTaskCard from "../components/DemoTaskCard.svelte";

    $: demoData = [
        {notes: '', title: 'Task 1', task: [
  {
    "completed": false,
    "id": 0,
    "is_editing": false,
    "title": "Take out Trash"
  },
  {
    "completed": false,
    "id": 1,
    "is_editing": false,
    "title": "Take Molly to the airport"
  },
  {
    "completed": false,
    "id": 2,
    "is_editing": false,
    "title": "Walk the dog"
  }
]},
]

</script>
<div class="flex flex-col lg:flex-row justify-evenly items-center w-full lg:h-[1000px] rubik">
    <div class="flex flex-col justify-center items-center w-full lg:max-w-screen-sm">
        <h3 class="text-5xl font-bold text-center my-2">Log in</h3>
        <p>Or <a href="/register" class="underline">register</a> if you don't have an account!</p>
        <div class="flex content-center justify-center rounded-lg p-4 m-4 w-full lg:max-w-screen-sm h[800px]">
            <div class="card w-full bg-neutral shadow-xl p-12">
                <div class="card-body">
                    <div class="flex flex-col justify-center items-center">
                        <form action="?/login" method="POST" class="flex flex-col w-full gap-6 items-center">
                            <div class="form-control w-full max-w-md">
                                <label for="email">Email</label>
                                <input type="email" name="email" id="" class="input w-full">
                            </div>
                            <div class="form-control w-full max-w-md">
                                <label for="password">Password</label>
                                <input type="password" name="password" id="" class="input w-full">
                            </div>
                            <button class="btn btn-primary">Login</button>
                        </form>
                    </div>
                </div>
              </div>
        </div>
    </div>
    {#each demoData as task}
        <DemoTaskCard data={task}/>
    {/each}
</div>

<style>
    .rubik {
        font-family: 'Rubik', sans-serif;
    }
</style>