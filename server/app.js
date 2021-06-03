// Example express application adding the parse-server module to expose Parse
// compatible API routes.

var express = require('express');
var ParseServer = require('parse-server').ParseServer;
var path = require('path');

var databaseUri = process.env.DATABASE_URI || process.env.MONGODB_URI;

if (!databaseUri) {
    console.log('DATABASE_URI not specified, falling back to localhost.');
}
/**********************/
var api = new ParseServer({
    databaseURI: databaseUri || 'mongodb://127.0.0.1:27017/mousetrack',
    cloud: process.env.CLOUD_CODE_MAIN || __dirname + '/cloud/main.js',
    appId: process.env.APP_ID || 'mousetrack_app',
    masterKey: process.env.MASTER_KEY || 'mousetrack_master_key', //Add your master key here. Keep it secret!
    serverURL: process.env.SERVER_URL || 'example.com/parse',// Don't forget to change to https if needed
    liveQuery: {
        classNames: ["Posts", "Comments"] // List of classes to support for query subscriptions
    },
    production: true
});
// Client-keys like the javascript key or the .NET key are not necessary with parse-server
// If you wish you require them, you can set them as options in the initialization above:
// javascriptKey, restAPIKey, dotNetKey, clientKey

var app = express();

// Serve static assets from the /public folder

/********** JS folder ************/
app.use('/mousetrack', express.static(path.join(__dirname, '/public/js/')));
// app.use('/mousetrack', express.static(path.join(__dirname, '/public/mousetrack')));

// Serve the Parse API on the /parse URL prefix
var mountPath = process.env.PARSE_MOUNT || '/parse';
app.use(mountPath, api);

// Parse Server plays nicely with the rest of your web routes
app.get('/', function(req, res) {
    // res.status(200).send('Welcome to course');
    res.sendFile(path.join(__dirname, '/public/index.html'));
});

// There will be a test page available on the /test path of your server url
// Remove this before launching your app
// app.get('/exercise', function(req, res) {
//     res.sendFile(path.join(__dirname, '/public/exercises/index.html'));
// });

/********** Http server ************/
var port = process.env.PORT || 45679;
var host = process.env.HOST || "0.0.0.0";
var httpServer = require('http').createServer(app);
httpServer.listen(port, host, function() {
    console.log('parse-server-example running on port ' + host + ":" + port);
});

ParseServer.createLiveQueryServer(httpServer);