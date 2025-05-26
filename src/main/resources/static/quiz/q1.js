const quizContainer = document.getElementById("questions-container");
const resultContainer = document.getElementById("result");
const submitButton = document.getElementById("submit-btn");
const playAgainButton = document.getElementById("play-again-btn");

// Design-related questions
const designQuestions = [
    {
        question: "Which color model is used for digital screens?",
        correct_answer: "RGB",
        incorrect_answers: ["CMYK", "PMS", "Grayscale"]
    },
    {
        question: "What does UI stand for in design?",
        correct_answer: "User Interface",
        incorrect_answers: ["User Interaction", "User Integration", "Unique Interface"]
    },
    {
        question: "Which principle of design focuses on the arrangement of elements to create stability?",
        correct_answer: "Balance",
        incorrect_answers: ["Contrast", "Hierarchy", "Proximity"]
    },
    {
        question: "What is the term for empty space around design elements?",
        correct_answer: "Whitespace",
        incorrect_answers: ["Padding", "Margin", "Negative Space"]
    },
    {
        question: "Which typography term refers to the space between lines of text?",
        correct_answer: "Leading",
        incorrect_answers: ["Kerning", "Tracking", "Baseline"]
    },
    {
        question: "Which file format is best for maintaining image quality in print design?",
        correct_answer: "TIFF",
        incorrect_answers: ["JPEG", "GIF", "BMP"]
    },
    {
        question: "Which design tool is commonly used for vector graphics?",
        correct_answer: "Adobe Illustrator",
        incorrect_answers: ["Photoshop", "Figma", "Canva"]
    },
    {
        question: "Which UX principle ensures that users can undo actions?",
        correct_answer: "Reversibility",
        incorrect_answers: ["Affordance", "Feedback", "Hierarchy"]
    },
    {
        question: "What does the golden ratio help with in design?",
        correct_answer: "Proportions & Aesthetics",
        incorrect_answers: ["Color Selection", "Typography Choice", "Motion Design"]
    },
    {
        question: "Which design principle helps guide the user's eye through the content?",
        correct_answer: "Visual Hierarchy",
        incorrect_answers: ["Grid System", "Contrast", "Alignment"]
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
    handleQuizSubmission(designQuestions);
});

// Event listener for Play Again button
playAgainButton.addEventListener("click", function() {
    displayQuestions(shuffleArray(designQuestions)); // Reload shuffled questions
});

// Start the quiz
displayQuestions(shuffleArray(designQuestions));
