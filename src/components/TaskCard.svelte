<script lang="ts">
	import { enhance } from '$app/forms';

    interface Task {
        title: string,
        completed: boolean,
        id: number,
        is_editing: boolean
    }
    export let data:any
    export let form
    let textArea = data.notes
    //This is to bind our inputs to the data.task object
    let dataTasks:Task[] = data.task
    //Binds the title
    let dataTitle = data.title.length > 0 ? data.title : 'Tasks for Today!'
    let is_editing_title = false
    $: isSaving = form ? !form?.success : false
    //In order add this to our hidden input field, we first need to stringify it
    $: JSONTask = JSON.stringify(dataTasks)

    async function handleSubmit(){
      isSaving = true
    }

    function newTask() {
      const _task:Task = {
        title: 'Task',
        completed: false,
        id: dataTasks.length,
        is_editing: false
      }

      dataTasks = [...dataTasks, _task]

      //Reordering ids and turning off is_editing
      reorderList(dataTasks)
    }

    function deleteTask(index:number) {
      dataTasks = dataTasks.filter( item => { return item.id !== index } )

      //Reordering ids and turning off is_editing
      reorderList(dataTasks)
    }

//start of drag and drop system
let hovering = null;

const drop = (event, target) => {
  event.dataTransfer.dropEffect = 'move';
  const start = parseInt(event.dataTransfer.getData("text/plain"));
  const newTracklist = dataTasks

  if (start < target) {
    newTracklist.splice(target + 1, 0, newTracklist[start]);
    newTracklist.splice(start, 1);
  } else {
    newTracklist.splice(target, 0, newTracklist[start]);
    newTracklist.splice(start + 1, 1);
  }
  reorderList(newTracklist)
  dataTasks = newTracklist
  hovering = null
}

const dragstart = (event, i) => {
  event.dataTransfer.effectAllowed = 'move';
  event.dataTransfer.dropEffect = 'move';
  const start = i;
  event.dataTransfer.setData('text/plain', start);
}
//end drag and drop system

function taskInit(el){
  el.focus()
}

function reorderList(task:Task[]){
  if(task.length <= 1){
    task[0].id = 0
  }
  else{
    for(let i = 0; i < task.length; i++) {
        dataTasks[i].id = i
        dataTasks[i].is_editing = false
    }
  }
}

</script>

<div class="flex content-center justify-center rounded-lg p-4 w-full xl:w-1/3 h[600px] fade-in">
    <div class="card w-full bg-neutral shadow-xl">
        <div class="p-4 w-full">
            <textarea class="textarea textarea-primary w-full" name="notes" id="" cols="30" rows="3" bind:value={textArea} placeholder="Insert notes here..."></textarea>
        </div>
        <div class="card-body">
          {#if is_editing_title}
            <input class="input input-bordered w-full" type="text" name="title" on:blur={()=>{is_editing_title = false}} bind:value={dataTitle}>
          {:else}
            <h2 class="card-title" on:click={()=>{is_editing_title = true}} on:keyup={()=>{is_editing_title = true}}>{dataTitle}</h2>
          {/if}
          <div class="flex flex-col">
            {#each dataTasks as task, index (task.id)}
              <div class:opacity-25 = {hovering === task.id} class:bg-base-100 = {hovering === task.id} class=" hidden-delete w-full flex flex-row my-1 p-2 rounded-lg justify-center items-center self-center task"
              on:dragstart={event => dragstart(event, index)}
              on:drop|preventDefault={event=>drop(event, index)}
              on:dragover|preventDefault
              on:dragenter={()=>hovering = index}
              draggable={true}>
                <input type="checkbox" class="checkbox mr-4" name={task.title} id="" checked={task.completed} on:change={()=>{task.completed = !task.completed}}>
                {#if task.is_editing}
                  <input type="text" use:taskInit class="input input-bordered w-full"  bind:value={task.title} on:blur={()=>{task.is_editing = false}}>
                {:else}
                  <p class:line-through = {task.completed === true} on:click={()=>{task.is_editing = true}} on:keypress={()=>{task.is_editing = true}}>{task.title}</p>
                {/if}
                  <button class="flex h-1 justify-center content-center self-center ml-4 border-0 md:opacity-10 md:hover:opacity-100 hidden-btn" on:click={()=>{deleteTask(task.id)}}>
                    <iconify-icon class="transition-all cursor-pointer hover:text-slate-100 self-center opacity-100" icon="heroicons:trash-solid" width="25px"></iconify-icon>
                  </button>
              </div>
            {/each}
            <button class="btn btn-outline justify-center self-center content-center w-1/2 my-4 hidden-btn" on:click={()=>{newTask()}}>
              <iconify-icon icon="material-symbols:add" width="25" height="25"></iconify-icon>
              New Task
            </button>
          </div>
          <div class="card-actions justify-end">
            <form action="?/save" method="POST" on:submit={handleSubmit} use:enhance>
              <input type="hidden" name="title" value={dataTitle}>
              <input type="hidden" name="id" value={data.id}>
              <input type="hidden" name="notes" value={textArea}>
              <input type="hidden" name="task" value={JSONTask}>
              <input type="hidden" name="collectionRecord" value={data.parent_collection}>
              <button disabled={isSaving} class="btn btn-primary">Save Changes</button>
            </form>
            <form action="?/delete" on:submit={handleSubmit} method="POST" use:enhance>
              <input type="hidden" name="id" value={data.id}>
              <button disabled={isSaving} class="btn btn-secondary">Delete</button>
            </form>
          </div>
        </div>
      </div>
</div>

<svelte:window on:keydown={(e)=>{
  if(e.keyCode === 13){
    is_editing_title = false
  }}}/>

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
  *{
    transition: all 0.25s ease-in-out;
  }
  .delete-btn{
    opacity: 0;
  }
  .task:hover{
    cursor: pointer;
  }
  .task:hover .delete-btn {
    opacity: 1;
  }
  .hidden-delete:hover .hidden-btn {
      opacity: 100;
  }

</style>