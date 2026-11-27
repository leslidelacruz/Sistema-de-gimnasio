using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace GymApi.Models;

public class Membresia : IEntidad
{
    public int Id { get; set; }

    [Required(ErrorMessage = "El nombre del plan es obligatorio."), StringLength(60)]
    public string Nombre { get; set; }

    [Column(TypeName = "decimal(10,2)")]
    [Range(0, 1000000, ErrorMessage = "El precio no es válido.")]
    public decimal Precio { get; set; }

    [Range(1, 3650, ErrorMessage = "La duración debe estar entre 1 y 3650 días.")]
    public int DuracionDias { get; set; }

    [StringLength(300)]
    public string Descripcion { get; set; }
}
