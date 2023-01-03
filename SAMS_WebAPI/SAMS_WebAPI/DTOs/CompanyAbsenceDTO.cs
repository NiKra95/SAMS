namespace SAMS_WebAPI.DTOs
{
    public class CompanyAbsenceDTO
    {
        public int Id { get; set; }
        public string EmployeeId { get; set; }

        public string EmployeeName { get; set; }

        public int EmployeeMaximumAnnualLeave { get; set; }

        public int EmployeeRemainingAnuualLeave { get; set; }

        public AbsenceType AbsenceType { get; set; }

        public DateTime StartDate { get; set; }

        public DateTime EndDate { get; set; }

        public int DurationInDays { get; set; }

        public string Description { get; set; }

        public AbsenceStatus AbsenceStatus { get; set; }
    }
}
