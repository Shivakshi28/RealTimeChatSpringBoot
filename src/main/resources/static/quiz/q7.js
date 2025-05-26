const quizContainer = document.getElementById("questions-container");
const resultContainer = document.getElementById("result");
const submitButton = document.getElementById("submit-btn");
const playAgainButton = document.getElementById("play-again-btn");

// Content creation-related questions
const contentCreationQuestions = [
    {
        question: "What is the most important element of a content strategy?",
        correct_answer: "Target audience",
        incorrect_answers: ["Content length", "SEO ranking", "Social media presence"]
    },
    {
        question: "Which platform is best known for video content creation?",
        correct_answer: "YouTube",
        incorrect_answers: ["Instagram", "Twitter", "Pinterest"]
    },
    {
        question: "What is the primary purpose of a content calendar?",
        correct_answer: "To plan and organize content in advance",
        incorrect_answers: ["To track social media likes", "To post content randomly", "To check website traffic"]
    },
    {
        question: "Which of the following is a key component of effective storytelling in content?",
        correct_answer: "Engaging narrative",
        incorrect_answers: ["Complex vocabulary", "Multiple visuals", "Lengthy text"]
    },
    {
        question: "What does SEO stand for in content creation?",
        correct_answer: "Search Engine Optimization",
        incorrect_answers: ["Social Engagement Optimization", "Systematic Editing Operations", "Search Engagement Optimization"]
    },
    {
        question: "Which of the following helps to improve a website’s visibility on search engines?",
        correct_answer: "Using relevant keywords",
        incorrect_answers: ["Adding random text", "Using flashy colors", "Ignoring mobile optimization"]
    },
    {
        question: "What is the best way to measure the effectiveness of your content?",
        correct_answer: "Analyzing audience engagement",
        incorrect_answers: ["Counting the words", "Increasing the number of posts", "Focusing on design"]
    },
    {
        question: "What type of content performs best on social media?",
        correct_answer: "Short-form, visually engaging content",
        incorrect_answers: ["Long essays", "Highly technical articles", "Podcasts"]
    },
    {
        question: "What is a common mistake in content creation?",
        correct_answer: "Not considering the target audience",
        incorrect_answers: ["Too much research", "Overloading with visuals", "Writing too much text"]
    },
    {
        question: "What is a 'Call-to-Action' in content creation?",
        correct_answer: "A prompt encouraging the audience to take an action",
        incorrect_answers: ["A title of an article", "A summary of the content", "A footer note"]
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
    handleQuizSubmission(contentCreationQuestions);
});

// Event listener for Play Again button
playAgainButton.addEventListener("click", function() {
    displayQuestions(shuffleArray(contentCreationQuestions)); // Reload shuffled questions
});

// Start the quiz
displayQuestions(shuffleArray(contentCreationQuestions));
