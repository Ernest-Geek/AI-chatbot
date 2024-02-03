const signUpButton = document.getElementById('signUp');
const logInButton = document.getElementById('logIn');
const container = document.getElementById('container');

signUpButton.addEventListener('click', () => {
    container.classList.add("right-panel-active");
});

logInButton.addEventListener('click', () => {
    container.classList.remove("right-panel-active");
});

// Password toggle functionality
function togglePassword(passwordId, showPasswordId) {
    var passwordInput = document.getElementById(passwordId);
    var showPasswordCheckbox = document.getElementById(showPasswordId);

    if (showPasswordCheckbox.checked) {
        passwordInput.type = "text";
    } else {
        passwordInput.type = "password";
    }
}

// Event listener for the showPassword checkbox in the sign-up form
document.getElementById("showPasswordSignUp").addEventListener("change", function() {
    togglePassword("passwordSignUp", "showPasswordSignUp");
});

// Event listener for the showPassword checkbox in the log-in form
document.getElementById("showPasswordLogIn").addEventListener("change", function() {
    togglePassword("passwordLogIn", "showPasswordLogIn");
});

