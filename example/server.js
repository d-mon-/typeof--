/**
 * Created by GUERIN Olivier, on 01/10/2015.
 * Twitter: @MisterRaton
 */
//simple static server

var connect = require('connect');
var path = require ('path');
var serveStatic = require('serve-static');
var main_dir = path.join(__dirname,'..');
connect().use(serveStatic(main_dir)).listen(8080);

//goto: http://localhost:8080/example/amd.html