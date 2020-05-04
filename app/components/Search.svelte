<script>
    import {onMount} from "svelte"
    import {showModal} from "svelte-native"
    import {getData,apiKey} from "../constants/constant.js"
    import {showFilterSection,chosenGenres,languageValue,decadeStartValue,decadeEndValue,languagesList,choiceValue} from "../stores/stores.js"
    import DisplayMovies from "./DisplayMovies.svelte"
    import SearchResults from "./SearchResults.svelte"
    import ShowFilter from "./ShowFilter.svelte"
    let searchResults = []
    let filterResults = []
    let searchValue = ""
    let showGenres
    let prom 
    let title = "Browse"
    let message
    let inputMessage
    let heading
    $:{
        heading = searchValue.length >= 1 && (searchResults === "") ? "No results" : "Search results"
    }

   const titleSearch = async () => {
       if(searchValue.length >= 1) {
            prom = await getData(`https://api.themoviedb.org/3/search/movie?query=${encodeURI(searchValue)}&api_key=${apiKey}`)
            //prom = await getData(`https://api.themoviedb.org/3/search/person?query=${encodeURI(searchValue)}&api_key=${apiKey}`)
            searchResults = prom.results
       }
       else{
           searchResults = ""
       }
    }

    const toggle1 = () => {
        showGenres = false
        title="Search"
        $showFilterSection = false
        filterResults = ""
        message = ""
        inputMessage = ""
    }

    const toggle2 = () => {
        showGenres = true
        title = "Filter"
        $showFilterSection = true
        filterResults = ""
        message = ""
        inputMessage = ""
    }

    const filterSearch = async () => {
       //$chosenGenres = $choiceValue === 0 ? $chosenGenres.join("|") : $chosenGenres
       
        if($languageValue != "" || $chosenGenres.length >= 1 || $decadeEndValue != "" | $decadeStartValue != "" ) {
            await getData(`https://api.themoviedb.org/3/discover/movie?with_original_language=${$languageValue}&with_genres=${$chosenGenres}&primary_release_date.gte=${$decadeStartValue}&primary_release_date.lte=${$decadeEndValue}&api_key=${apiKey}`)
                .then(res => filterResults = res.results)
            message = ""
        }
        
        else{
            inputMessage = "Please filter by at least one parameter"
            filterResults = ""
        }

         if(($languageValue != "" || $chosenGenres.length >= 1 || $decadeEndValue != "" | $decadeStartValue != "") && filterResults.length < 1 ) {
             message = "No results"
             $showFilterSection = false
         }

        if(filterResults.length >= 1) {
            $showFilterSection = false
        }

        console.log($choiceValue)

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
         <stackLayout>
            {#if showGenres === false}
                <searchBar on:textChange={titleSearch} bind:text={searchValue} style=" height:45; width:100%;  margin-bottom:18;" hint="Search by title" />
            {/if}   
        </stackLayout>
        {#if showGenres === true && $showFilterSection===true}
        <scrollView scrollBarIndicatorVisible={false}>
            <stackLayout class="wrapper">
                <label text="Filter" class="white font-weight-bold" style="font-size:19; margin-bottom:4;"/>
                <gridLayout rows="auto,auto,auto">
                    <ShowFilter filterGenres={true} heading="Genres" rowNumber=0/>
                    <ShowFilter filterLanguages={true} heading="Language" rowNumber=1/>
                    <ShowFilter filterYear={true} heading="Year of release" noBorder={true} rowNumber=2/>
                </gridLayout>
                <button on:tap={filterSearch} class="button white" text="Set filter" />
                <label text="{inputMessage}" class="white centerText" />
            </stackLayout>
        </scrollView>
         {/if}
         {#if showGenres === true}
            <SearchResults heading={message} array={filterResults } chosenGenres={chosenGenres}/> 
        {:else}
            <SearchResults array={searchResults} chosenGenres={chosenGenres}/> 
        {/if}
    </stackLayout>
</page>


<style>
    page{
        background-image: linear-gradient(rgb(190, 122, 117), rgb(41, 67, 91));
        width:100%;
        height: 100%;
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