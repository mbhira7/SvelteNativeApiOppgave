<script>
    import {decadesList,languagesList,languageValue,decadeStartValue,decadeEndValue} from "../stores/stores.js"
    export let language
    let array
    let forrige

    if(language){
        array = $languagesList
    }
    else{
        array = $decadesList
    }

    
    const filterSearch = (item,clicked,index) =>  {
        array[index].clicked = !clicked

        const alleAndre = $languagesList.filter(language => language.id !== item)
        alleAndre.forEach(a => {
            a.clicked = false
        })

        const replaceCharacter = () => {
            let str = `${item}-12-31`;
            str = setCharAt(str,3,"9");
            $decadeEndValue = str
        }

        const setCharAt = (str,index,chr) => {
            if(index > str.length-1) return str;
            return str.substr(0,index) + chr + str.substr(index+1);
        }

        if(array[index].clicked === true) {
            if(language){
                $languageValue = item
            }
            else{
                replaceCharacter()
                $decadeStartValue = `${item}-01-01`
            }
        }
        else{
            $languageValue = ""
            $decadeStartValue = ""
            $decadeEndValue = ""
            array[index].clicked = false
        }

    }

</script>


<wrapLayout  >
    {#each array as item, index}
        {#if $decadeStartValue.includes(item.id) || $languageValue.includes(item.id)}
            <flexBoxLayout style="background-color:pink" class="genre-div">
                <label class="font-weight-bold white genre-label" on:tap={filterSearch(item.id,item.clicked,index)} text="{language ? item.name : `${item.id}s`}" />
            </flexBoxLayout>
        {:else}
            <flexBoxLayout style="background-color: rgba(156, 156, 156, 0.3)" class="genre-div">
                <label class="font-weight-bold white genre-label" on:tap={filterSearch(item.id,item.clicked,index)} text="{language ? item.name : `${item.id}s`}" />
            </flexBoxLayout>
        {/if}
    {/each}
</wrapLayout>


