<script lang="ts">
    let { children } = $props();

    let lock = $state(false);
    let hide = $state(false);
    let className = $derived(`dragger ${lock ? 'locked' : ''} ${hide ? 'hidden' : ''}`)
</script>

<div class={className}>
    <div class="toolbar">
        <button class="material-icons">lock</button>
        <button class="material-icons">close</button>
    </div>
    {@render children?.()}
</div>

<style>
    .dragger{
        display: flex;
        flex-direction: column;

        padding: 2px;
        gap: 2px;
        background-color: var(--clr_transparent_dark_25);
        border-radius: .5rem;
        overflow: hidden;
    }
    .toolbar{
        display: flex;
        justify-content: end;
        align-items: center;

        border-radius: .4rem .4rem 0 0;

        background-color: var(--clr_transparent_dark_25);
        padding: .25rem;
        gap: .25rem;
    }
    .toolbar > *{
        font-size: 20px;
    }
</style>