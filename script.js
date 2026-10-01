function registrar() {
  let nombre = document.getElementById("nombre").value.trim();
  let curso = document.getElementById("curso").value.trim();
  let mensaje = document.getElementById("mensaje");

  if (nombre === "") {
    mensaje.innerText = "Debe ingresar el nombre del estudiante.";
    mensaje.className = "error";
    return;
  }

  if (curso === "") {
    mensaje.innerText = "Debe ingresar el curso.";
    mensaje.className = "error";
    return;
  }

  mensaje.innerText = "Estudiante registrado correctamente.";
  mensaje.className = "exito";

  let lista = document.getElementById("listaEstudiantes");
  let item = document.createElement("li");
  item.innerHTML = "<strong>" + nombre + "</strong> - " + curso;
  lista.appendChild(item);

  document.getElementById("vacio").style.display = "none";
  document.getElementById("nombre").value = "";
  document.getElementById("curso").value = "";
}
