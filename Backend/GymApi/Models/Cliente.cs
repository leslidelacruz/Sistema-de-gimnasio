using System.ComponentModel.DataAnnotations;

namespace GymApi.Models;

public class Cliente : IEntidad
{
    public int Id { get; set; }

    [Required(ErrorMessage = "El nombre es obligatorio."), StringLength(60)]
    public string Nombre { get; set; }

    [Required(ErrorMessage = "El apellido es obligatorio."), StringLength(60)]
    public string Apellido { get; set; }

    [Required(ErrorMessage = "La cédula es obligatoria."), StringLength(20)]
    public string Cedula { get; set; }

    [StringLength(20)]
    public string Telefono { get; set; }

    [EmailAddress(ErrorMessage = "El correo no es válido."), StringLength(100)]
    public string Email { get; set; }

    public DateTime FechaRegistro { get; set; } = DateTime.Today;

    public bool Activo { get; set; } = true;

    
    public int? MembresiaId { get; set; }

    public int? EntrenadorId { get; set; }
}
