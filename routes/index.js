var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/hellouser', function(req,res) {
  res.render('hellouser', { name: 'Vikas'});
});

/* GET Userlist page. */
router.get('/userlist', function(req, res) {
    var db = req.db;
    var collection = db.get('usercollection');
    collection.find({},{},function(e,docs){
        res.render('userlist', {
            "userlist" : docs
        });
    });
});

router.get('/newuser', function(req, res) {
  res.render('newuser', {title :'Add a new User'});
});

router.post('/adduser', function(req, res){

  var db = req.db;

  var useremail = req.body.useremail;
  var username = req.body.username;

  var collection = db.get('usercollection');

  collection.insert({
    'username':username,
    'email' : useremail
  }, function(err, doc){
    if(err){
      //if it failed
      res.send('There was a problem connecting with the database, try again later.');
    }
    else{
      //if successfull redirect list of users page
      res.redirect("userlist");
    }
  })
});

module.exports = router;
