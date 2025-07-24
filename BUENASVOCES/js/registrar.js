document.getElementById('formRegistro').addEventListener('submit', async function (event) {
  event.preventDefault();

  const form = event.target;
  const formData = new FormData(form);

  // Convertir a objeto plano
  const artista = {
    nombre_artistico: formData.get('nombre_artistico'),
    nombres: formData.get('nombre'),
    apellido: formData.get('apellido'),
    telefono: formData.get('telefono'),
    ciudad: formData.get('ciudad'),
    provincia: formData.get('provincia'),
    solista: formData.get('solista') === 'true',
    usa_pista: formData.get('usa_pista') === 'true',
    tiene_sonido: formData.get('tiene_sonido') === 'true',
    email: formData.get('email'),
    whatsapp: formData.get('whatsapp'),

    estilos: Array.from(document.querySelectorAll('input[name="estilos"]:checked')).map(e => e.value),
    beneficios: [form.ad_honorem.value],
    imitaciones: {
      realiza: form.imitaciones.value === 'Sí',
      a_quien: form.artista_imitado.value.trim()
    },

    redes: {
      ...(form.instagram.value && form.mostrar_instagram.checked ? { instagram: form.instagram.value.trim() } : {}),
      ...(form.facebook.value && form.mostrar_facebook.checked ? { facebook: form.facebook.value.trim() } : {}),
      ...(form.web.value && form.mostrar_web.checked ? { pagina: form.web.value.trim() } : {}),
    },

    imagenes: {
      principal: "imgart/" + form.nombre_artistico.value.trim().toLowerCase().substring(0, 4) + "001.jpg",
      galeria: [
        "imgart/" + form.nombre_artistico.value.trim().toLowerCase().substring(0, 4) + "001.jpg",
        "imgart/" + form.nombre_artistico.value.trim().toLowerCase().substring(0, 4) + "002.jpg",
        "imgart/" + form.nombre_artistico.value.trim().toLowerCase().substring(0, 4) + "003.jpg"
      ]
    },

    video_principal: form.videos_youtube.value.split(',')[0]?.trim() || "",
    videos_extra: form.videos_youtube.value.split(',').slice(1).map(v => v.trim()),
    sponsors_tipo3: ["imgart/spon001.png", "imgart/spon002.png"]
  };

  console.log("📤 Enviando artista:", artista);

  try {
    const res = await fetch('/guardar_artista', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(artista)
    });

    if (res.ok) {
      alert('Registro exitoso. Te llegará un PIN para editar tu perfil.');
      form.reset();
    } else {
      throw new Error("Error en el servidor");
    }
  } catch (err) {
    console.error(err);
    alert("Hubo un problema al guardar el artista.");
  }
});
