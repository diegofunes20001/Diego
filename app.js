/**
 * Maneja el cierre de sesión
 */
async function handleLogout() {
    if (confirm('¿Estás seguro de que quieres cerrar sesión?')) {
        try {
            // Llamar al servidor para cerrar sesión
            const response = await fetch('/logout', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                }
            });
            
            const result = await response.json();
            
            if (result.success) {
                // Limpiar datos de sesión del cliente
                currentUser = null;
                localStorage.removeItem('currentUser');
                
                updateUserInterface(false);
                showNotification('Sesión cerrada exitosamente', 'success');
                
                // Opcional: limpiar datos de películas
                if (confirm('¿También quieres limpiar tu colección de películas?')) {
                    localStorage.removeItem('movies');
                    movieManager.movies = [];
                    renderMovies();
                }
            } else {
                showNotification('Error al cerrar sesión', 'error');
            }
        } catch (error) {
            console.error('Error en logout:', error);
            showNotification('Error de conexión al cerrar sesión', 'error');
            
            // Logout local como fallback
            currentUser = null;
            localStorage.removeItem('currentUser');
            updateUserInterface(false);
        }
    }
}