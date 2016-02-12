// MODULES //

var express     = require('express'),
    morgan      = require('morgan'),
    mongoose    = require('mongoose'),
    bodyParser  = require('body-parser');
    cookieParser = require('cookie-parser');
var app = express();

app.set('view engine', 'ejs');

// MIDDLEWARE //

app.use(morgan('dev'));

app.use(express.static('./public'));

app.use(bodyParser.urlencoded({extended: true}));
app.use(cookieParser());

// DATABASE //

var dbPath = 'mongodb://localhost/sample-jam';
mongoose.connect(process.env.MONGOLAB_URI || dbPath);

// ROUTING //

var indexRoute = require('./routes/index');
app.use('/', indexRoute);

var usersRoute = require('./routes/users');
app.use('/users', usersRoute);

// LISTEN //

var port = 3000;
app.listen(process.env.PORT || port, function(){
  console.log('Listening on ' + port);
});
