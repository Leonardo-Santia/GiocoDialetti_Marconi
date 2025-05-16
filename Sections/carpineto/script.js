document.addEventListener("DOMContentLoaded", () => {
  // Audio and quiz questions setup
  const audioFiles = ["audio1.mp3", "audio2.mp3", "audio3.mp3"];
  const questions = [
    { 
      text: "Chi è Mariano?", 
      choices: [
        "È un postino", 
        "È un macellaio", 
        "È un contadino"
      ], 
      correct: 2 
    },
    { 
      text: "Di cosa si sta parlando?", 
      choices: ["Di campi d'orto", "Di debiti tra paesani", "Di luoghi da visitare"], 
      correct: 0 
    },
    { 
      text: "Cosa sono i PUZZI?", 
      choices: ["Massi", "Formiche", "Pozzi"], 
      correct: 1 
    }
  ];
  
  let currentAudioIndex = 0;
  let score = 0;
  
  const audioElement = document.getElementById("audio");
  const questionContainer = document.getElementById("question-container");
  
  // Back Button: return to the landing page (assumed to be at the root)
  document.getElementById("back-btn").addEventListener("click", () => {
    window.location.href = "../../index.html";
  });
  
  // Start next audio and question
  function playNextAudio() {
    if (currentAudioIndex < audioFiles.length) {
      audioElement.src = audioFiles[currentAudioIndex];
      audioElement.play();
      displayQuestion(currentAudioIndex);
    } else {
      showFinalScore();
    }
  }
  
  // Display the current question and its answers
  function displayQuestion(index) {
    const question = questions[index];
    questionContainer.innerHTML = `<h2>${question.text}</h2>`;
    
    question.choices.forEach((choice, i) => {
      const button = document.createElement("button");
      button.innerText = choice;
      button.classList.add("answer-btn");
      button.addEventListener("click", () => checkAnswer(i, index));
      questionContainer.appendChild(button);
    });
    
    // Add dynamic rotation effects on answer buttons for a subtle 3D feel
    document.querySelectorAll(".answer-btn").forEach(button => {
      button.addEventListener("mousemove", (event) => {
        const rect = button.getBoundingClientRect();
        const x = event.clientX - rect.left;
        const y = event.clientY - rect.top;
        const rotateX = (0.5 - y / rect.height) * 1;
        const rotateY = (0.5 - x / rect.width) * -1;
        button.style.transform = `perspective(150px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
      });
      button.addEventListener("mouseleave", () => {
        button.style.transform = "perspective(150px) rotateX(0) rotateY(0)";
      });
    });
  }
  
  // Check the selected answer and apply glowing feedback
  function checkAnswer(selectedIndex, questionIndex) {
    const isCorrect = selectedIndex === questions[questionIndex].correct;
    
    if (isCorrect) {
      score += 1;
    }
    
    document.querySelectorAll(".answer-btn")[selectedIndex]
      .classList.add(isCorrect ? "correct-answer" : "incorrect-answer");
    
    // Delay to let the glow effect be visible before moving on
    setTimeout(() => {
      document.querySelectorAll(".answer-btn")[selectedIndex]
        .classList.remove(isCorrect ? "correct-answer" : "incorrect-answer");
      currentAudioIndex++;
      playNextAudio();
    }, 1000);
  }
  
  // Display final score with reaction message based on performance
  function showFinalScore() {
    const maxScore = questions.length;
    let reaction = "";
    
    if (score >= 3) {
      reaction = "FANTASTICO, 3 su 3! Sei di Carpineto?";
    } else if (score == 2) {
      reaction = "Non male, ma non sei davvero del posto!";
    } else {
      reaction = "Il carpinetano non fa per te...";
    }
    
    const finalResultHTML = `
      <h2 id="final-score">Il tuo punteggio: ${score} / ${maxScore} </h2>
      <p class="score-reaction">${reaction}</p>
    `;
    
    questionContainer.innerHTML = "";
    document.getElementById("final-result").innerHTML = finalResultHTML;
    audioElement.pause();
  }
  
  // Start the quiz
  playNextAudio();
});


