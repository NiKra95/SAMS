using System.ComponentModel.DataAnnotations.Schema;

namespace SAMS_WebAPI.Entities
{
    public class Absence
    {
        public Guid Id { get; set; }
        public string EmployeeId { get; set; }

        public Employee Employee { get; set; }

        public AbsenceType AbsenceType { get; set; }

        public DateTime StartDate { get; set; }

        public DateTime EndDate { get; set; }

        public int DurationInDay { get; set; }   

        public bool IsApproved { get; set; }

    }
}
