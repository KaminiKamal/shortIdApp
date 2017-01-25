"use strict";
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

   module.exports = mongoose.model('ShortURL',
  {     
        oldurl : String,
        shorturl   : String
  });
