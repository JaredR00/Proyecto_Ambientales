document.addEventListener('DOMContentLoaded', function() {
    // Elementos del DOM
    const itemsContainer = document.getElementById('itemsContainer');
    const startScreen = document.getElementById('startScreen');
    const endScreen = document.getElementById('endScreen');
    const startBtn = document.getElementById('startBtn');
    const restartBtn = document.getElementById('restartBtn');
    const scoreElement = document.getElementById('score');
    const finalScoreElement = document.getElementById('finalScore');
    const timeElement = document.getElementById('time');
    const resultTitle = document.getElementById('resultTitle');
    const resultMessage = document.getElementById('resultMessage');
    const bins = document.querySelectorAll('.bin');

    // Variables del juego
    let score = 0;
    let timeLeft = 60;
    let gameInterval;
    let currentItems = [];
    let draggedItem = null;

    // Tipos de residuos
    const wasteItems = [
        { name: "Cáscara de plátano", icon: "fas fa-banana", type: "organico" },
        { name: "Botella de plástico", icon: "fas fa-wine-bottle", type: "reciclable" },
        { name: "Batería", icon: "fas fa-battery-full", type: "peligroso" },
        { name: "Pañal", icon: "fas fa-baby", type: "no-reciclable" },
        { name: "Papel", icon: "fas fa-file-alt", type: "reciclable" },
        { name: "Envase de vidrio", icon: "fas fa-glass-whiskey", type: "reciclable" },
        { name: "Restos de comida", icon: "fas fa-drumstick-bite", type: "organico" },
        { name: "Medicamentos", icon: "fas fa-pills", type: "peligroso" },
        { name: "Pila", icon: "fas fa-battery-quarter", type: "peligroso" },
        { name: "Colilla", icon: "fas fa-smoking", type: "no-reciclable" },
        { name: "Aceite usado", icon: "fas fa-oil-can", type: "peligroso" },
        { name: "Tetrabrik", icon: "fas fa-cube", type: "reciclable" },
        { name: "Chicle", icon: "fas fa-circle", type: "no-reciclable" },
        { name: "Ropa vieja", icon: "fas fa-tshirt", type: "no-reciclable" },
        { name: "Bolsita de té", icon: "fas fa-mug-hot", type: "organico" },
        { name: "Lata de aluminio", icon: "fas fa-wine-bottle", type: "reciclable" }
    ];

    // Event Listeners
    startBtn.addEventListener('click', startGame);
    restartBtn.addEventListener('click', restartGame);

    // Configurar eventos de arrastre
    function setupDragAndDrop() {
        const items = document.querySelectorAll('.waste-item');
        
        items.forEach(item => {
            item.addEventListener('dragstart', dragStart);
            item.addEventListener('dragend', dragEnd);
        });

        bins.forEach(bin => {
            bin.addEventListener('dragover', dragOver);
            bin.addEventListener('dragenter', dragEnter);
            bin.addEventListener('dragleave', dragLeave);
            bin.addEventListener('drop', drop);
        });
    }

    // Funciones de arrastre
    function dragStart() {
        draggedItem = this;
        this.classList.add('dragging');
        setTimeout(() => this.style.opacity = '0.4', 0);
    }

    function dragEnd() {
        this.classList.remove('dragging');
        this.style.opacity = '1';
    }

    function dragOver(e) {
        e.preventDefault();
    }

    function dragEnter(e) {
        e.preventDefault();
        this.classList.add('hovered');
    }

    function dragLeave() {
        this.classList.remove('hovered');
    }

    function drop() {
        this.classList.remove('hovered');
        const binType = this.dataset.type;
        const itemType = draggedItem.dataset.type;

        // Verificar si la clasificación es correcta
        if (binType === itemType) {
            score += 10;
            scoreElement.textContent = score;
            showFeedback(draggedItem, true);
            
            // Eliminar el residuo correctamente clasificado
            setTimeout(() => {
                const index = currentItems.findIndex(item => item.name === draggedItem.dataset.name);
                if (index !== -1) {
                    currentItems.splice(index, 1);
                }
                draggedItem.remove();
                
                // Añadir nuevo residuo si quedan menos de 4
                if (currentItems.length < 4) {
                    addRandomWasteItem();
                }
            }, 500);
        } else {
            showFeedback(draggedItem, false);
        }
    }

    // Mostrar feedback visual
    function showFeedback(item, isCorrect) {
        const feedback = document.createElement('div');
        feedback.classList.add(isCorrect ? 'correct-feedback' : 'wrong-feedback');
        feedback.innerHTML = isCorrect ? '<i class="fas fa-check"></i>' : '<i class="fas fa-times"></i>';
        
        item.style.position = 'relative';
        item.appendChild(feedback);
        
        setTimeout(() => {
            feedback.remove();
        }, 1000);
    }

    // Iniciar juego
    function startGame() {
        score = 0;
        timeLeft = 60;
        scoreElement.textContent = score;
        timeElement.textContent = timeLeft;
        
        startScreen.style.display = 'none';
        endScreen.style.display = 'none';
        itemsContainer.innerHTML = '';
        currentItems = [];
        
        // Generar 4 residuos iniciales
        for (let i = 0; i < 4; i++) {
            addRandomWasteItem();
        }
        
        // Iniciar temporizador
        gameInterval = setInterval(updateTimer, 1000);
        
        // Configurar arrastrar y soltar
        setTimeout(setupDragAndDrop, 100);
    }

    // Añadir nuevo residuo aleatorio
    function addRandomWasteItem() {
        if (currentItems.length >= 8) return;
        
        const availableItems = wasteItems.filter(item => 
            !currentItems.some(current => current.name === item.name)
        );
        
        if (availableItems.length === 0) return;
        
        const randomItem = availableItems[Math.floor(Math.random() * availableItems.length)];
        currentItems.push(randomItem);
        
        const itemElement = document.createElement('div');
        itemElement.className = 'waste-item';
        itemElement.draggable = true;
        itemElement.dataset.name = randomItem.name;
        itemElement.dataset.type = randomItem.type;
        itemElement.innerHTML = `
            <i class="${randomItem.icon}"></i>
            <span>${randomItem.name}</span>
        `;
        
        itemsContainer.appendChild(itemElement);
        itemElement.classList.add('animate__animated', 'animate__fadeIn');
    }

    // Actualizar temporizador
    function updateTimer() {
        timeLeft--;
        timeElement.textContent = timeLeft;
        
        if (timeLeft <= 10) {
            timeElement.style.color = '#d32f2f';
            timeElement.classList.add('animate__animated', 'animate__pulse');
        }
        
        if (timeLeft <= 0) {
            endGame();
        }
    }

    // Finalizar juego
    function endGame() {
        clearInterval(gameInterval);
        endScreen.style.display = 'flex';
        finalScoreElement.textContent = score;
        
        // Mostrar mensaje según el puntaje
        if (score >= 300) {
            resultTitle.textContent = "¡Excelente clasificación! 🌟";
            resultMessage.textContent = "Eres un experto en reciclaje. ¡Sigue ayudando al planeta!";
        } else if (score >= 150) {
            resultTitle.textContent = "¡Buen trabajo! 👍";
            resultMessage.textContent = "Tienes buenos conocimientos, pero aún puedes mejorar tu clasificación.";
        } else {
            resultTitle.textContent = "¡Sigue practicando! 📚";
            resultMessage.textContent = "El reciclaje es importante. Te invitamos a aprender más sobre cómo clasificar residuos.";
        }
    }

    // Reiniciar juego
    function restartGame() {
        endScreen.style.display = 'none';
        startGame();
    }
});
