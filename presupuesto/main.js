document.addEventListener('DOMContentLoaded', function () {
    let presupuestoTotal = 0;
    let saldoRestante = 0;
    const listaGastos = [];
  
    // Obtén el botón por su ID
    const botonAgregar = document.getElementById('botonAgregar');
  
    // Asigna el evento de clic al botón
    botonAgregar.addEventListener('click', validar);
  
    function mostrarTarjetas() {
      const tarjetasContenedor = document.querySelector('.tarjetas-contenedor');
      tarjetasContenedor.innerHTML = '';
  
      listaGastos.forEach((gasto, index) => {
          const tarjeta = document.createElement('div');
          tarjeta.classList.add('tarjeta');
          tarjeta.innerHTML = `<p>${gasto.nombre}: $${gasto.cantidad}</p>`;
          
          const botonBorrar = document.createElement('button');
          botonBorrar.textContent = 'Borrar';
          botonBorrar.className = 'boton-borrar';
          botonBorrar.addEventListener('click', () => borrarGasto(index));
  
          tarjeta.appendChild(botonBorrar);
          tarjetasContenedor.appendChild(tarjeta);
      });
  }
  
    function borrarGasto(index) {
        const gastoABorrar = listaGastos[index];
        saldoRestante += gastoABorrar.cantidad;
        listaGastos.splice(index, 1);
        mostrarTarjetas();
        actualizarSaldo();
    }
  
    function actualizarSaldo() {
        const restanteLabel = document.querySelector('.restante p');
        restanteLabel.textContent = `Restante: $${saldoRestante}`;
  
        const porcentajeRestante = (saldoRestante / presupuestoTotal) * 100;
  
        if (porcentajeRestante <= 20) {
            restanteLabel.style.color = 'red';
        } else {
            restanteLabel.style.color = 'green';
        }
    }
  
    function validar() {
      const nombre = document.getElementById('gastos').value.trim();
      const cantidad = document.getElementById('cantidad').value.trim();
  
      if (nombre !== '' && cantidad !== '') {
        const cantidadNumerica = parseFloat(cantidad.replace(/[^\d.]/g, ''));
  
        if (isNaN(cantidadNumerica) || cantidadNumerica <= 0) {
          Swal.fire({
            icon: 'error',
            title: 'Error',
            text: 'Por favor, ingresa una cantidad válida.',
          });
          return;
        }
  
        if (cantidadNumerica > window.saldoRestante) {
          Swal.fire({
            icon: 'error',
            title: 'Error',
            text: 'No tienes suficiente saldo para este gasto.',
          });
          return;
        }
  
        listaGastos.push({ nombre, cantidad: cantidadNumerica });
        window.saldoRestante -= cantidadNumerica;
  
        mostrarTarjetas();
        actualizarSaldo();
  
        document.getElementById('gastos').value = '';
        document.getElementById('cantidad').value = '';
  
        Swal.fire({
          icon: 'success',
          title: '¡Gasto Agregado!',
          text: 'El gasto se ha agregado correctamente.',
        });
  
        if (window.saldoRestante <= 0) {
          Swal.fire({
            icon: 'warning',
            title: '¡Presupuesto Agotado!',
            text: 'El presupuesto se ha agotado.',
          });
        }
      } else {
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: 'Por favor, ingresa el nombre y la cantidad del gasto.',
        });
      }
    }
  
  
    function mostrarAlertaPresupuesto() {
      Swal.fire({
        title: "¡Bienvenido!",
        text: "Por favor, ingresa tu presupuesto:",
        input: "text",
        inputPlaceholder: "Ingresa tu presupuesto",
        confirmButtonText: "Aceptar",
        allowOutsideClick: false,
        allowEscapeKey: false,
        allowEnterKey: false,
        stopKeydownPropagation: false,
      }).then((result) => {
        if (result.isConfirmed && result.value) {
          const presupuesto = parseFloat(result.value);
  
          if (!isNaN(presupuesto) && presupuesto > 0) {
            inicializarPresupuesto(presupuesto);
          } else {
            Swal.fire({
              icon: 'error',
              title: 'Error',
              text: 'Por favor, ingresa un presupuesto válido mayor que cero.',
            }).then(() => {
              mostrarAlertaPresupuesto(); // Vuelve a mostrar la alerta si el presupuesto no es válido
            });
          }
        }
      });
    }
  
    function inicializarPresupuesto(presupuesto) {
      const presupuestoLabel = document.querySelector('.presupuesto p');
      presupuestoLabel.textContent = `Presupuesto Inicial: ${formatearComoMoneda(presupuesto)}`;
  
      const restanteLabel = document.querySelector('.restante p');
      restanteLabel.textContent = `Restante: ${formatearComoMoneda(presupuesto)}`;
  
      window.presupuestoTotal = parseFloat(presupuesto);
      window.saldoRestante = parseFloat(presupuesto);
    }
  
    function formatearComoMoneda(valor) {
      const formatoMoneda = new Intl.NumberFormat('es-AR', {
        style: 'currency',
        currency: 'ARS',
      });
      return formatoMoneda.format(valor);
    }
    mostrarAlertaPresupuesto();
  });