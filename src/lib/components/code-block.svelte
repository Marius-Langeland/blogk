<script lang="ts">
    let { field = 'codeBlock', outerStyle = true }: { field: string, outerStyle: boolean } = $props();
    let content = $state('');
</script>

<textarea autocomplete="off" spellcheck="false" class={outerStyle ? 'outer-styled' : ''}>{content}</textarea>

<style>
    textarea{
        background-color: var(--clr_palette_0);
        color: var(--clr_transparent_light_75);
        border-radius: 0 0 0 .4rem;
        border: none;
        margin: 0;
        min-width: 150px;
        min-height: 30px;

        font-size: 24px;
        font-family: "Roboto Mono", serif;
        &:focus{
            outline: none;
        }
    }

    .outer-styled{
        border: 3px solid var(--clr_transparent_dark_25);
        border-radius: .5rem;
        resize: none;
    }
</style>