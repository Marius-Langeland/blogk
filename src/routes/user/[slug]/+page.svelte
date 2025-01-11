<script lang="ts">
    import { getFirebase } from "$lib/firebase.client.js";
    import { collection, doc, setDoc } from "firebase/firestore";
    import { onMount } from "svelte";
    import ProfileWide from "$lib/component-wide/profile-wide.svelte";
    
    let db = getFirebase().firestore;
    const subRef = collection(db, 'submissions');

    onMount(async () => {
        await setDoc(doc(subRef, "Test"), {
            title: "Test submission",
        });
    })

    let { data } = $props();
</script>

<div class="main">
    <div class="content">
        <ProfileWide/>
    </div>
</div>

<style>
    .main{
        min-height: 100vh;
        display: flex;
        justify-content: center;
        align-items: center;
    }

    .content{
        background-color: blue;
        z-index: 1;
        min-width: 500px;
        min-height: 200px;
    }
</style>