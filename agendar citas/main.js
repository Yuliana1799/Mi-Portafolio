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
    
        mostrarAlerta('error', 'Completa todos los campos antes de agendar la cita.');
        return false;  
    }

    
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


    
    if (camposVacios.length > 0) {
        
        mostrarAlerta('error', `Completa los siguientes campos:\n${camposVacios.join('\n')}`);
        return false;  
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

        
        document.getElementById('formularioCita').reset();

        
        const tipoMascotaTarjeta = tipoMascota;
        const nombreMascotaTarjeta = nombreMascota;
        const propietarioTarjeta = propietario;
        const telefonoTarjeta = telefono;
        const fechaTarjeta = fecha;
        const horaTarjeta = hora;
        const sintomasTarjeta = sintomas;

        
        mostrarTarjeta(tipoMascotaTarjeta, nombreMascotaTarjeta, propietarioTarjeta, telefonoTarjeta, fechaTarjeta, horaTarjeta, sintomasTarjeta);

        return true;
    }
}
function mostrarTarjeta(tipoMascota, nombreMascota, propietario, telefono, fecha, hora, sintomas) {
    
    const tarjeta = document.createElement('div');
    tarjeta.classList.add('tarjeta');

    
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


document.getElementById('formularioCita').addEventListener('submit', function (event) {
    
    event.preventDefault();

    
    if (validarCampos()) {
       
    }
});
console.log(citas);