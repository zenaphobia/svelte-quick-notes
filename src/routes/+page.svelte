<script lang="ts">
	import TaskCard from "../components/TaskCard.svelte";
    import DemoTaskCard from "../components/DemoTaskCard.svelte";
    import bkg from '../static/images/corgi-bkg.svg'

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
<div class="hero min-h-[500px] h-auto bg-base-300 mb-24 lg:mb-0 rubik fade-in">
    <div class="hero-content justify-between flex-col lg:flex-row-reverse w-full">
    <img src={bkg} class="rounded-lg shadow-2xl object-cover h-[400px] image-full" alt="Toast, the corgi" />
      <div class="">
        <h1 class="text-6xl font-bold">PowerTasks</h1>
        <div class="py-6">
            <p class=" text-lg">The all-in-one solution for keeping all your tasks organized on the go!</p>
        </div>
        <a href="/register"><button class="btn btn-primary">Get Started</button></a>
      </div>
    </div>
</div>
<div class="flex w-full justify-center py-12 lg:py-32 rubik fade-in">
    <div class="flex flex-row flex-wrap w-3/4">
        <div class="w-full lg:w-1/3 px-0 lg:px-4 py-8 lg:py-0">
            <div class="flex justify-center">
                <iconify-icon icon="material-symbols:task" class="flex self-center" width="100px"></iconify-icon>
            </div>
            <h3 class="text-2xl font-bold text-center">Easy Task Management</h3>
            <p class="text-slate-500 text-center py-1">
                Create, update, and organize your tasks effortlessly! Stay focused on what matters most.
            </p>
        </div>
        <div class="w-full lg:w-1/3 px-0 lg:px-4 py-8 lg:py-0">
            <div class="flex justify-center">
                <iconify-icon icon="material-symbols:cloud-download" width="100px"></iconify-icon>
            </div>
            <h3 class="text-2xl text-center font-bold">Access anywhere</h3>
            <p class="text-slate-500 text-center py-1">
                All your tasks and collections are securely stored in the cloud. Access them anytime, anywhere, and from any device!
            </p>
        </div>
        <div class="w-full lg:w-1/3 px-0 lg:px-4 py-8 lg:py-0">
            <div class="flex justify-center">
                <iconify-icon icon="fluent:collections-add-20-filled" width="100px"></iconify-icon>
            </div>
            <h3 class="text-2xl font-bold text-center">Intuitive organization</h3>
            <p class="text-slate-500 text-center py-1">
                Say goodbye to scattered notes and hello to efficient organization. Create custom collections and organize your tasks the way you want!
            </p>
        </div>
    </div>
</div>
<div>

</div>
<div class="flex flex-col lg:flex-row justify-evenly items-center w-full fade-in bg-base-300 rubik p-4 py-4 lg:py-12">
    <div class="flex flex-col content-start p-4 lg:p-0">
        <div class="flex flex-col pb-4">
            <h3 class="text-3xl font-bold pb-1">Sign up today!</h3>
            <p class="text-slate-500">Register for free and never see your tasks unorganized again!</p>
        </div>
        <a href="/register" class="w-full"><button class="btn btn-primary w-full">Register</button></a>
    </div>
    {#each demoData as task}
        <DemoTaskCard data={task}/>
    {/each}
</div>

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
</style>