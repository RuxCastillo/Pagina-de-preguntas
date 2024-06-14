import express from "express";
import bodyParser from "body-parser";
import pg from "pg";

const app = express();
const port = 3000;
const API_URL = ""
let todoDataBase;
let laCategoria;

const db = new pg.Client({
    user: process.env.USER,
    host: process.env.HOST,
    database: process.env.DATABASE,
    password: process.env.PASSWORD,
    port: process.env.PORT,
});

db.connect();

db.query("SELECT * FROM todaslaspreguntas", (err, res) => {
    if(err) {
        console.error("Error executing query", err.stack);
    } else {
        todoDataBase = res.rows;
        console.log(todoDataBase)
    }

})

function enviandoUnaPregunta() {
    let datosFiltrados = todoDataBase.filter((item) => {return (item.categoria === laCategoria)});
    let numRan = Math.floor(Math.random() * datosFiltrados.length);
    let resultado = datosFiltrados[numRan]
    console.log(datosFiltrados, numRan, resultado, laCategoria)
    return resultado
}

app.use(express.static("./public"));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.get("/", (req, res) => {
    let envio = enviandoUnaPregunta()
    res.render("index.ejs", {
        enDb: envio
    });
});

app.get("/numeroRandomBoton", (req, res) => {
    console.log(req.query)
    laCategoria = req.query.categoria;
    console.log("le diste al boton otraPregunta")
    let envio2 = enviandoUnaPregunta();
    res.send({
        enDb: envio2,
    })
    
})

app.post("/agregarPregunta", async (req, res) => {
    const datos = req.body
    console.log(datos);


    const result = await db.query(
        "INSERT INTO todaslaspreguntas (preguntas, respuestas, categoria) VALUES ($1, $2, $3)",[datos.pregunta, datos.respuesta, datos.categoria]);

})



app.listen(port, () => {
    console.log(`Listening on port ${port}`)
})