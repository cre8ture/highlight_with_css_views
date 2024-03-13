let highlighted_text = {}
document.addEventListener("DOMContentLoaded", () => {
    highlighted_text = extractMarkedTexts()
    console.log(highlighted_text)
    const query = {}
})


function extractMarkedTexts() {
        // Find all <mark> elements in the document
        const marks = document.querySelectorAll('mark');
        const result = {};
      
        marks.forEach((mark, i) => {
          // Extract the data-author attribute and the text content
          const author = mark.getAttribute('data-author');
          const text = mark.textContent;
          const newDat = {}
          
          // Check if the author already exists in the result object
          if (result[author]) {
              newDat[text].append(text)

            // If yes, append the text to the existing array
            // result[author] = 
          } else {
            // If no, create a new array with the text
            newDat["text"] = [text]
            newDat["order"] = i
            result[author] = newDat
          }
        });
      
        // Return the result as a JSON string
        // return JSON.stringify(result, null, 2); // Pretty print the JSON
        // console.log("on thje res...I is result", result )

            const dataArray = Object.values(result).sort((a, b) => a.order - b.order);

        return dataArray
      }
      
      