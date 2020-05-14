
<script>
import {genresList,chosenGenres,filterChoiceValue} from "../stores/stores.js"
let verdi
let maxValueMessage 

const genreSearch = (clicked, id, i) => {
    maxValueMessage = ""
    const indeks = $chosenGenres.findIndex(g => g === id)

    if($chosenGenres.length === 3 && $genresList[i].clicked === false ) {
        maxValueMessage = "Maximum 3 genres"
        return
    }
    $genresList[i].clicked = !clicked

    if($genresList[i].clicked === true && ! $chosenGenres.includes($genresList[i].id)) {
        $chosenGenres = [...$chosenGenres, $genresList[i].id].slice(0,3)
    }

    else{
        $chosenGenres.splice(indeks,1)
    }

}

</script>

<stackLayout>
    <segmentedBar horizontalAlignment="left"  width="auto" height="30" selectedBackgroundColor="pink" bind:selectedIndex={$filterChoiceValue} style="margin-bottom:15;  margin-left:0; font-size: 14; color:black;">
        <segmentedBarItem title="OR"  />
        <segmentedBarItem title="AND" />
    </segmentedBar>
    <wrapLayout orientation="horizontal" >
        {#each $genresList as genre, index}
            <flexBoxLayout class="{$chosenGenres.includes(genre.id) ? "pink" : "grey"} genre-div">
                <label class="font-weight-bold white genre-label" on:tap={() => genreSearch(genre.clicked, genre.id,index)}  text={genre.name}/>
            </flexBoxLayout>
        {/each}
    </wrapLayout>
    <label text="{maxValueMessage}" class="white font-weight-bold"/>
</stackLayout>


