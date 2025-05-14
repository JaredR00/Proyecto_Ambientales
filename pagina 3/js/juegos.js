document.addEventListener('DOMContentLoaded', function() {
    // Elementos del DOM
    const gameCards = document.querySelectorAll('.juego-card');
    const gameModal = document.getElementById('gameModal');
    const modalBody = document.getElementById('modalBody');
    const closeModal = document.querySelector('.close-modal');
    const backBtn = document.getElementById('backBtn');
    
    // Datos de los juegos
    const games = {
        memory: {
            title: 'Memoria Ecológica',
            emojis: ['🌍', '🌱', '♻️', '💧', '🌞', '🌳', '🚲', '🛍️'],
            description: 'Encuentra todas las parejas de símbolos ecológicos'
        },
        quiz: {
            title: 'Quiz Ambiental',
            description: 'Responde preguntas sobre ecología y sostenibilidad'
        },
        sorting: {
            title: 'Clasifica los Residuos',
            description: 'Aprende a separar correctamente los diferentes tipos de desechos'
        }
    };
    
    // Event listeners
    gameCards.forEach(card => {
        card.addEventListener('click', () => loadGame(card.dataset.game));
    });
    
    closeModal.addEventListener('click', closeGameModal);
    backBtn.addEventListener('click', () => {
        window.location.href = 'index.html';
    });
    
    // Cerrar modal al hacer clic fuera del contenido
    gameModal.addEventListener('click', (e) => {
        if (e.target === gameModal) {
            closeGameModal();
        }
    });
    
    // Función para cargar un juego
    function loadGame(gameType) {
        modalBody.innerHTML = '';
        
        switch(gameType) {
            case 'memory':
                setupMemoryGame();
                break;
            case 'quiz':
                setupQuizGame();
                break;
            case 'sorting':
                setupSortingGame();
                break;
            default:
                setupMemoryGame();
        }
        
        gameModal.style.display = 'flex';
        document.body.style.overflow = 'hidden';
    }
    
    // Función para cerrar el modal
    function closeGameModal() {
        gameModal.style.display = 'none';
        document.body.style.overflow = 'auto';
    }
    
    // Configurar juego de memoria
    function setupMemoryGame() {
        const gameData = games.memory;
        const emojis = [...gameData.emojis, ...gameData.emojis]; // Duplicar para tener parejas
        const shuffledEmojis = shuffleArray(emojis);
        
        modalBody.innerHTML = `
            <h2>${gameData.title}</h2>
            <p>${gameData.description}</p>
            <div id="game-info">
                <span>Intentos: <span id="attempts">0</span></span>
                <span>Parejas: <span id="matches">0</span>/8</span>
            </div>
            <div class="memory-board" id="memoryBoard"></div>
            <div id="game-over">
                <p>¡Felicidades! Has completado el juego.</p>
                <button id="playAgain">Jugar de nuevo</button>
            </div>
        `;
        
        const memoryBoard = document.getElementById('memoryBoard');
        
        // Crear las cartas
        shuffledEmojis.forEach(emoji => {
            const card = document.createElement('div');
            card.className = 'card';
            card.innerHTML = `
                <div class="card-face card-front">${emoji}</div>
                <div class="card-face card-back">?</div>
            `;
            memoryBoard.appendChild(card);
        });
        
        // Lógica del juego
        let hasFlippedCard = false;
        let lockBoard = false;
        let firstCard, secondCard;
        let attempts = 0;
        let matches = 0;
        const totalPairs = gameData.emojis.length;
        
        function flipCard() {
            if (lockBoard) return;
            if (this === firstCard) return;
            
            this.classList.add('flipped');
            
            if (!hasFlippedCard) {
                // Primer click
                hasFlippedCard = true;
                firstCard = this;
                return;
            }
            
            // Segundo click
            secondCard = this;
            checkForMatch();
        }
        
        function checkForMatch() {
            attempts++;
            document.getElementById('attempts').textContent = attempts;
            
            const isMatch = firstCard.querySelector('.card-front').textContent === 
                          secondCard.querySelector('.card-front').textContent;
            
            isMatch ? disableCards() : unflipCards();
        }
        
        function disableCards() {
            firstCard.removeEventListener('click', flipCard);
            secondCard.removeEventListener('click', flipCard);
            
            matches++;
            document.getElementById('matches').textContent = matches;
            
            if (matches === totalPairs) {
                setTimeout(() => {
                    document.getElementById('game-over').style.display = 'block';
                }, 500);
            }
            
            resetBoard();
        }
        
        function unflipCards() {
            lockBoard = true;
            
            setTimeout(() => {
                firstCard.classList.remove('flipped');
                secondCard.classList.remove('flipped');
                
                resetBoard();
            }, 1000);
        }
        
        function resetBoard() {
            [hasFlippedCard, lockBoard] = [false, false];
            [firstCard, secondCard] = [null, null];
        }
        
        // Mezclar cartas al inicio
        function shuffleCards() {
            const cards = document.querySelectorAll('.card');
            cards.forEach(card => {
                const randomPos = Math.floor(Math.random() * cards.length);
                card.style.order = randomPos;
            });
        }
        
        // Event listeners para las cartas
        const cards = document.querySelectorAll('.card');
        cards.forEach(card => card.addEventListener('click', flipCard));
        
        // Botón de jugar de nuevo
        document.getElementById('playAgain')?.addEventListener('click', () => {
            setupMemoryGame();
        });
        
        shuffleCards();
    }
    
    // Configurar juego de quiz (placeholder)
    function setupQuizGame() {
        modalBody.innerHTML = `
            <h2>${games.quiz.title}</h2>
            <p>${games.quiz.description}</p>
            <div class="coming-soon">
                <i class="fas fa-tools"></i>
                <p>¡Próximamente! Estamos trabajando en este juego.</p>
            </div>
        `;
    }
    
    // Configurar juego de clasificación (placeholder)
    function setupSortingGame() {
        modalBody.innerHTML = `
            <h2>${games.sorting.title}</h2>
            <p>${games.sorting.description}</p>
            <div class="coming-soon">
                <i class="fas fa-tools"></i>
                <p>¡Próximamente! Estamos trabajando en este juego.</p>
            </div>
        `;
    }
    
    // Función para mezclar array
    function shuffleArray(array) {
        for (let i = array.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [array[i], array[j]] = [array[j], array[i]];
        }
        return array;
    }
});