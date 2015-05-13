var mongoose = require('../../db.js');
var moment = require('moment-timezone');
var Schema = mongoose.Schema;
var Command = require('./command');

/*
  address   -  中间件标识
  ip  	    -  中间件ip地址
*/
var schema = new Schema({
	 address:     String
   , ip: 		  String
   , updatedAt:   {type: Date, default: Date.now}
   , data:        [Schema.Types.Mixed]
});

var Address = mongoose.model('Address', schema);

module.exports.saveOrUpdate = function(data, ip){
	console.log("CPU" + data.data[0]);
	
	Address.findOneAndUpdate({address: data.address}, 
			{ip: ip, address: data.address, updatedAt: new Date(), data: data.data}, 
			{upsert: true},
			function(err, result){
				if(err)
					console.log('Middleware address saved failed ' + err);
				else{
					console.log('Middleware address saved success '+ result.address +' ip: ' + ip);
					//自控仪状态信息更新成功，检查是否有新曲线设置需要下发
					//Command.sendCurves(socket, result.address);
				}
			});
};

