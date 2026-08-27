document.addEventListener('DOMContentLoaded', () => {
  const botonHamburguesa = document.getElementById('boton-hamburguesa');
  const botonCerrar = document.getElementById('boton-cerrar');
  const menuLateral = document.getElementById('menu-lateral');
  const capaOscura = document.getElementById('capa-oscura');
  
  const botonModoClaro = document.getElementById('boton-modo-claro');
  const botonModoOscuro = document.getElementById('boton-modo-oscuro');
  const logoPrincipal = document.getElementById('logo-principal');
  const elementoHtml = document.documentElement;

  function abrirMenu() {
    menuLateral.classList.add('abierto');
    capaOscura.classList.add('visible');
  }

  function cerrarMenu() {
    menuLateral.classList.remove('abierto');
    capaOscura.classList.remove('visible');
  }

  botonHamburguesa.addEventListener('click', abrirMenu);
  botonCerrar.addEventListener('click', cerrarMenu);
  capaOscura.addEventListener('click', cerrarMenu);

  function activarModoClaro() {
    elementoHtml.setAttribute('data-tema', 'claro');
    botonModoClaro.classList.add('activo');
    botonModoOscuro.classList.remove('activo');
    logoPrincipal.src = './datos/logo-modo-claro.png';
  }

  function activarModoOscuro() {
    elementoHtml.setAttribute('data-tema', 'oscuro');
    botonModoOscuro.classList.add('activo');
    botonModoClaro.classList.remove('activo');
    logoPrincipal.src = './datos/logo-modo-oscuro.png';
  }

  botonModoClaro.addEventListener('click', activarModoClaro);
  botonModoOscuro.addEventListener('click', activarModoOscuro);
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

          indice = i + clones;
          posicionar(false);
          posicionar(true);
        });

        puntosContainer.appendChild(punto);
      });
    }

    const puntos = puntosContainer
      ? Array.from(puntosContainer.children)
      : [];

    function obtenerTransformX() {
      const transform =
        getComputedStyle(pista).transform;

      if (!transform || transform === "none") {
        return 0;
      }

      return new DOMMatrix(transform).m41;
    }

    function posicionar(conTransicion = true) {
      const tarjeta = pista.children[indice];

      if (!tarjeta) return;

      pista.classList.toggle(
        "con-transicion",
        conTransicion
      );

      const rect =
        tarjeta.getBoundingClientRect();

      const centroTarjeta =
        rect.left + rect.width / 2;

      const centroPagina =
        window.innerWidth / 2;

      const diferencia =
        centroPagina - centroTarjeta;

      const transformActual =
        obtenerTransformX();

      pista.style.transform =
        `translate3d(${transformActual + diferencia}px, 0, 0)`;

      actualizarEstado();
    }

    function actualizarEstado() {
      const tarjetas =
        Array.from(pista.children);

      tarjetas.forEach((tarjeta, i) => {
        tarjeta.classList.toggle(
          "activa",
          i === indice
        );
      });

      let real =
        (indice - clones) % total;

      if (real < 0) {
        real += total;
      }

      puntos.forEach((punto, i) => {
        punto.classList.toggle(
          "activo",
          i === real
        );
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
