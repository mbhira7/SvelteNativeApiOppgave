<script>
    import {onMount} from "svelte"
    import DisplayMovies from "./DisplayMovies.svelte"
    import {getData,apiKey} from "../constants/constant.js"
    const trendingMoviesUrl = `https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&api_key=${apiKey}`
    const newMoviesUrl = `https://api.themoviedb.org/3/discover/movie?primary_release_year=2020&api_key=${apiKey}`
    let trendingMovies = []
    let newMovies = []

onMount(() => {
    getData(trendingMoviesUrl)
        .then(res => trendingMovies = res.results)
        
    getData(newMoviesUrl)
        .then(res => newMovies = res.results)

})

</script>

<page >
    <stackLayout class="background">
        <flexBoxLayout class="header" androidElevation="80">
            <label text="Movie Database" style="color:white; font-size: 22; font-family: Courier, monospace;"/>
        </flexBoxLayout>
        <scrollView >
            <stackLayout style="padding:6;">
                <DisplayMovies heading="New releases" array={newMovies} />
                <DisplayMovies heading="Trending movies" array={trendingMovies} />
            </stackLayout>
        </scrollView>
    </stackLayout>  
</page>

<style>

    .header{
        margin-bottom:12;
        width:100%;
        height:68;
        justify-content: center;
        align-items: center;
    }

</style>
