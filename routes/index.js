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


router.get('/', function(req, res, next) {
   
  res.render('index');
});

router.get('/page1', function (req, res) {
  IdGen.find().exec(function (error,data) {
  if (error) {
    console.log("error");
    res.send("error")
  }
    else{
    console.log(data);
     return res.render('page1', {data : data});
    }
  });
//res.send("hi");
  //res.render('page1',{title:'list of shortIDs'});
});

router.get('/:myurl',function(req, res){
 var a = req.params.myurl;
var search = IdGen.findOne({'shorturl': a});
  search.exec(function (err, docs) {
    if(err) return res.send('err0r');
    if (docs == null){
        return res.send('null');
    }else{
    //res.send(docs);

    res.redirect(docs.oldurl);
    }
  });
 
});


 router.post('/form', authenticate, function (req, res) {
           var url = req.body.originalurl;
           console.log(url);
           var q = shortid.generate();
           var newid = shortid.generate();

           var info = {oldurl :url, shorturl: newid};
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
           	res.send(q);
            }
           });
           console.log(newid);
           //res.redirect('/page1');
});


 



/*
router.get('/:myurl', function(req, res){
  var a = req.params.myurl;
  console.log("the received url: "+a);
  IdGen.find().exec();
  res.send("hi");
});
*/
module.exports = router;
