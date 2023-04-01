/*
    main
    -----
*/

// manage login
const logInput = document.getElementById('log-input');

logInput.addEventListener('click', async (e) => {
    e.preventDefault();
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    const user = {
        email: email,
        password: password
    };
    
    const postLogin = await fetch('http://localhost:5678/api/users/login', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json;charset=utf-8'
        },
        body: JSON.stringify(user)
    });
    
    const response = postLogin.json()
    response.then((data) => {
        window.localStorage.setItem('userId', data.userId);
        window.localStorage.setItem('token', data.token);
    });

    if (postLogin.ok) {
        window.location.href='index.html';
        window.localStorage.setItem('authentication', true);
    } else {
        alert("Erreur dans l'identifiant ou le mot de passe");
    }
});