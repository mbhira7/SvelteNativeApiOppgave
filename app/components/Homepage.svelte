<script>
    import {onMount} from "svelte"
    import {showModal} from "svelte-native"
    import Movie from "../modals/Movie.svelte"
    import DisplayMovies from "./DisplayMovies.svelte"
    import {getData,apiKey,w500PosterUrl} from "../constants/constant.js"
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
    let slidesLength = 8

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

    //Viser frem filmartikkel
    const viewMovie = async (movie,event) => {
        await showModal({
            page: Movie,
            fullscreen:true,
            props:{
                movie:movie
            }
        })
    }


    const slideshow = async (p) => {
        if(topRatedMovies.length > 0){
            //Går til neste slide
			if(p !== "previous"){
				if(i >= slidesLength ) {
					i = 0
				}
			}
			
			//Går til forrige slide
			if(p === "previous"){
				if(i > slidesLength){
					i = slidesLength - 1
				}

				if(i === 1){
					i = slidesLength + 1
				}
				
				i--
			}

			//Kjører slideshow som vanlig
			else{
				i++
            }
            
            movie = topRatedMovies[i]
            moviePoster = topRatedMovies[i].backdrop_path
        }

    }

    //Går til neste slide manuelt
    const nextMovie = (param) => {
        slideshow(param)
        interval = clearInterval(interval)
        interval = setInterval(slideshow, 3000)
    }


    interval = setInterval(slideshow, 3000)


</script>


<page>
    <stackLayout class="bakgrunn">
        <scrollView scrollBarIndicatorVisible={false}>
            <stackLayout >
                <stackLayout orientation="horizontal" >
                    {#if topRatedMovies.length > 0}
                        <flexBoxLayout class="background-image" style="  background-image: url('{w500PosterUrl + moviePoster}'); " >
                            <gridLayout  columns="auto,*,auto">
                                <flexBoxLayout on:tap={() => nextMovie("previous")} style=" background-color:rgba(0,0,0,0.2);">
                                    <image src="font://&#xf053;" style="height:22; width:14; margin-left:10;" class="fas" />
                                </flexBoxLayout>
                                <flexBoxLayout col="1" on:tap={() => viewMovie(movie)} style="height:100%;"/>
                                
                                <flexBoxLayout on:tap={nextMovie} col="2"  style="background-color:rgba(0,0,0,0.08);  ">
                                    <image src="font://&#xf054;" style="height:22; width:14; margin-right:10; " class="fas" />
                                </flexBoxLayout>
                            </gridLayout>   
                        </flexBoxLayout>
                    {/if}
                </stackLayout>
               
                <DisplayMovies heading="Now playing" array={nowPlaying} />
                <DisplayMovies heading="Trending movies" array={trendingMovies} />
            </stackLayout>
        </scrollView>
    </stackLayout>  
</page>

<style>

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

    .fas{
        color:rgb(255, 255, 255);
    }

</style>
