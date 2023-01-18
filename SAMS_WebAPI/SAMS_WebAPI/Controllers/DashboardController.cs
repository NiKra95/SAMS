using AutoMapper;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using SAMS_WebAPI.DTOs;
using SAMS_WebAPI.Entities;
using SAMS_WebAPI.Extenstions;
using System.Globalization;
using System.Security.Claims;

namespace SAMS_WebAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class DashboardController : ControllerBase
    {
        private readonly ApplicationDbContext context;
        private readonly UserManager<ApplicationUser> userManager;
        private readonly IMapper mapper;

        public DashboardController(ApplicationDbContext context, UserManager<ApplicationUser> userManager, IMapper mapper)
        {
            this.context = context;
            this.userManager = userManager;
            this.mapper = mapper;
        }

        [HttpGet("getCompanyDashboardData/{companyId:int}")]
        public async Task<ActionResult<CompanyDashboardDTO>> GetCompanyDashboardData(int companyId)
        {
            try
            {
                var company = context.Companies.Where(x => x.Id.Equals(companyId)).AsQueryable();

                var companyAbsences = await context.Absences.Where(x => x.Employee.CompanyId.Equals(companyId)).ToListAsync();

                var approvedCompanyAbsences = companyAbsences.Where(x => x.AbsenceStatus.Equals(AbsenceStatus.Approved)).ToList();

                CompanyDashboardDTO companyDashboardDTO = new CompanyDashboardDTO()
                {
                    //Company Info
                    NumberOfAdmins = company.Select(x => x.NumberOfAdmins).First(),
                    NumberOfEmployees = company.Select(x => x.NumberOfEmployees).First(),
                    MinimumAnnualLeaveDays = company.Select(x => x.MinimumAnnualLeaveDays).First(),

                    //Absences Info
                    NumberOfAbsences = companyAbsences.Count(),
                    PendingAbsences = companyAbsences.Count(x => x.AbsenceStatus.Equals(AbsenceStatus.Pending) ),
                    DeniedAbsences = companyAbsences.Count(x => x.AbsenceStatus.Equals(AbsenceStatus.Denied)),
                    ApprovedAbsences = approvedCompanyAbsences.Count(),
                    AnnualLeaveCount = approvedCompanyAbsences.Count(x => x.AbsenceType.Equals(AbsenceType.AnnualLeave)),
                    SickLeaveCount = approvedCompanyAbsences.Count(x => x.AbsenceType.Equals(AbsenceType.SickLeave)),
                    ReligiousHolidaysCount = approvedCompanyAbsences.Count(x => x.AbsenceType.Equals(AbsenceType.ReligiousHolidays)),
                    UnpaidLeaveCount = approvedCompanyAbsences.Count(x => x.AbsenceType.Equals(AbsenceType.UnpaidLeave)),
                    SpecialLeaveCount = approvedCompanyAbsences.Count(x => x.AbsenceType.Equals(AbsenceType.SpecialLeave))
                };

                return Ok(companyDashboardDTO);
            }
            catch (Exception e)
            {
                return BadRequest(e.Message);
            }
        }

        [HttpGet("getApplicationDashboardData")]
        public async Task<ActionResult<ApplicationDashboardDTO>> GetApplicationDashboardData()
        {
            try
            {
                var users = await userManager.Users.ToListAsync();
                var applicationAdmins = await userManager.GetUsersForClaimAsync(new Claim("role", "applicationAdmin"));
                var companyAdmins = await userManager.GetUsersForClaimAsync(new Claim("role", "companyAdmin"));
                var employees = await userManager.GetUsersForClaimAsync(new Claim("role", "employee"));
                var companies = await context.Companies.ToListAsync();

                
                Dictionary<string, int> monthlyCompanyStat = new Dictionary<string, int>();
                Dictionary<string, int> monthlyCompanyProgress = new Dictionary<string, int>();

                var companyCount = 0;
                var firstTime = true;
                for (int i = 5; i >= 0; i--)
                {

                    var tempDate = DateTime.Now.AddMonths(-i);

                    var monthlyIncrement = companies.Where(x => x.CreationDate.Month.Equals(tempDate.Month) && 
                                                                            x.CreationDate.Year.Equals(tempDate.Year)).Count();

                    if (firstTime)
                    {
                        var firstDayOfMonth = MonthExtensions.FirstDayOfMonth(tempDate);
                        companyCount = companies.Where(x => x.CreationDate < firstDayOfMonth).Count();
                        firstTime = false;
                    }
                    
                    companyCount += monthlyIncrement;


                    monthlyCompanyStat.Add(MonthExtensions.ToMonthName(tempDate), monthlyIncrement);
                    monthlyCompanyProgress.Add(MonthExtensions.ToMonthName(tempDate), companyCount);
                }

                ApplicationDashboardDTO appplicationDashboardDTO = new ApplicationDashboardDTO()
                {
                    NumberOfUsers = users.Count(),
                    NumberOfApplicationAdmins = applicationAdmins.Count(),
                    NumberOfCompanyAdmins = companyAdmins.Count(),
                    NumberOfEmployees = employees.Count(),
                    NumberOfCompanies = companies.Count(),
                    MonthlyCompanyStat = monthlyCompanyStat,
                    MonthlyCompanyProgress = monthlyCompanyProgress
                };

                return Ok(appplicationDashboardDTO);
            }
            catch (Exception e)
            {
                return BadRequest(e.Message);
            }
        }
    }
}
