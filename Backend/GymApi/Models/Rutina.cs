using System.ComponentModel.DataAnnotations;

namespace GymApi.Models;

public class Rutina : IEntidad
{
    public int Id { get; set; }

    [Required(ErrorMessage = "El nombre de la rutina es obligatorio."), StringLength(80)]
    public string Nombre { get; set; }

    [Required(ErrorMessage = "El nivel es obligatorio."), StringLength(20)]
    public string Nivel { get; set; }

    [StringLength(120)]
    public string Objetivo { get; set; }

    
    [StringLength(2000)]
    public string Ejercicios { get; set; }

    public int? ClienteId { get; set; }

    public int? EntrenadorId { get; set; }
}
