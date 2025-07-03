const data = [
    {
        "posicion": 1,
        "nombre": "Acheron",
        "creado_por": "ryamu",
        "verificado_por": "Zoink",
        "jugador_record": "PaltaDash",
        "top_demonlist": "#9",
        "videoId": "oSI7bEwP99s"
    },
    {
        "posicion": 2,
        "nombre": "Kyouki",
        "creado_por": "出呂世",
        "verificado_por": "出呂世",
        "jugador_record": "manu - Perrix47",
        "top_demonlist": "#14",
        "videoId": "9R5Czv6mbps"
    },
    {
        "posicion": 3,
        "nombre": "Slaughterhouse",
        "creado_por": "Icedcave",
        "verificado_por": "Doggie",
        "jugador_record": "PaltaDash",
        "top_demonlist": "#16",
        "videoId": "v-EYBYjne9E"
    },
    {
        "posicion": 4,
        "nombre": "poocubed",
        "creado_por": "Liisp",
        "verificado_por": "Kyasshukodo",
        "jugador_record": "Perrix47",
        "top_demonlist": "#23",
        "videoId": "8F5_XQA0ZLA"
    },
    {
        "posicion": 5,
        "nombre": "Saul Goodman",
        "creado_por": "Renn241",
        "verificado_por": "Jori",
        "jugador_record": "Perrix47",
        "top_demonlist": "#25",
        "videoId": "ywW9KrTH7kc"
    },
    {
        "posicion": 6,
        "nombre": "Belladona",
        "creado_por": "cherryteam",
        "verificado_por": "exsii",
        "jugador_record": "manu",
        "top_demonlist": "#28",
        "videoId": "vJuflWhrDn4"
    },
    {
        "posicion": 7,
        "nombre": "Solar Flare",
        "creado_por": "Linear",
        "verificado_por": "swiborg",
        "jugador_record": "Perrix47",
        "top_demonlist": "#31",
        "videoId": "jidCmLHzBEM"
    },
    {
        "posicion": 8,
        "nombre": "LIMBO",
        "creado_por": "MindCap",
        "verificado_por": "BUNNYGRAM",
        "jugador_record": "manu",
        "top_demonlist": "#32",
        "videoId": "BCAoGUlQDEc"
    },
    {
        "posicion": 9,
        "nombre": "The Yangire",
        "creado_por": "Dorami",
        "verificado_por": "Dorami",
        "jugador_record": "manu - Paltadash - Perrix47 - Chiloé",
        "top_demonlist": "#40",
        "videoId": "CnjcKBEZRBo"
    },
    {
        "posicion": 10,
        "nombre": "Collapse",
        "creado_por": "Nexel",
        "verificado_por": "Nexel",
        "jugador_record": "Perrix47",
        "top_demonlist": "#42",
        "videoId": "CnjcKBEZRBo"
    }
];

const container = document.getElementById('list');
const searchInput = document.getElementById('search');

function renderList(items) {
    container.innerHTML = '';
    items.forEach(item => {
        const card = document.createElement('div');
        card.className = 'card';

        const left = document.createElement('div');
        left.className = 'card-content';
        left.innerHTML = `
            <h2>#${item.posicion} - ${item.nombre}</h2>
            <p><span>🎮</span> <strong>Creado por:</strong> ${item.creado_por}</p>
            <p><span>✅</span> <strong>Verificado por:</strong> ${item.verificado_por}</p>
            <p><span>🏆</span> <strong>Jugador récord:</strong> ${item.jugador_record}</p>
            <p><span>🔎</span> <strong>Top en Demonlist:</strong> ${item.top_demonlist}</p>
        `;

        const right = document.createElement('div');
        right.className = 'card-video';
        const iframe = document.createElement('iframe');
        iframe.src = `https://www.youtube.com/embed/${item.videoId}?rel=0`;
        iframe.title = item.nombre;
        iframe.frameBorder = "0";
        iframe.allow = "accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture";
        iframe.allowFullscreen = true;
        right.appendChild(iframe);

        card.appendChild(left);
        card.appendChild(right);
        container.appendChild(card);
    });
}

renderList(data);

searchInput.addEventListener('input', () => {
    const query = searchInput.value.toLowerCase();
    const filtered = data.filter(item =>
        item.nombre.toLowerCase().includes(query) ||
        item.creado_por.toLowerCase().includes(query) ||
        item.verificado_por.toLowerCase().includes(query) ||
        item.jugador_record.toLowerCase().includes(query)
    );
    renderList(filtered);
});

const toggleButton = document.getElementById('toggle-mode');
toggleButton.addEventListener('click', () => {
    document.body.classList.toggle('dark');
    toggleButton.textContent = document.body.classList.contains('dark') ? '☀️ Modo Claro' : '🌙 Modo Oscuro';
});

const hamburger = document.getElementById('hamburger');
const searchContainer = document.getElementById('search-container');

hamburger.addEventListener('click', () => {
    searchContainer.classList.toggle('active');
});
