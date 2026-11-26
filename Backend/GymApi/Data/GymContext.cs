using GymApi.Models;
using Microsoft.EntityFrameworkCore;

namespace GymApi.Data;

public class GymContext : DbContext
{
    public GymContext(DbContextOptions<GymContext> opciones) : base(opciones) { }

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        
        var ensamblado = typeof(GymContext).Assembly;
        var tipos = ensamblado.GetTypes()
            .Where(t => t.IsClass && !t.IsAbstract && typeof(IEntidad).IsAssignableFrom(t));

        foreach (var tipo in tipos)
            modelBuilder.Entity(tipo);

        modelBuilder.ApplyConfigurationsFromAssembly(ensamblado);
    }
}
