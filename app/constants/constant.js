export const getData = (url) => {
    return new Promise(resolve => {
        fetch(url)
        .then(response => response.json())
        .then(response => {
                return resolve(response)
            
        })
    })
}
