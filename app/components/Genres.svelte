
<script>
import {genresList,chosenGenres,filterChoiceValue} from "../stores/stores.js"
let verdi
let maxValueMessage 

const genreSearch = (clicked, id, i) => {
    maxValueMessage = ""
    
    //Går gjennom de valgte sjangrene og finner indeksen som matcher med sjanger som blir klikket på
    const indeks = $chosenGenres.findIndex(g => g === id)

    //Legger ikke til flere sjangre hvis lengden på arrayet er > 3
    //Melding til bruker 
    if($chosenGenres.length === 3 && $genresList[i].clicked === false ) {
        maxValueMessage = "Maximum 3 genres"
        return
    }

    //Togggler mellom klikket og ikke klikket for hvert element 
    $genresList[i].clicked = !clicked

    //Legger til ny valgt sjanger, så lenge den ikke finnes i arrayet fra før
    if($genresList[i].clicked === true && ! $chosenGenres.includes($genresList[i].id)) {
        $chosenGenres = [...$chosenGenres, $genresList[i].id].slice(0,3)
    }

    //Sletter sjanger fra arrayet hvis det finnes fra før
    else{
        $chosenGenres.splice(indeks,1)
    }

}

</script>

<stackLayout>
    <segmentedBar horizontalAlignment="left"  width="auto" height="30" backgroundColor="gray" selectedBackgroundColor="rgb(41, 41, 41)" bind:selectedIndex={$filterChoiceValue} style="margin-bottom:15;  margin-left:0; font-size: 14; color:white;">
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


