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
        <label style="color:white; text-align:center; margin-bottom:18;" class="h2" text="Watchlist" />
      <scrollView>
        <flexBoxLayout class="movies">
            {#each favourites as movie}
            <gridLayout on:tap={() => viewMovie(movie)} columns="90,*" rows="140">
                <image  col="0" row="0" src={"https://image.tmdb.org/t/p/w185"+ movie.poster_path}  style="margin-bottom:12;" stretc="aspectFit"/>
                <label verticalAlignment="top" col="1" row="1" text="{movie.title}" style="color:white; font-size:17;" />
            </gridLayout>
            {/each}
        </flexBoxLayout>
    </scrollView>
    </stackLayout>

</page>


<style>
    .bakgrunn{
        background-color: #101822;
        padding:12;
    }

    .movies{
        flex-direction: column;
    }

</style>