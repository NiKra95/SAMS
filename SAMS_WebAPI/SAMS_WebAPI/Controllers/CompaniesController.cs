using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using SAMS_WebAPI.DTOs;

namespace SAMS_WebAPI.Controllers
{
    public class CompaniesController: ControllerBase
    {

        [HttpPost("register-company")]
        public async Task<ActionResult> Create(
            [FromBody] CompanyCreationDTO companyCreationDTO)
        {
            //var user = new IdentityUser { UserName = userCredentials.Email, Email = userCredentials.Email };
            //var result = await userManager.CreateAsync(user, userCredentials.Password);

            //if (result.Succeeded)
            //{
            //    return await BuildToken(userCredentials);
            //}
            //else
            //{
            //    return BadRequest(result.Errors);
            //}

            return NoContent();
        }
    }
}
