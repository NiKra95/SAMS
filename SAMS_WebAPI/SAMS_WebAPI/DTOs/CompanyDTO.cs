namespace SAMS_WebAPI.DTOs
{
    public class CompanyDTO
    {
        public int Id { get; set; }

        public string Name { get; set; }

        public string Address { get; set; }

        public string Country { get; set; }

        public string Website { get; set; }

        public string Logo { get; set; }

        public DateTime CreationDate { get; set; }

        public int NumberOfEmployees { get; set; }

        public int NumberOfAdmins { get; set; }

        public bool Allowed { get; set; }
    }
}
