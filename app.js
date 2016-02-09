// MODULES //

var express     = require('express'),
    morgan      = require('morgan'),
    mongoose    = require('mongoose'),
    bodyParser  = require('body-parser');

var app = express();

app.set('view engine', 'ejs');

// MIDDLEWARE //

app.use(morgan('dev'));

app.use(express.static('./public'));

// DATABASE //

var dbPath = 'mongodb://localhost/sample-jam';
mongoose.connect(process.env.MONGOLAB_URI || dbPath);

// ROUTING //

var indexRoute = require('./routes/index');
app.use('/', indexRoute);

// LISTEN //

var port = 3000;
app.listen(process.env.PORT || port, function(){
  console.log('Listening on ' + port);
});
