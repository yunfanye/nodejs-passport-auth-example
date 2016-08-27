var auth                = require('./routes/auth.js'),
    config              = require('./configurations/config.js'),
    initAuth            = require('./controllers/init-auth.js'),
    bodyParser          = require('body-parser'),
    cookieParser        = require('cookie-parser'),
    express             = require('express'),
    expressSession      = require('express-session'),
    favicon             = require('serve-favicon'),
    mongoose            = require('mongoose'),
    passport            = require('passport');

// Connects to mongodb server
mongoose.connect(config.dbSever);

var app = express();

// Route for favicon and static contents
app.use(favicon(__dirname + '/public/favicon.ico'));
app.use(express.static('public'));
// Configures passport middleware; request.user will be set, if login succeeded
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(cookieParser());
app.use(expressSession({secret: 'SecretKey', resave: false, saveUninitialized: false}));
app.use(passport.initialize());
app.use(passport.session());

// Adds serialize and deserialize function, required for sessions, and
// configure strategies
initAuth(passport);

app.get('/', function(request, response) {
    response.send('Hello ' + request.user.displayName);
});

app.use('/auth', auth);

app.listen(config.port, function() {
    console.log('App is running on port ' + config.port);
});
