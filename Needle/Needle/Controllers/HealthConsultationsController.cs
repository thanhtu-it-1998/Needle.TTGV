using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Needle.Data;
using Needle.Data.Entities;

namespace Needle.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    [Authorize]
    public class HealthConsultationsController : ControllerBase
    {
        private readonly ApplicationDbContext _context;

        public HealthConsultationsController(ApplicationDbContext context)
        {
            _context = context;
        }

        // GET: api/HealthConsultations
        [HttpGet]
        public async Task<ActionResult<IEnumerable<HealthConsultation>>> GetHealthConsultations()
        {
            return await _context.HealthConsultations.ToListAsync();
        }

        // GET: api/HealthConsultations/5
        [HttpGet("{id}")]
        public async Task<ActionResult<HealthConsultation>> GetHealthConsultation(int id)
        {
            var healthConsultation = await _context.HealthConsultations.FindAsync(id);

            if (healthConsultation == null)
            {
                return NotFound();
            }

            return healthConsultation;
        }

        // PUT: api/HealthConsultations/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{id}")]
        public async Task<IActionResult> PutHealthConsultation(int id, HealthConsultationAdDto model)
        {
            if (id != model.Id)
            {
                return BadRequest();
            }
            HealthConsultation healthConsultation = new HealthConsultation();
            healthConsultation.Id = model.Id;
            healthConsultation.IdListOfHealthAdvice = model.IdListOfHealthAdvice;
            healthConsultation.Status = model.Status;
            healthConsultation.Title = model.Title;
            healthConsultation.Context = model.Context;
            healthConsultation.Image = model.Image;
            healthConsultation.CreatedDate = model.CreatedDate;
            _context.Entry(healthConsultation).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!HealthConsultationExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return NoContent();
        }

        // POST: api/HealthConsultations
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        public async Task<ActionResult<HealthConsultationAdDto>> PostHealthConsultation(HealthConsultationAdDto model)
        {
            HealthConsultation healthConsultation = new HealthConsultation();
            healthConsultation.IdListOfHealthAdvice = model.IdListOfHealthAdvice;
            healthConsultation.Status = model.Status;
            healthConsultation.Title = model.Title;
            healthConsultation.Context = model.Context;
            healthConsultation.Image = model.Image;
            healthConsultation.CreatedDate = model.CreatedDate;
            _context.HealthConsultations.Add(healthConsultation);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetHealthConsultation", new { id = healthConsultation.Id }, healthConsultation);
        }

        // DELETE: api/HealthConsultations/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteHealthConsultation(int id)
        {
            var healthConsultation = await _context.HealthConsultations.FindAsync(id);
            if (healthConsultation == null)
            {
                return NotFound();
            }

            _context.HealthConsultations.Remove(healthConsultation);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool HealthConsultationExists(int id)
        {
            return _context.HealthConsultations.Any(e => e.Id == id);
        }
    }
}
