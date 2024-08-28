///////////////////Funciones Importadas///////////////////////////
import {
    GetRequests
} from "../services/getRequests";
///////////////////Declaracion de variables////////////////////////
const tableBody = document.getElementById("tableBody");
const tabla= document.getElementById("tablaSolicitudes");
//////////////////Data from Local Storage/////////////////////////////
const userName = document.getElementById("userName");
let nombreUser = localStorage.getItem("usuarioActivo");
userName.innerHTML = nombreUser.toUpperCase();
//////////////////////////////////////////////////////////////////
mostrarHistorial();
async function mostrarHistorial() {
    let url = "http://localhost:3007/aprovedRequest"; //// Trae todas las solicitudes del EndPoint de Aprobadas
    let solicitudes = await GetRequests(url);
    let out = "";
    for (let solicitud of solicitudes) { //// Mediante un for of se crean las etiquetas de la tabla y se muestran los valores.
        out += `
           <tr>
	               <td>${solicitud.nombre}</td>
	               <td>${solicitud.sede}</td>
	               <td>${solicitud.fechaSalida}</td>
	               <td>${solicitud.fechaIngreso}</td>
	               <td>${solicitud.codigoPc}</td>
            </tr>
        `;
    }

tableBody.innerHTML=out;
}
