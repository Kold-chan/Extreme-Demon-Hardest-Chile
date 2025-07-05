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
            <button class="btn-open-comments" style="margin-top: 10px; padding: 8px 12px; border: none; border-radius: 6px; background-color: var(--button-bg); color: white; cursor: pointer;">Ver comentarios</button>
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

        left.querySelector('.btn-open-comments').addEventListener('click', () => {
          openDetails(item);
        });
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

const detailsSection = document.getElementById('details-comments');
const closeDetailsBtn = document.getElementById('close-details');
const detailsTitle = document.getElementById('details-title');
const detailsCreador = document.getElementById('details-creador');
const detailsVerificador = document.getElementById('details-verificador');
const detailsJugador = document.getElementById('details-jugador');
const detailsTop = document.getElementById('details-top');
const detailsIframe = document.getElementById('details-iframe');
const commentsList = document.getElementById('comments-list');
const commentForm = document.getElementById('comment-form');
const commentInput = document.getElementById('comment-input');

let currentLevel = null;

function openDetails(level) {
  currentLevel = level;
  detailsTitle.textContent = `#${level.posicion} - ${level.nombre}`;
  detailsCreador.textContent = level.creado_por;
  detailsVerificador.textContent = level.verificado_por;
  detailsJugador.textContent = level.jugador_record;
  detailsTop.textContent = level.top_demonlist;
  detailsIframe.src = `https://www.youtube.com/embed/${level.videoId}?rel=0`;

  loadComments(level.posicion);
  detailsSection.style.display = 'flex';  // mostrar modal y usar flex para centrar

  document.body.classList.add('modal-open'); // bloquear scroll body
}

closeDetailsBtn.addEventListener('click', () => {
  detailsSection.style.display = 'none';
  detailsIframe.src = '';
  currentLevel = null;
  document.body.classList.remove('modal-open'); // restaurar scroll
});


function scrollToCenter(element) {
  const elementRect = element.getBoundingClientRect();
  const absoluteElementTop = window.pageYOffset + elementRect.top;
  const middle = absoluteElementTop - (window.innerHeight / 2) + (elementRect.height / 2);
  window.scrollTo({ top: middle, behavior: 'smooth' });
}

closeDetailsBtn.addEventListener('click', () => {
  detailsSection.style.display = 'none';
  detailsIframe.src = '';
  currentLevel = null;
});

const INVITADO = "Invitado";

function loadComments(levelPos) {
  commentsList.innerHTML = '';
  let comments = JSON.parse(localStorage.getItem('comments_' + levelPos)) || [];
  comments.forEach((comment, idx) => {
    addCommentToDOM(comment, idx);
  });
}

function addCommentToDOM(comment, idx) {
  const li = document.createElement('li');
  li.dataset.idx = idx;

  const authorSpan = document.createElement('span');
  authorSpan.className = 'author';
  authorSpan.textContent = comment.author + ': ';

  const textSpan = document.createElement('span');
  textSpan.textContent = comment.text;

  li.appendChild(authorSpan);
  li.appendChild(textSpan);

  if(comment.author === DEV_KOLD) {
    const delBtn = document.createElement('span');
    delBtn.textContent = '✖';
    delBtn.className = 'delete-btn';
    delBtn.title = 'Borrar comentario';
    delBtn.style.cursor = 'pointer';
    delBtn.addEventListener('click', () => {
      deleteComment(idx);
    });
    li.appendChild(delBtn);
  }

  commentsList.appendChild(li);
}

function deleteComment(idx) {
  if (!currentLevel) return;
  let comments = JSON.parse(localStorage.getItem('comments_' + currentLevel.posicion)) || [];
  comments.splice(idx, 1);
  localStorage.setItem('comments_' + currentLevel.posicion, JSON.stringify(comments));
  loadComments(currentLevel.posicion);
}

commentForm.addEventListener('submit', e => {
  e.preventDefault();
  if (!currentLevel) return;

  const newComment = {
    author: DEV_KOLD,
    text: commentInput.value.trim()
  };

  if (newComment.text.length === 0) return;

  let comments = JSON.parse(localStorage.getItem('comments_' + currentLevel.posicion)) || [];
  comments.push(newComment);
  localStorage.setItem('comments_' + currentLevel.posicion, JSON.stringify(comments));
  
  commentInput.value = '';
  loadComments(currentLevel.posicion);
});

const toggleButton = document.getElementById('toggle-mode');
toggleButton.addEventListener('click', () => {
    document.body.classList.toggle('dark');
    toggleButton.textContent = document.body.classList.contains('dark') ? '☀️' : '🌙';
});

const hamburger = document.getElementById('hamburger');
const searchContainer = document.getElementById('search-container');

hamburger?.addEventListener('click', () => {
    searchContainer.classList.toggle('active');
});
