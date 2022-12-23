namespace SAMS_WebAPI.DTOs
{
    public class AbsenceDTO
    {
        public int Id { get; set; }
        public string EmployeeId { get; set; }

        public AbsenceType AbsenceType { get; set; }

        public DateTime StartDate { get; set; }

        public DateTime EndDate { get; set; }

        public int DurationInDays { get; set; }

        public string Description { get; set; }

        public AbsenceStatus AbsenceStatus { get; set; }
    }
}
