﻿namespace SAMS_WebAPI.DTOs
{
    public class AbsenceCreationDTO
    {
        public string EmployeeId { get; set; }

        public AbsenceType AbsenceType { get; set; }

        public DateTime StartDate { get; set; }

        public DateTime EndDate { get; set; }

        public int DurationInDays { get; set; }

        public string Description { get; set; }

        public AbsenceStatus AbsenceStatus { get; set; }
    }
}
