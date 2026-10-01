let estudiantes = [];

function registrar() {
  let nombre = document.getElementById("nombre").value.trim();
  let curso = document.getElementById("curso").value;
  let notaTexto = document.getElementById("nota").value.trim();
  let mensaje = document.getElementById("mensaje");

  if (nombre === "") {
    return mostrarError(mensaje, "Debe ingresar el nombre del estudiante.");
  }

  if (curso === "") {
    return mostrarError(mensaje, "Debe seleccionar un curso.");
  }

  if (notaTexto === "") {
    return mostrarError(mensaje, "Debe ingresar la nota final.");
  }

  let nota = parseFloat(notaTexto);

  if (isNaN(nota) || nota < 0 || nota > 20) {
    return mostrarError(mensaje, "La nota debe ser un número entre 0 y 20.");
  }

  if (estudiantes.some((e) => e.nombre.toLowerCase() === nombre.toLowerCase())) {
    return mostrarError(mensaje, "El estudiante " + nombre + " ya está registrado.");
  }

  estudiantes.push({ nombre: nombre, curso: curso, nota: nota });
  mensaje.className = "exito";
  mensaje.innerText = "Estudiante registrado correctamente.";

  limpiarCampos();
  actualizarLista();
}

function mostrarError(elemento, texto) {
  elemento.className = "error";
  elemento.innerText = texto;
}

function actualizarLista() {
  let lista = document.getElementById("listaEstudiantes");
  lista.innerHTML = "";

  estudiantes.forEach((estudiante, indice) => {
    let item = document.createElement("li");
    let estado = estudiante.nota >= 11 ? "aprobado" : "desaprobado";
    item.innerHTML =
      "<strong>" + estudiante.nombre + "</strong>" +
      '<span class="dato">' + estudiante.curso + "</span>" +
      '<span class="nota ' + estado + '">' +
      estudiante.nota.toFixed(1) + "</span>";

    let quitar = document.createElement("button");
    quitar.className = "eliminar";
    quitar.innerText = "Eliminar";
    quitar.onclick = function () {
      eliminar(indice);
    };
    item.appendChild(quitar);

    lista.appendChild(item);
  });

  document.getElementById("vacio").style.display = estudiantes.length ? "none" : "block";
  document.getElementById("total").innerText = estudiantes.length;

  let suma = estudiantes.reduce((acumulado, e) => acumulado + e.nota, 0);
  let promedio = estudiantes.length ? suma / estudiantes.length : 0;
  document.getElementById("promedio").innerText = promedio.toFixed(2);
}

function eliminar(indice) {
  let nombre = estudiantes[indice].nombre;
  estudiantes.splice(indice, 1);
  actualizarLista();
  let mensaje = document.getElementById("mensaje");
  mensaje.className = "exito";
  mensaje.innerText = "Se eliminó a " + nombre + " de la lista.";
}

function limpiarTodo() {
  if (estudiantes.length === 0) {
    return;
  }
  estudiantes = [];
  actualizarLista();
  let mensaje = document.getElementById("mensaje");
  mensaje.className = "exito";
  mensaje.innerText = "Lista de estudiantes vaciada.";
}

function limpiarCampos() {
  document.getElementById("nombre").value = "";
  document.getElementById("curso").value = "";
  document.getElementById("nota").value = "";
  document.getElementById("nombre").focus();
}
