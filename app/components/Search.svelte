<script>
    import {onMount} from "svelte"
    import DisplayMovies from "./DisplayMovies.svelte"
    export let apiKey
    import {getData} from "../constants/constant.js"
    export let genresList
    let results = []
    let genres = []
    let searchValue = ""
    let showGenres = false;
    let prom 
    let chosenGenres = []

   const titleSearch = async () => {
       if(searchValue.length >= 1) {
            prom = await getData(`https://api.themoviedb.org/3/search/movie?query=${encodeURI(searchValue)}&api_key=${apiKey}`)
            results = prom.results
       }
       else{
           results = ""
       }
    }

    const genreSearch = (clicked, id, i) => {
       const indeks = chosenGenres.findIndex(g => g === id)
        
        genresList[i].clicked = !clicked
        if(genresList[i].clicked === true && !chosenGenres.includes(genresList[i].id)) {
            chosenGenres = [...chosenGenres, genresList[i].id].slice(0,3)
        }
        if(genresList[i].clicked === false && chosenGenres.includes(genresList[i].id)) {
            chosenGenres.splice(indeks,1)
        }
        getData(`https://api.themoviedb.org/3/discover/movie?api_key=${apiKey}&&with_genres=${chosenGenres}`)
            .then(res => genres = res.results)
    }

</script>

  <page>
    <stackLayout style="background-color: #101822; padding:16; ">
        <flexBoxLayout style=" flex-direction:row; margin-bottom:14; " >
            <label class="h2 " text="Search" style="color:white;  margin-right:15; "/>
            <flexBoxLayout style="justify-content:flex-start;">
                <flexBoxLayout horizontalAlignment="left" verticalAlignment="top"  style="height:20; width:22; " >
                    <image on:tap={() => showGenres = !showGenres} src="~/assets/images/filter.png" style="height:100%; width:100%; " />
                </flexBoxLayout>
            </flexBoxLayout>
        </flexBoxLayout>
         <stackLayout>

                {#if !showGenres}
                    <searchBar  on:textChange={titleSearch} style=" height:45; width:100%;  margin-bottom:18;" hint="Search for movies" bind:text={searchValue}/>
                {/if}
                
        </stackLayout>
        {#if showGenres}
            <scrollView orientation="horizontal" >
            <flexBoxLayout >
            {#each genresList as genre, index}
                 {#if chosenGenres.includes(genre.id)}
                    <flexBoxLayout style="background-color:black" class="genre-div">
                        <label on:tap={() => genreSearch(genre.clicked, genre.id,index)} style="color:white; font-size:13; font-weight:bold;" text={genre.name}/>
                    </flexBoxLayout>
                {:else}
                    <flexBoxLayout style="background-color: rgba(156, 156, 156, 0.3)" class="genre-div">
                        <label on:tap={() => genreSearch(genre.clicked, genre.id,index)} style="color:white; font-size:13; font-weight:bold;" text={genre.name}/>
                    </flexBoxLayout>
                {/if}
            {/each}
            </flexBoxLayout>
            </scrollView>
         {/if}
         <scrollView>
         {#if showGenres}
            <DisplayMovies heading="Search results" array={genres} getData={getData} genresList={genresList}/> 
        {:else}
            <DisplayMovies heading="Search results" array={results} getData={getData} genresList={genresList}/> 
        {/if}
        </scrollView>
        
    </stackLayout>
</page>


<style>
    page{
        background-color: #000b1a10;
        width:100%;
        height: 100%;
   }
    
    .genre-div{
        width:auto;
        height:auto;
        margin-bottom:20;
        padding:7;
        margin-right:15;
        border-radius:16;
    }

</style>