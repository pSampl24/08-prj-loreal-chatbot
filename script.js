/* DOM elements */
const chatForm = document.getElementById("chatForm");
const userInput = document.getElementById("userInput");
const chatWindow = document.getElementById("chatWindow");

// Set initial message
chatWindow.textContent = "👋 Hello! How can I help you today?";

/* Handle form submit */
chatForm.addEventListener("submit", (e) => {
  e.preventDefault();

  // Get what the user typed
  const userMessage = userInput.value.trim();

  // Don't allow empty messages
  if (userMessage === "") {
    return;
  }

  // Display the user's question
  chatWindow.textContent = `You asked: ${userMessage}`;

  // Clear the input box
  userInput.value = "";
});