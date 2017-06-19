

# API


## API Default Settings
```javascript
const api_settings = {
  /* HTTP Server Settings */
  http_server: true,
  http_ip: '0.0.0.0',
  http_port: 3080,

  /* HTTPS Secure Server Settings */
  https_server: false,
  https_ip: '0.0.0.0',
  https_port: 3443,
  https_key: process.cwd() + '/server.key',
  https_cert: process.cwd() + '/server.crt',

  /* CORS Settings */
  use_cors: true,
  whitelist: '*',
  
  /* Log Settings */
  logger: 'dev',
  
  /* Jade Settings */
  jade: false,
  jade_views: './views',
  
  /* Body Parser Settings */
  bodyparser_json: false,
  bodyparser_urlencoded: false,
  bodyparser_text: false,

  /* Session Settings */
  session_secret: 'abc12345',
  concurrent_ttl: 60,
  concurrent_capacity: 10,
  ratelimit_replenish: 100,
  ratelimit_burst: 2
  
};
```



## HTTP Server Settings
### http_server (***boolean***)
default: ***true***<br /> activate generic server that does not require ssl

CLI: `--http_server true`
<br />
.env: `HTTP_SERVER=true`
<br />
app-settings: `http_server: true`


### http_ip (string)
default: ***'0.0.0.0'***<br />ip address to bind http_server to

CLI: `--http_ip 0.0.0.0`
<br />
.env: `HTTP_IP=0.0.0.0`
<br />
app-settings: `http_ip: '0.0.0.0'`


### http_port (int)
default: ***3080***<br />port to bind http_server to

CLI: `--http_port 3080`
<br />
.env: `HTTP_PORT 3080`
<br />
app-settings: `http_port: 3080`



## HTTPS Secure Server Settings
### https_server (boolean)
default: ***false***<br />activate ssl server,

CLI: `--https_server false`
<br />
.env: `HTTPS_SERVER=false`
<br />
app-settings: `https_server: false`


### https_ip (string)
default: ***'0.0.0.0'***<br />ip address to bind ssl_server to

CLI: `--https_ip 0.0.0.0`
<br />
.env: `HTTPS_IP=0.0.0.0`
<br />
app-settings: `https_ip: '0.0.0.0'`


### https_port (int)
defualt: ***3443***<br />port to bind ssl_server to

CLI: `--https_port 3080`
<br />
.env: `HTTPS_PORT 3080`
<br />
app-settings: `https_port: 3080`


### https_key (string)
default: ***'./server.key'***<br />filepath - local path to ssl .key file

CLI: `--https_key './server.key'`
<br />
.env: `HTTPS_KEY ./server.key`
<br />
app-settings: `https_key: './server.key'`


### https_cert (string)
default: ***'./server.cert'***<br />filepath - local path to ssl .crt file

CLI: `--https_cert './server.cert'`
<br />
.env: `HTTPS_CERT ./server.cert`
<br />
app-settings: `https_cert: './server.cert'`



## CORS Settings
### use_cors (boolean)
default: ***true***<br />enable Cross Origin Resource Sharing

CLI: `--use_cors true`
<br />
.env: `USE_CORS true`
<br />
app-settings: `use_cors: true`


### whitelist (string|string[])
default: '*'<br />url or array of urls to allow cors access - [More Info - origin: config](https://www.npmjs.com/package/cors#configuration-options)

CLI: `--whitelist *`
<br />
.env: `WHITELIST '*'`
<br />
app-settings: `whitelists: '*'`



## Log Settings
### logger (false|string)
default: ***'dev'***<br />standard is 'dev' passing format argument of [More Info - morgan npm](https://www.npmjs.com/package/morgan#morganformat-options)

CLI: `--logger dev`
<br />
.env: `LOGGER=dev`
<br />
api-settings: `logger: 'dev'`



## Jade Settings
### jade (boolean)
default: ***false***<br />Activate jade template parsing
### jade_views (string)
default: ***'./views'***<br />localpath for loading view templates


## Body Parser Settings
### bodyparser_json (false|object)
default: ***false***<br />`{}` is enough to turn on the basic json body parser [More Info - body-parser JSON](https://www.npmjs.com/package/body-parser#bodyparserjsonoptions)

CLI: `--bodyparser_json false`
<br />
.env: `BODYPARSER_JSON=false`
<br />
app-settings: `bodyparser_json: false`


### bodyparser_urlencoded (false|object)
default: ***false***<br />`{extended: true}` for basic parsing based on Content-Type header encoding [More Info - body-parser URLencoded](https://www.npmjs.com/package/body-parser#bodyparserurlencodedoptions)

CLI: `--bodyparser_urlencoded false`
<br />
.env: `BODYPARSER_URLENCODED=false`
<br />
app-settings: `bodyparser_urlencoded: false`


### bodyparser_text (false|object)
default: ***false***<br />[More Info](https://www.npmjs.com/package/body-parser#bodyparsertextoptions)

CLI: `--bodyparser_text false`
<br />
.env: `BODYPARSER_TEXT=false`
<br />
app-settings: `bodyparser_text: false`



## Redis Settings
### session_secret
string (defaults: random string) - sets secret for securing session tokens

CLI: `--session_secret 'random'`
<br />
.env: `SESSION_SECRET='random'`
<br />
app-settings: `session_secret: 'random'`


### concurrent_ttl (int)
default: ***60***<br />required: ***Redis Sessions***<br />Time To Live for redis concurrent connection limiting

CLI: `--concurrent_ttl 60`
<br />
.env: `CONCURRENT_TTL=60`
<br />
api-settings: `concurrent_ttl: 60`


### concurrent_capacity (int)
default: ***10***<br />required: ***Redis Sessions***<br />Max number of connections per express-session

CLI: `--concurrent_capacity 10`
<br />
.env: `CONCURRENT_CAPACITY 10`
<br />
api-settings: `concurrent_capacity: 10`


### ratelimit_replenish (int)
default: ***100***<br />required: ***Redis Sessions***<br />Rate limit per second

CLI: `--ratelimit_replenish 100`
<br />
.env: `RATELIMIT_REPLENISH=100`
<br />
api-settings: `ratelimit_replenish: 100`


### ratelimit_burst (int)
default: ***2***<br />required: ***Redis Sessions***<br />Burst of (value * ratelimit_replenish)

CLI: `--ratelimit_burst 2`
<br />
.env: `RATELIMIT_BURST=2`
<br />
api-settings: `ratelimit_burst: 2`