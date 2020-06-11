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