ENTIDADES.clientes = {
  ruta: 'clientes',
  titulo: 'Clientes',
  subtitulo: 'Personas inscritas en el gimnasio, con su plan y su entrenador.',
  singular: 'cliente',
  nuevo: 'Nuevo cliente',
  vacio: 'Aún no hay clientes registrados.',
  icono: '<path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M22 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75"/>',
  nombreRegistro: r => `${r.nombre} ${r.apellido}`,
  campos: [
    { n: 'nombre', l: 'Nombre', t: 'text', req: true, max: 60 },
    { n: 'apellido', l: 'Apellido', t: 'text', req: true, max: 60 },
    { n: 'cedula', l: 'Cédula', t: 'text', req: true, max: 20 },
    { n: 'telefono', l: 'Teléfono', t: 'tel', max: 20 },
    { n: 'email', l: 'Correo electrónico', t: 'email', max: 100 },
    { n: 'fechaRegistro', l: 'Fecha de registro', t: 'date', req: true, def: () => hoy() },
    { n: 'membresiaId', l: 'Membresía', t: 'select', ref: 'membresias', etiqueta: r => r.nombre },
    { n: 'entrenadorId', l: 'Entrenador', t: 'select', ref: 'entrenadores', etiqueta: r => r.nombre },
    { n: 'activo', l: 'Cliente activo', t: 'checkbox', def: true }
  ],
  columnas: [
    { l: 'Cliente', v: r => `<strong>${esc(r.nombre)} ${esc(r.apellido)}</strong><small>${esc(r.email)}</small>` },
    { l: 'Cédula', v: r => esc(r.cedula) },
    { l: 'Teléfono', v: r => esc(r.telefono) || '—' },
    { l: 'Membresía', v: r => { const m = buscar('membresias', r.membresiaId); return m ? esc(m.nombre) : '—'; } },
    { l: 'Entrenador', v: r => { const e = buscar('entrenadores', r.entrenadorId); return e ? esc(e.nombre) : '—'; } },
    { l: 'Estado', v: r => r.activo ? insignia('Activo', 'ok') : insignia('Inactivo', 'off') }
  ]
};
