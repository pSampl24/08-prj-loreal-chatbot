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
const WORKER_URL = "https://loreal-chatbot-api.precioussampl.workers.dev";
/* Initial chatbot greeting */
chatWindow.textContent =
  "👋 Hello! How can I help with your beauty routine today?";

/* Handle form submission */
chatForm.addEventListener("submit", async (e) => {
  e.preventDefault();

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

  /* Show a loading message while waiting for AI */
  chatWindow.textContent = "Thinking...";

  const response = await fetch(WORKER_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      messages: messages,
    }),
  });

  const data = await response.json();

  console.log(data);

  if (!response.ok) {
    chatWindow.textContent =
      data.error?.message || "Something went wrong while contacting OpenAI.";
    return;
  }

  const aiMessage = data.choices[0].message.content;

  messages.push({
    role: "assistant",
    content: aiMessage,
  });

  chatWindow.textContent = aiMessage;
  /* Clear the input box */
  userInput.value = "";

  /* Put the cursor back inside the input */
  userInput.focus();
});
