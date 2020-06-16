var env = require('node-env-file'); // .env file
env(__dirname + '/.env.dist');

const express = require('express');
const path = require('path');

if (process.env.ENV == 'AWS') {

    // AWS -- Dependencies
    const fs = require('fs');
    const http = require('http');
    const https = require('https');


    // AWS -- Certificate SSL
    const privateKey = fs.readFileSync('/etc/letsencrypt/live/ausa-store.com/privkey.pem', 'utf8');
    const certificate = fs.readFileSync('/etc/letsencrypt/live/ausa-store.com/cert.pem', 'utf8');
    const ca = fs.readFileSync('/etc/letsencrypt/live/ausa-store.com/chain.pem', 'utf8');

    // AWS -- Credentials
    const credentials = {
        key: privateKey,
        cert: certificate,
        ca: ca
    };
}

const app = express();

//MiddleWare CORS
app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    res.header("Access-Control-Allow-Methods", "POST, GET, PUT, DELETE, OPTIONS");
    next();
});

app.use(express.static(`${__dirname}/dist/${process.env.PROYECT_NAME}`));

app.get('/*', function(req, res) {
    res.sendFile(path.join(`${__dirname}/dist/${process.env.PROYECT_NAME}/index.html`));

});

if (process.env.ENV == 'AWS') {
    // Starting both http & https servers
    const httpServer = http.createServer(app);
    const httpsServer = https.createServer(credentials, app);

    httpServer.listen(process.env.HTTP_PORT, () => {
        console.log('HTTP Server running on port ' + process.env.HTTP_PORT);
    });

    httpsServer.listen(process.env.HTTPS_PORT, () => {
        console.log('HTTPS Server running on port ' + process.env.HTTPS_PORT);
    });
} else {
    app.listen(process.env.HTTP_PORT, () => {
        console.log(`Express Server puerto ${process.env.HTTP_PORT}: \x1b[32m%s\x1b[0m`, 'Online');
    });
}