<script>
    import {showModal} from "svelte-native"
    import Movie from "../modals/Movie.svelte"
    import {tekst,moviesByActor,showActorsList} from "../stores/stores.js"
    import {w500PosterUrl} from "../constants/constant.js"
    export let array
    export let arrayFromStore
    export let heading
    let list
    $:list = arrayFromStore ? $moviesByActor : array 


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


<stackLayout >
    <scrollView scrollBarIndicatorVisible={false}>
        <stackLayout >
            <label text="{heading}" class={heading ? "h2 white " : ""} />
            <label text="{$tekst}" class={$tekst ? "h2 white " : ""} />
            {#if list.length > 0}
                {#each list as movie}
                    <gridLayout on:tap={() => viewMovie(movie)} class="movie" rows="130" columns="90,*"  >
                        <image  col="0"  src={w500PosterUrl + movie.poster_path} style="border-radius:7;" />
                        <flexBoxLayout verticalAlignment="top" style="justify-content:flex-end; align-items:flex-end;">
                            <flexBoxLayout col="0" class="rating-box text-center" >
                                <label  class=" white" style="font-size:14;" text="{movie.vote_average}" />
                            </flexBoxLayout>
                        </flexBoxLayout>
                        <stackLayout col="1" style="margin-left:15;">
                            <label class="font-weight-bold"  textWrap="true" flexWrapBefore={true} verticalAlignment="top" style="color:white; font-size:16; " text="{movie.title}" />
                            <label style="font-size:15;" class="white" textWrap="true" flexWrapBefore={true} text="{movie.overview} " />
                        </stackLayout>
                    </gridLayout>
                {/each}       
            {/if}
        </stackLayout>
    </scrollView>
</stackLayout>




<style>

   .movie{
       margin-bottom:15;
   }

   .rating-box{
        justify-content: center;
        align-items:center;
        margin-right:1;
        height:25;
        width:30;
        background-color: rgba(0,0,0,0.36);
        border-radius:4;
   }

</style>