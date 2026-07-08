function mostrarRegistro() {
    document.getElementById("registro").style.display = "block";
    document.getElementById("login").style.display = "none";
}

function mostrarLogin() {
    document.getElementById("login").style.display = "block";
    document.getElementById("registro").style.display = "none";
}

let flexiones = 0;
let dinero = 0;
let bajando = false;

function crearCuenta() {
    let usuario = document.getElementById("usuarioRegistro").value;

    if (usuario.trim() === "") {
        alert("Escribe un nombre de usuario");
        return;
    }

    document.getElementById("nombreUsuario").innerHTML = usuario;
localStorage.setItem("nombreUsuario", usuario);
    localStorage.setItem("sesionActiva", "true");
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
function mostrarMenuPerfil() {
    let menu = document.getElementById("menuPerfil");

    if (menu.style.display === "block") {
        menu.style.display = "none";
    } else {
        menu.style.display = "block";
    }
                            }

function cerrarSesion() {
    document.getElementById("perfil").style.display = "none";
    document.getElementById("menuPerfil").style.display = "none";
    document.getElementById("botonesInicio").style.display = "block";
}
function empezarFlexiones() {

    const video = document.getElementById("camara");

    navigator.mediaDevices.getUserMedia({ video: true })
    .then(function(stream) {

        video.srcObject = stream;

        const pose = new Pose({
            locateFile: (file) => {
                return `https://cdn.jsdelivr.net/npm/@mediapipe/pose/${file}`;
            }
        });

        pose.setOptions({
            modelComplexity: 1,
            smoothLandmarks: true,
            enableSegmentation: false,
            minDetectionConfidence: 0.5,
            minTrackingConfidence: 0.5
        });

        pose.onResults(function(results) {

            if (results.poseLandmarks) {

                let hombro = results.poseLandmarks[11];
                let codo = results.poseLandmarks[13];

                if (codo.y > hombro.y) {
                    bajando = true;
                }

                if (bajando && codo.y < hombro.y) {
                    flexiones++;
                    dinero += 0.01;

                    document.getElementById("contador").innerHTML = flexiones;
                    document.getElementById("dinero").innerHTML = dinero.toFixed(2) + " €";

                    bajando = false;
                }

            } else {
                document.getElementById("contador").innerHTML = "Buscando cuerpo...";
            }

        });

        const camera = new Camera(video, {
            onFrame: async () => {
                await pose.send({ image: video });
            },
            width: 640,
            height: 480
        });

        camera.start();

    })
    .catch(function(error) {
        alert("Error de cámara: " + error.message);
    });
                                         }
function guardarProgreso() {

    // Guardar récord de flexiones
    let record = localStorage.getItem("recordFlexiones");

    if (record === null || flexiones > Number(record)) {
        localStorage.setItem("recordFlexiones", flexiones);
        record = flexiones;
    }

    // Guardar flexiones actuales
    localStorage.setItem("flexiones", flexiones);

    // Guardar dinero
    localStorage.setItem("dinero", dinero);

    document.getElementById("record").innerHTML = record;

    alert("✅ Progreso guardado");
}


window.onload = function () {

    // Cargar récord
    let record = localStorage.getItem("recordFlexiones");

    if (record !== null) {
        document.getElementById("record").innerHTML = record;
    }

    // Cargar flexiones
    let flexionesGuardadas = localStorage.getItem("flexiones");

    if (flexionesGuardadas !== null) {
        flexiones = Number(flexionesGuardadas);
        document.getElementById("contador").innerHTML = flexiones;
    }
// Cargar dinero
let dineroGuardado = localStorage.getItem("dinero");

if (dineroGuardado !== null) {
    dinero = Number(dineroGuardado);
    document.getElementById("dinero").innerHTML = dinero;
}
    

// Cargar nombre
let nombreGuardado = localStorage.getItem("nombreUsuario");

if (nombreGuardado) {
    document.getElementById("nombreUsuario").innerHTML = nombreGuardado;
}
let sesion = localStorage.getItem("sesionActiva");

if (sesion === "true") {
    document.getElementById("botonesInicio").style.display = "none";
    document.getElementById("registro").style.display = "none";
    document.getElementById("login").style.display = "none";
    document.getElementById("perfil").style.display = "block";
}

}
