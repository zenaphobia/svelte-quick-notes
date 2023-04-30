<script lang="ts">
    export let success:Boolean | undefined, message:string | undefined
    import { fade } from 'svelte/transition';
    let visible = true;
</script>

{#if visible}
    <div class="alert alert-success content-center justify-center self-center shadow-lg w-auto h-12"
    in:fade="{{duration: 250}}"
    out:fade="{{duration: 250, delay: 3000}}"
    on:introend="{()=>{visible = false}}"
    on:click={()=>visible = false}
    on:keypress={()=> visible = false}
    >
        <div>
            <iconify-icon icon="ic:round-check-circle-outline" width="25px"></iconify-icon>
        <span>{message}</span>
        </div>
    </div>
{/if}
