const carrito = [];
const productos = [
    {
        id: 1,
        nombre: "Tennis Azules",
        precio: 60000,
        img: "./imagenes/tenis.jpg"
    },
    {
        id: 2,
        nombre: "Tacones Rojos",
        precio: 130000,
        img: "./imagenes/tacones_rojos.jpg"
    },
    {
        id: 3,
        nombre: "Tennis Blaco-Rosado ",
        precio: 75000,
        img: "./imagenes/tenis_rosa.jpg"
    },
    {
        id: 4,
        nombre: "Tennis Colores",
        precio: 90000,
        img: "./imagenes/tenis_negro_verde.jpg"
    },
    {
        id: 5,
        nombre: "Tennis Rosa-Negro",
        precio: 110000,
        img: "./imagenes/tenis_dama.jpg"
    },
    {
        id: 6,
        nombre: "Tacones Bratz",
        precio: 140000,
        img: "./imagenes/tacones_rosa.jpg"
    },
    {
        id: 7,
        nombre: "Tacones Palorosa",
        precio: 100000,
        img: "./imagenes/tacones_palorosa.jpg"
    },
    {
        id: 8,
        nombre: "Tennis Gris",
        precio: 80000,
        img: "./imagenes/tenis_gris.jpg"
    },
    {
        id: 9,
        nombre: "Tennis Pink",
        precio: 70000,
        img: "./imagenes/Digital Pink.jpg"
    },
    {
        id: 10,
        nombre: "Tennis Casual",
        precio: 110000,
        img: "./imagenes/Tenis-Mujer-Casual.jpg"
    },
    {
        id: 11,
        nombre: "Tennis Nike",
        precio: 140000,
        img: "./imagenes/TENNIS-NIKE-MUJER.jpg"
    },
    {
        id: 12,
        nombre: "Tennis Mujer",
        precio: 60000,
        img: "./imagenes/Zapatillas-Mujer.jpg"
    },
];
const carritoContainer = document.getElementById("carrito-container");

document.addEventListener("DOMContentLoaded", () => {
    const carritoContainer = document.getElementById("carrito-container");
    pintar();
    mostrarProductosEnCarrito();
   
});

function pintar() {
    let fragment = document.createDocumentFragment();
    productos.forEach((item, index) => {
        let container = document.createElement("div");
        container.classList.add("cards-container");
        let div = document.createElement("div");
        let img = document.createElement("img");
        img.src = item.img;
        let h2 = document.createElement("h2");
        h2.textContent = item.nombre;
        let p = document.createElement("p");
        let button = document.createElement("button");
        button.textContent = "agregar al carrito";
        button.addEventListener("click", () => {
            agregarAlCarrito(item.id);
        });
        p.textContent = item.precio;
        div.appendChild(img);
        div.appendChild(h2);
        div.appendChild(p);
        div.appendChild(button);
        fragment.appendChild(div);
        container.appendChild(div);
        fragment.appendChild(container);

        div.className = "cards";
        h2.className = "nombre_articulo";
        p.className = "precio";
        button.className = "boton_agregar";
        img.className = "imagen_card";
    });
    document.getElementById("cards").innerHTML = "";
    document.getElementById("cards").appendChild(fragment);
}

function agregarAlCarrito(productoId) {
    const producto = productos.find((item) => item.id === productoId);

    if (producto) {
        const indice = carrito.findIndex((item) => item.id === productoId);
        if (indice !== -1) {
            // Si el producto ya está en el carrito, incrementar la cantidad
            carrito[indice].cantidad++;
        } else {
            // Si el producto no está en el carrito, agregarlo con cantidad 1
            producto.cantidad = 1;
            carrito.push(producto);
        }

        Swal.fire({
            icon: 'success',
            title: '¡Producto agregado!',
            text: `${producto.nombre} ha sido agregado al carrito.`,
        });

        mostrarProductosEnCarrito();
        crearBotonVaciarCarrito(carritoContainer);
    }
}



function mostrarProductosEnCarrito() {
    const carritoContainer = document.getElementById("carrito-container");
    const productosContainer = document.getElementById("productos-container");
    const totalContainer = document.getElementById("total");
    const divBotonVaciarCarrito = document.getElementById("divBotonVaciarCarrito");

    let total = 0;

    carritoContainer.innerHTML = "";

    if (carrito.length === 0) {
        carritoContainer.textContent = "No hay productos en el carrito.";
        totalContainer.textContent = "Total: $0";

    } else {

        carrito.forEach((item) => {
            let div = document.createElement("div");
            div.classList.add("carrito-item");

            let divImagen = document.createElement("div");
            let img = document.createElement("img");
            img.src = item.img;
            img.classList.add("imagen-carrito");
            divImagen.appendChild(img);

            let divNombre = document.createElement("div");
            let pNombre = document.createElement("p");
            pNombre.textContent = `${item.nombre}`;
            divNombre.appendChild(pNombre);

            let divPrecio = document.createElement("div");
            let pPrecio = document.createElement("p");
            pPrecio.textContent = `Precio: $${item.precio}`;
            divPrecio.appendChild(pPrecio);

            let divCantidad = document.createElement("div");
            let pCantidad = document.createElement("p");
            pCantidad.textContent = `Cantidad: ${item.cantidad}`; // Actualizado para mostrar la cantidad
            divCantidad.appendChild(pCantidad);

            let divSubtotal = document.createElement("div");
            let pSubtotal = document.createElement("p");
            pSubtotal.textContent = `Subtotal: $${item.precio * item.cantidad}`;
            divSubtotal.appendChild(pSubtotal);

            let divEliminar = document.createElement("div");
            let buttonEliminar = document.createElement("button");
            buttonEliminar.textContent = "Eliminar";
            buttonEliminar.addEventListener("click", () => eliminarDelCarrito(item.id));
            divEliminar.appendChild(buttonEliminar);

            div.appendChild(divImagen);
            div.appendChild(divNombre);
            div.appendChild(divPrecio);
            div.appendChild(divCantidad);
            div.appendChild(divSubtotal);
            div.appendChild(divEliminar);

            carritoContainer.appendChild(div);

            total = item.precio * item.cantidad;
        });
        totalContainer.textContent = `Total: $${total}`;
        totalContainer.classList.add("total-carrito");

        carritoContainer.appendChild(productosContainer); // Agregar productos al contenedor principal
        carritoContainer.appendChild(totalContainer);
    }
}



function crearBotonVaciarCarrito(carritoContainer) {
    // Verificar si ya hay un botón de vaciar carrito
    const divBotonVaciarCarrito = document.getElementById("boton-vaciar-carrito");
    if (divBotonVaciarCarrito) {
        // Si existe, eliminarlo para evitar duplicados
        divBotonVaciarCarrito.remove();
    }

    // Crear el nuevo botón
    const buttonVaciarCarrito = document.createElement("button");
    buttonVaciarCarrito.textContent = "Vaciar Carrito";
    buttonVaciarCarrito.addEventListener("click", vaciarCarrito);
    
    // Crear el contenedor para el botón
    const divNuevoBoton = document.createElement("div");
    divNuevoBoton.id = "boton-vaciar-carrito";
    divNuevoBoton.appendChild(buttonVaciarCarrito);

    // Agregar el contenedor al final del carrito
    carritoContainer.appendChild(divNuevoBoton);
}

function vaciarCarrito() {
    carrito.length = 0;
    mostrarProductosEnCarrito();
    // Llamar a la función para crear el botón después de vaciar el carrito
    crearBotonVaciarCarrito(carritoContainer);
}

// Luego de agregar productos al carrito, llamas a esta función para crear el botón


function abrirModal() {
    const modal = document.getElementById("modal");
    modal.style.display = "block";
    crearBotonVaciarCarrito(carritoContainer);
}


function cerrarModal() {
    const modal = document.getElementById("modal");
    modal.style.display = "none";
}

function eliminarDelCarrito(productoId) {
    const indice = carrito.findIndex((item) => item.id === productoId);

    if (indice !== -1) {
        carrito.splice(indice, 1);
        mostrarProductosEnCarrito();
    }
}

