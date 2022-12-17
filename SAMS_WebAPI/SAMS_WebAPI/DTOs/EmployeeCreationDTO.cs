namespace SAMS_WebAPI.DTOs
{
    public class EmployeeCreationDTO
    {
        public string FirstName { get; set; }

        public string LastName { get; set; }

        public string Email { get; set; }

        public string Password { get; set; }

        public GenderType Gender { get; set; }

        public string Designation { get; set; }

        public DateTime StartWorkingDate { get; set; }

        public int MaximumAnnualLeave { get; set; }

        public int CompanyId { get; set; }
    }
}
