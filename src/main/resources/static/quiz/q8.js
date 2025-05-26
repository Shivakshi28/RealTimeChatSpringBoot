const quizContainer = document.getElementById("questions-container");
const resultContainer = document.getElementById("result");
const submitButton = document.getElementById("submit-btn");
const playAgainButton = document.getElementById("play-again-btn");

// Data Analytics-related questions
const dataAnalyticsQuestions = [
    {
        question: "Which of the following is a popular tool for data visualization?",
        correct_answer: "Tableau",
        incorrect_answers: ["Excel", "R", "Python"]
    },
    {
        question: "What does ETL stand for in data processing?",
        correct_answer: "Extract, Transform, Load",
        incorrect_answers: ["Extract, Test, Load", "Extract, Transpose, Load", "Enter, Transform, Load"]
    },
    {
        question: "What is the purpose of a correlation coefficient?",
        correct_answer: "To measure the strength and direction of a linear relationship between two variables",
        incorrect_answers: ["To predict future values", "To summarize large datasets", "To find missing values"]
    },
    {
        question: "Which type of analysis is used to predict future trends based on historical data?",
        correct_answer: "Predictive analysis",
        incorrect_answers: ["Descriptive analysis", "Exploratory analysis", "Causal analysis"]
    },
    {
        question: "Which of the following is an example of structured data?",
        correct_answer: "Sales transaction records",
        incorrect_answers: ["Images", "Social media posts", "Audio files"]
    },
    {
        question: "In data analytics, what does the term 'Big Data' refer to?",
        correct_answer: "Extremely large datasets that require advanced tools and techniques to process",
        incorrect_answers: ["Small datasets", "Data collected from social media", "Data stored on cloud platforms"]
    },
    {
        question: "Which of the following is used for data cleaning in Python?",
        correct_answer: "Pandas",
        incorrect_answers: ["NumPy", "Matplotlib", "Scikit-learn"]
    },
    {
        question: "What type of data visualization is best used to show the distribution of a single variable?",
        correct_answer: "Histogram",
        incorrect_answers: ["Scatter plot", "Line chart", "Pie chart"]
    },
    {
        question: "What is the process of identifying patterns or trends in data called?",
        correct_answer: "Data mining",
        incorrect_answers: ["Data cleaning", "Data extraction", "Data interpretation"]
    },
    {
        question: "Which of the following is an example of unstructured data?",
        correct_answer: "Emails",
        incorrect_answers: ["Database tables", "Excel spreadsheets", "CSV files"]
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
    handleQuizSubmission(dataAnalyticsQuestions);
});

// Event listener for Play Again button
playAgainButton.addEventListener("click", function() {
    displayQuestions(shuffleArray(dataAnalyticsQuestions)); // Reload shuffled questions
});

// Start the quiz
displayQuestions(shuffleArray(dataAnalyticsQuestions));
