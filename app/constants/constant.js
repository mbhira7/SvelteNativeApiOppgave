export const getData = (url) => {
    return new Promise(resolve => {
        fetch(url)
        .then(response => response.json())
        .then(response => {
            return resolve(response)
            
        })
    })
}

export const generateKey = () => {
    let dt = new Date().getTime();
    let uniqueKey = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, (c) => {
        let r = (dt + Math.random()*16)%16 | 0;
        dt = Math.floor(dt/16);
        return (c=='x' ? r :(r&0x3|0x8)).toString(16);
    });
    return uniqueKey;
}

export const apiKey = "cffa047e4f2e83b565d15715e66d2a35"