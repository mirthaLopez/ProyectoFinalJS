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
    let url = "http://localhost:3007/aprovedRequest";
    let solicitudes = await GetRequests(url);
    let out = "";
    for (let solicitud of solicitudes) {
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

/*solicitudes.map(solicitud => {
        const row = document.createElement("tr");
        Object.values(solicitud).map(value => {
            const cell = document.createElement("td");
            cell.textContent = value;
            row.appendChild(cell);
        });
    
        tableBody.appendChild(row);
    });*/