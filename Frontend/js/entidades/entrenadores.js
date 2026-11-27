ENTIDADES.entrenadores = {
  ruta: 'entrenadores',
  titulo: 'Entrenadores',
  subtitulo: 'Equipo de instructores y su especialidad.',
  singular: 'entrenador',
  nuevo: 'Nuevo entrenador',
  vacio: 'Aún no hay entrenadores registrados.',
  icono: '<path d="M6 7v10M18 7v10M3 10v4M21 10v4M6 12h12"/>',
  nombreRegistro: r => r.nombre,
  campos: [
    { n: 'nombre', l: 'Nombre completo', t: 'text', req: true, max: 100, completo: true },
    { n: 'especialidad', l: 'Especialidad', t: 'text', max: 80 },
    { n: 'telefono', l: 'Teléfono', t: 'tel', max: 20 },
    { n: 'email', l: 'Correo electrónico', t: 'email', max: 100, completo: true }
  ],
  columnas: [
    { l: 'Entrenador', v: r => `<strong>${esc(r.nombre)}</strong><small>${esc(r.email)}</small>` },
    { l: 'Especialidad', v: r => esc(r.especialidad) || '—' },
    { l: 'Teléfono', v: r => esc(r.telefono) || '—' },
    { l: 'Clientes asignados', v: r => (datos.clientes || []).filter(c => c.entrenadorId === r.id).length, num: true }
  ]
};
