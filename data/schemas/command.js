var mongoose = require('../../db');
var Schema = mongoose.Schema;


var schema = new Schema({
	infoType: 		{type: Number, default: 12},
	address:   		String,
	midAddress:     String,
	command: 	    Schema.Types.Mixed,
	createdAt:  	{type: Date, default: Date.now}
});

var Command = mongoose.model('Command', schema);

module.exports.sendCommand = function(socket, midAddress){

	Command.find({midAddress: midAddress},function(err, command){
		if(err){
			console.log(err);
		}else{
			if(command.length){
				
				console.log(JSON.stringify(command));
				
				socket.write(JSON.stringify(command), function(){
				
					console.log('Send command to ' + midAddress + " ok");
					
					Command.remove({midAddress:midAddress}, function(err){
					
						if (err)
						{
							console.log(err);
						}
						else
						{
							console.log('remove cmds ok!');
						}
					});
					
					socket.end();
				});
				
			
			}else
				
				socket.end();
				console.log('No command found');
		}
	});
	
};
