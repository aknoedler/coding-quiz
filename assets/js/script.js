var frame = document.querySelector('section');
var gamePosition = 0;
var timerCount = 100;
var timerEl = document.querySelector('.timer');
var timerInterval;
var score;
var highScoresBtn = document.querySelector('.high-scores-btn');
var gameRunning = false;
var header = document.querySelector('header');
console.log(header);

var questionOne = {
    questionText: "Which type of variable can hold a value of 'true' or 'false'?",
    correctAnswer: "Boolean",
    incorrectOne: "String",
    incorrectTwo: "Int",
    incorrectThree: "Array"
}

var questionTwo = {
    questionText: "Which of these is NOT a semantic HTML tag?",
    correctAnswer: "<div>",
    incorrectOne: "<header>",
    incorrectTwo: "<p>",
    incorrectThree: "<section>"
}

var questionThree = {
    questionText: "Which property defines the space between different elements on the page?",
    correctAnswer: "Margin",
    incorrectOne: "Padding",
    incorrectTwo: "Border",
    incorrectThree: "Display"
}

var questionFour = {
    questionText: "In JavaScipt, the Math.random() function returns a number...",
    correctAnswer: "From 0 to 1",
    incorrectOne: "From 1 to 100",
    incorrectTwo: "From negative infinity to infinity",
    incorrectThree: "From -1 to 1"
}

var questionFive = {
    questionText: "What JSON function converts an object to a string for local storage?",
    correctAnswer: "stringify",
    incorrectOne: "convertToString",
    incorrectTwo: "toString",
    incorrectThree: "pack"
}

var questionSix = {
    questionText: "What does the querySelector() function return?",
    correctAnswer: "Elements",
    incorrectOne: "Documents",
    incorrectTwo: "Queries",
    incorrectThree: "Functions"
}

var questionSeven = {
    questionText: "Which of these returns false?",
    correctAnswer: "false === null",
    incorrectOne: "true != false",
    incorrectTwo: "2 >= 2",
    incorrectThree: "!null"
}

var questionArray = [questionOne, questionTwo, questionThree, questionFour, questionFive, questionSix, questionSeven];

// Recolors the answer buttons and makes them non-functional when a button is pressed
function answerReveal() {
    for (i = 0; i < 4; i++) {
        var answer = frame.children[2].children[i].children[0];
        if (answer.className == 'correct-btn') {
            answer.setAttribute('class', 'correct-revealed')
            frame.children[2].children[i].children[1].setAttribute('color', 'var(--correct)')
        } else {
            answer.setAttribute('class', 'incorrect-revealed')
            frame.children[2].children[i].children[1].setAttribute('color', 'var(--incorrect)')
        }
    }
}

// Clears the main frame
function clearFrame() {
    var frameElements = Array.from(frame.children);
    frameElements.forEach(element => {
        element.remove();
    });
}

function clearScores() {
    localStorage.setItem('High Scores', JSON.stringify(null));
    displayHighScores();
}

// Passes in a question object and populates the frame based on that question
function displayQuestion(question, index) {
    var currentHeader = document.createElement('h2');
    var currentText = document.createElement('p');
    var answerList = document.createElement('ul');

    // Take the answer strings from the question object, place them in an array, then shuffle that array.
    var answers = [question.correctAnswer, question.incorrectOne, question.incorrectTwo, question.incorrectThree];
    answers = shuffle(answers);

    currentHeader.textContent = "Question " + index + ":";
    currentText.textContent = question.questionText;

    // Populate the header, question text, and the list of answers.
    frame.appendChild(currentHeader);
    frame.appendChild(currentText);
    frame.appendChild(answerList);

    // Populates the list of answers by iterating over the 'answers' array
    for (i = 0; i < 4; i++) {
        answerList.appendChild(document.createElement('li'));
        answerList.children[i].appendChild(document.createElement('button'));
        answerList.children[i].children[0].textContent = i + 1;
        if (answers[i] == question.correctAnswer) {
            answerList.children[i].children[0].setAttribute('class', 'correct-btn');
        } else {
            answerList.children[i].children[0].setAttribute('class', 'incorrect-btn');
        }
        answerList.children[i].appendChild(document.createElement('h3'));
        answerList.children[i].children[1].textContent = answers[i];
    }
}

// Displays the highscores
function displayHighScores() {
    clearFrame();
    var title = document.createElement('h2');
    var scoreList = document.createElement('ul');
    var replayBtn = document.createElement('button');
    var clearBtn = document.createElement('button');

    replayBtn.textContent = "Play again";
    replayBtn.setAttribute('class', 'start-btn');
    clearBtn.textContent = "Clear High Scores";
    clearBtn.setAttribute('class', 'clear-btn');

    frame.appendChild(title);
    frame.appendChild(scoreList);
    frame.appendChild(replayBtn);
    frame.appendChild(clearBtn);

    var highScores = JSON.parse(localStorage.getItem('High Scores'));

    if (highScores) {
        title.textContent = "High Scores";
        for (i = 1; i <= highScores.length; i++) {
            var listItem = document.createElement('li');
            listItem.textContent = i + ". " + highScores[i - 1].storedName + "- " + highScores[i - 1].score + " points";
            scoreList.appendChild(listItem);
        }
    } else {
        title.textContent = "No high scores to display"
    }
}

// Stops timer, stores score, displays ending screen
function endGame() {
    clearFrame();
    gameRunning = false;
    highScoresBtn.setAttribute('style', 'color: white; cursor:pointer');
    clearInterval(timerInterval);
    score = timerCount;

    var title = document.createElement('h1');
    var message = document.createElement('p');
    var inputForm = document.createElement('form');
    var inputField = document.createElement('input');
    var submitBtn = document.createElement('input');
    var replayBtn = document.createElement('button');

    if (score == 0) {
        title.textContent = 'Time Out!';
    } else {
        title.textContent = 'Quiz Complete!'
    }

    message.textContent = "Your score was " + score + " points.\n" + "Enter your initials to store your score!";
    replayBtn.textContent = "Play again";
    replayBtn.setAttribute('class', 'start-btn');
    inputField.setAttribute('type', 'text');
    inputField.setAttribute('class', 'name-input')
    submitBtn.setAttribute('type', 'submit');
    submitBtn.setAttribute('class', 'submit-btn');

    frame.appendChild(title);
    frame.appendChild(message);
    frame.appendChild(inputForm);
    inputForm.appendChild(inputField);
    inputForm.appendChild(submitBtn);
    frame.appendChild(replayBtn);
}

// Sets up the timer, orders the question, and initiates the first question
function startGame() {
    gamePosition = 0;
    gameRunning = true;
    highScoresBtn.setAttribute('style', 'color: grey; cursor:default');
    questionArray = shuffle(questionArray);
    timerCount = 100;
    timerEl.textContent = "Time: " + timerCount + " sec";
    timerInterval = setInterval(function () {
        if (timerCount <= 0) {
            clearInterval(timerInterval);
            timerCount = 0;
            endGame();
        } else {
            timerCount--;
        }
        timerEl.textContent = "Time: " + timerCount + " sec";
    }, 1000);
    nextScreen();
}

// Handles a correct answer
function correctAnswerSelect() {
    answerReveal();

    var message = document.createElement('h3');
    var nextButton = document.createElement('button');

    header.setAttribute('style','background-color: var(--correct)');
    frame.setAttribute('style','box-shadow: 0 0 24px var(--correct');

    message.textContent = "Correct!"
    nextButton.setAttribute('class', 'next-btn');
    nextButton.textContent = "Next";

    frame.appendChild(message);
    frame.appendChild(nextButton);
}

//Handles an incorrect answer
function incorrectAnswerSelect() {
    answerReveal();
    if (timerCount >= 20) {
        timerCount -= 20;
    } else {
        timerCount = 0;
        timerEl.textContent = "Time: " + timerCount + " sec";
        endGame();
        return;
    }

    timerEl.textContent = "Time: " + timerCount + " sec";

    var message = document.createElement('h3');
    var nextButton = document.createElement('button');

    header.setAttribute('style','background-color: var(--incorrect)');
    frame.setAttribute('style','box-shadow: 0 0 24px var(--incorrect');

    message.textContent = "Incorrect"
    nextButton.setAttribute('class', 'next-btn');
    nextButton.textContent = "Next";

    frame.appendChild(message);
    frame.appendChild(nextButton);
}

//Calls up the next question, or ends the game if the last question has been answered
function nextScreen() {
    clearFrame();

    header.setAttribute('style','background-color: var(--neutral)');
    frame.setAttribute('style','box-shadow: none');

    if (gamePosition >= questionArray.length) {
        endGame();
    } else {
        gamePosition++;
        displayQuestion(questionArray[gamePosition - 1], gamePosition);
    }
}

//Shuffles an array, used to randomize the order of questions and answers within each question
//Empties the array that is passed in and returns a new array
function shuffle(array) {
    var shuffledArray = [];
    var length = array.length;

    for (i = length; i > 0; i--) {
        var selectedIndex = Math.floor(Math.random() * i);
        shuffledArray.push(array[selectedIndex]);
        array.splice(selectedIndex, 1);
    }

    return shuffledArray;
}

function sumbitScore() {
    var nameInput = document.querySelector('.name-input');

    var storedScore = {
        storedName: nameInput.value,
        score: score
    }
    var highScores = JSON.parse(localStorage.getItem('High Scores'))
    if (highScores == null) {
        highScores = [];
    }

    highScores.push(storedScore);
    highScores.sort(function (a, b) { return b.score - a.score });
    localStorage.setItem('High Scores', JSON.stringify(highScores));
}

// Event listener to handle all button clicks within the main frame, actions vary
// based on button pressed.
frame.addEventListener("click", function (event) {
    if (event.target.className == 'start-btn') {
        startGame();
    } else if (event.target.className == 'correct-btn') {
        correctAnswerSelect();
    } else if (event.target.className == 'incorrect-btn') {
        incorrectAnswerSelect();
    } else if (event.target.className == 'next-btn') {
        nextScreen();
    } else if (event.target.className == 'clear-btn') {
        clearScores();
    } else if (event.target.className == 'submit-btn') {
        event.preventDefault();
        sumbitScore();
        displayHighScores();
    }
});

highScoresBtn.addEventListener("click", function (event) {
    if (!gameRunning){
        displayHighScores();
    }
})

function init() {
    var title = document.createElement('h1');
    var description = document.createElement('p');
    var startButton = document.createElement('button');

    title.textContent = "Coding Quiz";
    description.textContent = "A timed, seven question quiz to test your coding knowledge. The timer starts at 100 seconds; your final score is your remaining time. Each wrong answer subtracts 20 seconds. Press Start to begin!";
    startButton.textContent = "Start";
    startButton.setAttribute('class', 'start-btn');

    frame.appendChild(title);
    frame.appendChild(description);
    frame.appendChild(startButton);
}

init();