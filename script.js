// Gemini API Key
const API_KEY = "AIzaSyB7S-n-78vd6nf-l9PPWozTQifbSYELbXo";

// API Adress
const API_URL = "https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent";

// Baatcheet ka record
let conversationHistory = [];

// HTML elements 
const chatBox = document.getElementById("chat-box");
const userInput = document.getElementById("user-input");
const sendBtn = document.getElementById("send-btn");

// Send button aur Enter key ke liye event listeners
sendBtn.addEventListener("click", sendMessage);
userInput.addEventListener("keydown", (event) => {
    if (event.key === "Enter") sendMessage();
});

// Message bhejne ka function
async function sendMessage() { }
const message = userInput.value.trim();
if (message === '') {
    addMessageToChat('ai', "Kuch to likho yaar ChatBuddy wait kar raha hay! 😊 ");
    return;
}

// User ka message chat box mein add karo
addMessageToChat('user', message);
conversationHistory.push({ role: 'user', parts: [{ text: message }] });
userInput.value = '';

// Loading message dikhao
addMessageToChat('ai', 'ChatBuddy Soch raha hoon... ⏳');
try {
const response = await fetch(`${API_URL}?key=${API_KEY}`, {
    method: 'POST',
    headers: {
        'Content-Type': 'application/json'
    },
    body: JSON.stringify({
            contents: conversationHistory
        })
    });
      if (!response.ok) {
        throw new Error(`API error: ${response.status}`);
    }
    const data = await response.json();
    const aiReply = data.candidates[0].content.parts[0].text;

        // Loading message hatao aur AI ka reply dikhaoo

        chatBox.removeChild(chatBox.lastChild);
        addMessageToChat('ai', aiReply);
        conversationHistory.push({ role: 'assistant', parts: [{ text: aiReply }] });
    } catch (error) {
        console.error('Error:', error);
        chatBox.removeChild(chatBox.lastChild);
        addMessageToChat('ai', "Oops, ChatBuddy ko mushkil horahi hay! Key Check Karain ya thori dair baad try karain 😅");
    }


// Message Chat Box main dikhany ka function add karna hay
function addMessageToChat(sender, text) {
    const messageDiv = document.createElement("div");
    messageDiv.classList.add("message", sender === 'user' ? 'user-message' : 'ai-message');
    messageDiv.textContent = text;
    chatBox.appendChild(messageDiv);
    chatBox.scrollTop = chatBox.scrollHeight
}