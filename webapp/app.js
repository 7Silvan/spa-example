/*
* app.js - Simple express server with middleware
 */

/*jslint         browser : true, continue : true,
 devel  : true, indent  : 2,    maxerr   : 50,
 newcap : true, nomen   : true, plusplus : true,
 regexp : true, sloppy  : true, vars     : false,
 white  : true
 */
/*global */

// begin module scope variables
'use strict';
var
    http = require('http'),
    express = require('express'),
    app = express(),
    server = http.createServer(app);
// end module scope variables

// begin server configuration
app.configure(function () {
    app.use(express.bodyParser());
    app.use(express.methodOverride());
});

app.configure('development', function () {
    app.use(express.logger());
    app.use(express.errorHandler({
        dumpException: true,
        showStack: true
    }));
});

app.configure('production', function () {
    app.use(express.errorHandler());
});

app.get('/', function (request, response) {
    response.send('Hello Express');
});
// end server configuration

// begin start server
server.listen(3000);
console.log(
    'Express server listening on port %d in %s mode',
    server.address().port, app.settings.env
);
// end start server
