<script>
    import {onMount} from "svelte"
    import DisplayMovies from "./DisplayMovies.svelte"
    export let apiKey
    import {getData} from "../constants/constant.js"
    export let genresList 
    const trendingMoviesUrl = `https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&api_key=${apiKey}`
    const newMoviesUrl = `https://api.themoviedb.org/3/discover/movie?primary_release_year=2020&api_key=${apiKey}`

    let trendingMovies = []
    let newMovies = []
    let results = []

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
            <label  text="Movie Database" style="color:orange; font-size: 22; font-family: Courier, monospace;"/>
        </flexBoxLayout>
        <scrollView >
            <stackLayout style="padding:14;">
                <DisplayMovies heading="New releases" genresList={genresList} array={newMovies} getData={getData} />
                <DisplayMovies heading="Trending movies" genresList={genresList} array={trendingMovies} getData={getData} />
            </stackLayout>
        </scrollView>
    </stackLayout>  
</page>

<style>

    .header{
        margin-bottom:16;
        width:100%;
        height:68;
        background-color: #1a222d;
        justify-content: center;
        align-items: center;
    }

</style>
