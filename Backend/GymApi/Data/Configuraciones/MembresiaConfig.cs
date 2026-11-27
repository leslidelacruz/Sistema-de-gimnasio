using GymApi.Models;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace GymApi.Data.Configuraciones;

public class MembresiaConfig : IEntityTypeConfiguration<Membresia>
{
    public void Configure(EntityTypeBuilder<Membresia> builder)
    {
        builder.HasData(
            new Membresia { Id = 1, Nombre = "Mensual", Precio = 1500m, DuracionDias = 30, Descripcion = "Acceso completo a la sala y clases grupales." },
            new Membresia { Id = 2, Nombre = "Trimestral", Precio = 4000m, DuracionDias = 90, Descripcion = "Tres meses con evaluación física incluida." },
            new Membresia { Id = 3, Nombre = "Anual", Precio = 14000m, DuracionDias = 365, Descripcion = "Un año con plan de entrenamiento personalizado." });
    }
}
