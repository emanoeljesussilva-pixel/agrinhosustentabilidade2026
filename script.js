// Configuração da API da NASA
// Nota: 'DEMO_KEY' tem limites. Para produção, obtenha uma em api.nasa.gov
const NASA_API_URL = 'https://api.nasa.gov/planetary/apod?api_key=DEMO_KEY';

async function fetchNasaData() {
    const contentDiv = document.getElementById('nasa-content');
    const loader = document.getElementById('loader');

    try {
        const response = await fetch(NASA_API_URL);
        const data = await response.json();

        if (response.ok) {
            renderNasaData(data);
        } else {
            throw new Error(data.msg);
        }
    } catch (error) {
        contentDiv.innerHTML = `<p>Erro ao carregar dados: ${error.message}</p>`;
    }
}

function renderNasaData(data) {
    const contentDiv = document.getElementById('nasa-content');
    
    // Verifica se é vídeo ou imagem
    const mediaHtml = data.media_type === 'image' 
        ? `<img src="${data.url}" alt="${data.title}">`
        : `<iframe width="100%" height="400" src="${data.url}" frameborder="0" allowfullscreen></iframe>`;

    contentDiv.innerHTML = `
        <h3>${data.title}</h3>
        <p style="margin-bottom: 20px; color: #aaa;">Data: ${data.date}</p>
        ${mediaHtml}
        <p class="explanation" style="text-align: justify; margin-top: 20px;">
            ${data.explanation}
        </p>
    `;
}

// Efeito de Scroll Suave para links internos
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
    });
});

// Inicialização
window.addEventListener('DOMContentLoaded', fetchNasaData);