let usuarios = [];
let op = null
let indice=null

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
    if (op===true){
        usuarios[indice]=usuario
          }else{
        usuarios.push(usuario)
          
    }
    // usuarios.push(usuario);

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
        document.getElementById("tabla").innerHTML = ""
        pintar()
        op=false
    }
}
}
function pintar(){
    let frag= document.createDocumentFragment()

    usuarios.forEach((item, index) => {
      let tr = document.createElement("tr")
      let td1 = document.createElement("td")
      let td2 = document.createElement("td")
      let td3 = document.createElement("td")
      let td4 = document.createElement("td")
      let td5 = document.createElement("td")
      let td6 = document.createElement("td")
      let td7 = document.createElement("td")
      let td8 = document.createElement("td")
      let td9 = document.createElement("td")
      let editar = document.createElement("button")
      let eliminar = document.createElement("button")
      editar.textContent = "📝"
      editar.addEventListener("click",()=>{
        edita(item, index)
    })
      eliminar.textContent="❌"
      eliminar.addEventListener("click",() =>{
        borrar(index)
      })
      td1.textContent=item.nombre
      td2.textContent=item.apellido
      td4.textContent=item.tipoDocumento
      td3.textContent=item.numeroDocumento
      td5.textContent=item.fechaNacimiento
      td6.textContent=item.genero
      td7.textContent=item.telefono
      td8.textContent=item.correo
      td9.appendChild(editar)
      td9.appendChild(eliminar)
      tr.appendChild(td1)
      tr.appendChild(td2)
      tr.appendChild(td3)
      tr.appendChild(td4)
      tr.appendChild(td5)
      tr.appendChild(td6)
      tr.appendChild(td7)
      tr.appendChild(td8)
      tr.appendChild(td9)
      frag.appendChild(tr)
      document.getElementById("tabla").appendChild(frag)
    })
  }


  function edita(r, i){
    op = true
    indice=i
console.log(r);
document.getElementById("nombre").value=r.nombre
document.getElementById("apellido").value=r.apellido
document.getElementById("documento").value=r.tipoDocumento
document.getElementById("numdocumento").value=r.numeroDocumento
document.getElementById("fecha_nacimiento").value=r.fechaNacimiento
if (r.genero === "Femenino") {
    document.querySelector('input[name="genero"][value="Femenino"]').checked = true;
  } else if (r.genero === "Masculino") {
    document.querySelector('input[name="genero"][value="Masculino"]').checked = true;
  }
document.getElementById("telefono").value=r.telefono
document.getElementById("correo").value=r.correo
  }

  function  borrar(index){
    usuarios.splice(index, 1);
    document.getElementById("tabla").innerHTML = "";
    pintar();
  }
