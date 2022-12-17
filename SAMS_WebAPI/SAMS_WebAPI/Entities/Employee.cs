using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace SAMS_WebAPI.Entities
{
    public class Employee
    {
        [ForeignKey(nameof(ApplicationUser))]
        public string Id { get; set; }

        public ApplicationUser ApplicationUser { get; set; }

        [Required(ErrorMessage = "Designation is a required.")]
        public string Designation { get; set; }

        [Required(ErrorMessage = "StartWorkingDate is a required.")]
        public DateTime StartWorkingDate { get; set; }

        public int ExperienceInCompany { get; set; }

        public int MaximumAnnualLeave  { get; set; }

        public int RemainingAnnualLeave { get; set; }

        public int CompanyId { get; set; }

        public Company Company { get; set; }

        public ICollection<Absence> Absences { get; set; }

        public static implicit operator EventArgs?(Employee? v)
        {
            throw new NotImplementedException();
        }
    }
}
