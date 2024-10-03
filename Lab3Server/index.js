// Dependencias
const express = require('express');
const app = express();
const morgan = require('morgan')
//const routes = require( './rutas/routes.js');
const path = require('path');
const bodyParser = require('body-Parser');
//Configuración
const hostname = 'localhost';
const port = 3000;

//Morgan
app.use(morgan('dev'));

//Middleware (que aún no se que es)

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

//Rutas
//app.use(routes);

app.post('/pag1.html',(req, res) => {
    res.send('Estas llamando al servicio /api/getlibro x metodo post de la pagina 1');
});

app.post('/pag2.html',(req, res) => {
    res.send('HOLIIIIIIIIIIII');
});

//Static files
app.use(express.static(path.join(__dirname,'public')));


//Salida del servidor
app.listen(port,hostname,()=>{
    console.log(`Hola, este es mi server en http://${hostname}:${port} `); 
})