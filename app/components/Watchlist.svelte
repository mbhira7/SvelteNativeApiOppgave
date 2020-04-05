<script>
    import { onMount } from 'svelte'
    import { db } from '../stores/stores.js'
    export let favourites 
    export let apiKey
    export let genresList
    import {showModal} from "svelte-native"
    import Movie from "../modals/Movie.svelte"

    const viewMovie = async (movie) => {
        await showModal({
            page: Movie,
            fullscreen:true,
            props:{
                movie:movie,
                apiKey:apiKey,
                genresList,genresList
            }
        })
    }
    
</script>


<page>
    <stackLayout class="background">
        <label style="margin-bottom:18; margin-top:12;" class="h2 white text-center" text="Watchlist" />
      <scrollView>
        <flexBoxLayout class="movies" >
            {#each favourites as movie}
            <gridLayout style="padding:10;" class="border" on:tap={() => viewMovie(movie)} columns="90,*" rows="140">
                <image  col="0" row="0" src={"https://image.tmdb.org/t/p/w185"+ movie.poster_path}  class="img-rounded" />
                <stackLayout col="1" row="1" style="margin-left:10;">
                    <label textWrap="true" flexWrapBefore={true} verticalAlignment="top" text="{movie.title}" style="font-size:16;" class="white font-weight-bold"/>
                    <label text="{movie.release_date.slice(0, 4)}" style="color:white; font-size:15; margin-top:5; " />
                     <flexBoxLayout style="flex-direction:row;">
                    {#each movie.genres.slice(0,3) as genre}
                       <label text="{genre.name} | " style="color:white; margin-bottom:6;" />
                    {/each}
                    </flexBoxLayout>
                    <flexBoxLayout style="justify-content:flex-start;">
                    <flexBoxLayout class="rating-box">
                        <label text="{movie.vote_average}" class="white" />
                    </flexBoxLayout>
                    </flexBoxLayout>
                </stackLayout>
            </gridLayout>
            {/each}
        </flexBoxLayout>
    </scrollView>
    </stackLayout>

</page>


<style>
   
    .border{
        border-bottom-color: #181e25;
        border-bottom-width: 3;
    }
    
    .movies{
        flex-direction: column;
    }

    .rating-box{
        justify-content: center;
        align-items:center;
        height:25;
        width:30;
        background-color: rgba(0,0,0,0.36);
        border-radius:4;
   }

</style>