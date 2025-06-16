function toggleSidebar() {
    const sidebar = document.getElementById('sidebar');
    sidebar.style.display = sidebar.style.display === 'none' ? 'block' : 'none';
}

function newChat() {
    const id = Date.now().toString();
    localStorage.setItem("currentChatId", id);
    document.getElementById("chat-box").innerHTML = "";
    currentChat = [];
    const chatList = document.getElementById("chat-list");
    const item = document.createElement("div");
    item.textContent = "چت " + Object.keys(allChats).length;
    item.onclick = () => loadChat(id);
    chatList.appendChild(item);
}

function loadChat(id) {
    currentChat = allChats[id] || [];
    document.getElementById("chat-box").innerHTML = "";
    currentChat.forEach(m => appendMessage(m.content, m.role === 'user' ? 'user' : 'ai'));
    localStorage.setItem("currentChatId", id);
}