using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using AutoMapper;
using SAMS_WebAPI.Entities;
using Microsoft.AspNetCore.Authorization;
using SAMS_WebAPI.DTOs;
using SAMS_WebAPI.Helpers;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using Microsoft.EntityFrameworkCore;

namespace SAMS_WebAPI.Controllers
{
    [ApiController]
    [Route("api/accounts")]
    public class AccountsController : ControllerBase
    {
        private readonly UserManager<ApplicationUser> userManager;
        private readonly SignInManager<ApplicationUser> signInManager;
        private readonly JwtHandler jwtHandler;
        private readonly ApplicationDbContext context;
        private readonly IMapper mapper;

        public AccountsController(UserManager<ApplicationUser> userManager,
            SignInManager<ApplicationUser> signInManager,
            JwtHandler jwtHandler,
            IConfiguration configuration,
            ApplicationDbContext context,
            IMapper mapper)
        {
            this.userManager = userManager;
            this.signInManager = signInManager;
            this.jwtHandler = jwtHandler;
            this.jwtHandler = jwtHandler;
            this.context = context;
            this.mapper = mapper;
        }


        [HttpPost("login")]
        public async Task<ActionResult<AuthenticationResponse>> Login(
            [FromBody] LoginRequest loginRequest)
        {
            try 
            {
                if(loginRequest == null)
                    return BadRequest("Incorrect Login");

                var user = await userManager.FindByNameAsync(loginRequest.Email);

                if (user == null || !await userManager.CheckPasswordAsync(user, loginRequest.Password))
                {
                    throw new Exception("Invalid Email or Password.");
                }

                var secToken = await jwtHandler.GetTokenAsync(user);

                var jwt = new JwtSecurityTokenHandler().WriteToken(secToken);
                return Ok(new AuthenticationResponse()
                {
                    Success = true,
                    Message = "Login successful",
                    Token = jwt,
                    Expiration = secToken.ValidTo
                });
            }
            catch(Exception e)
            {
                return BadRequest(e.Message);
            }
        }

        [HttpPost("registerCompanyAdmin")]
        public async Task<ActionResult<AuthenticationResponse>> RegisterCompanyAdmin(
            [FromForm] CompanyAdminCreationDTO companyAdminCreationDTO)
        {
            try
            {
                if (companyAdminCreationDTO == null)
                    return BadRequest("Incorrect Login");

                if (await userManager.FindByEmailAsync(companyAdminCreationDTO.Email.ToLower()) != null)
                    throw new Exception("A user with that email already exists.");

                ApplicationUser user = new ApplicationUser
                {
                    FirstName = companyAdminCreationDTO.FirstName,
                    LastName = companyAdminCreationDTO.LastName,
                    UserName = companyAdminCreationDTO.Email,
                    Email = companyAdminCreationDTO.Email,
                    Gender = companyAdminCreationDTO.Gender,
                    DateofBirth = companyAdminCreationDTO.DateOfBirth
                };
                var result = await userManager.CreateAsync(user, companyAdminCreationDTO.Password);

                CompanyAdmin companyAdmin = new CompanyAdmin()
                {
                    Id = user.Id,
                    CompanyId = companyAdminCreationDTO.CompanyId,
                    CompanyCreator = true
                };

                context.Add(companyAdmin);
                await context.SaveChangesAsync();

                user = await userManager.FindByIdAsync(companyAdmin.Id);
                await userManager.AddClaimAsync(user, new Claim("role", "companyAdmin"));


                var secToken = await jwtHandler.GetTokenAsync(user);

                var jwt = new JwtSecurityTokenHandler().WriteToken(secToken);

                return Ok(new AuthenticationResponse()
                {
                    Success = true,
                    Message = "Registration successful",
                    Token = jwt,
                    Expiration = secToken.ValidTo
                });
            }
            catch(Exception e)
            {
                Company? company = await context.Companies.FirstOrDefaultAsync(x => x.Id == companyAdminCreationDTO.CompanyId);
                context.Companies.Remove(company);
                await context.SaveChangesAsync();
                return BadRequest(e.Message);
            }

        }
    }


}
