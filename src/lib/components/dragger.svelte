<script lang="ts">
    let { children, title = '' } = $props();

    let lock = $state(false);
    let hide = $state(false);
    let className = $derived(`dragger ${lock ? 'locked' : ''} ${hide ? 'hidden' : ''}`)
</script>

<div class={className}>
    <div class="toolbar">
        <span>{title}</span>
        <div>
            <button class="material-icons">lock</button>
            <button class="material-icons">close</button>
        </div>
    </div>
    {@render children?.()}
</div>

<style>
    .dragger{
        display: flex;
        flex-direction: column;

        padding: 3px;
        gap: 3px;
        background-color: var(--clr_transparent_dark_25);
        border-radius: .5rem .5rem .1rem .5rem;
        overflow: hidden;

        backdrop-filter: blur(10px);
    }
    .toolbar{
        display: flex;
        justify-content: space-between;
        align-items: center;

        border-radius: .4rem .4rem 0 0;

        background-color: var(--clr_palette_0);
        padding: .1rem;
        padding-left: 1ch;
    }
    .toolbar > * {
        display: flex;
        gap: 2px;
    }
    .material-icons{
        font-size: 20px;
    }

    button{
        padding: .2rem;
        border-radius: .25rem;
        &:hover{
            background-color: var(--clr_transparent_light_25);
        }
    }
</style>