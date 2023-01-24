using AutoMapper;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using SAMS_WebAPI.DTOs;
using SAMS_WebAPI.Entities;
using SAMS_WebAPI.Extenstions;

namespace SAMS_WebAPI.Controllers
{
    [Route("api/absences")]
    [ApiController]
    public class AbsencesController : ControllerBase
    {
        private readonly ApplicationDbContext context;
        private readonly IMapper mapper;

        public AbsencesController(ApplicationDbContext context, IMapper mapper)
        {
            this.context = context;
            this.mapper = mapper;
        }

        [HttpGet("getUserAbsences/{userId}")]
        public async Task<ActionResult<List<AbsenceDTO>>> GetUserAbsences([FromQuery] PaginationDTO paginationDTO, string userId)
        {
            try
            {
                var queryable = context.Absences.Where(x => x.EmployeeId.Equals(userId)).AsQueryable();
                await HttpContext.InsertParametersPaginationInHeader(queryable);
                var absences = await queryable.OrderByDescending(x => x.StartDate).Paginate(paginationDTO).ToListAsync();
                return mapper.Map<List<AbsenceDTO>>(absences);
            }
            catch (Exception e)
            {
                return BadRequest(e.Message);
            }
        }

        [HttpGet("getCompanyAbsences/{companyId:int}")]
        public async Task<ActionResult<List<CompanyAbsenceDTO>>> GetCompanyAbsences([FromQuery] PaginationDTO paginationDTO, int companyId)
        {
            try
            {
                var queryable = context.Absences.Where(x => x.Employee.CompanyId.Equals(companyId))
                    .Include(x => x.Employee)
                    .Include(x => x.Employee.ApplicationUser)
                    .AsQueryable();

                await HttpContext.InsertParametersPaginationInHeader(queryable);
                var absences = await queryable.OrderByDescending(x => x.StartDate).Paginate(paginationDTO).ToListAsync();

                return mapper.Map<List<CompanyAbsenceDTO>>(absences);
            }
            catch (Exception e)
            {
                return BadRequest(e.Message);
            }
        }

        [HttpPost]
        public async Task<ActionResult> Create([FromForm] AbsenceCreationDTO absenceCreationDTO)
        {
            try
            {
                var absence = mapper.Map<Absence>(absenceCreationDTO);

                context.Add(absence);
                await context.SaveChangesAsync();

                return Ok();
            }
            catch (Exception e)
            {
                return BadRequest(e.Message);
            }
        }

        [HttpPut("editAbsence/{absenceId:int}")]
        public async Task<ActionResult> EditAbsence(int absenceId,
            [FromForm] AbsenceCreationDTO absenceDTO)
        {
            try
            {
                var absence = await context.Absences
                    .Include(x => x.Employee)
                    .FirstOrDefaultAsync(x => x.Id == absenceId);

                if (absence == null)
                {
                    return NotFound();
                }

                absence.AbsenceType = absenceDTO.AbsenceType;
                absence.Description = absenceDTO.Description;
                absence.StartDate = absenceDTO.StartDate;
                absence.EndDate = absenceDTO.EndDate;
                absence.DurationInDays = absenceDTO.DurationInDays;

                await context.SaveChangesAsync();
                return NoContent();
            }
            catch (Exception e)
            {
                return BadRequest(e.Message);
            }
        }


        [HttpPut("approveAbsenceRequest/{absenceId:int}")]
        public async Task<ActionResult> ApproveAbsenceRequest(int absenceId)
        {
            try
            {
                var absence = await context.Absences
                    .Include(x => x.Employee)
                    .FirstOrDefaultAsync(x => x.Id == absenceId);

                if (absence == null)
                {
                    return NotFound();
                }

                absence.AbsenceStatus = AbsenceStatus.Approved;

                if (absence.AbsenceType == AbsenceType.AnnualLeave)
                {
                    absence.Employee.RemainingAnnualLeave -= absence.DurationInDays;
                    if (absence.Employee.RemainingAnnualLeave < 0)
                        throw new Exception("The employee does not have enough available annual leave days.");
                }

                await context.SaveChangesAsync();
                return NoContent();
            }
            catch (Exception e)
            {
                return BadRequest(e.Message);
            }
        }
        
        [HttpPut("denyAbsenceRequest/{absenceId:int}")]
        public async Task<ActionResult> DenyAbsenceRequest(int absenceId)
        {
            try
            {
                var absence = await context.Absences.FirstOrDefaultAsync(x => x.Id == absenceId);

                if (absence == null)
                {
                    return NotFound();
                }

                absence.AbsenceStatus = AbsenceStatus.Denied;

                await context.SaveChangesAsync();
                return NoContent();
            }
            catch (Exception e)
            {

                return BadRequest(e.Message);
            }
        }

        [HttpDelete("deleteAbsence/{absenceId:int}")]
        public async Task<ActionResult> DeleteAbsence(int absenceId)
        {
            try
            {
                var absence = await context.Absences
                    .Include(x => x.Employee)
                    .FirstOrDefaultAsync(x => x.Id == absenceId);

                if (absence == null)
                {
                    return NotFound();
                }

                context.Remove(absence);
                await context.SaveChangesAsync();
                return NoContent();
            }
            catch (Exception e)
            {
                return BadRequest(e.Message);
            }
        }
    }
}
