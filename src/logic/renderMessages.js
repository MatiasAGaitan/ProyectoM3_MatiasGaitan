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
