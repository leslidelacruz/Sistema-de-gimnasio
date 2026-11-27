using GymApi.Data;
using GymApi.Models;
using Microsoft.AspNetCore.Mvc;

namespace GymApi.Controllers;

[Route("api/entrenadores")]
public class EntrenadoresController : CrudController<Entrenador>
{
    public EntrenadoresController(GymContext db) : base(db) { }
}
