<script>
    import {showActorsList,moviesByActor,tekst} from "../stores/stores.js"
    import {getData,apiKey,w500PosterUrl } from "../constants/constant.js"
    import SearchResults from "./SearchResults.svelte"
    export let array
    export let heading
    export let useFunction
    export let director
    export let testVerdi

    if(testVerdi){
       //Endrer objektnavn
        array.map(c => {
            if(c.job === "Original Music Composer"){
                c.job = "Music"
            }
        })
    
    }

    /*Bruker den valgte personen sin id til å fetche ut filmer personen har spilt inn i/regissert
    (basert på om brukeren har valgt å søke etter actor/director)*/
    const setActorDirector = async (id) => {
        if(director){
            await getData(`https://api.themoviedb.org/3/person/${id}/combined_credits?api_key=${apiKey}`)
            .then(res => $moviesByActor = res.crew.filter(a => {
                return a.job === "Director" && a.release_date
            }))
            
        }
        else{
            await getData(`https://api.themoviedb.org/3/person/${id}/combined_credits?api_key=${apiKey}`)
            .then(res => $moviesByActor = res.cast.filter(a => a.release_date))
        }


        $showActorsList = false

        if($moviesByActor.length === 0 && !$showActorsList){
            $tekst = "Sorry,no results"
        }
        
    }

</script>


<scrollView orientation="horizontal" scrollBarIndicatorVisible={false} class={useFunction ? "margin-bottom-10" : ""}>
    <flexBoxLayout >
        <label text="{heading}" class={heading ? "h2 white text-center" : ""} />
        {#if array.length > 0}
            {#each array.slice(0,8) as item}
                <stackLayout style="margin-right:30;" on:tap={useFunction ? setActorDirector(item.id) : ""}>
                    <flexBoxLayout style="height:70; width:70;">
                        <image  stretch="aspectFill" class="thumb img-circle"  style="width:100%; height:100%; " src={w500PosterUrl + item.profile_path} />
                    </flexBoxLayout>
                    {#if !useFunction && item.job}
                        <label  class="font-weight-bold text-center white font-size-14 margin-top-8" textWrap="true"  style="width:80; " text="{item.job} " />
                    {/if}
                    <label textWrap="true" class="{item.job ? "" : "margin-top-8"} text-center white width-75 font-size-14"  text="{item.name} " />
                </stackLayout>
            {/each}
        {/if}
    </flexBoxLayout>
</scrollView>



