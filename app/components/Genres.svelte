
<script>
import {genresList,chosenGenres,choiceValue} from "../stores/stores.js"
import {getData,apiKey} from "../constants/constant.js"
let genresResults = []
let str

for(let i=0; i<$genresList.length; i++) {
    $genresList[i].clicked = false
}

const genreSearch = (clicked, id, i) => {
    const indeks = $chosenGenres.findIndex(g => g === id)
    $genresList[i].clicked = !clicked


    if($genresList[i].clicked === true && ! $chosenGenres.includes($genresList[i].id)) {
        $chosenGenres = [...$chosenGenres, $genresList[i].id].slice(0,3)
    }

    if($genresList[i].clicked === false && $chosenGenres.includes($genresList[i].id)) {
        $chosenGenres.splice(indeks,1)
    }

    
    console.log($chosenGenres);


}


</script>

<stackLayout>
<segmentedBar horizontalAlignment="left"  width="120" height="30" selectedBackgroundColor="pink" bind:selectedIndex={$choiceValue} style="margin-bottom:15;  margin-left:0; font-size: 14; color:black;">
    <segmentedBarItem title="OR"  />
    <segmentedBarItem title="AND" />
</segmentedBar>
 <wrapLayout orientation="horizontal" >
    {#each $genresList as genre, index}
        {#if $chosenGenres.includes(genre.id)}
            <flexBoxLayout style="background-color:pink" class="genre-div">
                <label class="font-weight-bold white genre-label" on:tap={() => genreSearch(genre.clicked, genre.id,index)}  text={genre.name}/>
            </flexBoxLayout>
        {:else}
            <flexBoxLayout style="background-color: rgba(156, 156, 156, 0.3)" class="genre-div">
                <label class="font-weight-bold white genre-label" on:tap={() => genreSearch(genre.clicked, genre.id,index)} text={genre.name}/>
            </flexBoxLayout>
        {/if}
    {/each}
</wrapLayout>
</stackLayout>


