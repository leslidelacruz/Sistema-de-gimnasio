const $ = s => document.querySelector(s);
const vista = $('#vista');
const ICONO_PANEL = '<rect x="3" y="3" width="7" height="9"/><rect x="14" y="3" width="7" height="5"/><rect x="14" y="12" width="7" height="9"/><rect x="3" y="16" width="7" height="5"/>';
let filtro = '';

function construirNav() {
  const items = [{ clave: 'panel', titulo: 'Panel', icono: ICONO_PANEL },
    ...Object.entries(ENTIDADES).map(([clave, e]) => ({ clave, titulo: e.titulo, icono: e.icono }))];
  $('#nav').innerHTML = items.map(i =>
    `<a href="#${i.clave}" data-clave="${i.clave}"><svg viewBox="0 0 24 24" aria-hidden="true">${i.icono}</svg><span>${i.titulo}</span></a>`).join('');
}

function marcarNav(clave) {
  document.querySelectorAll('#nav a').forEach(a =>
    a.classList.toggle('activo', a.dataset.clave === clave));
}

function cabecera(titulo, subtitulo, accion = '') {
  $('#titulo').textContent = titulo;
  $('#subtitulo').textContent = subtitulo;
  $('#acciones').innerHTML = accion;
}

function estadoApi(ok) {
  $('#punto-api').className = 'punto ' + (ok ? 'ok' : 'error');
  $('#estado-api').textContent = ok ? 'API conectada' : 'Sin conexión con la API';
}

function aviso(texto, tipo = 'ok') {
  const el = document.createElement('div');
  el.className = 'aviso ' + tipo;
  el.textContent = texto;
  $('#avisos').appendChild(el);
  setTimeout(() => el.remove(), 3500);
}

async function cargarDatos() {
  const claves = Object.keys(ENTIDADES);
  const res = await Promise.all(claves.map(k => Api.listar(ENTIDADES[k].ruta)));
  claves.forEach((k, i) => { datos[k] = res[i]; });
}

async function mostrar() {
  const clave = (location.hash || '#panel').slice(1);
  marcarNav(ENTIDADES[clave] ? clave : 'panel');
  try {
    await cargarDatos();
    estadoApi(true);
  } catch (e) {
    estadoApi(false);
    cabecera('Sin conexión', 'No se pudo cargar la información.');
    vista.innerHTML = `<div class="tarjeta vacio"><h2>No hay conexión con el backend</h2>
      <p>${esc(e.message)}</p>
      <p>Inicia el proyecto <strong>GymApi</strong> en Visual Studio (perfil <em>http</em>) y vuelve a cargar esta página.</p>
      <button class="btn" onclick="mostrar()">Reintentar</button></div>`;
    return;
  }
  if (ENTIDADES[clave]) dibujarTabla(clave); else dibujarPanel();
}

function dibujarPanel() {
  cabecera('Panel', 'Resumen del gimnasio.');
  const clientes = datos.clientes || [], pagos = datos.pagos || [];
  const activos = clientes.filter(c => c.activo).length;
  const ingresos = pagos.filter(p => soloFecha(p.fecha).startsWith(mesActual())).reduce((s, p) => s + p.monto, 0);

  const ultimos = [...pagos].sort((a, b) => soloFecha(b.fecha).localeCompare(soloFecha(a.fecha))).slice(0, 5);
  const planes = (datos.membresias || []).map(m => ({ n: m.nombre, c: clientes.filter(c => c.membresiaId === m.id).length }));
  const sinPlan = clientes.filter(c => !c.membresiaId).length;
  if (sinPlan) planes.push({ n: 'Sin plan', c: sinPlan });
  const max = Math.max(1, ...planes.map(p => p.c));

  vista.innerHTML = `
    <div class="stats">
      <article class="stat amarillo"><span>Clientes activos</span><strong>${activos}</strong><small>de ${clientes.length} registrados</small></article>
      <article class="stat negro"><span>Ingresos del mes</span><strong>${dinero(ingresos)}</strong><small>${pagos.filter(p => soloFecha(p.fecha).startsWith(mesActual())).length} pagos</small></article>
      <article class="stat menta"><span>Entrenadores</span><strong>${(datos.entrenadores || []).length}</strong><small>en el equipo</small></article>
      <article class="stat blanco"><span>Rutinas</span><strong>${(datos.rutinas || []).length}</strong><small>creadas</small></article>
    </div>
    <div class="dos-columnas">
      <section class="tarjeta">
        <h2>Últimos pagos</h2>
        ${ultimos.length ? `<ul class="lista">${ultimos.map(p =>
          `<li><div><strong>${esc(nombreCliente(p.clienteId))}</strong><small>${fecha(p.fecha)} · ${esc(p.metodo)}</small></div><span>${dinero(p.monto)}</span></li>`).join('')}</ul>`
          : '<p class="suave">Todavía no hay pagos. Registra el primero en la sección Pagos.</p>'}
      </section>
      <section class="tarjeta">
        <h2>Clientes por membresía</h2>
        ${planes.length ? planes.map(p => `<div class="barra"><div class="barra-info"><span>${esc(p.n)}</span><strong>${p.c}</strong></div>
          <div class="barra-pista"><div class="barra-relleno" style="width:${(p.c / max) * 100}%"></div></div></div>`).join('')
          : '<p class="suave">Aún no hay membresías.</p>'}
      </section>
    </div>`;
}

function dibujarTabla(clave) {
  const e = ENTIDADES[clave];
  filtro = '';
  cabecera(e.titulo, e.subtitulo, `<button class="btn" id="btn-nuevo">${esc(e.nuevo)}</button>`);
  $('#btn-nuevo').onclick = () => abrirForm(clave);

  vista.innerHTML = `<div class="tarjeta tabla-tarjeta">
    <div class="herramientas">
      <input type="search" id="buscador" placeholder="Buscar en ${esc(e.titulo.toLowerCase())}" aria-label="Buscar">
      <span class="suave" id="contador"></span>
    </div>
    <div class="tabla-scroll"><table>
      <thead><tr>${e.columnas.map(c => `<th class="${c.num ? 'num' : ''}">${c.l}</th>`).join('')}<th class="num">Acciones</th></tr></thead>
      <tbody id="filas"></tbody>
    </table></div></div>`;

  $('#buscador').oninput = ev => { filtro = ev.target.value.toLowerCase(); pintarFilas(clave); };
  $('#filas').onclick = ev => {
    const b = ev.target.closest('button[data-accion]');
    if (!b) return;
    const reg = (datos[clave] || []).find(r => r.id === Number(b.dataset.id));
    if (b.dataset.accion === 'editar') abrirForm(clave, reg); else confirmarBorrado(clave, reg);
  };
  pintarFilas(clave);
}

function pintarFilas(clave) {
  const e = ENTIDADES[clave];
  const filas = (datos[clave] || []).filter(r =>
    !filtro || e.columnas.map(c => c.v(r)).join(' ').replace(/<[^>]*>/g, ' ').toLowerCase().includes(filtro));
  $('#contador').textContent = `${filas.length} ${filas.length === 1 ? 'registro' : 'registros'}`;
  $('#filas').innerHTML = filas.length
    ? filas.map(r => `<tr>${e.columnas.map(c => `<td class="${c.num ? 'num' : ''}">${c.v(r)}</td>`).join('')}
        <td class="num acciones"><button class="btn-texto" data-accion="editar" data-id="${r.id}">Editar</button>
        <button class="btn-texto peligro" data-accion="borrar" data-id="${r.id}">Eliminar</button></td></tr>`).join('')
    : `<tr><td colspan="${e.columnas.length + 1}" class="vacio-fila">${filtro ? 'Ningún registro coincide con la búsqueda.' : esc(e.vacio) + ' Usa «' + esc(e.nuevo) + '» para empezar.'}</td></tr>`;
}

function campoHtml(c, valor) {
  const id = 'f_' + c.n, req = c.req ? 'required' : '';
  const etiqueta = `<label for="${id}">${c.l}${c.req ? ' <span class="req" aria-hidden="true">*</span>' : ''}</label>`;
  let ctrl;
  if (c.t === 'textarea') {
    ctrl = `<textarea id="${id}" name="${c.n}" rows="5" ${c.max ? `maxlength="${c.max}"` : ''} ${req}>${esc(valor)}</textarea>`;
  } else if (c.t === 'select') {
    let ops;
    if (c.ref) {
      ops = (datos[c.ref] || []).map(r => `<option value="${r.id}" ${r.id === valor ? 'selected' : ''}>${esc(c.etiqueta(r))}</option>`).join('');
    } else {
      ops = c.opciones.map(o => `<option value="${esc(o)}" ${o === valor ? 'selected' : ''}>${esc(o)}</option>`).join('');
    }
    const vacio = c.req ? 'Selecciona una opción' : 'Sin asignar';
    ctrl = `<select id="${id}" name="${c.n}" ${req}><option value="">${vacio}</option>${ops}</select>`;
  } else if (c.t === 'checkbox') {
    return `<div class="campo check ${c.completo ? 'completo' : ''}"><label><input type="checkbox" name="${c.n}" ${valor ? 'checked' : ''}> ${c.l}</label></div>`;
  } else {
    const val = c.t === 'date' ? soloFecha(valor) : (valor ?? '');
    ctrl = `<input id="${id}" name="${c.n}" type="${c.t}" value="${esc(val)}" ${c.max ? `maxlength="${c.max}"` : ''}
      ${c.min !== undefined ? `min="${c.min}"` : ''} ${c.step ? `step="${c.step}"` : ''} ${req}>`;
  }
  return `<div class="campo ${c.completo ? 'completo' : ''}">${etiqueta}${ctrl}${c.ayuda ? `<small class="suave">${esc(c.ayuda)}</small>` : ''}</div>`;
}

function abrirForm(clave, registro) {
  const e = ENTIDADES[clave], dlg = $('#dlg-form');
  dlg.innerHTML = `<form id="form">
    <h2>${registro ? 'Editar' : 'Nuevo'} ${esc(e.singular)}</h2>
    <div class="rejilla">${e.campos.map(c => {
      const def = typeof c.def === 'function' ? c.def() : c.def;
      return campoHtml(c, registro ? registro[c.n] : def);
    }).join('')}</div>
    <p class="error-form" id="error-form" role="alert" hidden></p>
    <div class="pie-form">
      <button type="button" class="btn-sec" id="cancelar">Cancelar</button>
      <button type="submit" class="btn" id="guardar">Guardar cambios</button>
    </div></form>`;
  $('#cancelar').onclick = () => dlg.close();
  $('#form').onsubmit = async ev => {
    ev.preventDefault();
    const form = ev.target, cuerpo = registro ? { id: registro.id } : {};
    for (const c of e.campos) {
      const el = form.elements[c.n];
      if (c.t === 'checkbox') cuerpo[c.n] = el.checked;
      else if (c.t === 'number' || (c.t === 'select' && c.ref)) cuerpo[c.n] = el.value === '' ? null : Number(el.value);
      else cuerpo[c.n] = el.value.trim();
    }
    const btn = $('#guardar'); btn.disabled = true;
    try {
      if (registro) await Api.actualizar(e.ruta, registro.id, cuerpo); else await Api.crear(e.ruta, cuerpo);
      dlg.close();
      aviso(registro ? 'Cambios guardados' : 'Registro creado');
      mostrar();
    } catch (err) {
      const p = $('#error-form'); p.textContent = err.message; p.hidden = false; btn.disabled = false;
    }
  };
  dlg.showModal();
}

function confirmarBorrado(clave, registro) {
  const e = ENTIDADES[clave], dlg = $('#dlg-borrar');
  dlg.innerHTML = `<div class="confirmar">
    <h2>Eliminar ${esc(e.singular)}</h2>
    <p>Vas a eliminar <strong>${esc(e.nombreRegistro(registro))}</strong>. Esta acción no se puede deshacer.</p>
    <div class="pie-form">
      <button class="btn-sec" id="no-borrar">Cancelar</button>
      <button class="btn-oscuro" id="si-borrar">Eliminar</button>
    </div></div>`;
  $('#no-borrar').onclick = () => dlg.close();
  $('#si-borrar').onclick = async () => {
    try {
      await Api.eliminar(e.ruta, registro.id);
      dlg.close(); aviso('Registro eliminado'); mostrar();
    } catch (err) { dlg.close(); aviso(err.message, 'error'); }
  };
  dlg.showModal();
}

construirNav();
window.addEventListener('hashchange', mostrar);
mostrar();
