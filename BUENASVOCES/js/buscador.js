document.getElementById("boton-buscar").addEventListener("click", async () => {
  const query = document.getElementById("input-busqueda").value.trim().toLowerCase();
  const resultados = document.getElementById("resultados-busqueda");

  resultados.innerHTML = ""; // Limpiar resultados anteriores

  // Contenedor para la miniatura
  let miniatura = document.getElementById("miniatura-artista");
  if (!miniatura) {
    miniatura = document.createElement("div");
    miniatura.id = "miniatura-artista";
    miniatura.style.position = "absolute";
    miniatura.style.border = "1px solid #ccc";
    miniatura.style.padding = "5px";
    miniatura.style.background = "white";
    miniatura.style.display = "none";
    miniatura.style.zIndex = "1000";
    document.body.appendChild(miniatura);
  }

  if (!query) return; // Si está vacío, no buscar

  try {
    const response = await fetch("artistas.json");
    const artistas = await response.json();

    const coincidencias = artistas.filter(artista =>
      artista.nombre_artistico.toLowerCase().includes(query)
    );

    if (coincidencias.length === 0) {
      resultados.innerHTML = "<li>No se encontraron artistas.</li>";
    } else {
      coincidencias.forEach(artista => {
        const li = document.createElement("li");

        // Crear el link
        const a = document.createElement("a");
        a.href = `artistas.html?nombre=${encodeURIComponent(artista.nombre_artistico)}`;
        a.textContent = artista.nombre_artistico;
        a.style.color = "#007BFF"; // azul profesional
        a.style.textDecoration = "none";
        a.style.cursor = "pointer";

        // Mostrar la miniatura al pasar mouse
        a.addEventListener("mouseenter", (e) => {
          if (artista.imagenes?.principal) {
            miniatura.innerHTML = `<img src="${artista.imagenes.principal}" alt="${artista.nombre_artistico}" style="max-width: 150px; max-height: 150px;">`;
            miniatura.style.display = "block";

            // Posicionar miniatura cerca del puntero
            miniatura.style.top = (e.pageY + 10) + "px";
            miniatura.style.left = (e.pageX + 10) + "px";
          }
        });

        // Ocultar la miniatura al salir
        a.addEventListener("mouseleave", () => {
          miniatura.style.display = "none";
        });

        li.appendChild(a);
        resultados.appendChild(li);
      });
    }
  } catch (error) {
    console.error("Error cargando artistas:", error);
    resultados.innerHTML = "<li>Error al cargar los artistas.</li>";
  }
});
