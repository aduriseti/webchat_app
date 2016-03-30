console.log("It works");

var peer = new Peer({key: 'lwjd5qra8257b9'});
var connection = null;

peer.on('open', function(id) {
	//console.log('My peer ID is: ' + id);
	document.write('My peer ID is: ' + id);
	var peer_ID = window.prompt("Enter ID of peer to connect to.", "Peer ID");
	if (peer_ID != null) {
		connection = peer.connect(peer_ID);
		
	}
});

console.log("listening");
peer.on('connection', function(conn) {
	connection = conn;
});

if (connection != null) {
	connection.on('open', function() {
		//greet new peer
		console.log("Connected to peer");
		connection.send("Hello peer!");
	});
	connection.on('data', function(data) {
		//reply to messages
		var message = window.prompt("Recieved: " + data);
		connection.send(message);
	});
}

/*var send_message = function () {

}

document.getElementById("send_button").onclick = function*/