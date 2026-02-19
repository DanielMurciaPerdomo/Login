
   const API_URL = 'http://localhost:3000'; 

document.addEventListener('DOMContentLoaded', () => {
    
    window.toggleView = (viewId) => {
        document.getElementById('login-section').classList.add('hidden');
        document.getElementById('register-section').classList.add('hidden');
        document.getElementById(viewId).classList.remove('hidden');
    }

    document.getElementById('login-form').addEventListener('submit', async (e) => {
        e.preventDefault();
        try {
            const response = await fetch(`${API_URL}/api/users/login`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ 
                    email: document.getElementById('login-username').value,
                    password: document.getElementById('login-password').value 
                })
            });

            const data = await response.json();

            if (response.ok) {
                localStorage.setItem('token', data.data.token);
                showDashboard(data.data.user.name);
                loadUsers(); 
            } else {
                document.getElementById('login-msg').innerText = data.message || 'Error';
            }
        } catch (error) {
            document.getElementById('login-msg').innerText = 'Error de conexión';
        }
    });

    document.getElementById('register-form').addEventListener('submit', async (e) => {
        e.preventDefault();
        try {
            const response = await fetch('/api/users/register', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ 
                    name: document.getElementById('reg-username').value, // 👈 Debe decir 'name'
                    email: document.getElementById('reg-email').value,
                    password: document.getElementById('reg-password').value
                })
            }); 
            const data = await response.json();
            if (response.ok) {
                alert('¡Usuario registrado con éxito en MongoDB!');
                localStorage.setItem('token', data.data.token);
                showDashboard(data.data.user.name);
                loadUsers(); 
            } else {
                document.getElementById('reg-msg').innerText = data.message || 'Error en validación';
            }
        } catch (error) {
            document.getElementById('reg-msg').innerText = 'Error: El servidor no responde';
        }
        });

    window.logout = () => {
        localStorage.removeItem('token'); 
        location.reload();
    }
    window.deleteUser = async (id) => {
        if (!confirm('¿Estás seguro de que deseas eliminar este usuario?')) return;

        const token = localStorage.getItem('token');
        try {
            const response = await fetch(`${API_URL}/api/users/${id}`, {
                method: 'DELETE',
                headers: { 
                    'Authorization': `Bearer ${token}` 
                }
            });

            const data = await response.json();

            if (response.ok) {
                alert('Usuario eliminado correctamente');
                loadUsers(); // Recargamos la lista para ver los cambios
            } else {
                alert('Error: ' + data.message);
            }
        } catch (error) {
            console.error('Error al eliminar:', error);
            alert('No se pudo eliminar al usuario');
        }
    }
            
});
async function loadUsers() {
        const token = localStorage.getItem('token');
        try {
            const response = await fetch(`${API_URL}/api/users`, {
                method: 'GET',
                headers: { 
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}` // ✅ ENVIAR TOKEN AL MIDDLEWARE
                }
            });

            const result = await response.json();
            if (response.ok) {
                const ul = document.getElementById('users-ul');
                    ul.innerHTML = ''; // Limpiar lista
                    result.data.forEach(user => {
                        const li = document.createElement('li');
                    li.style.display = "flex";
                    li.style.justifyContent = "space-between";
                    li.style.alignItems = "center";
                    li.style.padding = "10px";
                    li.style.borderBottom = "1px solid #eee";
                    
                    // Creamos el contenido y el botón de eliminar
                    li.innerHTML = `
                        <span>👤 <strong>${user.name}</strong> - ${user.email}</span>
                        <button class="btn-danger" 
                                style="width: auto; padding: 5px 10px; font-size: 12px; margin: 0;" 
                                onclick="deleteUser('${user._id}')">
                            Eliminar
                        </button>
                    `;
                    ul.appendChild(li);
                });
            }
        } catch (error) {
            console.error("Error cargando usuarios:", error);
        }
    }

    function showDashboard(username) {
        document.getElementById('auth-container').classList.add('hidden');
        document.getElementById('dashboard-container').classList.remove('hidden');
        document.getElementById('user-info').innerText = username;
    }
    