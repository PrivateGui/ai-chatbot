const sendBtn = document.getElementById('send-btn');
const resetBtn = document.getElementById('reset-btn');
const userInput = document.getElementById('user-input');
const chatBox = document.getElementById('chat-box');
const API_TOKEN = "unused";

let currentChat = [];
let allChats = JSON.parse(localStorage.getItem('chats') || '{}');

sendBtn.onclick = sendMessage;
resetBtn.onclick = () => {
    currentChat = [];
    chatBox.innerHTML = '';
};

userInput.addEventListener('keydown', e => {
    if (e.key === 'Enter') sendMessage();
});

function appendMessage(message, sender) {
    const msg = document.createElement('div');
    msg.className = 'message ' + (sender === 'user' ? 'user-message' : 'ai-message');
    msg.textContent = message;
    chatBox.appendChild(msg);
    chatBox.scrollTop = chatBox.scrollHeight;
}

async function sendMessage() {
    const message = userInput.value.trim();
    if (!message) return;
    appendMessage(message, 'user');
    currentChat.push({ role: 'user', content: message });
    userInput.value = '';

    const res = await fetch("https://api.llm7.io/v1/chat/completions", {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${API_TOKEN}`
        },
        body: JSON.stringify({
            model: 'gpt-4.1-2025-04-14',
            messages: currentChat,
            max_tokens: 150
        })
    });

    const data = await res.json();
    const aiMessage = data.choices[0].message.content;
    appendMessage(aiMessage, 'ai');
    currentChat.push({ role: 'assistant', content: aiMessage });

    saveCurrentChat();
}

function saveCurrentChat() {
    const chatId = localStorage.getItem('currentChatId');
    allChats[chatId] = currentChat;
    localStorage.setItem('chats', JSON.stringify(allChats));
}