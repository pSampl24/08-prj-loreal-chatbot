/* DOM elements */
const chatForm = document.getElementById("chatForm");
const userInput = document.getElementById("userInput");
const chatWindow = document.getElementById("chatWindow");

// Instructions that control what the chatbot is allowed to discuss
const systemPrompt = `
You are a helpful L'Oréal Beauty Assistant.

Only answer questions about:
- L'Oréal products
- skincare
- makeup
- haircare
- fragrance
- beauty routines
- personalized beauty recommendations

If the user asks about something unrelated to beauty or L'Oréal,
politely explain that you can only help with L'Oréal products and beauty-related topics.

Keep responses friendly, clear, and concise.
Do not claim to diagnose medical conditions.
`;

// Stores the system instructions and later conversation messages
const messages = [
  {
    role: "system",
    content: systemPrompt,
  },
];
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

  // Add the user's message to the conversation history
messages.push({
  role: "user",
  content: userMessage,
});

// Temporarily display the latest question
chatWindow.textContent = `You asked:\n\n${userMessage}`;
  // Clear the input box
  userInput.value = "";
});