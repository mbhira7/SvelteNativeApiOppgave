<script>
    import {onMount} from "svelte"
    import {showModal} from "svelte-native"
    import { Template } from 'svelte-native/components'
    import {getData,apiKey} from "../constants/constant.js"
    import {moviesByActor,showActorsList,filterChoiceValue,showFilterBox,chosenGenres,languageValue,decadeStartValue,decadeEndValue} from "../stores/stores.js"
    import DisplayMovies from "./DisplayMovies.svelte"
    import SearchResults from "./SearchResults.svelte"
    import ScrollViewCastCrew from "./ScrollViewCastCrew.svelte"
    import ShowFilter from "./ShowFilter.svelte"
    import Movie from "../modals/Movie.svelte"
    let searchResults = []
    let filterResults = []
    let showFilterPage = false
    let showSearchPage = true
    let title = "Browse"
    let noResultsMessage
    let noActorsResultsMessage
    let noDirectorsResultsMessage
    let inputMessage
    let inputValue
    let searchValue = ""
    let searchChoiceValue = 0
    const topRatedMoviesUrl = `https://api.themoviedb.org/3/movie/top_rated?api_key=${apiKey}`
    let topRatedMovies = []
    let personer = []
    let showGrid = true
    let placeholderText = "title"
    let i = 1
    $:{
        if(searchChoiceValue === 0) {
            placeholderText = "title"
        } 
        if(searchChoiceValue === 1){
            placeholderText = "actor"
        }
        if(searchChoiceValue === 2){
            placeholderText = "director"
        }
    }
    $:actors = personer.filter(person => person.known_for_department === "Acting")
    $:directors = personer.filter(person => person.known_for_department === "Directing")
   
    onMount(async () => {
        searchChoiceValue = 0
        await getData(topRatedMoviesUrl)
            .then(res => topRatedMovies = res.results)
    })

    //Nummererer bildene på browse sidene
    const numberImages = () => {
        if(i > 9) {
            i = 1
        }

        return i++
    }
    

   const titleSearch = async () => {
       //Nuller ut alle verdier
       noResultsMessage = ""
       noActorsResultsMessage = ""
       noDirectorsResultsMessage = ""
       $showActorsList = true

       if(searchValue.length === 0) { 
            searchResults = []
            noResultsMessage = ""
            noActorsResultsMessage = ""
            noDirectorsResultsMessage = ""
            $moviesByActor = []
            personer = []
            return 
        }

        //Fetcher ut filmer som passer med tittelsøk 
        if(searchChoiceValue === 0) {
            await getData(`https://api.themoviedb.org/3/search/movie?query=${encodeURI(searchValue)}&api_key=${apiKey}`)
            .then(res => searchResults = res.results)
        }

        //Fetcher ut personer som passer med skuespiller/regissør søk
        else{
            await getData(`https://api.themoviedb.org/3/search/person?query=${encodeURI(searchValue)}&api_key=${apiKey}`)
            .then(res => personer = res.results)
            $moviesByActor = []
            
        }


        if(searchValue.length > 0 && searchResults.length === 0 && searchChoiceValue === 0) {
           noResultsMessage = "Sorry, no results"
        }

        if(searchValue.length > 0 && actors.length === 0 && searchChoiceValue === 1) {
           noActorsResultsMessage = "Sorry, no results"
        }

        if(searchValue.length > 0 && directors.length === 0 && searchChoiceValue === 2) {
           noDirectorsResultsMessage = "Sorry, no results"
        }
    }

   
    //Toggler mellom browse page og search
    const toggle1 = () => {
        showFilterPage = false
        showGrid = !showGrid
        if(showGrid){
            title="Browse"
        }
        else{
            title="Search"
        }
       
        $showFilterBox = false
        filterResults = ""
        noResultsMessage = ""
        noActorsResultsMessage = ""
        noDirectorsResultsMessage = ""
        inputMessage = ""

    }

    const toggle2 = () => {
        showFilterPage = true
        showSearchPage = true
        showGrid = true
        title = "Filter"
        $showFilterBox = true
        filterResults = ""
        noResultsMessage = ""
        noActorsResultsMessage = ""
        noDirectorsResultsMessage = ""
        inputMessage = ""
    }

    //Setter inn parametrene for filtreringssøk og fetcher matchende filmer
    const filterSearch = async () => {
        inputValue = $filterChoiceValue === 1 ? $chosenGenres : $chosenGenres.join("|")

        if($languageValue != "" || $chosenGenres.length >= 1 || $decadeEndValue != "" || $decadeStartValue != "" ) {
            await getData(`https://api.themoviedb.org/3/discover/movie?with_original_language=${$languageValue}&with_genres=${encodeURI(inputValue)}&primary_release_date.gte=${$decadeStartValue}&primary_release_date.lte=${$decadeEndValue}&api_key=${apiKey}`)
                .then(res => filterResults = res.results)
            noResultsMessage = ""
        }
        
        else{
            inputMessage = "Please filter by at least one parameter"
            filterResults = ""
        }

        if(($languageValue != "" || $chosenGenres.length >= 1 || $decadeEndValue != "" || $decadeStartValue != "") && filterResults.length < 1 ) {
            noResultsMessage = "Sorry, no results"
            $showFilterBox = false
        }

        if(filterResults.length >= 1) {
            $showFilterBox = false
        }
    }

    //Viser frem filmartikkel
     const viewMovie = async (movie) => {
        await showModal({
            page: Movie,
            fullscreen:true,
            props:{
                movie:movie
            }
        })
    }


</script>

  <page>
    <stackLayout class="background" style="padding:16; ">
        <stackLayout>
            <flexBoxLayout class="container">
                <stackLayout on:tap={toggle1} verticalAlignment="top">
                    {#if (showGrid && !showFilterPage) || showFilterPage}
                        <image width="20" src="font://&#xf002;" class="fas " />
                    {:else}
                        <image width="20" src="font://&#xf060;" class="fas " />
                    {/if}
                </stackLayout>
                <label verticalAlignment="top" class="uppercase white h2 text-center" text="{title}"/>
                <stackLayout on:tap={toggle2} verticalAlignment="top">
                    <image width="20" src="font://&#xf0b0;" class="fas" />
                </stackLayout>
            </flexBoxLayout>
        </stackLayout>
        
        <stackLayout >
            {#if topRatedMovies.length > 0 && showGrid && !showFilterPage}
                <label text="Top rated" class="h2 white text-center"/>
                <flexBoxLayout style="justify-content:center;">
                    <wrapLayout orientation="horizontal" >
                        {#each topRatedMovies.slice(0,9) as movie}
                            <flexBoxLayout style="padding:2;">
                                <flexBoxLayout on:tap={() => viewMovie(movie)} style="background-image: url('{"https://image.tmdb.org/t/p/w342" + movie.poster_path}'); height:30%; width:30%; background-size: 100% 100%; align-items:flex-end; border-radius:4;" >
                                <label text="{numberImages()}"  class="h1 font my-label border" style=" padding-left:12;" />
                                </flexBoxLayout>
                            </flexBoxLayout>
                        {/each}
                    </wrapLayout>
                </flexBoxLayout>
            {/if}

            {#if !showFilterPage && !showGrid}
                <segmentedBar horizontalAlignment="center" width="auto" height="30"  backgroundColor="gray" on:selectedIndexChange={() => titleSearch(searchChoiceValue)} bind:selectedIndex={searchChoiceValue} selectedBackgroundColor="rgb(41, 41, 41)" style="margin-bottom:15;  margin-left:0; font-size: 14; color:white;">
                    <segmentedBarItem title="Title"  />
                    <segmentedBarItem title="Actor" />
                    <segmentedBarItem title="Director" />
                </segmentedBar>
                <searchBar on:textChange={titleSearch} borderRadius="50" bind:text={searchValue} style=" height:45; width:100%;  margin-bottom:18;" hint="Search by {placeholderText}" />
            {/if}
        </stackLayout>
        {#if showFilterPage && $showFilterBox}
            <scrollView scrollBarIndicatorVisible={false}>
                <stackLayout class="wrapper">
                    <label text="Filter" class="white font-weight-bold" style="font-size:19; margin-bottom:4;"/>
                    <gridLayout rows="auto,auto,auto">
                        <ShowFilter filterGenres={true} heading="Genres" rowNumber=0/>
                        <ShowFilter filterLanguages={true} heading="Language" rowNumber=1/>
                        <ShowFilter filterYear={true} heading="Year of release" noBorder={true} rowNumber=2/>
                    </gridLayout>
                    <button on:tap={filterSearch} class="button white" text="Set filter" />
                    <label text="{inputMessage}" class="white centerText inputMessage" />
                </stackLayout>
            </scrollView>
        {/if}

        {#if showFilterPage }
            <SearchResults heading={noResultsMessage} array={filterResults } /> 
        {/if}
        {#if !showFilterPage && searchChoiceValue === 0 && !showGrid}
            <SearchResults heading={noResultsMessage} array={searchResults } /> 
        {/if}
        
        {#if !showFilterPage && searchChoiceValue === 1 && $showActorsList && !showGrid}
            <ScrollViewCastCrew heading={noActorsResultsMessage} array={actors} useFunction={true}/>
        {/if}

        {#if !showFilterPage && searchChoiceValue === 2 && $showActorsList && !showGrid}
            <ScrollViewCastCrew heading={noDirectorsResultsMessage} array={directors} useFunction={true} director={true}/>
        {/if}
        {#if !showFilterPage && (searchChoiceValue === 1 || searchChoiceValue === 2) && !showGrid}
            <SearchResults arrayFromStore={true}/>
        {/if}
    </stackLayout>
</page>


<style>
    page{
        width:100%;
        height: 100%;
    }

   .h1{
       font-family:'Ultra-Regular'
   }

    .fas{
        color:white;
    }

    .container{
        height: 70;
        align-items: flex-start;
        padding:16 0 16 0;
    }

    .uppercase{
        flex: 2;
        text-transform: uppercase;
    }

    .wrapper{
        background-color: rgba(155,155,155,0.3);
        width:100%;
        height:auto;
        padding:8;
        border-radius: 10;
    }

    .button{
        background-color: rgba(155,155,155,0.3);
        margin-top:15;
    }

    .font{
        font-family: Verdana, Geneva, Tahoma, sans-serif;
        color:  white;
       
    }

</style>