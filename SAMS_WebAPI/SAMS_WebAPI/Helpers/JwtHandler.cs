using Microsoft.AspNetCore.Identity;
using Microsoft.IdentityModel.Tokens;
using Microsoft.EntityFrameworkCore;
using SAMS_WebAPI.Entities;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;

namespace SAMS_WebAPI.Helpers
{
    public class JwtHandler
    {
        private readonly IConfiguration _configuration;
        private readonly UserManager<ApplicationUser> _userManager;
        private readonly ApplicationDbContext _context;

        public JwtHandler(IConfiguration configuration, UserManager<ApplicationUser> userManager,
                         ApplicationDbContext context)
        {
            _configuration = configuration;
            _userManager = userManager;
            _context = context;
        }
        public async Task<JwtSecurityToken> GetTokenAsync(ApplicationUser user)
        {
            var jwtOptions = new JwtSecurityToken(
            issuer: _configuration["JwtSettings:Issuer"],
            audience: _configuration["JwtSettings:Audience"],
            claims: await GetClaimsAsync(user),
            expires: DateTime.Now.AddDays(Convert.ToDouble(
            _configuration["JwtSettings:ExpirationTimeInDays"])),
            signingCredentials: GetSigningCredentials());
            return jwtOptions;
        }

        private SigningCredentials GetSigningCredentials()
        {
            var key = Encoding.UTF8.GetBytes(
            _configuration["JwtSettings:SecurityKey"]);
            var secret = new SymmetricSecurityKey(key);
            return new SigningCredentials(secret,
            SecurityAlgorithms.HmacSha256);
        }

        private async Task<List<Claim>> GetClaimsAsync(ApplicationUser user)
        {
            var userClaims = await _userManager.GetClaimsAsync(user);

            var role = userClaims.Where(x => x.Type == "role").FirstOrDefault();
            string companyId = "", companyName = "", companyLogo = "", companyCreator = "";

            switch (role.Value)
            {
                case "companyAdmin":
                    {
                        var companyAdmin = _context.CompanyAdmins
                            .Include(x => x.Company)
                            .Where(x => x.Id == user.Id)
                            .FirstOrDefault();
                        companyId = companyAdmin.Company.Id.ToString();
                        companyName = companyAdmin.Company.Name;
                        companyLogo = companyAdmin.Company.Logo;
                        companyCreator = companyAdmin.CompanyCreator.ToString();
                        break;
                    }
                case "employee":
                    {
                        var employee = _context.Employees
                            .Include(x => x.Company)
                            .Where(x => x.Id == user.Id)
                            .FirstOrDefault();
                        companyId = employee.Company.Id.ToString();
                        companyName = employee.Company.Name;
                        companyLogo = employee.Company.Logo;
                        break;
                    }
            }

            var claims = new List<Claim>
            {
                new Claim("userID", user.Id),
                new Claim("userRole", role.Value),
                new Claim("companyId", companyId),
                new Claim("companyName", companyName),
                new Claim("companyLogo", companyLogo),
                new Claim("companyCreator", companyCreator)

            };

            return claims;
        }
    }
}
