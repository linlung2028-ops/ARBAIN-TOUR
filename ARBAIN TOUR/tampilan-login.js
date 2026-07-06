const loginForm = document.getElementById('login-form');
const loginCard = document.getElementById('login-card');
const successCard = document.getElementById('success-card');
const passwordInput = document.getElementById('passwordInput');
const togglePassword = document.getElementById('togglePassword');
const startExplore = document.getElementById('startExplore');
const visitProfile = document.getElementById('visitProfile');

if (togglePassword) {
  togglePassword.addEventListener('click', () => {
    const type = passwordInput.type === 'password' ? 'text' : 'password';
    passwordInput.type = type;
    togglePassword.textContent = type === 'password' ? '👁️' : '🙈';
  });
}

if (loginForm) {
  loginForm.addEventListener('submit', event => {
    event.preventDefault();
    loginCard.classList.add('hidden');
    successCard.classList.remove('hidden');
  });
}

if (startExplore) {
  startExplore.addEventListener('click', () => {
    window.location.href = 'index.html';
  });
}

if (visitProfile) {
  visitProfile.addEventListener('click', () => {
    window.location.href = 'profil-saya.html';
  });
}
