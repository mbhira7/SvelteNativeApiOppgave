<script>
    import {closeModal} from "svelte-native"
    export let movie
    export let test
    export let genresList
    let genreNames = []


 movie.genre_ids.forEach(
    movieId => {
        const indeks = genresList.findIndex(genre => genre.id === movieId)
        genreNames = [...genreNames, genresList[indeks].name]
                
    }
)


</script>

<frame>
    <page>
     <actionBar title="{movie.title}">
        <actionItem on:tap={ () => closeModal() }
            android.systemIcon = "ic_menu_close_clear_cancel"
            android.position="actionBar"
            ios.systemIcon="14" 
            ios.position="right"
        />
        </actionBar>
    <scrollView>
        <flexBoxLayout class="m-y-60" style="flex-direction:column; margin:0 50 0 50;">
            <image src={"https://image.tmdb.org/t/p/w185"+ movie.poster_path} class="test img-rounded " style="margin-top:18;" stretch="aspectFill"/>
            <gridLayout  row="1" columns="180,*" style="margin-top:8;">
                <label textAlignment="left" textWrap="true" row="1" col="0" class="font-weight-bold m-y-4 tekst" style="font-size:18; " text="{movie.title}" />
                <gridLayout col="1" verticalAlignment="top" textAlignment="right">
                    <label textAlignment="right" style="color:white; font-size:18;" class="font-weight-bold m-y-4" text="{movie.vote_average}/10"/>
                </gridLayout>
            </gridLayout>
            <flexBoxLayout>
            {#each genreNames.slice(0,3) as genreName}
                <label text="{genreName} | " class="tekst m-y-2" style="font-size:16;"/>
            {/each}
            <flexBoxLayout style="height:9; width:19;">
                <image src="font://&#xf02e;"  style="height:100%; width:100%;"class="far" stretch="aspectFill" />
            </flexBoxLayout>
            </flexBoxLayout>
            <label class="tekst m-y-4" style="font-size:16;" text="{movie.release_date.slice(0, 4)}" />
            <label class="tekst" style="font-size:16;"col="0" textWrap="true" row="2" text="{movie.overview}"  lineHeight="7" />
             <label class="font-weight-bold " text="Cast" style="color:white; margin-top:15; margin-bottom:10;"/>
            <scrollView orientation="horizontal">
            <flexBoxLayout style="flex-direction:row;">
            {#each test.slice(0,5) as t}
            <gridLayout rows="70,*" columns="115">
                <flexBoxLayout row="0" col="0" >
                    <image  row="0" col="0" stretch="aspectFill" class="-thumb img-circle" style="width:68;" src={"https://image.tmdb.org/t/p/w185"+ t.profile_path} />
                </flexBoxLayout>
                <label row="1" textWrap="true" flexWrapBefore={true} style="color:white; font-size:14; margin-right:20;" text="{t.name}" />
            </gridLayout>
            {/each}
            </flexBoxLayout>
            </scrollView>
        </flexBoxLayout>
    </scrollView>
    </page>
</frame>


<style>
    page{
        background-color:#0d141d;
        width:100%;
    }

   .tekst{
       color:rgb(255, 255, 255);
   }

    .test{
        height:370;
    }

    .far{
        color:white;
        margin-top:6;
        margin-left:4;
    }
</style>