function mostrarRegistro() {
    document.getElementById('Formulario_Inicio').style.display = 'none';
    document.getElementById('Formulario_Registro').style.display = 'flex';
}

function mostrarLogin() {
    document.getElementById('Formulario_Registro').style.display = 'none';
    document.getElementById('Formulario_Inicio').style.display = 'flex';
    document.getElementById('registroExitoso').style.display = 'none';
}

function iniciarSesion() {
    const usuario = document.getElementById('usuario').value;
    const contraseña = document.getElementById('contraseña').value;

    if (usuario == 'admin' && contraseña == '123') {
        window.location.href = 'principal.html';
    } else {
        alert('Usuario o contraseña incorrectos');
    }
}

function registrarse() {
    const nuevoUsuario = document.getElementById('nuevoUsuario').value;
    const nuevaContraseña = document.getElementById('nuevaContraseña').value;
    const comprobarContraseña = document.getElementById('comprobarContraseña').value;
    const correo = document.getElementById('Correo').value;
    const telefono = document.getElementById('telefono').value;

    if (nuevoUsuario == '' || nuevaContraseña == '' || comprobarContraseña == '' || correo == '' || telefono == '') {
        alert('Por favor, completa todos los campos');
        return;
    }

    if (nuevaContraseña != comprobarContraseña) {
        alert('Las contraseñas no coinciden');
        return;
    } else {
        alert('Registro exitoso');
        window.location.href = 'principal.html';
    }

}






