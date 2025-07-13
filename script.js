function toggle(element) {
  element.classList.toggle("aprobada");

  const siguienteId = element.dataset.habilita;
  if (siguienteId) {
    const siguiente = document.getElementById(siguienteId);
    if (siguiente && element.classList.contains("aprobada")) {
      siguiente.classList.remove("bloqueada");
    } else if (siguiente) {
      siguiente.classList.add("bloqueada");
      siguiente.classList.remove("aprobada");
    }
  }
}
