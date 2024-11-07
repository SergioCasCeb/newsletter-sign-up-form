const newsletterForm = document.getElementById('newsletter-form');
const emailInput = document.getElementById('email-input');
const emailErrorMsg = document.getElementById('email-error-msg');
const fields = newsletterForm.querySelectorAll('input');

window.onload = function(){
    emailInput.value = '';
};


function showError(field) {
    field.classList.add('invalid');
    field.nextElementSibling.classList.add('show');
}

function hideError(field) {
    field.classList.remove('invalid');
    field.nextElementSibling.classList.remove('show');
}

function resetElements() {
    fields.forEach(field => {
        hideError(field);
        field.value = '';
    });
}

// Show the error message and change the input style if an input is invalid
fields.forEach(field => {
    field.addEventListener('invalid', (e) => {
        e.preventDefault();
        showError(field);
    });
})

newsletterForm.addEventListener('submit', (e) => {
    e.preventDefault(); 

    const formData = new FormData(e.target);
    const data = Object.fromEntries(formData);
    
    if(!data.email || !/^[\w.%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/.test(data.email)) {
        showError(emailInput);
    } else {
        resetElements();
    }
});
