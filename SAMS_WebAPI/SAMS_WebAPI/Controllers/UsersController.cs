using AutoMapper;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using SAMS_WebAPI.DTOs;
using SAMS_WebAPI.Entities;
using SAMS_WebAPI.Helpers;
using System.Security.Claims;

namespace SAMS_WebAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    //[Authorize(AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme, Policy = "IsApplicationAdmin")]
    public class UsersController : ControllerBase
    {
        private readonly ApplicationDbContext context;
        private readonly IMapper mapper;
        private readonly UserManager<ApplicationUser> userManager;
        private readonly IFileStorageService fileStorageService;
        private readonly string containerName = "users";


        public UsersController(ApplicationDbContext context, IMapper mapper,
            UserManager<ApplicationUser> userManager, IFileStorageService fileStorageService)
        {
            this.context = context;
            this.mapper = mapper;
            this.userManager = userManager;
            this.fileStorageService = fileStorageService;
        }

        #region CommonUsersMethods

        [HttpGet("getCurrentUserInfo/{id}")]
        public async Task<ActionResult<ApplicationAdminDTO>> GetCurrentUserInfo(string id)
        {
            try
            {
                var user = await userManager.FindByIdAsync(id);

                var curentUserInfo = new CurrentUserInfoDTO()
                {
                    FullName = user.FirstName + " " + user.LastName
                };

                var userClaims = await userManager.GetClaimsAsync(user);
                var role = userClaims.Where(x => x.Type == "role").FirstOrDefault();

                if (string.IsNullOrEmpty(user.Picture))
                {
                    switch (user.Gender)
                    {
                        case GenderType.Unknown:
                            {
                                curentUserInfo.Picture = "https://localhost:44387/default-pictures/default-avatar.jpg";
                                break;
                            }
                        case GenderType.Male:
                            {
                                curentUserInfo.Picture = "https://localhost:44387/default-pictures/man-avatar.png";
                                break;
                            }
                        case GenderType.Female:
                            {
                                curentUserInfo.Picture = "https://localhost:44387/default-pictures/woman-avatar.png";
                                break;
                            }
                    }
                }
                else
                {
                    curentUserInfo.Picture = user.Picture;
                }


                switch (role.Value)
                {
                    case "applicationAdmin":
                        {
                            curentUserInfo.Designation = "Application Admin";
                            break;
                        }
                    case "companyAdmin":
                        {
                            curentUserInfo.Designation = "Company Admin";
                            break;
                        }
                    case "employee":
                        {
                            var employee = context.Employees.Where(x => x.Id == user.Id).FirstOrDefault();
                            curentUserInfo.Designation = employee.Designation;
                            break;
                        }
                }

                return Ok(curentUserInfo);
            }
            catch (Exception e)
            {
                return BadRequest(e.Message);
            }
        }

        [HttpGet("getUserDetails/{id}")]
        public async Task<ActionResult<UserDetailsDTO>> GetUserDetails(string id)
        {
            try
            {
                var user = await userManager.FindByIdAsync(id);
                return mapper.Map<UserDetailsDTO>(user);
            }
            catch (Exception e)
            {
                return BadRequest(e.Message);
            }
        }

        [HttpPut("editUserDetails/{id}")]
        public async Task<ActionResult> EditUserDetails(string id,
            [FromForm] EditUserDetailsDTO userDetailsDTO)
        {
            try
            {
                var user = await userManager.FindByIdAsync(id);
                var currentPicturePath = user.Picture;

                if (user == null)
                {
                    return NotFound();
                }

                user = mapper.Map(userDetailsDTO, user);

                if (userDetailsDTO.Picture != null)
                {
                    user.Picture = await fileStorageService.EditFile(containerName, userDetailsDTO.Picture, user.Picture);
                }
                else
                {
                    user.Picture = currentPicturePath;
                }

                await context.SaveChangesAsync();
                return NoContent();
            }
            catch (Exception e)
            {
                return BadRequest(e.Message);
            }
        }

        #endregion

        #region ApplicationAdmin

        [HttpGet("getApplicationAdmins")]
        //[Authorize(AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme, Policy = "IsApplicationAdmin")]
        public async Task<ActionResult<List<ApplicationAdminDTO>>> GetApplicationAdmins([FromQuery] PaginationDTO paginationDTO)
        {
            try
            {
                var applicationAdmins = await userManager
                    .GetUsersForClaimAsync(new Claim("role", "applicationAdmin"));

                var queryable = applicationAdmins.Where(x => x.Email != "admin@admin.com").AsQueryable();

                await HttpContext.InsertParametersPaginationInHeader(queryable);

                var appAdmins = queryable.OrderBy(x => x.FirstName).Paginate(paginationDTO).ToList();

                return mapper.Map<List<ApplicationAdminDTO>>(appAdmins);
            }
            catch (Exception e)
            {
                return BadRequest(e.Message);
            }
        }

        [HttpGet("getApplicationAdmin/{id}")]
        //[Authorize(AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme, Policy = "IsApplicationAdmin")]
        public async Task<ActionResult<ApplicationAdminDTO>> GetApplicationAdminById(string id)
        {
            try
            {
                var appAdmin = await userManager.FindByIdAsync(id);

                return mapper.Map<ApplicationAdminDTO>(appAdmin);
            }
            catch (Exception e)
            {
                return BadRequest(e.Message);
            }
        }

        [HttpPost("createApplicationAdmin")]
        //[Authorize(AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme, Policy = "IsApplicationAdmin")]
        public async Task<ActionResult> CreateApplicationAdmin([FromForm] ApplicationAdminCreationDTO appAdminCreationDTO)
        {
            try
            {
                if (appAdminCreationDTO == null)
                    return BadRequest("Incorrect Login");

                if (await userManager.FindByEmailAsync(appAdminCreationDTO.Email.ToLower()) != null)
                    throw new Exception("A user with that email already exists.");

                ApplicationUser user = new ApplicationUser
                {
                    FirstName = appAdminCreationDTO.FirstName,
                    LastName = appAdminCreationDTO.LastName,
                    UserName = appAdminCreationDTO.Email,
                    Email = appAdminCreationDTO.Email,
                    Address = appAdminCreationDTO.Address,
                    Gender = appAdminCreationDTO.Gender,
                    DateofBirth = appAdminCreationDTO.DateOfBirth
                };
                var result = await userManager.CreateAsync(user, appAdminCreationDTO.Password);
                await userManager.AddClaimAsync(user, new Claim("role", "applicationAdmin"));

                return NoContent();
            }
            catch (Exception e)
            {
                return BadRequest(e.Message);
            }
        }

        //[HttpPut("editApplicationAdmin/{id}")]
        ////[Authorize(AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme, Policy = "IsApplicationAdmin")]
        //public async Task<ActionResult> EditApplicationAdmin(string id,
        //    [FromForm] ApplicationAdminCreationDTO applicationAdminCreationDTO)
        //{
        //    try
        //    {
        //        var user = await userManager.FindByIdAsync(id);
        //        var currentPicturePath = user.Picture;

        //        if (user == null)
        //        {
        //            return NotFound();
        //        }

        //        user = mapper.Map(applicationAdminCreationDTO, user);

        //        if (applicationAdminCreationDTO.Picture != null)
        //        {
        //            user.Picture = await fileStorageService.EditFile(containerName, applicationAdminCreationDTO.Picture, user.Picture);
        //        }
        //        else
        //        {
        //            user.Picture = currentPicturePath;
        //        }

        //        await context.SaveChangesAsync();
        //        return NoContent();
        //    }
        //    catch (Exception e)
        //    {
        //        return BadRequest(e.Message);
        //    }
        //}

        [HttpDelete("deleteApplicationAdmin/{id}")]
        //[Authorize(AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme, Policy = "IsApplicationAdmin")]
        public async Task<ActionResult> DeleteApplicationAdmin(string id)
        {
            try
            {
                var user = await userManager.FindByIdAsync(id);

                if (user == null)
                {
                    return NotFound();
                }

                await userManager.RemoveClaimAsync(user, new Claim("role", "applicationAdmin"));
                await userManager.DeleteAsync(user);

                if (user.Picture != null)
                    await fileStorageService.DeleteFile(user.Picture, containerName);

                return NoContent();
            }
            catch (Exception e)
            {
                return BadRequest(e.Message);
            }
        }

        #endregion

        #region Company Admin

        [HttpGet("getCompanyAdmins/{companyId:int=0}")]
        public async Task<ActionResult<List<CompanyAdminDTO>>> GetCompanyAdmins([FromQuery] PaginationDTO paginationDTO, int companyId)
        {
            try
            {
                var queryable = context.CompanyAdmins
                    .Include(x => x.ApplicationUser)
                    .Include(x => x.Company)
                    .AsQueryable();

                if (companyId != 0)
                {
                    queryable = queryable.Where(x => x.CompanyId.Equals(companyId));
                }

                await HttpContext.InsertParametersPaginationInHeader(queryable);
                var companyAdmins = await queryable.OrderBy(x => x.Company.Name).Paginate(paginationDTO).ToListAsync();

                return mapper.Map<List<CompanyAdminDTO>>(companyAdmins);
            }
            catch (Exception e)
            {
                return BadRequest(e.Message);
            }
        }

        [HttpGet("getCurrentCompanyAdmins")]
        public async Task<ActionResult<List<CompanyAdminDTO>>> GetCurrentCompanyAdmins([FromQuery] PaginationDTO paginationDTO, string companyId)
        {
            try
            {
                var queryable = context.CompanyAdmins
                    .Include(x => x.ApplicationUser)
                    .Include(x => x.Company)
                    .Where(x => x.CompanyId.Equals(companyId))
                    .AsQueryable();
                await HttpContext.InsertParametersPaginationInHeader(queryable);
                var companyAdmins = await queryable.OrderBy(x => x.Company.Name).Paginate(paginationDTO).ToListAsync();

                return mapper.Map<List<CompanyAdminDTO>>(companyAdmins); ;
            }
            catch (Exception e)
            {
                return BadRequest(e.Message);
            }
        }

        [HttpGet("getCompanyAdmin/{id}")]
        public async Task<ActionResult<CompanyAdminDTO>> GetCompanyAdminById(string id)
        {
            try
            {
                var companyAdmin = await context.CompanyAdmins.Where(x => x.Id == id)
                    .Include(x => x.ApplicationUser)
                    .Include(x => x.Company)
                    .FirstOrDefaultAsync();
                return mapper.Map<CompanyAdminDTO>(companyAdmin);
            }
            catch (Exception e)
            {
                return BadRequest(e.Message);
            }
        }

        [HttpPost("createCompanyAdmin")]
        public async Task<ActionResult> CreateCompanyAdmin([FromForm] CompanyAdminCreationDTO companyAdminCreationDTO)
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
                    Address = "No Address",
                    Gender = companyAdminCreationDTO.Gender,
                    DateofBirth = companyAdminCreationDTO.DateOfBirth
                };
                var result = await userManager.CreateAsync(user, companyAdminCreationDTO.Password);

                CompanyAdmin companyAdmin = new CompanyAdmin()
                {
                    Id = user.Id,
                    CompanyId = companyAdminCreationDTO.CompanyId,
                    CompanyCreator = false,
                };

                var company = await context.Companies.Where(x => x.Id == companyAdminCreationDTO.CompanyId).FirstOrDefaultAsync();
                company!.NumberOfAdmins++;

                context.Add(companyAdmin);
                await context.SaveChangesAsync();
                await userManager.AddClaimAsync(user, new Claim("role", "companyAdmin"));

                return NoContent();
            }
            catch (Exception e)
            {
                return BadRequest(e.Message);
            }
        }

        //[HttpPut("editCompanyAdmin/{id}")]
        //public async Task<ActionResult> EditCompanyAdmin(string id,
        //    [FromForm] CompanyAdminEditDTO companyAdminEditDTO)
        //{
        //    try
        //    {
        //        var user = await userManager.FindByIdAsync(id);
        //        var currentPicturePath = user.Picture;

        //        if (user == null)
        //        {
        //            return NotFound();
        //        }

        //        user = mapper.Map(companyAdminEditDTO, user);

        //        if (companyAdminEditDTO.Picture != null)
        //        {
        //            user.Picture = await fileStorageService.EditFile(containerName, companyAdminEditDTO.Picture, user.Picture);
        //        }
        //        else
        //        {
        //            user.Picture = currentPicturePath;
        //        }

        //        await context.SaveChangesAsync();
        //        return NoContent();
        //    }
        //    catch (Exception e)
        //    {
        //        return BadRequest(e.Message);
        //    }
        //}

        [HttpDelete("deleteCompanyAdmin/{id}")]
        public async Task<ActionResult> DeleteCompanyAdmin(string id)
        {
            try
            {
                var companyAdmin = await context.CompanyAdmins
                    .Include(x => x.ApplicationUser)
                    .Include(x => x.Company)
                    .Where(x => x.Id == id).FirstAsync();

                if (companyAdmin == null)
                {
                    return NotFound();
                }

                if (companyAdmin.ApplicationUser.Picture != null)
                    await fileStorageService.DeleteFile(companyAdmin.ApplicationUser.Picture, containerName);
                context.Remove(companyAdmin);
                var company = await context.Companies.Where(x => x.Id == companyAdmin.CompanyId).FirstOrDefaultAsync();
                company!.NumberOfAdmins--;
                await context.SaveChangesAsync();

                await userManager.RemoveClaimAsync(companyAdmin.ApplicationUser, new Claim("role", "companyAdmin"));
                await userManager.DeleteAsync(companyAdmin.ApplicationUser);
                return NoContent();
            }
            catch (Exception e)
            {
                return BadRequest(e.Message);
            }
        }

        #endregion

        #region Employee

        [HttpGet("getCompanyEmployees/{companyId}")]
        public async Task<ActionResult<List<EmployeeDTO>>> GetCompanyEmployees([FromQuery] PaginationDTO paginationDTO, int companyId)
        {
            try
            {
                var queryable = context.Employees
                    .Include(x => x.ApplicationUser)
                    .Include(x => x.Company)
                    .Where(x => x.CompanyId.Equals(companyId))
                    .AsQueryable();

                await HttpContext.InsertParametersPaginationInHeader(queryable);
                var employee = await queryable.OrderBy(x => x.StartWorkingDate).Paginate(paginationDTO).ToListAsync();

                return mapper.Map<List<EmployeeDTO>>(employee);
            }
            catch (Exception e)
            {
                return BadRequest(e.Message);
            }
        }

        [HttpGet("getEmployee/{id}")]
        public async Task<ActionResult<EmployeeDTO>> GetEmployeeById(string id)
        {
            try
            {
                var employee = await context.Employees.Where(x => x.Id == id)
                    .Include(x => x.ApplicationUser)
                    .Include(x => x.Company)
                    //.Include(x => x.Absences)
                    .FirstOrDefaultAsync();
                return mapper.Map<EmployeeDTO>(employee);
            }
            catch (Exception e)
            {
                return BadRequest(e.Message);
            }
        }

        [HttpPost("createEmployee")]
        public async Task<ActionResult> CreateEmployee([FromForm] EmployeeCreationDTO employeeCreationDTO)
        {
            try
            {
                if (employeeCreationDTO == null)
                    return BadRequest("Incorrect Login");

                if (await userManager.FindByEmailAsync(employeeCreationDTO.Email.ToLower()) != null)
                    throw new Exception("A user with that email already exists.");

                ApplicationUser user = new ApplicationUser
                {
                    FirstName = employeeCreationDTO.FirstName,
                    LastName = employeeCreationDTO.LastName,
                    UserName = employeeCreationDTO.Email,
                    Email = employeeCreationDTO.Email,
                    Address = "No Address",
                    Gender = employeeCreationDTO.Gender,
                };
                var result = await userManager.CreateAsync(user, employeeCreationDTO.Password);

                var daysOdExperience = (DateTime.Today.Date - employeeCreationDTO.StartWorkingDate.Date).Days;
                var yearsOfExperience = (int)Math.Truncate(Convert.ToDecimal(daysOdExperience / 365.25));

                Employee employee = new Employee()
                {
                    Id = user.Id,
                    Designation = employeeCreationDTO.Designation,
                    StartWorkingDate = employeeCreationDTO.StartWorkingDate,
                    ExperienceInCompany = yearsOfExperience,
                    MaximumAnnualLeave = employeeCreationDTO.MaximumAnnualLeave,
                    RemainingAnnualLeave = employeeCreationDTO.MaximumAnnualLeave,
                    CompanyId = employeeCreationDTO.CompanyId
                };

                var company = await context.Companies.Where(x => x.Id == employeeCreationDTO.CompanyId).FirstOrDefaultAsync();
                company!.NumberOfEmployees++;

                context.Add(employee);
                await context.SaveChangesAsync();
                await userManager.AddClaimAsync(user, new Claim("role", "employee"));

                return NoContent();
            }
            catch (Exception e)
            {
                return BadRequest(e.Message);
            }
        }

        [HttpPut("editEmployeeSettings/{id}")]
        public async Task<ActionResult> EditEmployeeSettings(string id,
            [FromForm] EmployeeEditDTO employeeEditDTO)
        {
            try
            {
                var employee = await context.Employees.Where(x => x.Id == id).FirstOrDefaultAsync();

                if (employee == null)
                {
                    return NotFound();
                }

                employee.Designation = employeeEditDTO.Designation;
                employee.ExperienceInCompany = employeeEditDTO.ExperienceInCompany;
                employee.RemainingAnnualLeave += employeeEditDTO.MaximumAnnualLeave - employee.MaximumAnnualLeave;
                employee.MaximumAnnualLeave = employeeEditDTO.MaximumAnnualLeave;

                await context.SaveChangesAsync();
                return Ok();
            }
            catch (Exception e)
            {
                return BadRequest(e.Message);
            }
        }

        [HttpDelete("deleteEmployee/{id}")]
        public async Task<ActionResult> DeleteEmployee(string id)
        {
            try
            {
                var employee = await context.Employees
                    .Include(x => x.ApplicationUser)
                    .Include(x => x.Company)
                    .Where(x => x.Id == id).FirstAsync();

                if (employee == null)
                {
                    return NotFound();
                }

                if (employee.ApplicationUser.Picture != null)
                    await fileStorageService.DeleteFile(employee.ApplicationUser.Picture, containerName);
                context.Remove(employee);
                var company = await context.Companies.Where(x => x.Id == employee.CompanyId).FirstOrDefaultAsync();
                company!.NumberOfEmployees--;
                await context.SaveChangesAsync();

                await userManager.RemoveClaimAsync(employee.ApplicationUser, new Claim("role", "employee"));
                await userManager.DeleteAsync(employee.ApplicationUser);
                return NoContent();
            }
            catch (Exception e)
            {
                return BadRequest(e.Message);
            }
        }

        #endregion

    }
}
