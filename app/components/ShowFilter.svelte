<script>
    import Genres from "./Genres.svelte"
    import YearAndLanguage from "./YearAndLanguage.svelte"
    export let heading
    export let rowNumber
    export let noBorder
    export let filterGenres
    export let filterLanguages
    export let filterYear
    let plussEnabled = true
    $:signText = plussEnabled ? "+" : "-"

</script>

<gridLayout row="{rowNumber}" class="{noBorder ? "no-border" : "border"}">
    <flexBoxLayout col="0" class="start">
        <label  text="{heading}" class="white filterText " />
    </flexBoxLayout>
    
    <flexBoxLayout col="1" class="end">
        <label text="{signText}" class="white plussSign" on:tap={() => plussEnabled =! plussEnabled}/>
    </flexBoxLayout>
    {#if !plussEnabled}
    <flexBoxLayout style=" margin-top:30; height:auto;">
        {#if filterGenres}
            <Genres />
        {/if}
        {#if filterLanguages}
            <YearAndLanguage language={true}/>
        {/if}
        {#if filterYear}
            <YearAndLanguage />
        {/if}
    </flexBoxLayout>
    {/if}
</gridLayout>


<style>

.start{
    justify-content: flex-start;
}

.end{
    justify-content: flex-end;
}

.filterText{
    font-size:16;
}

.plussSign{
    font-size:17;
    transform: scale(2);
    font-weight:200;
    margin-right:3;
}

.no-border{
    padding-top:9;
}

.border{
    border-bottom-color: rgba(196, 155, 179, 0.4);
    border-bottom-width: 1;
    padding-bottom: 9;
    padding-top:9;
}


</style>