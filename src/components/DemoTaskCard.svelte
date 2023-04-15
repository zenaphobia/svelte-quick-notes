<script lang="ts">

    interface Task {
        title: string,
        completed: boolean,
        id: number,
        is_editing: boolean
    }
    export let data:any

    let textArea = data.notes

    //This is to bind our inputs to the data.task object
    let dataTasks:Task[] = data.task

    //Binds the title
    let dataTitle = data.title.length > 0 ? data.title : 'Tasks for Today!'
    let is_editing_title = false

    //In order add this to our hidden input field, we first need to stringify it
    $: JSONTask = JSON.stringify(dataTasks)

    function newTask() {
      const _task:Task = {
        title: 'Task',
        completed: false,
        id: dataTasks.length,
        is_editing: false
      }

      dataTasks = [...dataTasks, _task]

      //Reordering ids and turning off is_editing
      for(let i = 0; i < dataTasks.length; i++) {
        dataTasks[i].id = i
        dataTasks[i].is_editing = false
      }

    }

    function deleteTask(index:number) {
      dataTasks = dataTasks.filter( item => { return item.id !== index } )

      //Reordering ids and turning off is_editing
      for(let i = 0; i < dataTasks.length; i++) {
        dataTasks[i].id = i
        dataTasks[i].is_editing = false
      }
    }

</script>

<div class="flex content-center justify-center rounded-lg p-4 w-full lg:w-1/3 h[600px]">
    <div class="card w-full bg-neutral shadow-xl">
        <div class="p-4 w-full">
            <textarea class="textarea textarea-primary w-full" name="notes" id="" cols="30" rows="3" bind:value={textArea} placeholder="Insert notes here..."></textarea>
        </div>
        <div class="card-body">
          {#if is_editing_title}
            <input class="input input-bordered w-full" type="text" name="title" on:blur={()=>{is_editing_title = false}} bind:value={dataTitle}>
          {:else}
            <h2 class="card-title" on:click={()=>{is_editing_title = true}} on:keypress={()=>{is_editing_title = true}}>{dataTitle}</h2>
          {/if}
          <div class="flex flex-col">
            {#each dataTasks as task}
              <div class="w-full flex flex-row my-1 justify-center items-center self-center">
                <input type="checkbox" class="checkbox mr-4" name={task.title} id="" checked={task.completed} on:change={()=>{task.completed = !task.completed}}>
                {#if task.is_editing}
                <input type="text" class="input input-bordered w-full" bind:value={task.title} on:blur={()=>{task.is_editing = false}}>
                {:else}
                <p class:line-through = {task.completed === true} on:click={()=>{task.is_editing = true}} on:keypress={()=>{task.is_editing = true}}>{task.title}</p>
                {/if}
                <button class="btn btn-outline h-1 justify-center align-middle self-center ml-4" on:click={()=>{deleteTask(task.id)}}>-</button>
            </div>
            {/each}
            <button class="btn btn-outline justify-center self-center content-center w-1/2 my-4" on:click={()=>{newTask()}}>New Task</button>
          </div>
          <div class="card-actions justify-end">
              <button class="btn btn-primary">Save Changes</button>
              <button class="btn btn-secondary">Delete</button>
          </div>
        </div>
      </div>
</div>

<style>
  *{
    transition: all 0.25s ease-in-out;
  }
</style>