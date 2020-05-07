import { writable, readable } from 'svelte/store'
import {generateKey,createList} from "../constants/constant.js"
let genres = [{"id":28,"name":"Action"}
    ,{"id":12,"name":"Adventure"},{"id":16,"name":"Animation"},{"id":35,"name":"Comedy"}
    ,{"id":80,"name":"Crime"},{"id":99,"name":"Documentary"},{"id":18,"name":"Drama"}
    ,{"id":10751,"name":"Family"},{"id":14,"name":"Fantasy"},{"id":36,"name":"History"}
    ,{"id":27,"name":"Horror"},{"id":10402,"name":"Music"},{"id":9648,"name":"Mystery"}
    ,{"id":10749,"name":"Romance"},{"id":878,"name":"Sci-Fi"},{"id":10770,"name":"TV Movie"}
    ,{"id":53,"name":"Thriller"},{"id":10752,"name":"War"},{"id":37,"name":"Western"}
]

let languages = [{"id":"zh","name":"Chinese"}
    ,{"id":"nl","name":"Dutch"},{"id":"en","name":"English"}
    ,{"id":"fr","name":"French"},{"id":"hi","name":"Hindi"},{"id":"it","name":"Italian"},{"id":"ja","name":"Japanese"}
    ,{"id":"ko","name":"Korean"},{"id":"no","name":"Norweagian"},{"id":"pt","name":"Portuguese"}
    ,{"id":"ru","name":"Russian"},{"id":"es","name":"Spanish"},{"id":"ta","name":"Tamil"},{"id":"tr","name":"Turkish"}
]

let decades = [{"id":1960},{"id":1970},{"id":1980},{"id":1990},{"id":2000},{"id":2010},{"id":2020}]
export const db = writable()
export const uniqueKey = writable(generateKey())
export const genresList= writable(createList(genres))
export const languagesList= writable(createList(languages))
export const decadesList = writable(createList(decades))
export const chosenGenres = writable([])
export const showFilterSection = writable(true)
export const languageValue = writable("")
export const decadeStartValue = writable("")
export const decadeEndValue = writable("")
export const choiceValue = writable(0)
export const displayMovieResults = writable(true)