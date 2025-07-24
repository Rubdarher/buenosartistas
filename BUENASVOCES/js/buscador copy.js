document.getElementById("boton-buscar").addEventListener("click", async () => {
  const query = document.getElementById("input-busqueda").value.trim().toLowerCase();
  const resultados = document.getElementById("resultados-busqueda");

  resultados.innerHTML = ""; // Limpiar resultados anteriores

  if (!query) return; // Si está vacío, no buscar

  try {
    const response = await fetch("artistas.json");
    const artistas = await response.json();

    // Filtrar solo por coincidencia en nombre_artistico
    const coincidencias = artistas.filter(artista =>
      artista.nombre_artistico.toLowerCase().includes(query)
    );

    if (coincidencias.length === 0) {
      resultados.innerHTML = "<li>No se encontraron artistas.</li>";
    } else {
      coincidencias.forEach(artista => {
        const li = document.createElement("li");
        li.textContent = artista.nombre_artistico;

        // Link dinámico a artistas.html con query param
        li.addEventListener("click", () => {
          window.location.href = `artistas.html?nombre=${encodeURIComponent(artista.nombre_artistico)}`;
        });

        resultados.appendChild(li);
      });
    }
  } catch (error) {
    console.error("Error cargando artistas:", error);
    resultados.innerHTML = "<li>Error al cargar los artistas.</li>";
  }
});
