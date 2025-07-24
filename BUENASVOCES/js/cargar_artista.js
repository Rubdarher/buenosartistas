document.getElementById('formRegistro').addEventListener('submit', async function (event) {
  event.preventDefault();

  const form = event.target;

  // Obtener datos simples
  const nombre = form.nombre.value.trim();
  const apellido = form.apellido.value.trim();
  const nombre_artistico = form.nombre_artistico.value.trim();
  const email = form.email.value.trim();
  const telefono = form.telefono.value.trim();
  const ciudad = form.ciudad.value.trim();
  const provincia = form.provincia.value.trim();
  const solista = form.solista.value === "true";
  const usa_pista = form.usa_pista.value === "true";
  const tiene_sonido = form.tiene_sonido.value === "true";
  const whatsapp = form.whatsapp.value.trim();

  // Estilos
  let estilos = [];
  if (document.getElementById("estilo_todos").checked) {
    estilos.push("Todos");
  } else {
    document.querySelectorAll('.genero:checked').forEach(cb => {
      estilos.push(cb.value);
    });
  }

  // Beneficios
  const beneficio = form.ad_honorem.value;
  let beneficios = [];
  if (beneficio === "Sí") beneficios.push("Evento solidario");
  if (beneficio === "Depende") beneficios.push("Fundación"); // o agregar "Depende: texto_depende" si querés

  // Imitaciones
  const imitaciones = {
    realiza: form.imitaciones.value === "Sí",
    a_quien: form.artista_imitado.value.trim()
  };

  // Redes sociales visibles
  const redes = {};
  if (form.instagram.value && form.mostrar_instagram.checked)
    redes.instagram = form.instagram.value.trim();
  if (form.facebook.value && form.mostrar_facebook.checked)
    redes.facebook = form.facebook.value.trim();
  if (form.web.value && form.mostrar_web.checked)
    redes.pagina = form.web.value.trim();

  // Imagen principal + galería
  const imagenes_input = form.imagenes.files;
  let imagenes = {
    principal: "",
    galeria: []
  };
  for (let i = 0; i < imagenes_input.length && i < 3; i++) {
    const nombreArchivo = `imgart/${nombre_artistico.toLowerCase().replace(/\s+/g, '')}00${i + 1}.jpg`;
    imagenes.galeria.push(nombreArchivo);
    if (i === 0) imagenes.principal = nombreArchivo;
  }

  // Videos
  const video_urls = form.videos_youtube.value.split(',').map(v => v.trim()).filter(v => v);
  const video_principal = video_urls.length > 0 ? video_urls[0] : "";
  const videos_extra = video_urls.slice(1);

  // Sponsors genérico (pueden ser definidos manualmente luego)
  const sponsors_tipo3 = [
    "imgart/spon001.png",
    "imgart/spon002.png"
  ];

  const nuevoArtista = {
    nombre_artistico,
    nombres: nombre,
    apellido,
    telefono,
    ciudad,
    provincia,
    solista,
    usa_pista,
    tiene_sonido,
    estilos,
    redes,
    imagenes,
    video_principal,
    videos_extra,
    beneficios,
    imitaciones,
    sponsors_tipo3,
    whatsapp,
    email
  };

  console.log("🎤 Artista a guardar:", nuevoArtista);

  // Enviar a un servidor o guardar en archivo si tenés backend
  /*
  fetch('/guardar_artista', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(nuevoArtista)
  })
  .then(res => res.json())
  .then(data => {
    alert("Artista registrado correctamente");
    form.reset();
  })
  .catch(err => {
    console.error("Error al guardar:", err);
    alert("Hubo un error al guardar el registro.");
  });
  */

  // Por ahora, solo mostramos el JSON por consola
  alert('Gracias por registrarte. Te llegará un PIN por WhatsApp y correo para poder editar tu perfil.');
  form.reset();
});
