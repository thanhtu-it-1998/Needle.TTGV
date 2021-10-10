using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Needle.Data;
using Needle.Data.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Needle.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    [Authorize]
    public class SubscribersController : ControllerBase
    {
        private readonly ApplicationDbContext _context;

        public SubscribersController(ApplicationDbContext context)
        {
            _context = context;
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<VaccinatedPerson>>> GetVaccines()
        {
            return await _context.VaccinatedPersons.ToListAsync();
        }
    }
}
