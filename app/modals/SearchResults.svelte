<page>
    <stackLayout class="bakgrunn">
        <label style="color:white; text-align:center; margin-bottom:18; margin-top:12;" class="h2" text="Watchlist" />
      <scrollView>
        <flexBoxLayout class="movies">
            {#each favourites as movie}
             
            <gridLayout class="border" on:tap={() => viewMovie(movie)} columns="120,*" rows="140">
            
                <image  col="0" row="0" src={"https://image.tmdb.org/t/p/w185"+ movie.poster_path}  class="img-rounded" style="margin-bottom:8;" stretc="aspectFit"/>
           
                <stackLayout col="1" row="1">
                    <label textWrap="true" flexWrapBefore={true} verticalAlignment="top" text="{movie.title}" style="color:white; font-size:16;" class="font-weight-bold"/>
                    <label text="{movie.release_date.slice(0, 4)}" style="color:white; font-size:15" />
                    <flexBoxLayout>
                        <label text="{movie.vote_average}" style="color:white" />
                    </flexBoxLayout>
                </stackLayout>
            </gridLayout>
            {/each}
        </flexBoxLayout>
    </scrollView>
    </stackLayout>

</page>


<style>
    .bakgrunn{
        background-color: #101822;
    }


    .border{
        border-bottom-color: #181e25;
        border-bottom-width: 3;
        margin-bottom: 8;
    }
    

    .movies{
        flex-direction: column;
    }

    .rating-box{
        margin-right:9;
        justify-content: center;
        align-items:center;
        height:25;
        width:30;
        background-color: rgba(0,0,0,0.36);
        border-radius:4;
   }

</style>