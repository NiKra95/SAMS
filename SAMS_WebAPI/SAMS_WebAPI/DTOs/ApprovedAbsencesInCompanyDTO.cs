namespace SAMS_WebAPI.DTOs
{
    public class ApprovedAbsencesInCompanyDTO
    {
        public string EmployeeFullName { get; set; }

        public AbsenceType AbsenceType { get; set; }

        public DateTime StartDate { get; set; }

        public DateTime EndDate { get; set; }
    }
}
