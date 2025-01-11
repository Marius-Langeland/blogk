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
        <ProfileWide username={data.username}/>
        <div class="filters">
            <button>My collections</button>
            <button>My public collections</button>
            <button>My private collections</button>
        </div>

        <div class="collection">
            <div class="tags">
                <h3 class="title">Untitled collection</h3>
                <span class="privacy">private</span>
            </div>

            <div class="carousell">
                <button class="go-left">&lt</button>
                <ul>
                    <li></li>
                    <li>Submission</li>
                    <li>Submission</li>
                    <li>Submission</li>
                    <li>Submission</li>
                    <li>Submission</li>
                    <li>Submission</li>
                    <li>Submission</li>
                </ul>
                <button class="go-right">&gt</button>
            </div>
        </div>
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
        background-color: var(--clr_transparent_dark_25);
        border-radius: .5rem;
        overflow: hidden;
        z-index: 1;
        min-width: 500px;
        max-width: 800px;

        gap: 3px;

        display: flex;
        flex-direction: column;
        backdrop-filter: blur(5px);
    }

    .tags{
        display: flex;
        align-items: center;
        gap: .2rem;
        &>*:not(.title){
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

        .carousell{
            display: flex;
            padding: .5rem;
        }

        button{
            display: flex;
            justify-content: center;
            align-items: center;
            color: var(--clr_transparent_light_50);
            width: 50px;
            background-color: var(--clr_transparent_dark_25);
        }

        .go-left{border-radius: .5rem 0 0 .5rem;}
        .go-right{border-radius: 0 .5rem .5rem 0;}

        ul{
            display: flex;
            flex-direction: row;
            padding: 0;
            margin: 0;
            gap: 1rem;
            overflow-x: scroll;

            position: relative;
        }

        li{
            all: unset;
            padding: .5rem;
            height: 120px;
            aspect-ratio: 5/4;
            background-color: var(--clr_palette_3);
            border-radius: .25rem;
            color: var(--clr_transparent_light_50);
        }

        li:first-of-type{
            display: flex;
            justify-content: center;
            align-items: center;
            font-size: 50px;

            &::before{
                content: '+';
                display: flex;
                justify-content: center;
                align-items: center;
                background-color: var(--clr_palette_0);
                color: var(--clr_transparent_light_50);
                width: 60px;
                height: 60px;
                border-radius: 50%;
            }
        }
    }
</style>