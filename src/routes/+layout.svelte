<script>
    import "../app.css";
    export let data
</script>
<!-- Navbar -->
<div class="navbar bg-neutral">
    <div class="navbar-start">
    </div>
    <div class="navbar-center">
        <a class="btn btn-ghost normal-case text-xl" href="/">Quick Notes</a>
    </div>
    <div class="flex flex-row gap-4 navbar-end">
        {#if data?.profile}
        <form action="logout" method="POST">
            <button class="btn btn-secondary">Logout</button>
        </form>
        {:else}
        <a href="/login">
            <button class="btn btn-secondary">Login</button>
        </a>
        <a href="/register">
            <button class="btn btn-outline">register</button>
        </a>
        {/if}
    </div>
</div>

<slot />