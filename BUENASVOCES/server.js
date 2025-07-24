const express = require('express');
const fs = require('fs');
const path = require('path');
const app = express();
const PORT = 3000;

app.use(express.json());
app.use(express.static(__dirname)); // Sirve todos los archivos HTML, CSS, JS, img, etc.

// Ruta para guardar un nuevo artista
app.post('/guardar_artista', (req, res) => {
  const nuevo = req.body;
  const archivo = path.join(__dirname, 'artistas.json');

  // Cargar artistas existentes
  let artistas = [];
  if (fs.existsSync(archivo)) {
    const data = fs.readFileSync(archivo, 'utf8');
    artistas = data ? JSON.parse(data) : [];
  }

  // Agregar y guardar
  artistas.push(nuevo);
  fs.writeFileSync(archivo, JSON.stringify(artistas, null, 2), 'utf8');
  console.log("✅ Artista guardado:", nuevo.nombre_artistico);
  res.json({ ok: true });
});

app.listen(PORT, () => {
  console.log(`🟢 Servidor corriendo en http://localhost:${PORT}`);
});
