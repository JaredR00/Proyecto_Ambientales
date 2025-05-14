document.addEventListener('DOMContentLoaded', function() {
    // Animaciones al hacer scroll
    const animateOnScroll = function() {
        const elements = document.querySelectorAll('.animate__animated');
        
        elements.forEach(element => {
            const elementPosition = element.getBoundingClientRect().top;
            const screenPosition = window.innerHeight / 1.3;
            
            if (elementPosition < screenPosition) {
                element.style.visibility = 'visible';
                element.classList.add(element.getAttribute('data-animation'));
            }
        });
    };

    // Mostrar elementos al cargar y al hacer scroll
    window.addEventListener('load', animateOnScroll);
    window.addEventListener('scroll', animateOnScroll);

    // Modal de información
    const modal = document.getElementById('infoModal');
    const modalBody = document.getElementById('modalBody');

    // Contenido para los modales
    const modalContent = {
        tipos: `
            <h2><i class="fas fa-trash-alt"></i> Tipos de Residuos</h2>
            <div class="modal-grid">
                <div class="modal-item">
                    <div class="modal-icon organic">
                        <i class="fas fa-apple-alt"></i>
                    </div>
                    <h3>Orgánicos</h3>
                    <p>Restos de comida, cáscaras, residuos de jardín. Se descomponen naturalmente.</p>
                </div>
                <div class="modal-item">
                    <div class="modal-icon recyclable">
                        <i class="fas fa-plastic-bottle"></i>
                    </div>
                    <h3>Inorgánicos</h3>
                    <p>Plásticos, vidrio, metales, papel. Pueden reciclarse para fabricar nuevos productos.</p>
                </div>
                <div class="modal-item">
                    <div class="modal-icon electronic">
                        <i class="fas fa-laptop"></i>
                    </div>
                    <h3>Electrónicos</h3>
                    <p>Dispositivos electrónicos, baterías. Contienen materiales valiosos y peligrosos.</p>
                </div>
                <div class="modal-item">
                    <div class="modal-icon hazardous">
                        <i class="fas fa-skull-crossbones"></i>
                    </div>
                    <h3>Peligrosos</h3>
                    <p>Productos químicos, medicamentos, pinturas. Requieren tratamiento especial.</p>
                </div>
            </div>
        `,
        contenedores: `
            <h2><i class="fas fa-trash-restore"></i> Colores de Contenedores</h2>
            <div class="modal-table">
                <div class="table-row header">
                    <div class="table-cell">Color</div>
                    <div class="table-cell">Tipo</div>
                    <div class="table-cell">Ejemplos</div>
                </div>
                <div class="table-row">
                    <div class="table-cell color-box" style="background-color: #1976D2;">Azul</div>
                    <div class="table-cell">Papel y cartón</div>
                    <div class="table-cell">Periódicos, revistas, cajas</div>
                </div>
                <div class="table-row">
                    <div class="table-cell color-box" style="background-color: #FDD835;">Amarillo</div>
                    <div class="table-cell">Plásticos y latas</div>
                    <div class="table-cell">Botellas, envases, latas</div>
                </div>
                <div class="table-row">
                    <div class="table-cell color-box" style="background-color: #388E3C;">Verde</div>
                    <div class="table-cell">Vidrio</div>
                    <div class="table-cell">Botellas, frascos</div>
                </div>
                <div class="table-row">
                    <div class="table-cell color-box" style="background-color: #D32F2F;">Rojo</div>
                    <div class="table-cell">Peligrosos</div>
                    <div class="table-cell">Baterías, medicamentos</div>
                </div>
            </div>
        `,
        beneficios: `
            <h2><i class="fas fa-seedling"></i> Beneficios del Reciclaje</h2>
            <div class="benefits-container">
                <div class="benefit-card">
                    <i class="fas fa-globe-americas"></i>
                    <h3>Protege el medio ambiente</h3>
                    <p>Reduce la contaminación del aire, agua y suelo.</p>
                </div>
                <div class="benefit-card">
                    <i class="fas fa-bolt"></i>
                    <h3>Ahorra energía</h3>
                    <p>Reciclar requiere menos energía que producir nuevos materiales.</p>
                </div>
                <div class="benefit-card">
                    <i class="fas fa-tree"></i>
                    <h3>Conserva recursos</h3>
                    <p>Reduce la necesidad de extraer materias primas.</p>
                </div>
                <div class="benefit-card">
                    <i class="fas fa-users"></i>
                    <h3>Crea empleos</h3>
                    <p>La industria del reciclaje genera puestos de trabajo.</p>
                </div>
            </div>
            <div class="modal-cta">
                <p>¡Empieza a reciclar hoy y marca la diferencia!</p>
            </div>
        `
    };

    // Mostrar modal
    window.showModal = function(type) {
        modalBody.innerHTML = modalContent[type] || '<p>Información no disponible</p>';
        modal.style.display = 'flex';
        document.body.style.overflow = 'hidden';
    };

    // Cerrar modal
    window.closeModal = function() {
        modal.style.display = 'none';
        document.body.style.overflow = 'auto';
    };

    // Cerrar al hacer clic fuera del contenido
    modal.addEventListener('click', function(e) {
        if (e.target === modal) {
            closeModal();
        }
    });

    // Función para desplazamiento suave
    window.scrollToSection = function(id) {
        const element = document.getElementById(id);
        if (element) {
            window.scrollTo({
                top: element.offsetTop - 80,
                behavior: 'smooth'
            });
        }
    };

    // Botón de descarga (simulado)
    document.querySelector('.download-btn')?.addEventListener('click', function() {
        alert('¡Gracias por tu interés! La guía se descargará pronto.');
    });
});