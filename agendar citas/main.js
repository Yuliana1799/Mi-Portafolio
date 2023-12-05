const citas = [];

function mostrarAlerta(tipo, mensaje) {
    Swal.fire({
        icon: tipo,
        title: mensaje,
        showConfirmButton: false,
        timer: 1500,
    });
}

function validarCampos() {
    const nombreMascota = document.getElementById('nombreMascota').value;
    const propietario = document.getElementById('propietario').value;
    const telefono = document.getElementById('telefono').value;
    const tipoMascota = document.getElementById('tipoMascota').value;
    const fecha = document.getElementById('fecha').value;
    const hora = document.getElementById('hora').value;
    const sintomas = document.getElementById('sintomas').value;

    // Array para almacenar los campos vacíos
    const camposVacios = [];
    if (
        !nombreMascota ||
        !propietario ||
        !telefono ||
        !tipoMascota ||
        !fecha ||
        !hora ||
        !sintomas
    ) {
        // Muestra una alerta si algún campo está vacío
        mostrarAlerta('error', 'Completa todos los campos antes de agendar la cita.');
        return false;  // Detiene el proceso de agendar la cita
    }

    // Validación para evitar alerta de teléfono al abrir el formulario
    if (telefono.length < 8 || telefono.length > 16) {
        if (telefono.trim() !== "") {
            mostrarAlerta('error', 'El número de teléfono debe tener entre 8 y 16 dígitos.');
            return false;
        }
    }

    const horaElegida = new Date(`2022-01-01T${hora}`);
    const horaMinima = new Date(`2022-01-01T08:00`);
    const horaMaxima = new Date(`2022-01-01T20:00`);

    if (horaElegida < horaMinima || horaElegida > horaMaxima) {
        mostrarAlerta('error', 'La hora debe estar entre las 8:00 AM y las 8:00 PM.');
        return false;
    }

    // Otras validaciones...

    // Verifica si hay campos vacíos
    if (camposVacios.length > 0) {
        // Muestra una alerta con los campos vacíos
        mostrarAlerta('error', `Completa los siguientes campos:\n${camposVacios.join('\n')}`);
        return false;  // Detiene el proceso de agendar la cita
    } else {
        // Crear un objeto con los datos del formulario
        const nuevaCita = {
            nombreMascota: nombreMascota,
            propietario: propietario,
            telefono: telefono,
            tipoMascota: tipoMascota,
            fecha: fecha,
            hora: hora,
            sintomas: sintomas,
        };

        // Agregar el objeto a la lista de citas
        citas.push(nuevaCita);

        // Mostrar una alerta de éxito
        mostrarAlerta('success', '¡Cita agendada correctamente!');

        // Puedes resetear el formulario aquí si es necesario
        document.getElementById('formularioCita').reset();

        // Variables para la tarjeta
        const tipoMascotaTarjeta = tipoMascota;
        const nombreMascotaTarjeta = nombreMascota;
        const propietarioTarjeta = propietario;
        const telefonoTarjeta = telefono;
        const fechaTarjeta = fecha;
        const horaTarjeta = hora;
        const sintomasTarjeta = sintomas;

        // Crear y mostrar la tarjeta
        mostrarTarjeta(tipoMascotaTarjeta, nombreMascotaTarjeta, propietarioTarjeta, telefonoTarjeta, fechaTarjeta, horaTarjeta, sintomasTarjeta);

        return true;
    }
}
function mostrarTarjeta(tipoMascota, nombreMascota, propietario, telefono, fecha, hora, sintomas) {
    // Crear la estructura de la tarjeta
    const tarjeta = document.createElement('div');
    tarjeta.classList.add('tarjeta');

    // Llenar la tarjeta con la información de la cita
    tarjeta.innerHTML = `
        <img class="imagen-tarjeta" src="./${tipoMascota}.jpg" alt="${tipoMascota}">
        <p>Nombre de la mascota: ${nombreMascota}</p>
        <p>Propietario: ${propietario}</p>
        <p>Teléfono: ${telefono}</p>
        <p>Tipo de mascota: ${tipoMascota}</p>
        <p>Fecha: ${fecha}</p>
        <p>Hora: ${hora}</p>
        <p>Síntomas: ${sintomas}</p>
    `;

    // Agregar la nueva tarjeta al contenedor
    const contenedorTarjetas = document.querySelector('.tarjetas-contenedor');
    contenedorTarjetas.appendChild(tarjeta);
}


function Agendar() {
    const formulario = document.querySelector('.formulario');
    const inputFecha = document.getElementById('fecha');
    const fechaActual = new Date();
    fechaActual.setDate(fechaActual.getDate() + 1);
    const dia = ('0' + fechaActual.getDate()).slice(-2);
    const mes = ('0' + (fechaActual.getMonth() + 1)).slice(-2);
    const anio = fechaActual.getFullYear();
    const fechaMinima = `${anio}-${mes}-${dia}`;
    inputFecha.setAttribute('min', fechaMinima);

    // Muestra el formulario
    formulario.style.display = 'block';
    document.querySelector('.informacion').style.display = 'none';
    document.querySelector('.filtrar').style.display = 'none';

    const nuevaTarjeta = document.createElement('div');
    nuevaTarjeta.classList.add('tarjeta');
}

function cancelarAgenda() {
    const formulario = document.querySelector('.formulario');
    formulario.style.display = 'none';
    document.querySelector('.informacion').style.display = 'block';
    document.querySelector('.filtrar').style.display = 'block';

    mostrarAlerta('info', 'Agenda cancelada.');
}

// Agregar el evento submit al formulario
document.getElementById('formularioCita').addEventListener('submit', function (event) {
    // Previene el envío del formulario
    event.preventDefault();

    // Llama a la función validarCampos y agrega a la lista si es válido
    if (validarCampos()) {
        // Resto de la lógica para agendar la cita si es válido
        // ...
    }
});
console.log(citas);