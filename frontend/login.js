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

    const PostLoginResponse = await postLogin.json();

    if (postLogin.ok) {
        location.href='index.html';
        localStorage.setItem('authentication', true);
        localStorage.setItem('userId', PostLoginResponse.userId);
        localStorage.setItem('token', PostLoginResponse.token);
    } else {
        document.querySelector('.login-feedback').style.display = 'inline';
        setTimeout(() => document.querySelector('.login-feedback').style.display = 'none', 3500);
    }
});