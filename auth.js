// Check if user is already authenticated
function checkAuth() {
    const isAuthenticated = localStorage.getItem('isAuthenticated');
    if (!isAuthenticated) {
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
        </div>
    `;
    document.body.appendChild(loginForm);
}

// Handle login
function handleLogin() {
    const password = document.getElementById('password').value;
    if (password === 'sedlcany1´') {
        localStorage.setItem('isAuthenticated', 'true');
        document.querySelector('.login-overlay').remove();
    } else {
        alert('Nesprávné heslo!');
    }
}

// Check authentication when page loads
document.addEventListener('DOMContentLoaded', checkAuth); 