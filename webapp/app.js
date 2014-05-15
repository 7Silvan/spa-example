/*
* app.js - Express server with advanced routing
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
    app.use(express.static(__dirname + '/public'));
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

// all configurations below are for routes

app.get('/', function (request, response) {
    response.redirect('/spa.html');
});

app.get('/user/list', function (request, response) {
    response.contentType('json');
    response.send({title: 'user list'});
});

app.get('/user/create', function (request, response) {
    response.contentType('json');
    response.send({title: 'user created'});
});

app.get('/user/read/:id([0-9]+)', function (request, response) {
    response.contentType('json');
    response.send({
        title: 'user with id ' + request.params.id + ' found'
    });
});
// end server configuration

// begin start server
server.listen(3000);
console.log(
    'Express server listening on port %d in %s mode',
    server.address().port, app.settings.env
);
// end start server
