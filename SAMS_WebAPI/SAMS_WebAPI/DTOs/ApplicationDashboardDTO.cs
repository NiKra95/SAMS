namespace SAMS_WebAPI.DTOs
{
    public class ApplicationDashboardDTO
    {
        public int NumberOfUsers { get; set; }
        public int NumberOfApplicationAdmins { get; set; }
        public int NumberOfCompanyAdmins { get; set; }
        public int NumberOfEmployees { get; set; }
        public int NumberOfCompanies { get; set; }
        public Dictionary<string, int> MonthlyCompanyStat { get; set; }
        public Dictionary<string, int> MonthlyCompanyProgress { get; set; }

    }
}
