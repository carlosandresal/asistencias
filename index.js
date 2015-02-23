var fs = require('fs');
var Good = require('good');
var Hapi = require('hapi');
var Boom = require('boom');
var minimist = require('minimist');

var date = new Date();
var fileName = 'asistencias' + date.getDate() + '-' + date.getMonth() + '-' +
    date.getFullYear() + '.csv';
var fileStream = fs.createWriteStream(fileName);
var ipMap = {};

var argv = minimist(process.argv);

var server = new Hapi.Server();
server.connection({
    host: 'localhost',
    port: argv.port
});

server.route({
    method: 'POST',
    path: '/asistencia',
    handler: function (request, reply) {
        if (ipMap[request.info.remoteAddress]) {
            return reply(Boom.unauthorized('Ya hiciste una registración'));
        }
        fileStream.write(request.payload.name + ',' + request.payload.email + '\n');
        ipMap[request.info.remoteAddress] = true;
        reply('OK');
    }
});

server.register({
    register: Good,
    options: {
        reporters: [{
            reporter: require('good-console'),
            args: [{ log: '*', response: '*' }]
        }]
    }
}, function (err) {
    if (err) {
        throw err; // something bad happened loading the plugin
    }

    server.start(function () {
        server.log('info', 'Server running at: ' + server.info.uri);
    });
});
