const questionContainer = document.getElementById('question-container');
const questionElement = document.getElementById('question');
const answerButtonsElement = document.getElementById('answer-buttons');
const nextButton = document.getElementById('next-btn');
const resultContainer = document.getElementById('result-container');
const resultElement = document.getElementById('result');
const restartButton = document.getElementById('restart-btn');

let currentQuestionIndex = 0;
let score = 0;

nextButton.addEventListener('click', () => {
    currentQuestionIndex++;
    setNextQuestion();
});

restartButton.addEventListener('click', () => {
    currentQuestionIndex = 0;
    score = 0;
    resultContainer.classList.add('hide');
    questionContainer.classList.remove('hide');
    setNextQuestion();
});

function startQuiz() {
    currentQuestionIndex = 0;
    score = 0;
    nextButton.classList.add('hide');
    setNextQuestion();
}

function setNextQuestion() {
    resetState();
    showQuestion(questions[currentQuestionIndex]);
}

function showQuestion(question) {
    questionElement.innerText = question.question;
    if (question.type === "multiple-choice" || question.type === "true-false") {
        question.answers.forEach(answer => {
            const button = document.createElement('button');
            button.innerText = answer.text;
            button.classList.add('btn');
            if (answer.correct) {
                button.dataset.correct = answer.correct;
            }
            button.addEventListener('click', selectAnswer);
            answerButtonsElement.appendChild(button);
        });
    } else if (question.type === "multiple-correct") {
        question.answers.forEach(answer => {
            const checkbox = document.createElement('input');
            checkbox.type = 'checkbox';
            checkbox.classList.add('checkbox');
            checkbox.dataset.correct = answer.correct;
            const label = document.createElement('label');
            label.innerText = answer.text;
            const div = document.createElement('div');
            div.appendChild(checkbox);
            div.appendChild(label);
            answerButtonsElement.appendChild(div);
        });
        const submitButton = document.createElement('button');
        submitButton.innerText = 'Submit';
        submitButton.classList.add('btn');
        submitButton.addEventListener('click', selectMultipleAnswers);
        answerButtonsElement.appendChild(submitButton);
    }
}

function resetState() {
    nextButton.classList.add('hide');
    while (answerButtonsElement.firstChild) {
        answerButtonsElement.removeChild(answerButtonsElement.firstChild);
    }
}

function selectAnswer(e) {
    const selectedButton = e.target;
    const correct = selectedButton.dataset.correct === "true";
    if (correct) {
        score++;
    }
    Array.from(answerButtonsElement.children).forEach(button => {
        setStatusClass(button, button.dataset.correct);
    });
    if (questions.length > currentQuestionIndex + 1) {
        nextButton.classList.remove('hide');
    } else {
        showResult();
    }
    // Show the correct answer
    showCorrectAnswer();
}

function selectMultipleAnswers() {
    const checkboxes = document.querySelectorAll('.checkbox');
    let correctAnswers = 0;
    let totalCorrect = 0;
    checkboxes.forEach(checkbox => {
        if (checkbox.dataset.correct === "true") {
            totalCorrect++;
            if (checkbox.checked) {
                correctAnswers++;
            }
        } else {
            if (checkbox.checked) {
                correctAnswers--;
            }
        }
    });
    if (correctAnswers === totalCorrect) {
        score++;
    }
    if (questions.length > currentQuestionIndex + 1) {
        nextButton.classList.remove('hide');
    } else {
        showResult();
    }
    // Show the correct answer
    showCorrectAnswer();
}

function setStatusClass(element, correct) {
    clearStatusClass(element);
    if (correct === "true") {
        element.classList.add('correct');
    } else {
        element.classList.add('wrong');
    }
}

function clearStatusClass(element) {
    element.classList.remove('correct');
    element.classList.remove('wrong');
}

function showCorrectAnswer() {
    Array.from(answerButtonsElement.children).forEach(button => {
        if (button.dataset.correct === "true") {
            button.classList.add('correct');
        }
    });
}

function showResult() {
    questionContainer.classList.add('hide');
    resultContainer.classList.remove('hide');
    resultElement.innerText = `You scored ${score} out of ${questions.length}`;
}

// Question array
const questions = [
    {
        type: "multiple-choice",
        question: "What is the capital of France?",
        answers: [
            { text: "Berlin", correct: false },
            { text: "Madrid", correct: false },
            { text: "Paris", correct: true },
            { text: "Rome", correct: false }
        ]
    },
    
    {
        type: "true-false",
        question: "Which planet is known as the Red Planet?",
        answers: [
            { text: "Earth", correct: false },
            { text: "Mars", correct: true },
            { text: "Jupiter", correct: false }

        ]
    },

    {
        type: "multiple-choice",
        question: "What is the largest ocean on Earth?",
        answers: [
            { text: "Atlantic Ocean", correct: true },
            { text: "Indian Ocean",   correct: false },
            { text: "Pacific Ocean",  correct: false }
        ]
    },

    {
        type: "true-false",
        question: "The function keyword is used to declare a function in JavaScript.",
        answers: [
            { text: "True ", correct: true },
            { text: "False", correct: false }
        ]
    },

    {
        type: "multiple-choice",
        question: "What does HTML stand for?",
        answers: [
            { text: "Hypertext Markup Language ",         correct: true },
            { text: "Hyperlink and Text Markup Language", correct: false }
        ]
    },

    {
        type: "true-false",
        question: "In HTML, you can use the <table> tag to create a table.",
        answers: [
            { text: "True ", correct: true },
            { text: "False", correct: false }
        ]
    },

    {
        type: "multiple-choice",
        question: "Which language runs in a web browser?",
        answers: [
            { text: "Java",  correct: false },
            { text: "c",     correct: false },
            { text: "Python",  correct: false },
            { text: "JavaScript ",  correct: true },


        ]
    },

    {
        type: "multiple-choice",
        question: "Which of the following are programming languages?",
        answers: [
            { text: "Python",      correct: true },
            { text: "HTML",        correct: false },
            { text: "CSS",         correct: false }
        ]
    }
    
    

];

startQuiz();
