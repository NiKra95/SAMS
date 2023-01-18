using AutoMapper;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using SAMS_WebAPI.DTOs;

namespace SAMS_WebAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class HomeController : ControllerBase
    {
        private readonly ApplicationDbContext context;
        private readonly IMapper mapper;

        public HomeController(ApplicationDbContext context, IMapper mapper)
        {
            this.context = context;
            this.mapper = mapper;
        }

        [HttpGet("getEmployeeHomePageData/{userId}")]
        public async Task<ActionResult<EmployeeHomePageDTO>> GetEmployeeHomePageData(string userId)
        {
            try
            {
                var queryable = context.Absences.Where(x => x.EmployeeId.Equals(userId))
                                                                .Include(x => x.Employee)
                                                                .AsQueryable();

                EmployeeHomePageDTO employeeHomePageDTO = new EmployeeHomePageDTO()
                {
                    NumberOfAbsences = queryable.Count(),
                    PendingAbsences = queryable.ToList().Count(x => x.AbsenceStatus.Equals(AbsenceStatus.Pending)),
                    ApprovedAbsences = queryable.ToList().Count(x => x.AbsenceStatus.Equals(AbsenceStatus.Approved)),
                    DeniedAbsences = queryable.ToList().Count(x => x.AbsenceStatus.Equals(AbsenceStatus.Denied)),
                    MaximumAnnualLeaveDays = queryable.Select(x => x.Employee.MaximumAnnualLeave).First(),
                    RemainingAnnualLeaveDays = queryable.Select(x => x.Employee.RemainingAnnualLeave).First()
                };

                return Ok(employeeHomePageDTO);
            }
            catch (Exception e)
            {
                return BadRequest(e.Message);
            }
        }
    }
}
