<script>
    export let array
    export let heading
    import {showModal} from "svelte-native"
    import Movie from "../modals/Movie.svelte"
    export let genresList
    const apiKey="cffa047e4f2e83b565d15715e66d2a35"
    import { db } from '../stores/stores.js'

    const viewMovie = async (movie) => {
        await showModal({
            page: Movie,
            fullscreen:true,
            props:{
                movie:movie,
                genresList:genresList,
                apiKey:apiKey
            }
        })
    }
</script>


    <stackLayout >
        <flexBoxLayout class= "search background" >
        {#if array.length > 0}
            <label text="{heading}" class="font-weight-bold wite"/>
        {/if}
            <scrollView orientation="horizontal">
                <flexBoxLayout class="movies" >
                    {#if array.length >= 1}   
                        {#each array as movie}
                            <gridLayout on:tap={() => viewMovie(movie)} class="movie" rows="130,auto" columns="105" >
                                <image  col="0" row="0"  src={"https://image.tmdb.org/t/p/w185"+ movie.poster_path} class="img-rounded" />
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
       margin-left:-6;
   }

   .movie{
       justify-content: center;
       align-items: center;
      
   }

   .wite{
        margin-top:5; 
        margin-bottom:12;
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