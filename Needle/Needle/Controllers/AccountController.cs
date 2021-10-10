using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.Logging;
using Microsoft.IdentityModel.Tokens;
using Needle.Data;
using Needle.Data.Entities;
using Needle.Dto;
using System;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.Linq;
using System.Security.Claims;
using System.Text;
using System.Threading.Tasks;

namespace Needle.Controllers
{
    [EnableCors("MyPolicy")]
    [Route("api/[controller]")]
    [ApiController]
    public class AccountController : ControllerBase
    {
        private readonly ILogger<AccountController> logger;
        private readonly SignInManager<User> signInManager;
        private readonly UserManager<User> userManager;
        private readonly IConfiguration config;
        private readonly ApplicationDbContext applicationDbContext;
        public AccountController(ILogger<AccountController> logger,
            SignInManager<User> signInManager,
            UserManager<User> userManager,
            IConfiguration config,
            ApplicationDbContext _applicationDbContext
            )
        {
            this.logger = logger;
            this.signInManager = signInManager;
            this.userManager = userManager;
            this.config = config;
            this.applicationDbContext = _applicationDbContext;
        }

        [HttpPost("register")]
        public async Task<IActionResult> Register([FromBody] RegisterDto model)
        {
            if (ModelState.IsValid)
            {
                var existingUser = await this.userManager.FindByNameAsync(model.NumberPhone);
                if (existingUser == null)
                {
                    try
                    {
                        User user = new User();
                        VaccinatedPerson vaccinatedPerson = new VaccinatedPerson();
                        user.PhoneNumber = model.NumberPhone;
                        user.UserName = model.NumberPhone;
                        user.FullName = model.FullName;
                        vaccinatedPerson.PhoneNumber = model.NumberPhone;
                        vaccinatedPerson.FullName = model.FullName;
                        await applicationDbContext.VaccinatedPersons.AddAsync(vaccinatedPerson);
                        await applicationDbContext.SaveChangesAsync();

                        IdentityResult result = userManager.CreateAsync(user, model.Password).Result;

                        if (result.Succeeded)
                        {


                            await userManager.AddToRoleAsync(user, "User");
                            return Created("", model);

                        }
                    }
                    catch (Exception e)
                    {

                    }
                }

            }

            return BadRequest();
        }
        [HttpPost("login")]
        public async Task<IActionResult> Login([FromBody] LoginDto model)
        {
            if (ModelState.IsValid)
            {
                var user = await this.userManager.FindByNameAsync(model.NumberPhone);
                if (user != null)
                {
                    var passwordCheck = await this.signInManager.CheckPasswordSignInAsync(user, model.Password, false);
                    if (passwordCheck.Succeeded)
                    {
                        var claims = new List<Claim>
                        {
                            new Claim(JwtRegisteredClaimNames.Sub, user.PhoneNumber),
                            new Claim(JwtRegisteredClaimNames.Jti, Guid.NewGuid().ToString()),
                            new Claim(JwtRegisteredClaimNames.UniqueName, user.UserName)
                        };
                        var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(this.config["Tokens:Key"]));
                        var credentials = new SigningCredentials(key, SecurityAlgorithms.HmacSha256);
                        var token = new JwtSecurityToken(
                            this.config["Tokens:Issuer"],
                            this.config["Tokens:Audience"],
                            claims,
                            expires: DateTime.UtcNow.AddHours(3),
                            signingCredentials: credentials
                            );

                        return Ok(new
                        {
                            token = new JwtSecurityTokenHandler().WriteToken(token),
                            expiration = token.ValidTo
                        });
                    }

                }
                else
                {
                    return Unauthorized();
                }
            }

            return BadRequest();
        }

        [HttpGet("user")]
        [Authorize]
        public async Task<IActionResult> GetUser(string numberPhone)
        {
            if (numberPhone != null)
            {

                var _user = await applicationDbContext.VaccinatedPersons.Where(item => item.PhoneNumber == numberPhone).FirstOrDefaultAsync();
                return Ok(new
                {
                    user = _user
                });
            }
            return BadRequest();

        }
        [HttpGet("believer-information")]
        [Authorize]
        public async Task<IActionResult> InformationAfterInjection(string numberPhone)
        {
            if (numberPhone != null)
            {
                var _user = applicationDbContext.VaccinatedPersons.Where(item => item.PhoneNumber == numberPhone).FirstOrDefault();
                if (_user == null)
                {
                    ModelState.AddModelError("", "No User");
                    return BadRequest(ModelState);
                }
                var _believerInformation = await applicationDbContext.BelieverInformations.FindAsync(_user.Id);
                if (_believerInformation == null)
                {
                    ModelState.AddModelError("error", "No Believer Information");
                    return BadRequest(ModelState);

                }
                var _vaccine = await applicationDbContext.Vaccines.FindAsync(_believerInformation.IdVaccine);
                var _area = await applicationDbContext.Areas.FindAsync(_believerInformation.IdArea);
                return Ok(new
                {
                    user = _user,
                    vaccine = _vaccine,
                    area = _area,
                    numberNeedle = _believerInformation.NumberNeedle
                });
            }
            return BadRequest();
        }
    }
}

