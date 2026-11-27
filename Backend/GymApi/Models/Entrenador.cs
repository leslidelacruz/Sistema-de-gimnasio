using System.ComponentModel.DataAnnotations;

namespace GymApi.Models;

public class Entrenador : IEntidad
{
    public int Id { get; set; }

    [Required(ErrorMessage = "El nombre es obligatorio."), StringLength(100)]
    public string Nombre { get; set; }

    [StringLength(80)]
    public string Especialidad { get; set; }

    [StringLength(20)]
    public string Telefono { get; set; }

    [EmailAddress(ErrorMessage = "El correo no es válido."), StringLength(100)]
    public string Email { get; set; }
}
