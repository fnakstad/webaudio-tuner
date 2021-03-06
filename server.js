var express =       require('express')
    , http =        require('http')
    , path =        require('path');

var app = express();

app.set('views', __dirname + '/client/views');
app.set('view engine', 'jade');
app.use(express.logger('dev'))
app.use(express.cookieParser());
app.use(express.bodyParser());
app.use(express.methodOverride());
app.use(express.static(path.join(__dirname, 'client')));

require('./server/routes.js')(app);

app.set('port', process.env.PORT || 8000);
app.set('host', '0.0.0.0');
http.createServer(app).listen(app.get('port'), function(){
    console.log("Express server listening on port " + app.get('port'));
});