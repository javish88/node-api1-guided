// import express from 'express'; // ES 2015 module syntax

const express = require('express'); // CommonJS modules

const Hubs = require('./data/hubs-model.js') // our Hubs database library

const server = express();

// middleware: teaches express new things
server.use(express.json()); // need to parse JSON

// routes or endpoints

// Get to "/"
server.get("/", function(request, response) {
    response.send({hello: 'Who is getting sword or shield expansion'})
})


// see a list of HUBS <--- .get

server.get('/api/hubs', (req, res) => {
    // read the data from the database (Hubs for this example)
    Hubs.find() // return a promise
        .then(hubs => {
            res.status(200).json(hubs);
        })
        .catch(error => {
            console.log(error)
            // handle the error 
            res.status(500).json({errorMessage: "sorry, we ran into an error getting the list of hubs"})
        })
})

// Create a HUB <--- .post
server.post('/api/hubs', (req, res) => {
    const hubData = req.body; // for this to work you need the server.use(express.json()); on line 10

    // never trust the client, validate the data <---- check if everything is correct, for this demo we trusting the client
    Hubs.add(hubData).then(hub => {
        res.status(201).json(hub)
    }) .catch(error => {
        console.log(error)
        // handle the error 
        res.status(500).json({errorMessage: "sorry, we ran into an error getting the list of hubs"})
    })

})


// Delete a HUB

server.delete('/api/hubs/:id', (req, res) => {
    const id = req.params.id;

    Hubs.remove(id).then(deleted => {
        // res.status(200).end(); 
        res.status(200).json(deleted)
    })
    .catch(error => {
        console.log(error);
        res.status(500).json({
            errorMessage: 'sorry, we ran into an error removing the hub'
        })
    })
})





// UPDATE a HUB : extra exercise


const port = 8000;

server.listen(port, () => console.log(`\n ** api on port: ${port} ** \n `))

// fork > clone > type: npm i <----- to get dependencies
// type: npm i express <------- to install the express library
// add the index.js file with code into the root folder
// to run the server type: npm run server <----- this is the command to run server
// make a GET reuqest to localhost: 8000 using Postman or Insomnia

// to solve the sqlite3 error just do npm i sqlite3
