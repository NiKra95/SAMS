using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace SAMS_WebAPI.Entities
{
    public class Company
    {
        public int Id { get; set; }

        [Required(ErrorMessage = "Company name is a required field.")]
        [MaxLength(60, ErrorMessage = "Maximum length for the Name is 60 characters.")] 
        public string Name { get; set; }

        [Required(ErrorMessage = "Company address is a required field.")]
        [MaxLength(60, ErrorMessage = "Maximum length for the Address is 60 characters")] 
        public string Address { get; set; }

        [Required(ErrorMessage = "Company country is a required field.")]
        [MaxLength(50, ErrorMessage = "Maximum length for the Country is 50 characters")]
        public string Country { get; set; }

        public string Website { get; set; }

        public string Logo { get; set; }

        public DateTime CreationDate { get; set; }

        public int MinimumAnnualLeaveDays { get; set; }

        public int NumberOfEmployees { get; set; }

        public int NumberOfAdmins { get; set; }

        public bool Allowed { get; set; }

        public ICollection<CompanyAdmin> Admins { get; set; }
        
        public ICollection<Employee> Employees { get; set; }
    }
}
