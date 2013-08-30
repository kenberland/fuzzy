var express = require("express");
var app = express();
app.use(express.logger());

var data = [
    {
        artistName: 'Justin Bieber',
        collectionName: 'One Time (My Heart Edition) - Single',
        trackName: 'One Time (My Heart Edition)',
    },
    {
        artistName: 'Justin Bieber',
        collectionName: 'My Worlds Acoustic',
        trackName: 'One Time',
    },
    {
        artistName: 'Justin Bieber',
        collectionName: 'Radio Disney Jams 12',
        trackName: 'One Time (My Heart Edition)',
    },
    {
        artistName: 'The Justin Bieber Tribute Band',
        collectionName: 'One Time - Single',
        trackName: 'One Time',
    }
]

app.get('/', function(request, response) {
    var sortzzy = require('sortzzy')
    // Create the model to match against
    var model = {
        collectionName: request.query.c
    }
/*    if (request.query.name)
        model.artistName = request.query.name;
    if (request.query.track)
        model.trackName = request.query.track;
    if (request.query.collection)
        model.collectionName = request.query.collection; */
    // Define the fields
    var fields = [
//        {name:'artistName', type:'string', weight:1, options:{ignoreCase:true}},
//        {name:'trackName', type:'string', weight:1, options:{ignoreCase:true}},
        {name:'collectionName', type:'string', weight:10, options:{ignoreCase:true}},
    ]
    var result = sortzzy.sort(data, model, fields);
    response.send(result);
});

var port = process.env.PORT || 5000;
app.listen(port, function() {
    console.log("Listening on " + port);
});
