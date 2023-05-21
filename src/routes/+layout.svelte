<script>
    import "../app.css";
    export let data
    import 'iconify-icon'
    import { page } from '$app/stores';
</script>
<!-- Navbar -->
<div class="navbar bg-neutral px-12 rubik">
    <div class="navbar-start">
        {#if $page.route.id === '/dashboard'}
            <label for="my-drawer-2" class="btn btn-primary drawer-button lg:hidden">
                <iconify-icon icon="solar:notebook-outline" width="25px"></iconify-icon>
            </label>
        {:else}
            <a class="btn btn-ghost normal-case text-xl flex lg:hidden" href="/">PowerTasks</a>
        {/if}
    </div>
    <div class="navbar-center">
            <a class="btn btn-ghost normal-case text-xl hidden lg:flex" href="/">PowerTasks</a>
    </div>
    <div class="flex flex-row gap-4 navbar-end">
        <div class="hidden lg:flex lg:flex-row lg:gap-4">
            {#if data?.profile}
                <a href="/account">
                    <button class="btn btn-outline">
                        <iconify-icon icon="material-symbols:account-box" width="25px"></iconify-icon>
                    </button>
                </a>
                <form action="logout" method="POST">
                    <button class="btn btn-outline">Logout</button>
                </form>
            {:else}
                <a href="/login">
                    <button class="btn btn-accent">Login</button>
                </a>
                <a href="/register">
                    <button class="btn btn-outline">register</button>
                </a>
            {/if}
        </div>

        <div class="dropdown dropdown-end lg:hidden">
            <label tabindex="0" class="btn m-1">
                <iconify-icon icon="solar:hamburger-menu-line-duotone" width="35px"></iconify-icon>
            </label>
            <ul tabindex="0" class="dropdown-content menu p-2 shadow bg-base-300 rounded-box w-52">
                {#if data?.profile}
                {#if $page.route.id !== '/dashboard'}
                <li><a href="/dashboard">Dashboard</a></li>
                {/if}
                <li class="hover:cursor-pointer">
                    <form action="logout" method="POST">
                        <label>
                            <input type="submit" class="hidden">
                            <span>Logout</span>
                        </label>
                    </form>
                </li>
                {#if $page.route.id !== '/account'}
                    <li><a href="/account">Account</a></li>
                {/if}
                {:else}
                <li><a href="/login">Login</a></li>
                <li><a href="/register">Register</a></li>
                {/if}
            </ul>
        </div>
    </div>
</div>

<slot />

<style>
    .rubik {
        font-family: 'Rubik', sans-serif;
    }
</style>
<!-- {(console.log($page, isDashboard()))} -->