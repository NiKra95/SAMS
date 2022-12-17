using System.ComponentModel.DataAnnotations;

namespace SAMS_WebAPI.DTOs
{
    public class CompanyCreationDTO
    {

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

        public DateTime CreationDate { get; set; }

        public IFormFile Logo { get; set; }
    }
}
