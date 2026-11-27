using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace GymApi.Models;

public class Pago : IEntidad
{
    public int Id { get; set; }

    [Range(1, int.MaxValue, ErrorMessage = "Debes seleccionar un cliente.")]
    public int ClienteId { get; set; }

    [Column(TypeName = "decimal(10,2)")]
    [Range(0.01, 1000000, ErrorMessage = "El monto debe ser mayor que cero.")]
    public decimal Monto { get; set; }

    public DateTime Fecha { get; set; } = DateTime.Today;

    [Required(ErrorMessage = "El método de pago es obligatorio."), StringLength(30)]
    public string Metodo { get; set; }

    [StringLength(150)]
    public string Concepto { get; set; }
}
