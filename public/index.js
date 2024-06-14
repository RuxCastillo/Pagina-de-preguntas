
const pregunta = document.querySelector("#pregunta");
const miRespuesta = document.querySelector("#miRespuesta");
const otraPregunta = document.querySelector("#otraPregunta");
const botonSolucion = document.querySelector("#botonSolucion");
const showRespuesta = document.querySelector("#showRespuesta");
const divBotones = document.querySelector("#divBotones");
const bienBoton = document.querySelector("#bien");
const bienContador = document.querySelector(".contadorBien")
let contadorBien = 1;
const malBoton = document.querySelector("#mal");
const malContador = document.querySelector(".contadorMal");
let contadorMal = 1;
let numeroRandom = 0;
const categoriaPregunta = document.querySelector("#escogeCategoria");

const nuevaPregunta = document.querySelector("#nuevaPregunta");
const nuevaRespuesta = document.querySelector("#nuevaRespuesta");
const nuevaCategoria = document.querySelector("#escogeCategoria2");
const submitPreguntaBoton = document.querySelector("#submitPregunta");

let preguntaActual;


otraPregunta.addEventListener("click", (e) => {
     
    fetch(`/numeroRandomBoton?categoria=${categoriaPregunta.value}`, {
        method: "GET"
    })
    .then(function(response) {
        if (!response.ok) {
            throw new Error("Error en la solicitud GET: " + response.status);
        }
        return response.json();
    })
    .then (function manipularDatos(data) {
        console.log(data);
        preguntaActual = data.enDb;
        pregunta.innerText = data.enDb.preguntas
        showRespuesta.innerText = "Presiona boton para ver respuesta, suerte..."
    })
    .catch(function(error) {
        console.error("Error: ", error);
    })

});

botonSolucion.addEventListener("click", () => {
    console.log("botonSolucion");
    showRespuesta.innerText = preguntaActual.respuestas;
})

malBoton.addEventListener("click", () => {
    console.log("mal");
    malContador.innerText = contadorMal++
    console.log(contadorMal)

});

bienBoton.addEventListener("click", () => {
    console.log("bien");
    bienContador.innerText = contadorBien++
});



submitPreguntaBoton.addEventListener("click", (e) => {
    let pregunta = nuevaPregunta.value;
    let respuesta = nuevaRespuesta.value;
    let categoria = nuevaCategoria.value;

    let datos = {
        pregunta: pregunta,
        respuesta: respuesta,
        categoria: categoria
    };

    fetch("/agregarPregunta", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(datos) 
    })
    .then(response => {
        if (!response.ok) {
            throw new Error("Error en la solicitud POST: " + response.status)
        }
        console.log("Solicitud POST exitosa")
    })
    .catch(error => {
        console.error("Error: ", error);
    });

    e.preventDefault();

    nuevaPregunta.value = "";
    nuevaRespuesta.value = "";
});

















