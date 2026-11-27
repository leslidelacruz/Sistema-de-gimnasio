ENTIDADES.pagos = {
  ruta: 'pagos',
  titulo: 'Pagos',
  subtitulo: 'Registro de cobros por cliente.',
  singular: 'pago',
  nuevo: 'Registrar pago',
  vacio: 'Aún no hay pagos registrados.',
  icono: '<circle cx="12" cy="12" r="9"/><path d="M14.5 9a2.5 2.5 0 0 0-2.5-1.5c-1.4 0-2.5.8-2.5 2s1 1.7 2.5 2 2.5.8 2.5 2-1.1 2-2.5 2A2.5 2.5 0 0 1 9.5 15M12 6v2M12 16v2"/>',
  nombreRegistro: r => `el pago de ${dinero(r.monto)} de ${nombreCliente(r.clienteId)}`,
  campos: [
    { n: 'clienteId', l: 'Cliente', t: 'select', ref: 'clientes', req: true, completo: true, etiqueta: c => `${c.nombre} ${c.apellido}` },
    { n: 'monto', l: 'Monto (RD$)', t: 'number', req: true, min: 0.01, step: '0.01' },
    { n: 'fecha', l: 'Fecha', t: 'date', req: true, def: () => hoy() },
    { n: 'metodo', l: 'Método de pago', t: 'select', req: true, opciones: ['Efectivo', 'Tarjeta', 'Transferencia'] },
    { n: 'concepto', l: 'Concepto', t: 'text', max: 150 }
  ],
  columnas: [
    { l: 'Fecha', v: r => fecha(r.fecha) },
    { l: 'Cliente', v: r => `<strong>${esc(nombreCliente(r.clienteId))}</strong>` },
    { l: 'Concepto', v: r => esc(r.concepto) || '—' },
    { l: 'Método', v: r => esc(r.metodo) },
    { l: 'Monto', v: r => dinero(r.monto), num: true }
  ]
};
