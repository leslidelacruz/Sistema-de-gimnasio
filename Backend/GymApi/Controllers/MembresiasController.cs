using GymApi.Data;
using GymApi.Models;
using Microsoft.AspNetCore.Mvc;

namespace GymApi.Controllers;

[Route("api/membresias")]
public class MembresiasController : CrudController<Membresia>
{
    public MembresiasController(GymContext db) : base(db) { }
}
