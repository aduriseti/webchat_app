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

	console.log("It works");

	//var peer = new Peer({key: 'lwjd5qra8257b9'});
	//var peer = new Peer({key: 'bdy0b8k85qrrudi'});
	var peer = new Peer({host: 'localhost', port: 9000});
	//var connection = null;
	peer.on('open', function(id) {
		console.log('My peer ID is: ' + id);
		document.write('My peer ID is: ' + id);
		var peer_ID = window.prompt("Enter ID of peer to connect to.", "Peer ID");
		if (peer_ID != null) {
			var connection = peer.connect(peer_ID);
			if (connection != null) {
				connection.on('open', function() {
					//greet new peer
					console.log("Connected to peer");
					document.write("Connected to peer");
					connection.send("Hello peer!");
				});
				connection.on('data', function(data) {
					//reply to messages
					var message = window.prompt("Recieved: " + data);
					connection.send(message);
				});
	}
		}
	});

	peer.on('connection', function(conn) {
		console.log("recieved connection");
		var connection = conn;
		connection.on('open', function() {
			//greet new peer
			console.log("Connected to peer");
			document.write("Connected to peer");
			connection.send("Hello peer!");
		});
		connection.on('data', function(data) {
			//reply to messages
			var message = window.prompt("Recieved: " + data);
			connection.send(message);
		});
	});




	/*if (connection != null) {
		connection.on('open', function() {
			//greet new peer
			console.log("Connected to peer");
			document.write("Connected to peer");
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

/***/ }
/******/ ]);