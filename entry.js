var peer = new Peer({host: 'localhost', port: 9000});
var connection = null;
peer.on('open', function(id) {
	console.log('My peer ID is: ' + id);
	//document.write('My peer ID is: ' + id);
	var node = document.createElement("LI"); 
	var textnode = document.createTextNode('My peer ID is: ' + id);         // Create a text node
	node.appendChild(textnode);                              // Append the text to <li>
	document.getElementById("body").appendChild(node);     // Append <li> to <ul> with id="myList"
	var peer_ID = window.prompt("Enter ID of peer to connect to.", "Peer ID");
	if (peer_ID != null) {
		connection = peer.connect(peer_ID);
		if (connection != null) {
			connection.on('open', function() {
				//greet new peer
				console.log("Connected to peer");
				//document.write("Connected to peer");
				connection.send("Hello peer!");
			});
			connection.on('data', function(data) {
				receive_message(data);
			});
		}
	}
});

peer.on('connection', function(conn) {
	connection = conn;
	conn.on('open', function() {
		//greet new peer
		console.log("Connected to peer");
		//document.write("Connected to peer");
		conn.send("Hello peer!");
	});
	conn.on('data', function(data) {
		receive_message(data);
	});
});

function receive_message(msg) {
	document.getElementById("log_box").value += ("\nPeer: " + msg);
	var textarea = document.getElementById('log_box');
	textarea.scrollTop = textarea.scrollHeight;
}

function send_message(msg) {
	/*var node = document.createElement("LI"); 
	var textnode = document.createTextNode('click');         // Create a text node
	node.appendChild(textnode);                              // Append the text to <li>
	document.getElementById("body").appendChild(node);     // Append <li> to <ul> with id="myList"
	*/
	if (connection != null) {
		connection.send(msg);
		document.getElementById("input_box").value = "";
		document.getElementById("log_box").value += ("\nYou: " + msg);
	} else {
		document.getElementById("log_box").value = "Connection not established - message not sent";
	}
	var textarea = document.getElementById('log_box');
	textarea.scrollTop = textarea.scrollHeight;
}

document.getElementById("send_button").onclick = function () {
	send_message(document.getElementById("input_box").value);
}

document.getElementById("input_box").onkeypress = function (e) {
	e.which = e.which || e.keyCode;
	if (e.which == 13) {
		send_message(document.getElementById("input_box").value);
	}
}

/*document.getElementById("send_button").onclick = function () {
	var node = document.createElement("LI"); 
	var textnode = document.createTextNode('click');         // Create a text node
	node.appendChild(textnode);                              // Append the text to <li>
	document.getElementById("body").appendChild(node);     // Append <li> to <ul> with id="myList"
}*/
