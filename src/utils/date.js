export function getCurrentTime() {
    const now = new Date()
    
    const date = now.toLocaleDateString(undefined, {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric'
    })
    
    const time = now.toLocaleTimeString(undefined, {
        hour: '2-digit',
        minute: '2-digit'
    })
    
    return `${time} - ${date}`
}