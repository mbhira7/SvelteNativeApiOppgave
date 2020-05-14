<script>
    import { onMount } from 'svelte'
    import { db,uniqueKey } from './stores/stores.js'
    import {getData} from "./constants/constant.js"
    import Homepage from "./components/Homepage.svelte"
    import Search from "./components/Search.svelte"
    import Watchlist from "./components/Watchlist.svelte"
    const firebase = require("nativescript-plugin-firebase/app")
    const appSettings = require("tns-core-modules/application-settings")
    let selectedTab = 0
    let favourites = []
    
const initFirebase = () => {
    return new Promise(resolve => {
        firebase.initializeApp({
            persist: false
        }).then(
            () => {
            console.log('firebase init done')
                resolve(firebase.firestore()
            )},
            error => {
                console.log("firebase.init error : " + error);
            }
         )
    })
}

onMount( async () => {
    console.log('App mounts..')
    
    if(appSettings.getString("unique-key")){
        uniqueKey.set(appSettings.getString("unique-key"))
    }
    $db = await initFirebase()
    const movies = $db.collection(`${$uniqueKey}`)
    const showFavourites = movies.onSnapshot(snapshot => {
        favourites=[]
        snapshot.forEach( favourite => {
            favourites = [...favourites, {id:favourite.id, ...favourite.data()}]
        })
    })
})

</script>

<page actionBarHidden={true}>
    <stackLayout >
    <tabs row="0" bind:selectedIndex={selectedTab} tabsPosition="bottom"  style="padding:0; margin:0;">
        
        
        <tabStrip backgroundColor="rgb(30, 30, 30)" class="tabstrip-label">
           
            <tabStripItem >
                <image src="font://&#xf008;" class="fas" />
            </tabStripItem >

            <tabStripItem >
                <image src="font://&#xf002;" class="fas" />
            </tabStripItem>

            <tabStripItem >
                <image src="font://&#xf02e;" class="far" />
            </tabStripItem>
            

           

        </tabStrip>
        
        
        <tabContentItem >
            <Homepage />
        </tabContentItem>
        
        <tabContentItem>
            <Search />
        </tabContentItem>

        <tabContentItem>
            <Watchlist favourites={favourites} />
        </tabContentItem>
        

        

        
    </tabs>
    </stackLayout>
</page>

<style>

   .tabstrip-label{
      
       color:white;
       font-size:10;
       padding:0;
       margin:0;
     
   }

   .fas{
        color:white;
   }

   .far {
        color:white;
   }

    .white{
        color:white;
    }

</style>
