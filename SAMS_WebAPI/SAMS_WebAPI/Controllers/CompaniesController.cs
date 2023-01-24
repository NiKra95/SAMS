using AutoMapper;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using SAMS_WebAPI.DTOs;
using SAMS_WebAPI.Entities;
using SAMS_WebAPI.Extenstions;
using SAMS_WebAPI.Helpers;
using System.Security.Claims;

namespace SAMS_WebAPI.Controllers
{
    [Route("api/companies")]
    [ApiController]
    public class CompaniesController : ControllerBase
    {
        private readonly ApplicationDbContext context;
        private readonly IMapper mapper;
        private readonly IFileStorageService fileStorageService;
        private readonly UserManager<ApplicationUser> userManager;
        private string containerName = "companies";

        public CompaniesController(ApplicationDbContext context, IMapper mapper,
            IFileStorageService fileStorageService,
            UserManager<ApplicationUser> userManager)
        {
            this.context = context;
            this.mapper = mapper;
            this.fileStorageService = fileStorageService;
            this.userManager = userManager;
        }

        [HttpGet]
        public async Task<ActionResult<List<CompanyDTO>>> Get([FromQuery] PaginationDTO paginationDTO)
        {
            try
            {
                var queryable = context.Companies.AsQueryable();
                await HttpContext.InsertParametersPaginationInHeader(queryable);
                var companies = await queryable.OrderByDescending(x => x.CreationDate).Paginate(paginationDTO).ToListAsync();
                return mapper.Map<List<CompanyDTO>>(companies);
            }
            catch (Exception e)
            {
                return BadRequest(e.Message);
            }
        }

        [HttpPost]
        public async Task<ActionResult<int>> Create([FromForm] CompanyCreationDTO companyCreationDTO)
        {
            try
            {
                if (await context.Companies.FirstOrDefaultAsync(x => x.Name == companyCreationDTO.Name) != null)
                    throw new Exception("The name of the company is already used.");

                var company = mapper.Map<Company>(companyCreationDTO);

                if (companyCreationDTO.Logo != null)
                {
                    company.Logo = await fileStorageService.SaveFile(containerName, companyCreationDTO.Logo);
                }

                company.NumberOfAdmins = 1;

                context.Add(company);
                await context.SaveChangesAsync();

                return company.Id;

            }
            catch (Exception e)
            {
                return BadRequest(e.Message);
            }
        }

        [HttpDelete("deleteCompany/{companyId:int}")]
        public async Task<ActionResult> DeleteEmployee(int companyId)
        {
            try
            {
                var company = await context.Companies.Where(x => x.Id.Equals(companyId)).FirstOrDefaultAsync();

                var companyAdmins = await context.CompanyAdmins
                                    .Include(x => x.ApplicationUser)
                                    .Where(x => x.CompanyId.Equals(companyId)).ToListAsync();

                var employees = await context.Employees
                                    .Include(x => x.ApplicationUser)
                                    .Where(x => x.CompanyId.Equals(companyId)).ToListAsync();

                var absences = await context.Absences
                                    .Include(x => x.Employee)
                                    .Where(x => x.Employee.CompanyId.Equals(companyId)).ToListAsync();

                foreach(var absence in absences)
                {
                    context.Remove(absence);
                }

                foreach (var emp in employees)
                {
                    if (emp.ApplicationUser.Picture != null)
                        await fileStorageService.DeleteFile(emp.ApplicationUser.Picture, containerName);
                    context.Remove(emp);
                    await context.SaveChangesAsync();

                    await userManager.RemoveClaimAsync(emp.ApplicationUser, new Claim("role", "employee"));
                    await userManager.DeleteAsync(emp.ApplicationUser);
                }

                foreach(var companyAdmin in companyAdmins)
                {
                    if (companyAdmin.ApplicationUser.Picture != null)
                        await fileStorageService.DeleteFile(companyAdmin.ApplicationUser.Picture, containerName);
                    context.Remove(companyAdmin);
                    await context.SaveChangesAsync();

                    await userManager.RemoveClaimAsync(companyAdmin.ApplicationUser, new Claim("role", "companyAdmin"));
                    await userManager.DeleteAsync(companyAdmin.ApplicationUser);
                } 


                context.Remove(company);
                await context.SaveChangesAsync();

                return NoContent();
            }
            catch (Exception e)
            {
                return BadRequest(e.Message);
            }
        }

        [HttpGet("getMinimumAnnualLeaveDaysInCompany/{companyId:int}")]
        public async Task<ActionResult<CompanySettingsDTO>> GetMinimumAnnualLeaveDaysInCompany(int companyId)
        {
            try
            {
                var company = await context.Companies.Where(x => x.Id.Equals(companyId)).FirstOrDefaultAsync();

                CompanySettingsDTO companySettingsDTO = new()
                {
                    CompanyId = companyId,
                    MinimumAnnualLeaveDays = company!.MinimumAnnualLeaveDays
                };

                return companySettingsDTO;
            }
            catch (Exception e)
            {
                return BadRequest(e.Message);
            }
        }

        [HttpPut("resetCompanySettings")]
        public async Task<ActionResult> ResetCompanySettings([FromForm] CompanySettingsDTO companySettingsDTO)
        {
            try
            {
                var company = await context.Companies.Where(x => x.Id == companySettingsDTO.CompanyId).FirstOrDefaultAsync();

                if (company == null)
                {
                    return NotFound();
                }

                int previousMinAnnualLeaveDays = company.MinimumAnnualLeaveDays;
                company.MinimumAnnualLeaveDays = companySettingsDTO.MinimumAnnualLeaveDays;

                var companyEmployees = context.Employees.Where(x => x.CompanyId.Equals(companySettingsDTO.CompanyId)).AsQueryable();

                foreach (var emp in companyEmployees)
                {
                    int extraDays = emp.MaximumAnnualLeave - previousMinAnnualLeaveDays;
                    emp.MaximumAnnualLeave = emp.RemainingAnnualLeave = (extraDays == 0) ? companySettingsDTO.MinimumAnnualLeaveDays
                                                                                         : companySettingsDTO.MinimumAnnualLeaveDays + extraDays;
                }

                await context.SaveChangesAsync();
                return Ok();
            }
            catch (Exception e)
            {
                return BadRequest(e.Message);
            }
        }
    }
}
