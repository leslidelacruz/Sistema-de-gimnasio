using GymApi.Data;
using GymApi.Models;
using Microsoft.AspNetCore.Mvc;

namespace GymApi.Controllers;

[Route("api/pagos")]
public class PagosController : CrudController<Pago>
{
    public PagosController(GymContext db) : base(db) { }
}
