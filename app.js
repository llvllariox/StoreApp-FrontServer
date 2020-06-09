// Requires
var express = require('express');
var mongoose = require('mongoose');
var bodyParser = require('body-parser');

//heroku
const port = process.env.PORT || 3000;
//Inicializar variables
var app = express();

//MiddleWare CORS https://enable-cors.org/server_expressjs.html
app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*"); // update to match the domain you will make the request from
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    res.header("Access-Control-Allow-Methods", "POST, GET, PUT, DELETE, OPTIONS");
    next();
});

//Body Parser
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

//server Index config para ver como carpeta desde el navegardor web las imagenes guardadas en el servidor
//se comenta por que no lo utilizaremos asi
// var serveIndex = require('serve-index');
// app.use(express.static(__dirname + '/'))
// app.use('/uploads', serveIndex(__dirname + '/uploads'));


//importar Rutas
var appRoutes = require('./routes/app');
var usuarioRoutes = require('./routes/usuario');
var loginRoutes = require('./routes/login');
var hospitalRoutes = require('./routes/hospital');
var medicoRoutes = require('./routes/medico');
var busquedaRoutes = require('./routes/busqueda');
var uploadRoutes = require('./routes/upload');
var imagenesRoutes = require('./routes/imagenes');


//Conexion BD localhost
// mongoose.connection.openUri('mongodb://localhost:27017/hospitalDB', (err, res) => {
//     if (err) throw err;
//     console.log('Base de Datos puerto 27017: \x1b[32m%s\x1b[0m', 'Online');
// });

//Conexion BD atlas con usuario userReadWrite 
const uri = "mongodb+srv://userReadWrite:af29101988@hospitadb-uewzz.mongodb.net/hospitaDB?retryWrites=true&w=majority";

mongoose.connect(uri, (err, res) => {
    if (err) throw err;
    console.log('Base de Datos puerto 27017: \x1b[32m%s\x1b[0m', 'Online');
});


// const MongoClient = require('mongodb').MongoClient;
// const uri = "mongodb+srv://af29101988:af29101988@hospitadb-uewzz.mongodb.net/hospitaDB?retryWrites=true&w=majority";
// const client = new MongoClient(uri, { useNewUrlParser: true });
// client.connect(err => {
//     const collection = client.db("test").collection("devices");
//     if (err) throw err;
//     console.log('Base de Datos puerto 27017: \x1b[32m%s\x1b[0m', 'Online');
//     // perform actions on the collection object
//     client.close();
// });

//Rutas la principal va al final.
app.use('/usuario', usuarioRoutes);
app.use('/login', loginRoutes);
app.use('/hospital', hospitalRoutes);
app.use('/medico', medicoRoutes);
app.use('/busqueda', busquedaRoutes);
app.use('/upload', uploadRoutes);
app.use('/img', imagenesRoutes);
app.use('/', appRoutes);

// Escuchar peticiones /3000=puerto 
app.listen(port, () => {
    console.log(`Express Server puerto ${port}: \x1b[32m%s\x1b[0m`, 'Online');
})



// COLORES CONSOLA
// Reset = "\x1b[0m"
// Bright = "\x1b[1m"
// Dim = "\x1b[2m"
// Underscore = "\x1b[4m"
// Blink = "\x1b[5m"
// Reverse = "\x1b[7m"
// Hidden = "\x1b[8m"
// FgBlack = "\x1b[30m"
// FgRed = "\x1b[31m"
// FgGreen = "\x1b[32m"
// FgYellow = "\x1b[33m"
// FgBlue = "\x1b[34m"
// FgMagenta = "\x1b[35m"
// FgCyan = "\x1b[36m"
// FgWhite = "\x1b[37m"
// BgBlack = "\x1b[40m"
// BgRed = "\x1b[41m"
// BgGreen = "\x1b[42m"
// BgYellow = "\x1b[43m"
// BgBlue = "\x1b[44m"
// BgMagenta = "\x1b[45m"
// BgCyan = "\x1b[46m"
// BgWhite = "\x1b[47m"