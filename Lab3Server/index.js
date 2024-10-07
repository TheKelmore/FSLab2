// Dependencias
const express = require("express");
const app = express();
const morgan = require("morgan");
const path = require("path");
const bodyParser = require("body-Parser");
const mongoose = require("mongoose");

//Configuración
const hostname = "localhost";
const port = 3000;

let bdURL = "mongodb://127.0.0.1:27017/dbProyectoFinal";
mongoose.connect(bdURL);

mongoose.connection.on("connected", function () {
    console.log("Conexion a mongo realizada en: " + bdURL);
});

const sch = new mongoose.Schema({
    isbn: String,
    autor: String,
    titulo: String,
});

const Libro = mongoose.model("Libros", sch);
//Morgan
app.use(morgan("dev"));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// Middleware de las bases de datos


app.get('/libros', async (req, res) => {
    try {
        const libros = await Libro.find()
        res.json(libros)
    } catch (err) {
        res.status(500).send('Error al consultar libros')
    }
})

app.get("/libros/:isbn", async (req, res) => {
    try {
        const libro = await Libro.findOne({ isbn: req.params.isbn });
        if (libro) {
            res.json(libro);
        } else {
            res.status(404).send("Libro no encontrado");
        }
    } catch (err) {
        res.status(500).send("Error al buscar libro");
    }
});

app.post("/libros/create", async (req, res) => {
    try {
        console.log( "isbn:"   + req.body.isbn ) ;
        console.log( "titulo:" + req.body.titulo ) ;
        console.log( "autor:"  + req.body.autor ) ;
        var nuevoLibro = new Libro(req.body)
        console.log(req.body);
        await nuevoLibro.save()
        res.json(nuevoLibro)
    } catch (err) {
        res.status(500).send('Error al crear libro')
    }
})

app.post("/libros/update", async (req, res) => {
    try{
        const update = await Libro.updateOne({isbn:req.body.isbn},{$set:{"titulo":req.body.titulo,"autor":req.body.autor} } )
        if (update) {
            res.json(update);
        } else {
            res.status(404).send("Libro no se pudo actualizar");
        }
    } catch (err) {
        res.status(500).send('Error al actualizar libro')
    }
});

app.delete("/libros/:isbn", async (req, res) => {
    try {
        const libro = await Libro.findOneAndDelete({ isbn: req.params.isbn });
        if (libro) {
            res.json(libro);
        } else {
            res.status(404).send("Libro no encontrado");
        }
    } catch (err) {
        res.status(500).send("Error al eliminar libro");
    }
});



app.post("/pag1.html", (req, res) => {
    res.send(
        "Estas llamando al servicio /api/getlibro x metodo post de la pagina 1"
    );
});

app.post("/pag2.html", (req, res) => {
    res.send("HOLIIIIIIIIIIII");
});

//Static files
app.use(express.static(path.join(__dirname, "public")));

//Salida del servidor
app.listen(port, hostname, () => {
    console.log(`Hola, este es mi server en http://${hostname}:${port} `);
});
