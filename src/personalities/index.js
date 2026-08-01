import { tony } from './tony.js';
import { hermione } from './hermione.js';
import { yoda } from './yoda.js';

export const characters = [tony, hermione, yoda];

export function getPersonality(characterId) {
    return characters.find((character) => {
        return character.id === characterId;
    });
}