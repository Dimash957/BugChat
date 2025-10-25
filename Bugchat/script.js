let chatHistory = [];
let currentChat = [];

// Helper function to display messages
function displayMessages() {
    const messagesContainer = document.getElementById('chatMessages');
    const mainContent = document.querySelector('.main-content');
    messagesContainer.innerHTML = '';
    
    currentChat.forEach(msg => {
        const messageDiv = document.createElement('div');
        messageDiv.className = `message ${msg.type}`;
        messageDiv.textContent = msg.text;
        messagesContainer.appendChild(messageDiv);
    });
    
    messagesContainer.classList.add('active');
    document.getElementById('welcomeText').style.display = 'none';
    mainContent.classList.add('chat-active');
    
    // Scroll to bottom of messages
    messagesContainer.scrollTop = messagesContainer.scrollHeight;
}

// Handle file upload
document.getElementById('fileInput').addEventListener('change', function(e) {
    const file = e.target.files[0];
    if (!file) return;
    
    const reader = new FileReader();
    reader.onload = function(event) {
        const fileContent = event.target.result;
        
        // Add user message with file info
        currentChat.push({ 
            type: 'user', 
            text: `Uploaded file: ${file.name}\n\nContent:\n${fileContent.substring(0, 500)}${fileContent.length > 500 ? '...' : ''}` 
        });
        
        // Add AI response
        const aiResponse = `I've received your file "${file.name}". Analyzing the code for potential bugs and issues...`;
        currentChat.push({ type: 'ai', text: aiResponse });
        
        // Display messages
        displayMessages();
        
        // Reset file input
        e.target.value = '';
    };
    
    reader.readAsText(file);
});

// Create new chat
document.getElementById('createNewChat').addEventListener('click', function() {
    const mainContent = document.querySelector('.main-content');
    
    if (currentChat.length > 0) {
        chatHistory.push([...currentChat]);
        currentChat = [];
    }
    
    document.getElementById('chatMessages').classList.remove('active');
    document.getElementById('chatMessages').innerHTML = '';
    document.getElementById('welcomeText').style.display = 'block';
    document.getElementById('websiteInput').value = '';
    document.getElementById('codeInput').value = '';
    mainContent.classList.remove('chat-active');
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
    
    // If both inputs are empty, open file picker
    if (!websiteInput && !codeInput) {
        document.getElementById('fileInput').click();
        return;
    }
    
    const userMessage = websiteInput || codeInput;
    
    // Add user message
    currentChat.push({ type: 'user', text: userMessage });
    
    // Add AI response
    const aiResponse = `Analyzing your ${websiteInput ? 'website' : 'code'}... I'll help you identify and fix any bugs.`;
    currentChat.push({ type: 'ai', text: aiResponse });
    
    // Display messages
    displayMessages();
    
    // Clear inputs
    document.getElementById('websiteInput').value = '';
    document.getElementById('codeInput').value = '';
});

// Allow Enter key to submit
document.getElementById('websiteInput').addEventListener('keypress', function(e) {
    if (e.key === 'Enter') {
        const websiteInput = document.getElementById('websiteInput').value.trim();
        const codeInput = document.getElementById('codeInput').value.trim();
        
        if (websiteInput || codeInput) {
            document.getElementById('submitBtn').click();
        }
    }
});

document.getElementById('codeInput').addEventListener('keypress', function(e) {
    if (e.key === 'Enter') {
        const websiteInput = document.getElementById('websiteInput').value.trim();
        const codeInput = document.getElementById('codeInput').value.trim();
        
        if (websiteInput || codeInput) {
            document.getElementById('submitBtn').click();
        }
    }
});