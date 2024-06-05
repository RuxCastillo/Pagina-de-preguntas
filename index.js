
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


otraPregunta.addEventListener("click", () => {
    numeroRandom = 0;
    let randomPreguntas = Math.floor(Math.random() * Preguntas.length);
    console.log(randomPreguntas);
    console.log("botonSolucion");
    pregunta.innerText = Preguntas[randomPreguntas].pregunta;
    numeroRandom = randomPreguntas;
     
});

botonSolucion.addEventListener("click", () => {
    console.log("botonSolucion");
    showRespuesta.innerText = Preguntas[numeroRandom].respuesta;
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




















