let chatElements = []; // Declare an array to store chat elements
let isSliderDragging = false;

document.addEventListener("DOMContentLoaded", () => {
  const marks = document.querySelectorAll("mark");
  let count = 0
  marks.forEach((mark, index) => {
    // Fetch chat.html content
    fetch("../chat_widget/chat.html")
      .then((response) => response.text())
      .then((chatHTML) => {
        const chatElement = document.createElement("div");
        chatElement.id = `chat-${index}`;
        chatElement.innerHTML = chatHTML;
        chatElement.style.position = "absolute";
        chatElement.style.display = "none"; // Initially hidden
        document.body.appendChild(chatElement);
        update_sliders(chatElement);
        makeDraggable(chatElement); // Make the chat widget draggable
        chat_send(chatElement)
        update_chats(chatElement, index) 
        chatElements.push(chatElement);
        

        mark.addEventListener("click", (e) => {
          const markRect = mark.getBoundingClientRect();
          const afterWidth = 32; // Width of the ::after pseudo-element
          const clickX = e.clientX - markRect.left;

          if (clickX > markRect.width - afterWidth) {
            // Recalculate positions on click
            chatElement.style.left = `${markRect.right + 20 + window.scrollX}px`; // Add scrollX for horizontal scrolling
            chatElement.style.top = `${markRect.top + 30 + window.scrollY}px`; // Add scrollY for vertical scrolling
            // Toggle display
            chatElement.style.display = chatElement.style.display === "block" ? "none" : "block";
            // if (chatElement.classList.contains === "fade-out") {
            //   chatElement.classList.add("fade-in");
            //   chatElement.classList.remove("fade-out");


            //   chatElement.style.display = "block";
            // }
            // else{
            //   chatElement.style.display = "block";

            //   chatElement.classList.add("fade-out");
            //   chatElement.classList.remove("fade-in");

            //   // chatElement.style.display = "none";
            // }

          }
        });
      })
      .catch((error) => {
        console.error("Error fetching external file:", error);
      });
  });
});

function update_sliders(chatElement) {
  const sliderThumb = chatElement.querySelector('.slider-thumb');
  const sliderProgress = chatElement.querySelector('.slider-progress');
  // Assuming you might want to re-enable the percentage display in the future
  // const sliderPercentageDisplay = chatElement.querySelector('.slider-percentage');
  
  let isDragging = false;

  sliderThumb.addEventListener('mousedown', (e) => {
  
    isSliderDragging = true; // Set when slider thumb dragging starts
    e.stopPropagation(); // Prevent this event from triggering chatElement drag
    isDragging = true;
  });

  document.addEventListener('mousemove', (e) => {
    if (isDragging) {
      const sliderTrack = chatElement.querySelector('.slider-track');
      const trackRect = sliderTrack.getBoundingClientRect();
      let newLeft = e.clientX - trackRect.left - sliderThumb.offsetWidth / 2;

      newLeft = Math.max(0, Math.min(trackRect.width - sliderThumb.offsetWidth, newLeft));

      const percent = (newLeft / (trackRect.width - sliderThumb.offsetWidth)) * 100;
      sliderThumb.style.left = `${percent}%`;
      sliderProgress.style.width = `${percent}%`;
      // Assuming you might want to re-enable the percentage display in the future
      // sliderPercentageDisplay.textContent = `${Math.round(percent)}%`;
    }
  });

  document.addEventListener('mouseup', () => {
     isSliderDragging = false; 
    if (isDragging) {
      // Optional: Additional logic for when dragging stops
    }
    isDragging = false;
  });
}


function chat_send(chatElement) {
  const chatInput = chatElement.querySelector(".chat-input-element");
  const chatButton = chatElement.querySelector(".enter-button");
  chatButton.addEventListener("click", () => {
    const chatText = chatInput.value;
    if (chatText) {
      const chatOutput = chatElement.querySelector(".chat-body");
      chatOutput.innerHTML += `<p id='user_chat' class="user_chat">HUMAN: ${chatText}</p>`;
      chatInput.value = "";
    }

})

chatInput.addEventListener("keydown", (event) => {
  if (event.key === "Enter") {
    event.preventDefault(); // Prevent the default behavior of Enter key
    chatButton.click(); // Trigger the click event of the chatButton
  }
});
}

function makeDraggable(chatElement) {
  let isDragging = false;
  let dragStartX, dragStartY;

  chatElement.addEventListener('mousedown', (e) => {
    if (isSliderDragging) return; // Prevent chat widget from dragging when slider thumb is dragged
    isDragging = true;
    dragStartX = e.clientX - chatElement.offsetLeft;
    dragStartY = e.clientY - chatElement.offsetTop;
    chatElement.style.cursor = 'grabbing';
    e.stopPropagation(); // This prevents event bubbling up which might cause unintended behavior
  });

  document.addEventListener('mousemove', (e) => {
    if (isDragging && !isSliderDragging) { // Check again in case of race conditions
      const newX = e.clientX - dragStartX;
      const newY = e.clientY - dragStartY;
      chatElement.style.left = `${newX}px`;
      chatElement.style.top = `${newY}px`;
    }
  });

  document.addEventListener('mouseup', () => {
    if (isDragging) {
      isDragging = false;
      chatElement.style.cursor = 'grab';
    }
  });
}

// Function to check for the token repeatedly within a timeout
function waitForToken(timeout = 10000) {
  return new Promise((resolve, reject) => {
    const intervalTime = 500; // How often to check for the token (in milliseconds)
    const startTime = Date.now(); // Record start time

    // Function to check token presence
    const checkToken = () => {
      if (token) {
        resolve(); // Token found, proceed with execution
      } else if (Date.now() - startTime > timeout) {
        reject(new Error('Token not found within timeout period.')); // Timeout exceeded
      } else {
        setTimeout(checkToken, intervalTime); // Check again after a delay
      }
    };

    checkToken(); // Start checking for token
  });
}

async function update_chats(chatElement, i) {
  try {
    await waitForToken(); // Wait for token or timeout

    try {
      await build_knowledge_base_highlights(highlighted_text[i], i);
    } catch (e) {
      console.log("ERROR OPENAI QUERY", e);
    }

    const body_chat = chatElement.querySelector(".chat-body");
    body_chat.innerHTML = `<p id='ai_${i}' class='chat_message_ai'>AI: ${responses_data[i]}</p>`;
  } catch (error) {
    console.error(error); // Handle the case where the token is not found within the timeout
    // Optionally, you can update the UI or notify the user about the error here.
  }
}

