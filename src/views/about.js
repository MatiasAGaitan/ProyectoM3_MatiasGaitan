export function renderAbout() {
    const app = document.getElementById('app')

    app.innerHTML = `
        <section class="about-view">
            <div class="about-header">
                <span class="about-eyebrow">Acerca del proyecto</span>
                <h2>ChatWeb</h2>
                <p>
                    ChatWeb es una experiencia de chat interactiva que permite conversar con personajes ficticios mediante inteligencia artificial, manteniendo una navegación rápida, simple y sin recargas.
                </p>
            </div>

            <div class="about-content">
                <article class="about-card">
                    <h3>La propuesta</h3>
                    <p>
                        La aplicación combina una interfaz SPA con respuestas generadas por IA para ofrecer conversaciones dinámicas, separadas por personaje y adaptadas al estilo de cada personalidad.
                    </p>
                    <p>
                        Cada conversación conserva su propio historial, permite cambiar entre personajes y mantiene una experiencia fluida tanto en desktop como en mobile.
                    </p>
                </article>

                <article class="about-card">
                    <h3>Personajes disponibles</h3>
                    <p>
                        <strong>Tony Stark</strong>: directo, tecnológico, seguro de sí mismo y con un toque de sarcasmo.
                    </p>
                    <p>
                        <strong>Hermione Granger</strong>: ordenada, inteligente, didáctica y enfocada en explicar con claridad.
                    </p>
                    <p>
                        <strong>Yoda</strong>: sabio, sereno, reflexivo y con respuestas breves inspiradas en su forma característica de hablar.
                    </p>
                </article>

                <article class="about-card">
                    <h3>Desarrollo</h3>
                    <p>
                        ChatWeb fue desarrollada con HTML, CSS y JavaScript vanilla, priorizando una estructura modular, rutas SPA, consumo de APIs, persistencia local y despliegue en Vercel.
                    </p>
                    <p>
                        Autor: <strong>Gaitan Matias</strong>.
                    </p>
                </article>
            </div>
        </section>
    `
}