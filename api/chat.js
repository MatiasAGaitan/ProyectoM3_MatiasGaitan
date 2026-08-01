import { GoogleGenerativeAI } from '@google/generative-ai';
import { getPersonality } from '../src/personalities/index.js';

export default async function handler(req, res) {
    if (req.method !== 'POST') {
        return res.status(405).json({ error: 'Method not allowed' });
    }
    
    try {
        const apiKey = process.env.GEMINI_API_KEY;
        
        if (!apiKey) {
            return res.status(500).json({
                error: 'Falta configurar GEMINI_API_KEY en las variables de entorno.'
            });
        }
        
        const { characterId, messages } = req.body || {};
        
        if (!characterId || !Array.isArray(messages) || messages.length === 0) {
            return res.status(400).json({
                error: 'Petición inválida. Se requiere characterId y un array messages.'
            });
        }
        
        const personality = getPersonality(characterId);
        
        if (!personality) {
            return res.status(404).json({
                error: `Personaje "${characterId}" no encontrado.`
            });
        }
        
        const genAI = new GoogleGenerativeAI(apiKey);
        
        const model = genAI.getGenerativeModel({
            model: 'gemini-3.5-flash-lite'
        });
        
        const conversationHistory = messages
        .map((message) => {
            const speaker = message.role === 'user' ? 'Usuario' : personality.name;
            return `${speaker}: ${message.text}`;
        })
        .join('\n');
        
        const prompt = `
            ${personality.systemPrompt}

            Historial de la conversación:
                    ${conversationHistory}
                    
            Responde el último mensaje del usuario manteniendo la personalidad del personaje.
            La respuesta debe ser breve, natural y apropiada para un chat.
            `;
        
        const result = await model.generateContent(prompt);
        const response = await result.response;
        const reply = response.text().trim();
        
        const usage = response.usageMetadata;
        
        console.log('--- Tokens de esta llamada ---');
        console.log('Prompt:', usage?.promptTokenCount);
        console.log('Respuesta:', usage?.candidatesTokenCount);
        console.log('Total:', usage?.totalTokenCount);
        
        if (!reply) {
            return res.status(502).json({
                error: 'La IA devolvió una respuesta vacía. Probá de nuevo.'
            });
        }
        
        return res.status(200).json({
            reply,
            characterId,
            usage: {
                promptTokens: usage?.promptTokenCount ?? 0,
                outputTokens: usage?.candidatesTokenCount ?? 0,
                totalTokens: usage?.totalTokenCount ?? 0
            }
        });
        
    } catch (error) {
        console.error('Error calling Gemini:', error);
        
        return res.status(500).json({
            error: 'Error generando respuesta con Gemini.'
        });
    }
}