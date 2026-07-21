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
const greeting = document.createElement("p");
greeting.classList.add("msg", "ai");
greeting.textContent =
  "👋 Hello! How can I help with your beauty routine today?";
chatWindow.appendChild(greeting);

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

const userBubble = document.createElement("p");
userBubble.classList.add("msg", "user");
userBubble.textContent = `You: ${userMessage}`;
chatWindow.appendChild(userBubble);

  /* Show a loading message while waiting for AI */
  const loadingBubble = document.createElement("p");
loadingBubble.classList.add("msg", "ai");
loadingBubble.textContent = "Thinking...";
chatWindow.appendChild(loadingBubble);

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
  loadingBubble.remove();

  const errorBubble = document.createElement("p");
  errorBubble.classList.add("msg", "ai");
  errorBubble.textContent =
    data.error?.message || "Something went wrong while contacting OpenAI.";

  chatWindow.appendChild(errorBubble);
  chatWindow.scrollTop = chatWindow.scrollHeight;

  return;
}

/* Get the assistant's message from the API response */
const aiMessage = data.choices[0].message.content;

/* Save the assistant's response in the conversation history */
messages.push({
  role: "assistant",
  content: aiMessage,
});

/* Remove the temporary loading message */
loadingBubble.remove();

/* Display the assistant's response */
const aiBubble = document.createElement("p");
aiBubble.classList.add("msg", "ai");
aiBubble.textContent = `Assistant: ${aiMessage}`;
chatWindow.appendChild(aiBubble);

/* Scroll to the newest message */
chatWindow.scrollTop = chatWindow.scrollHeight;

/* Clear the input box */
userInput.value = "";

/* Put the cursor back inside the input */
userInput.focus();
});