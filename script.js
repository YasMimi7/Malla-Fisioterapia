const materias = document.querySelectorAll('.materia');
const contador = document.getElementById('contador');

const prerrequisitos = {
  // Agrega aquí todos los prerrequisitos que ya te pasé (el archivo completo lo tienes actualizado)
};

let aprobadas = JSON.parse(localStorage.getItem('aprobadas')) || [];

function actualizarVista() {
  let total = 0;

  materias.forEach(el => {
    const nombre = el.textContent.trim();
    el.classList.remove('aprobada', 'habilitada', 'bloqueada');

    if (aprobadas.includes(nombre)) {
      el.classList.add('aprobada');
      total++;
    } else if (!prerrequisitos[nombre] || prerrequisitos[nombre].every(p => aprobadas.includes(p))) {
      el.classList.add('habilitada');
    } else {
      el.classList.add('bloqueada');
    }
  });

  contador.textContent = `Materias aprobadas: ${total}`;
}

function toggleMateria(el) {
  const nombre = el.textContent.trim();
  if (!el.classList.contains('habilitada') && !el.classList.contains('aprobada')) return;

  if (aprobadas.includes(nombre)) {
    aprobadas = aprobadas.filter(m => m !== nombre);
  } else {
    aprobadas.push(nombre);
  }

  localStorage.setItem('aprobadas', JSON.stringify(aprobadas));
  actualizarVista();
}

function guardarMalla() {
  localStorage.setItem('aprobadas', JSON.stringify(aprobadas));
  alert('✅ Avance guardado correctamente.');
}

function resetMalla() {
  if (confirm('¿Seguro que deseas reiniciar toda la malla?')) {
    aprobadas = [];
    localStorage.removeItem('aprobadas');
    actualizarVista();
  }
}

materias.forEach(el => {
  el.addEventListener('click', () => toggleMateria(el));
});

actualizarVista();
