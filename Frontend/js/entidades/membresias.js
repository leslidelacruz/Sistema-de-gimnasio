ENTIDADES.membresias = {
  ruta: 'membresias',
  titulo: 'Membresías',
  subtitulo: 'Planes disponibles con su precio y duración.',
  singular: 'membresía',
  nuevo: 'Nueva membresía',
  vacio: 'Aún no hay membresías registradas.',
  icono: '<rect x="2" y="5" width="20" height="14" rx="2"/><path d="M2 10h20"/>',
  nombreRegistro: r => r.nombre,
  campos: [
    { n: 'nombre', l: 'Nombre del plan', t: 'text', req: true, max: 60 },
    { n: 'precio', l: 'Precio (RD$)', t: 'number', req: true, min: 0, step: '0.01' },
    { n: 'duracionDias', l: 'Duración (días)', t: 'number', req: true, min: 1, step: '1' },
    { n: 'descripcion', l: 'Descripción', t: 'textarea', completo: true, max: 300 }
  ],
  columnas: [
    { l: 'Plan', v: r => `<strong>${esc(r.nombre)}</strong><small>${esc(r.descripcion)}</small>` },
    { l: 'Duración', v: r => `${r.duracionDias} días` },
    { l: 'Precio', v: r => dinero(r.precio), num: true },
    { l: 'Clientes', v: r => (datos.clientes || []).filter(c => c.membresiaId === r.id).length, num: true }
  ]
};
