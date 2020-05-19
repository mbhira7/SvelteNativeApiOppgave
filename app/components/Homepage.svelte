<script>
    import {onMount} from "svelte"
    import {showModal} from "svelte-native"
    const timerModule = require("tns-core-modules/timer");
    import Movie from "../modals/Movie.svelte"
    import DisplayMovies from "./DisplayMovies.svelte"
    import {getData,apiKey} from "../constants/constant.js"
    const trendingMoviesUrl = `https://api.themoviedb.org/3/movie/popular?&api_key=${apiKey}`
    const newMoviesUrl = `https://api.themoviedb.org/3/discover/movie?primary_release_year=2020&api_key=${apiKey}`
    const topRatedMoviesUrl = `https://api.themoviedb.org/3/movie/upcoming?api_key=${apiKey}&language=en-US&page=1`
    const nowPlayingUrl = `https://api.themoviedb.org/3/movie/now_playing?api_key=${apiKey}&language=en-US&page=1`
    let trendingMovies = []
    let newMovies = []
    let topRatedMovies = []
    let nowPlaying = []
    let movie
    let moviePoster
    let i = 0
    let interval
    let showEmptyIcon = true
    let visModal = false


onMount(async () => {
    await getData(trendingMoviesUrl)
        .then(res => trendingMovies = res.results)
        
    await getData(newMoviesUrl)
        .then(res => newMovies = res.results)
    await getData(topRatedMoviesUrl)
        .then(res => topRatedMovies = res.results)
    await getData(nowPlayingUrl)
        .then(res => nowPlaying = res.results)
    
    await slideshow()
    
    
})





const viewMovie = async (movie,event) => {

    await showModal({
            page: Movie,
            fullscreen:true,
            props:{
                movie:movie
            }
        })
}


const slideshow = () => {
    if(topRatedMovies.length > 0){
    if(i >= 8 ) {
        i = 0
    }

        movie = topRatedMovies[i]
        moviePoster = topRatedMovies[i].poster_path

        i++
    }
}


const nextMovie = (event) => {
    slideshow()
    interval = clearInterval(interval)
    interval = setInterval(slideshow, 3000)
}





    interval = setInterval(slideshow, 3000)






</script>




<page >
    <stackLayout class="bakgrunn">
        <scrollView scrollBarIndicatorVisible={false}>
            <stackLayout >
                
                <stackLayout orientation="horizontal" >
                   
                    {#if topRatedMovies.length > 0}
                    <flexBoxLayout  class="background-image" 
                     style="  background-image: url('{"https://image.tmdb.org/t/p/w342" + moviePoster}'); " >
                        

                    <gridLayout  columns="auto,*,auto">
                        <flexBoxLayout  style=" background-color:rgba(0,0,0,0.2);">
                            <image src="font://&#xf053;" style="height:22; width:14; margin-left:10;" class="fas" />
                        </flexBoxLayout>
                        <flexBoxLayout col="1" on:tap={() => viewMovie(movie)} style="height:100%;"/>
                        
                        
                        <flexBoxLayout on:tap={nextMovie} col="2"  style="background-color:rgba(0,0,0,0.08);  ">
                            <image src="font://&#xf054;" style="height:22; width:14; margin-right:10; " class="fas" />
                        </flexBoxLayout>

                        
                    </gridLayout>   
                           
                    </flexBoxLayout>

                    <!---{#if topRatedMovies.length > 0}
                   <scrollView orientation="horizontal">
                   <stackLayout orientation="horizontal" style="width:100%; height:300;">
                        <image src="{"https://image.tmdb.org/t/p/w342" + moviePoster}" stretch="auto-fill"/>
                   </stackLayout>
                    </scrollView>
                    
                    {/if}-->
                    {/if}
                    
                </stackLayout>
               
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
        
        width:100%;
        background-image: linear-gradient(transparent 70%,#221e22);
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
        color:rgb(255, 255, 255);
    }

</style>
