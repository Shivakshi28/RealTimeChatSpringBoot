const quizContainer = document.getElementById("questions-container");
const resultContainer = document.getElementById("result");
const submitButton = document.getElementById("submit-btn");
const playAgainButton = document.getElementById("play-again-btn");

// Marketing-related questions
const marketingQuestions = [
    {
        question: "What is the main purpose of a SWOT analysis?",
        correct_answer: "To analyze strengths, weaknesses, opportunities, and threats",
        incorrect_answers: ["To create a financial report", "To design a website", "To increase social media followers"]
    },
    {
        question: "Which marketing strategy focuses on building long-term customer relationships?",
        correct_answer: "Relationship marketing",
        incorrect_answers: ["Direct marketing", "Guerrilla marketing", "Outbound marketing"]
    },
    {
        question: "What does PPC stand for in digital marketing?",
        correct_answer: "Pay-Per-Click",
        incorrect_answers: ["Public Product Campaign", "Profit Per Customer", "Paid Promotion Campaign"]
    },
    {
        question: "Which social media platform is primarily used for professional networking?",
        correct_answer: "LinkedIn",
        incorrect_answers: ["Instagram", "TikTok", "Snapchat"]
    },
    {
        question: "Which of the following is an example of inbound marketing?",
        correct_answer: "Content marketing",
        incorrect_answers: ["Cold calling", "TV commercials", "Billboard advertising"]
    },
    {
        question: "Which metric is used to measure the percentage of visitors who take action on a website?",
        correct_answer: "Conversion rate",
        incorrect_answers: ["Bounce rate", "CTR (Click-through rate)", "Engagement rate"]
    },
    {
        question: "What is a key advantage of email marketing?",
        correct_answer: "High return on investment (ROI)",
        incorrect_answers: ["Guaranteed customer response", "No competition", "It is free of cost"]
    },
    {
        question: "Which color is commonly associated with urgency in marketing?",
        correct_answer: "Red",
        incorrect_answers: ["Blue", "Green", "Purple"]
    },
    {
        question: "Which tool is commonly used to track website traffic?",
        correct_answer: "Google Analytics",
        incorrect_answers: ["Google Docs", "Canva", "Trello"]
    },
    {
        question: "What does SEO stand for?",
        correct_answer: "Search Engine Optimization",
        incorrect_answers: ["Social Engagement Outreach", "Sales Enhancement Objective", "Site Efficiency Operations"]
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
    handleQuizSubmission(marketingQuestions);
});

// Event listener for Play Again button
playAgainButton.addEventListener("click", function() {
    displayQuestions(shuffleArray(marketingQuestions)); // Reload shuffled questions
});

// Start the quiz
displayQuestions(shuffleArray(marketingQuestions));
