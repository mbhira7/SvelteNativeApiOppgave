<script>
    import { onMount } from 'svelte'
    import { db } from '../stores/stores.js'
    export let favourites 
    export let getData
    export let genresList
    export let apiKey
    import {showModal} from "svelte-native"
    import Movie from "../modals/Movie.svelte"
    let favouriteDetails = []
    //const tester = `https://api.themoviedb.org/3/movie/${favourites.id}?api_key=${apiKey}&language=en-US`

    const viewMovie = async (movie) => {
        await showModal({
            page: Movie,
            fullscreen:true,
            props:{
                movie:movie,
                genresList:genresList,
                apiKey:apiKey,
                getData:getData
            }
        })
    }
</script>


<page>
    <stackLayout class="bakgrunn">
        <label style="color:white; text-align:center; margin-bottom:18; margin-top:12;" class="h2" text="Watchlist" />
      <scrollView>
        <flexBoxLayout class="movies">
            {#each favourites as movie}
             
            <gridLayout class="border" on:tap={() => viewMovie(movie)} columns="120,*" rows="140">
            
                <image  col="0" row="0" src={"https://image.tmdb.org/t/p/w185"+ movie.poster_path}  class="img-rounded" style="margin-bottom:8;" stretc="aspectFit"/>
           
                <stackLayout col="1" row="1">
                    <label textWrap="true" flexWrapBefore={true} verticalAlignment="top" text="{movie.title}" style="color:white; font-size:16;" class="font-weight-bold"/>
                    <label text="{movie.release_date.slice(0, 4)}" style="color:white; font-size:15; margin-top:5; margin-bottom:5;" />
                    <flexBoxLayout style="justify-content:flex-start;">
                    <flexBoxLayout class="rating-box">
                        <label text="{movie.vote_average}" style="color:white" />
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
    .bakgrunn{
        background-color: #101822;
    }


    .border{
        border-bottom-color: #181e25;
        border-bottom-width: 3;
        margin-bottom: 8;
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