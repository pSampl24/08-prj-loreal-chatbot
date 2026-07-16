/* DOM elements */
const chatForm = document.getElementById("chatForm");
const userInput = document.getElementById("userInput");
const chatWindow = document.getElementById("chatWindow");

/* Instructions that control the chatbot */
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
politely explain that you can only help with L'Oréal products and
beauty-related topics.

Keep responses friendly, clear, and concise.
Do not claim to diagnose medical conditions.
`;

/* Stores the system instructions and conversation history */
const messages = [
  {
    role: "system",
    content: systemPrompt,
  },
];
// Cloudflare Worker URL
const WORKER_URL = "PASTE_YOUR_WORKER_URL_HERE";
/* Initial chatbot greeting */
chatWindow.textContent =
  "👋 Hello! How can I help with your beauty routine today?";

/* Handle form submission */
chatForm.addEventListener("submit", async (e) => {

  /* Get what the user typed */
  const userMessage = userInput.value.trim();

  /* Do not allow empty messages */
  if (userMessage === "") {
    return;
  }

  /* Save the user's message in the conversation history */
  messages.push({
    role: "user",
    content: userMessage,
  });

  /* Temporarily display the latest question */
  chatWindow.textContent = `You asked:\n\n${userMessage}`;

  /* Clear the input box */
  userInput.value = "";

  /* Put the cursor back inside the input */
  userInput.focus();
});