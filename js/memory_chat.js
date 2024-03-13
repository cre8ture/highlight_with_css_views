const url = "http://localhost:3000/query-memory-agent"; // Replace with your actual endpoint URL
const url_no_memory = "http://localhost:3000/query-agent";


// async function queryMemoryAgent(query) {
// //   const { url, token, params, prompt } = event.data;
// let result;
// //   console.log("POST!,  url, token, params, prompt", url, token, params, prompt);

//   fetch(url, {
//     method: "POST", // Specify the method if it's not a GET request

//     headers: {
//       Authorization: `Bearer ${token}`,

//       "Content-Type": "application/json", // Ensure you have the correct content type for your request
//     },

//     body: JSON.stringify(query), // The body should be included for POST requests
//   })
//     .then((response) => {
//       console.log("stream response", response);

//       const reader = response.body.getReader();

//       console.log("i is reader", reader);

//       let decoder = new TextDecoder();

//       function read() {
//         reader.read().then(({ done, value }) => {
//           if (done) {
//             // self.postMessage({ done: true }); // Signal that streaming is complete

//             return result;
//           }

//           // Process and post each chunk

//           let chunk = decoder.decode(value, { stream: true });

//         //   self.postMessage({ chunk: chunk, done: false });
//         console.log(chunk)
//         result += chunk;

//           read(); // Read the next chunk
//         });
//       }

//       read();
//     })
//     .catch((error) => {
//     //   self.postMessage({ error: error.message });
//     console.error("Failed to query memory agent:", error);
//     result = error;
//     });

//     return result;
// }
async function queryMemoryAgent(query) {
    let result = '';
  
    try {
      const response = await fetch(url_no_memory, {
        method: "POST",
        headers: {
          "Authorization": `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(query),
      });
  
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
  
      const reader = response.body.getReader();
      const decoder = new TextDecoder();
  
      while (true) {
        const { done, value } = await reader.read();
        if (done) break;
        result += decoder.decode(value, { stream: true });
      }
      
      console.log("Final result:", result);
      return result;
    } catch (error) {
      console.error("Failed to query memory agent:", error);
      throw error; // It's generally a good idea to rethrow the error after logging it.
    }
  }
  