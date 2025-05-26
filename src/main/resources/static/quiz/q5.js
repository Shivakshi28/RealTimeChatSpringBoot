const quizContainer = document.getElementById("questions-container");
const resultContainer = document.getElementById("result");
const submitButton = document.getElementById("submit-btn");
const playAgainButton = document.getElementById("play-again-btn");

// Personality Development-related questions
const personalityQuestions = [
    {
        question: "What is the key trait of an effective communicator?",
        correct_answer: "Active listening",
        incorrect_answers: ["Speaking loudly", "Interrupting", "Avoiding eye contact"]
    },
    {
        question: "Which of the following is an important aspect of emotional intelligence?",
        correct_answer: "Self-awareness",
        incorrect_answers: ["Self-criticism", "Self-doubt", "Self-isolation"]
    },
    {
        question: "What does personal growth involve?",
        correct_answer: "Continuous learning",
        incorrect_answers: ["Avoiding challenges", "Staying in the comfort zone", "Ignoring feedback"]
    },
    {
        question: "Which of the following helps in building confidence?",
        correct_answer: "Positive self-talk",
        incorrect_answers: ["Negative self-criticism", "Doubting abilities", "Ignoring achievements"]
    },
    {
        question: "How can time management improve productivity?",
        correct_answer: "By prioritizing tasks effectively",
        incorrect_answers: ["By procrastinating", "By multitasking", "By ignoring deadlines"]
    },
    {
        question: "What is the significance of body language in communication?",
        correct_answer: "It conveys non-verbal messages",
        incorrect_answers: ["It distracts the listener", "It has no impact", "It is irrelevant"]
    },
    {
        question: "Which behavior is an example of assertiveness?",
        correct_answer: "Expressing thoughts and feelings openly",
        incorrect_answers: ["Ignoring others' opinions", "Aggressively dominating conversations", "Withdrawing from interactions"]
    },
    {
        question: "What is the role of feedback in personal development?",
        correct_answer: "It helps identify areas for improvement",
        incorrect_answers: ["It is a form of criticism", "It makes one feel defensive", "It has no value"]
    },
    {
        question: "What is one way to manage stress effectively?",
        correct_answer: "Regular physical activity",
        incorrect_answers: ["Ignoring the stress", "Overeating", "Avoiding relaxation"]
    },
    {
        question: "How can one enhance their emotional resilience?",
        correct_answer: "By developing a positive mindset",
        incorrect_answers: ["By avoiding difficulties", "By being overly critical of oneself", "By blaming others"]
    }
];

// Function to shuffle an array (used for shuffling answers)
function shuffleArray(array) {
    return array.sort(() => Math.random() - 0.5);
}

// Function to display questions
function displayQuestions(questions) {
    quizContainer.innerHTML = "";
    resultContainer.innerHTML = "";

    let questionHTML = "";

    questions.forEach((question, index) => {
        let answers = [...question.incorrect_answers, question.correct_answer];
        answers = shuffleArray(answers); // Shuffle answers

        questionHTML += `
            <div class="question">
                <p>${index + 1}. ${question.question}</p>
                <ul class="answers">
                    ${answers.map(answer => `
                        <li>
                            <label>
                                <input type="radio" name="question${index}" value="${answer}">
                                ${answer.replace(/</g, "&lt;").replace(/>/g, "&gt;")}
                            </label>
                        </li>
                    `).join("")}
                </ul>
            </div>
        `;
    });

    quizContainer.innerHTML = questionHTML;

    // Show Submit button & hide Play Again button
    submitButton.style.display = "block";
    playAgainButton.style.display = "none";
}

// Function to handle quiz submission
function handleQuizSubmission(questions) {
    let score = 0;
    let output = `<h2>Results:</h2>`;

    questions.forEach((question, index) => {
        const selectedAnswer = document.querySelector(`input[name="question${index}"]:checked`);
        const correctAnswer = question.correct_answer;

        if (selectedAnswer) {
            const userAnswer = selectedAnswer.value;
            if (userAnswer === correctAnswer) {
                score++;
                output += `<p class="correct">✔️ Q${index + 1}: Correct</p>`;
            } else {
                output += `<p class="wrong">❌ Q${index + 1}: Wrong (Correct: ${correctAnswer})</p>`;
            }
        } else {
            output += `<p class="wrong">⚠️ Q${index + 1}: Not answered (Correct: ${correctAnswer})</p>`;
        }
    });

    output += `<h3>Your Final Score: ${score} / ${questions.length}</h3>`;
    resultContainer.innerHTML = output;

    // Hide Submit button & Show Play Again button
    submitButton.style.display = "none";
    playAgainButton.style.display = "block";
}

// Event listener for Submit button
submitButton.addEventListener("click", function(event) {
    event.preventDefault();
    handleQuizSubmission(personalityQuestions);
});

// Event listener for Play Again button
playAgainButton.addEventListener("click", function() {
    displayQuestions(shuffleArray(personalityQuestions)); // Reload shuffled questions
});

// Start the quiz
displayQuestions(shuffleArray(personalityQuestions));
