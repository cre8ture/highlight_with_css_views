
// const query = {
const prompt1 = "help me understand this quote. Explain it to me based on my understanding level, where 0 represents no understanding and 1 represents mastery. The higher my understanding is the more technical and granular you should be. A low understanding means give intuition and explain it to a beginner"
const understanding_ini = "5"
let responses_data = []


function json_to_arr(json_doc){
    let sortedArray = Object.keys(json_doc)
  .map(Number) // Convert keys to numbers
  .sort((a, b) => a - b) // Sort numbers in ascending order
  .map(key => json_doc[key.toString()]); // Map sorted keys back to their values

return sortedArray
}
  

async function build_knowledge_base_highlights(data_item, chat_id) {
    // const responses_data = [];

    if(initial_data){
        responses_data = json_to_arr(initial_data)
        console.log("notes are already stores, no need to query memory agent")
        return
    }

      const query = {
        "prompt": prompt1,
        "quote": data_item.text[0],//item.text[0]
        "understanding": understanding_ini,
        "sessionId": chat_id,
      };

    //   console.log("i is the query!", query)
      try {
        const response = await queryMemoryAgent(query);
        // Assuming response is the final result from your queryMemoryAgent function
        responses_data.push({"human": data_item.text[0], "ai": response});
      } catch (error) {
        console.error("Error querying memory agent:", error);
        responses_data.push({"human": data_item.text[0], "ai": "Error processing request"});
      }
  
    // At this point, responses_data is filled with responses for each item
  }
  