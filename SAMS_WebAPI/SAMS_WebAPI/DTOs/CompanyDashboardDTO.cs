namespace SAMS_WebAPI.DTOs
{
    public class CompanyDashboardDTO
    {
        public int NumberOfAdmins { get; set; }
        public int NumberOfEmployees { get; set; }
        public int MinimumAnnualLeaveDays { get; set; }

        public int NumberOfAbsences { get; set; }
        public int PendingAbsences { get; set; }
        public int ApprovedAbsences { get; set; }
        public int DeniedAbsences { get; set; }

        public int AnnualLeaveCount { get; set; }
        public int SickLeaveCount { get; set; }
        public int ReligiousHolidaysCount { get; set; }
        public int UnpaidLeaveCount { get; set; }
        public int SpecialLeaveCount { get; set; }
        
    }
}
