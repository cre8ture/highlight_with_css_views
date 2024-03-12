let highlighted_text = {}
document.addEventListener("DOMContentLoaded", () => {
    highlighted_text = extractMarkedTexts()
})


function extractMarkedTexts() {
        // Find all <mark> elements in the document
        const marks = document.querySelectorAll('mark');
        const result = {};
      
        marks.forEach(mark => {
          // Extract the data-author attribute and the text content
          const author = mark.getAttribute('data-author');
          const text = mark.textContent;
      
          // Check if the author already exists in the result object
          if (result[author]) {
            // If yes, append the text to the existing array
            result[author].push(text);
          } else {
            // If no, create a new array with the text
            result[author] = [text];
          }
        });
      
        // Return the result as a JSON string
        return JSON.stringify(result, null, 2); // Pretty print the JSON
      }
      
      