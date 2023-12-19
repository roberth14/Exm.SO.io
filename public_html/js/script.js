/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/ClientSide/javascript.js to edit this template
 */

let PROCESS = [];

let inputDispatcher;
let cyclesDispatcher;

let inputInterrupts;
let cyclesInterrupts;

let inputElement;
let infoProcess;

function addProcess() {

    inputElement = document.getElementById("processInput");
    infoProcess = inputElement.value.trim();

    if (validarCampoVacio() == true) {
        validargramatica1();



    }
    const tabla = document.getElementById("tabla");
    tabla.innerHTML = "";

    inicializarTabla();
}

function validarCampoVacio() {
    if (infoProcess.trim() !== "") {
        return true;
    } else {
        alert("El campo no puede estar vacío.");
        return false;
    }

    return false;
}

function validarTerminacionProceso() {
    if (
        infoProcess[infoProcess.length - 1] == "f" ||
        infoProcess[infoProcess.length - 1] == "F"
    ) {
        console.log("TERMINA EN F");
        return true;
    } else {
        console.log("NO TERMINA EN F");
        return false;
    }
}

function validarTerminacionProceso1(cadena) {

    if (
        cadena == "f" ||
        cadena == "F"
    ) {
        console.log("TERMINA EN F");
        return true;
    } else {
        console.log("NO TERMINA EN F");
        return false;
    }
}
function validarCantidadFinishTask() {
    aux = 0;
    for (let index = 0; index < infoProcess.length; index++) {
        if (infoProcess[index] == "f" || infoProcess[index] == "F") {
            aux++;
        }
    }

    if (aux == 1) {
        console.log("CANTIDAD DE FINISH TASK CORRECTA ");
        return 1;
    } else if (aux == 0) {
        alert("EL PROCESO SE AGREGARÁ, PERO TERMINARÁ EN ESTADO BLOQUEADO");
        return 0;
    } else if (aux >= 2) {
        alert("NO PUEDE HABER MAS DE UN FINISH TASK");
        return 2;
    }
}

function validargramatica1() {
    contadorLetras = 0;
    contadorComas = 0;
    contadorNumeros = 0;

    for (let index = 0; index < infoProcess.length; index++) {
        if (index == 0) {
            if (infoProcess[0] > 0 && !isNaN(infoProcess[0])) {
                console.log("POSICION [0] CORRECTA");
            } else {
                alert(" Processo no inicia correctamente ");
                return false;
            }
        } else {
            if (infoProcess[index] >= 0) {

                contadorLetras = 0;
                contadorComas = 0;
            } else if (
                infoProcess[index] == "i" ||
                infoProcess[index] == "I" ||
                infoProcess[index] == "T" ||
                infoProcess[index] == "t" ||
                infoProcess[index] == "f" ||
                infoProcess[index] == "F"
            ) {
                contadorLetras++;
                if (contadorLetras == 2) {
                    alert("POSICION [" + index + "] INCORRECTA HAY DOS LETRAS SEGUIDAS");
                    return false;
                } else if (contadorComas == 0) {
                    alert(
                        "POSICION [" + index + "] INCORRECTA TE FALTA INGRESAR UNA ','"
                    );
                    return false;
                } else {
                    console.log("POSICION [" + index + "] CORRECTA");
                    contadorComas = 0;
                }
            } else if (infoProcess[index] == ",") {
                contadorComas++;
                if (contadorComas == 2) {
                    alert("POSICION [" + index + "] INCORRECTA HAY DOS COMAS SEGUIDAS");
                    return false;
                } else {
                    console.log("POSICION [" + index + "] CORRECTA");
                    contadorLetras = 0;
                }
            } else if (
                infoProcess[index] == "." ||
                infoProcess[index] != "i" ||
                infoProcess[index] != "I" ||
                infoProcess[index] != "T" ||
                infoProcess[index] != "t" ||
                infoProcess[index] != "f" ||
                infoProcess[index] != "F"
            ) {
                alert(
                    "POSICION [" + index + "] INCORRECTA INGRESO UN CARACTER NO PERMITIDO"
                );
                return false;
            } else {
                console.log("POSICION [" + index + "] CORRECTA");
                contadorComas = 0;
            }
        }
    }
    if (posicionesConsecutivas() == true) {
        if (posicionOcupada() == true) {
            if (
                validarCantidadFinishTask() == 1 &&
                validarTerminacionProceso() == true
            ) {
                PROCESS.push(infoProcess);
                inputElement.value = "";
                document.getElementById("size").textContent = PROCESS.length;
                alert("Agregado con éxito");
            } else if (validarCantidadFinishTask() == 0) {
                PROCESS.push(infoProcess);
                inputElement.value = "";
                document.getElementById("size").textContent = PROCESS.length;
                console.log("EL PROCESO NO CONTIENE FINISH TASK, TERMINARÁ BLOQUEADO");
            } else {
                alert("NO FUE AGREGADO");
            }
        }
    }
}

function showR() {
    const outBody = document.getElementById("outBody");
    outBody.innerHTML = "";

    for (let i = 0; i < PROCESS.length; i++) {
        const Out = procesarinfoProcess(PROCESS[i]);

        const row = document.createElement("tr");
        const cellinfoProcess = document.createElement("td");
        const cellOut = document.createElement("td");

        cellinfoProcess.textContent = "P-" + i;
        cellOut.textContent = PROCESS[i];

        row.appendChild(cellinfoProcess);
        row.appendChild(cellOut);

        outBody.appendChild(row);
    }
}

function estado() {
    const Body = document.getElementById("Body");
    Body.innerHTML = "";

    addCycles();
    Interrupts();

    for (let i = 0; i < PROCESS.length; i++) {

        const tiempoCalculado = calcularTiempo(i);
        const Out = procesarinfoProcess(tiempoCalculado);


        const ultimoCaracter = PROCESS[i].charAt(PROCESS[i].length - 1).toUpperCase();


        const estadoFinal = (ultimoCaracter === 'F') ? 'FINALIZADO' : 'BLOQUEADO';

        const row = document.createElement("tr");
        const cellinfoProcess = document.createElement("td");
        const cellTiempoCalculado = document.createElement("td");
        const cellFinalState = document.createElement("td");

      
        cellinfoProcess.textContent = "P-" + i;
        cellTiempoCalculado.textContent = tiempoCalculado;
        cellFinalState.textContent = estadoFinal;

        
        row.appendChild(cellinfoProcess);
        row.appendChild(cellTiempoCalculado);
        row.appendChild(cellFinalState);

       
        Body.appendChild(row);
    }
}


function calcularTiempo(id) {
    let calcularTiempo = 0;
    let cuenta = 1;

    const arr = PROCESS[id].split(",");
    disConvertido = parseInt(cyclesDispatcher, 10);
    intConvertido = parseInt(cyclesInterrupts, 10);
    for (let index = 0; index < arr.length; index++) {
        if (cuenta == intConvertido) {
            calcularTiempo = calcularTiempo + disConvertido + 1;
            cuenta = 1;
        } else {
            calcularTiempo = calcularTiempo + 1;
            cuenta = cuenta + 1;
        }
    }

    return calcularTiempo;
}

function procesarinfoProcess(infoProcess) {

    return infoProcess.length;
}




function dispatcher() {
    document.getElementById("outDistpatcher").textContent =
        "Must print the dispatcher run table";


}

function addCycles() {

    inputDispatcher = document.getElementById("addCycles");
    cyclesDispatcher = inputDispatcher.value.trim();
    alert("Guardado Exitosamente");
}

function Interrupts() {

    inputInterrupts = document.getElementById("Interrupts");
    cyclesInterrupts = inputInterrupts.value.trim();
    alert("Guardado Exitosamente");
}

function posicionesConsecutivas() {
    var arrayResultante = infoProcess.split(",");
    var posicion_actual;
    var posicion_aux;

    for (let index = 0; index < arrayResultante.length; index++) {
        if (arrayResultante[index] > 0) {
            if (index == 0) {
                posicion_actual = arrayResultante[index];
                console.log(
                    "EN LA POSICIÓN 0 SE GUARDÓ EL VALOR " + arrayResultante[index]
                );
            } else {
                posicion_aux = posicion_actual;
                posicion_actual = arrayResultante[index];

                console.log("*" + posicion_aux + " vs " + posicion_actual);

                if (posicion_aux == posicion_actual - 1) {
                } else {
                    alert(
                        "LAS POSICIONES DEL PROCESO NO SON CORRECTAS ESPECIFICAMENTE EN: " +
                        posicion_aux +
                        " " +
                        posicion_actual
                    );
                    return false;
                }
            }
        }
    }
    console.log("POSICIONES CORRECTAS");
    return true;
}
function posicionOcupada() {
    var arrayResultante = infoProcess.split(",");
    for (let index = 0; index < arrayResultante.length; index++) {
        if (arrayResultante[index] >= 0) {
            for (let aux = 0; aux < PROCESS.length; aux++) {
                let arrayDeSubcadenas = PROCESS[aux].split(",");
                for (let cont = 0; cont < arrayDeSubcadenas.length; cont++) {
                    console.log("[" + arrayResultante[index] + "] vs [" + arrayDeSubcadenas[cont] + "]");
                    if (arrayResultante[index] == arrayDeSubcadenas[cont]) {
                        alert(
                            "LA LOCALIDAD DE MEMORIA [" +
                            arrayDeSubcadenas[cont] +
                            "] YA ESTÁ SIENDO UTILIZADA"
                        );
                        return false;
                    }
                }
            }
        }
    }
    console.log("LAS LOCALIDAD ESTÁN DISPONIBLES");
    return true;
}


function crearTabla(cadenas) {

    const numeroCadenas = cadenas.length;

    const tabla = document.createElement("table");
    tabla.style.width = "7%"; 

    for (let i = 0; i < numeroCadenas; i++) {
        
        const fila = document.createElement("tr");

       
        const cadenaActual = cadenas[i].split(",");

        
        for (let j = 0; j < cadenaActual.length; j++) {
            
            const celda = document.createElement("td");
            const numero = cadenaActual[j].trim(); 

           
            celda.textContent = numero;
            celda.style.backgroundColor = definirColor(numero);

            
            fila.appendChild(celda);
        }

        
        tabla.appendChild(fila);
    }

    
    return tabla;
}

function crearTabla1(cadenas) {

    const tabla = document.createElement("table");
    tabla.style.width = "7%"; 


}


function definirColor(numero) {
    if (numero >= 0) {
        return "green";
    } else if (numero == "f" || numero == "F") {
        return "yellow";
    } else if (numero == "T" || numero == "t" || numero == "I" || numero == "i") {
        return "red";
    } else {
        return "gray";
    } 
}



function tablaTrace() {


    //aca......
}

function inicializarTabla() {
    
    const cadenas = PROCESS

   
    const tabla = crearTabla(cadenas);

    
    document.getElementById("tabla").appendChild(tabla);
}


document.addEventListener("DOMContentLoaded", () => {
    
    let cadenas = PROCESS

   
    const tabla = crearTabla(cadenas);

   
    document.getElementById("tabla").appendChild(tabla);
});