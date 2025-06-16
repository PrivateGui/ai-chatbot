// chat.js
const currentUser = localStorage.getItem('currentUser');
const users = JSON.parse(localStorage.getItem('users') || '{}');
const chatHistoryEl = document.getElementById('chat-history');
const input = document.getElementById('user-input');
document.getElementById('user-name').innerText = currentUser || 'User';

// Load saved history
if (currentUser && users[currentUser].history) {
  users[currentUser].history.forEach(msg => {
    appendMessage(msg.sender, msg.text);
  });
}

function appendMessage(sender, text) {
  const msg = document.createElement('div');
  msg.classList.add('message', sender);
  msg.innerText = text;
  chatHistoryEl.appendChild(msg);
  chatHistoryEl.scrollTop = chatHistoryEl.scrollHeight;
}

// LLM7.io API request
async function sendMessage() {
  const text = input.value.trim();
  if (!text) return;

  appendMessage('user', text);
  saveToHistory('user', text);
  input.value = '';

  appendMessage('bot', '...');
  const pendingEl = chatHistoryEl.lastChild;

  try {
    const res = await fetch('https://api.llm7.io/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer YOUR_AI_API_TOKEN'
      },
      body: JSON.stringify({
        model: 'gpt-4.1-2025-04-14',
        messages: [
          { role: 'system', content: 'You are an AI chatbot created by bigenzo (zonercm).' },
          ...users[currentUser].history.map(h => ({
            role: h.sender === 'user' ? 'user' : 'assistant',
            content: h.text
          })),
          { role: 'user', content: text }
        ],
        temperature: 0.7
      })
    });

    const data = await res.json();
    const reply = data.choices?.[0]?.message?.content || 'No response.';

    pendingEl.remove();
    appendMessage('bot', reply);
    saveToHistory('bot', reply);
  } catch (err) {
    pendingEl.remove();
    appendMessage('bot', '❌ Failed to fetch response.');
  }
}

function saveToHistory(sender, text) {
  users[currentUser].history.push({ sender, text });
  localStorage.setItem('users', JSON.stringify(users));
}
