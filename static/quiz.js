
// ======================================================
// QUESTIONS
// ======================================================
const questions = [
  {
    question: "Which country has won the FIFA World Cup the most times in history?",
    choices: ["Germany", "Italy", "Argentina", "Brazil"],
    answer: 3,
    explanation: "Brazil has won 5 World Cup titles (1958, 1962, 1970, 1994, 2002)."
  },
  {
    question: "Which club has won the most UEFA Champions League / European Cup titles?",
    choices: ["AC Milan", "Real Madrid", "Liverpool", "Bayern Munich"],
    answer: 1,
    explanation: "Real Madrid leads Europe with 15 European Cup / Champions League trophies."
  },
  {
    question: "Who is the only player in football history to have won 8 Ballon d'Or awards?",
    choices: ["Cristiano Ronaldo", "Michel Platini", "Lionel Messi", "Johan Cruyff"],
    answer: 2,
    explanation: "Lionel Messi won his 8th Ballon d'Or in 2023."
  },
  {
    question: "Which English team famously completed an entire 38-game Premier League season undefeated in 2003–04 ?",
    choices: ["Manchester United", "Chelsea", "Liverpool", "Arsenal"],
    answer: 3,
    explanation: "Managed by Arsène Wenger, Arsenal finished the 2003–04 season with 26 wins and 12 draws."
  },
  {
    question: "During the famous 1986 World Cup quarter-final between Argentina and England, Diego Maradona scored his iconic \"Hand of God\" goal. Who was the English goalkeeper he scored against?",
    choices: ["Peter Shilton", "David Seaman", "Gordon Banks", "Ray Clemence"],
    answer: 0,
    explanation: "Peter Shilton was England's goalkeeper during Maradona's legendary dual performance in 1986."
  },
  {
    question: "Who holds the record for the fastest hat-trick in UEFA Champions League history, scoring 3 goals in just 6 minutes and 12 seconds?",
    choices: ["Robert Lewandowski", "Mohamed Salah", "Erling Haaland", "Cristiano Ronaldo"],
    answer: 1,
    explanation: "Mohamed Salah came off the bench for Liverpool against Rangers in October 2022 to score a hat-trick in 6m 12s."
  },
  {
    question: "Before 1995, the Ballon d'Or was only awarded to players of European nationality. Who was the first non-European player to win the award after the rules were changed?",
    choices: ["Ronaldo Nazário", "Romário", "George Weah", "Rivaldo"],
    answer: 2,
    explanation: "George Weah won the award in 1995 while playing for AC Milan."
  },
  {
    question: "Which player holds the record for the most goals scored in a single FIFA World Cup tournament, netting an incredible 13 goals in 1958?",
    choices: ["Gerd Müller", "Just Fontaine", "Pelé", "Ronaldo Nazário"],
    answer: 1,
    explanation: "Just Fontaine scored 13 goals in just 6 games at the 1958 World Cup in Sweden."
  },
  {
    question: "Who is the only player in football history to win the UEFA Champions League with three different clubs?",
    choices: ["Samuel Eto'o", "Cristiano Ronaldo", "Clarence Seedorf", "Zlatan Ibrahimović"],
    answer: 2,
    explanation: "Clarence Seedorf won four Champions League titles across three different clubs: Ajax (1995), Real Madrid (1998), and AC Milan (2003, 2007)."
  },
  {
    question: "Who is the only defender to win the Ballon d'Or in the 21st century (since the year 2000)?",
    choices: ["Virgil van Dijk", "Paolo Maldini", "Sergio Ramos", "Fabio Cannavaro"],
    answer: 3,
    explanation: "Fabio Cannavaro won the 2006 Ballon d'Or after captaining Italy to World Cup glory."
  }
];
// ======================================================
// APPLICATION STATE
// ======================================================
let currentQuestion = 0;
const userAnswers = new Array(questions.length);

// ======================================================
// SAVE AN ANSWER
// ======================================================
function saveAnswer(choiceIndex) {
  userAnswers[currentQuestion]=choiceIndex;
}

// ======================================================
// NAVIGATION
// ======================================================
function goNext() {
   if(currentQuestion<questions.length-1){
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
  currentQuestion=questions.length-1;
  renderQuestion();
}

// ======================================================
// CALCULATE SCORE
// ======================================================
function calculateScore() {
   let score=0;
    let i=0;
while(i<questions.length){
     if(userAnswers[i]===questions[i].answer){
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
 const percentageScore = (score / questions.length) * 100;
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
function buildCorrection() {
  let correction = "";

  for (let i = 0; i < questions.length; i++) {
    const q = questions[i];
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
function submitQuiz() {
  const score = calculateScore();
  const percentage = calculatePercentage(score);
  const message = getPerformanceMessage(percentage);
  const correction = buildCorrection();
  showResults(score, percentage, message, correction);
}

function renderQuestion() {
  const q = questions[currentQuestion];

  // --------------------------------------------------
  // QUESTION NUMBER
  // --------------------------------------------------
  document.getElementById("progress").textContent =
    `Question ${currentQuestion + 1} of ${questions.length}`;

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
    currentQuestion === questions.length - 1;
  document.getElementById("lastBtn").disabled =
    currentQuestion === questions.length - 1;
}

// ======================================================
// DISPLAY RESULTS
// ======================================================
function showResults(score, percentage, message, correction) {
  document.getElementById("quizPanel").style.display = "none";
  document.getElementById("resultsPanel").style.display = "block";
  document.getElementById("scoreText").textContent =
    `Score: ${score} / ${questions.length}`;
  document.getElementById("percentageText").textContent =
    `Percentage: ${percentage}%`;
  document.getElementById("performanceText").textContent = message;
  document.getElementById("correction").textContent = correction;
}

// ======================================================
// START APPLICATION
// ======================================================
renderQuestion();
