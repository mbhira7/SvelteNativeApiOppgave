<script>
    import { onMount } from 'svelte'
    import { db } from '../stores/stores.js'
    export let favourites 


</script>


<page>
    <stackLayout class="bakgrunn">
        {#each favourites as f}
            <label style="color:white" text="{f.title}" />
        {/each}
    </stackLayout>

</page>


<style>
    .bakgrunn{
        background-color: #101822;
        width:100%;
        height:100%;
    }

</style>