document.addEventListener('DOMContentLoaded', function() {
    // Elementos del DOM
    const questionContainer = document.getElementById('questionContainer');
    const quizResult = document.getElementById('quizResult');
    const progressBar = document.getElementById('progressBar');
    const progressText = document.getElementById('progressText');
    const scoreElement = document.getElementById('score');
    const finalScoreElement = document.getElementById('finalScore');
    const resultMessage = document.getElementById('resultMessage');
    const restartBtn = document.getElementById('restartQuiz');
    const resultTitle = document.getElementById('resultTitle');

    // Variables del quiz
    let currentQuestion = 0;
    let score = 0;
    let questions = [];
    let userAnswers = [];

    // Preguntas del quiz
    const quizQuestions = [
        {
            question: "¿Cuál de estos materiales tarda más en degradarse en la naturaleza?",
            options: [
                "Papel (2-5 meses)",
                "Cáscara de plátano (2-10 días)",
                "Vidrio (4000 años)",
                "Telas de algodón (1-5 meses)"
            ],
            answer: 2,
            explanation: "El vidrio puede tardar hasta 4000 años en degradarse, aunque es 100% reciclable infinitas veces."
        },
        {
            question: "¿Qué acción ahorra más agua?",
            options: [
                "Cerrar el grifo al lavarse los dientes",
                "Ducharse en 5 minutos en lugar de bañarse",
                "Usar lavavajillas lleno en lugar de lavar a mano",
                "Regar las plantas por la noche"
            ],
            answer: 1,
            explanation: "Una ducha de 5 minutos gasta aproximadamente 50 litros, mientras que un baño puede gastar 150-200 litros."
        },
        {
            question: "¿Qué significa las 3R de la ecología?",
            options: [
                "Reducir, Reutilizar, Reciclar",
                "Reusar, Reparar, Rediseñar",
                "Recoger, Reemplazar, Reforestar",
                "Rechazar, Repensar, Reestructurar"
            ],
            answer: 0,
            explanation: "Las 3R fundamentales son Reducir (consumo), Reutilizar (productos) y Reciclar (materiales)."
        },
        {
            question: "¿Qué tipo de energía es considerada renovable?",
            options: [
                "Carbón",
                "Petróleo",
                "Energía eólica",
                "Gas natural"
            ],
            answer: 2,
            explanation: "La energía eólica proviene del viento, una fuente inagotable y limpia, a diferencia de los combustibles fósiles."
        },
        {
            question: "¿Cuál es el mayor contribuyente al efecto invernadero?",
            options: [
                "Dióxido de carbono (CO₂)",
                "Metano (CH₄)",
                "Óxido nitroso (N₂O)",
                "Vapor de agua"
            ],
            answer: 0,
            explanation: "El CO₂ es el gas de efecto invernadero más abundante, principalmente por la quema de combustibles fósiles."
        },
        {
            question: "¿Qué puedes hacer para reducir tu huella de carbono?",
            options: [
                "Usar transporte público",
                "Comprar productos locales",
                "Reducir el consumo de carne",
                "Todas las anteriores"
            ],
            answer: 3,
            explanation: "Todas estas acciones contribuyen a reducir las emisiones de gases de efecto invernadero."
        },
        {
            question: "¿Qué contenedor se usa para vidrio?",
            options: [
                "Amarillo",
                "Azul",
                "Verde",
                "Marrón"
            ],
            answer: 2,
            explanation: "El contenedor verde es para vidrio (botellas, frascos), el amarillo para plásticos, el azul para papel y el marrón para orgánico."
        },
        {
            question: "¿Qué producto es más ecológico para llevar la compra?",
            options: [
                "Bolsa de plástico",
                "Bolsa de papel",
                "Bolsa de tela reutilizable",
                "Bolsa biodegradable"
            ],
            answer: 2,
            explanation: "Una bolsa de tela reutilizable muchas veces tiene el menor impacto ambiental a largo plazo."
        },
        {
            question: "¿Qué porcentaje del agua en la Tierra es dulce y accesible?",
            options: [
                "25%",
                "10%",
                "5%",
                "Menos del 1%"
            ],
            answer: 3,
            explanation: "Solo el 2.5% del agua es dulce, y de esta, menos del 1% es accesible en ríos, lagos y acuíferos."
        },
        {
            question: "¿Qué práctica ayuda a combatir la deforestación?",
            options: [
                "Usar papel reciclado",
                "Comprar muebles con certificación FSC",
                "Apoyar productos de aceite de palma sostenible",
                "Todas las anteriores"
            ],
            answer: 3,
            explanation: "Todas estas prácticas reducen la presión sobre los bosques y promueven una gestión forestal sostenible."
        }
    ];

    // Inicializar el quiz
    function initQuiz() {
        questions = [...quizQuestions];
        currentQuestion = 0;
        score = 0;
        userAnswers = [];
        scoreElement.textContent = score;
        showQuestion();
        quizResult.style.display = 'none';
        questionContainer.style.display = 'block';
    }

    // Mostrar pregunta actual
    function showQuestion() {
        if (currentQuestion >= questions.length) {
            showResults();
            return;
        }

        const question = questions[currentQuestion];
        let optionsHTML = '';

        question.options.forEach((option, index) => {
            optionsHTML += `
                <button class="option-btn" onclick="selectOption(${index})">
                    <span class="option-number">${index + 1}</span>
                    ${option}
                </button>
            `;
        });

        questionContainer.innerHTML = `
            <div class="question-text fade-in">${question.question}</div>
            <div class="options-container">
                ${optionsHTML}
            </div>
        `;

        updateProgress();
    }

    // Seleccionar una opción
    window.selectOption = function(selectedIndex) {
        const question = questions[currentQuestion];
        const optionBtns = document.querySelectorAll('.option-btn');
        
        // Deshabilitar todos los botones
        optionBtns.forEach(btn => {
            btn.style.pointerEvents = 'none';
        });

        // Marcar la respuesta correcta y la seleccionada
        optionBtns[question.answer].classList.add('correct');
        if (selectedIndex !== question.answer) {
            optionBtns[selectedIndex].classList.add('incorrect');
        }

        // Guardar respuesta del usuario
        userAnswers.push({
            question: question.question,
            userAnswer: question.options[selectedIndex],
            correctAnswer: question.options[question.answer],
            isCorrect: selectedIndex === question.answer,
            explanation: question.explanation
        });

        // Actualizar puntuación si es correcta
        if (selectedIndex === question.answer) {
            score += 10;
            scoreElement.textContent = score;
        }

        // Pasar a la siguiente pregunta después de un breve retraso
        setTimeout(() => {
            currentQuestion++;
            showQuestion();
        }, 1500);
    };

    // Actualizar barra de progreso
    function updateProgress() {
        const progress = ((currentQuestion) / questions.length) * 100;
        progressBar.style.width = `${progress}%`;
        progressText.textContent = `${currentQuestion + 1}/${questions.length}`;
    }

    // Mostrar resultados
    function showResults() {
        questionContainer.style.display = 'none';
        quizResult.style.display = 'block';
        
        finalScoreElement.textContent = score;
        
        // Mensaje personalizado según el resultado
        if (score >= 80) {
            resultTitle.textContent = "¡Excelente! 🌿";
            resultMessage.innerHTML = `
                <p>Eres un verdadero experto en temas ambientales. ¡Sigue compartiendo tu conocimiento!</p>
                <div class="result-detail">
                    <i class="fas fa-check-circle"></i> ${score/10} de ${questions.length} respuestas correctas
                </div>
            `;
        } else if (score >= 50) {
            resultTitle.textContent = "¡Buen trabajo! 👍";
            resultMessage.innerHTML = `
                <p>Tienes buenos conocimientos ambientales, pero aún hay espacio para mejorar.</p>
                <div class="result-detail">
                    <i class="fas fa-check-circle"></i> ${score/10} de ${questions.length} respuestas correctas
                </div>
            `;
        } else {
            resultTitle.textContent = "¡Sigue aprendiendo! 📚";
            resultMessage.innerHTML = `
                <p>El conocimiento ambiental es importante. Te invitamos a investigar más sobre estos temas.</p>
                <div class="result-detail">
                    <i class="fas fa-check-circle"></i> ${score/10} de ${questions.length} respuestas correctas
                </div>
            `;
        }
    }

    // Event listeners
    restartBtn.addEventListener('click', initQuiz);

    // Iniciar el quiz al cargar la página
    initQuiz();
});