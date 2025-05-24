document.addEventListener("DOMContentLoaded", function () {
    const usuarios = [
        { id: "U001", nombre: "Carlos", apellidos: "Gómez", email: "carlos@example.com", direccion: "Calle Falsa 123" },
        { id: "U002", nombre: "Lucía", apellidos: "Martínez", email: "lucia@example.com", direccion: "Av. del Sol 45" }
    ];

    const tabla = document.getElementById("tablaUsuarios");
    usuarios.forEach(u => {
        const fila = document.createElement("tr");
        fila.innerHTML = `
            <td>${u.id}</td>
            <td>${u.nombre}</td>
            <td>${u.apellidos}</td>
            <td>${u.email}</td>
            <td>${u.direccion}</td>
        `;
        tabla.appendChild(fila);
    });
});

function agregarUsuario() {
    window.location.href = '/html/panelAdministrativo.html'; 
}
