

[client] -send a request----> [Server (API)]

[server] - send a response ---> [client]

``` js
const request = {
    headers: {
        
    },

    body: {

    }
}

const createUser = function (url, data) {
    return axios.post(url, data); // the data goes in request body
}
```