let usuarioActual = "";

function crearCuenta() {
    let usuario = document.getElementById("usuarioRegistro").value;

    if (usuario === "") {
        alert("Escribe un nombre de usuario");
        return;
    }

    usuarioActual = usuario;

    document.getElementById("nombreUsuario").innerHTML = usuarioActual;

    document.getElementById("registro").style.display = "none";
    document.getElementById("perfil").style.display = "block";

    alert("¡Cuenta creada con éxito!");
}function crearCuenta(){

    let usuario = document.getElementById("usuarioRegistro").value;

    if(usuario==""){
        alert("Escribe un nombre de usuario");
        return;
    }

    document.getElementById("nombreUsuario").innerHTML = usuario;

    document.getElementById("registro").style.display = "none";
    document.getElementById("perfil").style.display = "block";

    alert("¡Bienvenido a FitWin, " + usuario + "!");
}