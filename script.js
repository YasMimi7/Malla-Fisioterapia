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
};
