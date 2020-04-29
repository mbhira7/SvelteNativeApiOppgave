<script>
    import {closeModal} from "svelte-native"
    import {getData,apiKey} from "../constants/constant.js"
    import { db,uniqueKey,genresList } from '../stores/stores.js'
    import { onMount } from 'svelte'
    export let movie
    const appSettings = require("tns-core-modules/application-settings")
    const movies = $db.collection($uniqueKey)
    const checkMovie = movies.doc(`${movie.id}`)
    const casting = `https://api.themoviedb.org/3/movie/${movie.id}/credits?api_key=${apiKey}`
    let genreNames = []
    let showEmptyIcon = true
    let actors = []

    onMount(() => {
        
    getData(casting)
        .then(res => actors = res.cast)

    })

    checkMovie.onSnapshot(doc => {
        if (doc.exists) {
            showEmptyIcon = false
        } 
        else {
            showEmptyIcon = true
        }
    })

    movie.genre_ids.forEach(
        movieId => {
            const indeks = $genresList.findIndex(genre => genre.id === movieId)
            genreNames = [...genreNames, $genresList[indeks].name]    
        }
    )

   
    const addAndDelete = () => {
        appSettings.setString("unique-key", $uniqueKey)
        showEmptyIcon = !showEmptyIcon

        if(!showEmptyIcon) {
            movies.doc(`${movie.id}`).set({
                id:movie.id,
                title: movie.title,
                poster_path: movie.poster_path,
                genre_ids:movie.genre_ids,
                genre_names:genreNames,
                vote_average:movie.vote_average,
                overview:movie.overview,
                release_date:movie.release_date
            })
        }
        else{
            movies.doc(`${movie.id}`).delete()
        }
    }
   
</script>

<frame>
    <page>
     <actionBar title="{movie.title}">
        <actionItem on:tap={ () => closeModal() }
            android.systemIcon = "ic_menu_close_clear_cancel"
            android.position="actionBar"
            ios.systemIcon="14" 
            ios.position="right"
        />
        </actionBar>
    <scrollView>
        <flexBoxLayout class="m-y-60" style="flex-direction:column; margin:0 50 0 50;">
            <image src={"https://image.tmdb.org/t/p/w185"+ movie.poster_path} class="image img-rounded " style="margin-top:18; " stretch="aspectFill"/>
            <gridLayout   row="1" columns="170,*" style="margin-top:10; margin-bottom:3;">
                <label textAlignment="left" textWrap="true" row="1" col="0" class="font-weight-bold white " style="font-size:18;  " text="{movie.title}" />
                <gridLayout col="1"  verticalAlignment="top" horizontalAlignment="right">
                    <label textAlignment="right" style="font-size:18; margin-right:25;" class="font-weight-bold  white" text="{movie.vote_average}/10"/>
                     <flexBoxLayout  style="height:22; width:14; " horizontalAlignment="right" >
                        {#if showEmptyIcon}
                            <image on:tap={addAndDelete} src="font://&#xf02e;" style="height:100%; width:100%;" class="far" />
                        {:else}
                            <image on:tap={addAndDelete} src="font://&#xf02e;" style="height:100%; width:100%;" class="fas " />
                        {/if}
                    </flexBoxLayout>
                </gridLayout>

            </gridLayout>
        <flexBoxLayout>
            {#each genreNames.slice(0,3) as genreName}
                <label textWrap="true" text="{genreName} | " class="white" style="font-size:16; margin-bottom:3; "/>
            {/each}
        </flexBoxLayout>
            <label class="white " style="font-size:16; margin-bottom:8;" text="{movie.release_date.slice(0, 4)}" />
            <label class="white" style="font-size:16;"col="0" textWrap="true" row="2" text="{movie.overview}"  lineHeight="7" />
            <label class="font-weight-bold white" text="Cast" style="margin-top:15; margin-bottom:10;"/>
            <scrollView orientation="horizontal">
                <flexBoxLayout >
                    {#each actors.slice(0,5) as actor}
                        <stackLayout style="margin-right:30;" >
                            <flexBoxLayout style="height:70; width:70;">
                                <image  stretch="aspectFill" class="thumb img-circle"  style="width:100%; height:100%; " src={"https://image.tmdb.org/t/p/w185"+ actor.profile_path} />
                            </flexBoxLayout>
                            <label textAlignment="center" textWrap="true" flexWrapBefore={true} style="color:white; margin-top:8; font-size:14; width:72; " text="{actor.name}" />
                        </stackLayout>
                    {/each}
                </flexBoxLayout>
            </scrollView>
        </flexBoxLayout>
    </scrollView>
    </page>
</frame>


<style>
    
    .image{
        height:370;
    }

    .far{
        color:white;
    }

    .fas{
        color:white;
    }

    
</style>