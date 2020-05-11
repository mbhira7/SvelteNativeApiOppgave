<script>
    import { onMount } from 'svelte'
    import {closeModal} from "svelte-native"
    import {getData,apiKey} from "../constants/constant.js"
    import { db,uniqueKey,genresList } from '../stores/stores.js'
    import ScrollViewCastCrew from "../components/ScrollViewCastCrew"
    export let movie
    const appSettings = require("tns-core-modules/application-settings")
    const movies = $db.collection(`${$uniqueKey}`)
    const checkMovie = movies.doc(`${movie.id}`)
    const casting = `https://api.themoviedb.org/3/movie/${movie.id}/credits?api_key=${apiKey}`
    const movieDetails = `https://api.themoviedb.org/3/movie/${movie.id}?api_key=${apiKey}`
    let genreNames = []
    let showEmptyIcon = true
    let actors = []
    let personer = []
    $:crew = personer.filter(person => {
        return person.job === "Director" | person.job === "Screenplay" | person.job === "Original Music Composer" | person.job === "Producer"
    })
    let moviesD = []
    let navn
    let showMore = false

    onMount( async () => {
        await getData(casting)
            .then(res => actors = res.cast)

        await getData(casting)
            .then(res => personer = res.crew)
        await getData(movieDetails)
            .then(res => moviesD = [...moviesD,res])

        tester()
           
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
        genreId => {
            const indeks = $genresList.findIndex(genre => genre.id === genreId)
            genreNames = [...genreNames, $genresList[indeks].name]
        }
    )


    for(let i=1; i<genreNames.length; i++){
        genreNames[i] = "| " + genreNames[i];
    }
   
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

    const convertToHoursMinutes =  (num) => {
        let number = num
        let hours = (number / 60)
        let restHours = Math.floor(hours);
        let minutes = (hours - restHours) * 60;
        let restMinutes = Math.round(minutes);
        return restHours + " hr " + restMinutes + " min";
    }

    const tester = () => {
        crew.map(c => {
            if(c.job === "Original Music Composer"){
                c.job = "Music"
            }
        })
    }

</script>

<frame >
    <page >
        <actionBar title="{movie.title}">
            <actionItem on:tap={ () => closeModal() }
                android.systemIcon = "ic_menu_close_clear_cancel"
                android.position="actionBar"
                ios.systemIcon="14" 
                ios.position="right" />
        </actionBar>
        <scrollView scrollBarIndicatorVisible={false}>
            <flexBoxLayout class="m-y-60" style="flex-direction:column; margin:0 50 0 50;">
                <image src={"https://image.tmdb.org/t/p/w185"+ movie.poster_path} class="image img-rounded " style="margin-top:18; " stretch="aspectFill"/>
                <gridLayout   row="1" columns="170,*" style="margin-top:5; margin-bottom:3;">
                    <label textAlignment="left" textWrap="true" row="1" col="0" class="font-weight-bold white font-size-18" text="{movie.title}" />
                    <gridLayout col="1"  verticalAlignment="top" horizontalAlignment="right">
                        <label textAlignment="right" style="margin-right:25;" class="font-weight-bold white font-size-18" text="{movie.vote_average}/10"/>
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
                        <label textWrap="true" text="{genreName} " class="white font-size-16" style=" margin-bottom:3; "/>
                    {/each}
                </flexBoxLayout>
                <label class="white font-size-16" style="margin-bottom:3;" text="{movie.release_date.slice(0, 4)}" />
                {#each moviesD as m}
                    <label text="{convertToHoursMinutes(m.runtime)}" class="white font-size-16" style=" margin-bottom:8;"/>
                {/each}
                <label class="white font-size-16" col="0" textWrap="true" row="2" text="{movie.overview}"  lineHeight="7" />
                <label class="font-weight-bold white margin-bottom-10 margin-top-15" text="Cast" />
                {#if actors | actors.length > 0 }
                    <ScrollViewCastCrew array={actors.slice(0,6)} />
                {:else}
                    <label text="Sorry, no cast available" class="white"/>
                {/if}
                {#if showMore}
                     <label class="font-weight-bold white margin-bottom-10 margin-top-15" text="Crew" />
                    {#if crew | crew.length > 0}
                        <ScrollViewCastCrew array={crew} />
                    {:else}
                        <label text="Sorry, no information available" class="white"/>
                    {/if}
                {/if}
                <stackLayout on:tap={() => showMore = !showMore}>
                    <label class="font-weight-bold white genre-label text-center font-size-14"  text="{showMore ? "Show Less" : "Show More"}" style=" margin-top:12;"/>
                    {#if showMore}
                        <image src="font://&#xf077;" style="height:18; width:18" class="fas" />
                    {:else}
                        <image src="font://&#xf078;" style="height:18; width:18" class="fas" />
                    {/if}
                </stackLayout>
            </flexBoxLayout>
        </scrollView>
    </page>
</frame>


<style>

    .info{
      
    }
    
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