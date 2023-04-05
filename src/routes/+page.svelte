<script lang="ts">

    // interface Task {
    //     title:string;
    //     completed: boolean,
    //     id: number;
    // }

    // let demoData:Task;

    $: demoData = [
        {title: 'Take out trash', completed: true, id: 0},
        {title: 'buy groceries', completed: false, id: 1},
        {title: 'Take Molly to the airport', completed: false, id:<number> 2}
    ]

    function toggleComplete(index:number) {
        demoData[index].completed = !demoData[index].completed;
    }

</script>
<div class="flex flex-col lg:flex-row justify-evenly items-center w-full lg:h-[1000px]">
    <div class="flex flex-col justify-center items-center w-full lg:max-w-screen-sm">
        <h3 class="text-5xl font-bold text-center my-2">Log in</h3>
        <p>Or register if you don't have an account!</p>
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
    <div class="flex content-center justify-center rounded-lg p-4 m-4 w-full lg:max-w-screen-sm h[600px]">
        <div class="card w-full bg-neutral shadow-xl">
            <div class="p-4 w-full">
                <textarea class="textarea textarea-primary w-full" name="notes" id="" cols="30" rows="5" placeholder="Insert notes here..."></textarea>
            </div>
            <div class="card-body">
              <h2 class="card-title">Errands for today</h2>
              {#each demoData as task}
                <div class="w-full flex flex-row">
                    <input type="checkbox" class="checkbox mr-4" name={task.title} id="" checked={task.completed} on:change={()=>toggleComplete(task.id)}>
                    <p class:line-through = {task.completed === true}>{task.title}</p>
                </div>
              {/each}
              <div class="card-actions justify-end">
                <button class="btn btn-primary">Buy Now</button>
              </div>
            </div>
          </div>
    </div>
</div>