# API

## Settings
```
const api_settings = {
  http_server: true,
  http_ip: '0.0.0.0',
  http_port: 14001,

  https_server: false,
  https_ip: '0.0.0.0',
  https_port: 3443,
  https_key: process.cwd() + '/server.key',
  https_cert: process.cwd() + '/server.crt',

  use_cors: true,
  whitelist: '*',
  logger: true,
  jade: false,
  jade_views: './views',
  bodyparser_json: {},
  bodyparser_urlencoded: {extended: true},
  bodyparser_text: false,

  session_secret: 'abc12345'
};
```
### http_server
boolean (default: ***true***) - activate generic server that does not require ssl
### http_ip
string (default: ***'0.0.0.0'***) - ip address to bind http_server to
### http_port
int (default: ***3080***) - port to bind http_server to

### https_server
boolean (default: ***false***) - activate ssl server, 
### https_ip
string (default: ***'0.0.0.0'***) - ip address to bind ssl_server to
### https_port
int (defualt: ***3443***) - port to bind ssl_server to
### https_key
filepath - local path to ssl .key file
### https_cert
filepath - local path to ssl .crt file

### use_cors
boolean (default: ***true***) - enable Cross Origin Resource Sharing
### whitelist
string|string[] (default: '*') - url or array of urls to allow cors access - [More Info - origin: config](https://www.npmjs.com/package/cors#configuration-options)

### logger
string - standard is 'dev' passing format argument of [More Info - morgan npm](https://www.npmjs.com/package/morgan#morganformat-options)

### jade
boolean (default - ***false***) - Activate jade template parsing
### jade_views
string (default: ***'./views'***) - localpath for loading view templates
