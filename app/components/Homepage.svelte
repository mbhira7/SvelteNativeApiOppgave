<script>
    import {onMount} from "svelte"
    import {showModal} from "svelte-native"
    const timerModule = require("tns-core-modules/timer");
    import Movie from "../modals/Movie.svelte"
    import DisplayMovies from "./DisplayMovies.svelte"
    import {getData,apiKey} from "../constants/constant.js"
    const trendingMoviesUrl = `https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&api_key=${apiKey}`
    const newMoviesUrl = `https://api.themoviedb.org/3/discover/movie?primary_release_year=2020&api_key=${apiKey}`
    const topRatedMoviesUrl = `https://api.themoviedb.org/3/movie/upcoming?api_key=${apiKey}&language=en-US&page=1`
    const nowPlayingUrl = `https://api.themoviedb.org/3/movie/now_playing?api_key=${apiKey}&language=en-US&page=1`
    let trendingMovies = []
    let newMovies = []
    let topRatedMovies = []
    let nowPlaying = []
    let fail = []
    let nextMovie 
    let moviePoster
    let i = 1
    let interval
    let showEmptyIcon = true

onMount(async () => {
    await getData(trendingMoviesUrl)
        .then(res => trendingMovies = res.results)
        
    await getData(newMoviesUrl)
        .then(res => newMovies = res.results)
    await getData(topRatedMoviesUrl)
        .then(res => topRatedMovies = res.results)
    await getData(nowPlayingUrl)
        .then(res => nowPlaying = res.results)
    
    interval = setInterval(test, 3000)
    
   

})





const viewMovie = async (movie) => {
        await showModal({
            page: Movie,
            fullscreen:true,
            props:{
                movie:movie
            }
        })
    
}


const test = () => {
   if(i >= 8) {
       i = 0
   }

   nextMovie = topRatedMovies[i]
   moviePoster = topRatedMovies[i].poster_path

    i++
   
}



const test2 = () => {
    test()
    interval = clearInterval(interval)
    interval = setInterval(test, 3000)

    
}





</script>

<page >
    <stackLayout class="bakgrunn">
        <scrollView scrollBarIndicatorVisible={false}>
            <stackLayout >
                
                <stackLayout orientation="horizontal" >
                   
                    <flexBoxLayout horizontalAlignment="right" on:tap={() => viewMovie(nextMovie)} class="background-image" 
                     style="padding:8; justify-content:flex-end; align-items:flex-end; background-image: url('{"https://image.tmdb.org/t/p/original" + moviePoster}'); " >
                      <flexBoxLayout  style="height:22; width:14; justify-content:center; align-items:flex-end;"  >
                            {#if showEmptyIcon}
                                <image on:tap={() => showEmptyIcon = !showEmptyIcon} src="font://&#xf02e;" style="height:100%; width:100%;" class="far" />
                            {:else}
                                <image on:tap={() => showEmptyIcon = !showEmptyIcon} src="font://&#xf02e;" style="height:100%; width:100%;" class="fas " />
                            {/if}
                    </flexBoxLayout>
                    
                </stackLayout>

                <!--<scrollView orientation="horizontal" scrollBarIndicatorVisible={false} scroll="onScroll">
                    <stackLayout orientation="horizontal"  horizontalAlignment="center" >
                        
                            <flexBoxLayout  class="tester" style="height:210; width:400; background-image:url('{"https://image.tmdb.org/t/p/w500" + epicfail2}')">
                                
                            </flexBoxLayout>
                        
                    </stackLayout>
                </scrollView>-->
               
                <DisplayMovies heading="Now playing" array={nowPlaying} />
                <DisplayMovies heading="Trending movies" array={trendingMovies} />
            </stackLayout>
        </scrollView>
    </stackLayout>  
</page>

<style>

    .header{
        
        width:100%;
        height:50;
        justify-content: center;
        align-items: center;
    }

    .gradient{
        height:230;
        width:100%;
        background-image: linear-gradient(transparent 40%,black);
    }

   

    .font{
        font-family: 'Ultra-Regular'
    }

    .background-image{
        background-position: 100% 20%;
        background-size: cover;
        margin-bottom:20;
        transition: background-image 2s;
         background-repeat: no-repeat;
         width:100%;  
         height:230; 
         border-radius:6; 
    }

    .bakgrunn{
       background-image:linear-gradient(rgb(48, 42, 47),rgba(0, 0, 0, 0.959));
    }

    

     .far{
        color:white;
    }

    .fas{
        color:white;
    }

</style>
