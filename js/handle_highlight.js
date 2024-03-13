document.addEventListener("DOMContentLoaded", () => {
  document.addEventListener('mouseup', (e) => {
    const text = window.getSelection().toString().trim();
    const menu = document.getElementById('text-selection-menu');

    if (text.length > 0) {
      // Use clientX and clientY for fixed positioning relative to the viewport
      menu.style.top = `${e.clientY}px`;
      menu.style.left = `${e.clientX}px`;
      menu.style.display = "block";
      
      // Adjust if the menu goes out of the viewport
      setTimeout(() => { // Timeout ensures the menu is already shown and its dimensions can be measured
        const menuRect = menu.getBoundingClientRect();

        if (menuRect.right > window.innerWidth) {
          menu.style.left = `${window.innerWidth - menuRect.width}px`;
        }
        if (menuRect.bottom > window.innerHeight) {
          menu.style.top = `${window.innerHeight - menuRect.height}px`;
        }
      }, 0);
      
      menu.classList.remove('hidden');
    } else {
      // Hide the menu
      menu.style.display = "none";
      menu.classList.add('hidden');
    }
  });

  // Hide the menu when clicking on it
  document.getElementById('text-selection-menu').addEventListener('click', () => {
    const menu = document.getElementById('text-selection-menu');
    menu.style.display = "none";
    menu.classList.add('hidden');
  });


//   QUIZ STUFF
//   const explainBtn = document.getElementById("explain-btn");
//   const quizBtn = document.getElementById("quiz-btn");
//   const questions = [
//     // Add your questions and answers here
//   ];

//   let currentQuestion = 0;
//   let selectedAnswer;

//   const questionEl = document.querySelector(".question");
//   const answerEls = document.querySelectorAll(".answer-option");
  const nextBtn = document.querySelector("#next-quiz-btn");
  const quizEl = document.getElementById("quiz");
//   const explainBtn = document.getElementById("explain-btn");
  const quizBtn = document.getElementById("quiz-btn");
  function showQuiz() {
    console.log("showing quiz!");
    quizEl.classList.add("show"); // Use the correct class to display the quiz
  }
  
  function hideQuiz() {
    console.log("hiding quiz!");
    quizEl.classList.remove("show"); // Use the correct class to hide the quiz
  }
  
  // Initially hide the quiz
  hideQuiz();
  
  quizBtn.addEventListener("click", (e) => {
    e.stopPropagation(); // Prevent the click from immediately closing the quiz
    showQuiz();
  });
  

  // Close quiz when clicking outside the quiz element (excluding clicks on the quiz itself)
  document.addEventListener("click", (event) => {
    if (event.target !== quizEl && !quizEl.contains(event.target)) {
      hideQuiz();
    }
  });

  nextBtn.addEventListener("click", () => {
    // ... same logic for handling answer selection and moving to next question
  });

});
