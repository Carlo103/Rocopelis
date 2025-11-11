
// Búsqueda simple (demo)
function handleSearch(e){
  e.preventDefault();
  const q = document.getElementById('searchInput')?.value?.trim();
  if(!q){ return false; }
  alert('Buscaste: ' + q);
  return false;
}

document.addEventListener('DOMContentLoaded', () => {
  const body = document.body;
  const themeBtn = document.getElementById('themeToggle');

  // Guardar clases originales para poder restaurar
  const markOriginalClasses = () => {
    document.querySelectorAll('.bg-dark, .text-light, .navbar-dark, .card.bg-dark, header.bg-dark, footer.bg-dark').forEach(el => {
      if(!el.dataset.originalClasses){
        el.dataset.originalClasses = el.className;
      }
    });
  };

  const restoreOriginalClasses = () => {
    document.querySelectorAll('[data-original-classes]').forEach(el => {
      el.className = el.dataset.originalClasses;
    });
  };

  const applyLightMode = () => {
    body.classList.add('modo-claro');
    body.classList.remove('modo-oscuro');
    // Cambios de clases a variantes claras
    document.querySelectorAll('[data-original-classes]').forEach(el => {
      el.classList.remove('bg-dark','text-light','navbar-dark');
      if(el.tagName === 'NAV'){
        el.classList.add('navbar-light');
      }
    });
    if(themeBtn){ themeBtn.innerHTML = '<i class="bi bi-moon"></i>'; }
  };

  const applyDarkMode = () => {
    body.classList.remove('modo-claro');
    body.classList.add('modo-oscuro');
    restoreOriginalClasses();
    if(themeBtn){ themeBtn.innerHTML = '<i class="bi bi-brightness-high"></i>'; }
  };

  // Inicialización
  markOriginalClasses();
  const saved = localStorage.getItem('rocopelis-modo') || 'oscuro';
  if(saved === 'claro'){ applyLightMode(); } else { applyDarkMode(); }

  // Toggle de tema
  themeBtn?.addEventListener('click', () => {
    const next = body.classList.contains('modo-oscuro') ? 'claro' : 'oscuro';
    if(next === 'claro'){ applyLightMode(); } else { applyDarkMode(); }
    localStorage.setItem('rocopelis-modo', next);
  });

  // --- Comportamientos SOLO en index.html ---
  // Alerta de bienvenida solo la primera vez
  if (window.location.pathname.endsWith('index.html') || window.location.pathname.endsWith('/')) {
    if (!localStorage.getItem('bienvenidaMostrada')) {
      alert('¡Bienvenido a Rocopelis!');
      localStorage.setItem('bienvenidaMostrada', 'true');
    }
    // Modal de privacidad (si existe y no ha sido aceptado)
    const modalEl = document.getElementById('modalPrivacidad');
    const aceptarBtn = document.getElementById('aceptarPrivacidad');
    if (modalEl && !localStorage.getItem('privacidadAceptada')) {
      const privacyModal = new bootstrap.Modal(modalEl);
      setTimeout(()=>privacyModal.show(), 1200);
      aceptarBtn?.addEventListener('click', ()=>{
        localStorage.setItem('privacidadAceptada','true');
      });
    }
  }
});
