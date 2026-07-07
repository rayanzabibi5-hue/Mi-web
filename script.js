function mostrarRegistro() {
    document.getElementById("registro").style.display = "block";
    document.getElementById("login").style.display = "none";
}

function mostrarLogin() {
    document.getElementById("login").style.display = "block";
    document.getElementById("registro").style.display = "none";
}let flexiones = 0;
let dinero = 0;

function crearCuenta() {
    let usuario = document.getElementById("usuarioRegistro").value;

    if (usuario.trim() === "") {
        alert("Escribe un nombre de usuario");
        return;
    }

    document.getElementById("nombreUsuario").innerHTML = usuario;

    document.getElementById("botonesInicio").style.display = "none";
    document.getElementById("registro").style.display = "none";
    document.getElementById("login").style.display = "none";
    document.getElementById("perfil").style.display = "block";

    alert("🎉 ¡Cuenta creada con éxito!");
}

function iniciarSesion() {
    document.getElementById("botonesInicio").style.display = "none";
    document.getElementById("registro").style.display = "none";
    document.getElementById("login").style.display = "none";
    document.getElementById("perfil").style.display = "block";
}

function sumarFlexion() {
    flexiones++;
    dinero += 0.01;

    document.getElementById("contador").innerHTML = flexiones;
    document.getElementById("dinero").innerHTML = dinero.toFixed(2) + " €";
}
function reiniciarFlexiones() {
    flexiones = 0;
    dinero = 0;

    document.getElementById("contador").innerHTML = flexiones;
    document.getElementById("dinero").innerHTML = "0,00 €";
}

function empezarFlexiones() {
    if (!navigator.mediaDevices) {
        alert("Tu navegador no permite usar la cámara aquí");
        return;
    }

    navigator.mediaDevices.getUserMedia({ video: true })
    .then(function(stream) {
        document.getElementById("camara").srcObject = stream;
        alert("Cámara activada");
    })
    .catch(function(error) {
        alert("Error de cámara: " + error.name + " - " + error.message);
    });
}