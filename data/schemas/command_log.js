var mongoose = require('../../db');
var Schema = mongoose.Schema;


var schema = new Schema({
	infoType: 		{type: Number, default: 12},
	address:   		String,
	midAddress:     String,
	command: 	    Schema.Types.Mixed,
	createdAt:  	{type: Date, default: Date.now}
});

var CommandLog = mongoose.model('Command_log', schema);

module.exports.insert = function(cmds){

	for (var i = 0; i < cmds.length; ++i)
	{	
		var cmdLog = new CommandLog;
		
		cmdLog.infoType = cmds[i].infoType;
		cmdLog.address = cmds[i].address;
		cmdLog.midAddress = cmds[i].midAddress;
		cmdLog.command = cmds[i].command;
		cmdLog.createAt = cmds[i].createdAt;
		
		cmdLog.save(function(err){
		
			if (!err)
			{
				console.log("save a cmd logs ok!");
			}
			else
			{
				console.log("save a cmd logs failed!");
			}
		});
	}
	
};
