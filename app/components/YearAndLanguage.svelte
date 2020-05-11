<script>
    import {decadesList,languagesList,languageValue,decadeStartValue,decadeEndValue} from "../stores/stores.js"
    export let language
    let array
    let forrige
    $:array = language ? $languagesList : $decadesList

    const filterSearch = (id,clicked,index) =>  {
        array[index].clicked = !clicked
        
        const alleAndre = array.filter(item => item.id !== id)
        alleAndre.forEach(a => {
            a.clicked = false
        })

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
                $languageValue = id
            }
            else{
                replaceCharacter()
                $decadeStartValue = `${id}-01-01`
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
         console.log($languageValue, $decadeStartValue)

    }

</script>


<wrapLayout  >
    {#each array as item, index}
       <flexBoxLayout  class="{item.clicked ? "pink" : "grey"} genre-div">
            <label class="font-weight-bold white genre-label" on:tap={filterSearch(item.id,item.clicked,index)} text="{language ? item.name : `${item.id}s`}" />
        </flexBoxLayout>
    {/each}
</wrapLayout>


