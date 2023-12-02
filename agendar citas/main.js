const citas = [];

function mostrarAlerta(tipo, mensaje) {
    Swal.fire({
        icon: tipo,
        title: mensaje,
        showConfirmButton: false,
        timer: 1500,
    });
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

    const nombreMascota = document.getElementById('nombreMascota').value;
    const propietario = document.getElementById('propietario').value;
    const telefono = document.getElementById('telefono').value;
    const tipoMascota = document.getElementById('tipoMascota').value;
    const fecha = document.getElementById('fecha').value;
    const hora = document.getElementById('hora').value;
    const sintomas = document.getElementById('sintomas').value;

    const fechaSeleccionada = new Date(fecha);

    if (fechaSeleccionada <= fechaActual) {
        mostrarAlerta('error', 'Selecciona una fecha a partir de mañana.');
    } else {
        const nuevaCita = {
            nombreMascota: nombreMascota,
            propietario: propietario,
            telefono: telefono,
            tipoMascota: tipoMascota,
            fecha: fecha,
            hora: hora,
            sintomas: sintomas,
        };

        citas.push(nuevaCita);

        mostrarAlerta('success', '¡Cita agendada correctamente!');

        formulario.style.display = 'block';
        document.querySelector('.informacion').style.display = 'none';
        document.querySelector('.filtrar').style.display = 'none';
    }
}

function cancelarAgenda() {
    const formulario = document.querySelector('.formulario');
    formulario.style.display = 'none';
    document.querySelector('.informacion').style.display = 'block';
    document.querySelector('.filtrar').style.display = 'block';

    mostrarAlerta('info', 'Agenda cancelada.');
}
