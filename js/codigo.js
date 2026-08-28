//navegacion
document.addEventListener('DOMContentLoaded', () => {
  const enlacesNav = document.querySelectorAll('.navegacion-menu a, .lista-links a, a[href^="#"]');
  enlacesNav.forEach(enlace => {
    enlace.addEventListener('click', (e) => {
      const targetId = enlace.getAttribute('href')?.replace('#', '');
      if (!targetId) return;
      e.preventDefault();
      const targetSection = document.getElementById(targetId);
      const menuLateral = document.getElementById('menu-lateral');
      const capaOscura = document.getElementById('capa-oscura');
      const botonHamburguesa = document.getElementById('boton-hamburguesa');
      if (menuLateral) menuLateral.classList.remove('abierto');
      if (capaOscura) capaOscura.classList.remove('visible');
      document.body.classList.remove('no-scroll');
      if (botonHamburguesa) botonHamburguesa.style.display = 'flex';
      if (targetSection) {
        targetSection.scrollIntoView({ behavior: 'smooth' });
      } else if (targetId === 'inicio') {
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }
    });
  });
  const secciones = document.querySelectorAll('section[id], header[id]');

  const observerOptions = {
    root: null,
    rootMargin: '-30% 0px -60% 0px',
    threshold: 0
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const idActual = entry.target.getAttribute('id');
        document.querySelectorAll('.navegacion-menu a').forEach(enlace => {
          const href = enlace.getAttribute('href')?.replace('#', '');
          if (href === idActual) {
            enlace.classList.add('activo');
          } else {
            enlace.classList.remove('activo');
          }
        });
      }
    });
  }, observerOptions);

  secciones.forEach(seccion => observer.observe(seccion));
});

// boton redes salir
document.addEventListener('click', (event) => {
  const fabContainer = document.getElementById('socialFab');
  const fabCheckbox = document.getElementById('btn-fab-toggle');

  if (fabCheckbox && fabCheckbox.checked) {
    // Si el clic NO ocurrió dentro del contenedor de redes, se desmarca
    if (!fabContainer.contains(event.target)) {
      fabCheckbox.checked = false;
    }
  }
});

///// Boton whatsapp

let waHasOpened = false;
const PHONE_NUMBER = "5491124758250";

function toggleWaChat(forceState) {
  const chatBox = document.getElementById("waChatBox");
  const floatBtn = document.getElementById("waFloatBtn");
  const ping = document.getElementById("waPing");
  const badge = document.getElementById("waBadge");

  const willOpen = typeof forceState === "boolean" ? forceState : !chatBox.classList.contains("active");

  chatBox.classList.toggle("active", willOpen);
  floatBtn.classList.toggle("active", willOpen);
  floatBtn.setAttribute("aria-label", willOpen ? "Cerrar chat de WhatsApp" : "Abrir chat de WhatsApp");

  if (willOpen) {
    waHasOpened = true;
    if (ping) ping.style.display = "none";
    if (badge) badge.style.display = "none";
    const ta = document.getElementById("waInputMessage");
    setTimeout(() => ta && ta.focus(), 180);
  }
}

function updateSendState() {
  const input = document.getElementById("waInputMessage");
  const btn = document.getElementById("waSendBtn");
  btn.disabled = input.value.trim() === "";
}

function autoResize(el) {
  el.style.height = "auto";
  el.style.height = Math.min(el.scrollHeight, 80) + "px";
}

function sendToWhatsApp() {
  const input = document.getElementById("waInputMessage");
  const userMessage = input.value.trim();
  if (userMessage === "") return;

  const whatsappUrl = `https://wa.me/${PHONE_NUMBER}?text=${encodeURIComponent(userMessage)}`;
  window.open(whatsappUrl, "_blank");

  input.value = "";
  autoResize(input);
  updateSendState();
  toggleWaChat(false);
}

document.addEventListener("DOMContentLoaded", () => {
  const input = document.getElementById("waInputMessage");
  
  if (input) {
    input.addEventListener("input", () => { 
      updateSendState(); 
      autoResize(input); 
    });
    
    input.addEventListener("keydown", (e) => {
      if (e.key === "Enter" && !e.shiftKey) {
        e.preventDefault();
        sendToWhatsApp();
      }
    });
  }

  const timeEl = document.getElementById("waTime");
  if (timeEl) {
    const now = new Date();
    timeEl.textContent =
      now.getHours().toString().padStart(2, "0") + ":" + now.getMinutes().toString().padStart(2, "0");
  }

  document.addEventListener("click", (e) => {
    const container = document.getElementById("waContainer");
    const chatBox = document.getElementById("waChatBox");
    if (chatBox && chatBox.classList.contains("active") && !container.contains(e.target)) {
      toggleWaChat(false);
    }
  });
});

//scroll hamburguesa
window.addEventListener('scroll', () => {
  const botonHamburguesa = document.getElementById('boton-hamburguesa');
  if (window.scrollY > 200) {
    botonHamburguesa.classList.add('scrolled');
  } else {
    botonHamburguesa.classList.remove('scrolled');
  }
});

//hamburguesa
// Hamburguesa y Control de Scroll
document.addEventListener('DOMContentLoaded', () => {
  const botonHamburguesa = document.getElementById('boton-hamburguesa');
  const botonCerrar = document.getElementById('boton-cerrar');
  const menuLateral = document.getElementById('menu-lateral');
  const capaOscura = document.getElementById('capa-oscura');
  
  const botonModoClaro = document.getElementById('boton-modo-claro');
  const botonModoOscuro = document.getElementById('boton-modo-oscuro');
  const logoPrincipal = document.getElementById('logo-principal');
  const logoNavbar = document.getElementById('logo-navbar');
  const logoFooter = document.getElementById('logo-footer');
  const elementoHtml = document.documentElement;

  function abrirMenu() {
    menuLateral.classList.add('abierto');
    capaOscura.classList.add('visible');
    document.body.classList.add('no-scroll');
    if (botonHamburguesa) botonHamburguesa.style.display = 'none';
  }

  function cerrarMenu() {
    menuLateral.classList.remove('abierto');
    capaOscura.classList.remove('visible');
    document.body.classList.remove('no-scroll');
    if (botonHamburguesa) botonHamburguesa.style.display = 'flex';
  }

  if (botonHamburguesa) botonHamburguesa.addEventListener('click', abrirMenu);
  if (botonCerrar) botonCerrar.addEventListener('click', cerrarMenu);
  if (capaOscura) capaOscura.addEventListener('click', cerrarMenu);

  function activarModoClaro() {
    elementoHtml.setAttribute('data-tema', 'claro');
    if (botonModoClaro) botonModoClaro.classList.add('activo');
    if (botonModoOscuro) botonModoOscuro.classList.remove('activo');
    if (logoPrincipal) logoPrincipal.src = './datos/logo-modo-claro.png';
    if (logoNavbar) logoNavbar.src = './datos/logo-navbar-responsive.png';
    if (logoFooter) logoFooter.src = './datos/logo.png';
  }

  function activarModoOscuro() {
    elementoHtml.setAttribute('data-tema', 'oscuro');
    if (botonModoOscuro) botonModoOscuro.classList.add('activo');
    if (botonModoClaro) botonModoClaro.classList.remove('activo');
    if (logoPrincipal) logoPrincipal.src = './datos/logo-modo-oscuro.png';
    if (logoNavbar) logoNavbar.src = './datos/logo-navbar-responsive-nocturno.png';
    if (logoFooter) logoFooter.src = './datos/logo-modo-oscuro.png';
  }

  if (botonModoClaro) botonModoClaro.addEventListener('click', activarModoClaro);
  if (botonModoOscuro) botonModoOscuro.addEventListener('click', activarModoOscuro);
});

//carrusel

document.addEventListener("DOMContentLoaded", () => {
  function crearCarrusel({
    pistaId,
    prevId,
    nextId,
    puntosId
  }) {
    const pista = document.getElementById(pistaId);
    if (!pista) return;

    const btnPrev = document.getElementById(prevId);
    const btnNext = document.getElementById(nextId);
    const puntosContainer = document.getElementById(puntosId);

    const originales = Array.from(pista.children);
    const total = originales.length;

    if (!total) return;

    const clones = Math.min(2, total);
    let indice = clones;
    let moviendo = false;

    const clonesInicio = originales
      .slice(-clones)
      .map(el => el.cloneNode(true));

    const clonesFinal = originales
      .slice(0, clones)
      .map(el => el.cloneNode(true));

    clonesInicio.reverse().forEach(el => {
      pista.insertBefore(el, pista.firstChild);
    });

    clonesFinal.forEach(el => {
      pista.appendChild(el);
    });

    // --- NUEVO: ASIGNAR CLIC A TODAS LAS TARJETAS DE LA PISTA (ORIGINALES + CLONES) ---
    Array.from(pista.children).forEach((tarjeta, i) => {
      tarjeta.addEventListener("click", (e) => {
        // Si la tarjeta clickeada NO es la activa actual y no se está moviendo
        if (i !== indice && !moviendo) {
          // Prevenimos que se disparen enlaces o botones internos si estaba opaca
          e.preventDefault();
          e.stopPropagation();

          moviendo = true;
          indice = i;
          posicionar(true);
        }
      });
    });

    if (puntosContainer) {
      puntosContainer.innerHTML = "";

      originales.forEach((_, i) => {
        const punto = document.createElement("div");
        punto.className = "punto";

        if (i === 0) {
          punto.classList.add("activo");
        }

        punto.addEventListener("click", () => {
          if (moviendo) return;

          moviendo = true;
          indice = i + clones;
          posicionar(true);
        });

        puntosContainer.appendChild(punto);
      });
    }

    const puntos = puntosContainer
      ? Array.from(puntosContainer.children)
      : [];

    function obtenerTransformX() {
      const transform = getComputedStyle(pista).transform;

      if (!transform || transform === "none") {
        return 0;
      }

      return new DOMMatrix(transform).m41;
    }

    function posicionar(conTransicion = true) {
      const tarjeta = pista.children[indice];

      if (!tarjeta) return;

      pista.classList.toggle("con-transicion", conTransicion);

      const rect = tarjeta.getBoundingClientRect();
      const centroTarjeta = rect.left + rect.width / 2;
      const centroPagina = window.innerWidth / 2;
      const diferencia = centroPagina - centroTarjeta;
      const transformActual = obtenerTransformX();

      pista.style.transform = `translate3d(${transformActual + diferencia}px, 0, 0)`;

      actualizarEstado();
    }

    function actualizarEstado() {
      const tarjetas = Array.from(pista.children);

      tarjetas.forEach((tarjeta, i) => {
        tarjeta.classList.toggle("activa", i === indice);
      });

      let real = (indice - clones) % total;

      if (real < 0) {
        real += total;
      }

      puntos.forEach((punto, i) => {
        punto.classList.toggle("activo", i === real);
      });
    }

    function mover(direccion) {
      if (moviendo) return;

      moviendo = true;
      indice += direccion;

      posicionar(true);
    }

    function corregirLoop() {
      if (indice >= total + clones) {
        indice = clones;
        posicionar(false);
      }

      if (indice < clones) {
        indice = total + clones - 1;
        posicionar(false);
      }

      moviendo = false;
    }

    pista.addEventListener("transitionend", e => {
      if (e.propertyName !== "transform") return;

      corregirLoop();
    });

    if (btnPrev) {
      btnPrev.addEventListener("click", () => {
        mover(-1);
      });
    }

    if (btnNext) {
      btnNext.addEventListener("click", () => {
        mover(1);
      });
    }

    let resizeTimer;
    window.addEventListener("resize", () => {
      clearTimeout(resizeTimer);

      resizeTimer = setTimeout(() => {
        posicionar(false);
      }, 100);
    });

    requestAnimationFrame(() => {
      posicionar(false);
    });
  }

  crearCarrusel({
    pistaId: "pistaCarrusel",
    prevId: "btnPrev",
    nextId: "btnNext",
    puntosId: "indicadoresPuntos"
  });

  crearCarrusel({
    pistaId: "pistaEquipo",
    prevId: "btnEquipoPrev",
    nextId: "btnEquipoNext",
    puntosId: "puntosEquipo"
  });
});



//carrusel clientes
document.addEventListener("DOMContentLoaded", () => {
  const pista = document.getElementById("pistaTestimonios");
  const btnPrev = document.getElementById("btnTestimonioPrev");
  const btnNext = document.getElementById("btnTestimonioNext");
  const contenedorPuntos = document.getElementById("puntosTestimonios");

  if (!pista) return;

  const tarjetas = Array.from(pista.children);
  const total = tarjetas.length;
  let indiceActual = 0;

  // Render Puntos
  contenedorPuntos.innerHTML = "";
  tarjetas.forEach((_, index) => {
    const punto = document.createElement("div");
    punto.classList.add("punto");
    if (index === 0) punto.classList.add("activo");
    punto.addEventListener("click", () => irA(index));
    contenedorPuntos.appendChild(punto);
  });

  const puntos = Array.from(contenedorPuntos.children);

  function irA(index) {
    if (index < 0) index = total - 1;
    if (index >= total) index = 0;

    indiceActual = index;
    pista.style.transform = `translateX(-${indiceActual * 100}%)`;

    puntos.forEach((p, i) => p.classList.toggle("activo", i === indiceActual));
  }

  btnPrev.addEventListener("click", () => irA(indiceActual - 1));
  btnNext.addEventListener("click", () => irA(indiceActual + 1));
});
