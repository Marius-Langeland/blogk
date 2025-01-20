<script lang="ts">
    import type { Submission } from "$lib/types";

    let { title = '', submissions = [] }: {title: string, submissions: Submission[]} = $props();
</script>

<div class="collection">
    <div class="tags">
        <h3 class="title">{title == '' ? 'Untitled collection' : title}</h3>
        <button>Open</button>
        <button>Add</button>
    </div>
    <div class="grid">
        {#each submissions as sub}
            <a href={`/submissions/${sub.slug}`}>{sub.name}</a>
        {/each}
    </div>
</div>

<style>
    .tags{
        display: flex;
        align-items: center;
        gap: .2rem;
        padding: .5rem;
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
            flex-grow: 1;
        }

        .grid{
            display: grid;
            padding: .5rem;
            margin: 0;
            gap: .5rem;
            
            grid-template-columns: repeat(auto-fit, minmax(200px, 1fr) );
            
            &>*:not(.tools){
                padding: .5rem;
                border: 2px solid var(--clr_palette_0);
                background: linear-gradient(150deg, var(--clr_transparent_dark_75), var(--clr_transparent_dark_25));
                border-radius: .25rem;
                color: var(--clr_transparent_light_50);
                aspect-ratio: 3/2;

                cursor: pointer;
                user-select: none;
            }
        }

        button{
            justify-self: end;
            padding: .5rem;
            background-color: var(--clr_palette_0);
            color: var(--clr_transparent_light_50);
            cursor: pointer;
            border-radius: .25rem;
        }
    }
</style>