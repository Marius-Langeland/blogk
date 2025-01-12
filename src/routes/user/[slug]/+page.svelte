<script lang="ts">
    import { getFirebase } from "$lib/firebase.client.js";
    import { collection, doc, setDoc, where, limit, getDocs, query, orderBy } from "firebase/firestore";
    import { onMount } from "svelte";
    import ProfileWide from "$lib/component-wide/profile-wide.svelte";
    import CollectionOverview from "$lib/components/collection-overview.svelte";
    
    let db = getFirebase().firestore;
    let col = collection(db, 'submissions');
    const queryAll = query(col, limit(10));
    const queryPrivate = query(col, where('private', '==', true), limit(10));
    const queryPublic = query(col, where('private', '==', false), limit(10));

    let refresh = async (privacy: string) => {
        let query;
        switch(privacy){
            case 'all': query = queryAll;
            case 'public': query = queryPublic; 
            case 'private': query = queryPrivate; 
            default: query = queryPublic;
        }

        let myDocs = await getDocs(query);
    }

    let { data } = $props();
</script>

<div class="main">
    <div class="flex">
        <div class="content profile">
            <ProfileWide username={data.username}/>
            <div class="filters">
                <button>My collections</button>
                <button>My public collections</button>
                <button>My private collections</button>
                <button>New collection</button>
            </div>
        </div>
        <div class="content">
            <CollectionOverview/>
        </div>
    </div>
</div>

<style>
    .main{
        min-height: 100vh;
        gap: .5rem;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
    }

    .flex{
        display: flex;
        flex-direction: column;
        gap: .5rem;
    }

    .content{
        background-color: var(--clr_transparent_dark_25);
        border-radius: .5rem;
        gap: 3px;
        display: flex;
        flex-direction: column;
        backdrop-filter: blur(50px);
        overflow: hidden;
    }

    

    .filters{
        display: flex;
        gap: 3px;
        &>*{
            text-align: center;
            color: var(--clr_transparent_light_50);
            flex-grow: 1;
            background-color: var(--clr_transparent_dark_25);
            padding: .5rem;

            transition: color .2s ease;

            &:hover{
                color: var(--clr_transparent_light_75);
            }
        }
    }
</style>