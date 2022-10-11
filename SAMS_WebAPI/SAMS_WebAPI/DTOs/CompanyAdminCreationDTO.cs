namespace SAMS_WebAPI.DTOs
{
    public class CompanyAdminCreationDTO
    {
        public string FirstName { get; set; }

        public string LastName { get; set; }

        public string Email { get; set; }

        public string Password { get; set; }

        public GenderType Gender { get; set; }

        public DateTime DateOfBirth { get; set; }

        public int CompanyId { get; set; }


    }
}
