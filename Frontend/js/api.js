const API_URL = 'http://localhost:5000/api';

const ENTIDADES = {};
const datos = {};

async function llamar(ruta, opciones = {}) {
  let resp;
  try {
    resp = await fetch(`${API_URL}/${ruta}`, {
      headers: { 'Content-Type': 'application/json' },
      ...opciones
    });
  } catch {
    throw new Error('No se pudo conectar con el backend. Verifica que esté en ejecución.');
  }
  if (!resp.ok) {
    let mensaje = `Error ${resp.status}`;
    try {
      const d = await resp.json();
      if (d.errors) mensaje = Object.values(d.errors).flat()[0];
      else if (d.mensaje) mensaje = d.mensaje;
      else if (d.title) mensaje = d.title;
    } catch { }
    throw new Error(mensaje);
  }
  return resp.status === 204 ? null : resp.json();
}

const Api = {
  listar: ruta => llamar(ruta),
  crear: (ruta, d) => llamar(ruta, { method: 'POST', body: JSON.stringify(d) }),
  actualizar: (ruta, id, d) => llamar(`${ruta}/${id}`, { method: 'PUT', body: JSON.stringify(d) }),
  eliminar: (ruta, id) => llamar(`${ruta}/${id}`, { method: 'DELETE' })
};

const esc = t => String(t ?? '').replace(/[&<>"']/g, c =>
  ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));

const dinero = n => new Intl.NumberFormat('es-DO', { style: 'currency', currency: 'DOP' }).format(n || 0);
const soloFecha = v => String(v ?? '').slice(0, 10);
const fecha = v => { const [a, m, d] = soloFecha(v).split('-'); return a ? `${d}/${m}/${a}` : '—'; };
const pad = n => String(n).padStart(2, '0');
const hoy = () => { const h = new Date(); return `${h.getFullYear()}-${pad(h.getMonth() + 1)}-${pad(h.getDate())}`; };
const mesActual = () => hoy().slice(0, 7);

const buscar = (tabla, id) => (datos[tabla] || []).find(x => x.id === id);
const nombreCliente = id => { const c = buscar('clientes', id); return c ? `${c.nombre} ${c.apellido}` : 'Cliente eliminado'; };
const insignia = (texto, tipo) => `<span class="insignia ${tipo}">${esc(texto)}</span>`;
