<script>
    let { children } = $props();
</script>

<main>
    <div class="left"></div>
    <div class="right"></div>
    <div class="header"></div>
    <div class="footer"></div>
    <div class="content">
        {@render children()}
    </div>
</main>

<style>
    main{
        width: 100%;
        min-height: 100vh;

        display: grid;

        grid-template-columns: minmax(100px, 1fr) auto minmax(100px, 1fr);
        grid-template-rows: minmax(200px, 1fr) auto minmax(150px, 1fr);

        grid-template-areas: 
        't t t'
        'l c r'
        'f f f';
    }

    .left{grid-area: l;}
    .right{grid-area: r;}
    .header{grid-area: t;}
    .footer{grid-area: f;}
    .content{grid-area: c;}
</style>