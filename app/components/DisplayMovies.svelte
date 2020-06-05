<script>
    import {showModal} from "svelte-native"
    import Movie from "../modals/Movie.svelte"
    import {w500PosterUrl} from "../constants/constant.js"
    export let array
    export let heading

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

<stackLayout style="padding-left:8;" >
    <flexBoxLayout class= "search " >
        {#if array.length > 0}
            <label text="{heading}" class="font-weight-bold wite" />
        {/if}
        <scrollView orientation="horizontal" scrollBarIndicatorVisible={false}>
            <flexBoxLayout class="movies" >
                {#if array.length > 0}   
                    {#each array as movie}
                        <gridLayout on:tap={() => viewMovie(movie)} class="movie" rows="140,auto" columns="110" >
                            <image  col="0" row="0"  src={w500PosterUrl + movie.poster_path} style="border-radius:12;" />
                            <flexBoxLayout col="1" class="rating-box text-center" style="margin-right:3;" verticalAlignment="top" horizontalAlignment="right">
                                <label  class="text-center white" style="font-size:14;" text="{movie.vote_average}" />
                            </flexBoxLayout>
                            <label row="1" class="white font-size-14" style="padding:10;" text="{movie.title}" />
                        </gridLayout>
                    {/each} 
                {:else}
                    <activityIndicator busy={true} />
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


</style>