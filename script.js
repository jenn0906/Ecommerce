let carrito = [];

// Función para agregar productos al carrito
function agregarAlCarrito(nombre, precio) {
  const productoExistente = carrito.find(
    (producto) => producto.nombre === nombre
  );

  if (productoExistente) {
    productoExistente.cantidad++;
  } else {
    carrito.push({ nombre, precio, cantidad: 1 });
  }

  actualizarCarrito();
}

// Función para actualizar el contenido del carrito
function actualizarCarrito() {
  const carritoItems = document.getElementById("carrito-items");
  carritoItems.innerHTML = "";

  let total = 0;

  if (carrito.length === 0) {
    carritoItems.innerHTML = "<p>Aún no has agregado productos al carrito.</p>";
  } else {
    carrito.forEach((producto, index) => {
      total += producto.precio * producto.cantidad;
      carritoItems.innerHTML += `
        <div class="cart-item d-flex justify-content-between align-items-center">
          <span>${producto.nombre}</span>
          <span>$${producto.precio}</span>
          <span>
            <button class="btn btn-secondary btn-sm" onclick="modificarCantidad(${index}, -1)">-</button>
            ${producto.cantidad}
            <button class="btn btn-secondary btn-sm" onclick="modificarCantidad(${index}, 1)">+</button>
          </span>
          <button class="btn btn-danger btn-sm" onclick="eliminarProducto(${index})">Eliminar</button>
        </div>
      `;
    });
  }

  document.getElementById("total").textContent = total.toFixed(2);
}

// Función para modificar la cantidad de un producto
function modificarCantidad(index, cantidad) {
  const producto = carrito[index];

  if (cantidad < 0 && producto.cantidad > 1) {
    producto.cantidad += cantidad;
  } else if (cantidad > 0) {
    producto.cantidad += cantidad;
  }

  actualizarCarrito();
}

// Función para eliminar un producto del carrito
function eliminarProducto(index) {
  carrito.splice(index, 1);
  actualizarCarrito();
}

// Función para filtrar los productos
function filtrarProductos(criterio) {
  // Obtener todos los productos (las tarjetas)
  const productos = document.querySelectorAll('.card');

  // Limpiar los resultados previos (mostrar todos los productos)
  productos.forEach(producto => {
    producto.style.display = 'block';  // Asegura que todos los productos estén visibles inicialmente
  });

  if (criterio === 'nombre') {
    // Filtrar productos por nombre
    const nombreBuscado = prompt("Ingrese el nombre del producto a buscar:");
    if (nombreBuscado) {
      productos.forEach(producto => {
        const nombre = producto.getAttribute('data-name').toLowerCase();
        if (!nombre.includes(nombreBuscado.toLowerCase())) {
          producto.style.display = 'none';  // Ocultar los productos que no coinciden
        }
      });
    }
  }

  if (criterio === 'precio') {
    // Filtrar productos por precio
    const precioMinimo = parseFloat(prompt("Ingrese el precio mínimo:"));
    const precioMaximo = parseFloat(prompt("Ingrese el precio máximo:"));
    
    if (precioMinimo && precioMaximo) {
      productos.forEach(producto => {
        const precio = parseFloat(producto.getAttribute('data-price').replace(/[^\d.-]/g, '')); // Elimina cualquier símbolo no numérico
        if (precio < precioMinimo || precio > precioMaximo) {
          producto.style.display = 'none';  // Ocultar los productos que no están en el rango de precios
        }
      });
    }
  }
}

// Llamada a la función de filtrado cuando el usuario haga clic en los botones de filtrado
document.getElementById('filtrarNombre').addEventListener('click', function() {
  filtrarProductos('nombre');
});

document.getElementById('filtrarPrecio').addEventListener('click', function() {
  filtrarProductos('precio');
});
