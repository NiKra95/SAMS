namespace SAMS_WebAPI.DTOs
{
    public class EditUserDetailsDTO
    {
        public string FirstName { get; set; }

        public string LastName { get; set; }

        public string Email { get; set; }

        public string Address { get; set; }

        public GenderType Gender { get; set; }

        public DateTime DateOfBirth { get; set; }

        public IFormFile? Picture { get; set; }
    }
}
