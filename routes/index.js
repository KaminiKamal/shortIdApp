var express = require('express');
var IdGen = require('../models/ShortURL');
var router = express.Router();
var shortid = require('short-id');
/* GET home page. *
*/
var authenticate = function(req, res, next) {
     var str=req.body.originalurl;
    var n = str.search(/http|https|localhost|www/);
    if(n==0){
      next();
    }
    else{
      return res.send("Please enter valid url");
    }
    //document.getElementById("demo").innerHTML = n;
}

router.get('/index',function(req, res){
  res.render('index1',{title : 'Welcome to express'});
});
router.get('/', function(req, res, next) {
   
  res.render('index');
});


router.get('/:myurl',function(req, res){
 var a = req.params.myurl;
       res.send("Sorry!!! the page is not available");
    window.location.assign(a);
      
 
});



router.post('/form', authenticate, function (req, res) {
           var url = req.body.originalurl;
           console.log(url);
           var q = shortid.generate();
           //var newid = shortid.generate();

           var info = {oldurl :url, shorturl: q};
           console.log(info);
           //console.log(shortid.generate());
           var query = IdGen(info);
           query.save(function(err, data){
           	if(err){
              console.log("error");
            }
           	else{
               console.log(data);
              console.log("data sent");
           	res.send(data);
            }
           });
           console.log(q);
           //res.redirect('/page1');
});

router.get('/index', function (req, res){
  var a ="localhost:3000/index";
  res.render('index',a);
});
 

module.exports = router;
