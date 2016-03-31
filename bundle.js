/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports) {

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
			/*var conn = peer.connect(peer_ID);
			if (conn != null) {
				conn.on('open', function() {
					//greet new peer
					console.log("Connected to peer");
					//document.write("Connected to peer");
					conn.send("Hello peer!");
				});
				conn.on('data', function(data) {
					receive_message(data);
				});
			}*/
		}
	});

	peer.on('connection', function(conn) {
		/*conn.on('open', function() {
			document.write("connection established");
		});*/
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
		document.getElementById("log_box").value = msg;
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
		} else {
			document.getElementById("log_box").value = "Connection not established - message not sent";
		}
	}

	document.getElementById("send_button").onclick = function () {
		send_message(document.getElementById("input_box").value);
	}

	/*document.getElementById("send_button").onclick = function () {
		var node = document.createElement("LI"); 
		var textnode = document.createTextNode('click');         // Create a text node
		node.appendChild(textnode);                              // Append the text to <li>
		document.getElementById("body").appendChild(node);     // Append <li> to <ul> with id="myList"
	}*/


/***/ }
/******/ ]);