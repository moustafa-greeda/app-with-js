//  ===================================== select variables ===========================================
let quizeArea = document.querySelector('.quiz-area'),
    answersArea = document.querySelector('.answers-area'),
    submitAnswer = document.querySelector('.submit-button'),
    mainBullets = document.querySelector('.bullets'),
    spanBullets = document.querySelector('.bullets .spans'),
    countDownContainer = document.querySelector('.bullets .countdown'),
    category = document.querySelector('.category'),
    countQuestion = document.querySelector('.count span'),
    resultsContainer = document.querySelector('.results');
    // Set Options
    let currentIndex = 0,
        rightAnswers = 0,
        countdownInterval;


    // trigger function getQuestion
    getQuestion();
// fetch question from json

function getQuestion() {
    
    let myRequest = new XMLHttpRequest();

    myRequest.onreadystatechange = function () {
        if (this.readyState === 4 && this.status === 200) {
            let questions = JSON.parse(this.responseText);
            // console.log(JSON.parse(this.responseText));
            let questionLength = questions.length;
            // console.log(questionLength);

            //trigger function create bullets
            createBullets(questionLength);

            // trigger function get data question
            addQuestionsData(questions[currentIndex], questionLength);  
            
            // trigger count down function 
            countDown(3, questionLength);
            
            // on click submit button
            submitAnswer.onclick = () => {
                if (currentIndex < questionLength) {
                    let rAnswer = questions[currentIndex].right_answer;
                    // console.log(rAnswer);
                    currentIndex++;
                    checkAnswer(rAnswer, questionLength);
                    quizeArea.innerHTML = "";
                    answersArea.innerHTML = "";

                    // trigger function get data question
                    addQuestionsData(questions[currentIndex], questionLength); 
                    
                    // trigger function handel bullet
                    handleBullet(currentIndex);

                    //trigger function show result
                    showResult(questionLength);

                    // trigger count down function 
                    clearInterval(countdownInterval);
                    countDown(3, questionLength);
                    
                }
            }
        }
    }
    myRequest.open('GET', 'questions.json' , true);
    myRequest.send();
}

//================================ function create bullets =======================================
function createBullets(questionLength) {
    countQuestion.innerHTML = questionLength
    for (let i = 1; i <= questionLength; i++){
        let bullet = document.createElement('span');
        // Check If Its First Span
        if (i === 1) {
            bullet.classList.add('on');
        }
        bullet.setAttribute('data-id' , i);
        let bulletText = document.createTextNode(i);
        // append child
        bullet.appendChild(bulletText);
        spanBullets.appendChild(bullet);
    }
}
//================================ function get questions =======================================
function addQuestionsData(obj , count) {
    // console.log(questions);
    if (currentIndex < count) {
        // ---------------create H2 question title --------------------
        let questionTitle = document.createElement('h2');
        let textTitle = document.createTextNode(obj['title']);
        // append child 
        questionTitle.appendChild(textTitle);
        quizeArea.appendChild(questionTitle);
        // ---------------create answer question title --------------------
        for (let i = 1; i <= 4; i++){
            // create main answer
            let mainDiv = document.createElement('div');
            mainDiv.className = "answer"

            // create radio button answer
            let answer = document.createElement('input');
            if (i === 1) {
                answer.checked = true
            }
            answer.type = "radio";
            answer.name = "answer";
            answer.id = `answer_${i}`
            answer.dataset.answer = obj[`answer_${i}`];

            // create label for radio button answer
            let labelAnswer = document.createElement('label');
            labelAnswer.className = "label";
            labelAnswer.htmlFor = `answer_${i}`;
    
            let labelText = document.createTextNode(obj[`answer_${i}`]);
            // // append child

            labelAnswer.appendChild(labelText);
            mainDiv.appendChild(answer);
            mainDiv.appendChild(labelAnswer);
            answersArea.appendChild(mainDiv);
        }
    }
}
//================================ function check answer =======================================
function checkAnswer(rAnswer, count) {
    let answers = document.getElementsByName('answer');
    let choosenAnswer;

    for (let i = 0; i < answers.length; i++){
        if (answers[i].checked) {
            choosenAnswer = answers[i].dataset.answer;
        }
    }
    // console.log(choosenAnswer);
    if (rAnswer === choosenAnswer) {
        rightAnswers++;
    }
    // console.log(rightAnswers);

}
//================================ function show result =======================================
function showResult(count) {
    let theResult;
    if (currentIndex === count) {
        // console.log("hello from show result");
        quizeArea.remove();
        answersArea.remove();
        submitAnswer.remove();
        mainBullets.remove();

    if (rightAnswers == count) {
        theResult = `<span class="perfect">Excellent</span> rigth answer is: [${rightAnswers}] from [${count}]`;
    }
    else if (rightAnswers > count / 2 && rightAnswers < count) {
        theResult = `<span class="good">Good</span> rigth answer is: [${rightAnswers}] from [${count}]`;
    }
    else {
        theResult = `<span class="bad">Bad</span> rigth answer is: [${rightAnswers}] from [${count}]`;
    }
    resultsContainer.innerHTML = theResult;
    resultsContainer.style.padding = "10px";
    resultsContainer.style.backgroundColor = "white";
    resultsContainer.style.marginTop = "10px";
    }
}
//================================ function handel bullet =======================================
function handleBullet(currentIndex) {
    let bullets = document.querySelectorAll('.bullets .spans span')

    bullets.forEach(function (bullet, index) {
        // console.log(currentIndex);
        if (currentIndex === index) {
            bullet.classList.add('on');
        }
    });
}
//================================ function count down =======================================
function countDown(duration, qCount) {
    let minutes, secondes;

    if (currentIndex < qCount) {
        countdownInterval = setInterval(function () {

            minutes = parseInt(duration / 60);
            secondes = parseInt(duration % 60);

            minutes = minutes < 10 ? `0${minutes}`: minutes;
            secondes = secondes < 10 ? `0${secondes}` : secondes;
    
            countDownContainer.innerHTML = `${minutes} : ${secondes}`;

            if (--duration < 0) {
                clearInterval(countdownInterval);
                submitAnswer.click();
            }
    
        }, 1000 );
    }
}
