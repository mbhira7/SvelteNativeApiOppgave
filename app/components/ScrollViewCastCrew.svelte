<script>
    import {showActorsList,moviesByActor,test} from "../stores/stores.js"
    import {getData,apiKey} from "../constants/constant.js"
    import SearchResults from "./SearchResults.svelte"
    export let array
    export let heading
    export let useFunction
    export let director

    const setActor = async (id) => {
        if(director){
            await getData(`https://api.themoviedb.org/3/person/${id}/combined_credits?api_key=${apiKey}`)
            .then(res => $moviesByActor = res.crew.filter(a => {
                return a.job === "Director" && a.release_date
            }))
            //$test = true
        }
        else{
            await getData(`https://api.themoviedb.org/3/person/${id}/combined_credits?api_key=${apiKey}`)
            .then(res => $moviesByActor = res.cast.filter(a => a.release_date))
            //$test = true
        }

        $showActorsList = false
        
    }
</script>



    <scrollView orientation="horizontal" scrollBarIndicatorVisible={false} class={useFunction ? "margin-bottom-10" : ""}>
        <flexBoxLayout >
        
        <label text="{heading}" class={heading ? "h2 white text-center" : ""} />
        
        {#if array.length > 0}
            {#each array as item}
                <stackLayout style="margin-right:30;" on:tap={useFunction ? setActor(item.id) : ""}>
                    <flexBoxLayout style="height:70; width:70;">
                        <image  stretch="aspectFill" class="thumb img-circle"  style="width:100%; height:100%; " src={"https://image.tmdb.org/t/p/w500"+ item.profile_path} />
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



