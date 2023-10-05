let usuarios = [];

function guardarDatos() {
    let nombre = document.getElementById('nombre').value;
    let apellido = document.getElementById('apellido').value;
    let tipoDocumento = document.getElementById('documento').value;
    let numeroDocumento = document.getElementById('numdocumento').value;
    let fechaNacimiento = document.getElementById('fecha_nacimiento').value;
    let genero = document.querySelector('input[name="genero"]:checked').value;
    let telefono = document.getElementById('telefono').value;
    let correo = document.getElementById('correo').value;

    let usuario = {
        nombre: nombre,
        apellido: apellido,
        tipoDocumento: tipoDocumento,
        numeroDocumento: numeroDocumento,
        fechaNacimiento: fechaNacimiento,
        genero: genero,
        telefono: telefono,
        correo: correo
    };

    usuarios.push(usuario);

    document.getElementById('nombre').value = '';
    document.getElementById('apellido').value = '';
    document.getElementById('documento').value = 'TI';
    document.getElementById('numdocumento').value = '';
    document.getElementById('fecha_nacimiento').value = '';
    document.getElementById('masculino').checked = false;
    document.getElementById('femenino').checked = false;
    document.getElementById('telefono').value = '';
    document.getElementById('correo').value = '';

    console.log(usuarios);
}

function validar() {
    if (document.getElementById("nombre").value == "") {
        document.getElementById("alert").textContent = "El campo del nombre esta vacio por favor ingrese su nombre"
        setTimeout(() => {
            document.getElementById("alert").textContent = ""
        }, 3000);
    } else if (document.getElementById("apellido").value == "") {
        document.getElementById("alert").textContent = "El campo del apellido esta vacio por favor ingrese su appellido"
        setTimeout(() => {
            document.getElementById("alert").textContent = ""
        }, 3000);
    } else if (document.getElementById("numdocumento").value =="") {
        document.getElementById("alert").textContent = "El campo numero de documento esta vacio por favor ingrese el numero de docuemnto"
        setTimeout(() => {
            document.getElementById("alert").textContent = ""
        }, 4000);
    }else if(document.getElementById("fecha_nacimiento").value =="") {
        document.getElementById("alert").textContent = "El campo de la fecha de nacimiento esta vacio por favor ingrese su fecha de naciento"
        setTimeout(() => {
            document.getElementById("alert").textContent = ""
        }, 4000);
    }else if(!document.querySelector('input[name="genero"]:checked')) {
        document.getElementById("alert").textContent = "Por favor, seleccione su genero"
        setTimeout(() => {
            document.getElementById("alert").textContent = "";
        }, 3000);
    } else if (document.getElementById("telefono").value == "" || document.getElementById("telefono").value.length > 11) {
        document.getElementById("alert").textContent = "El campo de teléfono es obligatorio y no puede tener más de 11 dígitos.";
        setTimeout(() => {
            document.getElementById("alert").textContent = "";
        }, 4000);
    }else if (document.getElementById("correo").value == "" || !document.getElementById("correo").value.includes("@")) {
        document.getElementById("alert").textContent = "Por favor, ingrese una dirección de correo válida.";
        setTimeout(() => {
            document.getElementById("alert").textContent = "";
        }, 4000);
    }  else {
        let fechaNacimiento = document.getElementById("fecha_nacimiento").value;
        let fechaNacimientoDate = new Date(fechaNacimiento);
        let hoy = new Date();
        let edad = hoy.getFullYear() - fechaNacimientoDate.getFullYear();
        if (hoy < new Date(hoy.getFullYear(), fechaNacimientoDate.getMonth(), fechaNacimientoDate.getDate())) {
            edad--;
        }

        if (edad < 18) {
            document.getElementById("alert").textContent = "Lo siento, debes ser mayor de edad para registrarte.";
            setTimeout(() => {
                document.getElementById("alert").textContent = "";
            }, 3000);
        }
    else {
        guardarDatos ()
    }
}
}
