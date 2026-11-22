let total=0;
const cache={};
const userAnswers = [];
let currentQuestion = 0;
async function getQuestion(index){
  if(cache[index]!==undefined){
    return cache[index];
  }
  // No try/catch here: if the request fails, the error is passed
  // up to the caller, which shows it to the user.
  const response = await fetch(`/api/question/${index}`);
  if (!response.ok) {
    throw new Error("HTTP " + response.status);
  }
  const data = await response.json();
  cache[index]=data;
  return data;
}

// ======================================================
// LOADING / ERROR STATES
// ======================================================
let retryAction = null;   // what "Try again" should re-run

function setLoading(isLoading) {
  document.getElementById("loading").hidden = !isLoading;
  // While waiting, disable every button so the user can't double-click
  document.querySelectorAll("#quizPanel button").forEach(function (btn) {
    btn.disabled = isLoading;
  });
}

function showError(message, action) {
  document.getElementById("errorText").textContent = message;
  document.getElementById("error").hidden = false;
  retryAction = action;
}

function hideError() {
  document.getElementById("error").hidden = true;
}

function retry() {
  hideError();
  if (retryAction) retryAction();
}

function saveAnswer(choiceIndex) {
  userAnswers[currentQuestion]=choiceIndex;
}


function goNext() {
   if(currentQuestion<total-1){
         currentQuestion++;
         renderQuestion();
    }
}

function goPrevious() {
 if(currentQuestion>0){
        currentQuestion--;
        renderQuestion();
    }
}

function goFirst() {
  currentQuestion=0;
  renderQuestion();
}
function goLast() {
  currentQuestion=total-1;
  renderQuestion();
}

// ======================================================
// CALCULATE SCORE
// ======================================================
 async function calculateScore() {
   let score=0;
    let i=0;
while(i<total){
  let res=await getQuestion(i);

     if(userAnswers[i]===res.answer){
        score++;
    }
    i++;
}
return score;

}

// ======================================================
// CALCULATE PERCENTAGE
// ======================================================
function calculatePercentage(score) {
 const percentageScore = (score / total) * 100;
  return Math.round(percentageScore);
}

// ======================================================
// PERFORMANCE MESSAGE
// ======================================================
function getPerformanceMessage(percentage) {
 if (percentage >= 80) {
    return "Excellent";
  } else if (percentage >= 60) {
    return "Good";
  } else if (percentage >= 50) {
    return "Pass";
  } else {
    return "Needs improvement";
  }
}

// ======================================================
// BUILD CORRECTION
// ======================================================
 async function buildCorrection() {
  let correction = "";

  for (let i = 0; i < total; i++) {
    let res= await getQuestion(i);
    const q = res;
    const userAnswerIndex = userAnswers[i];

    let userAnswerText = "Not answered";
    if (userAnswerIndex !== undefined && userAnswerIndex !== null) {
      userAnswerText = q.choices[userAnswerIndex];
    }

    const correctAnswerText = q.choices[q.answer];
    const isCorrect = userAnswerIndex === q.answer;
    const resultText = isCorrect ? "Correct" : "Incorrect";

    correction += `Question ${i + 1}: ${q.question}\n`;
    correction += `Your answer: ${userAnswerText}\n`;
    correction += `Correct answer: ${correctAnswerText}\n`;
    correction += `Result: ${resultText}\n`;
    correction += `Explanation: ${q.explanation}\n\n`;
  }

  return correction;
}

// ======================================================
// PROVIDED INTERFACE CODE
//
// DOM manipulation and events will be studied later.
// ======================================================

// ======================================================
// SUBMIT QUIZ
// ======================================================
async function submitQuiz() {
  const focused = document.activeElement;
  hideError();
  setLoading(true);
  try {
    const score = await calculateScore();
    const percentage = calculatePercentage(score);
    const message = getPerformanceMessage(percentage);
    const correction = await buildCorrection();
    setLoading(false);
    showResults(score, percentage, message, correction);
  } catch (error) {
    setLoading(false);
    showError("Couldn't submit your answers. Check your connection and try again.", submitQuiz);
    restoreFocus(focused);
  }
}

async function renderQuestion() {
  const focused = document.activeElement;   // remember which button was pressed
  hideError();
  setLoading(true);

  try {
    const q = await getQuestion(currentQuestion);

    // --------------------------------------------------
    // QUESTION NUMBER
    // --------------------------------------------------
    document.getElementById("progress").textContent =
      `Question ${currentQuestion + 1} of ${total}`;

    // --------------------------------------------------
    // QUESTION
    // --------------------------------------------------
    document.getElementById("questionText").textContent = q.question;

    // --------------------------------------------------
    // CHOICES
    // --------------------------------------------------
    const choicesContainer = document.getElementById("choices");
    choicesContainer.innerHTML = "";
    for (let i = 0; i < q.choices.length; i++) {
      const label = document.createElement("label");
      label.className = "choice";
      const radio = document.createElement("input");
      radio.type = "radio";
      radio.name = "answer";
      radio.value = i;
      // Restore an answer previously selected
      // by the user.
      if (userAnswers[currentQuestion] === i) {
        radio.checked = true;
      }
      // When the user selects this answer,
      // save its index.
      radio.onclick = function () {
        saveAnswer(i);
      };
      label.appendChild(radio);
      label.appendChild(document.createTextNode(" " + q.choices[i]));
      choicesContainer.appendChild(label);
    }

    // --------------------------------------------------
    // NAVIGATION BUTTONS
    // --------------------------------------------------
    setLoading(false);   // re-enable buttons, then disable the ones that don't apply
    document.getElementById("firstBtn").disabled = currentQuestion === 0;
    document.getElementById("previousBtn").disabled = currentQuestion === 0;
    document.getElementById("nextBtn").disabled =
      currentQuestion === total - 1;
    document.getElementById("lastBtn").disabled =
      currentQuestion === total - 1;
    restoreFocus(focused);
  } catch (error) {
    setLoading(false);
    showError("Couldn't load this question. Check your connection and try again.", renderQuestion);
    restoreFocus(focused);
  }
}

// ======================================================
// KEEP KEYBOARD FOCUS IN PLACE
// ======================================================
// After the question changes, put focus back on the button the user
// pressed. If that button is now disabled or hidden (e.g. "Next" on the
// last question), move focus to the question instead so it isn't lost.
function restoreFocus(el) {
  if (!el || el === document.body) return;   // nothing was focused (first load)
  if (el.disabled || el.offsetParent === null) {
    document.getElementById("questionText").focus();
  } else {
    el.focus();
  }
}


// ======================================================
// DISPLAY RESULTS
// ======================================================
function showResults(score, percentage, message, correction) {
  document.getElementById("quizPanel").hidden = true;
  document.getElementById("resultsPanel").hidden = false;
  document.getElementById("scoreText").textContent =
    `Score: ${score} / ${total}`;
  document.getElementById("percentageText").textContent =
    `Percentage: ${percentage}%`;
  document.getElementById("performanceText").textContent = message;
  document.getElementById("correction").textContent = correction;
  // Move focus to the results so keyboard and screen-reader users land on them
  document.getElementById("resultsHeading").focus();
}
async function init(){
  hideError();
  setLoading(true);
  try {
    const Count = await fetch(`/api/questions/count`);
    if (!Count.ok) {
      throw new Error("HTTP " + Count.status);
    }
    const qCount = await Count.json();
    total=qCount.count;
    await renderQuestion();
  } catch (error) {
    setLoading(false);
    showError("Couldn't load the quiz. Check your connection and try again.", init);
  }
}

// ======================================================
// START APPLICATION
// ======================================================
init();