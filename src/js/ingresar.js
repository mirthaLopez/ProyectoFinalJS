import {
    GetUsers
} from "../services/getUsers"



const correo = document.getElementById("correo")
const contrasena = document.getElementById("contrasena")
const botonI = document.getElementById("botonI")
const textoBienvenida = document.getElementById("textoBienvenida")


botonI.addEventListener("click", function () {
    if (correo.value !== "" && contrasena.value !== "") {
        validarUsuario()
        async function validarUsuario() {
            let lista = await GetUsers()
            for (let index = 0; index < lista.length; index++) {

                if (lista[index].correo === correo.value && lista[index].contrasena === contrasena.value) {
                    let usuarioActivo = lista[index].nombre
                    localStorage.setItem("usuarioActivo", (usuarioActivo))
                    let correoActivo = lista[index].correo
                    localStorage.setItem("correoActivo", (correoActivo))
                    let rolActivo = lista[index].rol
                    localStorage.setItem("rolActivo", (rolActivo))
                    
                    /////////// Valida rol y redirige ///////////////////
                    if (lista[index].rol === "Administrador") {
                        console.log("aqui");
                        window.location.replace('http://localhost:1234/administracion.html')
                        //window.location.href = 'http://localhost:1234/src/pages/administracion';
                     }else{
                        window.location.replace('http://localhost:1234/solicitud.html')
                     }
                } else {
                   textoBienvenida.innerHTML="Usuario no encontrado, revisa los datos"
                }
            }
        }

    }else{
        textoBienvenida.innerHTML="Llena todos los espacios"
    }

})