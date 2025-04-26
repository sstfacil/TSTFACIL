document.getElementById('cadastroForm').addEventListener('submit', async (e) => {
  e.preventDefault();
  const email = document.getElementById('email').value;
  const senha = document.getElementById('senha').value;
  const status = document.getElementById('status');
  const token = localStorage.getItem('token');

  try {
    const response = await fetch('http://localhost:5000/api/auth/register', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify({ email, senha })
    });

    const data = await response.json();
    if (response.ok) {
      status.textContent = 'Usuário cadastrado com sucesso!';
      document.getElementById('cadastroForm').reset();
    } else {
      status.textContent = data.error || 'Erro ao cadastrar usuário';
    }
  } catch (err) {
    status.textContent = 'Erro na conexão';
  }
});
