<script>
    import { onMount } from 'svelte'
    import {showModal} from "svelte-native"
    import { db,genresList } from '../stores/stores.js'
    import Movie from "../modals/Movie.svelte"
    export let favourites 
    let searchValue = ""
    $:filtrerte = favourites.filter(favourite => favourite.title.toLowerCase().includes(searchValue.toLowerCase()))

    const viewMovie = async (favourite) => {
        await showModal({
            page: Movie,
            fullscreen:true,
            props:{
                movie:favourite
            }
        })
    }
</script>


<page>
    <stackLayout class="background" style="padding:16;">
        <label style="margin-bottom:18; margin-top:12;" class="h2 white text-center" text="Watchlist" />
        {#if favourites.length > 0}
            <searchBar bind:text={searchValue}  style=" height:45; width:100%;  margin-bottom:15;" hint="Search in your favourites" />
        {:else}
            <label text="Add your favourites first!" class="white text-center" />
        {/if}
        <scrollView scrollBarIndicatorVisible={false}>
            <flexBoxLayout class="movies" >
                {#each filtrerte as favourite}
                    <gridLayout class="border" on:tap={() => viewMovie(favourite)} columns="90,*" rows="auto">
                        <image  col="0" row="0" src={"https://image.tmdb.org/t/p/w500"+ favourite.poster_path}  class="img-rounded" />
                        <stackLayout col="1" row="1" style="margin-left:10;">
                            <label textWrap="true"  verticalAlignment="top" text="{favourite.title}" style="font-size:16;" class="white font-weight-bold"/>
                            <label text="{favourite.release_date.slice(0, 4)}" class="white" style="font-size:15; margin-top:5; " />
                            <flexBoxLayout style="flex-direction:row;">
                                {#each favourite.genre_names.slice(0,3) as genre}
                                    <label text="{genre} " class="white" style=" margin-bottom:6;" />
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
        padding:10 0 10 0;
    }
    
    .movies{
        flex-direction: column;
    }

</style>