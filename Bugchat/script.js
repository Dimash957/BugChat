let chatHistory = [];
let currentChat = [];

// Create new chat
document.getElementById('createNewChat').addEventListener('click', function() {
    if (currentChat.length > 0) {
        chatHistory.push([...currentChat]);
        currentChat = [];
    }
    
    document.getElementById('chatMessages').classList.remove('active');
    document.getElementById('chatMessages').innerHTML = '';
    document.getElementById('welcomeText').style.display = 'block';
    document.getElementById('websiteInput').value = '';
    document.getElementById('codeInput').value = '';
});

// Toggle chat library
document.getElementById('chatLibrary').addEventListener('click', function() {
    const historyContainer = document.getElementById('chatHistoryContainer');
    historyContainer.classList.toggle('active');
    
    if (historyContainer.classList.contains('active')) {
        displayChatHistory();
    }
});

// Display chat history
function displayChatHistory() {
    const historyContainer = document.getElementById('chatHistoryContainer');
    historyContainer.innerHTML = '';
    
    if (chatHistory.length === 0) {
        historyContainer.innerHTML = '<div style="color: #7a6a5a; padding: 10px; font-size: 13px;">No previous chats</div>';
        return;
    }
    
    chatHistory.forEach((chat, index) => {
        const chatItem = document.createElement('div');
        chatItem.className = 'chat-item';
        chatItem.textContent = `Chat ${index + 1} - ${chat.length} message(s)`;
        chatItem.addEventListener('click', () => loadChat(index));
        historyContainer.appendChild(chatItem);
    });
}

// Load a previous chat
function loadChat(index) {
    currentChat = [...chatHistory[index]];
    const messagesContainer = document.getElementById('chatMessages');
    messagesContainer.innerHTML = '';
    
    currentChat.forEach(msg => {
        const messageDiv = document.createElement('div');
        messageDiv.className = `message ${msg.type}`;
        messageDiv.textContent = msg.text;
        messagesContainer.appendChild(messageDiv);
    });
    
    messagesContainer.classList.add('active');
    document.getElementById('welcomeText').style.display = 'none';
    document.getElementById('chatHistoryContainer').classList.remove('active');
}

// Submit message
document.getElementById('submitBtn').addEventListener('click', function() {
    const websiteInput = document.getElementById('websiteInput').value.trim();
    const codeInput = document.getElementById('codeInput').value.trim();
    
    if (!websiteInput && !codeInput) return;
    
    const userMessage = websiteInput || codeInput;
    
    // Add user message
    currentChat.push({ type: 'user', text: userMessage });
    
    // Add AI response
    const aiResponse = `Analyzing your ${websiteInput ? 'website' : 'code'}... I'll help you identify and fix any bugs.`;
    currentChat.push({ type: 'ai', text: aiResponse });
    
    // Display messages
    const messagesContainer = document.getElementById('chatMessages');
    messagesContainer.innerHTML = '';
    
    currentChat.forEach(msg => {
        const messageDiv = document.createElement('div');
        messageDiv.className = `message ${msg.type}`;
        messageDiv.textContent = msg.text;
        messagesContainer.appendChild(messageDiv);
    });
    
    messagesContainer.classList.add('active');
    document.getElementById('welcomeText').style.display = 'none';
    
    // Clear inputs
    document.getElementById('websiteInput').value = '';
    document.getElementById('codeInput').value = '';
});

// Allow Enter key to submit
document.getElementById('websiteInput').addEventListener('keypress', function(e) {
    if (e.key === 'Enter') document.getElementById('submitBtn').click();
});

document.getElementById('codeInput').addEventListener('keypress', function(e) {
    if (e.key === 'Enter') document.getElementById('submitBtn').click();
});