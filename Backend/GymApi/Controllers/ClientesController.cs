using GymApi.Data;
using GymApi.Models;
using Microsoft.AspNetCore.Mvc;

namespace GymApi.Controllers;

[Route("api/clientes")]
public class ClientesController : CrudController<Cliente>
{
    public ClientesController(GymContext db) : base(db) { }
}
