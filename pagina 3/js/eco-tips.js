// Array de tips ecológicos mejorado
const tips = [
    { text: "🌎 Apaga los aparatos electrónicos que no estés usando", category: "energía" },
    { text: "🧃 Reutiliza envases plásticos para manualidades o macetas", category: "reciclaje" },
    { text: "🗑️ Separa los residuos correctamente: orgánicos, reciclables y no reciclables", category: "reciclaje" },
    { text: "🛍️ Lleva tu propia bolsa reutilizable al supermercado", category: "consumo" },
    { text: "💧 Cierra el grifo mientras te cepillas los dientes", category: "agua" },
    { text: "🚴 Usa bicicleta o camina para trayectos cortos, ayuda al planeta", category: "transporte" },
    { text: "🔌 Desconecta los cargadores si no los estás usando", category: "energía" },
    { text: "📦 Usa cartón reciclado para empacar regalos o guardar cosas", category: "reciclaje" },
    { text: "🍃 Planta un árbol o cuida una planta en casa", category: "naturaleza" },
    { text: "🖨️ Imprime solo cuando sea realmente necesario", category: "papel" },
    { text: "♻️ Participa en campañas locales de reciclaje", category: "comunidad" },
    { text: "🎁 Reutiliza papel de regalo para otras ocasiones", category: "consumo" },
    { text: "🌞 Aprovecha la luz natural el mayor tiempo posible", category: "energía" },
    { text: "🧼 Usa jabones y productos biodegradables", category: "consumo" },
    { text: "👖 Dona ropa que ya no uses en lugar de desecharla", category: "consumo" }
];

// Elementos del DOM
const tipBox = document.getElementById('tipBox');
const newTipBtn = document.getElementById('newTipBtn');
const favBtn = document.getElementById('favBtn');
const tipCounter = document.getElementById('tipCounter');
const totalTips = document.getElementById('totalTips');
const progressBar = document.getElementById('progressBar');
const favoritesContainer = document.getElementById('favoritesContainer');
const favoritesList = document.getElementById('favoritesList');

// Variables de estado
let lastTipIndex = -1;
let tipCount = 1;
let favorites = JSON.parse(localStorage.getItem('ecoFavorites')) || [];

// Inicialización
totalTips.textContent = tips.length;
updateProgressBar();
renderFavorites();
showRandomTip();

// Mostrar un tip aleatorio
function showRandomTip() {
    // Animación de desvanecimiento
    tipBox.style.animation = 'fadeOut 0.3s ease';
    
    setTimeout(() => {
        let index;
        do {
            index = Math.floor(Math.random() * tips.length);
        } while (index === lastTipIndex && tips.length > 1);
        
        lastTipIndex = index;
        const tip = tips[index];
        
        // Mostrar el nuevo tip con animación
        tipBox.innerHTML = `
            <div class="tip-category">${tip.category.toUpperCase()}</div>
            <div class="tip-text">${tip.text}</div>
        `;
        
        tipBox.style.animation = 'fadeIn 0.5s ease';
        
        // Actualizar contador y progreso
        tipCount++;
        tipCounter.textContent = tipCount;
        updateProgressBar();
        
        // Efecto de "pulse" en el botón
        newTipBtn.classList.add('animate__pulse');
        setTimeout(() => {
            newTipBtn.classList.remove('animate__pulse');
        }, 1000);
    }, 300);
}

// Actualizar barra de progreso
function updateProgressBar() {
    const progress = (tipCount / tips.length) * 100;
    progressBar.style.width = `${Math.min(progress, 100)}%`;
}

// Guardar favorito
function saveFavorite() {
    const currentTip = tipBox.textContent.trim();
    
    if (!favorites.includes(currentTip)) {
        favorites.push(currentTip);
        localStorage.setItem('ecoFavorites', JSON.stringify(favorites));
        
        // Efecto visual
        favBtn.innerHTML = '<span class="btn-icon">✅</span> Guardado!';
        setTimeout(() => {
            favBtn.innerHTML = '<span class="btn-icon">⭐</span> Guardar';
        }, 2000);
        
        renderFavorites();
    }
}

// Mostrar favoritos
function renderFavorites() {
    if (favorites.length > 0) {
        favoritesContainer.style.display = 'block';
        favoritesList.innerHTML = favorites.map(fav => 
            `<li>${fav}</li>`
        ).join('');
    } else {
        favoritesContainer.style.display = 'none';
    }
}

// Event Listeners
newTipBtn.addEventListener('click', showRandomTip);
favBtn.addEventListener('click', saveFavorite);

// Efecto al pasar el ratón sobre los tips
tipBox.addEventListener('mouseenter', () => {
    tipBox.style.transform = 'translateY(-5px)';
    tipBox.style.boxShadow = '0 10px 20px rgba(0, 0, 0, 0.1)';
});

tipBox.addEventListener('mouseleave', () => {
    tipBox.style.transform = '';
    tipBox.style.boxShadow = '';
});

// Service Worker para PWA (opcional)
if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
        navigator.serviceWorker.register('/sw.js')
            .then(registration => {
                console.log('ServiceWorker registrado con éxito:', registration.scope);
            })
            .catch(error => {
                console.log('Error al registrar ServiceWorker:', error);
            });
    });
}