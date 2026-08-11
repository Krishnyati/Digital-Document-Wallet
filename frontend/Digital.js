document.addEventListener("DOMContentLoaded", function () {

    console.log("Digital.js loaded successfully");


    // ==========================================
    // BACKEND URL
    // ==========================================

    const API_URL = "http://127.0.0.1:5000";


    // ==========================================
    // LOGIN ELEMENTS
    // ==========================================

    const loginContainer =
        document.getElementById("login-form-container");

    const registerContainer =
        document.getElementById("register-form-container");

    const showRegisterBtn =
        document.getElementById("show-register-btn");

    const showLoginBtn =
        document.getElementById("show-login-btn");

    const loginForm =
        document.getElementById("auth-form");

    const emailInput =
        document.getElementById("email");

    const passwordInput =
        document.getElementById("password");

    const phoneInput =
        document.getElementById("phone");

    const loginMessage =
        document.getElementById("auth-message");


    // ==========================================
    // REGISTER ELEMENTS
    // ==========================================

    const registerForm =
        document.getElementById("register-form");

    const registerName =
        document.getElementById("register-name");

    const registerEmail =
        document.getElementById("register-email");

    const registerPassword =
        document.getElementById("register-password");

    const registerPhone =
        document.getElementById("register-phone");

    const registerMessage =
        document.getElementById("register-message");


    // ==========================================
    // DASHBOARD ELEMENTS
    // ==========================================

    const loginPage =
        document.getElementById("login-page");

    const dashboardPage =
        document.getElementById("dashboard-page");

    const displayUser =
        document.getElementById("display-user");


    // ==========================================
    // SHOW REGISTER FORM
    // ==========================================

    showRegisterBtn.addEventListener("click", function () {

        console.log("Register button clicked");

        loginContainer.classList.add("hidden");

        registerContainer.classList.remove("hidden");

    });


    // ==========================================
    // SHOW LOGIN FORM
    // ==========================================

    showLoginBtn.addEventListener("click", function () {

        console.log("Login button clicked");

        registerContainer.classList.add("hidden");

        loginContainer.classList.remove("hidden");

    });


    // ==========================================
    // REGISTER USER
    // ==========================================

    registerForm.addEventListener("submit", async function (event) {

        // Prevent Digital.html? from appearing
        event.preventDefault();

        console.log("Register form submitted");


        registerMessage.textContent =
            "Creating account...";


        try {

            const response = await fetch(
                API_URL + "/register",
                {
                    method: "POST",

                    headers: {
                        "Content-Type": "application/json"
                    },

                    body: JSON.stringify({

                        name: registerName.value,

                        email: registerEmail.value,

                        password: registerPassword.value,

                        phone: registerPhone.value

                    })
                }
            );


            const data = await response.json();

            console.log("Register response:", data);


            if (response.ok) {

                registerMessage.textContent =
                    data.message || "User registered successfully!";

                console.log("Registration successful");


                // Clear register form
                registerForm.reset();


                // Go back to Login
                setTimeout(function () {

                    registerContainer.classList.add("hidden");

                    loginContainer.classList.remove("hidden");

                }, 1500);


            } else {

                registerMessage.textContent =
                    data.message || "Registration failed.";

            }

        } catch (error) {

            console.error("Register error:", error);

            registerMessage.textContent =
                "Cannot connect to Flask backend.";

        }

    });


    // ==========================================
    // LOGIN USER
    // ==========================================

    loginForm.addEventListener("submit", async function (event) {

        // IMPORTANT:
        // Prevent Digital.html? from appearing
        event.preventDefault();

        console.log("Login form submitted");


        loginMessage.textContent =
            "Logging in...";


        try {

            const response = await fetch(
                API_URL + "/login",
                {
                    method: "POST",

                    headers: {
                        "Content-Type": "application/json"
                    },

                    body: JSON.stringify({

                        email: emailInput.value,

                        password: passwordInput.value

                    })
                }
            );


            const data = await response.json();

            console.log("Login response:", data);


            // ==================================
            // LOGIN SUCCESS
            // ==================================

            if (response.ok) {

                loginMessage.textContent =
                    data.message || "Login successful!";


                console.log("Login successful");


                // Save JWT token
                if (data.token) {

                    localStorage.setItem(
                        "token",
                        data.token
                    );

                }


                // Display user name
                if (data.name) {

                    displayUser.textContent =
                        data.name;

                } else {

                    displayUser.textContent =
                        emailInput.value.split("@")[0];

                }


                // Show dashboard
                setTimeout(function () {

                    loginPage.classList.add("hidden");

                    dashboardPage.classList.remove("hidden");

                }, 700);


            } else {

                loginMessage.textContent =
                    data.message || "Invalid email or password.";

            }

        } catch (error) {

            console.error("Login error:", error);

            loginMessage.textContent =
                "Cannot connect to Flask backend.";

        }

    });

});