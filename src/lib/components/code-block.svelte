<script lang="ts">
    import { type CodeBlock } from "$lib/types";
    let { data }: { data: CodeBlock } = $props();
</script>

<div class="codeblock">
    <textarea name="" id="">
        {data.content}
    </textarea>
</div>