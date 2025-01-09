<script lang="ts">
    import { type User } from "firebase/auth";
    import { getContext } from "svelte";
    import { logout } from "./firebase.client";

    let profileIcon: string | null = $state(localStorage.getItem('profile-icon'));

    $effect(() => {
        localStorage.setItem('profile-icon', profileIcon ?? 'face');
    });

    let userState: {user: User} = getContext('userState');

    let icons = [
        "face",
        "face_5",
        "face_3",
        "face_4",
        "face_2",
    ]
</script>

<div class="profile">
    {#if profileIcon == userState.user.photoURL}
        <button class="material-icons opener"><img src={profileIcon} alt=""></button>
    {:else}
        <button class="material-icons opener">{profileIcon}</button>
    {/if}

    <div class="content">
        <div class="setIcons">
            <button onclick={() => profileIcon = userState.user.photoURL}><img class="profile-pic" src={userState.user.photoURL} alt=""></button>
            {#each icons as icon, i}
                <button class="material-icons" onclick={() => profileIcon = icons[i]}>{icon}</button>
            {/each}
        </div>
        
        <div class="above-content">
            <div>{userState.user.displayName}</div>
            <button class="sign-out" onclick={() => logout()}>Log out</button>
        </div>
    </div>
</div>

<style>
    img{
        width: 40px;
        aspect-ratio: 1;
        border-radius: 5rem;
    }
    button{
        display: flex;
        justify-content: center;
        align-items: center;
    }

    .profile{
        user-select: none;
        display: flex;
        gap: .5rem;
        flex-direction: row-reverse;
        align-items: center;
    }

    .above-content{
        position: absolute;
        top: 0;
        max-width: 100%;
        width: 100%;
        translate: 0 calc(-100% - .25rem);
        display: flex;
        text-wrap: nowrap;
        justify-content: space-between;
        align-items: center;
        
        background-color: var(--clr_transparent_dark_25);
        padding: .25rem;
        border-radius: .5rem;

        backdrop-filter: blur(10px);

        div{
            color: var(--clr_transparent_light_75);
            text-overflow: ellipsis;
            overflow: hidden;
            font-family: "Playwrite AU SA", serif;
            padding: 0 .2rem;
        }
        .sign-out{
            background-color: var(--clr_palette_3);
            color: var(--clr_transparent_light_75);
            padding: .2rem;
            border-radius: .25rem;
            text-transform: uppercase;
            font-family: "Roboto Mono", serif;
            font-weight: bold;
        }
    }

    .content{
        display: flex;
        flex-direction: column;
        position: relative;
        backdrop-filter: blur(10px);
        background-color: var(--clr_transparent_dark_25);
        border-radius: .5rem;
    }

    .setIcons{
        display: flex;
        justify-content: center;
        gap: .25rem;
        align-items: center;
        padding: .25rem;
    }
</style>