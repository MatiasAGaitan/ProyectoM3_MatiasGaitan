export async function sendMessageToCharacter(characterId, messages) {
    const response = await fetch('/api/chat', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            characterId,
            messages
        })
    })
    
    const data = await response.json()
    
    if (!response.ok) {
        throw new Error(data.error || 'No se pudo obtener respuesta de la IA.')
    }
    
    return data
}