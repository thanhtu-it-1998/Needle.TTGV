using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Needle.Data;
using Needle.Data.Entities;
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
    public class HealthDeclarationController : ControllerBase
    {
        private readonly ApplicationDbContext context;
        public HealthDeclarationController(ApplicationDbContext theContext)
        {
            this.context = theContext;
        }

        [HttpPost("infor-medican")]
        public async Task<IActionResult> InforMedican([FromBody] InforMedicanDto model)
        {
            if (ModelState.IsValid)
            {
                var vp = await context.VaccinatedPersons.Where(item => item.PhoneNumber == model.PhoneNumber).FirstOrDefaultAsync();
                VaccinatedPerson vaccinatedPerson = new VaccinatedPerson();
                InforMedican inforMedican = new InforMedican();
                if (vp == null)
                {
                  
                    vaccinatedPerson.FullName = model.FullName;
                    vaccinatedPerson.Dob = model.Dob;
                    vaccinatedPerson.IdentityCardNumber = model.IdentityCardNumber;
                    vaccinatedPerson.Gender = model.Gender;
                    vaccinatedPerson.PhoneNumber = model.PhoneNumber;
                    vaccinatedPerson.Email = model.Email;
                    await context.VaccinatedPersons.AddAsync(vaccinatedPerson);
                    await context.SaveChangesAsync();

                    inforMedican.IdVaccinatePerson = vaccinatedPerson.Id;
                    inforMedican.StandardOne = model.StandardOne;
                    inforMedican.StandardTwo = model.StandardTwo;
                    inforMedican.StandardThree = model.StandardThree;
                    inforMedican.StandardFour = model.StandardFour;
                    inforMedican.StandardFive = model.StandardFive;

                    await context.InforMedicans.AddAsync(inforMedican);
                    await context.SaveChangesAsync();
                    return Ok(new
                    {
                        InforMedican = model
                    });
                }
                else
                {
                    inforMedican.IdVaccinatePerson = vp.Id;
                    inforMedican.StandardOne = model.StandardOne;
                    inforMedican.StandardTwo = model.StandardTwo;
                    inforMedican.StandardThree = model.StandardThree;
                    inforMedican.StandardFour = model.StandardFour;
                    inforMedican.StandardFive = model.StandardFive;
                    await context.InforMedicans.AddAsync(inforMedican);
                    await context.SaveChangesAsync();
                    return Ok(new
                    {
                        InforMedican = model
                    });
                }
            }
            return BadRequest();
        }
    }
}
