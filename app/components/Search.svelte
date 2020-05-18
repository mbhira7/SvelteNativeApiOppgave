<script>
    import {onMount} from "svelte"
    import {showModal} from "svelte-native"
    import {getData,apiKey} from "../constants/constant.js"
    import {test,moviesByActor,showActorsList,filterChoiceValue,showFilterBox,chosenGenres,languageValue,decadeStartValue,decadeEndValue} from "../stores/stores.js"
    import DisplayMovies from "./DisplayMovies.svelte"
    import SearchResults from "./SearchResults.svelte"
    import ScrollViewCastCrew from "./ScrollViewCastCrew.svelte"
    import ShowFilter from "./ShowFilter.svelte"
    import Movie from "../modals/Movie.svelte"
    let searchResults = []
    let filterResults = []
    let showFilterPage = false
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
    let prom
    let showGrid = true
     $:placeholderText = searchChoiceValue === 0 ? "title" : place
     $:place = searchChoiceValue === 1 ? "actor" : "director"
    $:actors = personer.filter(person => person.known_for_department === "Acting")
    $:directors = personer.filter(person => person.known_for_department === "Directing")
   
    onMount(async () => {
        await getData(topRatedMoviesUrl)
            .then(res => topRatedMovies = res.results)
    })


   const titleSearch = async () => {
       
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


        if(searchChoiceValue === 0) {
            prom = await getData(`https://api.themoviedb.org/3/search/movie?query=${encodeURI(searchValue)}&api_key=${apiKey}`)
            searchResults = prom.results
        }

           
        else{
            await getData(`https://api.themoviedb.org/3/search/person?query=${encodeURI(searchValue)}&api_key=${apiKey}`)
            .then(res => personer = res.results)
            $moviesByActor = []
            
        }


        if(searchValue.length > 0 && searchResults.length === 0) {
           noResultsMessage = "Sorry, no results"
        }

        if(searchValue.length > 0 && actors.length === 0) {
           noActorsResultsMessage = "Sorry, no results"
        }

        if(searchValue.length > 0 && directors.length === 0) {
           noDirectorsResultsMessage = "Sorry, no results"
        }
    }

    const toggle1 = () => {
        showFilterPage = false
        showGrid = false
        title="Browse"
        $showFilterBox = false
        filterResults = ""
        noResultsMessage = ""
        inputMessage = ""

        console.log(searchValue.length)
    }

    const toggle2 = () => {
        showFilterPage = true
        title = "Filter"
        $showFilterBox = true
        filterResults = ""
        noResultsMessage = ""
        inputMessage = ""
    }

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
                    <image width="20" src="font://&#xf002;" class="fas " />
                </stackLayout>
                <label verticalAlignment="top" textAlignment="center" class="h2 white" text="{title}"/>
                <stackLayout on:tap={toggle2} verticalAlignment="top">
                    <image width="20" src="font://&#xf0b0;" class="fas" />
                </stackLayout>
            </flexBoxLayout>
            
            
            
            
            
        </stackLayout>
        
        <stackLayout >
            {#if showFilterPage === false }
                <segmentedBar horizontalAlignment="center" width="auto" height="30" backgroundColor="gray" selectedBackgroundColor="rgb(41, 41, 41)" on:selectedIndexChange={() => titleSearch(searchChoiceValue)} bind:selectedIndex={searchChoiceValue} style="margin-bottom:15;  margin-left:0; font-size: 14; color:white;">
                    <segmentedBarItem title="Title"  />
                    <segmentedBarItem title="Actor" />
                    <segmentedBarItem title="Director" />
                </segmentedBar>
                <searchBar on:textChange={titleSearch} borderRadius="50" bind:text={searchValue} style=" height:45; width:100%;  margin-bottom:18;" hint="Search by {placeholderText}" />
                {#if topRatedMovies.length > 0 && searchValue.length === 0 }
            <scrollView scrollBarIndicatorVisible={false}>
            <flexBoxLayout flexWrap="wrap" width="100%" style="justify-content:center; ">
                    <flexBoxLayout on:tap={() => viewMovie(topRatedMovies[0])} class="flex-end tester" style="background-image:url('{"https://image.tmdb.org/t/p/w780" + topRatedMovies[0].poster_path}')"  width="120" height="130" >
                        <label text="1" class="h1 white" />
                    </flexBoxLayout>
                    <flexBoxLayout on:tap={() => viewMovie(topRatedMovies[1])} class="flex-end tester" style="background-image:url('{"https://image.tmdb.org/t/p/w780" + topRatedMovies[1].poster_path}')"  width="110" height="80"  >
                        <label text="2" class="h1 white" />
                    </flexBoxLayout>
                    <flexBoxLayout on:tap={() => viewMovie(topRatedMovies[2])} class="flex-end tester" style="background-image:url('{"https://image.tmdb.org/t/p/w780" + topRatedMovies[2].poster_path}')" width="100" height="150"  >
                        <label text="3" class="h1 white" />
                    </flexBoxLayout>
                    <flexBoxLayout on:tap={() => viewMovie(topRatedMovies[3])} class="flex-end tester" style="background-image:url('{"https://image.tmdb.org/t/p/w780" + topRatedMovies[3].poster_path}')"  width="100" height="120" >
                        <label text="4" class="h1 white" />
                    </flexBoxLayout>
                    <flexBoxLayout on:tap={() => viewMovie(topRatedMovies[4])} class="flex-end tester" style="background-image:url('{"https://image.tmdb.org/t/p/w780" + topRatedMovies[4].poster_path}')"  width="130" height="120"  >
                        <label text="5" class="h1 white" />
                    </flexBoxLayout>
                    <flexBoxLayout on:tap={() => viewMovie(topRatedMovies[5])} class="flex-end tester" style="background-image:url('{"https://image.tmdb.org/t/p/w780" + topRatedMovies[5].poster_path}')"  width="100" height="150"  >
                        <label text="6" class="h1 white" />
                    </flexBoxLayout>
                    <flexBoxLayout on:tap={() => viewMovie(topRatedMovies[6])} class="flex-end tester" style="background-image:url('{"https://image.tmdb.org/t/p/w780" + topRatedMovies[6].poster_path}')"  width="180" height="110" >
                        <label text="7" class="h1 white" />
                    </flexBoxLayout>
                    <flexBoxLayout on:tap={() => viewMovie(topRatedMovies[7])} class="flex-end tester" style="background-image:url('{"https://image.tmdb.org/t/p/w780" + topRatedMovies[7].poster_path}')"  width="150" height="110" >
                        <label text="8" class="h1 white" />
                    </flexBoxLayout>
                </flexBoxLayout>

            </scrollView>
                {/if}
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
        {#if !showFilterPage && searchChoiceValue === 0}
            <SearchResults heading={noResultsMessage} array={searchResults } /> 
        {/if}
        
        {#if !showFilterPage && searchChoiceValue === 1 && $showActorsList}
            <ScrollViewCastCrew heading={noActorsResultsMessage} array={actors} useFunction={true}/>
        {/if}

        {#if !showFilterPage && searchChoiceValue === 2 && $showActorsList}
            <ScrollViewCastCrew heading={noDirectorsResultsMessage} array={directors} useFunction={true} director={true}/>
        {/if}
        {#if !showFilterPage && (searchChoiceValue === 1 || searchChoiceValue === 2)}
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

   .tester{
        background-size: 100% 100%;
         background-repeat: no-repeat;
         padding:6;
        border-radius:4;
    
   }
    
    .fas{
        color:white;
    }

    .container{
        height: 70;
        align-items: flex-start;
        padding:16 0 16 0;
    }

    .h2{
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


</style>