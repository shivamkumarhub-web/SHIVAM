// Grab buttons
const signUpButton = document.getElementById('signUpButton');
const signInButton = document.getElementById('signInButton');

// Grab form containers
const signInForm = document.getElementById('signIn');
const signUpForm = document.getElementById('signUp');

// Show Sign Up form, hide Sign In
signUpButton.addEventListener('click', function () {
  signInForm.style.display = "none";
  signUpForm.style.display = "block";
});

// Show Sign In form, hide Sign Up
signInButton.addEventListener('click', function () {
  signUpForm.style.display = "none";
  signInForm.style.display = "block";
});
