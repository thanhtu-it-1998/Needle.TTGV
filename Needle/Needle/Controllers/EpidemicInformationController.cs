using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Needle.Data;
using Needle.Dto;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Needle.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    [Authorize]
    public class EpidemicInformationController : ControllerBase
    {
        private readonly ApplicationDbContext context;

        public EpidemicInformationController (ApplicationDbContext theContext)
        {
            this.context = theContext;
        }

        [HttpGet("epidemic-information")]
        public async Task<IActionResult> GetEpidemicInformation()
        {
            var query = from ar in context.Areas
                        join es in context.EpidemicSituations on ar.Id equals es.IdArea
                        select new { ar, es };
            var infor = await query.Select(item => new EpidemicSituationDto
            {
                TotalCases = item.es.TotalCases,
                TotalCaseToDay  = item.es.TotalCaseToDay,
                NumberOfDeaths = item.es.NumberOfDeaths,
                CreatedUpdate = item.es.CreatedUpdate,
                Address = item.ar.Address,
                City = item.ar.Address,
                District = item.ar.District,
                Ward = item.ar.Ward
            }).ToListAsync();

            return Ok(infor);
        }
    }
}
