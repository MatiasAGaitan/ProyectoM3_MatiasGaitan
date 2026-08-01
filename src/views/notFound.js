export function renderNotFound() {
    const app = document.getElementById('app')
    app.innerHTML = `
        <section>
            <h2>404 — Esta ruta no existe en ChatWeb</h2>
            <p>Revisá la URL, o volvé al <a href="/" data-link>inicio</a>.</p>
        </section>
    `
}