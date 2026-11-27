using GymApi.Data;
using GymApi.Models;
using Microsoft.AspNetCore.Mvc;

namespace GymApi.Controllers;

[Route("api/rutinas")]
public class RutinasController : CrudController<Rutina>
{
    public RutinasController(GymContext db) : base(db) { }
}
