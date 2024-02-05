const container = document.getElementById('container');

// Function to toggle password visibility
function togglePassword(passwordIds, showPasswordId) {
    const showPasswordCheckbox = document.getElementById(showPasswordId);

    passwordIds.forEach((passwordId) => {
        const passwordInput = document.getElementById(passwordId);
        passwordInput.type = showPasswordCheckbox.checked ? "text" : "password";
    });
}

// Function to handle the sign-up and log-in buttons
function handleButtonClick(isSignUp) {
    container.classList.toggle("right-panel-active", isSignUp);
}

// Event listeners for sign-up and log-in buttons
document.getElementById('signUp').addEventListener('click', () => {
    handleButtonClick(true);
});

document.getElementById('logIn').addEventListener('click', () => {
    handleButtonClick(false);
});

// Event listener for the showPassword checkbox in the sign-up form
document.getElementById("showPasswordSignUp").addEventListener("change", function() {
    togglePassword(["passwordSignUp", "confirmPasswordSignUp"], "showPasswordSignUp");
});

// Event listener for the showPassword checkbox in the log-in form
document.getElementById("showPasswordLogIn").addEventListener("change", function() {
    togglePassword(["passwordLogIn"], "showPasswordLogIn");
});

