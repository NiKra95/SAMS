using AutoMapper;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using SAMS_WebAPI.DTOs;

namespace SAMS_WebAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class CalendarController : ControllerBase
    {
        private readonly ApplicationDbContext context;
        private readonly IMapper mapper;

        public CalendarController(ApplicationDbContext context, IMapper mapper)
        {
            this.context = context;
            this.mapper = mapper;
        }

        [HttpGet("getApprovedUserAbsences/{userId}")]
        public async Task<ActionResult<List<ApprovedUserAbsenceDTO>>> GetApprovedUserAbsences(string userId)
        {
            try
            {
                var queryable = context.Absences
                                                .Where(x => x.EmployeeId.Equals(userId) && x.AbsenceStatus.Equals(AbsenceStatus.Approved))
                                                .AsQueryable();
                var approvedAbsences = await queryable.OrderBy(x => x.StartDate).ToListAsync();
                return mapper.Map<List<ApprovedUserAbsenceDTO>>(approvedAbsences);
            }
            catch (Exception e)
            {
                return BadRequest(e.Message);
            }
        }

        [HttpGet("getApprovedAbsencesInCompany/{companyId:int}")]
        public async Task<ActionResult<List<ApprovedAbsencesInCompanyDTO>>> GetApprovedAbsencesInCompany(int companyId)
        {
            try
            {
                var queryable = context.Absences
                    .Where(x => x.Employee.CompanyId.Equals(companyId) && x.AbsenceStatus.Equals(AbsenceStatus.Approved))
                    .Include(x => x.Employee)
                    .Include(x => x.Employee.ApplicationUser)
                    .AsQueryable();

                var approvedAbsences = await queryable.OrderBy(x => x.StartDate).ToListAsync();
                return mapper.Map<List<ApprovedAbsencesInCompanyDTO>>(approvedAbsences);
            }
            catch (Exception e)
            {
                return BadRequest(e.Message);
            }
        }
    }
}
