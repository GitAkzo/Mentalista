// =========================================
// LÓGICA DE INTERFACE: TEMA E MENU MOBILE
// =========================================
const themeToggleBtn = document.getElementById('theme-toggle');
const themeIcon = document.getElementById('theme-icon');
const body = document.body;

function updateThemeIcon(isDark) {
  themeIcon.textContent = isDark ? 'light_mode' : 'dark_mode';
}

if (localStorage.getItem('portfolio-theme') === 'dark' || 
  (!('portfolio-theme' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
  body.classList.add('dark');
  updateThemeIcon(true);
}

themeToggleBtn.addEventListener('click', () => {
  body.classList.toggle('dark');
  const isDark = body.classList.contains('dark');
  localStorage.setItem('portfolio-theme', isDark ? 'dark' : 'light');
  updateThemeIcon(isDark);
});

// Menu Mobile usando a nova estrutura (ID menu-toggle e mobile-menu)
const mobileToggleBtn = document.getElementById('menu-toggle');
const mobileNav = document.getElementById('mobile-menu');

mobileToggleBtn.addEventListener('click', () => {
  mobileNav.classList.toggle('active');
  const icon = mobileToggleBtn.querySelector('.material-symbols-outlined');
  icon.textContent = mobileNav.classList.contains('active') ? 'close' : 'menu';
});

// =========================================
// LÓGICA DO JOGO: MENTALISTA
// =========================================
let numeroSecreto;
let tentativas;

const guessInput = document.getElementById('guess-input');
const guessBtn = document.getElementById('guess-btn');
const messageContainer = document.getElementById('message-container');
const restartBtn = document.getElementById('restart-btn');

function iniciarJogo() {
  numeroSecreto = Math.floor(Math.random() * 11);
  tentativas = 3;
  
  messageContainer.textContent = '';
  messageContainer.className = 'message-box'; // Remove as classes de cor (error/success/warning)
  guessInput.value = '';
  guessInput.disabled = false;
  guessBtn.disabled = false;
  restartBtn.classList.add('hidden');
  guessInput.focus();
}

function processarPalpite() {
  const chute = parseInt(guessInput.value);

  if (isNaN(chute) || chute < 0 || chute > 10) {
    mostrarMensagem("Por favor, digite um número válido entre 0 e 10.", "error");
    return;
  }

  if (chute === numeroSecreto) {
    mostrarMensagem(`Parabéns, você acertou! O número era ${numeroSecreto}.`, "success");
    encerrarJogo();
  } else {
    tentativas--;
    
    if (tentativas > 0) {
      const dica = chute > numeroSecreto ? "menor" : "maior";
      mostrarMensagem(`Quase! O número secreto é ${dica} que ${chute}. Você tem ${tentativas} tentativa(s).`, "warning");
    } else {
      mostrarMensagem(`Que pena, acabaram suas tentativas. O número era ${numeroSecreto}.`, "error");
      encerrarJogo();
    }
  }
  
  guessInput.value = '';
  guessInput.focus();
}

function mostrarMensagem(texto, tipo) {
  messageContainer.textContent = texto;
  messageContainer.className = `message-box ${tipo}`;
}

function encerrarJogo() {
  guessInput.disabled = true;
  guessBtn.disabled = true;
  restartBtn.classList.remove('hidden');
}

// Event Listeners
guessBtn.addEventListener('click', processarPalpite);
restartBtn.addEventListener('click', iniciarJogo);

guessInput.addEventListener('keypress', function(evento) {
  if (evento.key === 'Enter') {
    processarPalpite();
  }
});

// Inicia o jogo no primeiro load
iniciarJogo();