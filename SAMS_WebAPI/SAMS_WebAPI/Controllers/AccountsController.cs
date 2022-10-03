using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using AutoMapper;
using SAMS_WebAPI.Entities;
using Microsoft.AspNetCore.Authorization;
using SAMS_WebAPI.DTOs;
using SAMS_WebAPI.Helpers;
using System.IdentityModel.Tokens.Jwt;

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
        public async Task<ActionResult<LoginResult>> Login(
            [FromBody] LoginRequest loginRequest)
        {

            if(loginRequest == null)
                return BadRequest("Incorrect Login");

            var user = await userManager.FindByNameAsync(loginRequest.Email);

            if (user == null || !await userManager.CheckPasswordAsync(user, loginRequest.Password))
            {
                return Unauthorized("Invalid Email or Password.");
            }

            var secToken = await jwtHandler.GetTokenAsync(user);

            var jwt = new JwtSecurityTokenHandler().WriteToken(secToken);
            return Ok(new LoginResult()
            {
                Success = true,
                Message = "Login successful",
                Token = jwt,
                Expiration = secToken.ValidTo
            });
        }
    }


}
