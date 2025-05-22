
let carrito = JSON.parse(localStorage.getItem("carrito")) || [];

function actualizarContadorCarrito() {
  const contador = document.getElementById("contador-carrito");
  contador.textContent = carrito.length;
}



function agregarAlCarrito(nombre, precio) {
  carrito.push({ nombre, precio });
  localStorage.setItem("carrito", JSON.stringify(carrito));
  alert(`${nombre} agregado al carrito.`);
}

function mostrarCarrito() {
  const lista = document.getElementById("lista-carrito");
  const total = document.getElementById("total");
  lista.innerHTML = "";
  let suma = 0;

  carrito.forEach((item, index) => {
    const li = document.createElement("li");
    li.textContent = `${item.nombre} - $${item.precio}`;
    lista.appendChild(li);
    suma += item.precio;
  });

  total.textContent = `Total: $${suma}`;
}

function finalizarCompra() {
  alert("Gracias por tu compra. Nos comunicaremos contigo pronto.");
  localStorage.removeItem("carrito");
  window.location.href = 'principal.html';
}

