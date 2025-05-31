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
    } else {
        showContent();
    }
}

// Show content after login
function showContent() {
    const content = document.querySelector('main');
     const loginOverlay = document.querySelector('.login-overlay');

    if (content) {
        content.style.display = 'block';
    }
    if (loginOverlay) {
         loginOverlay.remove();
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

    // No event listener needed for password toggle button anymore
}

// Toggle password visibility (no longer used)
// function togglePasswordVisibility() {
//     const passwordInput = document.getElementById('password');
//     const toggleButton = document.getElementById('togglePassword');
//     if (passwordInput.type === 'password') {
//         passwordInput.type = 'text';
//         toggleButton.textContent = '🙈'; // Hide icon
//     } else {
//         passwordInput.type = 'password';
//         toggleButton.textContent = '👁️'; // Show icon
//     }
// }

// Handle login
function handleLogin() {
    const password = document.getElementById('password').value;
    const errorMessage = document.getElementById('error-message');
    
    if (password === 'sedlcany1') {
        localStorage.setItem('isAuthenticated', 'true');
        showContent();
    } else {
        errorMessage.textContent = 'Špatné heslo!';
        errorMessage.style.display = 'block';
    }
}

// Check authentication when page loads
document.addEventListener('DOMContentLoaded', checkAuth); 