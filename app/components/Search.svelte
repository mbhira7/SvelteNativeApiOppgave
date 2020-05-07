<script>
    import {onMount} from "svelte"
    import {showModal} from "svelte-native"
    import {getData,apiKey} from "../constants/constant.js"
    import {choiceValue,showFilterSection,chosenGenres,languageValue,decadeStartValue,decadeEndValue} from "../stores/stores.js"
    import DisplayMovies from "./DisplayMovies.svelte"
    import SearchResults from "./SearchResults.svelte"
    import ShowFilter from "./ShowFilter.svelte"
    let searchResults = []
    let searchResults2 = []
    let filterResults = []
    let searchValue = ""
    let showGenres
    let prom 
    let prom2
    let prom3
    let title = "Browse"
    let message
    let inputMessage
    let inputValue
    let actorID
    let prom4 = []
   
   const titleSearch = async () => {
       prom4 = []
       if(searchValue.length >= 1) {
           if($choiceValue === 0) {
               prom = await getData(`https://api.themoviedb.org/3/search/movie?query=${encodeURI(searchValue)}&api_key=${apiKey}`)
               searchResults = prom.results
           }
           if($choiceValue === 1){
                prom = await getData(`https://api.themoviedb.org/3/search/person?query=${encodeURI(searchValue)}&api_key=${apiKey}`)
                prom2 = await prom.results.filter (search => {
                    //search.name === searchValue
                    return search.known_for_department === "Acting"
                    //actorID = search.id
                })
                prom2.forEach(person => {
                    actorID = person.id
                    prom3 = getData(`https://api.themoviedb.org/3/person/${encodeURI(actorID)}/combined_credits?api_key=${apiKey}`)
                    .then((obj)=>{
                        //console.log(obj.cast)
                        prom4 = obj.cast
                    })
                    //searchResults = prom3.cast
                    
                })
                //console.log(prom4)
                //actorID = prom2[0].id
                //prom3 = await getData(`https://api.themoviedb.org/3/person/${encodeURI(actorID)}/combined_credits?api_key=${apiKey}`)
                
                
           }
                
           /*else{
               prom2 = await getData(`https://api.themoviedb.org/3/search/person?query=${encodeURI(searchValue)}&api_key=${apiKey}`)
                actorID =  await prom2.results[0].id
                prom = await getData(`https://api.themoviedb.org/3/person/${encodeURI(actorID)}/combined_credits?api_key=${apiKey}`)
                searchResults = prom.crew.filter(search => search.job === "Director")
           }*/
          
            //prom3 = await getData(`https://api.themoviedb.org/3/person/${encodeURI(actorID)}/movie_credits?api_key=cffa047e4f2e83b565d15715e66d2a35`)
            
       }
       else{
           searchResults = ""
           message = ""
           actorID = ""
        }
        if(searchValue.length > 1 && searchResults.length === 0) {
           
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
        inputValue = $choiceValue === 1 ? $chosenGenres : $chosenGenres.join("|")

        if($languageValue != "" || $chosenGenres.length >= 1 || $decadeEndValue != "" | $decadeStartValue != "" ) {
            await getData(`https://api.themoviedb.org/3/discover/movie?with_original_language=${$languageValue}&with_genres=${encodeURI(inputValue)}&primary_release_date.gte=${$decadeStartValue}&primary_release_date.lte=${$decadeEndValue}&api_key=${apiKey}`)
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
                <segmentedBar horizontalAlignment="center"  width="200" height="30" selectedBackgroundColor="pink" bind:selectedIndex={$choiceValue} style="margin-bottom:15;  margin-left:0; font-size: 14; color:black;">
                    <segmentedBarItem title="Title"  />
                    <segmentedBarItem title="Actor" />
                    <segmentedBarItem title="Director" />
                </segmentedBar>
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
                <label text="{inputMessage}" class="white centerText inputMessage" />
            </stackLayout>
        </scrollView>
         {/if}
         {#if showGenres === true}
            <SearchResults heading={message} array={filterResults } /> 
        {:else}
            <SearchResults array={prom4} heading={message}/> 
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