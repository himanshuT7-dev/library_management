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
                <a href="Login/login.html" id="loginBtn" class="auth-btn">Login</a>
                <a href="Registration/register.html" id="registerBtn" class="auth-btn">Register</a>
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

// ✅ Search Bar Redirect functionality
document.addEventListener("DOMContentLoaded", function () {
    const searchBar = document.querySelector(".search-bar");
    if (searchBar) {
        const input = searchBar.querySelector("input");
        const button = searchBar.querySelector("button");

        const performSearch = () => {
            const query = input.value.trim();
            if (query) {
                // If already on a Books subpage, go up one folder to find Books/books.html
                const isNested = window.location.pathname.includes("/Books/");
                const targetUrl = isNested ? "books.html?search=" : "Books/books.html?search=";
                window.location.href = targetUrl + encodeURIComponent(query);
            }
        };

        button.addEventListener("click", performSearch);
        input.addEventListener("keypress", function (e) {
            if (e.key === "Enter") performSearch();
        });
    }
});
