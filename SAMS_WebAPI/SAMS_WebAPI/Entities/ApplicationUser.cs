using Microsoft.AspNetCore.Identity;
using MoviesAPI.Validations;
using System.ComponentModel.DataAnnotations;

namespace SAMS_WebAPI.Entities
{
    public class ApplicationUser : IdentityUser
    {

        [Required(ErrorMessage = "First name is a required.")]
        [StringLength(50)]
        [FirstLetterUppercase]
        public string FirstName { get; set; }

        [Required(ErrorMessage = "Last name is a required.")]
        [StringLength(50)]
        [FirstLetterUppercase]
        public string LastName { get; set; }

        [Required(ErrorMessage = "Gender is a required.")]
        public GenderType Gender { get; set; }

        [Required(ErrorMessage = "Date of Birth is a required.")]
        public DateTime DateofBirth { get; set; }

        [StringLength(120)]
        public string? Address { get; set; }

        public string? Picture { get; set; }

    }
}
