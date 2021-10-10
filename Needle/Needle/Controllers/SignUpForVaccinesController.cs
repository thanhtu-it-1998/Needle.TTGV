using Microsoft.AspNetCore.Authorization;
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
    [Authorize]
    [Route("api/[controller]")]
    [ApiController]
    public class SignUpForVaccinesController : ControllerBase
    {
        private readonly ApplicationDbContext context;

        public SignUpForVaccinesController(ApplicationDbContext theContext)
        {
            this.context = theContext;
        }

        [HttpPost("infor-persion")]
        public async Task<IActionResult> InformationPerson([FromBody] VaccinatedPersonDto model)
        {
            if (ModelState.IsValid)
            {
                var vp =await  context.VaccinatedPersons.Where(item => item.PhoneNumber == model.PhoneNumber).FirstOrDefaultAsync();
                if(vp == null)
                {
                    VaccinatedPerson data = new VaccinatedPerson();
                    data.FullName = model.FullName;
                    data.Dob = model.Dob;
                    data.Gender = model.Gender;
                    data.PhoneNumber = model.PhoneNumber;
                    data.InsuranceCardNumber = model.InsuranceCardNumber;
                    data.IdentityCardNumber = model.IdentityCardNumber;
                    data.Image = model.Image;
                    data.Email = model.Email;
                    data.City = model.City;
                    data.District = model.District;
                    data.Ward = model.Ward;
                    data.Address = model.Address;
                    data.Status = model.Status;
                    data.Code = model.PhoneNumber;
                    await context.VaccinatedPersons.AddAsync(data);
                    await context.SaveChangesAsync();
                    return Ok(new { id = data.Id });
                }
                else
                {
                    VaccinatedPerson data = new VaccinatedPerson();
                    data.Id = vp.Id;
                    data.FullName = model.FullName;
                    data.Dob = model.Dob;
                    data.Gender = model.Gender;
                    data.PhoneNumber = model.PhoneNumber;
                    data.InsuranceCardNumber = model.InsuranceCardNumber;
                    data.IdentityCardNumber = model.IdentityCardNumber;
                    data.Image = model.Image;
                    data.Email = model.Email;
                    data.City = model.City;
                    data.District = model.District;
                    data.Ward = model.Ward;
                    data.Address = model.Address;
                    data.Status = model.Status;
                    data.Code = model.PhoneNumber;

                    context.VaccinatedPersons.Remove(vp);
                    await context.VaccinatedPersons.AddAsync(data);
                    await context.SaveChangesAsync();
                    return Ok(new { id = data.Id });
                }
               
            }
            return BadRequest();
        }

        [HttpPost("medical-history")]
        public async Task<IActionResult> MedicalHistory(int Id,[FromBody] MedicalDeclarationDto model)
        {
            if (ModelState.IsValid)
            {
                if(Id == 0)
                {
                    return BadRequest();
                }
                if (model.Status)
                {
                    MedicalDeclaration data = new MedicalDeclaration();
                    data.IdVaccinatePerson = Id;
                    data.StandardOne = model.StandardOne;
                    data.StandardTwo = model.StandardTwo;
                    data.StandardThree = model.StandardThree;
                    data.StandardFour = model.StandardFour;
                    data.StandardFive = model.StandardFive;
                    data.StandardSix = model.StandardSix;
                    data.StandardSeven = model.StandardSeven;
                    data.StandardEight = model.StandardEight;
                    data.StandardNine = model.StandardNine;
                    data.StandardTen = model.StandardTen;
                    data.StandardEleven = model.StandardEleven;
                    data.StandardThirteen = model.StandardThirteen;
                    data.StandardFourteen = model.StandardFourteen;
                    data.StandardFifteen = model.StandardFifteen;
                    data.StandardSixteen = model.StandardSixteen;
                    data.StandardSeventeen = model.StandardSeventeen;
                    data.StandardEighteen = model.StandardEighteen;
                    data.StandardNineteen = model.StandardNineteen;
                    data.StandardTwenty = model.StandardTwenty;
                    data.StandardTwentyOne = model.StandardOne;
                    data.StandardTwentyTwo = model.StandardTwentyTwo;
                    data.Status = model.Status;
                    await context.MedicalDeclarations.AddAsync(data);
                    await context.SaveChangesAsync();

                    var _infor = context.VaccinatedPersons.FindAsync(Id);
                    return Ok(new { Status = true, infor = _infor});
                }
                return Ok(new { Status = false });
               

            }
            return BadRequest();
        }


    }
}
