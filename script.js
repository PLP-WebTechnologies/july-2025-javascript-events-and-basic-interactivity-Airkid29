// Part 1: JavaScript Event Handling
// This section demonstrates basic event handling with mouseover/mouseout and keyboard events

// Event handling for hover button - shows a message when hovering over the button
const hoverButton = document.getElementById('hoverButton');
const hoverMessage = document.getElementById('hoverMessage');

hoverButton.addEventListener('mouseover', function() {
    // Show the hover message when mouse enters the button
    hoverMessage.classList.remove('hidden');
});

hoverButton.addEventListener('mouseout', function() {
    // Hide the hover message when mouse leaves the button
    hoverMessage.classList.add('hidden');
});

// Event handling for key press - displays which key was pressed
const keyDisplay = document.getElementById('keyDisplay');
const pressedKey = document.getElementById('pressedKey');

keyDisplay.addEventListener('keydown', function(event) {
    // Display the pressed key and its code when a key is pressed
    pressedKey.textContent = `You pressed: ${event.key} (Key code: ${event.keyCode})`;
});

// Part 2: Interactive Elements
// This section implements interactive features like theme toggle, counter, and FAQ accordion

// Light/Dark Mode Toggle - allows users to switch between light and dark themes
const themeToggle = document.getElementById('themeToggle');
const currentTheme = document.getElementById('currentTheme');
const body = document.body;

// Check for saved theme preference in localStorage or default to light theme
const savedTheme = localStorage.getItem('theme');
if (savedTheme === 'dark') {
    body.classList.add('dark-theme');
    currentTheme.textContent = 'Dark';
}

themeToggle.addEventListener('click', function() {
    // Toggle the dark-theme class on the body element
    body.classList.toggle('dark-theme');
    
    if (body.classList.contains('dark-theme')) {
        // Update theme display and save preference
        currentTheme.textContent = 'Dark';
        localStorage.setItem('theme', 'dark');
    } else {
        // Update theme display and save preference
        currentTheme.textContent = 'Light';
        localStorage.setItem('theme', 'light');
    }
});

// Counter Game - a simple counter with increment, decrement, and reset functionality
const counterElement = document.getElementById('counter');
const incrementBtn = document.getElementById('incrementBtn');
const decrementBtn = document.getElementById('decrementBtn');
const resetBtn = document.getElementById('resetBtn');

let count = 0;

// Update counter display
function updateCounter() {
    counterElement.textContent = count;
}

// Increment button - increases the counter by 1
incrementBtn.addEventListener('click', function() {
    count++;
    updateCounter();
});

// Decrement button - decreases the counter by 1
decrementBtn.addEventListener('click', function() {
    count--;
    updateCounter();
});

// Reset button - resets the counter to 0
resetBtn.addEventListener('click', function() {
    count = 0;
    updateCounter();
});

// Collapsible FAQ Section - allows users to expand/collapse FAQ answers
const faqQuestions = document.querySelectorAll('.faq-question');

faqQuestions.forEach(question => {
    question.addEventListener('click', function() {
        // Toggle the visibility of the next sibling element (the answer)
        const answer = this.nextElementSibling;
        answer.classList.toggle('hidden');
    });
});

// Part 3: Form Validation
// This section implements custom form validation with real-time feedback

const userForm = document.getElementById('userForm');
const nameInput = document.getElementById('name');
const emailInput = document.getElementById('email');
const passwordInput = document.getElementById('password');

const nameError = document.getElementById('nameError');
const emailError = document.getElementById('emailError');
const passwordError = document.getElementById('passwordError');
const formSuccess = document.getElementById('formSuccess');

// Validation functions - each function validates a specific field and returns an error message or empty string

// Validate name field - checks if name is provided and at least 2 characters long
function validateName(name) {
    if (name.trim() === '') {
        return 'Name is required';
    }
    if (name.trim().length < 2) {
        return 'Name must be at least 2 characters long';
    }
    return '';
}

// Validate email field - checks if email is provided and in a valid format
function validateEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (email.trim() === '') {
        return 'Email is required';
    }
    if (!emailRegex.test(email)) {
        return 'Please enter a valid email address';
    }
    return '';
}

// Validate password field - checks if password is provided, at least 6 characters long,
// and contains at least one uppercase letter, one lowercase letter, and one number
function validatePassword(password) {
    if (password === '') {
        return 'Password is required';
    }
    if (password.length < 6) {
        return 'Password must be at least 6 characters long';
    }
    // Check for at least one uppercase letter, one lowercase letter, and one number
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/;
    if (!passwordRegex.test(password)) {
        return 'Password must contain at least one uppercase letter, one lowercase letter, and one number';
    }
    return '';
}

// Real-time validation as user types - provides immediate feedback as the user fills out the form

// Validate name in real-time
nameInput.addEventListener('input', function() {
    const error = validateName(nameInput.value);
    nameError.textContent = error;
});

// Validate email in real-time
emailInput.addEventListener('input', function() {
    const error = validateEmail(emailInput.value);
    emailError.textContent = error;
});

// Validate password in real-time
passwordInput.addEventListener('input', function() {
    const error = validatePassword(passwordInput.value);
    passwordError.textContent = error;
});

// Form submission - handles form validation when the user submits the form
userForm.addEventListener('submit', function(event) {
    event.preventDefault(); // Prevent default form submission behavior
    
    // Get current values from form fields
    const name = nameInput.value;
    const email = emailInput.value;
    const password = passwordInput.value;
    
    // Validate all fields
    const nameValidationError = validateName(name);
    const emailValidationError = validateEmail(email);
    const passwordValidationError = validatePassword(password);
    
    // Display any validation errors
    nameError.textContent = nameValidationError;
    emailError.textContent = emailValidationError;
    passwordError.textContent = passwordValidationError;
    
    // Check if form is valid (no validation errors)
    if (!nameValidationError && !emailValidationError && !passwordValidationError) {
        // Form is valid, show success message
        formSuccess.classList.remove('hidden');
        
        // Reset form fields
        userForm.reset();
        
        // Hide success message after 3 seconds
        setTimeout(() => {
            formSuccess.classList.add('hidden');
        }, 3000);
    } else {
        // Hide success message if it was visible
        formSuccess.classList.add('hidden');
    }
});