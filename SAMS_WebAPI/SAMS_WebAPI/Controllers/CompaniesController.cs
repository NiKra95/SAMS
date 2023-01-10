using AutoMapper;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using SAMS_WebAPI.DTOs;
using SAMS_WebAPI.Entities;
using SAMS_WebAPI.Helpers;

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
