// Hide all content initially
function hideContent() {
    const content = document.querySelector('main');
    if (content) {
        content.style.display = 'none';
    }
}

// Check if user is already authenticated
function checkAuth() {
    const isAuthenticated = localStorage.getItem('isAuthenticated');
    if (!isAuthenticated) {
        hideContent();
        showLoginForm();
    }
}

// Show login form
function showLoginForm() {
    const loginForm = document.createElement('div');
    loginForm.className = 'login-overlay';
    loginForm.innerHTML = `
        <div class="login-form">
            <h2>Přístup pouze pro členy</h2>
            <input type="password" id="password" placeholder="Zadejte heslo">
            <button onclick="handleLogin()">Přihlásit</button>
            <div id="error-message" class="error-message"></div>
        </div>
    `;
    document.body.appendChild(loginForm);
}

// Handle login
function handleLogin() {
    const password = document.getElementById('password').value;
    const errorMessage = document.getElementById('error-message');
    
    if (password === 'sedlcany1') {
        localStorage.setItem('isAuthenticated', 'true');
        document.querySelector('.login-overlay').remove();
        const content = document.querySelector('main');
        if (content) {
            content.style.display = 'block';
        }
    } else {
        errorMessage.textContent = 'Špatné heslo!';
        errorMessage.style.display = 'block';
    }
}

// Check authentication when page loads
document.addEventListener('DOMContentLoaded', checkAuth); 