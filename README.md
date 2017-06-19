# NGX-MONO
# Strict Development Monorepo for Angular

# Setups

## Quick start

* clone our repo
* change directory to your app
* install the dependencies with npm
* start the example registration server
* go to [http://localhost:8080](http://localhost:8080) in your browser.

```
git clone --depth=1 http://github.com/strictd/ngx-mono.git
cd ngx-mono
npm install
npm start

```

## Slate Docs of [https://github.com/strictd/ngx-mono/tree/master/strictdev/docs](https://github.com/strictd/ngx-mono/tree/master/strictdev/docs)
```
npm run docs
```

## Requirements
* Node
* NPM

### Windows

### Mac

### Linux

## Adding NPM Modules
Make sure you are in the ngx-mono root before adding npm modules

```bash
npm install mymodule --save-dev
```

## Building an API
```
node ../../node_modules/webpack/bin/webpack.js ./src/api/entry-point.ts ./bin/output-script.js --config ../../node_modules/ngx-mono/_scripts/webpack-cli.js
```

## Starting Built API
```
node ./bin/output-script.js
```

## Ionic Development
### Building
```
node ../../node_modules/@ionic/app-scripts/bin/ionic-app-scripts.js build
```

### Serving
```
node ../../node_modules/@ionic/app-scripts/bin/ionic-app-scripts.js serve
```

### Mobile App
#### Setup
```
npm install -g cordova ionic
cordova platform add android
node ../../node_modules/@ionic/app-scripts/bin/ionic-app-scripts.js build
```

#### Compile Mobile App
```
cordova build android
```


