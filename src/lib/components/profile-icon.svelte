<script lang="ts">
    import { type User } from "firebase/auth";
    import { getContext } from "svelte";

    let { icon, size = '40px' }: { icon: string | null, size: string } = $props();

    let profileIcon: string | null = $state(icon);

    $effect(() => {
        profileIcon = icon;
        localStorage.setItem('profile-icon', profileIcon ?? 'face');
    });

    let userState: {user: User} = getContext('userState');
</script>

{#if profileIcon == 'url'}
    <button class="material-icons hover-opener"><img width={size} src={userState.user.photoURL} alt=""></button>
{:else}
    <button class="material-icons hover-opener" style={`font-size: ${size};`}>{profileIcon}</button>
{/if}

<style>
    img{
        border-radius: 50%;
    }
</style>