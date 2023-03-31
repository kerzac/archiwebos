/*
    manage authorized mode
*/

const logIn = document.getElementById('logIn');
logIn.addEventListener('click', () => localStorage.clear());
const editions = document.querySelectorAll('.edition');

if (window.localStorage.getItem('authentication')) {
    logIn.innerText = 'logout';
    editions.forEach((edition) => edition.classList.remove('hidden'));
    }