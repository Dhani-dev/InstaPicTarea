function register() {
    const username = document.getElementById('username').value.trim();
    const password = document.getElementById('password').value.trim();
    if(localStorage.getItem(username.toLowerCase())){
        alert('Usuario ya existe');
        return;
    }
    if (username && password) {
        localStorage.setItem(userName.toLowerCase(), password);
        alert('Usuario registrado con éxito');
        window.location.href = `home.html?username=${encodeURIComponent(username)}`;
    } else {
       alert('Diligencia todos los campos');
    }
}


function login() {
    const userName = document.getElementById('username').value.trim();
    const password = document.getElementById('password').value.trim();
    if (!username || !password) {
        alert('Debe diligenciar los campos');
        return;
    }
    const storedPassword = localStorage.getItem(username.toLowerCase());

    if (storedPassword === null) {
        alert('Usuario no registrado');
    } else if (storedPassword === password) {
        alert('Inicio de sesión exitoso');
        window.location.href = `home.html?userName=${encodeURIComponent(username)}`; 
    } else {
        alert('Contraseña incorrecta');
    }
}