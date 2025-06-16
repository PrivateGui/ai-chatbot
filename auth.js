// auth.js
let isLogin = true;
let users = JSON.parse(localStorage.getItem('users') || '{}');

function toggleAuth() {
  isLogin = !isLogin;
  document.getElementById('form-title').innerText = isLogin ? 'Sign In' : 'Sign Up';
  document.querySelector('button').innerText = isLogin ? 'Continue' : 'Register';
  document.getElementById('switch-text').innerText = isLogin ? "Don't have an account?" : "Already have an account?";
  document.querySelector('.switch-link a').innerText = isLogin ? 'Sign Up' : 'Sign In';
}

function handleAuth() {
  const username = document.getElementById('username').value.trim();
  const password = document.getElementById('password').value.trim();

  if (!username || !password) {
    alert('Please fill in all fields.');
    return;
  }

  if (isLogin) {
    if (users[username] && users[username].password === password) {
      localStorage.setItem('currentUser', username);
      window.location.href = 'dashboard.html';
    } else {
      alert('Invalid username or password.');
    }
  } else {
    if (users[username]) {
      alert('User already exists.');
    } else {
      users[username] = { password, history: [] };
      localStorage.setItem('users', JSON.stringify(users));
      alert('Registration successful! Please sign in.');
      toggleAuth();
    }
  }
}
