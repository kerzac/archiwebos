/*
    manage login
*/

const logInput = document.getElementById('log-input');

logInput.addEventListener('click', async (e) => {
    e.preventDefault();
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    const user = {
        email: email,
        password: password
    };
    
    const request = await fetch('http://localhost:5678/api/users/login', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json;charset=utf-8'
        },
        body: JSON.stringify(user)
    })
    
    const response = request.json()
    response.then((data) => {
        window.localStorage.setItem('userId', JSON.stringify(data.userId));
        window.localStorage.setItem('token', JSON.stringify(data.token));
    });

    if (request.ok) {
        window.location.href='index-authorized.html';
    }else {
        alert('Votre identifiant et/ou votre mot de passe ne sont pas valides');
    }
});