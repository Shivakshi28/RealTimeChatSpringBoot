const quizContainer = document.getElementById("questions-container");
const resultContainer = document.getElementById("result");
const submitButton = document.getElementById("submit-btn");
const playAgainButton = document.getElementById("play-again-btn");

// Java programming questions
const javaQuestions = [
    {
        question: "Which keyword is used to define a class in Java?",
        correct_answer: "class",
        incorrect_answers: ["interface", "struct", "def"]
    },
    {
        question: "What is the default value of an instance variable of type int in Java?",
        correct_answer: "0",
        incorrect_answers: ["null", "undefined", "1"]
    },
    {
        question: "Which method is called when an object is created in Java?",
        correct_answer: "Constructor",
        incorrect_answers: ["Destructor", "Main method", "init()"]
    },
    {
        question: "Which of the following is NOT a primitive data type in Java?",
        correct_answer: "String",
        incorrect_answers: ["int", "char", "boolean"]
    },
    {
        question: "Which package in Java contains the Scanner class?",
        correct_answer: "java.util",
        incorrect_answers: ["java.io", "java.net", "java.lang"]
    },
    {
        question: "What will be the output of 9/2 in Java when using integer division?",
        correct_answer: "4",
        incorrect_answers: ["4.5", "5", "Error"]
    },
    {
        question: "What is the correct way to declare a main method in Java?",
        correct_answer: "public static void main(String[] args)",
        incorrect_answers: [
            "void main(String[] args)",
            "public void main(String[] args)",
            "static int main(String args)"
        ]
    },
    {
        question: "Which Java keyword is used to create an object?",
        correct_answer: "new",
        incorrect_answers: ["this", "instanceof", "create"]
    },
    {
        question: "What is the size of a char in Java?",
        correct_answer: "2 bytes",
        incorrect_answers: ["1 byte", "4 bytes", "8 bytes"]
    },
    {
        question: "Which access modifier makes a member visible only within its own package?",
        correct_answer: "default",
        incorrect_answers: ["private", "protected", "public"]
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
                                ${answer}
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
    handleQuizSubmission(javaQuestions);
});

// Event listener for Play Again button
playAgainButton.addEventListener("click", function() {
    displayQuestions(shuffleArray(javaQuestions)); // Reload shuffled questions
});

// Start the quiz
displayQuestions(shuffleArray(javaQuestions));
