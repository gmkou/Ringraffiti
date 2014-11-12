var express = require('express')
var app = express()
  , http = require('http')
  , server = http.createServer(app)
  , io = require('socket.io').listen(server)

var PORT = 8888;
server.listen(PORT);
var gSocket = null;

function sendKey(code, callback) {
  if (gSocket!=null) {
    gSocket.emit('hi', code);
  }
}

app.get('/', function (req, res) {
  res.sendfile(__dirname + '/README.md');
});

app.get('/:char', function (req, res) {
  sendKey(req.params.char);
  console.log('respond char : ' + req.params.char);
  res.sendfile(__dirname + '/README.md');
});

io.sockets.on('connection', function (socket) {
  gSocket = socket;
  console.log("connection");
});


