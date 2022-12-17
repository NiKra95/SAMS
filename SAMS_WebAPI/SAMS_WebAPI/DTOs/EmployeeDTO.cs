namespace SAMS_WebAPI.DTOs
{
    public class EmployeeDTO
    {
        public string Id { get; set; }

        public string FirstName { get; set; }

        public string LastName { get; set; }

        public string Email { get; set; }

        public string Address { get; set; }

        public string Gender { get; set; }

        public DateTime DateofBirth { get; set; }

        public string Picture { get; set; }

        public string Designation { get; set; }

        public DateTime StartWorkingDate { get; set; }

        public int ExperienceInCompany { get; set; }

        public int MaximumAnnualLeave { get; set; }

        public int RemainingAnnualLeave { get; set; }

        public int CompanyId { get; set; }
    }
}
