var ws = require("websocket.io"),
    fs = require('fs'),
    http = require('http');

var httpServer = http.createServer(function (request,response) {
	  fs.readFile(__dirname+"/index.html", function(error, data) {
		    if(error) {
    		    response.writeHead(500);
    		    return response.end('Fehler beim Laden der Datei index.html');
  		  }
    	  else {
      	     response.writeHead(200);
      		   response.end(data);
    	  }
  	})
});

// Vereint Webserver und WebSocket-Server
var webSocketServer = ws.attach(httpServer);

webSocketServer.on('connection', function(client) {
	  client.on('message', function(message) {
    	  client.send(message);
  	});
})

httpServer.listen(4000);
console.log("Der EchoServer läuft auf dem Port", httpServer.address().port);