let turnoActual = 0;
let totalTurnosGenerados = 0;

function genetick() {
    totalTurnosGenerados++;
    const nuevoTurno = totalTurnosGenerados;

    if (totalTurnosGenerados === 1) {
        turnoActual = 1;
        document.getElementById('back').disabled = false;
        document.getElementById('next').disabled = false;
    }

    const divcardsElement = document.querySelector('.divcards');
    const nuevaCard = document.createElement('div');
    nuevaCard.classList.add('card');
    nuevaCard.setAttribute('data-turno', nuevoTurno);


    nuevaCard.innerHTML = `
        <p>${nuevoTurno}</p>
        <button class="aceptar" onclick="aceptarTurno(${nuevoTurno})">Aceptar</button>
        <button class="rechazar" onclick="rechazarTurno(${nuevoTurno})">Rechazar</button>
    `;

    divcardsElement.appendChild(nuevaCard);


    actualizarTicket(nuevoTurno);
}
function actualizarTicket(numeroTurno) {
    const ticketElement = document.querySelector('.ticket');
    if (numeroTurno === 0) {
        ticketElement.textContent = "No hay turno activo.";
    } else {
        ticketElement.textContent = `Su turno es el número ${numeroTurno}`;
    }
}


function next() {
    if (turnoActual < totalTurnosGenerados) {
        turnoActual++;
        cambiarNumeroTurno(turnoActual);
    }
}

function back() {
    if (turnoActual > 0) {
        turnoActual--;
        cambiarNumeroTurno(turnoActual);
    }
}

function cambiarNumeroTurno(numeroTurno) {
    const numeroTurnoElement = document.querySelector('.turnum');
    numeroTurnoElement.textContent = numeroTurno.toString().padStart(2, '0');
}

function aceptarTurno(numeroTurno) {
    const cardAceptada = document.querySelector(`.card[data-turno="${numeroTurno}"]`);

    if (cardAceptada) {
        cardAceptada.style.backgroundColor = '#4CAF50';
    }

}

function rechazarTurno(numeroTurno) {
    const cardRechazada = document.querySelector(`.card[data-turno="${numeroTurno}"]`);

    if (cardRechazada) {
        cardRechazada.style.backgroundColor = '#f44336';
    }

}

function reiniciarSistema() {
    const divcardsElement = document.querySelector('.divcards');
    divcardsElement.innerHTML = '';

    turnoActual = 0;

    totalTurnosGenerados = 0;
    document.getElementById('back').disabled = true;
    document.getElementById('next').disabled = true;

    cambiarNumeroTurno(0);

    actualizarTicket('');
}
