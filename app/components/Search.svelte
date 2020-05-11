<script>
    import {onMount} from "svelte"
    import {showModal} from "svelte-native"
    import {getData,apiKey} from "../constants/constant.js"
    import {showActorsList,chosenActor,filterChoiceValue,searchChoiceValue,showFilterBox,chosenGenres,languageValue,decadeStartValue,decadeEndValue} from "../stores/stores.js"
    import DisplayMovies from "./DisplayMovies.svelte"
    import SearchResults from "./SearchResults.svelte"
    import ScrollViewCastCrew from "./ScrollViewCastCrew.svelte"
    import ShowFilter from "./ShowFilter.svelte"
    let searchResults = []
    let filterResults = []
    let showFilterPage 
    let title = "Browse"
    let noResultsMessage
    let inputMessage
    let inputValue
    let searchValue
    $:placeholderText = $searchChoiceValue === 0 ? "title" : "actor"
    const topRatedMoviesUrl = `https://api.themoviedb.org/3/movie/top_rated?api_key=${apiKey}`
    let topRatedMovies = []
    let personer = []
    let prom
    $:actors = personer.filter(person => person.known_for_department === "Acting")
    $:directors = personer.filter(person => person.known_for_department === "Directing")
    
    onMount(async () => {
        await getData(topRatedMoviesUrl)
            .then(res => topRatedMovies = res.results)
    })


   const titleSearch = async () => {
       noResultsMessage =""
       if(searchValue.length === 0) { 
            searchResults = ""
            noResultsMessage = ""
            return 
        }

        if($searchChoiceValue === 0) {
            prom = await getData(`https://api.themoviedb.org/3/search/movie?query=${encodeURI(searchValue)}&api_key=${apiKey}`)
            searchResults = prom.results
        }
           
        else{
            await getData(`https://api.themoviedb.org/3/search/person?query=${encodeURI(searchValue)}&api_key=${apiKey}`)
            .then(res => personer = res.results)
            $showActorsList = true
        }

        if(searchValue.length > 1 && searchResults.length === 0) {
           noResultsMessage = "Sorry, no results"
        }
    
    }

    const toggle1 = () => {
        showFilterPage = false
        title="Search"
        $showFilterBox = false
        filterResults = ""
        noResultsMessage = ""
        inputMessage = ""
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

        if($languageValue != "" || $chosenGenres.length >= 1 || $decadeEndValue != "" | $decadeStartValue != "" ) {
            await getData(`https://api.themoviedb.org/3/discover/movie?with_original_language=${$languageValue}&with_genres=${encodeURI(inputValue)}&primary_release_date.gte=${$decadeStartValue}&primary_release_date.lte=${$decadeEndValue}&api_key=${apiKey}`)
                .then(res => filterResults = res.results)
            noResultsMessage = ""
        }
        
        else{
            inputMessage = "Please filter by at least one parameter"
            filterResults = ""
        }

        if(($languageValue != "" || $chosenGenres.length >= 1 || $decadeEndValue != "" | $decadeStartValue != "") && filterResults.length < 1 ) {
            noResultsMessage = "Sorry, no results"
            $showFilterBox = false
        }

        if(filterResults.length >= 1) {
            $showFilterBox = false
        }
    }

</script>

  <page>
    <stackLayout class="background" style="padding:16; ">
        <stackLayout>
            <flexBoxLayout class="container">
                <stackLayout verticalAlignment="top">
                    <image width="20" src="font://&#xf002;" class="fas " on:tap={toggle1}/>
                </stackLayout>
                <label verticalAlignment="top" textAlignment="center" class="h2 white" text="{title}"/>
                <stackLayout verticalAlignment="top">
                    <image width="20" src="font://&#xf0b0;" class="fas" on:tap={toggle2}/>
                </stackLayout>
            </flexBoxLayout>
        </stackLayout>
        <stackLayout >
            {#if showFilterPage === false}
                <segmentedBar horizontalAlignment="center" width="auto" height="30" selectedBackgroundColor="pink" bind:selectedIndex={$searchChoiceValue} style="margin-bottom:15;  margin-left:0; font-size: 14; color:black;">
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
        {#if !showFilterPage && $searchChoiceValue === 0}
            <SearchResults heading={noResultsMessage} array={searchResults } /> 
        {/if}
        {#if !showFilterPage && $searchChoiceValue === 1 && $showActorsList}
            <ScrollViewCastCrew array={actors} useFunction={true}/>
        {/if}
        {#if !showFilterPage && $searchChoiceValue === 2 && $showActorsList}
            <ScrollViewCastCrew array={directors} useFunction={true} director={true}/>
        {/if}
        {#if !showFilterPage && ($searchChoiceValue === 1 | $searchChoiceValue === 2)}
            <SearchResults arrayFromStore={true}/>
        {/if}
    </stackLayout>
</page>


<style>
    page{
        background-image: linear-gradient(rgb(190, 122, 117), rgb(41, 67, 91));
        width:100%;
        height: 100%;
   }

   .tester{
        height:100;
        background-size:cover;
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