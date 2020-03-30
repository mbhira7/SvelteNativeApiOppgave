<script>
    import {onMount} from "svelte"
    import DisplayMovies from "./DisplayMovies.svelte"
    export let apiKey
    export let getData
    export let genresList
    let results = []
    let genres = []
    let searchValue = ""
    let showGenres = false;
    let prom 

   const search = async () => {
       if(searchValue.length > 1) {
        console.log(searchValue)
        prom = await getData(`https://api.themoviedb.org/3/search/movie?query=${searchValue}&api_key=${apiKey}`)
        console.log(prom.results[0].title)
            //results = res.results
       }
    }

    const testFunksjon = (id) => {
        getData(`https://api.themoviedb.org/3/discover/movie?api_key=${apiKey}&&with_genres=${id}`)
            .then(res => genres = res.results)
    }

</script>

<page>
    <stackLayout style="background-color: #101822; width:100%; height: 100%; padding:16;">
        <flexBoxLayout class="searchbar center">
            <flexBoxLayout verticalAlignment="center" style="height:70;">
                <label class="h2 " text="Search" style="color:white; margin-bottom:16; margin-right:15;"/>
                <image on:tap={() => showGenres = !showGenres} src="~/assets/images/filter.png"  style="height:10; width:22; margin-top:-12" />
            </flexBoxLayout>

                {#if !showGenres}
                    <searchBar  on:textChange={search} style=" height:45; width:100%; margin-bottom:20;" hint="Search for movies" bind:text={searchValue}/>
                {/if}
            </flexBoxLayout>
            

        {#if showGenres}
            <scrollView orientation="horizontal">
            <flexBoxLayout >
            {#each genresList as genre}
                <flexBoxLayout class="genre-div">
                    <label on:tap={() => testFunksjon(genre.id)} style="color:white; font-size:13; font-weight:bold;" text={genre.name}/>
                </flexBoxLayout>
            {/each}
            </flexBoxLayout>
            </scrollView>
         {/if}
         {#if showGenres}
            <DisplayMovies array={genres} getData={getData} genresList={genresList}/> 
        {:else}
            <DisplayMovies array={results} getData={getData} genresList={genresList}/> 
        {/if}
    </stackLayout>
</page>


<style>
    page{
        background-color: #000b1a10;
        width:100%;
        height: 100%;
   }
    .searchbar{
        flex-direction:column;
        align-items: flex-start;
        justify-content: flex-start;
        margin-top:10;
    }

    .genre-div{
        background-color: rgba(156, 156, 156, 0.3);
        width:auto;
        height:auto;
        margin-bottom:20;
        padding:7;
        margin-right:15;
        border-radius:16;
    }

</style>