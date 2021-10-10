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
    public class HealthController : ControllerBase
    {
        private readonly ApplicationDbContext context;

        public HealthController(ApplicationDbContext theContext)
        {
            this.context = theContext;
        }

        [HttpGet("list-of-health-advice")]
        public async Task<IActionResult> GetListOfHealthAdvice()
        {
            var data = await this.context.ListOfHealthAdvices
                .Select(item => new ListOfHealthAdviceDto
                {
                    Id = item.Id,
                    Title = item.Title
                })
                .ToListAsync();
            return Ok(data);
        }

        [HttpGet("get-health-consultation")]
        public async Task<IActionResult> GetHealthConsultation(int? id)
        {
            var query = from listH in context.ListOfHealthAdvices
                        join h in context.HealthConsultations on listH.Id equals h.IdListOfHealthAdvice
                        select new { listH, h };
            if (id == 0)
            {
                var data = await query.Select(item => new HealthConsultationDto
                {
                    Id = item.h.Id,
                    TitleCategory = item.listH.Title,
                    Title = item.h.Title,
                    Context = item.h.Context,
                    Date = item.h.CreatedDate,
                    Image = item.h.Image
                }).ToListAsync();
                return Ok(data);
            }
            else
            {
                var data = await query.Where(item=>item.listH.Id == id).Select(item => new HealthConsultationDto
                {
                    Id = item.h.Id,
                    TitleCategory = item.listH.Title,
                    Title = item.h.Title,
                    Context = item.h.Context,
                    Date = item.h.CreatedDate,
                    Image = item.h.Image
                }).ToListAsync();
                return Ok(data);
            }

           
        }
    }
}
