export const apiKey = "cffa047e4f2e83b565d15715e66d2a35"
export const w500PosterUrl = "https://image.tmdb.org/t/p/w500"

export const getData = (url) => {
    return new Promise(resolve => {
        fetch(url)
        .then(response => response.json())
        .then( response => {
            console.log("Fetched succesfully")
            if(response.fault){
                console.log(response.fault.faultstring)
            }else{
                return resolve(response)
            }
        })    
    })
}

//Genererer en unik id for hver gang en ny device åpner appen 
export const generateKey = () => {
    let dt = new Date().getTime();
    let uniqueKey = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, (c) => {
        let r = (dt + Math.random()*16)%16 | 0;
        dt = Math.floor(dt/16);
        return (c=='x' ? r :(r&0x3|0x8)).toString(16);
    });
    return uniqueKey;
}

export const createList = (array) => {
    for(let i=0; i<array.length; i++) {
        array[i].clicked = false
    }
    return array
}



