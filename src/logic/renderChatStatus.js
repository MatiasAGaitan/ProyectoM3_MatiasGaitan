export function renderChatStatus(statusContainer, status, characterName = '') {
    if (status === 'idle' || status === 'success') {
        statusContainer.textContent = ''
        statusContainer.className = 'chat-status'
        return
    }

    if (status === 'loading') {
        statusContainer.textContent = `${characterName} está escribiendo...`
        statusContainer.className = 'chat-status loading'
        return
    }

    if (status === 'error') {
        statusContainer.textContent = 'No se pudo conectar con la IA. Intentá de nuevo.'
        statusContainer.className = 'chat-status error'
    }
}