const express = require('express');

// Ruta para cerrar sesión
app.post('/logout', (_req, res) => {
  // Limpiar cualquier sesión o token del servidor
  // En este caso, como usas localStorage en el cliente, 
  // solo enviamos confirmación
  res.json({ 
    success: true, 
    message: 'Sesión cerrada exitosamente' 
  });
});

// Ruta para verificar estado de sesión
app.get('/session-status', (_req, res) => {
  // Aquí podrías verificar tokens de sesión del servidor
  // Por ahora retorna información básica
  res.json({ 
    authenticated: false,
    message: 'Verificar sesión en cliente'
  });
});