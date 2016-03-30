console.log("It works");

var peer = new Peer({key: 'lwjd5qra8257b9'});
peer.on('open', function(id) {
	console.log('My peer ID is: ' + id);
	//document.write('My peer ID is: ' + id);
	var peer_ID = window.prompt("Enter ID of peer to connect to.", "Peer ID");
	if (peer_ID != null) {
		var conn = peer.connect(peer_ID);
		if (conn != null) {
			conn.on('open', function() {
				//greet new peer
				console.log("Connected to peer");
				conn.send("Hello peer!");
			});
			conn.on('data', function(data) {
				//reply to messages
				var message = window.prompt("Recieved: " + data);
				conn.send(message);
			});
		}
	}
});

console.log("listening");
peer.on('connection', function(conn) {
	conn.on('open', function() {
		//greet new peer
		console.log("Connected to peer");
		conn.send("Hello peer!");
	});
	conn.on('data', function(data) {
		//reply to messages
		var message = window.prompt("Recieved: " + data);
		conn.send(message);
	});
})

document.getElementById("send_button").onclick = function