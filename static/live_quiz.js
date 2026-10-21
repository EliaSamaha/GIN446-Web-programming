let total=0;
const cache={};
const userAnswers = [];
let currentQuestion = 0;
async function getQuestion(index){
  if(cache[index]!==undefined){
    return cache[index];
  }
 try {
const response = await fetch(`/api/question/${index}`);
 if (!response.ok) {
throw new Error("HTTP " + response.status);
}
const data = await response.json();
cache[index]=data;
return data;
} catch (error) {
console.log("Could not load question:", error.message);
} 
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
  const score = await calculateScore();
  const percentage = calculatePercentage(score);
  const message = getPerformanceMessage(percentage);
  const correction = await buildCorrection();
  showResults(score, percentage, message, correction);
}

async function renderQuestion() {
  document.getElementById("loading").hidden = false;
  
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
    document.getElementById("firstBtn").disabled = currentQuestion === 0;
    document.getElementById("previousBtn").disabled = currentQuestion === 0;
    document.getElementById("nextBtn").disabled =
      currentQuestion === total - 1;
    document.getElementById("lastBtn").disabled =
      currentQuestion === total - 1;
      
  } catch (error) {
    const errorEl = document.getElementById("error");
    errorEl.textContent = error.message;
    errorEl.hidden = false;
  } finally {
    document.getElementById("loading").hidden = true;
  }
}

// ======================================================
// DISPLAY RESULTS
// ======================================================
function showResults(score, percentage, message, correction) {
  document.getElementById("quizPanel").style.display = "none";
  document.getElementById("resultsPanel").style.display = "block";
  document.getElementById("scoreText").textContent =
    `Score: ${score} / ${total}`;
  document.getElementById("percentageText").textContent =
    `Percentage: ${percentage}%`;
  document.getElementById("performanceText").textContent = message;
  document.getElementById("correction").textContent = correction;
}
async function init(){
  try {
const Count = await fetch(`/api/questions/count`);
 if (!Count.ok) {
throw new Error("HTTP " + Count.status);
}
const qCount = await Count.json();
total=qCount.count;
await renderQuestion();

} catch (error) {
console.log("Invalid request", error.message);
} 

  
}

// ======================================================
// START APPLICATION
// ======================================================
init();
