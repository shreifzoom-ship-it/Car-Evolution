/*==========================================
   Car Evolution Website - Quiz Functionality
   Knowledge Management Project | MGMT3501
==========================================*/

// Quiz questions database
const quizQuestions = [
    {
        id: 1,
        question: "In which year was the first automobile (Benz Patent-Motorwagen) invented?",
        options: ["1886", "1895", "1901", "1878"],
        correct: 0,
        explanation: "Karl Benz patented the Benz Patent-Motorwagen in 1886, widely regarded as the first automobile."
    },
    {
        id: 2,
        question: "Which car is considered the first muscle car?",
        options: ["Ford Mustang", "Pontiac GTO", "Chevrolet Camaro", "Dodge Charger"],
        correct: 1,
        explanation: "The 1964 Pontiac GTO is widely considered the first true muscle car."
    },
    {
        id: 3,
        question: "Which company invented the three-point seatbelt and made the patent open for all manufacturers?",
        options: ["Mercedes-Benz", "Ford", "Volvo", "Saab"],
        correct: 2,
        explanation: "Volvo engineer Nils Bohlin invented the three-point seatbelt in 1959, and Volvo made the patent open to save lives."
    },
    {
        id: 4,
        question: "What is the most successful race car in history in terms of total victories?",
        options: ["Ferrari 250 GTO", "Porsche 917", "Bugatti Type 35", "Ford GT40"],
        correct: 2,
        explanation: "The Bugatti Type 35 won over 2,000 races in its career, making it the most successful race car ever."
    },
    {
        id: 5,
        question: "Which car is often called 'the most beautiful car ever made'?",
        options: ["Jaguar E-Type", "Ferrari 250 GTO", "Aston Martin DB5", "Lamborghini Miura"],
        correct: 0,
        explanation: "Enzo Ferrari himself called the Jaguar E-Type 'the most beautiful car ever made.'"
    },
    {
        id: 6,
        question: "In which year did the Ford Model T enter production?",
        options: ["1908", "1913", "1903", "1910"],
        correct: 0,
        explanation: "The Ford Model T was introduced in 1908 and revolutionized the automotive industry."
    },
    {
        id: 7,
        question: "Which company was the first to mass-produce a car with front-wheel drive?",
        options: ["Citroën", "Audi", "Saab", "Mini"],
        correct: 0,
        explanation: "Citroën's Traction Avant (1934) was the world's first mass-produced front-wheel drive car."
    },
    {
        id: 8,
        question: "What does the 'GT' in GT-R stand for?",
        options: ["Grand Touring", "Gran Turismo", "Grand Touring Racing", "Gran Turismo Racing"],
        correct: 1,
        explanation: "GT stands for 'Gran Turismo' (Italian for Grand Touring), referring to high-performance touring cars."
    },
    {
        id: 9,
        question: "Which car was the first to exceed 300 mph (482 km/h)?",
        options: ["Bugatti Veyron", "Koenigsegg Agera RS", "Hennessey Venom GT", "SSC Ultimate Aero"],
        correct: 1,
        explanation: "The Koenigsegg Agera RS set the production car speed record at 277.9 mph. The first to exceed 300 mph was the Bugatti Chiron Super Sport 300+ in 2019 (304 mph)."
    },
    {
        id: 10,
        question: "What is the best-selling car of all time?",
        options: ["Ford F-Series", "Toyota Corolla", "Volkswagen Beetle", "Honda Civic"],
        correct: 1,
        explanation: "The Toyota Corolla is the best-selling car of all time with over 50 million sold since 1966."
    }
];

let currentQuiz = {
    questions: [],
    currentQuestion: 0,
    score: 0,
    answers: [],
    completed: false
};

/*========== Initialize Quiz ==========*/
function initQuiz() {
    const quizContainer = document.getElementById('quizContainer');
    const startBtn = document.getElementById('startQuizBtn');
    
    if (startBtn) {
        startBtn.addEventListener('click', startQuiz);
    }
    
    // Check if URL has quiz parameters
    const urlParams = new URLSearchParams(window.location.search);
    const quizId = urlParams.get('id');
    
    if (quizId) {
        loadQuiz(quizId);
    }
}

function startQuiz() {
    // Shuffle questions and select 5 random ones
    const shuffled = [...quizQuestions].sort(() => 0.5 - Math.random());
    currentQuiz.questions = shuffled.slice(0, 5);
    currentQuiz.currentQuestion = 0;
    currentQuiz.score = 0;
    currentQuiz.answers = [];
    currentQuiz.completed = false;
    
    showQuestion();
}

function showQuestion() {
    const quizContainer = document.getElementById('quizContainer');
    if (!quizContainer) return;
    
    const question = currentQuiz.questions[currentQuiz.currentQuestion];
    const progress = ((currentQuiz.currentQuestion + 1) / currentQuiz.questions.length) * 100;
    
    let html = `
        <div class="quiz-card">
            <div class="quiz-progress">
                <div class="progress-bar" style="width: ${progress}%"></div>
            </div>
            <div class="quiz-header">
                <span class="quiz-question-number">Question ${currentQuiz.currentQuestion + 1} of ${currentQuiz.questions.length}</span>
                <span class="quiz-score">Score: ${currentQuiz.score}</span>
            </div>
            <h3 class="quiz-question">${question.question}</h3>
            <div class="quiz-options">
    `;
    
    question.options.forEach((option, index) => {
        const letter = String.fromCharCode(65 + index); // A, B, C, D
        html += `
            <div class="quiz-option" data-option="${index}">
                <span class="option-letter">${letter}</span>
                <span class="option-text">${option}</span>
            </div>
        `;
    });
    
    html += `
            </div>
            <button class="btn btn-primary quiz-submit" disabled>Submit Answer</button>
        </div>
    `;
    
    quizContainer.innerHTML = html;
    
    // Add event listeners to options
    const options = document.querySelectorAll('.quiz-option');
    const submitBtn = document.querySelector('.quiz-submit');
    
    options.forEach(option => {
        option.addEventListener('click', function() {
            // Remove selected class from all options
            options.forEach(opt => opt.classList.remove('selected'));
            
            // Add selected class to clicked option
            this.classList.add('selected');
            
            // Enable submit button
            if (submitBtn) {
                submitBtn.disabled = false;
            }
        });
    });
    
    if (submitBtn) {
        submitBtn.addEventListener('click', checkAnswer);
    }
}

function checkAnswer() {
    const selectedOption = document.querySelector('.quiz-option.selected');
    if (!selectedOption) return;
    
    const question = currentQuiz.questions[currentQuiz.currentQuestion];
    const userAnswer = parseInt(selectedOption.getAttribute('data-option'));
    const isCorrect = (userAnswer === question.correct);
    
    // Store answer
    currentQuiz.answers.push({
        questionId: question.id,
        userAnswer,
        isCorrect
    });
    
    if (isCorrect) {
        currentQuiz.score++;
    }
    
    // Show result
    const resultDiv = document.createElement('div');
    resultDiv.className = `quiz-result ${isCorrect ? 'correct' : 'incorrect'}`;
    resultDiv.innerHTML = `
        <div class="result-icon">${isCorrect ? '✓' : '✗'}</div>
        <div class="result-message">
            <h4>${isCorrect ? 'Correct!' : 'Wrong!'}</h4>
            <p>${question.explanation}</p>
        </div>
    `;
    
    const quizCard = document.querySelector('.quiz-card');
    quizCard.appendChild(resultDiv);
    
    // Disable options
    document.querySelectorAll('.quiz-option').forEach(opt => {
        opt.style.pointerEvents = 'none';
    });
    
    // Add next button
    const submitBtn = document.querySelector('.quiz-submit');
    submitBtn.style.display = 'none';
    
    const nextBtn = document.createElement('button');
    nextBtn.className = 'btn btn-primary quiz-next';
    nextBtn.textContent = (currentQuiz.currentQuestion === currentQuiz.questions.length - 1) ? 'See Results' : 'Next Question';
    nextBtn.addEventListener('click', nextQuestion);
    
    quizCard.appendChild(nextBtn);
}

function nextQuestion() {
    if (currentQuiz.currentQuestion < currentQuiz.questions.length - 1) {
        currentQuiz.currentQuestion++;
        showQuestion();
    } else {
        showResults();
    }
}

function showResults() {
    const quizContainer = document.getElementById('quizContainer');
    if (!quizContainer) return;
    
    const percentage = Math.round((currentQuiz.score / currentQuiz.questions.length) * 100);
    
    let resultHTML = `
        <div class="quiz-results">
            <h2>Quiz Complete!</h2>
            <div class="score-circle ${percentage >= 70 ? 'good' : percentage >= 40 ? 'average' : 'poor'}">
                <span class="score-number">${currentQuiz.score}</span>
                <span class="score-total">/${currentQuiz.questions.length}</span>
            </div>
            <p class="score-percentage">${percentage}%</p>
            <p class="result-message">
                ${percentage >= 80 ? 'Excellent! You really know your car history!' : 
                  percentage >= 60 ? 'Good job! You know quite a bit about cars.' :
                  percentage >= 40 ? 'Not bad! Keep learning about automotive history.' :
                  'Keep exploring! The more you read, the more you\'ll learn.'}
            </p>
            <div class="result-actions">
                <button class="btn btn-primary" onclick="location.reload()">Try Again</button>
                <button class="btn btn-outline" onclick="showCorrectAnswers()">Review Answers</button>
            </div>
        </div>
    `;
    
    quizContainer.innerHTML = resultHTML;
    
    // Save high score
    saveHighScore(currentQuiz.score, currentQuiz.questions.length);
}

function saveHighScore(score, total) {
    const highScores = JSON.parse(localStorage.getItem('quizHighScores')) || [];
    
    highScores.push({
        score,
        total,
        percentage: Math.round((score / total) * 100),
        date: new Date().toISOString()
    });
    
    // Keep only top 10 scores
    highScores.sort((a, b) => b.percentage - a.percentage);
    highScores.splice(10);
    
    localStorage.setItem('quizHighScores', JSON.stringify(highScores));
}

function showCorrectAnswers() {
    // Implementation for showing correct answers
    alert('This feature will show you which questions you got wrong with explanations.');
}

function loadQuiz(quizId) {
    // Load specific quiz from ID
    console.log('Loading quiz:', quizId);
}

/*========== Leaderboard Functions ==========*/
function showLeaderboard() {
    const highScores = JSON.parse(localStorage.getItem('quizHighScores')) || [];
    const leaderboardContainer = document.getElementById('leaderboard');
    
    if (!leaderboardContainer) return;
    
    let html = '<h3>🏆 Top Scores</h3>';
    
    if (highScores.length === 0) {
        html += '<p>No scores yet. Take the quiz to see your name here!</p>';
    } else {
        html += '<table class="leaderboard-table">';
        html += '<tr><th>Rank</th><th>Score</th><th>Date</th></tr>';
        
        highScores.forEach((score, index) => {
            html += `
                <tr>
                    <td>${index + 1}</td>
                    <td>${score.score}/${score.total} (${score.percentage}%)</td>
                    <td>${new Date(score.date).toLocaleDateString()}</td>
                </tr>
            `;
        });
        
        html += '</table>';
    }
    
    leaderboardContainer.innerHTML = html;
}

/*========== Initialize on Page Load ==========*/
document.addEventListener('DOMContentLoaded', function() {
    initQuiz();
    
    if (document.getElementById('leaderboard')) {
        showLeaderboard();
    }
});

/*========== Export Functions ==========*/
window.quizFunctions = {
    startQuiz,
    showLeaderboard
};