function toggle(element) {
  element.classList.toggle("aprobada");

  const id = element.id;
  if (id) {
    const estado = element.classList.contains("aprobada") ? "aprobada" : "";
    localStorage.setItem(id, estado);
  }

  const siguienteId = element.dataset.habilita;
  if (siguienteId) {
    const siguiente = document.getElementById(siguienteId);
    if (siguiente && element.classList.contains("aprobada")) {
      siguiente.classList.remove("bloqueada");
    } else if (siguiente) {
      siguiente.classList.add("bloqueada");
      siguiente.classList.remove("aprobada");
      localStorage.setItem(siguienteId, "");
    }
  }

  actualizarContador();
}

window.onload = () => {
  const materias = document.querySelectorAll('.materia');
  materias.forEach(materia => {
    const id = materia.id;
    if (id) {
      const estado = localStorage.getItem(id);
      if (estado === "aprobada") {
        materia.classList.add("aprobada");
        const siguienteId = materia.dataset.habilita;
        if (siguienteId) {
          const siguiente = document.getElementById(siguienteId);
          if (siguiente) siguiente.classList.remove("bloqueada");
        }
      }
    }
  });
  actualizarContador();
};

function resetMalla() {
  const confirmar = confirm("¿Estás segura de que quieres borrar todo tu avance?");
  if (confirmar) {
    localStorage.clear();
    location.reload();
  }
}

function guardarMalla() {
  alert("¡Tu avance se ha guardado exitosamente! 💾");
}

function actualizarContador() {
  const total = document.querySelectorAll('.materia').length;
  const aprobadas = document.querySelectorAll('.materia.aprobada').length;
  const contador = document.getElementById('contador');
  if (contador) {
    contador.textContent = `Materias aprobadas: ${aprobadas} / ${total}`;
  }
}
