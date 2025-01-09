<div class="theme">
    <span class="material-icons opener">contrast</span>
    <div class="content">
        <div class="palette-0">1</div>
        <div class="palette-1">2</div>
        <div class="palette-2">3</div>
        <div class="palette-3">4</div>
        <div class="palette-4">5</div>
    </div>
</div>

<style>
    .theme{
        color: var(--clr_code_text);
        border-radius: .5rem;
        display: flex;
        gap: .5rem;
        flex-direction: row-reverse;
        user-select: none;
    }

    span{
        cursor: pointer;
        
    }

    .content{
        display: flex;
        flex-direction: row-reverse;

        gap: .25rem;
        padding: .25rem;
        background-color: var(--clr_transparent_dark_25);
        backdrop-filter: blur(10px);
        border-radius: .75rem;
    }
    .content > *{
        width: 40px;
        aspect-ratio: 1;
        border-radius: .5rem;
        border: 2px solid var(--clr_transparent_light_25);
        cursor: pointer;
        display: flex;
        justify-content: center;
        align-items: center;
        color: var(--clr_palette_0);
        font-weight: bolder;
    }

    .content > *:nth-child(1){
        background-color: var(--clr_palette_0);
        color: var(--clr_palette_4);
    }
    .content > *:nth-child(2){
        background-color: var(--clr_palette_1);
        color: var(--clr_palette_2);
    }
    .content > *:nth-child(3){
        background-color: var(--clr_palette_2);
        color: var(--clr_palette_3);
    }
    .content > *:nth-child(4){
        background-color: var(--clr_palette_3);
        color: var(--clr_palette_1);
    }
    .content > *:nth-child(5){
        background-color: var(--clr_palette_4);
        color: var(--clr_palette_0);
    }
</style>
