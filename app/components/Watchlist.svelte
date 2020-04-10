<script>
    import { onMount } from 'svelte'
    import { db } from '../stores/stores.js'
    export let favourites 
    export let apiKey
    import {showModal} from "svelte-native"
    import Movie from "../modals/Movie.svelte"
    export let genresList

    const viewMovie = async (favourite) => {
        await showModal({
            page: Movie,
            fullscreen:true,
            props:{
                movie:favourite,
                apiKey:apiKey,
                genresList:genresList
            }
        })
    }
</script>


<page>
    <stackLayout class="background">
        <label style="margin-bottom:18; margin-top:12;" class="h2 white text-center" text="Watchlist" />
      <scrollView>
        <flexBoxLayout class="movies" >
            {#each favourites as favourite}
            <gridLayout style="padding:10;" class="border" on:tap={() => viewMovie(favourite)} columns="90,*" rows="140">
                <image  col="0" row="0" src={"https://image.tmdb.org/t/p/w185"+ favourite.poster_path}  class="img-rounded" />
                <stackLayout col="1" row="1" style="margin-left:10;">
                    <label textWrap="true" flexWrapBefore={true} verticalAlignment="top" text="{favourite.title}" style="font-size:16;" class="white font-weight-bold"/>
                    <label text="{favourite.release_date.slice(0, 4)}" style="color:white; font-size:15; margin-top:5; " />
                     <flexBoxLayout style="flex-direction:row;">
                    {#each favourite.genre_names.slice(0,3) as genre}
                       <label text="{genre} | " style="color:white; margin-bottom:6;" />
                    {/each}
                    </flexBoxLayout>
                    <flexBoxLayout style="justify-content:flex-start;">
                    <flexBoxLayout class="rating-box">
                        <label text="{favourite.vote_average}" class="white" />
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