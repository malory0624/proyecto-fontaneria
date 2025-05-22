// Usuarios predefinidos
let usuarios = JSON.parse(localStorage.getItem('usuarios')) || [
  { username: 'admin', password: '123', rol: 'admin' },
  { username: 'fontanero1', password: '123', rol: 'fontanero' },
  { username: 'cliente1', password: '123', rol: 'cliente' }
];

// Guardar usuarios iniciales si no existen
if(!localStorage.getItem('usuarios')){
  localStorage.setItem('usuarios', JSON.stringify(usuarios));
}

/* --- Funciones para mostrar formularios --- */

function mostrarRegistro() {
  document.getElementById('Formulario_Inicio').style.display = 'none';
  document.getElementById('Formulario_Registro').style.display = 'flex';
}

function mostrarLogin() {
  document.getElementById('Formulario_Registro').style.display = 'none';
  document.getElementById('Formulario_Inicio').style.display = 'flex';
  // Si tienes mensaje de registro exitoso, lo ocultas aquí
  const msg = document.getElementById('registroExitoso');
  if(msg) msg.style.display = 'none';
}

/* --- Funciones de autenticación --- */

function iniciarSesion() {
  const usuario = document.getElementById('usuario').value.trim();
  const contraseña = document.getElementById('contraseña').value.trim();

  usuarios = JSON.parse(localStorage.getItem('usuarios')) || usuarios;

  const user = usuarios.find(u => u.username === usuario && u.password === contraseña);

  if(user){
    // Guardar sesión
    localStorage.setItem('userLogged', user.username);
    localStorage.setItem('userRole', user.rol);

    // Redirigir según rol
    if(user.rol === 'admin'){
      window.location.href = './html/panelAdministrativo.html';
    } else if(user.rol === 'fontanero'){
      window.location.href = './html/panelFontanero.html';
    } else {
      window.location.href = './html/principal.html';
    }
  } else {
    alert('Usuario o contraseña incorrectos');
  }
}

function registrarse() {
  const nuevoUsuario = document.getElementById('nuevoUsuario').value.trim();
  const nuevaContraseña = document.getElementById('nuevaContraseña').value.trim();
  const comprobarContraseña = document.getElementById('comprobarContraseña').value.trim();
  const correo = document.getElementById('Correo').value.trim();
  const telefono = document.getElementById('telefono').value.trim();

  // Validar campos vacíos
  if (!nuevoUsuario || !nuevaContraseña || !comprobarContraseña || !correo || !telefono) {
    alert('Por favor, completa todos los campos');
    return;
  }

  // Validar contraseñas iguales
  if (nuevaContraseña !== comprobarContraseña) {
    alert('Las contraseñas no coinciden');
    return;
  }

  usuarios = JSON.parse(localStorage.getItem('usuarios')) || usuarios;

  // Validar usuario único
  if(usuarios.some(u => u.username === nuevoUsuario)){
    alert('El nombre de usuario ya está en uso');
    return;
  }

  // Agregar nuevo usuario con rol cliente
  usuarios.push({
    username: nuevoUsuario,
    password: nuevaContraseña,
    rol: 'cliente',
    correo,
    telefono
  });

  localStorage.setItem('usuarios', JSON.stringify(usuarios));

  alert('Registro exitoso, ya puedes iniciar sesión');
  mostrarLogin();
}

function cerrarSesion() {
  // Limpiar sesión
  localStorage.removeItem('userLogged');
  localStorage.removeItem('userRole');
  window.location.href = '../index.html';
}

/* --- Funciones para fontanero: tareas y citas --- */

function mostrarTareas() {
  const lista = document.getElementById("tareasAsignadas");
  if (!lista) return; // Si no existe el elemento, no hacer nada

  const fontanero = localStorage.getItem("userLogged");
  const tareas = JSON.parse(localStorage.getItem("citas")) || [];

  // Limpiar lista antes de mostrar
  lista.innerHTML = "";

  // Filtrar tareas del fontanero actual
  const tareasFontanero = tareas.filter(t => t.fontanero === fontanero);

  if (tareasFontanero.length === 0) {
    lista.innerHTML = "<li>No tienes tareas asignadas.</li>";
    return;
  }

  // Mostrar cada tarea con botón para completar
  tareasFontanero.forEach((cita, index) => {
    const item = document.createElement("li");
    item.textContent = `${index + 1}. Cliente: ${cita.cliente}, Dirección: ${cita.direccion}, Fecha: ${cita.fecha} ${cita.hora}`;

    const btnCompletar = document.createElement("button");
    btnCompletar.textContent = "Marcar como completada";
    btnCompletar.style.marginLeft = "10px";
    btnCompletar.onclick = () => completarTarea(index);

    item.appendChild(btnCompletar);
    lista.appendChild(item);
  });
}

function completarTarea(indice) {
  const fontanero = localStorage.getItem("userLogged");
  let tareas = JSON.parse(localStorage.getItem("citas")) || [];

  // Obtener solo las tareas del fontanero
  let tareasFontanero = tareas.filter(t => t.fontanero === fontanero);

  // La tarea a eliminar
  let tareaAEliminar = tareasFontanero[indice];

  // Buscar el índice real de esa tarea en el array global
  let indiceReal = tareas.findIndex(t =>
    t.cliente === tareaAEliminar.cliente &&
    t.direccion === tareaAEliminar.direccion &&
    t.fecha === tareaAEliminar.fecha &&
    t.hora === tareaAEliminar.hora &&
    t.fontanero === tareaAEliminar.fontanero
  );

  if (indiceReal > -1) {
    tareas.splice(indiceReal, 1);
    localStorage.setItem("citas", JSON.stringify(tareas));
    mostrarTareas();
  }
}

/* --- Control de carga según página --- */

window.onload = () => {
  const path = window.location.pathname;

  // Mostrar tareas solo si estamos en panel fontanero
  if (path.includes("fontanero/panel.html")) {
    mostrarTareas();
  }
};
