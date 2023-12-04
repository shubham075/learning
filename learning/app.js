
var express = require('express');
var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');
var http = require('http');
var path = require('path');
const cors = require('cors')
var staticDir = path.join(__dirname, 'public');
const config = require('./db/config/config_details');
const basicAuth = require('express-basic-auth');
const crypto = require('./src/middleware/crypto');
const session = require('express-session');


var app = express();
//Connect Swagger
const expressSwagger = require('express-swagger-generator')(app);

// parse requests of content-type - application/json
app.use(bodyParser.json({ limit: '100mb' }))

// parse requests of content-type - application/x-www-form-urlencoded
app.use(
	bodyParser.urlencoded({
		limit: '100mb',
		extended: true,
	})
)

app.use(
	session({
		secret: 'secret',
		resave: true,
		saveUninitialized: true,
	})
);

app.get('/', function (req, res) {
	res.redirect('/api');
});

app.get('/api', (req, res) => {
	app.use(basicAuth({
		users: { 'admin': 'Password#105' },
		challenge: true,
		realm: 'Enter Your Credentials',
	}));
	const options = {
		swaggerDefinition: {
			info: {
				description: 'This is a pompay server',
				title: 'Swagger',
				version: '1.0.0',
			},
			//host: config.localBaseUrl,
			basePath: '/',
			produces: ['application/json', 'application/xml'],
			schemes: ['http', 'https'],
			securityDefinitions: {
				JWT: {
					type: 'apiKey',
					in: 'header',
					name: 'Authorization',
					description: '',
				},
			},
		},
		basedir: __dirname, // app absolute path
		files: ['./routes/**/*.js', './src/controllers/**/*.js'], // Path to the API handle folder
	};
	expressSwagger(options);

	res.send(`<html>
    <script>
    window.location.href = "${config.swagger_origin}/api-docs/"
    </script>
    
	</html>`)
})

app.set('port', config.port);
// Declares the environment to use in `config.json`
var devEnv = app.get('env') == 'development';


app.use(cookieParser())

// The following settings applies to all environments

app.use(function (req, res, next) {
	// Website you wish to allow to connect
	res.setHeader('Access-Control-Allow-Origin', '*')

	// Request methods you wish to allow
	res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE')

	// Request headers you wish to allow
	res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type,Authorization')

	// Set to true if you need the website to include cookies in the requests sent
	// to the API (e.g. in case you use sessions)
	res.setHeader('Access-Control-Allow-Credentials', true)

	// Pass to next layer of middleware
	next()
})


// holding the error and saving from the crash starts here
process.on('uncaughtException', function (err) {
	console.log(err.stack)
})


app.use('/test',
	require('./src/routes/admin.routes'));

const httpsServer = http.createServer(app);
httpsServer.listen(app.get('port'), function () {
	console.log('Express server listening on port ' + app.get('port'));
})

module.exports = app;