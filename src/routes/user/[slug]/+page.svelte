<script lang="ts">
    import { getFirebase } from "$lib/firebase.client.js";
    import { collection, doc, setDoc, getDocs, type QuerySnapshot } from "firebase/firestore";
    import { onMount } from "svelte";
    import ProfileWide from "$lib/component-wide/profile-wide.svelte";
    
    let db = getFirebase().firestore;
    const subRef = collection(db, 'collections');
    let myDocs: QuerySnapshot | null = $state(null);
    
    let refresh = async () => {
        myDocs = await getDocs(subRef);
    }

    let { data } = $props();
</script>

<div class="main">
    <div class="flex">
        <div class="content">
            <ProfileWide username={data.username}/>
            <div class="filters">
                <button>My collections</button>
                <button>My public collections</button>
                <button>My private collections</button>
                <button>New collection</button>
            </div>
        </div>
        <div class="content">
            <div class="collection">
                <div class="tags">
                    <h3 class="title">Leetcode submissions</h3>
                    <span class="privacy">public</span>
                </div>
                <div class="grid">
                    <div class="tools">
                        <button>Open collection</button>
                        <button>Add new submission</button>
                    </div>
                    <div>submission</div>
                    <div>submission</div>
                    <div>submission</div>
                    <div>submission</div>
                </div>
            </div>
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
        backdrop-filter: blur(5px);
    }

    .tags{
        display: flex;
        align-items: center;
        gap: .2rem;
        &>*:not(.title, button){
            background-color: var(--clr_palette_3);
            border-radius: 5rem;
            padding: .1rem .5rem;
            color: black;
            font-size: 14px;
            letter-spacing: 1px;
            user-select: none;
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

    .collection{
        display: flex;
        gap: 3px;
        flex-direction: column;
        
        &>*{
            background-color: var(--clr_transparent_dark_25);
        }

        h3{
            color: var(--clr_transparent_light_75);
            margin: 0;
            padding: .5rem;
        }

        .grid{
            display: grid;
            padding: .5rem;
            margin: 0;
            gap: .5rem;
            
            grid-template-columns: 1fr 1fr;
            
            &>*:not(.tools){
                all: unset;
                padding: .5rem;
                border: 2px solid var(--clr_palette_0);
                background-color: var(--clr_transparent_dark_25);
                border-radius: .25rem;
                color: var(--clr_transparent_light_50);
                aspect-ratio: 3/1;

                cursor: pointer;
                user-select: none;
            }
        }

        .tools{
            display: flex;
            grid-column: 1 / -1;
            gap: 3px;

            &>*{
                padding: .5rem;
                background-color: var(--clr_palette_0);
                color: var(--clr_transparent_light_50);
                cursor: pointer;
                border-radius: .25rem;
            }
        }
    }
</style>