var net = require('net');
var Address = require('./data/schemas/address');
var command = require('./data/schemas/command');
var PORT = 8125;

var server = net.createServer();

server.on('connection', function(socket){
	console.log(socket.remoteAddress + ':' + socket.remotePort + ' connected');
	var data = '';
	var ip = socket.remoteAddress;

	//socket.setEncoding('utf8');

	socket.on('data', function(chunk){
		console.log('Chunk : ' + chunk);
		data += chunk;
		
		try
		{
			var json = JSON.parse(chunk);
			
			command.sendCommand(socket, json.address);
		}
		catch(err)
		{
			console.log("main.js:0001:json parse err!");
		}
	});

	socket.on('end', function(){
		console.log('Data is : ' + data);
		if(data != ''){
			var statuses = data.split('}');
			var length  = statuses.length;
			if(length - 1 > 0){
				for(var i = 0; i < length -1; i++){
					var status = JSON.parse(statuses[i].toString() + '}');
					Address.saveOrUpdate(status, ip);
				}	
			}
		}
		
		console.log('Client connnection ended');
	});

	// socket.setTimeout(5000, function(){
	// 	socket.end('idle timeout, disconnecting');
	// });

	socket.on('error', function(err){
		console.log('Socket error: ' + err);
	})

});

server.on('error', function(err){
	console.log('Server error: ' + err.message);
});

server.on('close', function(){
	console.log('Server closed');
});

server.on('end', function(){
	console.log('Server disconnected');
});

server.on('timeout', function(){
	console.log('timeout');
});

server.listen(PORT);

console.log('Innotek  command server is started');



