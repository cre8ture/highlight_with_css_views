let chatElements = []; // Declare an array to store chat elements
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

  sliderThumb.addEventListener('mousedown', () => {
    isDragging = true;
    console.log('mousedown');
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
    if (isDragging) {
      // Optional: Additional logic for when dragging stops
    }
    isDragging = false;
  });
}



function makeDraggable(chatElement) {
  let isDragging = false;
  let dragStartX, dragStartY;

  // When the mouse is pressed down on the chat element
  chatElement.addEventListener('mousedown', (e) => {
    isDragging = true;
    dragStartX = e.clientX - chatElement.offsetLeft;
    dragStartY = e.clientY - chatElement.offsetTop;
    chatElement.style.cursor = 'grabbing';
  });

  // When the mouse is moving while pressed down
  document.addEventListener('mousemove', (e) => {
    if (isDragging) {
      const newX = e.clientX - dragStartX;
      const newY = e.clientY - dragStartY;
      chatElement.style.left = `${newX}px`;
      chatElement.style.top = `${newY}px`;
    }
  });

  // When the mouse button is released
  document.addEventListener('mouseup', () => {
    if (isDragging) {
      isDragging = false;
      chatElement.style.cursor = 'grab';
    }
  });
}