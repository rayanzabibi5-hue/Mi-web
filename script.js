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

    cargarPerfil();
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

function mostrarMenuPerfil() {
    document.get
