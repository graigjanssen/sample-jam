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
  var newUser = new User(req.body);
  newUser.save(function(err, dbUser){
    if (err) {
      res.json({description: 'invalid'});
    } else {
      res.json(dbUser);
    }
  });
});
// LOG IN //
router.post('/authenticate', function(req, res){
  User.findOne({username: req.body.username}, function(err, dbUser){
    if (dbUser) {
      dbUser.authenticate(req.body.password, function(err, isMatch){
        if (isMatch) {
          dbUser.setToken(err, function(){
            res.json(dbUser);
          });
        } else {
          res.json({description: 'invalid'});
        }
      });
    } else {
      res.json({description: 'invalid'});
    }
  });
});

// SAVE SAMPLES //
  // Expecting an array of 8 sample objects containing info and base64 strings representing audio data //
router.post('/samples', function(req, res){
  var currentUser = req.user;
  var samplesToSave = req.body.samples;
  currentUser.samples = samplesToSave;
  currentUser.save(function(err, dbUser){
    if (err) {
      res.json({description: 'Error Saving Samples'});
    }
    res.json(dbUser);
  });
});

 // Get samples: called when user loads samples //
router.get('/samples', function(req, res){
  var currentUser = req.user;
  var userSamples = currentUser.samples;
  res.json(userSamples);
});

module.exports = router;
