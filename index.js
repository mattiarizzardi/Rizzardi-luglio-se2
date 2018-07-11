// localhost:5000/api/astronauts

const express = require('express'),
    bodyParser = require('body-parser');

const app = express();
app.use(bodyParser.json());

const team = require('./team')


app.use('/api', team)

app.set('port', (process.env.PORT || 5000));

app.listen(app.get('port'), function() {
    console.log ("listening on port 5000!");
});

// middleware route to support CORS and preflighted requests
app.use(function (req, res, next) {
    // do logging
    console.log('Something is happening.');
    //Enabling CORS
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
    res.header('Content-Type', 'application/json');
    if (req.method == 'OPTIONS') {
        res.header('Access-Control-Allow-Methods', 'GET, PUT, POST');
        return res.status(200).json({});
    }

    // make sure we go to the next routes
    next();
});

// handle invalid requests and internal error
app.use((req, res, next) => {
    const err = new Error('Not Found');
    err.status = 404;
    next(err);
});
app.use((err, req, res, next) => {
    res.status(err.status || 500);
    res.json({ error: { message: err.message } });
});
