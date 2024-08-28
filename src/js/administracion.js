////////////////////////Funciones Importadas///////////////////////
import {
    GetRequests
} from "../services/getRequests";
//import {updateRequests} from "../services/updateRequests";

import {
    PostRequest
} from '../services/postRequest';

/*import { updateRequests } from "../services/updateRequests";*/
import {
    deleteRequests
} from '../services/deleteRequests';
/////////////////////Declaracion de variables/////////////////////
const containerPendingRequests = document.getElementById("containerPendingRequests");

//////////////////Data from Local Storage/////////////////////////////
const userName = document.getElementById("userName");
let nombreUser = localStorage.getItem("usuarioActivo");
userName.innerHTML = nombreUser.toUpperCase();
///////////////////////Muestra Historial del Solicitudes////////////////////
showRequests();
async function showRequests() {
    let url = "http://localhost:3007/pendingRequest";
    let solicitudes = await GetRequests(url);
    for (let index = 0; index < solicitudes.length; index++) {
        let solicitud = document.createElement("div");
        solicitud.className = "solicitud"
        containerPendingRequests.appendChild(solicitud);

        let nombre = document.createElement("p");
        solicitud.appendChild(nombre);
        nombre.innerHTML = solicitudes[index].nombre;

        let sede = document.createElement("p");
        solicitud.appendChild(sede);
        sede.innerHTML = solicitudes[index].sede;

        let fechaSalida = document.createElement("p");
        solicitud.appendChild(fechaSalida);
        fechaSalida.innerHTML = solicitudes[index].fechaSalida;

        let fechaIngreso = document.createElement("p");
        solicitud.appendChild(fechaIngreso);
        fechaIngreso.innerHTML = solicitudes[index].fechaIngreso;

        let codigoPc = document.createElement("p");
        solicitud.appendChild(codigoPc);
        codigoPc.innerHTML = solicitudes[index].codigoPc;

        //////////Creo un contenedor para los botones///////
        let contenedorBtn = document.createElement("div") 
        contenedorBtn.className = "containerBtn"
        containerPendingRequests.appendChild(contenedorBtn); 
        ///// Crea un boton Aceptar Solicitud//////////
        let btnAceptar = document.createElement("div") 
        btnAceptar.innerHTML = `<div class="divCheck"><img class="btn" src="/check_5610944.cfc1f449.png"></div><p class="descripcionBtn">Aceptar</p>`;
        btnAceptar.className = "btnContenedor2"
        contenedorBtn.appendChild(btnAceptar);
        ///// Crea un boton Rechazar Solicitud/////////
        let btnRechazar = document.createElement("div") 
        btnRechazar.innerHTML = `<div class="divCheck"><img class="btn" src="/2031018.3a579747.png"></div><p class="descripcionBtn">Rechazar</p>`;
        btnRechazar.className = "btnContenedor"
        contenedorBtn.appendChild(btnRechazar); 
        /////Creo un evento para el boton Aceptar/////////
        btnAceptar.addEventListener("click", function () {
            let request = {
                nombre: solicitudes[index].nombre,
                correo: solicitudes[index].correo,
                sede: solicitudes[index].sede,
                fechaSalida: solicitudes[index].fechaSalida,
                fechaIngreso: solicitudes[index].fechaIngreso,
                codigoPc: solicitudes[index].codigoPc,
                estado: "Aceptada"
            }

            let url = "http://localhost:3007/allRequest";
            let link = "http://localhost:3007/aprovedRequest";
            let url2 = "http://localhost:3007/pendingRequest"
            PostRequest(request, url) /// Envia la solicitud con el nuevo estado al endpoint de historial
            PostRequest(request, link)/// Envia la solicitud con el nuevo estado al endpoint de aprobadas
            deleteRequests(url2, solicitudes[index].id);//// Elimina la solicitud del endpoint de solicitudes pendientes
            ///Remeuve las etiquetas en pantalla///////
            solicitud.remove();
            linea.remove();
            contenedorBtn.remove();
            //////////Otorga permiso para la funcion cargar
            localStorage.setItem("permiso", 1) 
        })
        /////Creo un evento para el boton Rechazar/////////
        btnRechazar.addEventListener("click", function () {
            let request = {
                nombre: solicitudes[index].nombre,
                correo: solicitudes[index].correo,
                sede: solicitudes[index].sede,
                fechaSalida: solicitudes[index].fechaSalida,
                fechaIngreso: solicitudes[index].fechaIngreso,
                codigoPc: solicitudes[index].codigoPc,
                estado: "Rechazada"
            }
            let url = "http://localhost:3007/allRequest";
            PostRequest(request, url); /// Envia la solicitud con el nuevo estado al endpoint de historial
            let link = "http://localhost:3007/pendingRequest"//// Elimina la solicitud del endpoint de solicitudes pendientes
            deleteRequests(link, solicitudes[index].id);
            ///Remeuve las etiquetas en pantalla///////
            solicitud.remove();
            linea.remove();
            contenedorBtn.remove();
            //////////Otorga permiso para la funcion cargar///
            localStorage.setItem("permiso", 1)
        })

        ///// Crea una etiqueta hr/////////////
        let linea = document.createElement("hr");
        containerPendingRequests.appendChild(linea);
        linea.className = "saltoLinea"
    }
}