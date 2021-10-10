using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Needle.Data;
using Needle.Data.Entities;

namespace Needle.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ListOfHealthAdvicesController : ControllerBase
    {
        private readonly ApplicationDbContext _context;

        public ListOfHealthAdvicesController(ApplicationDbContext context)
        {
            _context = context;
        }

        // GET: api/ListOfHealthAdvices
        [HttpGet]
        public async Task<ActionResult<IEnumerable<ListOfHealthAdvice>>> GetListOfHealthAdvices()
        {
            return await _context.ListOfHealthAdvices.ToListAsync();
        }

        // GET: api/ListOfHealthAdvices/5
        [HttpGet("{id}")]
        public async Task<ActionResult<ListOfHealthAdvice>> GetListOfHealthAdvice(int id)
        {
            var listOfHealthAdvice = await _context.ListOfHealthAdvices.FindAsync(id);

            if (listOfHealthAdvice == null)
            {
                return NotFound();
            }

            return listOfHealthAdvice;
        }

        // PUT: api/ListOfHealthAdvices/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{id}")]
        public async Task<IActionResult> PutListOfHealthAdvice(int id, ListOfHealthAdvice listOfHealthAdvice)
        {
            if (id != listOfHealthAdvice.Id)
            {
                return BadRequest();
            }

            _context.Entry(listOfHealthAdvice).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!ListOfHealthAdviceExists(id))
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

        // POST: api/ListOfHealthAdvices
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        public async Task<ActionResult<ListOfHealthAdvice>> PostListOfHealthAdvice(ListOfHealthAdvice listOfHealthAdvice)
        {
            _context.ListOfHealthAdvices.Add(listOfHealthAdvice);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetListOfHealthAdvice", new { id = listOfHealthAdvice.Id }, listOfHealthAdvice);
        }

        // DELETE: api/ListOfHealthAdvices/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteListOfHealthAdvice(int id)
        {
            var listOfHealthAdvice = await _context.ListOfHealthAdvices.FindAsync(id);
            if (listOfHealthAdvice == null)
            {
                return NotFound();
            }

            _context.ListOfHealthAdvices.Remove(listOfHealthAdvice);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool ListOfHealthAdviceExists(int id)
        {
            return _context.ListOfHealthAdvices.Any(e => e.Id == id);
        }
    }
}
