<script lang="ts">
  import TaskCard from "../../components/TaskCard.svelte";
  import dog from '../../static/images/dog.svg';
  import { enhance } from "$app/forms";
  import Alert from "../../components/Alert.svelte";


  export let form
  export let data
  $: formResponse = form
  $: tasks = data
  let profile = data.profile
  let activeCollection = 0
  let col_form:any;
  $: activeCollectionData = tasks.items[activeCollection]
  $: isCollectionsLoading = form ? !form?.success : false
  $: isEditingCollectionName = false;

  function handleSubmit(){
    isCollectionsLoading = true
  }
  function changeCollection(index:number){
    activeCollection = index
  }

  function deleteCollection(){
    if(activeCollection === 0){
      activeCollection = 0;
      return
    }
    activeCollection = activeCollection - 1
  }
  </script>
<div class="drawer drawer-mobile">
    <input id="my-drawer-2" type="checkbox" class="drawer-toggle" />
    <div class="drawer-content p-4">
        <div class="flex flex-row text-3xl self-center my-4 justify-center rubik">
            <h3>Welcome back, <span class="font-bold">{profile.name} 👋</span></h3>
        </div>
        <div class="flex self-center justify-center w-full rubik">
          <form action="?/create" on:submit={handleSubmit} method="POST" class="flex self-center justify-center" use:enhance>
              <input type="hidden" name="collectionRecord" value={data?.items[activeCollection]?.id}>
              <button disabled={isCollectionsLoading} class:loading = {isCollectionsLoading} class="btn" class:btn-outline = {activeCollectionData?.tasks?.length > 0} class:btn-primary = {activeCollectionData?.tasks?.length === 0}>Create a new Task</button>
          </form>
        </div>
        <div class="flex flex-row flex-wrap p-4 rubik justify-center w-full">
            {#if activeCollectionData?.expand?.tasks}
                {#each activeCollectionData?.expand?.tasks as task, index (activeCollectionData.expand.tasks[index].id)}
                  <TaskCard form={formResponse} data={task}/>
                {/each}
            {:else}
              {#if tasks?.items.length !==0}
                <div class="fade-in">
                  <div class="flex flex-col w-full justify-center self-center text-center my-12">
                      <h3 class=" font-semibold text-xl">You have no tasks!</h3>
                      <p class="text-slate-500">Click the 'Create a New Task' Button to create your first task!</p>
                  </div>
                  <div class="flex justify-center self-center w-full grayscale opacity-20 my-4">
                      <img src={dog} class="h-44" alt="cute corgi sleeping">
                  </div>
                </div>
              {:else}
              <span>No Collection found, please create a new collection first!</span>
              {/if}
            {/if}
        </div>
    </div>
    <div class="drawer-side">
      <label for="my-drawer-2" class="drawer-overlay"></label>
      <ul class="menu p-6 w-80 bg-base-200 text-base-content gap-4">
        <h4 class="font-bold text-slate-400">Collections</h4>
        {#if tasks?.items?.length !== 0}
          {#each tasks.items as collections, i}
            <li class="flex flex-row justify-between bg-base-100 rounded-md cursor-pointer hover:bg-slate-600 active:bg-violet-600 active:text-white transition-all" on:click={()=>changeCollection(i)} on:keypress={()=>changeCollection(i)} class:bg-slate-600 = {activeCollection === i}>
              {#if isEditingCollectionName}
                <input class="input input-md w-32 self-center" bind:value={data.items[i].collection_name} on:change={()=>{col_form.requestSubmit()}} on:blur={()=>isEditingCollectionName = false} on:submit={()=>isEditingCollectionName = false}>
              {:else}
                <span class="active:bg-transparent hover:bg-transparent">{data.items[i].collection_name}</span>
              {/if}
              <div class="flex flex-row justify-between hover:bg-transparent">
                <form action="?/renameCollection" bind:this={col_form} class="hover:bg-transparent" method="POST" use:enhance>
                  <label class="flex justify-center self-center">
                    <iconify-icon icon="material-symbols:edit" on:click={()=>isEditingCollectionName = true} class=" transition-all cursor-pointer hover:text-slate-100" width="25px"></iconify-icon>
                  <input type="hidden" name="collection_name" value={tasks.items[i].collection_name}>
                  <input type="hidden" name="id" value={collections.id}>
                  <input type="hidden" name="author" value={collections.author}>
                </form>
                <form action="?/deleteCollection" class="hover:bg-transparent" method="POST" on:submit={()=>{deleteCollection(); handleSubmit()}} use:enhance>
                  <label class="flex justify-center self-center">
                    <input type="submit" class="hidden"/>
                    <iconify-icon class=" transition-all cursor-pointer hover:text-slate-100" icon="heroicons:trash-solid" width="25px"></iconify-icon>
                  </label>
                  <input type="hidden" name="id" value={collections.id}>
                  <input type="hidden" name="author" value={collections.author}>
                </form>
              </div>
            </li>
          {/each}
        {:else}
        <span>No collections found :(</span>
        {/if}
        <form action="?/createCollection" on:submit={handleSubmit} method="POST" use:enhance>
          <button disabled={isCollectionsLoading} class="btn btn-outline border-2 border-dashed btn-accent w-full">
            <iconify-icon class="px-1" icon="material-symbols:add-circle-outline" width="25px"></iconify-icon>
            Make new collection
          </button>
        </form>
        <!-- Sidebar content here -->
        <!-- <li class="bg-base-100 rounded-md"><a>Collection 1</a></li>
        <li class="bg-base-100 rounded-md"><a>Collection 2</a></li>
        <li class="btn btn-error btn-outline rounded-md"><a>Trash</a></li> -->
      </ul>
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
    .hidden-delete:hover .hidden-btn {
      opacity: 100;
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