<script lang="ts">
    import { getFirebase } from "$lib/firebase.client.js";
    import { collection, doc, setDoc } from "firebase/firestore";
    import { onMount } from "svelte";
    
    let db = getFirebase().firestore;
    const subRef = collection(db, 'submissions');

    onMount(async () => {
        await setDoc(doc(subRef, "Test"), {
            title: "Test submission",
        });
    })

    let { data } = $props();
</script>

<div>
    
</div>