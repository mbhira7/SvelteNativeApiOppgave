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
        <flexBoxLayout class= "search " >
        {#if array.length > 0}
            <label text="{heading}" class="font-weight-bold wite" />
        {/if}
            <scrollView orientation="horizontal" scrollBarIndicatorVisible={false}>
                <flexBoxLayout class="movies" >
                    {#if array.length >= 1}   
                        {#each array as movie}
                            <gridLayout on:tap={() => viewMovie(movie)} class="movie" rows="130,auto" columns="105" >
                                <image  col="0" row="0"  src={"https://image.tmdb.org/t/p/w185"+ movie.poster_path} style="border-radius:18;" />
                                <flexBoxLayout col="1" class="rating-box text-center"  verticalAlignment="top" horizontalAlignment="right">
                                    <label  class="text-center white" style="font-size:14;" text="{movie.vote_average}" />
                                </flexBoxLayout>
                                <label row="1"  style="color:white; padding:10; font-size:14;" text="{movie.title}" />
                            </gridLayout>
                        {:else}
                            <activityIndicator busy={true} />
                        {/each}       
                    {/if}
                </flexBoxLayout>
            </scrollView>
        </flexBoxLayout>
    </stackLayout>




<style>


   .movies{
       justify-content: flex-start;
       align-items: flex-start;
       margin-bottom:25;
   }

   .movie{
       justify-content: center;
       align-items: center;
      
   }

   .wite{
       margin:5 0 12 9;
        color:rgb(255, 255, 255);
        font-size:17;
   }


   .search{
        flex-direction: column;
        align-items: flex-start;
   }

   .rating-box{
        margin-right:9;
        justify-content: center;
        align-items:center;
        height:25;
        width:30;
        background-color: rgba(0,0,0,0.36);
        border-radius:4;
   }

</style>