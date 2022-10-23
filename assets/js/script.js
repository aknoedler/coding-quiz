var frame = document.querySelector('main');
var gamePosition = 0;
var timerCount = 100;
var timerEl = document.querySelector('.timer');
var timerInterval;
var score;

var questionOne = {
    questionText: "Placeholder question text?",
    correctAnswer: "Correct answer",
    incorrectOne: "Incorrect answer",
    incorrectTwo: "Incorrect answer",
    incorrectThree: "Incorrect answer"
}

var questionTwo = {
    questionText: "Placeholder question text?",
    correctAnswer: "Correct answer",
    incorrectOne: "Incorrect answer",
    incorrectTwo: "Incorrect answer",
    incorrectThree: "Incorrect answer"
}

var questionThree = {
    questionText: "Placeholder question text?",
    correctAnswer: "Correct answer",
    incorrectOne: "Incorrect answer",
    incorrectTwo: "Incorrect answer",
    incorrectThree: "Incorrect answer"
}

var questionFour = {
    questionText: "Placeholder question text?",
    correctAnswer: "Correct answer",
    incorrectOne: "Incorrect answer",
    incorrectTwo: "Incorrect answer",
    incorrectThree: "Incorrect answer"
}

var questionFive = {
    questionText: "Placeholder question text?",
    correctAnswer: "Correct answer",
    incorrectOne: "Incorrect answer",
    incorrectTwo: "Incorrect answer",
    incorrectThree: "Incorrect answer"
}

var questionSix = {
    questionText: "Placeholder question text?",
    correctAnswer: "Correct answer",
    incorrectOne: "Incorrect answer",
    incorrectTwo: "Incorrect answer",
    incorrectThree: "Incorrect answer"
}

var questionSeven = {
    questionText: "Placeholder question text?",
    correctAnswer: "Correct answer",
    incorrectOne: "Incorrect answer",
    incorrectTwo: "Incorrect answer",
    incorrectThree: "Incorrect answer"
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
function displayHighScores(){
    clearFrame();
    var title = document.createElement('h2');
    var scoreList =document.createElement('ul');
    var replayBtn = document.createElement('button');
    var scoreArray = [];

    title.textContent = "High Scores";
    replayBtn.textContent = "Play again";
    replayBtn.setAttribute('class', 'start-btn');

    frame.appendChild(title);
    frame.appendChild(scoreList);
    frame.appendChild(replayBtn);

    // Creates an array of the stored high scores
    for (i = 1; i <= localStorage.length; i++){
        var scoreEntry = JSON.parse(localStorage.getItem(i));
        scoreArray.push(scoreEntry);
    }

    // Sorts the array based on the score
    scoreArray.sort(function(a, b){return b.score - a.score});

    for(i = 1; i <= localStorage.length; i++){
         var listItem = document.createElement('li');
         listItem.textContent = i + ". " + scoreArray[i].name + " " + scoreArray[i].score;
         scoreList.appendChild(listItem);
    }
}

// Stops timer, stores score, displays ending screen
function endGame() {
    clearFrame();
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

    message.textContent = "Incorrect"
    nextButton.setAttribute('class', 'next-btn');
    nextButton.textContent = "Next";

    frame.appendChild(message);
    frame.appendChild(nextButton);
}

//Calls up the next question, or ends the game if the last question has been answered
function nextScreen() {
    clearFrame();
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

function submitScore() {
    var nameInput = document.querySelector('.name-input');
    var storedScoreIndex = JSON.stringify(localStorage.length + 1);
    var storedScore = {
        name: nameInput.value.trim(),
        score: score
    }

    localStorage.setItem(storedScoreIndex, JSON.stringify(storedScore));
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
    }
    else if (event.target.className == 'submit-btn') {
         event.preventDefault();
         submitScore();
         displayHighScores();
    }
});

function init() {
    var title = document.createElement('h1');
    var description = document.createElement('p');
    var startButton = document.createElement('button');

    title.textContent = "Title goes here";
    description.textContent = "Description goes here";
    startButton.textContent = "Start";
    startButton.setAttribute('class', 'start-btn');

    frame.appendChild(title);
    frame.appendChild(description);
    frame.appendChild(startButton);
}

init();