<script lang="ts">
    import ProfileIcon from "$lib/components/profile-icon.svelte";
    let { username } = $props();
</script>

<div class="profile">
    <div class="icon">
        <ProfileIcon icon={localStorage.getItem('profile-icon')} size="50px"/>
    </div>
    <div class="name">{username}</div>
</div>

<style>
    .profile{
        background-color: var(--clr_transparent_dark_25);
        display: flex;
        align-items: center;
        padding: .5rem;
        gap: .5rem;
    }
    .icon{
        background-color: var(--clr_palette_0);
        border-radius: 50%;
        padding: .5rem;
    }
    .name{
        color: var(--clr_palette_4);
        font-size: 20px;
        font-family: "Playwrite AU SA", serif;
    }
</style>