<script>
    import Homepage from "./components/Homepage.svelte"
    import Search from "./components/Search.svelte"
    import { db } from './stores/stores.js'
    import { onMount } from 'svelte'
    const apiKey = "cffa047e4f2e83b565d15715e66d2a35"
    let selectedTab = 0
    let books = []
    const genresList= [{"id":28,"name":"Action"},
    {"id":12,"name":"Adventure"},{"id":16,"name":"Animation"},{"id":35,"name":"Comedy"},
    {"id":80,"name":"Crime"},{"id":99,"name":"Documentary"},{"id":18,"name":"Drama"},
    {"id":10751,"name":"Family"},{"id":14,"name":"Fantasy"},{"id":36,"name":"History"},
    {"id":27,"name":"Horror"},{"id":10402,"name":"Music"},{"id":9648,"name":"Mystery"},
    {"id":10749,"name":"Romance"},{"id":878,"name":"Science Fiction"},{"id":10770,"name":"TV Movie"},
    {"id":53,"name":"Thriller"},{"id":10752,"name":"War"},{"id":37,"name":"Western"}]


    for(let i=0; i<genresList.length; i++) {
        genresList[i].clicked = false
    }

    const getData = (url) => {
        return new Promise(resolve => {
            fetch(url)
            .then(response => response.json())
            .then(response => {
                return resolve(response)
            })
    })

}

const firebase = require("nativescript-plugin-firebase/app")
    
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
        $db = await initFirebase()
        const testDatabase = $db.collection("test")

        testDatabase.doc("test3").set({
            title: "Test",
            status: "updated"
        });
    
    })


 


</script>

<page actionBarHidden={true}>
    <stackLayout >
    <tabs row="0" bind:selectedIndex={selectedTab} tabsPosition="bottom"  style="padding:0; margin:0;">
        <tabStrip backgroundColor="#1a222d" height="58" class="tabstrip-label">
            <tabStripItem >
                <image src="font://&#xf008;" class="fas" />
                <label class="white" text="Discover"/>
                
            </tabStripItem >

            <tabStripItem >
                <label class="white" text="Search" />
                <image src="font://&#xf002;" class="fas" />
            </tabStripItem>

            <tabStripItem >
                <label class="white" text="Watchlist"/>
                <image src="font://&#xf02e;" class="far" />
            </tabStripItem>

        </tabStrip>

        <tabContentItem >
            <Homepage getData={getData} apiKey={apiKey} genresList={genresList}/>
        </tabContentItem>
        
        <tabContentItem>
            <Search getData={getData} apiKey={apiKey} genresList={genresList}/>
        </tabContentItem>

        <tabContentItem>
            <label text="test" />
        </tabContentItem>
    </tabs>
    </stackLayout>
</page>

<style>

   page{
       background-color: #101822;
   }

   .tabstrip-label{
       justify-content: center;
       align-items: center;
       color:white;
       font-size:10;
       padding:0;
       margin:0;
       height:8%;
   }

   .fas{
        font-family: "Font Awesome 5 Free", "fa-solid-900";
        font-weight: 900;
        color:white;
   }

   .far {
    font-family: "Font Awesome 5 Free", "fa-regular-400";
    font-weight: 400;
    color:white;
   }

    .white{
        color:white;
    }

</style>
