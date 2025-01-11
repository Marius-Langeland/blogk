<script lang="ts">
    import ProfileIcon from "$lib/components/profile-icon.svelte";
    let { username } = $props();
</script>

<div class="profile">
    <ProfileIcon icon={localStorage.getItem('profile-icon')} size="50px"/>
    <div class="name"></div>
</div>

<style>
    .profile{
        background-color: var(--clr_transparent_dark_25);
        display: flex;
        align-items: center;
        padding: .5rem;
    }
</style>