<script>
    import {onMount} from "svelte"
    import {getData,apiKey} from "../constants/constant.js"
    import {decadesList,languagesList,languageValue,decadeStartValue,decadeEndValue} from "../stores/stores.js"
    export let language
    let array
    let value 
    let languageClicked = false
    let decadeClicked = false

    

    if(language){
        array = $languagesList
    }
    else{
        array = $decadesList
    }

    
    const filterSearch = (i) =>  {
        languageClicked = !languageClicked
        decadeClicked = !decadeClicked

        const replaceCharacter = () => {
            let str = `${i}-12-31`;
            str = setCharAt(str,3,"9");
            $decadeEndValue = str
        }

        const setCharAt = (str,index,chr) => {
            if(index > str.length-1) return str;
            return str.substr(0,index) + chr + str.substr(index+1);
        }

        if(language){
            $languageValue = i
        }
        else{
            replaceCharacter()
            $decadeStartValue = `${i}-01-01`
        }

    }

</script>


<wrapLayout  >
    {#each array as item, index}
        {#if $decadeStartValue.includes(item) || $languageValue.includes(item.id)}
            <flexBoxLayout style="background-color:pink" class="genre-div">
                <label class="font-weight-bold white genre-label" on:tap={filterSearch(language ? item.id : item)} text="{language ? item.name : `${item}s`}" />
            </flexBoxLayout>
        {:else}
            <flexBoxLayout style="background-color: rgba(156, 156, 156, 0.3)" class="genre-div">
                <label class="font-weight-bold white genre-label" on:tap={filterSearch(language ? item.id : item)} text="{language ? item.name : `${item}s`}" />
            </flexBoxLayout>
        {/if}
    {/each}
</wrapLayout>


