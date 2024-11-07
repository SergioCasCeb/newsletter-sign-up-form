/**
 * Although some of the functionality in this project might not be used to its
 * full potential, this is a good opportunity to create a component that could
 * work with more complex forms in the future, of course to certain extent.
 */

const newsletterForm = document.getElementById('newsletter-form');
const emailInput = document.getElementById('email-input');
const emailErrorMsg = document.getElementById('email-error-msg');
const fields = newsletterForm.querySelectorAll('input');
const successMsgElement = document.getElementById('success-msg');
const newsletterElement = document.getElementById('newsletter');
const confirmationEmail = document.getElementById('confirmation-email');
const dismissBtn = document.getElementById('dismiss-btn');

// Reset the input field when the page is loaded
window.onload = function(){
    emailInput.value = '';
};

/**
 * Show the error message and change the input style of an input field
 * @param { HTML element } field - The input field that is invalid
 */
function showError(field) {
    field.classList.add('invalid');
    field.nextElementSibling.classList.add('show');
}

/**
 * Hide the error message and change the input style of an input field
 * @param { HTML element } field - The input field that is valid
 */
function hideError(field) {
    field.classList.remove('invalid');
    field.nextElementSibling.classList.remove('show');
}

/**
 * Reset the input fields and hide the error messages
 */
function resetElements() {
    fields.forEach(field => {
        hideError(field);
        field.value = '';
    });

    setTimeout(() => {
        confirmationEmail.textContent = '';
    }, 400);
}

// Show the error message and change the input style if an input is invalid
fields.forEach(field => {
    field.addEventListener('invalid', (e) => {
        e.preventDefault();
        showError(field);
    });
})

// Submit the form and validate the email input
newsletterForm.addEventListener('submit', (e) => {
    e.preventDefault(); 

    const formData = new FormData(e.target);
    const data = Object.fromEntries(formData);
    
    if(!data.email || !/^[\w.%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/.test(data.email)) {
        showError(emailInput);
    } else {
        confirmationEmail.textContent = data.email;
        newsletterElement.classList.add('hide');
        successMsgElement.classList.add('show');
    }
});

//Hiding the error message whenever the user clicks somewhere on the page and the input is invalid
document.addEventListener('click', () => { 
    if(emailInput.classList.contains('invalid')) {
        hideError(emailInput);
    } 
});

// Reset the input fields and show the newsletter form when the user clicks the dismiss button
dismissBtn.addEventListener('click', () => {
    resetElements();
    newsletterElement.classList.remove('hide');
    successMsgElement.classList.remove('show');
});
