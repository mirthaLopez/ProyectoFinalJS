/////////////////////Funciones importadas////////////////////////////////
import {
    PostRequest
} from "../services/postRequest";
import {
    GetRequests
} from "../services/getRequests";
/////////////////////Declaracion de variables////////////////////////////
const checkbox = document.getElementById("check");
const textCheck = document.getElementById("textCheck");
const btnEnviar = document.getElementById("btnEnviar")
const selector = document.getElementById("selector");
const fechaSalida = document.getElementById("fechaSalida");
const fechaIngreso = document.getElementById("fechaIngreso");
const codigoPc = document.getElementById("codigoPc");
const nombre = document.getElementById("nombre");
const correo = document.getElementById("correo");
const textAdvertencia = document.getElementById("textAdvertencia");
const tableBody = document.querySelector("#tablaSolicitudes tbody");
const userName = document.getElementById("userName");
/////////////////Valores almacenados en local Storage/////////////////
const inputNombre = document.getElementById("nombre");
const inputCorreo = document.getElementById("correo")
inputNombre.value = localStorage.getItem("usuarioActivo")
inputCorreo.value = localStorage.getItem("correoActivo")
let correoUser = inputCorreo.value;
let nombreUser = localStorage.getItem("usuarioActivo");
userName.innerHTML = nombreUser.toUpperCase();

//////////////////////////Modal////////////////////////////////////////
var modal = document.getElementById("myModal");
// Span cierra el modal
var span = document.getElementsByClassName("close")[0];
//////////////////////Funcion Carga la pagina ///////////////////////////
const permiso = localStorage.getItem("permiso")
if (permiso === "1") {
    cargar();
}

function cargar() {
    location.reload()
    localStorage.removeItem("permiso")
}
/////////////////////Evento enviar solicitud////////////////////////////
btnEnviar.addEventListener("click", function () {
    if (validarForm() === true) {
        const solicitud = {
            nombre: nombre.value,
            correo: correo.value,
            sede: selector.value,
            fechaSalida: fechaSalida.value,
            fechaIngreso: fechaIngreso.value,
            codigoPc: codigoPc.value,
            estado: "Pendiente"
        }
        let url = 'http://localhost:3007/pendingRequest';
        PostRequest(solicitud, url);
        setTimeout(() => {
            location.reload();
          }, "3000");
        
    } else {
        textAdvertencia.innerHTML = "Completa todas las casillas del formulario"
    }
})


////////////////////// Validar que el formulario este lleno///////////////////////
function validarForm() {
    let checkStatus = validarCheckbox();
    let validadorNombre = nombre.value.trim();
    let validadorCodigo = codigoPc.value.trim();
    let validadorSalida = fechaSalida.value.trim();
    let validadorIngreso = fechaIngreso.value.trim();
    if (checkStatus === true && selector.value !== "" && validadorCodigo.length !== 0 && validadorNombre.length !== 0 &&
        validadorSalida.length !== 0 && validadorIngreso.length !== 0) {
        textAdvertencia.innerHTML = "Tu solicitud ha sido enviada con exito"
        modal.style.display = "block";

        // Cierre modal (x)
        span.onclick = function () {
            modal.style.display = "none";
        }

        // Cierra el modal cuando se da click en cualquier luegar fuera del modal
        window.onclick = function (event) {
            if (event.target == modal) {
                modal.style.display = "none";
            }
        }
        return true
    } else {
        textAdvertencia.innerHTML = "Asegurate de llenar todos los datos"
        return false
    }
}
////////////////////// Validar CheckBox Condiciones/////////////////
textCheck.innerHTML = 'Da click, para aceptar las condiciones';
checkbox.addEventListener("change", validarCheckbox, false);

function validarCheckbox() {
    let validCheck = false;
    if (checkbox.checked) {
        validCheck = true;
        textCheck.innerHTML = 'Haz aceptado las condiciones';
    } else {
        validCheck = false;
        textCheck.innerHTML = 'Da click, para aceptar las condiciones';
    }
    return validCheck
}

////////////////// Mostrar historial solicitudes del usuario//////////////////
let pendingUrl = "http://localhost:3007/pendingRequest";
showRequests(pendingUrl);
let historyUrl = "http://localhost:3007/allRequest";
showRequests(historyUrl);
console.log("aqui");
async function showRequests(url) {
    let listaSolicitudes = await GetRequests(url);

    let listaFiltrada = listaSolicitudes.filter(solicitud => solicitud.correo === correoUser)
    let solicitudesInvertidas = listaFiltrada.reverse();
    solicitudesInvertidas.map((solicitud) => {
        const fila = tableBody.insertRow();
        const estado = fila.insertCell(0);
        const nombre = fila.insertCell(1);
        const fechaSalida = fila.insertCell(2);
        const fechaIngreso = fila.insertCell(3);
        const codigoPc = fila.insertCell(4);

        estado.textContent = solicitud.estado;
        nombre.textContent = solicitud.nombre;
        fechaSalida.textContent = solicitud.fechaSalida;
        fechaIngreso.textContent = solicitud.fechaIngreso;
        codigoPc.textContent = solicitud.codigoPc;
    })
}