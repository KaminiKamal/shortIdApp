"use strict";
var mongoose = require('mongoose');
var UrlSchema = mongoose.Schema({
	oldurl : String,
	shorturl   : String
})


   module.exports = mongoose.model('ShortURL', UrlSchema);
