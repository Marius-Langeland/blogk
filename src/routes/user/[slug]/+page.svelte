<script lang="ts">
    import { getFirebase } from "$lib/firebase.client.js";
    import { collection, where, limit, getDocs, query, orderBy, addDoc } from "firebase/firestore";
    import { onMount } from "svelte";
    import ProfileWide from "$lib/component-wide/profile-wide.svelte";
    import CollectionOverview from "$lib/components/collection-overview.svelte";
    import { Submission, submissionConverter } from "$lib/types.js";

    let fb = getFirebase();
    let db = fb.firestore;
    let auth = fb.auth;

    let { data } = $props();

    let col = collection(db, 'submissions');
    
    const queryAll = query(col, where('author', '==', auth.currentUser?.uid ?? data.uid), orderBy('timeCreated'));
    const queryPrivate = query(col, where('isPrivate', '==', true), where('author', '==', auth.currentUser?.uid ?? data.uid), orderBy('timeCreated'));
    const queryPublic = query(col, where('isPrivate', '==', false), where('author', '==', data.uid), orderBy('timeCreated'));

    let refresh = async (privacy: string) => {
        let query;
        switch(privacy){
            case 'all': query = queryAll; break;
            case 'public': query = queryPublic; break;
            case 'private': query = queryPrivate; break;
            default: query = queryPublic; break;
        }

        let map: Map<string, Submission[]> = new Map();
        let array: Submission[][] = [];
        let myDocs = await getDocs(query);
        myDocs.docs.forEach((snapshot) => {
            let data = submissionConverter.fromFirestore(snapshot);

            if(map.has(data.group))
                map.get(data.group)?.push(data);
            else map.set(data.group, [data]);
        });

        map.keys().forEach(key => {
            let d = map.get(key);
            if(d != undefined)
            array.push(d);
        });

        dataMap = array;
    }

    let addCollection = async (collectionName: string, isPrivate: boolean) => {
        if(auth.currentUser?.uid == undefined)
            return;

        if(collectionName.length <= 0)
            collectionName = 'Untitled collection';

        let newCollection: Submission = new Submission('New submission', collectionName, [], isPrivate, auth.currentUser.uid);

        awaitingCreation = true;
        let response = await addDoc(col, submissionConverter.toFirestore(newCollection));
        awaitingCreation = false;
        collectionName = '';

        refresh('all');
    }

    onMount(() => {
        refresh(isThisUser ? 'all' : 'public');
    });

    let isThisUser: boolean = $state(data.uid == auth.currentUser?.uid);
    let dataMap: Submission[][] = $state([]);
    let awaitingCreation = $state(false);
    let isPrivate = $state(true);
    let collectionName = $state('');
</script>

<div class="main">
    <div class="flex">
        <div class="content profile">
            <ProfileWide uid={data.uid}/>
            {#if isThisUser}
                <div class="filters">
                    <button onclick={() => refresh('all')}>My submissions</button>
                    <button onclick={() => refresh('public')}>My public submissions</button>
                    <button onclick={() => refresh('private')}>My private submissions</button>
                </div>
            {/if}
        </div>

        {#if isThisUser}
            <div class="content create-collection">
                <input type="text" bind:value={collectionName} maxlength="24" name="collection-name" id="collection-name" placeholder="Collection name">
                <button onclick={() => isPrivate = !isPrivate} class="is-private">
                    {isPrivate ? 'Private' : 'Public'}
                </button>
                {#if awaitingCreation}
                <span>Creating...</span>
                {:else}
                <button onclick={() => addCollection(collectionName, isPrivate)}>Create new collection</button>
                {/if}
            </div>
        {/if}

        <div class="content collections">
            {#each dataMap as collection}
                <CollectionOverview title={collection[0].group} submissions={collection}/>
            {/each}
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

    .create-collection{
        display: flex;
        flex-direction: row;
        justify-content: end;

        &>*{
            padding: .5rem;
            background-color: var(--clr_transparent_dark_25);
            color: var(--clr_transparent_light_50);
            transition: color .2s ease;
            &:hover{
                color: var(--clr_transparent_light_75);
            }
        }

        #collection-name{
            all: unset;
            flex-grow: 1;
            padding: .5rem;
            color: var(--clr_transparent_light_75);
            background-color: var(--clr_transparent_dark_25);
            font-size: 20px;

            &::placeholder{
                color: var(--clr_transparent_light_25);
            }
        }
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

    .collections{
        flex-direction: column-reverse;
    }
</style>