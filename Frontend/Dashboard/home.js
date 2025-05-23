// ✅ Authentication & UI Update
document.addEventListener("DOMContentLoaded", function () {
    const userOptions = document.getElementById("userOptions");
    const username = localStorage.getItem("username");  // Check for username instead of token

    if (userOptions) {
        if (username) {
            // If logged in, show profile and logout
            userOptions.innerHTML = `
                <button id="logoutBtn" class="logout-btn">Logout</button>
            `;

            // Logout button functionality
            document.getElementById("logoutBtn").addEventListener("click", function () {
                localStorage.removeItem("username"); // Remove username instead of token
                window.location.reload();
            });

        } else {
            // If not logged in, show Login and Register buttons
            userOptions.innerHTML = `
                <a href="Login/login.html" class="login-btn">Login</a>
                <a href="Registration/register.html" class="register-btn">Register</a>
            `;
        }
    }
});

// ✅ Authentication Check (Redirect if not logged in)
function checkAuthentication() {
    const username = localStorage.getItem("username");
    if (!username) {
        alert("You must be logged in to access this page!");
        window.location.href = "Login/login.html";  // Ensure the correct path is used
    } else {
        console.log("User logged in:", username);
    }
}

// Call this function only on pages that require authentication
