'use strict';
const express = require('express');
const fs = require('fs');
const path = require('path');
const cors = require("cors");
const configurationManager = require('./modules/configurationManager');
const version  = require('./modules/versionModule');
const { createProxyMiddleware } = require('http-proxy-middleware');
// Constants
const DEBUG_ENVIRONMENT_NAME = process.env.DEBUG_ENVIRONMENT_NAME ?? 'debug';
const RELEASE_PATH =  process.env.CLIENT_RELEASE_PATH ?? '/app/client';
const PORT = process.env.PORT ?? 80; 
const HOST = process.env.HOST ?? '0.0.0.0';
const ENVIRONMENT_NAME_PREFIX= process.env.ENVIRONMENT_NAME_PREFIX ?? '';
const configPath = path.join(__dirname, 'configurations', 'settings.json');
const app = express();
const releasePath = path.join(RELEASE_PATH);


app.get('/version', (req, res) => {
    res.send(version.getVersion(DEBUG_ENVIRONMENT_NAME));
});
app.get('/config',(req, res) => {
    const config =configurationManager.getConfig(configPath, DEBUG_ENVIRONMENT_NAME, ENVIRONMENT_NAME_PREFIX, true);
    const base64 = Buffer.from(JSON.stringify(config)).toString('base64');
    res.status(200).send(base64);
});

function runInDevMode(){
    app.use("*", createProxyMiddleware({ target: "http://127.0.0.1:8080"}))
}
function runInProductionMode(){
    app.use(function(req, res, next) {
        next();
    },express.static(releasePath));
    app.get('*', (req, res) => {
        const indexPath = path.join(RELEASE_PATH, 'index.html');
        if (fs.existsSync(indexPath))
            res.sendFile(indexPath)
        else 
            res.send(JSON.stringify({message: 'Please wait while the application is being loaded, then refresh the page...'}));
    });
}
if(process.env.NODE_ENV === DEBUG_ENVIRONMENT_NAME)
    runInDevMode();
else
    runInProductionMode();



app.listen(PORT, () => console.log(`App running on: http://${HOST}:${PORT}`));