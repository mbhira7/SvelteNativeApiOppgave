<script>
    import {decadesList,languagesList,languageValue,decadeStartValue,decadeEndValue} from "../stores/stores.js"
    export let language
    let array
    let forrige
    $:array = language ? $languagesList : $decadesList

    const filterSearch = (id,clicked,index) =>  {
        //Togggler mellom klikket og ikke klikket for hvert element 
        array[index].clicked = !clicked
        
        //Setter alle andre elementer utenom den brukeren klikker på til false
        const alleAndre = array.filter(item => item.id !== id)
        alleAndre.forEach(a => {
            a.clicked = false
        })

        //Gjør om tiår til presis datoformat
        const replaceCharacter = () => {
            let str = `${id}-12-31`;
            str = setCharAt(str,3,"9");
            $decadeEndValue = str
        }

        const setCharAt = (str,index,chr) => {
            if(index > str.length-1) return str;
            return str.substr(0,index) + chr + str.substr(index+1);
        }

        if(array[index].clicked) {
            if(language){
                $languageValue = id //Hvis brukeren filtrerer etter språk 
            }
            else{
                replaceCharacter()
                $decadeStartValue = `${id}-01-01` //Hvis brukeren filtrerer etter tiår
            }
        }
        else{
            if(language){
                $languageValue = ""
            }
            else{
                $decadeStartValue = ""
                $decadeEndValue = ""
            }
            
        }
    }

</script>


<wrapLayout>
    {#each array as item, index}
       <flexBoxLayout  class="{item.clicked ? "pink" : "grey"} genre-div">
            <label class="font-weight-bold white genre-label" on:tap={filterSearch(item.id,item.clicked,index)} text="{language ? item.name : `${item.id}s`}" />
        </flexBoxLayout>
    {/each}
</wrapLayout>


