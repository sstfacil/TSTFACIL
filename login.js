document.getElementById('loginForm').addEventListener('submit', async (e) => {
  e.preventDefault();
  const email = document.getElementById('email').value;
  const senha = document.getElementById('senha').value;
  const status = document.getElementById('status');

  try {
    const response = await fetch('http://localhost:5000/api/auth/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, senha })
    });
    const data = await response.json();
    if (response.ok) {
      status.textContent = 'Login realizado com sucesso!';
      localStorage.setItem('token', data.token);
      setTimeout(() => window.location.href = "painel.html", 1000);
    } else {
      status.textContent = data.error || 'Erro ao logar';
    }
  } catch (err) {
    status.textContent = 'Erro na requisição';
  }
});