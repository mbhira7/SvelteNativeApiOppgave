<script>
    import { onMount } from 'svelte'
    import {closeModal} from "svelte-native"
    import {getData,apiKey,createList,w500PosterUrl} from "../constants/constant.js"
    import { db,uniqueKey,genresList } from '../stores/stores.js'
    import ScrollViewCastCrew from "../components/ScrollViewCastCrew"
    export let movie
    const appSettings = require("tns-core-modules/application-settings")
    //Lager en firebase collection med den unike iden som ble generert
    let movies = $db.collection(`${$uniqueKey}`)
    let checkMovie = movies.doc(`${movie.id}`)
    const castingUrl = `https://api.themoviedb.org/3/movie/${movie.id}/credits?api_key=${apiKey}`
    const movieDetailsUrl = `https://api.themoviedb.org/3/movie/${movie.id}?api_key=${apiKey}`
    const reviewsUrl = `https://api.themoviedb.org/3/movie/${movie.id}/reviews?api_key=${apiKey}`
    let genreNames = []
    let showEmptyIcon = true
    let actors = []
    let personer = []
    let tabell = []
    $:crew = personer.filter(person => {
        return person.job === "Director" || person.job === "Screenplay" || person.job === "Original Music Composer" || person.job === "Producer"
    })
    let movieDetails = []
    let reviews = []
    let navn
    let readMore = false
    let showReviews = false
    let message = "Read more"
    let loaded = false


    onMount(async () => {
        await loadData()
    })

    const loadData = async () => {
        await getData(castingUrl)
            .then(res => {
                personer = res.crew
                actors = res.cast
        })

        await getData(movieDetailsUrl)
            .then(res => movieDetails = res)
        
        await getData(reviewsUrl)
            .then(res => reviews = res.results)
        
        await createList(reviews)

        loaded = true
    }

    //Sjekker om filmen finnes i databasen 
    checkMovie.onSnapshot(doc => {
        if (doc.exists) {
            showEmptyIcon = false
        } 
        else {
            showEmptyIcon = true
        }
    })
    
    //Looper gjennom filmen sine sjanger ider og ser etter hvilke sjanger navn idene matcher mot
    movie.genre_ids.forEach(
        genreId => {
            const indeks = $genresList.findIndex(genre => genre.id === genreId)
            genreNames = [...genreNames, $genresList[indeks].name]
        }
    )

    //Legger til "|" mellom hver sjanger
    for(let i=1; i<genreNames.length; i++){
        genreNames[i] = "| " + genreNames[i];
    }
   
    //Legger til og sletter filmer i databasen 
    const addAndDelete = () => {
        //Lagrer den genererte iden på telefonen lokalt 
        appSettings.setString("unique-key", $uniqueKey) 
        
        //Toggler mellom ikoner
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

    //Returnerer filmens spilletid i timer og minutter
    const convertToHoursMinutes =  (num) => {
        let number = num
        let hours = (number / 60)
        let restHours = Math.floor(hours);
        let minutes = (hours - restHours) * 60;
        let restMinutes = Math.round(minutes);
        return (restHours > 0 ? restHours + " hr " : "") + (restMinutes > 0 ? (restMinutes + " min") : "");
    }

    //Returnerer en string som ikke overstiger maks antall tegn
    const tekst = (str, length,ending) => {
        if (ending == null) {
            ending = '...';
        }
        if (str.length > length) {
            return str.substring(0, length - ending.length) + ending;
        } 
        else {
            return str
        }
    }


    //Toggler mellom read more og read less på hver anmeldelse
    const sjekkIndeks = (i,clicked) => {
        reviews[i].clicked = !clicked
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
        {#if loaded}
        <scrollView scrollBarIndicatorVisible={false}>
            <flexBoxLayout class="m-y-60" style="flex-direction:column; margin:0 40 0 40;">
                <image src={w500PosterUrl + movie.poster_path} class="image img-rounded " style="margin-top:18; " stretch="aspectFill"/>
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
                    {#each genreNames.slice(0,3) as genre}
                        <label textWrap="true" text="{genre} " class="white font-size-16" style=" margin-bottom:3; "/>
                    {/each}
                </flexBoxLayout>
                <label class="white font-size-16" style="margin-bottom:3;" text="{movie.release_date.slice(0, 4)}" />
                <label text="{convertToHoursMinutes(movieDetails.runtime)}" class="white font-size-16" style=" margin-bottom:8;"/>
                <label class="white font-size-16" col="0" textWrap="true" row="2" text="{movie.overview}"  lineHeight="7" />
                <flexBoxLayout style="align-items:flex-start;">
                    
                    <label on:tap={() => showReviews = false} text="Credits" style="margin-right:25; " class="{!showReviews ? "border-bottom " : ""}font-weight-bold white font-size-17 margin-top-15"/>
                    <label on:tap={() => showReviews = true} text="Reviews" class="{showReviews ? "border-bottom " : ""}font-weight-bold white font-size-16 margin-top-15"/>
                    
                </flexBoxLayout>
                {#if !showReviews}
                    <label class="font-weight-bold white margin-bottom-10 font-size-16 margin-top-15" text="Cast" />
                    {#if actors.length > 0}
                        <ScrollViewCastCrew array={actors} />
                    {:else}
                        <label text="Sorry, no cast available" class="white"/>
                    {/if}
                    <label class="font-weight-bold white font-size-16 margin-bottom-10 margin-top-15" text="Crew" />
                    {#if crew.length > 0}
                        <ScrollViewCastCrew array={crew} testVerdi={true}/>
                    {:else}
                        <label text="Sorry, no information available" class="white"/>
                    {/if}

                {:else}
                    {#if reviews.length > 0}
                        {#each reviews as review,index}
                            <stackLayout class="{reviews.length > 1 ? "border" : ""}" >
                                <label text="{review.author}"  style="color:rgb(219, 219, 219);"class="font-weight-bold font-size-15 margin-top-10"/>
                                <label on:tap={() => sjekkIndeks(index,review.clicked)} text="{review.clicked === false ? tekst(review.content,300) : tekst(review.content,review.content.length)  }" textWrap="true" class="white font-size-15 margin-top-4"/>
                                {#if review.content.length > 300 }
                                    <label style="color:rgb(177, 177, 177)" on:tap={() => sjekkIndeks(index,review.clicked)} textWrap="true" text="{review.clicked === false ?  "Read more" : "Read less"}" class="font-weight-bold white font-size-14 margin-bottom-10 margin-top-8" />
                                {/if}
                            </stackLayout>
                        {/each}
                    {:else}
                        <label text="Sorry, no reviews" class="white margin-top-10"/>
                    {/if}
                {/if}
            </flexBoxLayout>
        </scrollView>
        {/if}
    </page>
</frame>

<!--

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
-->


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

    .border{ 
           border-bottom-width: 1;
    border-bottom-color: rgb(216, 216, 216);
    }

    
    


</style>


