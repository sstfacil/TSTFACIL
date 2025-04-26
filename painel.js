document.addEventListener('DOMContentLoaded', async () => {
  const token = localStorage.getItem('token');
  const nomeUsuario = document.getElementById('nomeUsuario');
  const adminArea = document.getElementById('adminArea');

  if (!token) {
    nomeUsuario.textContent = "Acesso negado. Faça login.";
    setTimeout(() => window.location.href = 'login.html', 1500);
    return;
  }

  try {
    const response = await fetch('http://localhost:5000/api/data/teste', {
      headers: { 'Authorization': `Bearer ${token}` }
    });

    if (response.ok) {
      nomeUsuario.textContent = "Olá, técnico!";

      // Se o email decodificado for admin@sstfacil.com, mostra a área de admin
      const payload = JSON.parse(atob(token.split('.')[1]));
      if (payload.email === 'admin@sstfacil.com') {
        adminArea.style.display = 'block';
      }
    } else {
      nomeUsuario.textContent = "Sessão expirada.";
      setTimeout(() => window.location.href = 'login.html', 1500);
    }
  } catch (err) {
    nomeUsuario.textContent = "Erro de conexão.";
  }
});

function logout() {
  localStorage.removeItem('token');
}
