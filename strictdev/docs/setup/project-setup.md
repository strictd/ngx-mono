# Project Setup

## .env Settings
Root of each project folder has .env for initial configurations
```ini

MONO_ROOT=../../
NODE_MODULES=../../node_modules
SCRIPTS_FOLDER=../../_scripts

GLOBAL_ASSETS=../../_assets

# Angular source paths for Browser compiles
BROWSER_SRC=./src/browser
BROWSER_DEST=./dist

BROWSER_URL_DEVEL=http://localhost:8080/

BROWSER_POLYFILLS=src/browser/app/polyfills.ts
BROWSER_ASSETS=src/browser/assets
BROWSER_STYLES=src/browser/styles
BROWSER_ENTRY_DEV=src/browser/app/main.dev.ts
BROWSER_ENTRY_PROD=src/browser/app/main.prod.ts

BROWSER_DEV_HOST=0.0.0.0
BROWSER_DEV_PORT=8080
BROWSER_DEV_SSL=0

MADAME_API_DEVEL=http://localhost:4000/
MADAME_API_PROD=/api/
```

### MONO_ROOT (string)
default: **'.'**<br />Path to top directory from current project

### NODE_MODULES (string)
default: **'./node_modules'**<br />Path to mono-repo node_modules folder

### SCRIPTS_FOLDER (string)
default: **path.dirname(__filename)** - Same folder as webpack script<br />Path to ngx-mono _scripts/ folder

### GLOBAL_ASSETS (string)
default: **'../assets'**<br />Path to global mono-repo assets folder

### BROWSER_SRC (string)
default: **'src/browser'**<br />Relative path to Angular2 source files

### BROWSER_DEST (string)
default: **'dist'**<br />Relative path to where to save compiled Angular2 Website

### BROWSER_URL_DEVEL (string)
default: null<br />Used only for protractor testing

### BROWSER_POLYFILLS (string)
default: **'app/polyfills'**<br />Relative path to polyfill libraries

### BROWSER_ASSETS (string)
default: **'assets'**<br />Relative path to browser assets for this project

### BROWSER_STYLES (string)
default: **'styles'**<br />Relative path to browser styles for this project

### BROWSER_ENTRY_DEV (string)
default: **'app/main.dev.ts'**<br />Relative path to Development App Entry

### BROWSER_ENTRY_PROD (string)
default: **'app/main.prod.ts'**<br />Relative path to Production App Entry

### BROWSER_DEV_HOST (string)
default: **'0.0.0.0'**<br />Angular2 Webserver host, webpack-dev-server

### BROWSER_DEV_PORT (int)
default: **8080**<br />Angular2 Webserver port, webpack-dev-server

### BROWSER_DEV_SSL (boolean)
default: **false**<br />Angular2 Webserver SSL, (not implemented)

### MADAME_API_DEVEL (string)
default: **'http://localhost:3080/'**<br />Madame internal ajax proxy, Dev API url

### MADAME_API_PROD (string)
default: **'/api/'**<br />Madame internal ajax proxy, Production API url
