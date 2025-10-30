document.addEventListener('DOMContentLoaded', () => {
    // --- 1. Dark Mode Toggle ---
    const darkModeToggle = document.getElementById('dark-mode-toggle');
    const body = document.body;

    // Load saved preference or default to light
    const prefersDark = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
    const currentTheme = localStorage.getItem('theme') || (prefersDark ? 'dark' : 'light');

    if (currentTheme === 'dark') {
        body.classList.add('dark-mode');
    }

    darkModeToggle.addEventListener('click', () => {
        body.classList.toggle('dark-mode');

        // Save preference to localStorage
        if (body.classList.contains('dark-mode')) {
            localStorage.setItem('theme', 'dark');
        } else {
            localStorage.setItem('theme', 'light');
        }
    });

    // --- 2. Form Validation ---
    const contactForm = document.getElementById('contact-form');
    const nameInput = document.getElementById('name');
    const emailInput = document.getElementById('email');
    const messageInput = document.getElementById('message');
    const formSuccessMessage = document.getElementById('form-success');

    // Simple Email Regex
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    function validateField(inputElement, errorElement, validationFn, errorMessage) {
        const value = inputElement.value.trim();
        let isValid = validationFn(value);

        if (!isValid) {
            errorElement.textContent = errorMessage;
            inputElement.classList.add('invalid');
        } else {
            errorElement.textContent = '';
            inputElement.classList.remove('invalid');
        }
        return isValid;
    }

    function validateName(value) {
        return value.length >= 2;
    }

    function validateEmail(value) {
        return emailRegex.test(value);
    }

    function validateMessage(value) {
        return value.length > 10; // Simple requirement for a meaningful message
    }

    function validateForm(event) {
        event.preventDefault(); // Stop the form from submitting immediately

        const isNameValid = validateField(nameInput, document.getElementById('name-error'), validateName, 'Name must be at least 2 characters.');
        const isEmailValid = validateField(emailInput, document.getElementById('email-error'), validateEmail, 'Please enter a valid email address.');
        const isMessageValid = validateField(messageInput, document.getElementById('message-error'), validateMessage, 'Message must be more than 10 characters.');

        // Check if all fields are valid
        if (isNameValid && isEmailValid && isMessageValid) {
            // Successful validation, simulate form submission
            console.log('Form Submitted Successfully:', {
                name: nameInput.value.trim(),
                email: emailInput.value.trim(),
                message: messageInput.value.trim()
            });

            // Show success message and clear form
            formSuccessMessage.textContent = 'Thank you! Your message has been sent (simulated).';
            formSuccessMessage.style.display = 'block';
            contactForm.reset();
            
            // Hide message after a few seconds
            setTimeout(() => {
                formSuccessMessage.style.display = 'none';
            }, 5000);

        } else {
            // If validation failed, the individual error messages are already displayed
            formSuccessMessage.style.display = 'none';
        }
    }

    // Attach validation to form submission
    contactForm.addEventListener('submit', validateForm);
});