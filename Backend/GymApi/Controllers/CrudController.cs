using GymApi.Data;
using GymApi.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace GymApi.Controllers;


[ApiController]
public abstract class CrudController<T> : ControllerBase where T : class, IEntidad
{
    protected readonly GymContext _db;

    protected CrudController(GymContext db) => _db = db;

  
    [HttpGet]
    public async Task<ActionResult<IEnumerable<T>>> Listar() =>
        await _db.Set<T>().AsNoTracking()
            .OrderByDescending(x => EF.Property<int>(x, "Id"))
            .ToListAsync();

 
    [HttpGet("{id:int}")]
    public async Task<ActionResult<T>> Obtener(int id)
    {
        var item = await _db.Set<T>().FindAsync(id);
        return item == null ? NotFound(new { mensaje = "Registro no encontrado." }) : item;
    }

   
    [HttpPost]
    public async Task<ActionResult<T>> Crear(T item)
    {
        item.Id = 0;
        _db.Set<T>().Add(item);
        await _db.SaveChangesAsync();
        return CreatedAtAction(nameof(Obtener), new { id = item.Id }, item);
    }

   
    [HttpPut("{id:int}")]
    public async Task<IActionResult> Actualizar(int id, T item)
    {
        if (id != item.Id)
            return BadRequest(new { mensaje = "El id de la ruta no coincide con el del registro." });

        var existente = await _db.Set<T>().FindAsync(id);
        if (existente == null)
            return NotFound(new { mensaje = "Registro no encontrado." });

        _db.Entry(existente).CurrentValues.SetValues(item);
        await _db.SaveChangesAsync();
        return NoContent();
    }

    [HttpDelete("{id:int}")]
    public async Task<IActionResult> Eliminar(int id)
    {
        var existente = await _db.Set<T>().FindAsync(id);
        if (existente == null)
            return NotFound(new { mensaje = "Registro no encontrado." });

        _db.Set<T>().Remove(existente);
        await _db.SaveChangesAsync();
        return NoContent();
    }
}
