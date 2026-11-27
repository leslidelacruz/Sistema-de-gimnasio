ENTIDADES.rutinas = {
  ruta: 'rutinas',
  titulo: 'Rutinas',
  subtitulo: 'Planes de ejercicios asignados a clientes.',
  singular: 'rutina',
  nuevo: 'Nueva rutina',
  vacio: 'Aún no hay rutinas registradas.',
  icono: '<rect x="5" y="3" width="14" height="18" rx="2"/><path d="M9 8h6M9 12h6M9 16h4"/>',
  nombreRegistro: r => r.nombre,
  campos: [
    { n: 'nombre', l: 'Nombre de la rutina', t: 'text', req: true, max: 80 },
    { n: 'nivel', l: 'Nivel', t: 'select', req: true, opciones: ['Principiante', 'Intermedio', 'Avanzado'] },
    { n: 'objetivo', l: 'Objetivo', t: 'text', max: 120, completo: true },
    { n: 'clienteId', l: 'Cliente', t: 'select', ref: 'clientes', etiqueta: c => `${c.nombre} ${c.apellido}` },
    { n: 'entrenadorId', l: 'Entrenador', t: 'select', ref: 'entrenadores', etiqueta: e => e.nombre },
    { n: 'ejercicios', l: 'Ejercicios (uno por línea)', t: 'textarea', completo: true, max: 2000, ayuda: 'Ejemplo: Sentadilla 4x12' }
  ],
  columnas: [
    { l: 'Rutina', v: r => `<strong>${esc(r.nombre)}</strong><small>${esc(r.objetivo)}</small>` },
    { l: 'Nivel', v: r => insignia(r.nivel, { Principiante: 'ok', Intermedio: 'medio', Avanzado: 'fuerte' }[r.nivel] || 'off') },
    { l: 'Cliente', v: r => r.clienteId ? esc(nombreCliente(r.clienteId)) : '—' },
    { l: 'Entrenador', v: r => { const e = buscar('entrenadores', r.entrenadorId); return e ? esc(e.nombre) : '—'; } },
    { l: 'Ejercicios', v: r => (r.ejercicios || '').split('\n').filter(x => x.trim()).length, num: true }
  ]
};
