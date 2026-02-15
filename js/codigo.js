// js/script.js - VERSIÓN ACTUALIZADA CON BOTÓN EN HAMBURGUESA
document.addEventListener('DOMContentLoaded', function() {
    // ===== VARIABLES GLOBALES =====
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');
    const header = document.querySelector('.header');
    const themeToggle = document.querySelector('.theme-toggle');
    const scrollTopBtn = document.querySelector('.scroll-top');
    
    // ===== NAVEGACIÓN HAMBURGUESA =====
    if (hamburger) {
        hamburger.addEventListener('click', function() {
            hamburger.classList.toggle('active');
            navMenu.classList.toggle('active');
            
            // Si se abre el menú hamburguesa, mover el botón de tema dentro
            if (navMenu.classList.contains('active')) {
                moveThemeToggleToMobileMenu();
            } else {
                moveThemeToggleToDesktop();
            }
        });
        
        // Cerrar menú al hacer clic en un enlace
        document.querySelectorAll('.nav-link').forEach(link => {
            link.addEventListener('click', function() {
                hamburger.classList.remove('active');
                navMenu.classList.remove('active');
                moveThemeToggleToDesktop();
            });
        });
    }
    
    // ===== FUNCIÓN PARA MOVER BOTÓN DE TEMA A MENÚ MÓVIL =====
    function moveThemeToggleToMobileMenu() {
        const themeToggle = document.querySelector('.theme-toggle');
        if (!themeToggle || !navMenu) return;
        
        // Crear un contenedor para el botón en móvil
        const mobileThemeContainer = document.createElement('li');
        mobileThemeContainer.className = 'nav-item theme-toggle-mobile';
        
        // Clonar el botón de tema
        const themeClone = themeToggle.cloneNode(true);
        themeClone.classList.add('mobile-only');
        
        // Agregar event listener al clon
        themeClone.addEventListener('click', function() {
            toggleTheme();
        });
        
        mobileThemeContainer.appendChild(themeClone);
        navMenu.appendChild(mobileThemeContainer);
        
        // Ocultar el botón original en desktop
        themeToggle.style.display = 'none';
    }
    
    // ===== FUNCIÓN PARA DEVOLVER BOTÓN A POSICIÓN DESKTOP =====
    function moveThemeToggleToDesktop() {
        const themeToggle = document.querySelector('.theme-toggle');
        const mobileThemeItem = document.querySelector('.theme-toggle-mobile');
        
        if (mobileThemeItem) {
            mobileThemeItem.remove();
        }
        
        if (themeToggle) {
            themeToggle.style.display = 'flex';
        }
    }
    
    // ===== TOGGLE DEL TEMA =====
    function toggleTheme() {
        const isDarkMode = document.body.classList.toggle('dark-mode');
        const themeIcon = document.querySelector('.theme-toggle i');
        const mobileThemeIcon = document.querySelector('.theme-toggle.mobile-only i');
        
        // Guardar preferencia en localStorage
        if (isDarkMode) {
            localStorage.setItem('theme', 'dark');
            updateThemeIcons('fas fa-sun', 'Cambiar a modo claro');
        } else {
            localStorage.setItem('theme', 'light');
            updateThemeIcons('fas fa-moon', 'Cambiar a modo oscuro');
        }
    }
    
    // ===== FUNCIÓN PARA ACTUALIZAR ÍCONOS DEL TEMA =====
    function updateThemeIcons(iconClass, ariaLabel) {
        // Actualizar todos los botones de tema
        document.querySelectorAll('.theme-toggle').forEach(btn => {
            const icon = btn.querySelector('i');
            if (icon) {
                icon.className = iconClass;
            }
            btn.setAttribute('aria-label', ariaLabel);
            btn.setAttribute('title', ariaLabel);
        });
    }
    
    // ===== INICIALIZAR TEMA =====
    function initializeTheme() {
        const prefersDarkScheme = window.matchMedia('(prefers-color-scheme: dark)');
        const currentTheme = localStorage.getItem('theme');
        
        // Aplicar tema guardado o preferencia del sistema
        if (currentTheme === 'dark' || (!currentTheme && prefersDarkScheme.matches)) {
            document.body.classList.add('dark-mode');
            updateThemeIcons('fas fa-sun', 'Cambiar a modo claro');
        } else {
            updateThemeIcons('fas fa-moon', 'Cambiar a modo oscuro');
        }
        
        // Configurar event listener para el botón de tema principal
        if (themeToggle) {
            themeToggle.addEventListener('click', toggleTheme);
        }
    }
    
    // ===== HEADER CON SCROLL =====
    window.addEventListener('scroll', function() {
        // Efecto en el header al hacer scroll
        if (window.scrollY > 100) {
            header.style.boxShadow = '0 5px 15px rgba(0, 0, 0, 0.1)';
            header.style.padding = '10px 0';
        } else {
            header.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.05)';
            header.style.padding = '15px 0';
        }
        
        // Mostrar/ocultar botón de scroll arriba
        if (scrollTopBtn) {
            if (window.scrollY > 300) {
                scrollTopBtn.classList.add('show');
            } else {
                scrollTopBtn.classList.remove('show');
            }
        }
    });
    
    // ===== BOTÓN SCROLL ARRIBA =====
    if (scrollTopBtn) {
        scrollTopBtn.addEventListener('click', function() {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }
    
    // ===== AÑADIR AÑO ACTUAL AL FOOTER =====
    const yearElement = document.querySelector('#current-year');
    if (yearElement) {
        yearElement.textContent = new Date().getFullYear();
    }
    
    // ===== INICIALIZAR BARRAS DE HABILIDADES =====
    if (document.querySelector('.skill-progress')) {
        initializeSkillBars();
    }
    
    // ===== MANEJO DEL FORMULARIO DE CONTACTO =====
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Validación básica
            const name = document.getElementById('name').value.trim();
            const email = document.getElementById('email').value.trim();
            const message = document.getElementById('message').value.trim();
            
            if (!name || !email || !message) {
                alert('Por favor, completa todos los campos obligatorios (*)');
                return;
            }
            
            // Validación de email
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(email)) {
                alert('Por favor, introduce un correo electrónico válido');
                return;
            }
            
            const submitBtn = contactForm.querySelector('button[type="submit"]');
            const originalText = submitBtn.textContent;
            
            submitBtn.textContent = 'Enviando...';
            submitBtn.disabled = true;
            
            // Simulación de envío
            setTimeout(() => {
                // Mostrar mensaje de éxito
                showNotification('¡Mensaje enviado con éxito! Te responderé lo antes posible.', 'success');
                contactForm.reset();
                submitBtn.textContent = originalText;
                submitBtn.disabled = false;
            }, 1500);
        });
    }
    
    // ===== INICIALIZAR TEMA AL CARGAR =====
    initializeTheme();
    
    // ===== DETECTAR CAMBIOS DE TAMAÑO DE PANTALLA =====
    window.addEventListener('resize', function() {
        // Si estamos en desktop y el menú está cerrado, asegurar que el botón esté en su lugar
        if (window.innerWidth > 768 && !navMenu.classList.contains('active')) {
            moveThemeToggleToDesktop();
        }
    });
});

// ===== FUNCIÓN PARA ANIMAR BARRAS DE HABILIDADES =====
function initializeSkillBars() {
    const skillBars = document.querySelectorAll('.skill-progress');
    
    skillBars.forEach(bar => {
        const level = bar.getAttribute('data-level');
        bar.style.width = level;
        
        // Animación al hacer scroll
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    bar.style.transition = 'width 1.5s ease-in-out';
                    bar.style.width = level;
                }
            });
        }, { threshold: 0.5 });
        
        observer.observe(bar);
    });
}

// ===== FUNCIÓN PARA MOSTRAR NOTIFICACIONES =====
function showNotification(message, type = 'info') {
    // Crear elemento de notificación
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.textContent = message;
    
    // Estilos para la notificación
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        padding: 15px 20px;
        border-radius: 8px;
        color: white;
        font-weight: 500;
        z-index: 10000;
        box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
        transform: translateX(150%);
        transition: transform 0.3s ease;
        max-width: 400px;
    `;
    
    // Color según tipo
    if (type === 'success') {
        notification.style.backgroundColor = '#10b981';
    } else if (type === 'error') {
        notification.style.backgroundColor = '#ef4444';
    } else {
        notification.style.backgroundColor = '#3b82f6';
    }
    
    document.body.appendChild(notification);
    
    // Mostrar notificación
    setTimeout(() => {
        notification.style.transform = 'translateX(0)';
    }, 10);
    
    // Ocultar después de 5 segundos
    setTimeout(() => {
        notification.style.transform = 'translateX(150%)';
        setTimeout(() => {
            if (notification.parentNode) {
                notification.parentNode.removeChild(notification);
            }
        }, 300);
    }, 5000);
}