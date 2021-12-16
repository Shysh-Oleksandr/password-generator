const pwEl = document.getElementById('pw');
const pwText = document.getElementById('pw__text');
const copyEl = document.getElementById('copy');
const lengthEl = document.getElementById('length');
const upperEl = document.getElementById('upper');
const lowerEl = document.getElementById('lower');
const numberEl = document.getElementById('number');
const symbolEl = document.getElementById('symbol');
const generateEl = document.getElementById('generate');

const checkboxes = [upperEl, lowerEl, numberEl, symbolEl];

const upperLetters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
const lowerLetters = 'abcdefghijklmnopqrstuvwxyz';
const numbers = '0123456789'
const symbols = '!@#$%^&*()_+-{}[]?></|\\\'"`~';

function getAvailableFunctions() {
    let availableFunctions = [];

    if (upperEl.checked) {
        availableFunctions.push(getUppercase);
    }
    if (lowerEl.checked) {
        availableFunctions.push(getLowercase);
    }
    if (numberEl.checked) {
        availableFunctions.push(getNumbers);
    }
    if (symbolEl.checked) {
        availableFunctions.push(getSymbols);
    }

    return availableFunctions;
}

function getLowercase() {
    return lowerLetters[Math.floor(Math.random() * lowerLetters.length)];
}

function getUppercase() {
    return upperLetters[Math.floor(Math.random() * upperLetters.length)];
}

function getNumbers() {
    return numbers[Math.floor(Math.random() * numbers.length)];
}

function getSymbols() {
    return symbols[Math.floor(Math.random() * symbols.length)];
}

function generatePassword() {
    let password = '';

    let isAnyChecked = Array.prototype.slice.call(checkboxes).some(x => x.checked);

    let errorEl = document.getElementById('pw-error');

    if (errorEl) { errorEl.remove(); }

    if (isAnyChecked) {
        copyEl.hidden = false;
        copyEl.innerText = 'Copy to clipboard';
        const len = lengthEl.value;

        let availableFunctions = getAvailableFunctions();

        for (let i = 0; i < len; i++) {
            let randomFunction = availableFunctions[Math.floor(Math.random() * availableFunctions.length)];
            password += randomFunction();
        }
    }
    else {
        errorEl = document.createElement('span');
        errorEl.innerText = "You must select at least one checkbox."
        errorEl.id = 'pw-error';
        generateEl.after(errorEl);
        copyEl.hidden = true;
    }

    pwText.innerText = password;
}

generatePassword();

generateEl.addEventListener('click', generatePassword);

copyEl.addEventListener('click', () => {
    const textarea = document.createElement('textarea');
    const password = pwText.innerText;

    if(!password) { return; }

    copyEl.innerText = 'Copied';

    textarea.value = password;
    document.body.appendChild(textarea);
    textarea.select();
    document.execCommand('copy');
    textarea.remove();
});