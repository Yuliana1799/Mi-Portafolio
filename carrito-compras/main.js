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
        nombre: "Tennis Blaco-Rosado Dama ",
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

document.addEventListener("DOMContentLoaded", () => {
    pintar();
});

// ... (tu código existente)

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

// Función para agregar un producto al carrito
function agregarAlCarrito(productoId) {
    const producto = productos.find((item) => item.id === productoId);

    if (producto) {
        carrito.push(producto);
        Swal.fire({
            icon: 'success',
            title: '¡Producto agregado!',
            text: `${producto.nombre} ha sido agregado al carrito.`,
        });
        mostrarProductosEnCarrito(); // Actualizar la vista del carrito
    }
}

// Función para mostrar productos en el carrito
// Actualiza la función mostrarProductosEnCarrito
function mostrarProductosEnCarrito() {
    const carritoContainer = document.getElementById("carrito-items");
    const totalContainer = document.getElementById("total");

    carritoContainer.innerHTML = "";

    if (carrito.length === 0) {
        const mensajeVacio = document.createElement("p");
        mensajeVacio.textContent = "No hay productos en el carrito.";
        carritoContainer.appendChild(mensajeVacio);

        totalContainer.textContent = "Total: $0";
    } else {
        let total = 0;

        carrito.forEach((item) => {
            let div = document.createElement("div");
            div.classList.add("carrito-item");
            let img = document.createElement("img");
            img.src = item.img;
            img.classList.add("imagen-carrito");
            let pNombre = document.createElement("p");
            pNombre.textContent = `Nombre: ${item.nombre}`;
            let pPrecio = document.createElement("p");
            pPrecio.textContent = `Precio: $${item.precio}`;
            let pCantidad = document.createElement("p");
            pCantidad.textContent = `Cantidad: 1`; // Puedes actualizar esto según tus necesidades
            let pSubtotal = document.createElement("p");
            pSubtotal.textContent = `Subtotal: $${item.precio * 1}`; // Puedes actualizar esto según tus necesidades
            let buttonEliminar = document.createElement("button");
            buttonEliminar.textContent = "Eliminar";
            buttonEliminar.addEventListener("click", () => eliminarDelCarrito(item.id));

            total += item.precio * 1;

            div.appendChild(img);
            div.appendChild(pNombre);
            div.appendChild(pPrecio);
            div.appendChild(pCantidad);
            div.appendChild(pSubtotal);
            div.appendChild(buttonEliminar);
            carritoContainer.appendChild(div);
        });

        totalContainer.textContent = `Total: $${total}`;
    }
}


// ... (tu código existente)



// Función para abrir el modal y mostrar productos en el carrito
function abrirModal() {
    const modal = document.getElementById("modal");
    modal.style.display = "block";
}


function cerrarModal() {
    const modal = document.getElementById("modal");
    modal.style.display = "none";
}
// Función para eliminar un producto del carrito
function eliminarDelCarrito(productoId) {
    const indice = carrito.findIndex((item) => item.id === productoId);

    if (indice !== -1) {
        carrito.splice(indice, 1);
        mostrarProductosEnCarrito();
    }
}
