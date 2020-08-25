const endpoint = 'https://jsonplaceholder.typicode.com/users/'

export function getUsers() {
    return fetch(endpoint)
        .then(res => {
            if (!res) throw Error(res.statusText)
            return res.json()
        })
        .then(json => json)
}