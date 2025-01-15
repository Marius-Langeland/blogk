<script lang="ts">
    import { type User } from "firebase/auth";
    import { getFirebase } from "$lib/firebase.client";

    let app = getFirebase();
    let auth = app.auth;

    let { icon, size = '40px' }: { icon: string | null, size: string } = $props();

    let profileIcon: string | null = $state(icon);

    if(profileIcon == 'url' && auth.currentUser == null)
        profileIcon = 'face';

</script>

{#if profileIcon == 'url'}
    <button class="material-icons hover-opener"><img width={size} src={auth.currentUser?.photoURL} alt=""></button>
{:else}
    <button class="material-icons hover-opener" style={`font-size: ${size};`}>{profileIcon}</button>
{/if}

<style>
    img{
        border-radius: 50%;
    }
</style>