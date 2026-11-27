using GymApi.Models;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace GymApi.Data.Configuraciones;

public class EntrenadorConfig : IEntityTypeConfiguration<Entrenador>
{
    public void Configure(EntityTypeBuilder<Entrenador> builder)
    {
        builder.HasData(
            new Entrenador { Id = 1, Nombre = "Carlos Martínez", Especialidad = "Fuerza e hipertrofia", Telefono = "809-555-0101", Email = "carlos@fortis.com" },
            new Entrenador { Id = 2, Nombre = "Laura Peña", Especialidad = "Funcional y cardio", Telefono = "809-555-0102", Email = "laura@fortis.com" });
    }
}
