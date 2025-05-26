const quizContainer = document.getElementById("questions-container");
const resultContainer = document.getElementById("result");
const submitButton = document.getElementById("submit-btn");
const playAgainButton = document.getElementById("play-again-btn");

// Web Development Quiz Questions
const webDevQuestions = [
    {
        question: "Which language is used to style web pages?",
        correct_answer: "CSS",
        incorrect_answers: ["HTML", "JavaScript", "Python"]
    },
    {
        question: "Which HTML tag is used to define a hyperlink?",
        correct_answer: "<a>",
        incorrect_answers: ["<link>", "<href>", "<hyper>"]
    },
    {
        question: "What does CSS stand for?",
        correct_answer: "Cascading Style Sheets",
        incorrect_answers: ["Computer Style Sheets", "Creative Style Sheets", "Colorful Style Sheets"]
    },
    {
        question: "Which JavaScript function is used to print something to the console?",
        correct_answer: "console.log()",
        incorrect_answers: ["print()", "log()", "echo()"]
    },
    {
        question: "Which HTML element is used to define the main heading of a webpage?",
        correct_answer: "<h1>",
        incorrect_answers: ["<head>", "<title>", "<header>"]
    },
    {
        question: "Which HTTP method is used to send data to the server?",
        correct_answer: "POST",
        incorrect_answers: ["GET", "PUT", "DELETE"]
    },
    {
        question: "Which property is used to change the background color in CSS?",
        correct_answer: "background-color",
        incorrect_answers: ["color", "bg-color", "background"]
    },
    {
        question: "Which JavaScript keyword is used to declare a variable?",
        correct_answer: "let",
        incorrect_answers: ["var", "const", "declare"]
    },
    {
        question: "What does the `alt` attribute in an `<img>` tag provide?",
        correct_answer: "Alternative text for an image",
        incorrect_answers: ["Image URL", "Tooltip text", "Background image"]
    },
    {
        question: "Which JavaScript event fires when a user clicks an HTML element?",
        correct_answer: "onclick",
        incorrect_answers: ["onhover", "onpress", "onchange"]
    }
];

// Function to shuffle an array (used for shuffling answers)
function shuffleArray(array) {
    return array.sort(() => Math.random() - 0.5);
}

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
    handleQuizSubmission(webDevQuestions);
});

// Event listener for Play Again button
playAgainButton.addEventListener("click", function() {
    displayQuestions(shuffleArray(webDevQuestions)); // Reload shuffled questions
});

// Start the quiz
displayQuestions(shuffleArray(webDevQuestions));
