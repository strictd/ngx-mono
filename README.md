# NGX-MONO
# Strict Development Monorepo for Angular

## Quickstart
### Clone Repo
```bash
git clone https://github.com/strictd/ngx-mono.git
cd ngx-mono
```

### Install NPM Modules
Install node modules into root folder, everything uses the same versions
```
npm install
```

### enter strictdev/public_website project folder
```bash
cd strictdev/public_website
```

### Run Dev Server
```bash
npm start
```

### Show Website
Open browser to <http://localhost:8080/>


## Adding NPM Modules
only in the root directory do you add node_modules.
When node_module folders exist in project directory node won't look above that project folder for any other modules.

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


