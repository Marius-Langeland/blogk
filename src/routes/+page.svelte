<script lang="ts">
    import { login } from "$lib/firebase.client";
    import type { User } from "firebase/auth";
    import { getContext, onMount } from "svelte";

    let userState: {user: User} = getContext('userState');
    let count = $state(0);
    let d = $derived((count % 4) + 2);
    onMount(() => {
        setInterval(() => {
            count++;
        }, 800);
    });
</script>

<section class="hero">
    <div class="grid">
        {#if userState.user == null}
            <button onclick={() => login()}>Login</button>
        {:else}
            <a href="/collections?user={userState.user.uid}">My <br> collections</a>
        {/if}
        <button>Browse <br> collections</button>
    </div>
</section>

<style>
    img{
        width: 700px;
        margin-top: -200px;
        pointer-events: none;
    }

    .hero{
        width: 100%;
        min-height: 100vh;
        display: flex;
        justify-content: center;
        align-items: center;
        gap: .5rem;
    }

    .grid{
        display: grid;
        gap: .5rem;
    }

    h1{
        font-family: "Playwrite AU SA", serif;
        color: var(--clr_palette_4);
        font-size: 4rem;
        user-select: none;
    }

    a{all: unset; user-select: none; cursor: pointer;}

    button, a{
        font-size: 2rem;
        font-family: "Roboto Mono", serif;
        font-weight: 800;
        text-transform: uppercase;
        color: var(--clr_palette_0);

        display: flex;
        align-items: flex-end;
        
        border-radius: .5rem;
        padding: .5rem 2rem;

        transition: background-color .2s ease;
        background-color: var(--clr_palette_3);
        &:hover{
            background-color: var(--clr_palette_4);
        }
    }
</style>