///////////////////Funciones Importadas///////////////////////////
import {
    deleteRequests
} from "../services/deleteRequests";
import {
    GetRequests
} from "../services/getRequests";
////////////////////Declaracion de variables////////////////////
const inputSearch = document.getElementById("inputSearch");
const btnSearch = document.getElementById("btnSearch");
let nombreUser=localStorage.getItem("usuarioActivo");
userName.innerHTML=nombreUser.toUpperCase();
/////////////////////Evento Boton Busqueda///////////////////////
btnSearch.addEventListener("click", function () {
    containerResults.innerHTML = " "
    containerHistory.style.display = "none"
    containerResults.style.display = "inline"

    let tituloResultado = document.createElement("p");
    containerResults.appendChild(tituloResultado);
    tituloResultado.className = "tituloResultado"

    validSearch = inputSearch.value.trim();
    if (validSearch.length !== 0) {
        mostrarResultadosBusqueda();
        async function mostrarResultadosBusqueda() {

            let url = "http://localhost:3007/allRequest";
            let solicitudes = await GetRequests(url);

            const resultado = solicitudes.filter((e) => e.nombre.includes(inputSearch.value) || e.sede.includes(inputSearch.value) || e.fechaSalida.includes(inputSearch.value) || e.fechaIngreso.includes(inputSearch.value) || e.codigoPc.includes(inputSearch.value) || e.estado.includes(inputSearch.value));
            if (resultado.length !== 0) {
                tituloResultado.innerHTML = "Aqui tienes los resultados de tu busqueda";
                for (let index = 0; index < resultado.length; index++) {
                    let solicitud = document.createElement("div");
                    solicitud.className = "solicitud2"
                    containerResults.appendChild(solicitud);

                    let nombre = document.createElement("p");
                    solicitud.appendChild(nombre);
                    nombre.innerHTML = resultado[index].nombre;

                    let sede = document.createElement("p");
                    solicitud.appendChild(sede);
                    sede.innerHTML = resultado[index].sede;

                    let fechaSalida = document.createElement("p");
                    solicitud.appendChild(fechaSalida);
                    fechaSalida.innerHTML = resultado[index].fechaSalida;

                    let fechaIngreso = document.createElement("p");
                    solicitud.appendChild(fechaIngreso);
                    fechaIngreso.innerHTML = resultado[index].fechaIngreso;

                    let codigoPc = document.createElement("p");
                    solicitud.appendChild(codigoPc);
                    codigoPc.innerHTML = resultado[index].codigoPc;

                    if (solicitudes[index].estado === "Aceptada") {
                        let estado = document.createElement("div");
                        solicitud.appendChild(estado);
                        estado.innerHTML = `<img class="icono" src="/aceptada.cabe0510.png">`;
                        estado.className = "iconoEstado"

                    } else if (solicitudes[index].estado === "Rechazada") {
                        let estado = document.createElement("div");
                        solicitud.appendChild(estado);
                        estado.innerHTML = `<img class="icono" src="/rechazada.8561f893.png">`;
                        estado.className = "iconoEstado"
                    }
                }
            } else {
                tituloResultado.innerHTML = "No se han encontrado resultados de busqueda";
            }
        }

    } else {
        tituloResultado.innerHTML = "Introduce un termino de busqueda";
    }
})
///////////////////////////////Muestra el historial//////////////////////////////////
mostrarHistorial();
async function mostrarHistorial() {
    let url = "http://localhost:3007/allRequest";
    let solicitudes = await GetRequests(url);

    for (let index = 0; index < solicitudes.length; index++) {
        
        ////////7///////////contenedor solicitud////////////////////////
        let contenedorPrincipal = document.createElement("div");
        contenedorPrincipal.className = "contenedorPrincipal"
        containerHistory.appendChild(contenedorPrincipal);
        //////////////////////////////////////////////////////////////////
        let solicitud = document.createElement("div");
        solicitud.className = "solicitud"
        contenedorPrincipal.appendChild(solicitud);

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
        console.log(solicitudes[index].estado);

        if (solicitudes[index].estado === "Aceptada") {
            let estado = document.createElement("div");
            solicitud.appendChild(estado);
            estado.innerHTML = `<img class="icono" src="/aceptada.cabe0510.png">`;
            estado.className = "iconoEstado"

        } else if (solicitudes[index].estado === "Rechazada") {
            let estado = document.createElement("div");
            solicitud.appendChild(estado);
            estado.innerHTML = `<img class="icono" src="/rechazada.8561f893.png">`;
            estado.className = "iconoEstado"
        }

        ////////7///////////contenedor Boton Eliminar////////////////////////
        let contenedorBoton = document.createElement("div");
        contenedorBoton.className = "contenedorBoton"
        contenedorPrincipal.appendChild(contenedorBoton);
        //Crea un boton Eliminar
        let btnEliminar = document.createElement("button")
        btnEliminar.innerHTML = "Eliminar registro";
        btnEliminar.className = "btnEliminar"
        contenedorBoton.appendChild(btnEliminar);
        //Creo un evento para el boton Eliminar
        btnEliminar.addEventListener("click", function () {
            let id = solicitudes[index].id
            let url = "http://localhost:3007/allRequest";
            deleteRequests(url, id);
            solicitud.remove()
            //////////Otorga permiso para la funcion cargar
            localStorage.setItem("permiso", 1)
        })
    }
}