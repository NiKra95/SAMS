namespace SAMS_WebAPI.DTOs
{
    public class EmployeeHomePageDTO
    {
        public int NumberOfAbsences { get; set; }
        public int PendingAbsences { get; set; }
        public int ApprovedAbsences { get; set; }
        public int DeniedAbsences { get; set; }
        public int MaximumAnnualLeaveDays { get; set; }
        public int RemainingAnnualLeaveDays { get; set; }
    }
}
