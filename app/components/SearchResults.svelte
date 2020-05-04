<script>
    import {showModal} from "svelte-native"
    import Movie from "../modals/Movie.svelte"
    export let array
    export let heading
    export let chosenGenres

    const viewMovie = async (movie) => {
        await showModal({
            page: Movie,
            fullscreen:true,
            props:{
                movie:movie,
                chosenGenres:chosenGenres
            }
        })
    }

</script>


    <stackLayout >
        <scrollView scrollBarIndicatorVisible={false}>
            <stackLayout class="movies" >
                <label text="{heading}" class="h2 white centerText" />
                {#if array.length >= 1}   
                    {#each array as movie}
                        <gridLayout on:tap={() => viewMovie(movie)} class="movie" rows="130" columns="90,*"  >
                            <image  col="0"  src={"https://image.tmdb.org/t/p/w185"+ movie.poster_path} style="border-radius:7;" />
                            <flexBoxLayout verticalAlignment="top" style="justify-content:flex-end; align-items:flex-end;">
                                <flexBoxLayout col="0" class="rating-box text-center" >
                                    <label  class=" white" style="font-size:14;" text="{movie.vote_average}" />
                                </flexBoxLayout>
                            </flexBoxLayout>
                                <stackLayout col="1" class="tester" style="margin-left:15;">
                                    <label class="font-weight-bold"  textWrap="true" flexWrapBefore={true} verticalAlignment="top" style="color:white; font-size:16; " text="{movie.title}" />
                                    <label whiteSpace="nowrap" style="font-size:15;" class="white tester" textWrap="true" flexWrapBefore={true} text="{movie.overview} " />
                                </stackLayout>
                            </gridLayout>
                        {:else}
                            <activityIndicator busy={true} />
                        {/each}       
                    {/if}
                </stackLayout>
            </scrollView>
       
    </stackLayout>




<style>


   

   .movie{
       margin-bottom:15;
   }

   .tester{
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
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