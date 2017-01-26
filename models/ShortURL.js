"use strict";
var mongoose = require('mongoose');
var UrlSchema = mongoose.Schema({
	oldurl     :   {type : String, unique : false, required : true},
	shorturl   :  {type : String, unique : true, required : true}
	
})


   module.exports = mongoose.model('ShortURL', UrlSchema);
