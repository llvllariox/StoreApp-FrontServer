const express = require('express');
const path = require('path');

const app = express();
app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    res.header("Access-Control-Allow-Methods", "POST, GET, PUT, DELETE, OPTIONS");
    next();
});

app.use(express.static(__dirname + '/dist/storeapp'));

app.get('/*', function(req, res) {
    res.sendFile(path.join(__dirname + '/dist/storeapp/index.html'));

});
app.listen(5000, () => {
    console.log(`Express Server puerto 5000: \x1b[32m%s\x1b[0m`, 'Online');
});

// AWS SSL 
// const express = require('express');
// const path = require('path');
// // Dependencies
// const fs = require('fs');
// const http = require('http');
// const https = require('https');

// const app = express();

// // Certificate
// const privateKey = fs.readFileSync('/etc/letsencrypt/live/ausa-store.com/privkey.pem', 'utf8');
// const certificate = fs.readFileSync('/etc/letsencrypt/live/ausa-store.com/cert.pem', 'utf8');
// const ca = fs.readFileSync('/etc/letsencrypt/live/ausa-store.com/chain.pem', 'utf8');

// const credentials = {
// 	key: privateKey,
// 	cert: certificate,
// 	ca: ca
// };


// app.use(function(req, res, next) {
//     res.header("Access-Control-Allow-Origin", "*");
//     res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
//     res.header("Access-Control-Allow-Methods", "POST, GET, PUT, DELETE, OPTIONS");
//     next();
// });

// app.use(express.static(__dirname + '/dist/storeapp'));

// app.get('/*', function(req, res) {
//     res.sendFile(path.join(__dirname + '/dist/storeapp/index.html'));

// });
// //app.listen(8080, () => {
// //    console.log(`Express Server puerto 5000: \x1b[32m%s\x1b[0m`, 'Online');
// //});

// // Starting both http & https servers
// const httpServer = http.createServer(app);
// const httpsServer = https.createServer(credentials, app);

// httpServer.listen(80, () => {
// 	console.log('HTTP Server running on port 80');
// });

// httpsServer.listen(443, () => {
// 	console.log('HTTPS Server running on port 443');
// });