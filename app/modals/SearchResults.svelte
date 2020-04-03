
<page>
    <stackLayout style="background-color: #101822; width:100%; height: 100%; padding:16;">
        <flexBoxLayout class="searchbar center">
            <flexBoxLayout verticalAlignment="top" horizontalAlignment="right" >
                <label class="h2 " text="Search" style="color:white;  margin-right:15;"/>
                <flexBoxLayout style="height:70; width:22;" >
                    <image on:tap={() => showGenres = !showGenres} src="~/assets/images/filter.png"  style="height:100%; width:100%; " />
                </flexBoxLayout>
            </flexBoxLayout>

                {#if !showGenres}
                    <searchBar  on:textChange={titleSearch} style=" height:45; width:100%; margin-bottom:18;" hint="Search for movies" bind:text={searchValue}/>
                {/if}
            </flexBoxLayout>
            

        {#if showGenres}
            <scrollView orientation="horizontal">
            <flexBoxLayout >
            {#each genresList as genre, index}
                 {#if chosenGenres.includes(genre.id)}
                    <flexBoxLayout style="background-color:black" class="genre-div">
                        <label on:tap={() => genreSearch(genre.clicked, genre.id,index)} style="color:white; font-size:13; font-weight:bold;" text={genre.name}/>
                    </flexBoxLayout>
                {:else}
                    <flexBoxLayout style="background-color: rgba(156, 156, 156, 0.3)" class="genre-div">
                        <label on:tap={() => genreSearch(genre.clicked, genre.id,index)} style="color:white; font-size:13; font-weight:bold;" text={genre.name}/>
                    </flexBoxLayout>
                {/if}
            {/each}
            </flexBoxLayout>
            </scrollView>
         {/if}
         <scrollView>
         {#if showGenres}
            <DisplayMovies heading="Search results" array={genres} getData={getData} genresList={genresList}/> 
        {:else}
            <DisplayMovies heading="Search results" array={results} getData={getData} genresList={genresList}/> 
        {/if}
        </scrollView>
    </stackLayout>
</page>


<style>
    page{
        background-color: #000b1a10;
        width:100%;
        height: 100%;
   }
    .searchbar{
        flex-direction:column;
        align-items: flex-start;
        justify-content: flex-start;
        margin-top:10;
    }
    .genre-div{
        width:auto;
        height:auto;
        margin-bottom:20;
        padding:7;
        margin-right:15;
        border-radius:16;
    }
</style>