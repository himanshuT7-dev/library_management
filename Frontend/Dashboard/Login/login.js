document.getElementById("loginForm").addEventListener("submit", async function (event) {
    event.preventDefault();

    let username = document.getElementById("user").value.trim();
    let password = document.getElementById("password").value.trim();

    if (!username || !password) {
        alert("❌ Please enter both username and password!");
        return;
    }

    console.log("🔹 Sending login request for:", username);
    console.log("🔹 Request payload:", { username, password });

    try {
        let response = await fetch("http://localhost:8080/auth/login", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ username: username, password: password })
        });

        console.log("🔹 Response status:", response.status);
        
        let result = await response.json();
        console.log("🔹 Response data:", result);

        if (response.ok) {
            alert("✅ Login successful!");
            localStorage.setItem("userLoggedIn", "true");
            localStorage.setItem("username", username);
            window.location.href = "../home.html";
        } else {
            alert("❌ Login failed: " + (result.message || "Unknown error"));
        }
    } catch (error) {
        console.error("❌ Error during login:", error);
        alert("Something went wrong! Please try again.");
    }
});