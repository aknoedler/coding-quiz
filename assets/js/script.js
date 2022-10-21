var frame = document.querySelector('main');
var questionArray = [];

var questionOne = {
    questionText: "Placeholder question text?",
    correctAnswer: "Correct answer",
    incorrectOne: "Incorrect answer",
    incorrectTwo: "Incorrect answer",
    incorrectThree: "Incorrect answer"
}

//Clears the main frame
function clearFrame(){
    frame.children.forEach(element => {
        element.remove();
    });
}

//Passes in a question object and populates the frame based on that question
function displayQuestion(question, index){
    var currentHeader = document.createElement('h1');
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
    for (i=0; i < 4; i++){
        answerList.appendChild('li');
        answerList.children[i].appendChild('btn');
        if (answers[i] == question.correctAnswer){
            answerList.children[i].children[0].setAttribute('class', 'correct-btn');
        } else {
            answerList.children[i].children[0].setAttribute('class', 'incorrect-btn');
        }
        answerList.appendChild('h2');
        answerList.children[i].children[1].textContent(answers[i]);
    
}

//Sets up the timer, orders the question, and initiates the first question
function startGame(){

}

//Handles a correct answer
function correctAnswer(){

}

//Handles an incorrect answer
function incorrectAnswer(){

}

//Calls up the next question
function nextScreen(){

}

//Shuffles an array, used to randomize the order of questions and answers within each question
//Empties the array that is passed in and returns a new array
function shuffle(array){
    var shuffledArray = [];
    var length = array.length;

    for (i=length; i > 0; i--){
        var selectedIndex = Math.Floor(Math.random()*i);
        shuffledArray.push(array[selectedIndex]);
        array.splice(selectedIndex, 1);
    }

    return shuffledArray;
}

// Event listener to handle all button clicks within the main frame, actions vary
// based on button pressed.
frame.addEventListener("click", function(event) {
    if (event.target.class == 'start-btn'){
        startGame();
    }else if (event.target.class == 'correct-btn'){
        correctAnswer();
    }else if (event.target.class == 'incorrect-btn'){
        incorrectAnswer();
    }else if (event.target.class == 'next-btn'){
        nextScreen();
    }
});

function init() {
    // Displays intro page
}

init();