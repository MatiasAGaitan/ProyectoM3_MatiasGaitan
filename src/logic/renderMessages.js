export function renderMessages(messagesContainer, messagesList) {
    messagesContainer.innerHTML = messagesList.map((message) => {
        const messageType = message.role === 'user' ? 'user' : 'character'
        
        return `
            <div class="message-row ${messageType}">
                <div class="message-bubble">
                    <p>${message.text}</p>
                    <span class="message-time">${message.time}</span>
                </div>
            </div>
        `
    }).join('')
    
    messagesContainer.scrollTop = messagesContainer.scrollHeight
}

export function showTypingMessage(messagesContainer, characterName) {
    const typingMessage = document.createElement('div')
    const typingBubble = document.createElement('div')
    const typingText = document.createElement('p')
    
    typingMessage.className = 'message-row character typing-message'
    typingBubble.className = 'message-bubble'
    typingText.textContent = `${characterName} está escribiendo...`
    
    typingBubble.appendChild(typingText)
    typingMessage.appendChild(typingBubble)
    messagesContainer.appendChild(typingMessage)
    
    messagesContainer.scrollTop = messagesContainer.scrollHeight
}

export function hideTypingMessage(messagesContainer) {
    const typingMessage = messagesContainer.querySelector('.typing-message')
    
    if (typingMessage) {
        typingMessage.remove()
    }
}