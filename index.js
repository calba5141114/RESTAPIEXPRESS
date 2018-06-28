/* 
@Creator: Carlos Alba
I will first import Express a NPM module 
to mediate the creation of our REST API.
I will then create an instance of Express called "App"
*/

const express = require('express');
const app = express();
const mongoose = require('mongoose'); // For Database Operations
const universalPort = process.env.PORT || 3000; // Configuring our applications port
const bodyParser = require('body-parser'); // Mediates POST request.
const Note = require('./dataModels/note_model.js'); // Note Data Model.

// Configuring express to use body-parser 
app.use(bodyParser.urlencoded({
    extended: false
}));
app.use(bodyParser.json());

// A connection to our Database
try {
    mongoose.connect('mongodb://RESTAPI:RESTAPI1@ds253889.mlab.com:53889/palyhacks');
} catch (err) {
    console.log(err + 'Issues connecting with mongodb');
}

//  Usable connection to DB
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', () => {
    // Our App is connected.
});

// HTTP responses.

app.get('/', (req, res) => {
    try {
        res.send('REST API by Carlos Alba you can fetch notes "/usernotes or /usernotes:id" and post notes. "/usernotes&=note"');
    } catch (err) {
        res.send(err + 'Report to Carlos A.');
        //sends user to error page if err is caught.
        setTimeout(res.redirect('/error'), 5000)
    }
});

// Send usernotes from mongoDB on Mlabs
app.get('/usernotes', (req, res) => {

    try {
        res.send(`User notes!`);
    } catch (err) {
        res.send(err);
        setTimeout(res.redirect('/error'), 5000)
    }
});

// take POST request and add note to DB
app.post('/usernotes', (req, res) => {

    let title = req.body.title;
    let author = req.body.author;
    let body = req.body.body;

    let note = new Note({
        title: title,
        author: author,
        body: body
    });

    note.save(
        (err) => {
            if (err) {
                return console.log(err);
            }
            else{
                res.redirect('/usernotes');
            }
        }
    );


});


// Default Error Redirect.
app.get('/error', (req, res) => {
    res.send('If you ended up you did something wrong. report your error to Carlos A.')
});

// Starting our Server.
app.listen(universalPort, () => {
    console.log(`Our REST API is running on ${universalPort}`);
});