const quizContainer = document.getElementById("questions-container");
const resultContainer = document.getElementById("result");
const submitButton = document.getElementById("submit-btn");
const playAgainButton = document.getElementById("play-again-btn");

// Python programming questions
const pythonQuestions = [
    {
        question: "Which keyword is used to define a function in Python?",
        correct_answer: "def",
        incorrect_answers: ["function", "define", "lambda"]
    },
    {
        question: "What will be the output of `print(type([]))` in Python?",
        correct_answer: "<class 'list'>",
        incorrect_answers: ["<class 'tuple'>", "<class 'dict'>", "<class 'set'>"]
    },
    {
        question: "Which of the following is used to take input from a user in Python?",
        correct_answer: "input()",
        incorrect_answers: ["scan()", "get()", "read()"]
    },
    {
        question: "What is the output of `bool([])` in Python?",
        correct_answer: "False",
        incorrect_answers: ["True", "None", "Error"]
    },
    {
        question: "Which operator is used to check if a value exists in a list?",
        correct_answer: "in",
        incorrect_answers: ["exists", "has", "contains"]
    },
    {
        question: "Which built-in function is used to get the length of a string in Python?",
        correct_answer: "len()",
        incorrect_answers: ["length()", "size()", "count()"]
    },
    {
        question: "What will be the output of `print(2 ** 3)`?",
        correct_answer: "8",
        incorrect_answers: ["6", "9", "16"]
    },
    {
        question: "Which of the following data structures is mutable in Python?",
        correct_answer: "List",
        incorrect_answers: ["Tuple", "String", "Set"]
    },
    {
        question: "What is the correct way to start a Python comment?",
        correct_answer: "#",
        incorrect_answers: ["//", "/*", "--"]
    },
    {
        question: "Which statement is used to exit a loop in Python?",
        correct_answer: "break",
        incorrect_answers: ["stop", "exit", "return"]
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
    handleQuizSubmission(pythonQuestions);
});

// Event listener for Play Again button
playAgainButton.addEventListener("click", function() {
    displayQuestions(shuffleArray(pythonQuestions)); // Reload shuffled questions
});

// Start the quiz
displayQuestions(shuffleArray(pythonQuestions));
