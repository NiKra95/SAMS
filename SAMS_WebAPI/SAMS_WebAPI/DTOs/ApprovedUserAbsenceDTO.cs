namespace SAMS_WebAPI.DTOs
{
    public class ApprovedUserAbsenceDTO
    {
        public AbsenceType AbsenceType { get; set; }

        public DateTime StartDate { get; set; }

        public DateTime EndDate { get; set; }
    }
}
