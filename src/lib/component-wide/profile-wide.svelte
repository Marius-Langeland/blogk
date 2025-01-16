<script lang="ts">
    import ProfileIcon from "$lib/components/profile-icon.svelte";
    import { getFirebase } from "$lib/firebase.client";
    import { UserData, userDataConverter } from "$lib/types";
    import { doc, getDoc } from "firebase/firestore";
    let { uid } = $props();

    $effect(() => {
        let app = getFirebase();
        let document = doc(app.firestore, 'users', uid)
        getDoc(document).then((x) => {
            let data = x.data();
            if(data != undefined)
                user = userDataConverter.fromFirestoreData(data);
        });
    })

    let user: UserData | null = $state(null);

</script>

<div class="profile">
    <div class="icon">
        <ProfileIcon icon={'url'} size="50px"/>
    </div>
    <div class="name">{user?.displayName}</div>
</div>

<style>
    .profile{
        background-color: var(--clr_transparent_dark_25);
        display: flex;
        align-items: center;
        padding: .5rem;
        gap: .5rem;
        min-width: 500px;
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