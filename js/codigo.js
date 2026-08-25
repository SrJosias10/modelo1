// barra lateral
const identificadoresSecciones = ['inicio', 'servicios', 'productos', 'clientes', 'nosotros', 'contacto'];
const listaSecciones = identificadoresSecciones.map(id => document.getElementById(id));
const botonesNavegacion = document.querySelectorAll('.scroll-btn');

let indiceSeccionActual = 0;

function irASeccion(id) {
  const seccionObjetivo = document.getElementById(id);
  if (seccionObjetivo) {
    seccionObjetivo.scrollIntoView({ behavior: 'auto' });
  }
}

function desplazarSeccion(direccion) {
  if (direccion === 'arriba' && indiceSeccionActual > 0) {
    indiceSeccionActual--;
  } else if (direccion === 'abajo' && indiceSeccionActual < identificadoresSecciones.length - 1) {
    indiceSeccionActual++;
  }

  const idDestino = identificadoresSecciones[indiceSeccionActual];
  irASeccion(idDestino);
}

const observadorVisibilidad = new IntersectionObserver((entradas) => {
  entradas.forEach(entrada => {
    if (entrada.isIntersecting) {
      const idActivo = entrada.target.id;
      indiceSeccionActual = identificadoresSecciones.indexOf(idActivo);

      botonesNavegacion.forEach(boton => {
        boton.classList.remove('active');
        if (boton.id === `btn-${idActivo}`) {
          boton.classList.add('active');
        }
      });
    }
  });
}, {
  rootMargin: '-50% 0px -50% 0px',
  threshold: 0
});

listaSecciones.forEach(seccion => {
  if (seccion) observadorVisibilidad.observe(seccion);
});

// Inicio
let slideIndex = 0;
const slides = document.querySelectorAll('.slide');
const totalSlides = slides.length;
const tiempoRotacion = 12000;

// Elementos del nuevo control unificado
const progressFill = document.getElementById('progressFill');
const currentSlideNum = document.getElementById('currentSlideNum');

let carruselIntervalo = setInterval(mostrarSiguienteSlide, tiempoRotacion);

function actualizarSlides() {
    slides.forEach((slide, index) => {
        if (index === slideIndex) {
            slide.classList.add('active');
            const contenido = slide.querySelector('.contenido');
            if (contenido) {
                const clon = contenido.cloneNode(true);
                contenido.parentNode.replaceChild(clon, contenido);
            }
        } else {
            slide.classList.remove('active');
        }
    });

    // 2. Actualizar indicador numérico (ej: 01, 02, 03)
    if (currentSlideNum) {
    currentSlideNum.textContent = slideIndex + 1;
    }

    // 3. Actualizar barra de progreso
    if (progressFill) {
        const porcentaje = ((slideIndex + 1) / totalSlides) * 100;
        progressFill.style.width = `${porcentaje}%`;
    }
}

function mostrarSiguienteSlide() {
    slideIndex = (slideIndex + 1) % totalSlides;
    actualizarSlides();
}

function cambiarSlide(direccion) {
    reiniciarIntervalo();
    slideIndex += direccion;
    if (slideIndex >= totalSlides) { slideIndex = 0; }
    if (slideIndex < 0) { slideIndex = totalSlides - 1; }
    actualizarSlides();
}

function irASlide(index) {
    reiniciarIntervalo();
    slideIndex = index;
    actualizarSlides();
}

// Función auxiliar para limpiar y reiniciar el temporizador
function reiniciarIntervalo() {
    clearInterval(carruselIntervalo);
    carruselIntervalo = setInterval(mostrarSiguienteSlide, tiempoRotacion);
}

// Inicialización
document.addEventListener('DOMContentLoaded', () => {
    actualizarSlides();
});


//Splash
window.addEventListener('load', () => {
  setTimeout(() => {
    const splash = document.getElementById('splash');
    const main = document.getElementById('mainContent');
    const waContainer = document.getElementById('waContainer');

    if (main) {
      main.style.display = 'block'; // Lo metemos al layout
      // Pequeño timeout para que el navegador aplique la transición de opacidad
      setTimeout(() => {
        main.classList.add('visible');
      }, 20);
    }

    if (splash) {
      splash.classList.add('hidden'); // Empieza a desaparecer de fondo
    }

    if (waContainer) {
      waContainer.classList.add('visible');
    }
  }, 3000);
});

window.addEventListener('scroll', function() {
  const indicator = document.querySelector('.scroll-indicator');
  if (window.scrollY > 50) {
    indicator.classList.add('hidden');
  } else {
    indicator.classList.remove('hidden');
  }
});
////
document.addEventListener('DOMContentLoaded', () => {
  const encabezado = document.getElementById('encabezado');
  const botonMenu = document.getElementById('boton-menu');
  const menuNavegacion = document.getElementById('menu-navegacion');
  const enlaces = document.querySelectorAll('.enlace, .boton-contacto');
  const seccionInicio = document.getElementById('inicio');
  window.addEventListener('scroll', () => {
    if (seccionInicio) {
      const alturaInicio = seccionInicio.offsetHeight / 4;
      if (window.scrollY >= alturaInicio) {
        encabezado.classList.add('achicado');
      } else {
        encabezado.classList.remove('achicado');
      }
    } else {
      if (window.scrollY > 500) {
        encabezado.classList.add('achicado');
      } else {
        encabezado.classList.remove('achicado');
      }
    }
  });
  botonMenu.addEventListener('click', (evento) => {
    evento.stopPropagation();
    botonMenu.classList.toggle('activo');
    menuNavegacion.classList.toggle('activo');
  });
  enlaces.forEach(enlace => {
    enlace.addEventListener('click', () => {
      botonMenu.classList.remove('activo');
      menuNavegacion.classList.remove('activo');
    });
  });
  document.addEventListener('click', (evento) => {
    if (!encabezado.contains(evento.target)) {
      botonMenu.classList.remove('activo');
      menuNavegacion.classList.remove('activo');
    }
  });
});

/////Animacion linea
document.addEventListener("DOMContentLoaded", () => {
  const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
          if (entry.isIntersecting) {
              entry.target.classList.add("animate");
          } else {
              entry.target.classList.remove("animate");
          }
      });
  }, {
      threshold: 0.4
  });
  document.querySelectorAll(".separator").forEach(el => {
      observer.observe(el);
  });
});

///// Boton whatsapp
let waHasOpened = false;
 
function toggleWaChat(forceState) {
  const chatBox = document.getElementById("waChatBox");
  const floatBtn = document.getElementById("waFloatBtn");
  const ping = document.getElementById("waPing");
  const badge = document.getElementById("waBadge");
 
  const willOpen = typeof forceState === "boolean" ? forceState : !chatBox.classList.contains("active");
 
  chatBox.classList.toggle("active", willOpen);
  floatBtn.classList.toggle("is-open", willOpen);
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
 
const PHONE_NUMBER = "5491124758250";
 
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
  input.addEventListener("input", () => { updateSendState(); autoResize(input); });
  input.addEventListener("keydown", (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      sendToWhatsApp();
    }
  });
 
  const now = new Date();
  document.getElementById("waTime").textContent =
    now.getHours().toString().padStart(2, "0") + ":" + now.getMinutes().toString().padStart(2, "0");
 
  document.addEventListener("click", (e) => {
    const container = document.getElementById("waContainer");
    const chatBox = document.getElementById("waChatBox");
    if (chatBox.classList.contains("active") && !container.contains(e.target)) {
      toggleWaChat(false);
    }
  });
 
///Boton volver arriba
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") toggleWaChat(false);
  });
 
  const topBtn = document.getElementById("waTopBtn");
  const toggleTopBtn = () => topBtn.classList.toggle("visible", window.scrollY > 400);
  toggleTopBtn();
  window.addEventListener("scroll", toggleTopBtn, { passive: true });
});
 
function scrollToInicio() {
  const target = document.getElementById("inicio");
  if (target) {
    target.scrollIntoView({ behavior: "smooth", block: "start" });
  } else {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }
}
/////certificacion
document.getElementById('verCertificado').addEventListener('click', function (e) {
    e.preventDefault();
    document.getElementById('certModal').classList.add('active');
});
document.getElementById('certModalClose').addEventListener('click', function () {
    document.getElementById('certModal').classList.remove('active');
});
document.getElementById('certModal').addEventListener('click', function (e) {
    if (e.target === this) this.classList.remove('active');
});

///////testimonios
document.addEventListener('DOMContentLoaded', () => {
  const track = document.querySelector('.carrusel-track');
  const testimonios = document.querySelectorAll('.testimonio');
  const dotsContainer = document.querySelector('.carrusel-dots');
  const btnIzq = document.querySelector('.flecha-izq');
  const btnDer = document.querySelector('.flecha-der');
  let indiceActual = 0;
  const total = testimonios.length;
  testimonios.forEach((_, i) => {
      const dot = document.createElement('button');
      dot.classList.add('dot');
      if (i === 0) dot.classList.add('activo');
      dot.addEventListener('click', () => irATestimonio(i));
      dotsContainer.appendChild(dot);
  });
  const dots = document.querySelectorAll('.dot');
  function actualizarCarrusel(){
      track.style.transform = `translateX(-${indiceActual * 100}%)`;
      dots.forEach(d => d.classList.remove('activo'));
      dots[indiceActual].classList.add('activo');
  }
  function irATestimonio(i){
      indiceActual = i;
      actualizarCarrusel();
  }
  btnDer.addEventListener('click', () => {
      indiceActual = (indiceActual + 1) % total;
      actualizarCarrusel();
  });
  btnIzq.addEventListener('click', () => {
      indiceActual = (indiceActual - 1 + total) % total;
      actualizarCarrusel();
  });
  setInterval(() => {
      indiceActual = (indiceActual + 1) % total;
      actualizarCarrusel();
  }, 10000);
});

/////carrusel nosotros
document.addEventListener("DOMContentLoaded", () => {
  const pistaCarrusel = document.getElementById("pistaCarrusel");
  const botonAnterior = document.getElementById("botonAnterior");
  const botonSiguiente = document.getElementById("botonSiguiente");
  const contenedorIndicadores = document.getElementById("contenedorIndicadores");
  const tarjetas = document.querySelectorAll(".tarjeta-equipo");

  let indiceActual = 0;

  function obtenerTarjetasVisibles() {
    if (window.innerWidth <= 600) return 1;
    if (window.innerWidth <= 900) return 2;
    return 3;
  }

  function obtenerMaxIndice() {
    return Math.max(0, tarjetas.length - obtenerTarjetasVisibles());
  }

  function crearIndicadores() {
    contenedorIndicadores.innerHTML = "";
    const totalPuntos = obtenerMaxIndice() + 1;

    for (let i = 0; i < totalPuntos; i++) {
      const punto = document.createElement("button");
      punto.classList.add("punto-indicador");
      punto.setAttribute("aria-label", `Ir a la diapositiva ${i + 1}`);
      if (i === indiceActual) punto.classList.add("activo");

      punto.addEventListener("click", () => moverACarrusel(i));
      contenedorIndicadores.appendChild(punto);
    }
  }

  function actualizarIndicadores() {
    const puntos = contenedorIndicadores.querySelectorAll(".punto-indicador");
    puntos.forEach((punto, i) => {
      punto.classList.toggle("activo", i === indiceActual);
    });
  }

  function moverACarrusel(indice) {
    const maxIndice = obtenerMaxIndice();

    if (indice < 0) {
      indiceActual = maxIndice;
    } else if (indice > maxIndice) {
      indiceActual = 0;
    } else {
      indiceActual = indice;
    }

    const tarjetaAncho = tarjetas[0].getBoundingClientRect().width;
    const gap = 20; // Espaciado entre elementos CSS
    const desplazamiento = (tarjetaAncho + gap) * indiceActual;

    pistaCarrusel.style.transform = `translateX(-${desplazamiento}px)`;
    actualizarIndicadores();
  }

  botonSiguiente.addEventListener("click", () => moverACarrusel(indiceActual + 1));
  botonAnterior.addEventListener("click", () => moverACarrusel(indiceActual - 1));

  let resizeTimeout;
  window.addEventListener("resize", () => {
    clearTimeout(resizeTimeout);
    resizeTimeout = setTimeout(() => {
      if (indiceActual > obtenerMaxIndice()) {
        indiceActual = obtenerMaxIndice();
      }
      crearIndicadores();
      moverACarrusel(indiceActual);
    }, 100);
  });

  crearIndicadores();
  moverACarrusel(0);
});

/////carrusel productos
document.addEventListener('DOMContentLoaded', () => {
    const items = document.querySelectorAll('.cards .item');
    const dotsContainer = document.querySelector('.dots');
    const prevBtn = document.querySelector('.prev-btn');
    const nextBtn = document.querySelector('.next-btn');
    let currentIndex = 0;
    const totalItems = items.length;
    items.forEach((_, index) => {
        const dot = document.createElement('span');
        dot.classList.add('dot');
        if (index === 0) dot.classList.add('active');
        dot.addEventListener('click', () => updateCarousel(index));
        dotsContainer.appendChild(dot);
    });
    const dots = document.querySelectorAll('.dots .dot');
    function updateCarousel(newIndex) {
        currentIndex = (newIndex + totalItems) % totalItems;
        items.forEach((item, i) => {
            item.className = 'item';
            let diff = i - currentIndex;
            if (diff < -Math.floor(totalItems / 2)) diff += totalItems;
            if (diff > Math.floor(totalItems / 2)) diff -= totalItems;

            // Asignar posición según la diferencia
            if (diff === 0) {
                item.classList.add('active');
            } else if (diff === 1) {
                item.classList.add('next-1');
            } else if (diff === 2) {
                item.classList.add('next-2');
            } else if (diff === -1) {
                item.classList.add('prev-1');
            } else if (diff === -2) {
                item.classList.add('prev-2');
            }
        });
        items.forEach((item, i) => {
            item.onclick = () => updateCarousel(i);
        });
        dots.forEach((dot, index) => {
            dot.classList.toggle('active', index === currentIndex);
        });
    }
    nextBtn.addEventListener('click', () => updateCarousel(currentIndex + 1));
    prevBtn.addEventListener('click', () => updateCarousel(currentIndex - 1));
    updateCarousel(0);
});