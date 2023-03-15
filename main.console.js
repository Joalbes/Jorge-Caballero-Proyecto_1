//******************************* Creación de Arreglos Iniciales ***************************************//
//********************************************************************************************//
const arrayPalabras = ["color", "sabor", "comida", "frutas", "vegetales"];
//******************************* Creación de Variables ****************************************//
//********************************************************************************************//

let gano = 0;
let contador = 0;
let hayLetra = 0;
let palabra = "";
let posicionesPalabra = "";
let contadorFallas = 0;
let vectorPalabra = [];
let vectorPosicionesPalabra = [];
let nuevasPosiciones = [];
let vectorEspacios = [];
let vectorHistorial = [];
let entrar = true;
let banderaPosiciones = 1;
let banderaLetraRepetida = 0;
//******************************* Referencias a las vistas ****************************************//
//********************************************************************************************//
const contenedorImagen = document.getElementById("imagen_ahorcado");
const contenedorPalabraAvalidar = document.getElementById("contendor_palabra_a_validar");
const contedorHistorico = document.getElementById("contedor-historico");
const btnEnviar = document.getElementById("btn_enviar");
const btnReiniciar = document.getElementById("btn_reiniciar");
const entrada = document.getElementById("entrada_letra");
const imagen = document.getElementById("imagen_ahorcado");
const cajaEntradaDatos = document.getElementById("caja_entrada_datos");
const cajaBotones = document.getElementById("botones");
//******************************* Obteniendo Valortes ****************************************//
//********************************************************************************************//
const entradaLetras = document.querySelector("#entrada_letra").value;
//******************************* Creracion de eventos ****************************************//
//********************************************************************************************//
btnEnviar.addEventListener("click", fEnter);
btnReiniciar.addEventListener("click", fReset);

//Este script permite responder cuando se pulsa enter en el documento
entrada.addEventListener("keypress", function (e) {
  if (e.key == "Enter") {
    e.preventDefault();
    fEnter();
  }
});
//************************************************** LOGICA ****************************************************//
//**************************************************************************************************************//
//Agrega palabra de datos vacios al html
fBuscarPalabra();

//************************************************ FUNCIONES ****************************************************//
//***************************************************************************************************************//
function fBuscarPalabra() {
  //Busca la palabra en el array inicial
  palabra = arrayPalabras[Math.floor(Math.random() * arrayPalabras.length)];
  console.log(arrayPalabras);
  console.log(palabra);
  //Crea string de "datos vacios".
  for (let index = 0; index < palabra.length; index++) {
    posicionesPalabra += "__   ";
  }
  //Agrega string de datos vacios al contenedor correspondiente de html.
  contenedorPalabraAvalidar.innerHTML = `<p class="text-center">${posicionesPalabra}</p>`;
}

function fEnter() {
  //Lee la letra ingresada por teclado.
  let entradaLetras = document.querySelector("#entrada_letra").value;


  //Agrega letra al contenedor de historicos.
  vectorHistorial.push(entradaLetras);
  contedorHistorico.innerHTML += `<p>${entradaLetras}, </p>`;
  

  //validacion letra repetida
  if (banderaLetraRepetida != 0) {
    while (entrar) {
      vectorHistorial.forEach(element => {
        // if (element == entradaLetras) {
        //   alert('Error: Letra repetida. Intente de nuevo:');
        //   let entradaLetras = document.querySelector("#entrada_letra").value;
        // } else {
          
        // }
        console.log(element);
        
      });
      

    }
  }
  banderaLetraRepetida = 1;

  //Limpia el input
  document.getElementById("entrada_letra").value = "";

  //Coloca la letra en el string de datos vacios
  //La Bandera hace que se ejecute una sola vez la creacion del vector palabra y datos vacios
  //para poder sobreescribir y que no se borren las letras ya rellenadas
  if (banderaPosiciones == 1) {
    palabraVector = palabra.split("");
    vectorPosicionesPalabra = palabraVector.map(fEspacios);
  }
  banderaPosiciones = 0;

  //Relleno el vectorPosicionesPalabra con las letras coincidentes.
  palabraVector.map(fValidarLetra);
  function fValidarLetra(currentValue, i) {
    if (currentValue == entradaLetras) {
      //Reemplazando las letras que coinciden en el arreglo de espacios
      vectorPosicionesPalabra[i] = currentValue;
      //Bandera si existe la letra en la palabra
      hayLetra = 1;
    }
  }

  //convierto el vectorPocisionesPalbra a un string
  posicionesPalabra = vectorPosicionesPalabra.toString().replace(/,/g, " ");

  //Imprimo ese string en el contendor correspondiente
  contenedorPalabraAvalidar.innerHTML = `<p class="text-center font-bold text-2xl italic">${posicionesPalabra}</p>`;

  //Contador que controla el numero de vidas u opciones(son 6) que tiene el jugador
  contador++;

  //Este script me permite controlar el contador cuando hay aciertos(disminuyendolo)
  //adicionalmente imprime una parte del cuerpo si hubo fallas.
  if (hayLetra == 1) {
    contador--;
    hayLetra = 0;
  } else {
    contadorFallas++;
    imagen.innerHTML = `<img src="./assets/ahorcado${contadorFallas}.png" alt="">`

  }
  // Este Script nos permite validar si la palabra ya esta completa
  if (vectorPosicionesPalabra.findIndex(fTerminar) == -1) {
    contador = 6;
    gano = 1;
  }

  //Este script permite saber si el juego terminó y si el jugador ganó o perdió.
  if (contador == 6) {
    if (gano == 1) {
      imagen.innerHTML = `<p class="text-center font-bold text-4xl text-yellow-500 ">¡¡¡ Ganó !!!</p>`
      contenedorPalabraAvalidar.innerHTML = ``;
      contedorHistorico.innerHTML = ``;
      cajaEntradaDatos.innerHTML = ``;
      cajaBotones.innerHTML = `<button id="btn_reiniciar" class=" text-center p-[1rem] bg-lime-700 rounded m-[2rem] w-[6rem]">Reiniciar</button>`
    } else {
      imagen.innerHTML = `<p class="text-center font-bold text-4xl text-rose-700 "> Perdió </p>`
      contenedorPalabraAvalidar.innerHTML = ``;
      contedorHistorico.innerHTML = ``;
      cajaEntradaDatos.innerHTML = ``;
      cajaBotones.innerHTML = `<button id="btn_reiniciar" class=" text-center p-[1rem] bg-lime-700 rounded m-[2rem] w-[6rem]">Reiniciar</button>`
      const btnReiniciar = document.getElementById("btn_reiniciar");
      btnReiniciar.addEventListener("click", fReset);
    }
  }

  function fEspacios(element) {
    return "__";
  }
}

function fValidaLetraRepetida(element) {
  return element == 'a';

}

//Función que compara cada elemento del vectorEspacios para validar si existen elementos vacios
//Si hay elementos vacios retorna la posición del elemento vacio, si no encuentra elementos
//retorna -1.
function fTerminar(element) {
  return element == "__";
}

function fReset() {
  //Eliminar palabra
  let indexReset = arrayPalabras.indexOf(palabra);
  arrayPalabras.splice(indexReset, 1);
  //console.log(arrayPalabras);  
  //reiniciar variables
  window.location.reload();

}