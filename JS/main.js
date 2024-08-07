// Variables and Initial Setup
var emailLoginInput = document.getElementById('emailLoginInput');
var passwordLoginInput = document.getElementById('passwordLoginInput');
var loginBtn = document.getElementById('loginBtn');
var alertMessage = document.getElementById('alertMessage');
var signUpLink = document.getElementById('signUpLink');
var loginForm = document.getElementById('loginForm');
var signUpForm = document.getElementById('signUpForm');
var loginLink = document.getElementById('loginLink');
var userNameInput = document.getElementById('userNameInput');
var emailInput = document.getElementById('emailInput');
var passwordInput = document.getElementById('passwordInput');
var signUpBtn = document.getElementById('signUpBtn');
var alertMessageSignUp = document.getElementById('alertMessageSignUp');

var userContainer = [];

if (localStorage.getItem('Users') != null) {
    userContainer = JSON.parse(localStorage.getItem('Users'));
}

// Login Function
function logIn() {
    if (checkInputsEmpty(emailLoginInput.value, passwordLoginInput.value)) {
        getAlertMessage(alertMessage, 'All Inputs Required', 'red');
    } else {
        if (checkEmailPassword(emailLoginInput.value, passwordLoginInput.value)) {
            window.location.href = 'home.html';
        } else {
            getAlertMessage(alertMessage, 'Email or Password not Correct', 'red');
        }
    }
}

function checkEmailPassword(email, password) {
    for (var i = 0; i < userContainer.length; i++) {
        if (userContainer[i].email === email && userContainer[i].passwrod === password) {
            localStorage.setItem('loggedInUser', JSON.stringify(userContainer[i]));
            return true;
        }
    }
    return false;
}

// Sign Up Function
function signUp() {
    var user = {
        userName: userNameInput.value,
        email: emailInput.value,
        passwrod: passwordInput.value
    };

    if (checkInputsEmpty(userNameInput.value, emailInput.value, passwordInput.value)) {
        getAlertMessage(alertMessageSignUp, 'All Inputs Required', 'red');
    } else {
        if (checkEmailExist(user.email)) {
            getAlertMessage(alertMessageSignUp, 'Email Already Exist', 'red');
        } else {
            userContainer.push(user);
            localStorage.setItem('Users', JSON.stringify(userContainer));
            clearForm();
            getAlertMessage(alertMessageSignUp, 'Success', 'green');
        }
    }
}

function checkEmailExist(email) {
    for (var i = 0; i < userContainer.length; i++) {
        if (userContainer[i].email === email) {
            return true;
        }
    }
    return false;
}

// Helper Functions
function checkInputsEmpty() {
    for (var i = 0; i < arguments.length; i++) {
        if (arguments[i] === '') {
            return true;
        }
    }
    return false;
}

function getAlertMessage(element, text, color) {
    element.classList.remove('d-none');
    element.innerHTML = text;
    element.style.color = color;
}

function clearForm() {
    userNameInput.value = '';
    emailInput.value = '';
    passwordInput.value = '';
}

// Event Listeners
loginBtn.addEventListener('click', logIn);
signUpBtn.addEventListener('click', signUp);

signUpLink.addEventListener('click', function(e) {
    e.preventDefault();
    loginForm.style.display = 'none';
    signUpForm.style.display = 'block';
});

loginLink.addEventListener('click', function(e) {
    e.preventDefault();
    signUpForm.style.display = 'none';
    loginForm.style.display = 'block';
});

// Home Page Logic
if (window.location.pathname.endsWith('home.html')) {
    var welcomeMessage = document.getElementById('welcomeMessage');
    var logoutButton = document.getElementById('logoutButton');

    if (localStorage.getItem('loggedInUser') != null) {
        var user = JSON.parse(localStorage.getItem('loggedInUser'));
        welcomeMessage.innerHTML = `Welcome, ${user.userName}`;
    } else {
        window.location.href = 'index.html';
    }

    logoutButton.addEventListener('click', function() {
        localStorage.removeItem('loggedInUser');
        window.location.href = 'index.html';
    });
}
