var express = require('express');
var router = express.Router();
var User = require('../models/user');

// GET ALL (in case I want to check what's up at /users) //

router.get('/', function(req, res){
  User.find({}, function(err, dbUsers){
    res.json({users: dbUsers});
  });
});

// GET CURRENT //
router.get('/current', function(req, res){
  if (req.user){
    res.json ({user: req.user});
  } else {
    res.json ({description: "No User Found"});
  }
});

// CREATE NEW //
router.post('/', function(req, res){
  var newUser = new User(req.body.user);
  newUser.save(function(err, dbUser){
    res.json(dbUser);
  });
});
// LOG IN //
router.post('/authenticate', function(req, res){
  User.findOne({username: req.body.username}, function(err, dbUser){
    if (dbUser) {
      console.log('Found user: ', dbUser);
      dbUser.authenticate(req.body.password, function(err, isMatch){
        if (isMatch) {
          dbUser.setToken(err, function(){
            console.log('Just set the toke, heres the user:', dbUser);
            res.json(dbUser);
          });
        } else {
          res.json({description: 'invalid'});
        }
      });
    } else {
      console.log('Did not find dbUser');
      res.json({description: 'invalid'});
    }
  });
});

// SAVE SAMPLES //
router.post('/samples', function(req, res){
  var currentUser = req.user;
  var samplesToSave = req.body;
  currentUser.samples.push(samplesToSave);
  currentUser.save(function(err, dbUser){
    res.json(dbUser);
  });
});

module.exports = router;
