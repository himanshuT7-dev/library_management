document.addEventListener("DOMContentLoaded", function () {
    document.getElementById("register").addEventListener("click", async function (event) {
        event.preventDefault(); // Stop form from submitting

        let username = document.getElementById("username").value;
        let password = document.getElementById("password").value;

        try {
            let response = await fetch('http://localhost:8080/auth/register', {
                method: 'POST',
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ username: username, password: password }),
                mode: "cors"
            });

            let result = await response.text();

            if (response.ok) {
                alert("User registered successfully!");
                window.location.href = "../Login/login.html";
            } else {
                alert("Error: " + result);
            }
        } catch (error) {
            console.error("Request failed:", error);
            alert("Something went wrong!");
        }
    });
});
