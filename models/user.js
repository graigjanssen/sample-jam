var mongoose  = require('mongoose'),
    bcrypt    = require('bcryptjs'),
    crypto    = require('crypto');

var SampleSchema = mongoose.Schema({
  name: {type: String},
  file: {type: String}
});

var UserSchema = mongoose.Schema({
  username: {type: String},
  password: {type: String},
  token: {type: String},
  samples: [SampleSchema]
});

UserSchema.pre('save', function(next){
  if (this.isModified('password')) {
    this.password = bcrypt.hashSync(this.password, 10);
  }
  return next();
});

UserSchema.methods.setToken = function(err, done){
  var scope = this;
  crypto.randomBytes(256, function(err, buf){
    if (err) { return done(err); }
    scope.token = buf;
    scope.save(function(err){
      if (err) { return done(err); }
      done();
    });
  });
};

UserSchema.methods.authenticate = function(passwordTry, callback){
  bcrypt.compare( passwordTry, this.password, function(err, isMatch){
      if (err) { return callback(err); }
      callback(null, isMatch);
  });
};

module.exports = mongoose.model('User', UserSchema);
