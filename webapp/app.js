/*
* app.js - Simple express server
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
