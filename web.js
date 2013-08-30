var express = require("express");
var app = express();
app.use(express.logger());

var data = [
    {
        artistName: 'Justin Bieber',
        collectionName: 'One Time (My Heart Edition) - Single',
        trackName: 'One Time (My Heart Edition)',
        trackTimeMillis: 191697,
    },
    {
        artistName: 'Justin Bieber',
        collectionName: 'My Worlds Acoustic',
        trackName: 'One Time',
        trackTimeMillis: 186267,
    },
    {
        artistName: 'Justin Bieber',
        collectionName: 'Radio Disney Jams 12',
        trackName: 'One Time (My Heart Edition)',
        trackTimeMillis: 190667,
    },
    {
        artistName: 'The Justin Bieber Tribute Band',
        collectionName: 'One Time - Single',
        trackName: 'One Time',
        trackTimeMillis: 240148,
    }
]

app.get('/', function(request, response) {
    var sortzzy = require('sortzzy')
    // Create the model to match against
    var model = {
        artistName      : req.query.name,
        trackName       : req.query.track,
        trackTimeMillis : req.query.time
    }
    // Define the fields
    var fields = [
        {name:'artistName', type:'string', weight:1, options:{ignoreCase:true}},
        {name:'trackName', type:'string', weight:1, options:{ignoreCase:true}},
        {name:'trackTimeMillis', type:'numeric', weight:2, fixedRange:[160000, 220000]}
    ]
    var result = sortzzy.sort(data, model, fields);
    response.send(result);
});

var port = process.env.PORT || 5000;
app.listen(port, function() {
    console.log("Listening on " + port);
});
