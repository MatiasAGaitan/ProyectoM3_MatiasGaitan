const THEME_STORAGE_KEY = 'chatweb_theme'

export function updateThemeButtonText(themeButton) {
    if (document.body.classList.contains('light-theme')) {
        themeButton.textContent = 'Dark mode'
    } else {
        themeButton.textContent = 'Light mode'
    }
}

export function getSavedTheme() {
    return localStorage.getItem(THEME_STORAGE_KEY)
}

export function saveTheme(theme) {
    localStorage.setItem(THEME_STORAGE_KEY, theme)
}

export function applySavedTheme() {
    const savedTheme = getSavedTheme()

    if (savedTheme === 'light') {
        document.body.classList.add('light-theme')
    }
}