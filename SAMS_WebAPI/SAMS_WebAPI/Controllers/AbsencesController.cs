using AutoMapper;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using SAMS_WebAPI.DTOs;
using SAMS_WebAPI.Entities;
using SAMS_WebAPI.Helpers;

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
    }
}
